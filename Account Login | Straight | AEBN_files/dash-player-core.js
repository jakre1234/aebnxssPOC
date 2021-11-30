// An MPEG DASH v2 javascript client using the MediaSource Extensions.
// This is NOT a general purpose DASH player, it was written for VERY specific playback requirements.
// ONLY works with non ranged movie fragments and a DASH v2 manifest. (Sorry, I wrote the muxing server that way)
// No JS libs required, they are a crutch and only cause integration problems.
// Supports quick seeking, video & audio adapting based on bandwidth, frame loss, screen size, manifest time clipping, 
// VERY high latency users, configurable bitrate bounds & buffers, various error recovery.
// By Thomas B. Beard

// TODO
// Android Chrome bug, sourceBuffer.remove is async and does not complete before it disables the updating flag causing a freeze.
// Average DL bitrate is not quite average enough but I still want to be able to adapt quickly...
// Which IE versions work on which OS versions on which devices?
// Safari 8 (Yosemite). STILL has the HTTP connection close bug. Dies on second video segment. (adapting?)
// Firefox, still waiting for the MSE implementation
// Use videoElement.readyState instead of MAX_SOURCE_BUFFER_TIME
// Use appendWindowStart & appendWindowEnd to mask the offset\duration?
// Frame loss adapting needs to be cleaner, more responsive, smarter
// XHR latency calculation is not very reliable but still better than nothing
// SourceBuffer sequence mode may get around broken segment timestamps?
// Modify init segment MEHD to zero out start time so we don't need an offset?
// Some Chrome impls (Android) do not properly start on keyframes (startup\seek). Don't think I can fix this.

// VP Work
// Pull all source .mpd files and compile a merged mdp
// - BaseURL for each period
// - startNumber and duration for each period
// - movieId for each period
// - remove duration from MPD

var DashPlayer = function() {
	var player = this;
	// config data
	this.maxVideoBitrate = undefined; // If set, we will not adapt above this bitrate in kbps
	this.minVideoBitrate = undefined; // If set, we will not adapt blow this bitrate in kbps. Use with caution. it may cause buffering.
	this.screenConstrain = true; // If the adaptation logic should constrain the max resolution based on screen size
	this.MAX_BUFFER_TIME = 13; // Maximum amount of time in seconds we will hold in the JS buffer
	this.MAX_SOURCE_BUFFER_TIME = 6; // Maximum amount of time in seconds we will hold in the MSE buffer
	
	// internal(ish) data
	this.videoElement = undefined; // The HTML 5 video DOM element
	this.manifestUrl = undefined; // URL of the .mpd file (server MUST support basic CORS as we use XHR)
	this.stream = undefined; // Constructed from a manifest & handles the MSE buffering and adapting
	this.initCallback = undefined;
	this.endOfStreamCallback = undefined;
	this.debug = false;

	// testing data
	this.startTime = undefined;
	this.startTimeSeek = undefined;

	// Quality of Service raw data
	this._rawQoSData = {segmentsViewed:[],timesAdaptedTo:[],droppedFrames:[],bandwidthSamples:[],latencySamples:[],volumeTotal:0,volumeSamples:0,
		viewingStartTime:new Date().getTime(),seeks:0,adaptFailures:0,sourceFailures:0,congestionFailures:0,freezeFailures:0,fullscreenSegment:0};

	// API methods
	
	// call this first, pass the HTML5 video DOM element
	this.attachVideo = function(videoElement) {
		if (player.videoElement) {
			player.videoElement.removeEventListener("seeking", this._onSeeking, false);
			player.videoElement.removeEventListener("playing", this._onPlaying, false);
			player.videoElement.removeEventListener("pause", this._onPause, false);
			//player.videoElement.removeEventListener("seeked", this._onSeeking, false);
		}
		player.videoElement = videoElement;
		player.videoElement.addEventListener("seeking", this._onSeeking);
		player.videoElement.addEventListener("playing", this._onPlaying);
		player.videoElement.addEventListener("pause", this._onPause);
		//player.videoElement.addEventListener("seeked", this._onSeeking);
		
		player.videoElement.onended = function() {
			if (player.stream) {
				player.stream.onEndOfStream();
			}
		};

		player.videoElement.addEventListener("timeupdate", function(){
			if (player.stream) {
				player.stream.lastPlayerTimeUpdate = new Date().getTime();
				// This is not here, nor should it need to be, but...
				if (player.stream.rescuedStreamReseekTime != undefined && player.videoElement.readyState != 0) {
if (player.debug) if (player.debug) console.log('#### ReSeek to:'+player.stream.rescuedStreamReseekTime);
					var rst = player.stream.rescuedStreamReseekTime;
					player.stream.rescuedStreamReseekTime = undefined;
					player.videoElement.currentTime = rst; // Just a glitch in the matrix
					if (player.stream.rescuedStreamPause) {
						player.stream.rescuedStreamPause = false;
						if (!player.videoElement.paused && player.stream.playing) {
							player.videoElement.pause();
						}
					}
				}
			}
		});
	};
	
	// call this last, after setting any config data (maxVideoBitrate,minVideoBitrate,maxBufferTime,sourceBufferTime)
	// an optional second parameter is an initialization callback function that lets you know when video data has been loaded
	this.attachSource = function(manifestUrl,initCallback) {
		if (player.stream && player.stream.heartbeat) { // If they re-attach
			clearInterval(player.stream.heartbeat);
		}
		player.manifestUrl = manifestUrl;
		player.initCallback = initCallback;
		if (!window.MediaSource) {
			console.error("mediasource or syntax not supported");
			return;
		}

		var mf = new DashPlayer.Manifest();
		mf.loadManifest(manifestUrl,function(stream) {
			player.stream = stream;
			stream.player = player;

			var st = 0;
			if (player.startTime)
				st = player.startTime;
			var firstSeg = stream.getStreamSegmentIndexAtStreamTime(st);
			var mediaSegInfo = stream.getMediaSegmentIndexAtStreamSegmentIndex(firstSeg);
			var firstPeriod = stream.periods[mediaSegInfo.periodIndex];
			if (firstPeriod.videoAdaptationSet && firstPeriod.videoAdaptationSet.representations.length > 2) {
				// start near the middle?
				player.stream.videoStreamComponent.currentRepresentationIndex = Math.floor(firstPeriod.videoAdaptationSet.representations.length/2);
			}
			player.stream.init(true);
		});
	}
	
	// Don't use this player if false
	// Note: The player may support MediaSource but not DASH (MPEG moovie fragments)
	this.isDASHCapable = function() {
		if (window.MediaSource && // browser must support MediaSourceExtensions
			window.MediaSource.isTypeSupported('video/mp4;codecs=avc1.42001f') && // requires basic h.264 decoder
			window.MediaSource.isTypeSupported('audio/mp4;codecs=mp4a.40.2')) { // requires basic AAC decoder
			return true;
		}
		return false;
	}

	// UI may offer a bitrate widget or more, let's give them more data than they know what to do with. The reference impl makes use of most of this.
	
	// The bitrate (kbps) of the last video segment we passed to MSE
	this.getCurrentVideoBitrate = function() {
		if (player.stream && player.stream.videoStreamComponent && player.stream.videoStreamComponent.lastInitializedRepresentationIndex > -1) {
			var lastDecodedSegment = player.stream.videoStreamComponent.decodedSegments[player.stream.videoStreamComponent.decodedSegments.length-1];
			if (lastDecodedSegment)
				return lastDecodedSegment.adaptationSet.representations[player.stream.videoStreamComponent.lastInitializedRepresentationIndex].getActualBitrateKbps();
		}
		return 0;
	}
	// The bitrate (kbps) of the last video segment we buffered
	this.getLatestVideoBitrate = function() {
		if (player.stream) {
			if (player.stream.videoStreamComponent && player.stream.videoStreamComponent.buffer.length > 0) {
				player.stream.latestVideoBitrate =  player.stream.videoStreamComponent.buffer[player.stream.videoStreamComponent.buffer.length-1].bitrate;
			}
			return player.stream.latestVideoBitrate;
		}
		return 0;
	}
	// the lowest video bitrate (kbps) available to the stream (not bounded)
	this.getMinimumVideoBitrate = function() {
		if (player.stream && player.stream.periods) {
			var min = 9999999999;
			for (var i=0;i<player.stream.periods.length;++i) {
				var p = player.stream.periods[i];
				if (p.videoAdaptationSet.representations[0].getActualBitrateKbps() < min)
					min = p.videoAdaptationSet.representations[0].getActualBitrateKbps();
			}
			return min;
		}
		return 0;
	}
	// the highest video bitrate (kbps) available to the stream (not bounded)
	this.getMaximumVideoBitrate = function() {
		if (player.stream && player.stream.periods) {
			var max = 0;
			for (var i=0;i<player.stream.periods.length;++i) {
				var p = player.stream.periods[i];
				if (p.videoAdaptationSet.representations[p.videoAdaptationSet.representations.length-1].getActualBitrateKbps() > max)
					max = p.videoAdaptationSet.representations[p.videoAdaptationSet.representations.length-1].getActualBitrateKbps();
			}
			return max;
		}
		return 0;
	}
	// the recent average download bitrate (kbps)
	this.getCurrentDownloadBitrate = function() {
		if (player.stream && player.stream.videoStreamComponent) {
			return player.stream.videoStreamComponent.getDownloadBitrateKbps();
		}
		return 0;
	}
	// the amount of video we have buffered in seconds (JS & decoder)
	this.getBufferDuration = function() {
		if (player.stream && player.stream.videoStreamComponent && player.stream.videoStreamComponent.buffer.length > 0) {
			return player.stream.videoStreamComponent.getBufferTime();
		}
		return 0;
	}
	// hom much video time we have buffered in javascript in seconds (not yet sent to the decoder)
	this.getJSBufferDuration = function() {
		if (player.stream && player.stream.videoStreamComponent && player.stream.videoStreamComponent.buffer.length > 0) {
			return player.stream.videoStreamComponent.buffer.length * player.stream.videoStreamComponent.buffer[0].period.segmentDuration;
		}
		return 0;
	}
	// the amount of video the decoder has in seconds
	this.getDecoderBufferDuration = function() {
		if (player.stream && player.stream.videoStreamComponent && player.stream.videoStreamComponent.buffer.length > 0) {
			return player.stream.videoStreamComponent.getSourceBufferTime();
		}
		return 0;
	}
	// The index of the representation playing now
	this.getCurrentVideoRepresentationIndex = function() {
		if (player.stream && player.stream.videoStreamComponent) {
			if (player.stream.videoStreamComponent.decodedSegments.length > 0) {
				return player.stream.videoStreamComponent.decodedSegments[0].representationIndex;
			}
			return player.stream.videoStreamComponent.currentRepresentationIndex;
		}
		return 0;
	}
	// The currently playing segments download timestamp
	this.getCurrentSegmentTimestamp = function() {
		if (player.stream && player.stream.videoStreamComponent && player.stream.videoStreamComponent.decodedSegments.length > 0) {
			return player.stream.videoStreamComponent.decodedSegments[0].timestamp;
		}
		return 0;
	}
	// The index of the representation we will buffer next
	this.getLatestVideoRepresentationIndex = function() {
		if (player.stream && player.stream.videoStreamComponent) {
			return player.stream.videoStreamComponent.currentRepresentationIndex;
		}
		return 0;
	}
	// the number of representations (video bitrates)
	this.getVideoRepresentationCount = function() {
		if (player.stream && player.stream.videoStreamComponent && player.stream.videoStreamComponent.buffer.length > 0) {
			return player.stream.videoStreamComponent.buffer[0].period.videoAdaptationSet.representations.length;
		}
		return 0;
	}
	// the latest average latency for HTTP requests (round trip)
	this.getLatencyMS = function() {
		if (player.stream) {
			return player.stream.getLatencyMS();
		}
		return 0;
	}
	// returns a textual status. I wouldn't base any logic on this but it might help debugging.
	this.getStatus = function() {
		if (player.stream && player.stream.initializing) {
			return 'Initializing';
		}
		if (player.stream && player.stream.pauseToBuffer) {
			return 'Congestion';
		}
		var timeNow = new Date().getTime();
		if (player.stream && player.stream.videoStreamComponent &&
			player.stream.lastPlayerTimeUpdate > (timeNow - 500)) {
			if (player.videoElement.paused || player.videoElement && player.stream.videoStreamComponent.pendingSegmentRequests.length > 0) {
				return 'Buffering';
			}
			return 'Streaming';
		}
		return 'Waiting';
	}

	// Should be called when the user navigates away from the player to gather viewing metrics.
	// These can be gathered\logged alongside IP, Geo location, service provder, user agent, etc. for QoS reporting.
	this.getQualityOfServiceMetrics = function() {
		var qosMetrics = {};
		var timeNow = new Date().getTime();

		qosMetrics.averageBandwidthKbps=0;
		if (player._rawQoSData.bandwidthSamples.length > 0) {
			for (var i=0;i<player._rawQoSData.bandwidthSamples.length;++i) {
				qosMetrics.averageBandwidthKbps+=player._rawQoSData.bandwidthSamples[i];
			}
			qosMetrics.averageBandwidthKbps /= player._rawQoSData.bandwidthSamples.length;

			var sd = 0;
			for (var i=0;i<player._rawQoSData.bandwidthSamples.length;++i) {
				var diff = player._rawQoSData.bandwidthSamples[i]-qosMetrics.averageBandwidthKbps;
				sd+=diff*diff;
			}
			sd/=player._rawQoSData.bandwidthSamples.length;
			qosMetrics.BandwidthKbpsStandardDeviation=Math.sqrt(sd); 
		}

		qosMetrics.averageLatencyMs=0;
		if (player._rawQoSData.latencySamples.length > 0) {
			for (var i=0;i<player._rawQoSData.latencySamples.length;++i) {
				qosMetrics.averageLatencyMs+=player._rawQoSData.latencySamples[i];
			}
			qosMetrics.averageLatencyMs/=player._rawQoSData.latencySamples.length;

			var sd = 0;
			for (var i=0;i<player._rawQoSData.latencySamples.length;++i) {
				var diff = player._rawQoSData.latencySamples[i]-qosMetrics.averageLatencyMs;
				sd+=diff*diff;
			}
			sd/=player._rawQoSData.latencySamples.length;
			qosMetrics.LatencyMsStandardDeviation=Math.sqrt(sd); 
		}
		qosMetrics.averageVolumePercent=0;
		if (player._rawQoSData.volumeSamples > 0) {
			qosMetrics.averageVolumePercent = player._rawQoSData.volumeTotal / player._rawQoSData.volumeSamples * 100;
		}

		qosMetrics.droppedFramesPerSecond = [];
		if (player.stream && player.stream.periods && player.stream.periods[0].videoAdaptationSet && player.stream.periods[0].videoAdaptationSet.representations.length > 0) {
			var vidSegDurSec = player.stream.periods[0].segmentDuration;
			var totalSegmentsViewed=0;
			var totalBitrate = 0;
			var totalTimesAdapted = 0;
			var keyArray = Object.keys(player._rawQoSData.segmentsViewed);
			for (var i=0;i < keyArray.length;++i) {
				var repIdx = keyArray[i];
				if (player._rawQoSData.segmentsViewed[repIdx]) {
					totalSegmentsViewed+= player._rawQoSData.segmentsViewed[repIdx];
					// TODO FIXME period 0 may not have all representations
					totalBitrate+=player._rawQoSData.segmentsViewed[repIdx]*player.stream.periods[0].videoAdaptationSet.representations[repIdx].getActualBitrateKbps();
				}
				if (player._rawQoSData.droppedFrames[repIdx]) {
					qosMetrics.droppedFramesPerSecond[repIdx] = player._rawQoSData.droppedFrames[repIdx] / (player._rawQoSData.segmentsViewed[repIdx] * vidSegDurSec);
				} else {
					qosMetrics.droppedFramesPerSecond[repIdx] = 0;
				}
				if (player._rawQoSData.timesAdaptedTo[repIdx]) {
					totalTimesAdapted += player._rawQoSData.timesAdaptedTo[repIdx];
				}
			}
			qosMetrics.averageVideoBitrateKbps = totalBitrate / totalSegmentsViewed;
			qosMetrics.percentTimeInFullscreen = player._rawQoSData.fullscreenSegment/totalSegmentsViewed*100;
			qosMetrics.totalSecondsViewed = totalSegmentsViewed * vidSegDurSec;
			qosMetrics.adaptsPerSecond = totalTimesAdapted / qosMetrics.totalSecondsViewed;
			qosMetrics.seeksPerSecond = player._rawQoSData.seeks / qosMetrics.totalSecondsViewed;
			qosMetrics.freezeFailuresPerSecond = player._rawQoSData.freezeFailures / qosMetrics.totalSecondsViewed;
			qosMetrics.congestionFailuresPerSecond = player._rawQoSData.congestionFailures / qosMetrics.totalSecondsViewed;
			qosMetrics.sourceFailuresPerSecond = player._rawQoSData.sourceFailures / qosMetrics.totalSecondsViewed;
			qosMetrics.adaptFailuresPerSecond = player._rawQoSData.adaptFailures / qosMetrics.totalSecondsViewed;
			qosMetrics.videoDurationS = player.stream.duration;
			var startStopMs = timeNow-player._rawQoSData.viewingStartTime;
			qosMetrics.percentTimePaused  = (startStopMs - (qosMetrics.totalSecondsViewed*1000))/startStopMs * 100;
			if (qosMetrics.percentTimePaused < 0) {
				qosMetrics.percentTimePaused=0;
			}

			if (screen.height > screen.width) {
				qosMetrics.screenWidth = screen.height;
				qosMetrics.screenHeight = screen.width;
			} else {
				qosMetrics.screenWidth = screen.width;
				qosMetrics.screenHeight = screen.height;
			}

		}
		return qosMetrics;
	}

	this.setStartTime = function(startTime) {
		this.startTime = startTime;
		this.startTimeSeek = startTime;
	}
	
	// Internal methods, TODO hide these someplace
	this._onSeeking = function() {
//		player.stream.seek(player.videoElement.currentTime);
		if (player.stream)
			player.stream.updateTime(player.videoElement.currentTime);
	}
	this._onPlaying = function() { // video.play() is asynchronous, if you call pause() befor it finishes you will get a console error.
		if (player.stream)
			player.stream.playing = true;
	}
	this._onPause = function() {
		if (player.stream)
			player.stream.playing = false;
	}
	this._onInitialized = function() { // called after init once we have loaded audio & video into MSE
		if (player.startTimeSeek && player.videoElement.readyState > 0) {
			// This does not work in IE or Safari on Mac. For those we use a hacky seek inside checkBuffer.
			var tst = player.startTimeSeek;
			player.startTimeSeek = undefined;
			player.videoElement.currentTime = tst;
		}

		// API callback. Users may want to dial some things in once they have the vid info
		if (player.initCallback && (typeof player.initCallback === 'function')) {
			player.initCallback();
		}
	}

	this.destroy = function() {
		if (player.stream) {
			clearInterval(player.stream.heartbeat);
			if (!player.videoElement.paused && player.stream.playing) {
				player.videoElement.pause();
			}
		}
	}
}

// ############################################################################################################
// ###   Internal stufff below  (the mess)                                                                  ###
// ############################################################################################################

// The manifest parser builds this object graph: Stream->Period->AdaptationSet->Representation
DashPlayer.Stream = function() {
	var stream = this;
	this.duration = 0; // in seconds
	this.manifestProtocolHostAndPort; // from the manifest URL
	this.manifestBaseURLPath; // from the manifest URL (NOT any BaseURL within the manifest)
	this.player = undefined; // parent pointer
	this.time = 0; // the latest time in seconds reported directly from the video player (may not be exact)
	this.initializing = true;
	this.latencyMS = []; // keep up to 5 & average them to get the download bitrate
	this.lastDroppedFrameCount = 0; // used to detect when frames are dropped
	this.periods = [];

	this.lastPlayerTime = 0;
	this.samePlayerTimeCount = 0;
	this.streamTimeAtLastBufferCheck = -1000; // used to detect when a user has seeked

	this.latestVideoBitrate=0; // the last video bitrate we buffered
	this.freezeCount = 0;
	this.adaptFailureCount = 0;
	this.congestionCount = 0;
	this.deletedSourceCount = 0;
	this.pauseToBuffer = false;
	this.lastPlayerTimeUpdate = 0;

	this.playing = false;

	this.isOpera = navigator.userAgent.indexOf("Opera") != -1;
	this.isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
	this.isIOSChrome = window.navigator.userAgent.match("CriOS");
	this.vendorName = window.navigator.vendor;

	// Chromium has a bug when switching bitrates that causes an infinite recursion in the GPU code
	// hardResetMode is used to hack around it and rebuild the MediaSource when adapting
	this.chromeMajorVersion = 0;
	this.isChrome = navigator.userAgent.indexOf("Chrome/") != -1 && this.isOpera == false && this.isIEedge == false;
	if (this.isChrome) {
		// Chrome/51.0.2704.63 
		var cidx = navigator.userAgent.indexOf("Chrome/");
		var didx = navigator.userAgent.indexOf(".",cidx);
		this.chromeMajorVersion = parseInt(navigator.userAgent.substring(cidx+7,didx));
	}

	this.isWindows = navigator.userAgent.indexOf("Windows") != -1;
	this.isSafari = navigator.userAgent.indexOf("Safari/") != -1 && !this.isChrome;

	this.hasChromeAdaptBug = this.isWindows & (this.isChrome || this.isOpera) & this.chromeMajorVersion < 51;
//this.hasChromeAdaptBug = true;
	this.hardResetMode = 0; // 0 - no reset, 1 - waiting for reset call, 2 - waiting for sourceOpen

	this.rescuedStreamReseekTime = undefined; // This is not here
	this.rescuedStreamPause = false;

	this.videoStreamComponent = new DashPlayer.StreamComponent();
	this.videoStreamComponent.stream = this;
	this.videoStreamComponent.isVideo = true;
	this.audioStreamComponent = new DashPlayer.StreamComponent();
	this.audioStreamComponent.stream = this;
	this.audioStreamComponent.isVideo = false;

	this.responseErrorCount = 0;

	this.BITRATE_WIGGLE_ROOM_FACTOR = 1.2; // scale up the estimated bitrate by this amount for breathing room.
	this.DOWNLOAD_BITRATE_AVERAGE_SAMPLE_SIZE = 3; // how many recent segment downloads we use to calculate avg. DL rate.
	this.SEGMENT_BITRATE_AVERAGE_SAMPLE_SIZE = 5; // how many recent segment downloads we use to calculate avg. DL rate.
	this.LATENCY_AVERAGE_SAMPLE_SIZE = 5; // how many recent segment downloads we use to calculate avg. DL rate.
	this.MIN_ADAPT_DOWN_TIME = 20000; // ms. Wait this long after adapting down befor allowing adapt up
	this.MAX_FRAME_RATE_LOSS = 5; // FPS loss before adapting down
	this.FRAME_LOSS_RATE_RESET_TIME_MS = 120000; // every n milliseconds, allow frame loss rate to reset
	this.IE_HACK_SEEK_TIME = 0.1;

	this.init = function(firstInit) {
		stream.videoStreamComponent.sourceBuffer = undefined;
		stream.audioStreamComponent.sourceBuffer = undefined;
		stream.mediaSource = new window.MediaSource();
		stream.mediaSource.addEventListener('sourceopen', function (e) {
			stream.mediaSource.duration = stream.duration;
			stream.videoStreamComponent.init(stream.mediaSource,firstInit);
			stream.audioStreamComponent.init(stream.mediaSource,firstInit);
		});
		stream.mediaSource.addEventListener('sourceended', function (e) {
			console.error('Source End:');
			console.error(e);
		});
		var url = URL.createObjectURL(stream.mediaSource); // wrapped MSE URL
		//stream.player.videoElement.pause(); //not sure what this is for
		stream.player.videoElement.src = url;
	}
	
	// The one and only interval that drives the player
	this.heartbeat = setInterval(function() {
		// kill this loop if the player is removed from the page
		if (!stream.initializing) {
			var attached = false;
			var elem = stream.player.videoElement;
			while (elem) {
				if (elem.nodeName.toUpperCase() == 'HTML') {
					attached = true;
					break;
				}
				elem = elem.parentElement;
			}
			if (!attached) {
				stream.player.destroy();
			}
		}
		
		if (!stream.player) {return;}
		if (stream.player.videoElement && stream.lastPlayerTime == stream.player.videoElement.currentTime && !stream.player.videoElement.paused) {
			++stream.samePlayerTimeCount;
		} else {
			stream.samePlayerTimeCount=0;
		}
		if (stream.samePlayerTimeCount >= 20) {
			var lastPeriod = stream.periods[stream.periods.length-1];
//console.log('ct:'+stream.player.videoElement.currentTime+' vd:'+stream.duration);
			if (lastPeriod && stream.duration - stream.player.videoElement.currentTime < lastPeriod.segmentDuration*2) {
				stream.onEndOfStream();
				return;
			}

console.error("########################################################");
console.error("Frozen MSE detected, attempting restart");

if (typeof(ga) != "undefined") { try { ga('send','event','Error Messages','DASH Playback','Frozen MSE'); } catch(err){} }
			//stream.player.videoElement.pause();
			//stream.player.videoElement.play();
			// TODO this may cause more problems than it fixes. Might have to check the last play event time.
			if (!stream.isSafari)
				stream.hardResetMode = 1;
			stream.samePlayerTimeCount = 0;
			stream.player.videoElement.currentTime = stream.player.videoElement.currentTime+1;
			++stream.freezeCount;
			++stream.player._rawQoSData.freezeFailures;
		}
		stream.lastPlayerTime = stream.player.videoElement.currentTime;
		stream.updateTime(stream.player.videoElement.currentTime);
	}, 200);

	this.seek = function(time) {
		stream.time = time;
		if (stream.audioStreamComponent) {
			stream.audioStreamComponent.seek();
		}
		if (stream.videoStreamComponent) {
			stream.videoStreamComponent.seek();
		}
		++stream.player._rawQoSData.seeks;
	};

	// generally called a few times a second by the player, we will use it to trigger buffer updates
	this.updateTime = function(time) {
		stream.time = time;
		if (stream.audioStreamComponent) {
			stream.audioStreamComponent.checkBuffer();
		}
		if (stream.videoStreamComponent) {
			stream.videoStreamComponent.checkBuffer();
		}	
	};
	
	this.onEndOfStream = function() {
if (stream.player.debug) console.log('End of stream, pausing.');
		if (stream.player.endOfStreamCallback) {
			stream.player.endOfStreamCallback();
		}
		//TODO: NEED RESOLUTION ON HOW THIS WRAPS UP VIDEO PLAYBACK FOR FRONT END SO UI LAYER CAN END TIMERS AND CLEAN UP!!!!
		if (!stream.player.videoElement.paused && stream.playing) {
			stream.player.videoElement.pause();
		}
		// chrome bug workaround
		stream.videoStreamComponent.buffer=[];
		stream.audioStreamComponent.buffer=[];
	}

	this.checkInitialized = function() {
		var initialized = true;
		for (var p=0;p<stream.periods.length;++p) {
			var period = stream.periods[p];
			if ((period.audioAdaptationSet && period.audioAdaptationSet.Initializing)
				|| (period.videoAdaptationSet && period.videoAdaptationSet.initializing)) {
				initialized = false;
				break;
			}
		}
		if (initialized && stream.initializing) {
if (stream.player.debug) console.log('Stream Initialized');
			stream.initializing = false;
			stream.player._onInitialized();
		}
	}
	
	this.getLatencyMS = function() {
		if (stream.latencyMS.length > 0) {
			var sum = 0;
			for (var i=0;i<stream.latencyMS.length;++i) {
				sum+=stream.latencyMS[i];
			}
			return sum / stream.latencyMS.length;
		}
		return 0;
	}

	this.hardReset = function() {
		stream.hardResetMode = 2; // Stop segments from feeding into the decoder & remember that we are waiting for a sourceOpen
		// grab the current time, we will seek back to it once we rebuild the MediaSource
		var hardResetPlayTime = stream.player.videoElement.currentTime;
		if (stream.videoStreamComponent.buffer.length > 0)
			hardResetPlayTime = stream.videoStreamComponent.buffer[0].startTime;

//console.log('HARD RESET SEEK:'+hardResetPlayTime);
		// Rebuild MediaSource
		stream.mediaSource = new window.MediaSource();
		stream.mediaSource.addEventListener('sourceopen', function (e) {
//console.log('HARD RESET Source Open');
			stream.mediaSource.duration = stream.duration;
			//stream.videoAdaptationSet.init(stream.mediaSource,false);
			//stream.audioAdaptationSet.init(stream.mediaSource,false);

//console.log('SI:'+lastBufferedVidSegIndex+' '+(lastBufferedVidSegIndex+1-stream.audioAdaptationSet.segmentOffset)*stream.audioAdaptationSet.segmentDuration);
//console.log('VS:'+stream.videoAdaptationSet.buffer[0].startTime);
//console.log('AS:'+stream.audioAdaptationSet.buffer[0].startTime);

			stream.player.videoElement.currentTime = hardResetPlayTime;
			stream.streamTimeAtLastBufferCheck = stream.player.videoElement.currentTime;

			var period = stream.getPeriodAtStreamTime(hardResetPlayTime);

			if (period.videoAdaptationSet) {
				var repZero = period.videoAdaptationSet.representations[0];
				var lastBufferedVidSegIndex = stream.getStreamSegmentIndexAtStreamTime(hardResetPlayTime-stream.IE_HACK_SEEK_TIME)-1;

				// try to avoid dropping the buffer if possible
				if ((stream.videoStreamComponent.buffer.length > 0 && stream.videoStreamComponent.buffer[0].index != (lastBufferedVidSegIndex+1)) ||
					(stream.videoStreamComponent.pendingSegmentRequests.length > 0 && stream.videoStreamComponent.pendingSegmentRequests[0].segIndex != (lastBufferedVidSegIndex+1))) {
//console.log('Dropping the video buffer');
					for (var i=0;i<stream.videoStreamComponent.pendingSegmentRequests.length;++i) {
						stream.videoStreamComponent.pendingSegmentRequests[i].aborted=true;	
					}
					stream.videoStreamComponent.pendingSegmentRequests = [];
					stream.videoStreamComponent.buffer=[];
					stream.videoStreamComponent.lastBufferedStreamSegmentIndex = lastBufferedVidSegIndex;
				}
				stream.videoStreamComponent.lastInitializedRepresentationIndex = -1;
				stream.videoStreamComponent.sourceBuffer = stream.mediaSource.addSourceBuffer(period.videoAdaptationSet.mimeType+';codecs='+repZero.codecs);
	//stream.videoStreamComponent.sourceBuffer.mode = 'sequence';

				stream.videoStreamComponent.sourceBuffer.addEventListener("update",stream.videoStreamComponent.onSourceBufferUpdate, false);
				stream.videoStreamComponent.sourceBuffer.addEventListener('error', function (e) {
					console.error('Source Buffer error['+period.videoAdaptationSet.mimeType+']:');
					console.error(e);
				});
			}

			var repZero = period.audioAdaptationSet.representations[0];
			//var lastBufferedAudioSegIndex = Math.floor(hardResetPlayTime / stream.audioAdaptationSet.segmentDuration + stream.audioAdaptationSet.segmentOffset)-1;
			var lastBufferedAudioSegIndex = lastBufferedVidSegIndex;
			if ((stream.audioStreamComponent.buffer.length > 0 && stream.audioStreamComponent.buffer[0].index != (lastBufferedAudioSegIndex+1)) ||
				(stream.audioStreamComponent.pendingSegmentRequests.length > 0 && stream.audioStreamComponent.pendingSegmentRequests[0].segIndex != (lastBufferedAudioSegIndex+1))) {
//console.log('Dropping the audio buffer');
				for (var i=0;i<stream.audioStreamComponent.pendingSegmentRequests.length;++i) {
					stream.audioStreamComponent.pendingSegmentRequests[i].aborted=true;	
				}
				stream.audioStreamComponent.pendingSegmentRequests = [];
				stream.audioStreamComponent.buffer=[];
				stream.audioStreamComponent.lastBufferedStreamSegmentIndex = lastBufferedAudioSegIndex;
			}
			stream.audioStreamComponent.lastInitializedRepresentationIndex = -1;
			stream.audioStreamComponent.sourceBuffer = stream.mediaSource.addSourceBuffer(period.audioAdaptationSet.mimeType+';codecs='+repZero.codecs);
//stream.audioStreamComponent.sourceBuffer.mode = 'sequence';
			stream.audioStreamComponent.sourceBuffer.addEventListener("update",stream.audioStreamComponent.onSourceBufferUpdate, false);
			stream.audioStreamComponent.sourceBuffer.addEventListener('error', function (e) {
				console.error('Source Buffer error['+period.audioAdaptationSet.mimeType+']:');
				console.error(e);
			});

			// segTime = adaptationSet.segmentDuration * (adaptationSet.lastBufferSegmentIndex+1-adaptationSet.segmentOffset)
			stream.hardResetMode = 0; // Allow segments to be injected into the decoder
		});
		var url = URL.createObjectURL(stream.mediaSource);
		stream.player.videoElement.src = url;

		stream.player.videoElement.currentTime = hardResetPlayTime;
		stream.streamTimeAtLastBufferCheck = stream.player.videoElement.currentTime;
	}

	// xhr HTTP download used for segments and init blocks
	this.loadData = function(url,xhr,callback) {
//console.log('GET '+url);
		var requestStartTime = new Date().getTime();
		var latency = 0;
		xhr.open("GET", url, true); // Open the request
		xhr.responseType = "arraybuffer"; // Set the type of response expected
		//  Asynchronously wait for the HTTP data to return
		xhr.onreadystatechange = function () {
			if (xhr.readyState == xhr.DONE) {
				callback(xhr,latency);
			} else if (xhr.readyState == 2) { // got headers (the first HTTP response callback, before the payload data)
				latency = new Date().getTime()-requestStartTime;
				stream.player._rawQoSData.latencySamples.push(latency);
				stream.latencyMS.push(latency);
				if (stream.latencyMS.length > stream.LATENCY_AVERAGE_SAMPLE_SIZE) { 
					stream.latencyMS.splice(0,1);
				}
			}
		}
		xhr.send();
	}

	this.getStreamTimeAtStreamSegmentIndex = function(streamSegIndex) {
		var i;
		var streamTime = 0;
		var periodSegment = streamSegIndex;
		for (i=0;i<stream.periods.length-1;++i) {
			if (periodSegment >= stream.periods[i].numSegments) {
				periodSegment -= stream.periods[i].numSegments;
				streamTime += stream.periods[i].duration;
			} else
				break;
		}
		streamTime += periodSegment * stream.periods[i].segmentDuration;
		return streamTime;
	}

	this.getPeriodAtStreamTime = function(timeInSeconds) {
		var et = 0;
		var i;
		for (i=0;i<stream.periods.length-1;++i) {
			et+=stream.periods[i].duration;
			if (timeInSeconds < et)
				break;
		}
		return stream.periods[i];
	}

	this.getStreamSegmentIndexAtStreamTime = function(streamTime) {
		var periodTime = streamTime;
		var i;
		var streamSegIndex = 0;
		for (i=0;i<stream.periods.length-1;++i) {
			if (periodTime >= stream.periods[i].duration) {
				streamSegIndex += stream.periods[i].numSegments;
				periodTime -= stream.periods[i].duration;
			} else
				break;
		}
		if (stream.periods[i])
			streamSegIndex += Math.floor(periodTime / stream.periods[i].segmentDuration);
		return streamSegIndex;
	}

	this.getMediaSegmentIndexAtStreamSegmentIndex = function(streamSegIndex) {
		var i;
		var mediaSegIndex = streamSegIndex;
		for (i=0;i<stream.periods.length-1;++i) {
			if (mediaSegIndex >= stream.periods[i].numSegments) {
				mediaSegIndex -= stream.periods[i].numSegments;
			} else
				break;
		}
		var medisSegmentOffset = 0;
		if (stream.periods[i])
			medisSegmentOffset = stream.periods[i].mediaSegmentOffset;
//console.log('SSI:'+streamSegIndex+' MSI:'+mediaSegIndex+' PI:'+i+' NPS:'+stream.periods[i].numSegments);
		return {periodIndex:i,mediaSegmentIndex:(mediaSegIndex+medisSegmentOffset)};
	}

	// MPEG Fragment parsing functions
	this.readInt = function(data,position) {
		return ((data[position+3]&0xFF) + ((data[position+2]&0xFF) << 8) + ((data[position+1]&0xFF) << 16) + ((data[position]&0xFF) << 24));
	}
	this.readLong = function(data,position) {
		return ((data[position+7]&0xFF) + ((data[position+6]&0xFF) << 8) + ((data[position+5]&0xFF) << 16) + ((data[position+4]&0xFF) << 24) +
			((data[position+3]&0xFF) << 32) + ((data[position+2]&0xFF) << 40) + ((data[position+1]&0xFF) << 48) + ((data[position]&0xFF) << 56)
				);
	}
	this.getNamedBox = function(boxes,name) {
		for (var i=0;i<boxes.length;++i) {
			if (boxes[i].type == name)
				return boxes[i];
			if (boxes[i].children) {
				var result = stream.getNamedBox(boxes[i].children,name);
				if (result)
					return result;
			}
		}
		return undefined;
	}
	this.readMPEGBoxes = function(data,offset,length) {
		var boxes = [];
		var pos = offset;
		while (pos < length) {
			var box = {};
			var size = stream.readInt(data,pos);
			box.dataOffset = 8+pos;
			box.type = String.fromCharCode(data[pos+4])+String.fromCharCode(data[pos+5])+String.fromCharCode(data[pos+6])+String.fromCharCode(data[pos+7]);
			if (size == 1) {
				box.size = stream.readLong(data,pos+8)-16;
				box.dataOffset = 16+pos;
			} else
				box.size = size-8;
			boxes.push(box);
			// check for known container types
			if (box.type == 'moof' || box.type == 'traf' || box.type == 'moov' || box.type == 'trak' || box.type == 'mdia')
				box.children = stream.readMPEGBoxes(data,box.dataOffset,box.size);
			pos=box.dataOffset+box.size;
		}
		return boxes;
	}
}

// One for video, one for audio. This class controls all the stream buffers and how\when they feed into the decoder.
DashPlayer.StreamComponent = function() {
	var streamComponent = this;
	this.stream = undefined;
	this.currentRepresentationIndex = 0; // the next segment we load will  be from this representation
	this.lastInitializedRepresentationIndex = -1; // the last representation index we sent to the source buffer
	this.lastBufferedStreamSegmentIndex = -1; // the last segment we downloaded. This number is relative to the stream starting at 0. 
	                                  // Periods have their own segment offset
	this.lastBufferedStreamPeriod = undefined;
	this.sourceBufferFlushCount=0; // used to regulate the frequency of buffer cleaning
	this.downloadRates = []; // keep up to 5 & average them to get the download bitrate
	this.seekCount=0; // helps determine when to throw out late segment responses after a seek
	this.sourceBuffer = undefined; // the MSE buffer where we dump raw segments to play
	this.initializing = true;
	this.buffer = []; // our segment buffer before being sent to the MSE source buffer
	this.pendingSegmentRequests = []; // all ongoing HTTP segment requests (may be multiple in high latency situations)
	this.lastDownAdaptTime = 0; // Used to keep from adapting back up too fast (flapping)
	this.decodedSegments = []; // list of decoded segment info
	this.lastXHRSegmentStatus = 200;
	this.adaptationFailureCounter = 0; // Used to detect a VERY annoying Chrome bug
	this.sourceFailureCounter = 0;
	this.isVideo = undefined;

	this.init = function(mediaSource,firstInit) {
		var period = streamComponent.stream.periods[0];
		if (streamComponent.stream.player.startTime)
			period = streamComponent.stream.getPeriodAtStreamTime(streamComponent.stream.player.startTime);
		var adaptationSet;

		if (streamComponent.isVideo)
			adaptationSet = period.videoAdaptationSet;
		else
			adaptationSet = period.audioAdaptationSet;
		if (!adaptationSet)
			return;
		var repZero = adaptationSet.representations[0]; // does this (0) even matter?

		// clear out any data that might be there
		streamComponent.seek();
		streamComponent.lastBufferedStreamSegmentIndex = -1;
		streamComponent.lastInitializedRepresentationIndex = -1;

//console.log('Adding source buffer '+adaptationSet.mimeType+';codecs='+repZero.codecs);
		streamComponent.sourceBuffer = mediaSource.addSourceBuffer(adaptationSet.mimeType+';codecs='+repZero.codecs);
//streamComponent.sourceBuffer.mode = 'sequence';
		streamComponent.sourceBuffer.addEventListener("update",streamComponent.onSourceBufferUpdate, false);
		// If the timestampOffset is even 1 frame before the data delivered, Chrome will dump the source buffers. (Bug)
//		if (streamComponent.startTime > 0) {
//			streamComponent.sourceBuffer.timestampOffset = - adaptationSet.startTime+0.02;
//		}
//		else {
//			streamComponent.sourceBuffer.timestampOffset = 0;
//		}

		streamComponent.sourceBuffer.addEventListener('error', function (e) {
			console.error('Source Buffer error['+adaptationSet.mimeType+']:');
			console.error(e);
		});

		// load all init segments in parallel to reduce startup time (synchronous latency cost)
		if (firstInit) {
			for (var p=0;p<streamComponent.stream.periods.length;++p) {
				if (streamComponent.isVideo)
					adaptationSet = streamComponent.stream.periods[p].videoAdaptationSet;
				else
					adaptationSet = streamComponent.stream.periods[p].audioAdaptationSet;
				for (var i=0;i<adaptationSet.representations.length;++i) {
					adaptationSet.initRep(i);
				}
			}
		}
	}

	// The heart(beat) of dashplayer
	// Attempts to keep both source(MSE) and data(JS) buffers full as well as adapt to network conditions.
	// This will be called OFTEN and at irregular intervals, it must execute somewhat quickly.
	this.checkBuffer = function() {
		// Win 10 Phone Edge bug, opens new tabs but does not close them
		if (document.visibilityState && navigator.userAgent.indexOf("Windows Phone") != -1) {
			if (document.visibilityState == 'hidden' || document.visibilityState == 'unloaded') {
				if (!streamComponent.stream.player.videoElement.paused && streamComponent.stream.playing) {
					streamComponent.stream.player.videoElement.pause();
				}
				return;
			}
		}

		if (streamComponent.stream.player.videoElement.error) {
			console.error('######## VIDEO ERROR:');
			console.error(streamComponent.stream.player.videoElement.error);
			streamComponent.stream.hardResetMode = 1;
		}

		if (!streamComponent.stream.player) {return;}
		var timeNow = new Date().getTime();
		var currentPeriod = streamComponent.stream.getPeriodAtStreamTime(streamComponent.stream.player.videoElement.currentTime);
		if (!currentPeriod) {return;}
		var currentAdaptationSet;
		if (streamComponent.isVideo)
			currentAdaptationSet = currentPeriod.videoAdaptationSet;
		else
			currentAdaptationSet = currentPeriod.audioAdaptationSet;
		if (!currentAdaptationSet)
			return;

		// Sanity checks, adjust buffers to be at least the minimum size assuming a consistent download rate
		// videos may have different keyframe\segment times (2s, 10s, etc.)
		if (streamComponent.stream.player.MAX_SOURCE_BUFFER_TIME < currentPeriod.segmentDuration+1.5) {
			streamComponent.stream.player.MAX_SOURCE_BUFFER_TIME = currentPeriod.segmentDuration+1.5;
		}
		if (streamComponent.stream.player.MAX_BUFFER_TIME < currentPeriod.segmentDuration*3.5) {
			streamComponent.stream.player.MAX_BUFFER_TIME = currentPeriod.segmentDuration*3.5;
		}

		if (streamComponent.stream.initializing) {
			return;
		}

		// Hacky initial seek support for IE and Mac\Safari
		if (streamComponent.stream.player.startTimeSeek && streamComponent.stream.player.videoElement.readyState > 2) {
			var tst = streamComponent.stream.player.startTimeSeek;
			streamComponent.stream.player.startTimeSeek = undefined;
			streamComponent.stream.player.videoElement.currentTime = tst;
			return;
		}

		// Detect if we have seeked (jumped from where we were playing)
		// I was using the Video seek event but some browser don't always send the event (Safari, I'm looking at you)
		var streamTimeAtNextBuffer = streamComponent.stream.getStreamTimeAtStreamSegmentIndex(streamComponent.lastBufferedStreamSegmentIndex+1);
		//var segTime = adaptationSet.segmentDuration * (adaptationSet.lastBufferSegmentIndex+1-adaptationSet.segmentOffset);

		if ((streamComponent.stream.player.videoElement.currentTime+0.5) < streamComponent.stream.streamTimeAtLastBufferCheck ||
			streamComponent.stream.player.videoElement.currentTime > streamTimeAtNextBuffer+currentPeriod.segmentDuration*1.5) {
		//if ((adaptationSet.stream.player.videoElement.currentTime+0.5) < adaptationSet.stream.streamTimeAtLastBufferCheck ||
		//	adaptationSet.stream.player.videoElement.currentTime > segTime+adaptationSet.segmentDuration*1.5) {

if (streamComponent.stream.player.debug) console.log('######################################################################################');
if (streamComponent.stream.player.debug) console.log('Seek detected ct:'+streamComponent.stream.player.videoElement.currentTime+' ST:'+streamTimeAtNextBuffer+' LST:'+streamComponent.stream.streamTimeAtLastBufferCheck);
			streamComponent.stream.streamTimeAtLastBufferCheck = streamComponent.stream.player.videoElement.currentTime;
			streamComponent.stream.seek(streamComponent.stream.player.videoElement.currentTime);

			if (streamComponent.stream.isChrome) // Chrome 55+ broke back seeking TODO remove this when fixed.
				streamComponent.stream.hardResetMode=1;
			return;
		}
		streamComponent.stream.streamTimeAtLastBufferCheck = streamComponent.stream.player.videoElement.currentTime;
	
	
		if (streamComponent.sourceBuffer && !streamComponent.sourceBuffer.updating) { // If MediaSource buffer (decoder) is ready
			// ############# Various error conditions, usually caused by nasty browser bugs #####################	
			// Hopefully these cases will fix more bugs than they cause
			// Chrome sometimes dumps the sourceBuffers, segFault or something.
			// If you have trouble following this logic, GO NO FURTHER!, it is not here.
			// These browser bugs took many hours to work around. Hours that I want back!
			if (streamComponent.stream.mediaSource.activeSourceBuffers.length == 0 && streamComponent.stream.hardResetMode==0 && streamComponent.lastInitializedRepresentationIndex != -1) {
				++streamComponent.sourceFailureCounter;
				if (streamComponent.sourceFailureCounter > 0) {
console.error('Somebody deleted my source buffers, that\'s not cool ');
					streamComponent.sourceFailureCounter = -60; // give the player extra cycles to init before a re-attempt
					//var pausedAtError = adaptationSet.stream.player.videoElement.paused;
					// attempt a hard reset
if (typeof(ga) != "undefined") { try { ga('send','event','Error Messages','DASH Playback','Deleted Source'); } catch(err){} }

					++streamComponent.stream.deletedSourceCount;
//console.error('ST:'+adaptationSet.stream.time+" Dur:"+adaptationSet.stream.duration);
					if (streamComponent.lastXHRSegmentStatus == 404 || streamComponent.stream.time > streamComponent.stream.duration-11) {
						// probably at the end of the stream
						streamComponent.stream.onEndOfStream();
						return;
					}
					var playerTimeAtError = streamComponent.stream.time;
					streamComponent.stream.init(false);
					streamComponent.stream.rescuedStreamReseekTime = playerTimeAtError; // return here after re-initializing

					++streamComponent.stream.player._rawQoSData.sourceFailures;
				}
				return;
			} else {
				streamComponent.sourceFailureCounter = 0;
			}
			
			// console.log('  ST:'+streamComponent.stream.time+' SD:'+streamComponent.stream.duration+' BL:'+streamComponent.buffer.length+' PSRL:'+streamComponent.pendingSegmentRequests.length+' DBT:'+streamComponent.getSourceBufferTime());
			// Attempt to detect the end of stream as early as we can
			if (!streamComponent.stream.initializing && !streamComponent.stream.player.videoElement.paused && 
				streamComponent.buffer.length == 0 && streamComponent.pendingSegmentRequests.length == 0 &&
				streamComponent.stream.time > streamComponent.stream.duration-11 &&
				streamComponent.getSourceBufferTime() < 0.5) {
				streamComponent.stream.onEndOfStream();
				return;
			}

			// If the next segment to inject extends past the listed duration of the video, some players
			// will error out and kill the stream (Chrome)					
			if (streamComponent.buffer.length > 0 && !streamComponent.stream.initializing && !streamComponent.stream.player.videoElement.paused &&
				streamComponent.buffer[0].startTime+currentPeriod.segmentDuration > streamComponent.stream.duration) {
//				adaptationSet.stream.onEndOfStream();
				return;
			}
/*
			// TODO Delete this mess as soon as Chrome fixes their mistakes!
			// Chrome sometimes fails to adapt up, blanks out the video and keeps playing without reporting any errors. This is NOT cool.
			// check to see if the playing segment is a different video size than the size reported by the video element
			if (adaptationSet.stream.videoAdaptationSet == adaptationSet &&	adaptationSet.decodedSegments.length > 0) {
				if (adaptationSet.representations[adaptationSet.decodedSegments[0].representationIndex].height != adaptationSet.stream.player.videoElement.videoHeight &&
					!adaptationSet.stream.player.videoElement.paused && adaptationSet.stream.samePlayerTimeCount < 2) {
					++adaptationSet.adaptationFailureCounter;
					if (adaptationSet.adaptationFailureCounter > 15) { // the video element may take a few cycles to update its height
console.error('Adaptation failure detected '+adaptationSet.representations[adaptationSet.decodedSegments[0].representationIndex].height+'p != '+adaptationSet.stream.player.videoElement.videoHeight+'p');

if (typeof(ga) != "undefined") { try { ga('send','event','Error Messages','DASH Playback','Adapt Fail',adaptationSet.stream.player.videoElement.videoHeight); } catch(err){} }

						++adaptationSet.stream.adaptFailureCount;
						adaptationSet.adaptationFailureCounter=0;
						// attempt a hard reset
						var playerTimeAtError = adaptationSet.stream.time;
						adaptationSet.stream.init(false);
						adaptationSet.stream.rescuedStreamReseekTime = playerTimeAtError; // return here after re-initializing

						++adaptationSet.stream.player._rawQoSData.adaptFailures;

						return;
					}
				}
				else {
					adaptationSet.adaptationFailureCounter=0;
				}
			}
*/			

			if (streamComponent.stream.hardResetMode == 1) {
//console.log('HRC dt:'+adaptationSet.stream.player.getDecoderBufferDuration()+' rs:'+adaptationSet.stream.player.videoElement.readyState+' p:'+adaptationSet.stream.player.videoElement.paused+' ct:'+adaptationSet.stream.player.videoElement.currentTime);
				// See if the decoder buffer has run out or videoElement.readyState==2 (waiting for data)
				if (streamComponent.stream.player.getDecoderBufferDuration() < 0.2 || streamComponent.stream.player.videoElement.readyState==2 || streamComponent.stream.player.videoElement.paused) {
console.log('HARD RESET START dt:'+streamComponent.stream.player.getDecoderBufferDuration()+" rs:"+streamComponent.stream.player.videoElement.readyState);
					streamComponent.stream.hardReset();
				}
			}

			// ############# Decoder Buffer Logic #####################	
			// flush the buffer if it is stacking up (for mobile devices and such)
//console.log('append decoder check '+(adaptationSet.isVideo?'Video':'Audio')+' BL:'+adaptationSet.buffer.length+' I:'+adaptationSet.stream.initializing+' HRM:'+adaptationSet.stream.hardResetMode);
			if (streamComponent.sourceBufferFlushCount > 10) {
				streamComponent.sourceBufferFlushCount=0;
				// 3 segs back, don't want to hose the currently playing segment.
				if (streamComponent.stream.player.videoElement.currentTime-currentPeriod.segmentDuration*3 > 0) { // may have seeked to 0
					try { streamComponent.sourceBuffer.remove(0,streamComponent.stream.player.videoElement.currentTime-currentPeriod.segmentDuration*3); } catch(err){}
				}
			}
			// feed any segments to MSE (the decoder) if we have room, then remove them from the JS buffer
			else if (streamComponent.buffer.length > 0 && !streamComponent.stream.initializing && streamComponent.stream.hardResetMode==0) {
//console.log('Decode check v:'+streamComponent.isVideo+' bl:'+streamComponent.buffer.length+' ST:'+streamComponent.buffer[0].startTime+' CT:'+streamComponent.stream.player.videoElement.currentTime+' BT:'+(streamComponent.stream.player.MAX_SOURCE_BUFFER_TIME));
//console.log('CT:'+adaptationSet.stream.player.videoElement.currentTime+' nst:'+adaptationSet.buffer[0].startTime);
//console.log('CPT:'+(adaptationSet.buffer[0].startTime+' '+adaptationSet.stream.player.videoElement.currentTime)+' '+adaptationSet.stream.player.videoElement.readyState );
				if ((streamComponent.buffer[0].startTime-streamComponent.stream.player.videoElement.currentTime) <= streamComponent.stream.player.MAX_SOURCE_BUFFER_TIME-currentPeriod.segmentDuration) {
					var adaptationSet;
					if (streamComponent.isVideo)
						adaptationSet = streamComponent.buffer[0].period.videoAdaptationSet;
					else
						adaptationSet = streamComponent.buffer[0].period.audioAdaptationSet;

					// See if we are adapting and need to load an initialization segment
					if ((streamComponent.buffer[0].representationIndex != streamComponent.lastInitializedRepresentationIndex) ||
						(streamComponent.lastBufferedStreamPeriod != streamComponent.buffer[0].period)) {

						// hasChromeAdaptBug hard reset mode here
						if (streamComponent.stream.hasChromeAdaptBug && 
							streamComponent.isVideo && 
							streamComponent.lastInitializedRepresentationIndex != -1) {
							// stop feeding the decoder & wait for the buffer to run out before triggering a hard reset
console.log('Begin hard reset mode instead of adapting. V:'+streamComponent.isVideo+' LRI:'+streamComponent.lastInitializedRepresentationIndex+'->'+streamComponent.buffer[0].representationIndex);
							streamComponent.stream.hardResetMode = 1;
							return;
						}
if (streamComponent.stream.player.debug) console.log('Decoding init '+adaptationSet.mimeType+' '+(streamComponent.buffer[0].bitrate).toFixed(0)+'kbps '+adaptationSet.representations[streamComponent.buffer[0].representationIndex].initSegmentData.byteLength+' bytes');

						if (streamComponent.stream.player._rawQoSData.timesAdaptedTo[streamComponent.buffer[0].representationIndex]) {
							++streamComponent.stream.player._rawQoSData.timesAdaptedTo[streamComponent.buffer[0].representationIndex];
						} else {
							streamComponent.stream.player._rawQoSData.timesAdaptedTo[streamComponent.buffer[0].representationIndex]=1;
						}

// Ye olde Chrome timestamp hack. Replaced by highly accurate timestamps decoded from the actual segments\init blocks.
//						var tso = -streamComponent.buffer[0].period.mediaTimeOffset+streamComponent.buffer[0].period.streamStartTime;
						// Ugh, magic numbers. Add a hair to account for rounding. Chrome will not play if a seg is after currentTime.
//						if (streamComponent.stream.isChrome || streamComponent.stream.isOpera)
//							tso+=streamComponent.stream.CHROME_HACK_SPLICE_TIME;

//						streamComponent.sourceBuffer.timestampOffset = tso;
//console.log('##############################################');
//console.log('SET TSO:'+streamComponent.buffer[0].period.mediaTimeOffset+" "+tso);
						streamComponent.continuityUpdate = true;

						streamComponent.sourceBuffer.appendBuffer(adaptationSet.representations[streamComponent.buffer[0].representationIndex].initSegmentData);
						streamComponent.lastInitializedRepresentationIndex = streamComponent.buffer[0].representationIndex;
						streamComponent.lastBufferedStreamPeriod = streamComponent.buffer[0].period;
					} else {
						// only feed it if we didn't seek to some terrible place
						if ((streamComponent.buffer[0].startTime+streamComponent.buffer[0].period.segmentDuration+1) > streamComponent.stream.player.videoElement.currentTime) {
							++streamComponent.sourceBufferFlushCount;

if (streamComponent.stream.player.debug) {
	var msinfo = streamComponent.stream.getMediaSegmentIndexAtStreamSegmentIndex(streamComponent.buffer[0].index);
	console.log('Decoding seg '+streamComponent.buffer[0].index+'('+msinfo.mediaSegmentIndex+') '+adaptationSet.mimeType+' '+(streamComponent.buffer[0].bitrate).toFixed(0)+'kbps '+streamComponent.buffer[0].data.byteLength+' bytes at '+streamComponent.buffer[0].startTime+'s state:'+streamComponent.stream.player.videoElement.readyState);
}
							// feed the source buffer & remove from our JS buffer

							var dataArray = new Uint8Array(streamComponent.buffer[0].data);

							// Reset the timestamp offset to a highly accurate value to get around a pedantic Chrome issue
							if (streamComponent.continuityUpdate) {
								var boxes = streamComponent.stream.readMPEGBoxes(dataArray,0,dataArray.length);
								var tfdtBox = streamComponent.stream.getNamedBox(boxes,'tfdt');
								var timestamp = streamComponent.stream.readLong(dataArray,tfdtBox.dataOffset+4);

								var streamTime = streamComponent.stream.getStreamTimeAtStreamSegmentIndex(streamComponent.buffer[0].index);
								var tso = (timestamp/adaptationSet.timescale) - streamTime;
							//	if (streamComponent.stream.isChrome || streamComponent.stream.isOpera)
							//		tso+=streamComponent.stream.CHROME_HACK_SPLICE_TIME;
								var tso2 = -streamComponent.buffer[0].period.mediaTimeOffset+streamComponent.buffer[0].period.streamStartTime;

if (streamComponent.stream.player.debug) console.log('Reset timestamp offset:'+tso+". Delta estimate: "+(tso+tso2)+" ST["+streamComponent.buffer[0].index+"]:"+streamTime);
								streamComponent.sourceBuffer.timestampOffset = -tso;
								streamComponent.continuityUpdate = false;
							}

							streamComponent.sourceBuffer.appendBuffer(dataArray);
							var decodedSegmentInfo = new DashPlayer.DecodedSegment();
							decodedSegmentInfo.timestamp = streamComponent.buffer[0].timestamp;
							decodedSegmentInfo.startTime = streamComponent.buffer[0].startTime;
							decodedSegmentInfo.adaptationSet = streamComponent.buffer[0].adaptationSet;
							decodedSegmentInfo.period = streamComponent.buffer[0].period;
							decodedSegmentInfo.representationIndex = streamComponent.buffer[0].representationIndex;
							streamComponent.decodedSegments.push(decodedSegmentInfo);
							
							if (streamComponent.isVideo) {
								if (streamComponent.stream.player._rawQoSData.segmentsViewed[streamComponent.buffer[0].representationIndex]) {
									++streamComponent.stream.player._rawQoSData.segmentsViewed[streamComponent.buffer[0].representationIndex];
								} else {
									streamComponent.stream.player._rawQoSData.segmentsViewed[streamComponent.buffer[0].representationIndex]=1;
								}
								if (streamComponent._isFullscreen()) {
									++streamComponent.stream.player._rawQoSData.fullscreenSegment;
								}
							}
						} 
						streamComponent.buffer.splice(0,1); // done with this one
					}
				}
			}
		}

		var periodOfNextSegment = streamComponent.stream.periods[streamComponent.stream.getMediaSegmentIndexAtStreamSegmentIndex(streamComponent.lastBufferedStreamSegmentIndex+1).periodIndex];
		var adaptationSetOfNextSegment;
		if (streamComponent.isVideo)
			adaptationSetOfNextSegment = periodOfNextSegment.videoAdaptationSet;
		else
			adaptationSetOfNextSegment = periodOfNextSegment.audioAdaptationSet;

		// ############# Adaptation Logic #####################
		// first, see if we need to adapt (change bitrate representation)
		if (streamComponent.downloadRates.length > 0) {
			var downloadBitrate = streamComponent.getDownloadBitrateKbps();

			// if there is a lower bitrate
			while (streamComponent.currentRepresentationIndex > 0) {
				var frameRateLossForThisRepresentation = 0;
				var currentSegmentBitrate = adaptationSetOfNextSegment.representations[adaptationSetOfNextSegment.representations.length-1].getActualBitrateKbps();
				if (streamComponent.currentRepresentationIndex < adaptationSetOfNextSegment.representations.length) {
					frameRateLossForThisRepresentation = adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].getFrameLossRate();
					currentSegmentBitrate = adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].getActualBitrateKbps();
				}
				// Check if we are losing too many frames
				var frameLossDown = frameRateLossForThisRepresentation >= streamComponent.stream.MAX_FRAME_RATE_LOSS;
				// are we higher than the requested maximum bitrate?
				var overrideDown = streamComponent.stream.player.maxVideoBitrate && streamComponent.stream.player.maxVideoBitrate < currentSegmentBitrate;
				// if it looks like we are not downloading fast enough or we are over the maximum user requested bitrate
				if (downloadBitrate < (currentSegmentBitrate * streamComponent.stream.BITRATE_WIGGLE_ROOM_FACTOR) ||
					streamComponent.currentRepresentationIndex >= adaptationSetOfNextSegment.representations.length ||
					overrideDown || frameLossDown || streamComponent.currentRepresentationIndex >= adaptationSetOfNextSegment.representations.length) {
					streamComponent.lastDownAdaptTime=timeNow;
					--streamComponent.currentRepresentationIndex;
if (streamComponent.stream.player.debug) console.log('### Adapting down to '+(adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].getActualBitrateKbps().toFixed(0))+'kbps, bandwidth is '+downloadBitrate.toFixed(0)+'kbps');
					if (frameLossDown) {
						++adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].frameLossAdaptDownCount;
						// force an immediate seek (drop buffers and start streaming the lower representation)
						streamComponent.stream.seek(streamComponent.stream.player.videoElement.currentTime);
					}
				} else {
					break; // low enough for now
				}
			}
			// if there is a higher bitrate
			while (streamComponent.currentRepresentationIndex < (adaptationSetOfNextSegment.representations.length-1)) {

				var maxScreenWidth = screen.width;
				if (screen.height > maxScreenWidth) { // landscape support
					maxScreenWidth = screen.height;
				}
				maxScreenWidth = maxScreenWidth * window.devicePixelRatio;
				var largerThanScreen = adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].width > maxScreenWidth; // assume the video is wider than tall

				var frameRateLossForNextRepresentation = adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex+1].getFrameLossRate();
				var currentSegmentBitrate = adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].getActualBitrateKbps();
				// are we lower than the requested minimum bitrate?
				var overrideUp = streamComponent.stream.player.minVideoBitrate && streamComponent.stream.player.minVideoBitrate > currentSegmentBitrate;
				// would upping the bitrate put us over a requested maximum?
				var maxLimited = streamComponent.stream.player.maxVideoBitrate && 
					adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex+1].getActualBitrateKbps() > streamComponent.stream.player.maxVideoBitrate;
				// don't adapt up if we adapted down recently or would surpass our estimated bandwidth or encounter high frame loss
				if ((downloadBitrate > (adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex+1].getActualBitrateKbps() * streamComponent.stream.BITRATE_WIGGLE_ROOM_FACTOR) ||
					overrideUp) && !maxLimited && streamComponent.lastDownAdaptTime < timeNow-streamComponent.stream.MIN_ADAPT_DOWN_TIME &&
					frameRateLossForNextRepresentation < streamComponent.stream.MAX_FRAME_RATE_LOSS &&
					(!streamComponent.stream.player.screenConstrain || !largerThanScreen) ) {
					++streamComponent.currentRepresentationIndex;
if (streamComponent.stream.player.debug) console.log('### Adapting up to '+(adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].getActualBitrateKbps().toFixed(0))+'kbps, bandwidth is '+downloadBitrate.toFixed(0)+'kbps');
				} else {
					break; // high enough for now
				}
			}
		}

		// ############# Flaky Network Logic #####################

//console.log('RT: '+(timeNow-adaptationSet.requestStartTime)/1000+' '+adaptationSet.segmentLoading);
		// Check for major network congestion & attempt to rescue
		if (/*(streamComponent.stream.pauseToBuffer || !streamComponent.stream.player.videoElement.paused) && */
			!streamComponent.stream.initializing && streamComponent.buffer.length == 0 && streamComponent.pendingSegmentRequests.length > 0 &&
			streamComponent.pendingSegmentRequests[0].startTimeMs+streamComponent.stream.getLatencyMS()+streamComponent.pendingSegmentRequests[0].period.segmentDuration*1000*1.5 < timeNow &&
			streamComponent.pendingSegmentRequests[0].representationIndex > 0) {

console.error("########################################################");
console.error("Major network congestion Detected, aborting requests. "+(streamComponent.isVideo?'Video':'Audio')+"["+streamComponent.pendingSegmentRequests[0].representationIndex+"]:"+streamComponent.pendingSegmentRequests[0].segIndex);
			// push a fake bandwidth estimate on the stack to help adapt down
			//var downloadBitrateKbps = (adaptationSet.representations[0].getActualBitrateKbps());
			var downloadBitrateKbps = 0;
			streamComponent.stream.videoStreamComponent.downloadRates = []; // clear it
			streamComponent.stream.videoStreamComponent.downloadRates.push(downloadBitrateKbps);
			streamComponent.stream.audioStreamComponent.downloadRates = []; // clear it
			streamComponent.stream.audioStreamComponent.downloadRates.push(downloadBitrateKbps);

			streamComponent.stream.seek(streamComponent.stream.player.videoElement.currentTime);
			//adaptationSet.stream.player.videoElement.currentTime = adaptationSet.stream.player.videoElement.currentTime+1;
			++streamComponent.stream.congestionCount;

			++streamComponent.stream.player._rawQoSData.congestionFailures;

			return;
		}

		// Check if we need to stop and allow the stream to buffer up
		// This should only happen on startup, seeking or under VERY spotty network conditions
//console.log('Check start. paused:'+streamComponent.stream.player.videoElement.paused+' BL:'+streamComponent.buffer.length+' SBT:'+streamComponent.getSourceBufferTime()+' DSL:'+streamComponent.decodedSegments.length);
		if (!streamComponent.stream.player.videoElement.paused && 
			streamComponent.buffer.length == 0 && 
			streamComponent.getSourceBufferTime() == 0) {

			// See if we are at the end of the video
			// TODO can we handle the 1 second offset in a better way?
			if (streamComponent.stream.player.videoElement.currentTime >= streamComponent.stream.player.videoElement.duration-1 ||
				streamComponent.lastXHRSegmentStatus == 404) {
				streamComponent.stream.onEndOfStream();
				//adaptationSet.stream.player.videoElement.currentTime=0;
			} else if (streamComponent.stream.player.videoElement.currentTime < streamComponent.stream.player.videoElement.duration-10) {
				// TODO maybe there is a better way to handle this...
if (streamComponent.stream.player.debug)
	console.log('________________________Pausing to buffer________________________');
				streamComponent.stream.pauseToBuffer = true;
				if (!streamComponent.stream.player.videoElement.paused && streamComponent.stream.playing) {
					streamComponent.stream.player.videoElement.pause();
				}
			}
		}

		// Check to see if we are buffer paused and can now restart
		if (streamComponent.stream.pauseToBuffer && 
			(streamComponent.stream.videoStreamComponent.getSourceBufferTime() > 0 ||
			streamComponent.stream.audioStreamComponent.getSourceBufferTime() > 0) &&
			streamComponent.stream.videoStreamComponent.buffer.length > 0 &&
			streamComponent.stream.audioStreamComponent.buffer.length > 0) {
			streamComponent.stream.pauseToBuffer = false;
//console.log('______________________START PLAY__________________________________');
			streamComponent.stream.player.videoElement.play();
//console.log('RESTARTING FROM BUFFER PAUSE');
		}
		
		// ############# JS Buffer Logic #####################	
		// Prepare to download a new segment (if we think we can)
		// Ideally, we would never download two segments at once as it would mess up our download bandwith calculation
		// but if latency is high enough, we will try to time the payloads back to back (removing latency) which should 
		// allow us to stream much higher video bitrates.
		var latencyMs = streamComponent.stream.getLatencyMS();

		// if we were to load a segment now, when do we think it would complete
		var estimatedSegmentKilobitSize = adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex].getActualBitrateKbps()*periodOfNextSegment.segmentDuration;
		var estimatedRequestDurationMs = latencyMs+estimatedSegmentKilobitSize/streamComponent.getDownloadBitrateKbps()*1000;
//console.log('ERD '+estimatedRequestDurationMs.toFixed(0)+' '+adaptationSet.mimeType);
		var estimatedRequestEndTime = timeNow+estimatedRequestDurationMs;
		
		// would we overlap an existing download exlcuding latency?
		var wouldOverlap = false;
		var earlyLoadMs = 0;
		if (streamComponent.pendingSegmentRequests.length > 0) {
			// Helps HIGH latency streams, mobile networks, Japan, etc. This little block of code allowed me to watch a 
			// 1080p 6mbit stream at 2.5s latency on 2s segments! That means we could watch HD video from the Moon.
//console.log('OLC:'+(adaptationSet.pendingSegmentRequests[adaptationSet.pendingSegmentRequests.length-1].estimatedRequestEndTime-(timeNow+latencyMs))+' '+adaptationSet.pendingSegmentRequests[adaptationSet.pendingSegmentRequests.length-1].estimatedRequestEndTime);
			if ((streamComponent.pendingSegmentRequests[streamComponent.pendingSegmentRequests.length-1].estimatedRequestEndTime) >
				(timeNow+latencyMs)) {
				wouldOverlap = true;
			} else {
				earlyLoadMs = streamComponent.pendingSegmentRequests[streamComponent.pendingSegmentRequests.length-1].estimatedRequestEndTime-timeNow;
			}
		}
		if (!wouldOverlap) {
			// what would the estimated JS buffer size be at estimatedRequestEndTime
			var estimatedSegsInBuffer = streamComponent.buffer.length + streamComponent.pendingSegmentRequests.length;
			// now subtract any segs that would feed into the source buffer
			if (!streamComponent.stream.player.videoElement.paused) {
				var timePalyingCurrentSegMs = 0;
//				if (adaptationSet.decodedSegments.length > 0) {
//					timePalyingCurrentSegMs = (adaptationSet.stream.time - adaptationSet.decodedSegments[0].startTime)*1000;
//console.log('TPCS:'+timePalyingCurrentSegMs);
//				}
				var estimatedFedSegs = Math.floor((estimatedRequestDurationMs+timePalyingCurrentSegMs) / (periodOfNextSegment.segmentDuration*1000));
				estimatedSegsInBuffer-=estimatedFedSegs;
			}
//console.log('ESB:'+estimatedSegsInBuffer);
			// Sanity check. This might stop us from being able to stream from deep space but chances are there will be overlap
			// The more pending requests we allow, the greater chance for response overlap which will mess up our calculated 
			// capacity and latency.
			if (streamComponent.pendingSegmentRequests.length < 6) {
				// If we think the JS buffer will have room
				if ((estimatedSegsInBuffer+1)*periodOfNextSegment.segmentDuration <= streamComponent.stream.player.MAX_BUFFER_TIME) {
					//var segTime = periodOfNextSegment.segmentDuration * (streamComponent.lastBufferSegmentIndex+1-adaptationSet.segmentOffset);
					var segTime = streamComponent.stream.getStreamTimeAtStreamSegmentIndex(streamComponent.lastBufferedStreamSegmentIndex+1);
					// If it is not past the end of the video
					if (segTime < streamComponent.stream.duration) {
						// If it is not before the current playing time
						if (segTime > streamComponent.stream.player.videoElement.currentTime - periodOfNextSegment.segmentDuration*2) {
							// Don't loop forever if everything is an error
							if (streamComponent.stream.responseErrorCount < 100) {
								// Issue an HTTP request for then next segment
								++streamComponent.lastBufferedStreamSegmentIndex;
								var representation = adaptationSetOfNextSegment.representations[streamComponent.currentRepresentationIndex];
								var url = representation.segmentUrlTemplate;
								url = url.replace('$RepresentationID$',representation.id);
								var mediaSegmentInfo = streamComponent.stream.getMediaSegmentIndexAtStreamSegmentIndex(streamComponent.lastBufferedStreamSegmentIndex);
								// sanity check
								if (mediaSegmentInfo.mediaSegmentIndex < 0) {
									mediaSegmentInfo.mediaSegmentIndex=0;
									++streamComponent.lastBufferedStreamSegmentIndex;
								}
								url = url.replace('$Number$',mediaSegmentInfo.mediaSegmentIndex);
								url = adaptationSetOfNextSegment.constructURL(representation,url);
	//if (streamComponent.stream.player.debug) console.log('Buffering seg '+streamComponent.lastBufferedStreamSegmentIndex+'['+mediaSegmentInfo.mediaSegmentIndex+'] '+adaptationSetOfNextSegment.mimeType+' '+representation.getActualBitrateKbps().toFixed(0)+'kbps queue:'+streamComponent.pendingSegmentRequests.length+' Early:'+earlyLoadMs.toFixed(0)+'ms.');
								streamComponent.bufferData(representation,streamComponent.currentRepresentationIndex,url,streamComponent.lastBufferedStreamSegmentIndex,estimatedRequestEndTime);
							}
						}
					}
				}
			}
		}
	
		// check for dropped frames. Still trying to find a device\computer with this issue.
		if (streamComponent.isVideo) { // only count video dropped frames
			var droppedFrames = 0;
			if(typeof streamComponent.stream.player.videoElement.getVideoPlaybackQuality === 'function') { // Firefox & stuff that follows spec.
				var vdeoPlaybackQuality = streamComponent.stream.player.videoElement.getVideoPlaybackQuality();
				if (vdeoPlaybackQuality) {
					droppedFrames = vdeoPlaybackQuality.droppedVideoFrames;
				}
			} 
			else if ("webkitDroppedFrameCount" in streamComponent.stream.player.videoElement) { // Chrome/Safari?
				droppedFrames = streamComponent.stream.player.videoElement.webkitDroppedFrameCount;
			}
			if (droppedFrames != streamComponent.stream.lastDroppedFrameCount && streamComponent.decodedSegments[0]) {
				var diff = droppedFrames - streamComponent.stream.lastDroppedFrameCount;

				if (streamComponent.stream.player._rawQoSData.droppedFrames[streamComponent.decodedSegments[0].representationIndex]) {
					streamComponent.stream.player._rawQoSData.droppedFrames[streamComponent.decodedSegments[0].representationIndex]+=diff;
				} else {
					streamComponent.stream.player._rawQoSData.droppedFrames[streamComponent.decodedSegments[0].representationIndex]=diff;
				}

				if (diff > 0 && streamComponent.decodedSegments.length > 0) {
					adaptationSetOfNextSegment.representations[streamComponent.decodedSegments[0].representationIndex].droppedFrameCount += diff;
//console.log('DF['+adaptationSet.decodedSegments[0].representationIndex+'] '+adaptationSet.representations[adaptationSet.decodedSegments[0].representationIndex].droppedFrameCount+'f '+adaptationSet.representations[adaptationSet.decodedSegments[0].representationIndex].getFrameLossRate()+'fps');
				}
				streamComponent.stream.lastDroppedFrameCount = droppedFrames;
			}
		}

		// A post JS buffer tracker to help locate info on the currently playing segment (in the source buffer)
		// Offers API users extra info. dashplayer doesn't need it.
		if (streamComponent.decodedSegments.length > 1 && streamComponent.decodedSegments[1].startTime < streamComponent.stream.player.videoElement.currentTime) {
			++streamComponent.decodedSegments[0].adaptationSet.representations[streamComponent.decodedSegments[0].representationIndex].segmentsPlayed;
			streamComponent.decodedSegments.splice(0,1);
		}
	};

	this._isFullscreen = function() { // current working methods
		return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
	}

	this.getBufferTime = function() {
		if (streamComponent.buffer.length > 0) {
			if (streamComponent.buffer[0].startTime < streamComponent.stream.player.videoElement.currentTime) {
				return 0; // probably seeking
			}
			if (streamComponent.buffer[0].startTime - streamComponent.stream.player.videoElement.currentTime > streamComponent.stream.player.MAX_SOURCE_BUFFER_TIME) {
				return 0; // probably seeking
			}
			return streamComponent.buffer[streamComponent.buffer.length-1].startTime+streamComponent.buffer[streamComponent.buffer.length-1].period.segmentDuration - streamComponent.stream.player.videoElement.currentTime;
		} else {
			return 0;
		}
	}

	this.getSourceBufferTime = function() {
		if (streamComponent.decodedSegments.length > 0) {
			var seg = streamComponent.decodedSegments[streamComponent.decodedSegments.length-1];
			return seg.startTime+seg.period.segmentDuration - streamComponent.stream.player.videoElement.currentTime;
		} else {
			return 0;
		}
	}

	// seek the MSE to the video time, also may help reset\flush a hosed stream
	this.seek = function() {
		var abortedRequests = [];
		while (streamComponent.pendingSegmentRequests.length > 0) { // drop pending requests
//console.log('Abort '+(adaptationSet.isVideo?'Video':'Audio')+'['+adaptationSet.pendingSegmentRequests[0].representationIndex+']:'+adaptationSet.pendingSegmentRequests[0].segIndex);
			streamComponent.pendingSegmentRequests[0].aborted = true;
			abortedRequests.push(streamComponent.pendingSegmentRequests[0]);
			streamComponent.pendingSegmentRequests.splice(0,1);
		}

		// throw out our current buffers, and begin anew
		++streamComponent.seekCount;
		var period = streamComponent.stream.getPeriodAtStreamTime(streamComponent.stream.player.videoElement.currentTime);
		var adaptationSet;
		if (streamComponent.isVideo)
			adaptationSet = period.videoAdaptationSet;
		else
			adaptationSet = period.audioAdaptationSet;
		if (!adaptationSet)
			return;

		//streamComponent.lastBufferedStreamSegmentIndex = Math.floor((streamComponent.stream.player.videoElement.currentTime) / adaptationSet.segmentDuration)-1 + adaptationSet.segmentOffset;
		//streamComponent.lastBufferedStreamSegmentIndex = streamComponent.stream.getStreamSegmentIndexAtStreamTime(streamComponent.stream.player.videoElement.currentTime)-1;

		// The -0.1 is a hack to get around a rounding bug in the IE\Edge MediaSource implementation
		streamComponent.lastBufferedStreamSegmentIndex = streamComponent.stream.getStreamSegmentIndexAtStreamTime(streamComponent.stream.player.videoElement.currentTime-streamComponent.stream.IE_HACK_SEEK_TIME)-1;
		if (streamComponent.lastBufferedStreamSegmentIndex < -1)
			streamComponent.lastBufferedStreamSegmentIndex = -1;

		streamComponent.buffer = [];
		streamComponent.decodedSegments = [];
		streamComponent.lastInitializedRepresentationIndex = -1;

if (streamComponent.stream.player.debug) console.log('Seek '+streamComponent.stream.player.videoElement.currentTime+' '+adaptationSet.mimeType);
//console.log('LBSI:'+adaptationSet.lastBufferedStreamSegmentIndex+' SO:'+adaptationSet.segmentOffset);
		if (streamComponent.sourceBuffer) {
			try {
//console.log('RS:'+adaptationSet.stream.mediaSource.readyState);
				if (streamComponent.stream.mediaSource.readyState == 'open') {
					streamComponent.sourceBuffer.abort();
				}
				// TODO Android Chrome bug, remove is async and does not complete before it disables the updating flag.
				// this causes the player to freeze. I guess we will have to rely on the impls. cache eviction.
				//adaptationSet.sourceBuffer.remove(0,99999999);
			} catch(error) { // MediaSource may have dropped the ball
				// TODO resort to more extreme measures in an atempt to rescue this stream
				// re-init did not fix it.
				console.error('Error seeking, MediaSource probably died:');
				console.error(error.message);
			}
		}
		while (abortedRequests.length > 0) {
			// xhr.abort has strange sync\async issues in some browsers so save it for last
			abortedRequests[0].xhr.abort();
			abortedRequests.splice(0,1);
		}
	};

	// The segment HTTP loader
	this.bufferData = function(representation,representationIndex,url,segIndex,estimatedRequestEndTime) {
		var requestSeekCount = streamComponent.seekCount;
		var pendingRequest = new DashPlayer.PendingSegmentRequest();
		pendingRequest.startTimeMs = new Date().getTime();
		pendingRequest.representationIndex = representationIndex;
		pendingRequest.adaptationSet = representation.adaptationSet;
		pendingRequest.period = representation.adaptationSet.period;
		pendingRequest.xhr = new XMLHttpRequest(); // Set up xhr request
		pendingRequest.estimatedRequestEndTime = estimatedRequestEndTime;
		pendingRequest.segIndex = segIndex;
		streamComponent.pendingSegmentRequests.push(pendingRequest);
		streamComponent.stream.loadData(url,pendingRequest.xhr,function(xhr,latency) {
			var status = xhr.status;
			var reqIdx = streamComponent.pendingSegmentRequests.indexOf(pendingRequest);
			// Handle response errors
			if (status != 200) {
				if (status >= 400) {
					console.error('Server returned a '+status+' for request:'+url+', attempting a restart.');
					streamComponent.stream.hardResetMode = 1;
					++streamComponent.stream.responseErrorCount;
				}
				if (reqIdx >= 0) { // throw away if the user seeked or the request was aborted
					streamComponent.pendingSegmentRequests.splice(reqIdx,1);
				}
				return;
			}

			//only append the buffer if the user did not seek while we waited
			streamComponent.lastXHRSegmentStatus = status;
			if (requestSeekCount == streamComponent.seekCount && xhr.response && !pendingRequest.aborted) {
				var timeNow =  new Date().getTime();
				pendingRequest.latencyMs = latency;
				pendingRequest.data = xhr.response;
				pendingRequest.representationIndex = representationIndex;
				pendingRequest.totalRequestTimeMs = timeNow - pendingRequest.startTimeMs;
				
				// if they came in out of order, we may need to load multiple responses
				while (streamComponent.pendingSegmentRequests.length > 0 && streamComponent.pendingSegmentRequests[0].data) {
					pendingRequest = streamComponent.pendingSegmentRequests[0];
					streamComponent.pendingSegmentRequests.splice(0,1);
					var rep = pendingRequest.adaptationSet.representations[pendingRequest.representationIndex];
					var newSeg = new DashPlayer.Segment();
					newSeg.index = pendingRequest.segIndex;
					newSeg.adaptationSet = rep.adaptationSet;
					newSeg.period = rep.adaptationSet.period;
					newSeg.startTime = newSeg.period.segmentDuration * (pendingRequest.segIndex/*-adaptationSet.segmentOffset*/);
					newSeg.timestamp = timeNow;

					// Note: We subtract latency here because we have specialized code to handle high latency situations by 
					// multitasking downloads in an attempt to eliminate latency and keep the data stream continuous without 
					// overlap. If we kept latency in the calculation, it would skew the DL bandwith, low video bitrates 
					// would bring down the bandwith. If we removed latency from the calculation without specialized code, 
					// high latency situations would tell us to adapt too high. We could keep latency in the calculation by 
					// normalizing it against (latency/true DL kbps) but we would end up adapting down when we might be able 
					// to keep a high bitrate by multitasking downloads, hence the specialized code.
					var dlTimeMs = pendingRequest.totalRequestTimeMs-pendingRequest.latencyMs;
					if (dlTimeMs > 0) { // sanity check, JS timing can be wonky
						var downloadBitrateKbps = (pendingRequest.data.byteLength*8/1000 / ((dlTimeMs)/1000));
						if (streamComponent.isVideo) {
							streamComponent.stream.player._rawQoSData.bandwidthSamples.push(downloadBitrateKbps);
						}
						++streamComponent.stream.player._rawQoSData.volumeSamples;
						streamComponent.stream.player._rawQoSData.volumeTotal+=streamComponent.stream.player.videoElement.volume;
						streamComponent.downloadRates.push(downloadBitrateKbps);
						if (streamComponent.downloadRates.length > streamComponent.stream.DOWNLOAD_BITRATE_AVERAGE_SAMPLE_SIZE) { // cap at the 5 latest requests
							streamComponent.downloadRates.splice(0,1);
						}
						rep.actualBitrate.push(pendingRequest.data.byteLength*8/1000/pendingRequest.period.segmentDuration);
						if (rep.actualBitrate.length > streamComponent.stream.SEGMENT_BITRATE_AVERAGE_SAMPLE_SIZE) { // cap at the 5 latest requests
							rep.actualBitrate.splice(0,1);
						}
					}
					newSeg.bitrate = rep.getActualBitrateKbps();
					newSeg.data = pendingRequest.data;
//console.log('GOT '+url+' '+newSeg.data.byteLength);
					newSeg.representationIndex = pendingRequest.representationIndex;
					streamComponent.buffer.push(newSeg);

					// if no more active requests remain or the oldest request is still pending, exit the loop
					if (streamComponent.pendingSegmentRequests.length == 0 || streamComponent.pendingSegmentRequests[0].totalRequestTimeMs == -1) {
						break;
					}
				}
			} else if (reqIdx >= 0) { // throw away if the user seeked or the request was aborted
				streamComponent.pendingSegmentRequests.splice(reqIdx,1);
			}
			// start another checkBuffer here, we may need to quickly chain buffer (on init or after seek)
			streamComponent.checkBuffer();
		});
	}

	// MSE calls this after finishing appendBuffer,remove,abort & stuff
	this.onSourceBufferUpdate = function() {
		streamComponent.stream.checkInitialized();
		// we may need to quickly chain feed MSE
		streamComponent.checkBuffer();
	}
	
	// average up to the last DOWNLOAD_BITRATE_AVERAGE_SAMPLE_SIZE download kbps results
	this.getDownloadBitrateKbps = function() {
		var val = 3000; // middle of the road guess on startup
		if (streamComponent.downloadRates.length > 0) {
			var sum = 0;
			for (var i=0;i<streamComponent.downloadRates.length;++i) {
				sum+=streamComponent.downloadRates[i];
			}
			val = sum / streamComponent.downloadRates.length;
		}
		// If we have an ongoing request, factor it in only if it is well past due, we can guess the kbps
		// TODO this needs further balancing
		if (streamComponent.pendingSegmentRequests.length > 0) {
			var timeNow = new Date().getTime();
			var latestPending = streamComponent.pendingSegmentRequests[0];

			if (timeNow > latestPending.estimatedRequestEndTime+100) {
				var downloadTimeSoFarS = (timeNow - latestPending.startTimeMs - streamComponent.stream.getLatencyMS())/1000;
				if (downloadTimeSoFarS > 0) {
					var estimatedDataSizeKb = latestPending.adaptationSet.representations[latestPending.representationIndex].bitrate/1000 * latestPending.period.segmentDuration;
					var estimatedCurrentKbps = estimatedDataSizeKb/downloadTimeSoFarS;
//console.log('kbps:'+val+' ekbps:'+estimatedCurrentKbps+' s:'+downloadTimeSoFarS);
					val = val * 0.5 + estimatedCurrentKbps * 0.5;
				}
			}
		}
		return val;
	}
}

DashPlayer.Period = function() {
	var period = this;

	this.streamStartTime = 0; // in seconds, always 0 for the first period, then the sum of previous period durations
	this.streamStartSegment = 0; // always 0 for the first period, then the sum of previous period segment counts
	this.mediaSegmentOffset = 0; // the first segment index in the source media for this period
	this.mediaTimeOffset = 0; // The start time in seconds in the source media for this period
	this.segmentDuration = 0; // in seconds (floating point)
	this.segmentCount = 0; // The number of segments in this period
	this.duration = 0; // in seconds of this period
	this.movieId = ''; // not part of the DASH spec but we use this for trick-play images

	this.audioAdaptationSet = undefined; // possibly multiple audio bitrates
	this.videoAdaptationSet = undefined; // possibly multiple video bitrates
	this.stream = undefined; // parent pointer
}

DashPlayer.AdaptationSet = function() {
	var adaptationSet = this;
	this.mimeType = undefined; // from the manifest
	this.codecs = undefined; // from the manifest
	this.representations = []; // sorted low to high
	this.period = undefined; // parent pointer
	this.isVideo = false;
	this.timescale = 0;

	this.constructURL = function(representation,filename) {
		if (representation.baseURL.length > 0) {
			if (representation.baseURL.charAt(0) == '/') {
				return adaptationSet.stream.manifestProtocolHostAndPort + representation.baseURL + filename;
			} else if (representation.baseURL.indexOf("://") != -1) {
				return representation.baseURL + filename;
			}
		}
		return adaptationSet.period.stream.manifestProtocolHostAndPort + adaptationSet.period.stream.manifestBaseURLPath + representation.baseURL + filename;
	}

	this.initRep = function(repIdx) {
		var representation = adaptationSet.representations[repIdx];
		var url = representation.initializationUrlTemplate;
		url = url.replace('$RepresentationID$',representation.id);
		url = adaptationSet.constructURL(representation,url);
		var xhr = new XMLHttpRequest(); // Set up xhr request
		adaptationSet.period.stream.loadData(url,xhr,function(xhr){
			adaptationSet.representations[repIdx].repInit=true;
			if (xhr.status >= 400) { // couldn't get the init block, drop this representation
				adaptationSet.representations.splice(repIdx,1);
				if (adaptationSet.currentRepresentationIndex >= adaptationSet.representations.length) {
					--adaptationSet.currentRepresentationIndex;
				}
			} else {

				var dataArray = new Uint8Array(xhr.response);

				// Extract the raw sample timescale from each init block. Need this to calculate
				// a highly accurate timestamp after a seek.
				var boxes = adaptationSet.period.stream.readMPEGBoxes(dataArray,0,dataArray.length);
				var mdhdBox = adaptationSet.period.stream.getNamedBox(boxes,'mdhd');
				if (dataArray[mdhdBox.dataOffset]==1)
					adaptationSet.timescale = adaptationSet.period.stream.readInt(dataArray,mdhdBox.dataOffset+20);
				else
					adaptationSet.timescale = adaptationSet.period.stream.readInt(dataArray,mdhdBox.dataOffset+12);

				representation.initSegmentData = dataArray;

				// see if all rep inits have been loaded
				var allLoaded = true;
				for (var i=0;i<adaptationSet.representations.length;++i) {
					if (!adaptationSet.representations[repIdx].repInit) {
						allLoaded = false;
						break;
					}
				}
				if (allLoaded) {
					adaptationSet.initializing = false;
					adaptationSet.period.stream.checkInitialized();
				}
			}
		});
	}

}

// one for each bitrate (audio or video)
DashPlayer.Representation = function() {
	var representation = this;
	this.id = undefined; // from the manifest
	this.codecs = undefined; // from the manifest
	this.width = undefined; // from the manifest
	this.height = undefined; // from the manifest
	this.bitrate = undefined; // NOTE! in bps, that's BITS per second from the manifest XML
	this.actualBitrate = []; // keep up to 5 & average them to get the actual stream bitrate
	this.droppedFrameCount=0; // frame loss from this representation (since last frame loss reset)
	this.segmentsPlayed=0; // number of segments played from this representation (since last frame loss reset)
	this.initSegmentData = undefined; // the init segment for this representation (all are loaded after the manifest)
	this.adaptationSet = undefined; // parent pointer
	this.frameLossAdaptDownCount=0; // The number of times we have adapted down from this representation due to frame loss
	this.lastFrameLossRateReset = new Date().getTime();
	this.initializationUrlTemplate = undefined; // from the manifest
	this.segmentUrlTemplate = undefined; // from the manifest
	this.baseURL = ''; // from the manifest, concatenated BaseURL elements from mpd,period,adaptationSet or representation

	// dropped frames / second
	this.getFrameLossRate = function() {
		var timeNow = new Date().getTime();
		if (timeNow - representation.lastFrameLossRateReset > representation.adaptationSet.FRAME_LOSS_RATE_RESET_TIME_MS * (representation.frameLossAdaptDownCount+1)) {
			representation.lastFrameLossRateReset = timeNow;
			representation.droppedFrameCount = 0;
			representation.segmentsPlayed = 0;
		}
		if (representation.droppedFrameCount == 0) {
			return 0;
		}
		return representation.droppedFrameCount / ((representation.segmentsPlayed+1) * representation.adaptationSet.period.segmentDuration);
	}
	
	// average up to the last SEGMENT_BITRATE_AVERAGE_SAMPLE_SIZE download kbps results
	this.getActualBitrateKbps = function() {
		if (representation.actualBitrate.length > 1) {
			var sum = 0;
			for (var i=0;i<representation.actualBitrate.length;++i) {
				sum+=representation.actualBitrate[i];
			}
			return sum / representation.actualBitrate.length;
		}
		return representation.bitrate/1000; // what was stated in the manifest
	}

}

// multiple segment requests may be out there at the same time (we try to line them up removing latency gaps)
DashPlayer.PendingSegmentRequest = function() {
	var pendingSegmentRequest = this;
	this.xhr = undefined;
	this.startTimeMs = 0;
	this.period = undefined;
	this.segIndex = 0;
	this.adaptationSet = undefined;
	this.representationIndex=0;
	this.latencyMs = -1;
	this.totalRequestTimeMs=-1;
	this.aborted = false;
	this.data = undefined; // may need to hold data for a short time if this request returns out of order
	this.estimatedRequestEndTime = 0;
}

// this is what our JS buffer holds, downloaded segments ready to append to the decoder
DashPlayer.Segment = function() {
	this.timestamp = 0; // when we fully downloaded this segment in real time
	this.startTime = 0; // stream time in seconds when this segment begins
	this.period = undefined;
	this.adaptationSet = undefined;
	this.index = 0; // The segment index (used to determine the video play time of a segment)
	this.bitrate = 0; // in kbps
	this.data = undefined; // raw segment data
	this.representationIndex = 0; // which bitrate
}

// Information on the segments sitting in the decoder buffer that are playing or waiting to be played
DashPlayer.DecodedSegment = function() {
	this.timestamp = 0; // when we fully downloaded this segment in real time
	this.period = undefined;
	this.adaptationSet = undefined;
	this.startTime = 0; // stream time in seconds when this segment begins
	this.representationIndex = 0; // which bitrate
}

// All the manifest stuff below (VERY bare bones MPD parser that ONLY works with my server manifests but could be expanded)
DashPlayer.Manifest = function() {
	var manifest = this;
	
	this.loadManifest = function(url,callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.responseType = "text";
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == xhr.DONE) {
				var status = xhr.status;
				if (status <= 400) {
					var xmlDoc = undefined;
					if (window.DOMParser) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(xhr.response, "text/xml");
					} else {
						xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
						xmlDoc.async=false;
						xmlDoc.loadXML(xhr.response); 
					}
					var stream = new DashPlayer.Stream();

					var idx1 = url.indexOf('://');
					var idx2 = url.indexOf('/',idx1+3);
					var idx3 = url.lastIndexOf('/')+1;
					stream.manifestProtocolHostAndPort = url.substring(0,idx2);
					stream.manifestBaseURLPath = url.substring(idx2,idx3);
					manifest.parseDOM(xmlDoc.documentElement,stream,{});
					if (stream.periods.length > 0) {
						stream.duration = 0;
						// re-align all durations with actual segments
						var segCount = 0;
						for (var i=0;i<stream.periods.length;++i) {
							var period = stream.periods[i];
							period.numSegments = Math.floor(period.duration/period.segmentDuration);
							period.duration = period.numSegments*period.segmentDuration;
							period.streamStartTime = stream.duration;
							period.streamStartSegment = segCount;
							stream.duration += period.duration;
							segCount+=period.numSegments;
						}
					}
					if (stream.hasChromeAdaptBug)
						stream.MIN_ADAPT_DOWN_TIME *= 3;
					callback(stream);
				}
			}
		};
	}

	this.parseDOM = function(node,stream,valueHolder,currentPeriod,currentAdaptation,currentRepresentation) {
		if (node.nodeName == 'MPD') {
			var pd = node.getAttribute("mediaPresentationDuration"); // PT9229S
			if (pd) {
				pd = pd.substring(2,pd.length-1);
				stream.duration = parseFloat(pd);
			}
			valueHolder.mpdBaseURL = '';
			valueHolder.periodBaseURL = '';
			valueHolder.adaptationSetBaseURL = '';
		} else if (node.nodeName == 'BaseURL') {
			var innerURL = node.innerHTML;
			if (!innerURL)
				innerURL = node.textContent;
			if (!currentPeriod) // defined inside an mpd
				valueHolder.mpdBaseURL = innerURL;
			else if (!currentAdaptation) // defined inside a Period
				valueHolder.periodBaseURL = innerURL;
			else if (!currentRepresentation) // defined inside an AdaptationSet
				valueHolder.adaptationSetBaseURL = innerURL;
			else // defined inside a representation
				currentRepresentation.baseURL = valueHolder.mpdBaseURL+valueHolder.periodBaseURL+valueHolder.adaptationSetBaseURL+innerURL;
		} else if (node.nodeName == 'Period') {
			currentPeriod = new DashPlayer.Period();
			stream.periods.push(currentPeriod);
			currentPeriod.stream = stream;
			currentPeriod.movieId = node.getAttribute("movieId"); // Not part of the DASH spec, we use it for trick-play images
			var pd = node.getAttribute("duration"); // PT9229S
			if (pd) {
				pd = pd.substring(2,pd.length-1);
				currentPeriod.duration = parseFloat(pd);
			} else {
				currentPeriod.duration = stream.duration;
			}
		} else if (node.nodeName == 'AdaptationSet') {
			currentAdaptation = new DashPlayer.AdaptationSet();
			currentAdaptation.mimeType = node.getAttribute("mimeType");
			currentAdaptation.codecs = node.getAttribute("codecs");
			if (currentAdaptation.mimeType.substring(0,5) == 'audio') {
				currentPeriod.audioAdaptationSet = currentAdaptation;
			} else {
				currentPeriod.videoAdaptationSet = currentAdaptation;
			}
		} else if (node.nodeName == 'SegmentTemplate') {
			var duration =  parseFloat(node.getAttribute("duration"));
			var timescale =  parseInt(node.getAttribute("timescale"));
			//if (node.getAttribute("presentationTimeOffset")) {
				//currentAdaptation.startTime = parseInt(node.getAttribute("presentationTimeOffset")) / timescale;
			//}
			if (node.getAttribute("startNumber")) {
				currentPeriod.mediaSegmentOffset = parseInt(node.getAttribute("startNumber"));
			}
			valueHolder.currentInitializationUrlTemplate = node.getAttribute("initialization");
			valueHolder.currentSegmentUrlTemplate = node.getAttribute("media");
			if (currentRepresentation) { // This will happen if SegmentTemplate is defined inside a Representation
				currentRepresentation.initializationUrlTemplate = valueHolder.currentInitializationUrlTemplate;
				currentRepresentation.segmentUrlTemplate = valueHolder.currentSegmentUrlTemplate;
			}
			currentPeriod.segmentDuration = duration/timescale;
			currentPeriod.mediaTimeOffset = currentPeriod.mediaSegmentOffset * currentPeriod.segmentDuration;
			currentAdaptation.period = currentPeriod;
		} else if (node.nodeName == 'Representation') {
			var rep = new DashPlayer.Representation();
			currentRepresentation = rep;
			rep.id = node.getAttribute("id");
			rep.width = node.getAttribute("width");
			rep.height = node.getAttribute("height");
			rep.codecs = node.getAttribute("codecs");
			if (!rep.codecs) {
				rep.codecs = currentAdaptation.codecs;
			}
			rep.adaptationSet = currentAdaptation;
			rep.bitrate = parseInt(node.getAttribute("bandwidth"));
			rep.baseURL = valueHolder.mpdBaseURL+valueHolder.periodBaseURL+valueHolder.adaptationSetBaseURL;
			// This will happen if SegmentTemplate is defined inside AdaptationSet or Period
			rep.initializationUrlTemplate = valueHolder.currentInitializationUrlTemplate;
			rep.segmentUrlTemplate = valueHolder.currentSegmentUrlTemplate;
			currentAdaptation.representations.push(rep);
		}
		if (node.childNodes) {
			for (var i=0;i<node.childNodes.length;++i) {
				manifest.parseDOM(node.childNodes.item(i),stream,valueHolder,currentPeriod,currentAdaptation,currentRepresentation);
			}
		}
		// sort the representations low to high
		if (node.nodeName == 'AdaptationSet') {
			currentAdaptation.representations.sort(function(a,b){return a.bitrate-b.bitrate});
		}
	}
}