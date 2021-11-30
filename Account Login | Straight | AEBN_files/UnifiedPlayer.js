 // TODO
// gear icon
// unified player packaging
// no javascript solution
// - No DASH, only full frame HLS, MP4, Flash, MSSS
// - URL goes to server for server side delivery
// - Server side format detection w/cookie override
var UnifiedPlayer = function() {
	var unifiedPlayer = this;
	this.embedElementId = undefined;
	this.unifiedPlayerHome = '/unifiedplayer/';
	this.fullFrameUrl = undefined;

	// if the player is in modal mode - these following variables will have no impact.
	// Width and height of the player window.
	this.windowWidth = 848;
	this.windowHeight = 480;
	// Left and top position of the player window.
	// Note: this does not work consistently accross browsers.
	this.windowTop = undefined;
	this.windowLeft = undefined;

	/*
deliveryFunction
- Should make a SYNCHRONOUS AJAX call to a server to obtain a video URL and possibly a start and stop time.
- input: parameters - the same parameters object passed to the play call with some alterations:
- parameters will always have:
  - format
  - maxBitrate
  - any other parameters you pass in on the play call needed to perform the delivery (isPreview, clipId, etc.)
- This function must append the following to parameters:
  - url: The delivery URL
  - startSeconds: only if clipping (scene\clip\preview)
  - endSeconds: only if clipping (scene\clip\preview)

parameters
- allowedFormats: array of allowed format names or undefined for all
- embedId: the DOM Element ID the player will embed into or null for full screen\frame
- format: format name, playerFormat cookie will be used if undefined or not in allow list,
  optimal format will be chosen if cookie is undefined or not in allow list)
- maxBitrate: (undefined or a value in kbit/s, playerMaxBitrate cookie will be used
  if undefined, unlimited will be used if cookie is undefined)
- movieId: (if you want DASH trickplay to work)
- anything else you want passed on to the deliveryFunction call
	*/
	this.play = function(deliveryFunction,parameters) {
		var player = null; //hook to Dash Player Core Object
		var isIos = navigator.userAgent.indexOf('iPad') != -1 || navigator.userAgent.indexOf('iPhone') != -1;
		var isSamsung = navigator.userAgent.indexOf('SamsungBrowser') != -1 || navigator.userAgent.indexOf('iPhone') != -1;
		var isAndroid = navigator.userAgent.indexOf('Android') != -1;
		var isMac = (navigator.userAgent.indexOf('Macintosh') != -1) || (navigator.userAgent.indexOf('macintosh') != -1);
		var isFF = navigator.userAgent.indexOf('Firefox') != -1;
		var isEdge = navigator.userAgent.indexOf('Edge') != -1;


		// console.log('is this edge?');
		// if (isEdge) console.log('It is. It is Edge');

		var allowAutoPlay = isFF || !(isIos || isAndroid);
		if (!parameters.allowedFormats)
			parameters.allowedFormats = ['HLS','DASH','FlashDynamic','MP4','SmoothStreaming'];

		// Decide on a format
		if (!parameters.format)
			parameters.format = unifiedPlayer._readCookie('PlayerFormat');
		if (!parameters.format || unifiedPlayer._indexOf(parameters.allowedFormats,parameters.format) == -1)
			parameters.format = unifiedPlayer.getOptimalFormat(parameters.allowedFormats);

		// Decide on a maximum bitrate
		// cookie overrides app default
		var cookieBitrate = unifiedPlayer._readCookie('PlayerMaxBitrate');
		if (cookieBitrate)
			parameters.maxBitrate = cookieBitrate;
		// pick a big number if all else fails
		if (!parameters.maxBitrate)
			parameters.maxBitrate = 100000;

		// allows the application to set where to pull trick play images from
		// If the caller provided a value then we use it.
		if (!parameters.trickPlayImgPrefix) {
			// If we are defaulting - then check if the containing document is secure
			if (unifiedPlayer.startsWith(document.location.href, "https")) {
				parameters.trickPlayImgPrefix = "https://pic.aebn.net/dis/t/";
			} else {
				parameters.trickPlayImgPrefix = 'http://pic.aebn.net/dis/t/';
			}
		}

		unifiedPlayer.embedElementId = parameters.embedId;

		var canEmbedHLS = false;
		var testVideo = document.createElement('video');
		if (testVideo && testVideo.canPlayType) {
			// TODO Allow this one day. Apple iOS & Mac keep breaking this functionality.
			if (!(isMac || isIos)) {
				canEmbedHLS = testVideo.canPlayType('application/vnd.apple.mpegURL') !== '';
			}
		}

		if (document.unifiedPlayerVideoWindow) {
			try {
				document.unifiedPlayerVideoWindow.close();
			} catch(err){}
		}

		document.unifiedPlayerVideoWindow = undefined;
		//var win = undefined;
		if (unifiedPlayer.embedElementId == undefined || (parameters.format == 'HLS' && !canEmbedHLS)) {
			try {
				//#4670
				//if ((parameters.format == 'HLS') && (navigator.userAgent.indexOf("iPhone") != -1) || (navigator.userAgent.indexOf("iPad") != -1)) {
					// Apple devices can not handle window.open
				//	document.unifiedPlayerVideoWindow = undefined;
				//} else {
					var e = document.documentElement;
					var g = document.getElementsByTagName('body')[0];
					var windowName = 'Video Player';

					//leaving the sizing code below in here in case we want to back
					// out of the set dimension windowing decision
					//var winWidth = window.innerWidth || e.clientWidth || g.clientWidth;
					//var winHeight = window.innerHeight || e.clientHeight || g.clientHeight;
					//winWidth = winWidth < 848 ? Math.round(winWidth*0.9) : 848;
					//winHeight = winHeight < 480 ? Math.round(winHeight*0.9) : 480;

					if (parameters.windowName) {
						// Allow for the caller to override this per play event.
						windowName = parameters.windowName;
					}

					if (navigator.userAgent.indexOf('Edge/') != -1) {
						// Edge has a bug, win.close is async and if you attempt to open a new window with the same
						// name, you get 'Access is denied.'
						windowName = windowName + ' ' +Math.random();
						parameters.modal = false;
					}

					var optionString = "modal=yes,resizable=1, width="+unifiedPlayer.windowWidth+", height="+unifiedPlayer.windowHeight;

					if (unifiedPlayer.windowTop) {
						optionString = optionString + ", top=" + unifiedPlayer.windowTop;
					}

					if (unifiedPlayer.windowLeft) {
						optionString = optionString + ", left=" + unifiedPlayer.windowLeft;
					}

					if (parameters.modal === undefined) {
						document.unifiedPlayerVideoWindow = window.open("", windowName, optionString);
					} else if (!parameters.modal) {
						document.unifiedPlayerVideoWindow = window.open("", windowName);
					}
					else {
						document.unifiedPlayerVideoWindow = window.open("", windowName, optionString);
					}
				//}
			} catch(err) {}
		}

		// Get the Delivery URL
		try {
			deliveryFunction(parameters);
		} catch(err) {
			console.error(err);
			if (document.unifiedPlayerVideoWindow)
				document.unifiedPlayerVideoWindow.close();
			return;
		}

		if (unifiedPlayer.embedElementId && (parameters.format!='HLS' || canEmbedHLS)) {
			// Play embedded
			var container = document.getElementById(unifiedPlayer.embedElementId);

			// Decide on a volume
			var volume = unifiedPlayer._readCookie('PlayerVolume');
			if (!volume)
				volume = 0.25;

			// Decide on a muted state
			var muted = unifiedPlayer._readCookie('PlayerMuted');
			if (!muted || muted=='false' || muted=='0' || muted==0)
				muted = false;
			else
				muted = true;

			if (parameters.format == 'FlashDynamic') {
				container.innerHTML = "";
				// swfobject.embedSWF actually alters the container element so we need to
				// give it a deeper div to muck with
				var innerDiv = document.createElement('div');
				innerDiv.id='flashPlayerInnerDiv_'+unifiedPlayer._uid;
				innerDiv.innerHTML='Your browser does not support the <a href="https://get.adobe.com/flashplayer/">Flash player</a> plugin.';
				container.appendChild(innerDiv);
				var flashParameters = {
					src: parameters.url,
					autoPlay: "true",
					controlBarAutoHide: 'false',
					controlBarPosition: 'docked',
					javascriptCallbackFunction: 'onJavaScriptBridgeCreated_'+unifiedPlayer._uid,
					volume: volume,
					muted: muted,
					scaleMode: 'letterbox'
				};
				if (parameters.startSeconds != undefined) {
					flashParameters.clipStartTime = parameters.startSeconds;
					flashParameters.clipEndTime = parameters.endSeconds;
				}

				swfobject.embedSWF (
					unifiedPlayer.unifiedPlayerHome+'flash/StrobeMediaPlayback_2.0.swf',
					innerDiv.id,
					'100%',
					container.offsetHeight,
					'10.1',
					'someJunk.swf"/>',
					flashParameters,
					{scale:'exactfit',allowFullScreen: 'true'},
					{name: 'StrobeMediaPlayback_2.0'}
//,function(e) { alert('Flash ' + (e.success?'successfully':'could not be') + ' embedded.'); }
				);


				window.onresize=function(){ // hack for now as SWFObject\Strobe does not support 100% height
					var flashObj = document.getElementById(innerDiv.id);
					if (flashObj) {
						console.log(container.offsetHeight);
						flashObj.height = container.offsetHeight;
					}
				};




			} else if (parameters.format == 'SmoothStreaming') {
				function isSilverlightInstalled() {
					var isSilverlightInstalled = false;
					try {  // IE
						try {
							var slControl = new ActiveXObject('AgControl.AgControl');
							isSilverlightInstalled = true;
						}
						catch(e) {  // either not install or not IE - check other methods
							if(navigator.plugins["Silverlight Plug-In"]) {
								isSilverlightInstalled = true;
							}
						}
					}
					catch(e) {  // no leaking exceptions
					}
					return isSilverlightInstalled;
				}
				if(isSilverlightInstalled()) {
					if (!parameters.startSeconds) { parameters.startSeconds=0; }

					var onSilverlightError = function(){};
					var onSilverlightLoad = function(){};

					container.innerHTML =
'<div id="silverlightControlHost" style="width:100%;height:100%">'+
'<object data="data:application/x-silverlight-2," id="silverlightControl_'+unifiedPlayer._uid+'" type="application/x-silverlight-2" width="100%" height="100%">'+
'<param name="source" value="'+unifiedPlayer.unifiedPlayerHome+'msss/SilverlightMSSSAlphaPlayer.xap?a=89a2rafs3"/>'+
'<param name="onError" value="onSilverlightError" />'+
'<param name="background" value="white" />'+
'<param name="minRuntimeVersion" value="4.0.50826.0" />'+
'<param name="autoUpgrade" value="false" />'+
'<param name="initParams" value="initialStreamSource='+parameters.url+',isSmoothStream=true,initialPositionInSeconds='+(parameters.startOffsetSeconds?parameters.startOffsetSeconds:parameters.startSeconds)+'" />'
'<a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50826.0" style="text-decoration:none">'+
'<img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight" style="border-style:none"/>'+
'</a>'+
'</object></div>';
				}
				else {
					container.style.backgroundColor = "#303030";
					container.style.border = "1px solid #606060";
					container.innerHTML = '\
<div style="font-size: 12pt; color: #ffffff; line-height: 1.5; position: relative; height: 100%; width: 100%">\
	<div style="position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%)">\
Silverlight is not installed<br>\
Please install the Silverlight plugin, or choose another format\
	</div>\
</div>';
				}

			} else if (parameters.format == 'DASH' || (parameters.format == 'MP4' && parameters.embedMP4) || (parameters.format == 'HLS' && parameters.embedHLS && !isIos && !isMac && !isSamsung)) {
				if (parameters.movieId == null) {
					parameters.movieId = "";
				}
				container.innerHTML = "";
				if (parameters.format == 'DASH') {
					player = new DashPlayer();
					if(!player.isDASHCapable()) {
						alert('This browser does not support Media Source Extensions. Please try a player format other than MPEG DASH.');
						return;
					}
				}
				var markup = dashPlayerMarkup;
				var container = document.getElementById(parameters.embedId);

				// console.log('parameters.embedId', parameters.embedId);

				container.innerHTML = markup;
				if (!parameters.useNativeControls) var dashControls = new DashVideoControls(container, markup, player, parameters);

				var playButtonOverlay = container.querySelector('.play-button-overlay');
				if (parameters.useNativeControls) playButtonOverlay.style.display = 'none';
				unifiedPlayer._videoElement = document.querySelector('#' + parameters.embedId + ' video');
				if (!parameters.useNativeControls) unifiedPlayer._videoElement.removeAttribute("controls");

				if (parameters.format == 'DASH') {
					if (parameters.startOffsetSeconds)
						player.setStartTime(parameters.startOffsetSeconds);
					player.attachVideo(unifiedPlayer._videoElement);
					player.attachSource(parameters.url);
					player.endOfStreamCallback = function () {
						//// dashControls.controlsEndOfStreamCallback();
						if (!parameters.useNativeControls) playButtonOverlay.style.display = 'block';
						window['onVideoEnded_'+unifiedPlayer._uid]();
					};
				} else {
					var src = document.createElement('source');
					src.setAttribute('src',parameters.url);
					if (parameters.format == 'MP4')
						src.setAttribute('type','video/mp4');
					else if (parameters.format == 'HLS')
						src.setAttribute('type','application/vnd.apple.mpegURL');
					unifiedPlayer._videoElement.appendChild(src);
				}
				unifiedPlayer._videoElement.volume = volume;
				unifiedPlayer._videoElement.muted = muted;
				if (allowAutoPlay) {
					unifiedPlayer._videoElement.setAttribute('autoplay','1');
				}
				unifiedPlayer._videoElement.addEventListener('volumechange', window['onVolumeChanged_'+unifiedPlayer._uid], false);
				if (parameters.startOffsetSeconds && parameters.format != 'DASH') {
					unifiedPlayer._videoElement.currentTime = parameters.startOffsetSeconds;
				}
				unifiedPlayer._videoElement.play();
				if (parameters.format != 'DASH') {
					unifiedPlayer._videoElement.addEventListener('ended',unifiedPlayer._videoEnded,false);
				}
				unifiedPlayer._videoElement.addEventListener('canplay',function(){ // IE :/
					if (parameters.startOffsetSeconds && parameters.format != 'DASH')
						unifiedPlayer._videoElement.currentTime = parameters.startOffsetSeconds;
					unifiedPlayer._videoElement.play();
				},false);
			}
			else if (parameters.format == 'MP4') {
				container.innerHTML = '';
				unifiedPlayer._videoElement = document.createElement('video');
				if (allowAutoPlay) {unifiedPlayer._videoElement.setAttribute('autoplay','autoplay');}
				unifiedPlayer._videoElement.setAttribute('controls','controls');
				unifiedPlayer._videoElement.setAttribute('width','100%');
				unifiedPlayer._videoElement.setAttribute('height','100%');
				unifiedPlayer._videoElement.onended = window['onVideoEnded_'+unifiedPlayer._uid];
				unifiedPlayer._videoElement.style.width = '100%';
				unifiedPlayer._videoElement.style.height = '100%';
				//unifiedPlayer._videoElement.style.left = '0';
				//unifiedPlayer._videoElement.style.top = '0';
				//unifiedPlayer._videoElement.style.position = 'absolute';
				var src = document.createElement('source');
				src.setAttribute('src',parameters.url);
				src.setAttribute('type','video/mp4');
				unifiedPlayer._videoElement.appendChild(src);
-				container.appendChild(unifiedPlayer._videoElement);
//				innerDiv.appendChild(unifiedPlayer._videoElement);
				unifiedPlayer._videoElement.volume = volume;
				unifiedPlayer._videoElement.muted = muted;
				unifiedPlayer._videoElement.onvolumechange = window['onVolumeChanged_'+unifiedPlayer._uid];
				unifiedPlayer._videoElement.play(); // Android :/
				unifiedPlayer._videoElement.addEventListener('ended',unifiedPlayer._videoEnded,false);
				unifiedPlayer._videoElement.addEventListener('canplay',function(){
					if (parameters.startOffsetSeconds)
						unifiedPlayer._videoElement.currentTime = parameters.startOffsetSeconds;
					unifiedPlayer._videoElement.play();
				},false);
				if (parameters.startOffsetSeconds)
					unifiedPlayer._videoElement.currentTime = parameters.startOffsetSeconds;
			} else if (parameters.format == 'HLS') {
				container.innerHTML = '';
				unifiedPlayer._videoElement = document.createElement('video');
				if (allowAutoPlay) {unifiedPlayer._videoElement.setAttribute('autoplay','autoplay');}
				unifiedPlayer._videoElement.setAttribute('controls','controls');
				unifiedPlayer._videoElement.setAttribute('width','100%');
				unifiedPlayer._videoElement.setAttribute('height','100%');
				unifiedPlayer._videoElement.onended = window['onVideoEnded_'+unifiedPlayer._uid];
				unifiedPlayer._videoElement.style.width = '100%';
				unifiedPlayer._videoElement.style.height = '100%';
				//unifiedPlayer._videoElement.style.left = '0';
				//unifiedPlayer._videoElement.style.top = '0';
				//unifiedPlayer._videoElement.style.position = 'absolute';
				var src = document.createElement('source');
				src.setAttribute('src',parameters.url);
				src.setAttribute('type','application/vnd.apple.mpegURL');
				unifiedPlayer._videoElement.appendChild(src);
-				container.appendChild(unifiedPlayer._videoElement);
//				innerDiv.appendChild(unifiedPlayer._videoElement);
				unifiedPlayer._videoElement.volume = volume;
				unifiedPlayer._videoElement.muted = muted;
				unifiedPlayer._videoElement.onvolumechange = window['onVolumeChanged_'+unifiedPlayer._uid];
				unifiedPlayer._videoElement.play(); // Android :/
				unifiedPlayer._videoElement.addEventListener('ended',unifiedPlayer._videoEnded,false);
				unifiedPlayer._videoElement.addEventListener('canplay',function(){
					if (parameters.startOffsetSeconds)
						unifiedPlayer._videoElement.currentTime = parameters.startOffsetSeconds;
					unifiedPlayer._videoElement.play();
				},false);
				if (parameters.startOffsetSeconds)
					unifiedPlayer._videoElement.currentTime = parameters.startOffsetSeconds;
			}
		} else {
			// Error checking before popup player
			if (parameters.format == 'DASH') {
				if (!(window.MediaSource && // browser must support MediaSourceExtensions
					window.MediaSource.isTypeSupported('video/mp4;codecs=avc1.42001f') && // requires basic h.264 decoder
					window.MediaSource.isTypeSupported('audio/mp4;codecs=mp4a.40.2'))) { // requires basic AAC decoder
					try { if (document.unifiedPlayerVideoWindow) { document.unifiedPlayerVideoWindow.close(); } } catch(err){}
					alert('This browser does not support Media Source Extensions. Please try a player format other than MPEG DASH.');
					return;
				}
			}

			try { if (document.unifiedPlayerVideoWindow) { document.unifiedPlayerVideoWindow.focus(); } } catch(err){}
			// Play standalone, launch in a full frame
			if (  (parameters.format == 'MP4' && !parameters.embedMP4) || (parameters.format == 'HLS' && (!parameters.embedHLS || isIos || isMac)) || (parameters.format == 'HLS' && (!parameters.embedHLS || isSamsung))) {
				if (document.unifiedPlayerVideoWindow)
					document.unifiedPlayerVideoWindow.location.href = parameters.url;
				else { // fallback if the browser does not support window.open() (Opera Mini)
					try { if (document.unifiedPlayerVideoWindow) { document.unifiedPlayerVideoWindow.close(); } } catch(err){}
					window.location.href = parameters.url;
				}
			} else {
				var launchUrl = unifiedPlayer.unifiedPlayerHome+'fullframe.html';
				if (!unifiedPlayer.startsWith(unifiedPlayer.unifiedPlayerHome,'http')) {
					var currentPath = window.location.href;
					var qidx = currentPath.indexOf('?');
					if (qidx != -1)
						currentPath = currentPath.substring(0,qidx);
					var lsidx = currentPath.lastIndexOf('/');
					currentPath = currentPath.substring(0,lsidx+1);
					if (unifiedPlayer.startsWith(unifiedPlayer.unifiedPlayerHome,'/')) {
						var dsidx = currentPath.indexOf('//');
						var fsidx = currentPath.indexOf('/',dsidx+2)
						currentPath = currentPath.substring(0,fsidx);
					}
					launchUrl = currentPath+launchUrl;
				}

				if (unifiedPlayer.fullFrameUrl) { // allow override
					launchUrl = unifiedPlayer.fullFrameUrl;
				}
				if (launchUrl.indexOf('?') == -1) {
					launchUrl+='?url='+parameters.url+'&format='+parameters.format;
				} else {
					launchUrl+='&url='+parameters.url+'&format='+parameters.format;
				}
				if (parameters.startSeconds != undefined) {
					launchUrl+='&st='+parameters.startSeconds;
				}
				if (parameters.endSeconds != undefined) {
					launchUrl+='&et='+parameters.endSeconds;
				}
				if (parameters.startOffsetSeconds != undefined) {
					launchUrl+='&so='+parameters.startOffsetSeconds;
				}
				if (parameters.movieId) {
					launchUrl+='&movieId='+parameters.movieId;
				}
				if (typeof parameters.useNativeControls != 'undefined') {
					launchUrl += '&useNativeControls=' + (parameters.useNativeControls / 1);
				}
				if (parameters.embedMP4) {
					launchUrl += '&embedMP4=1';
				}
				if (parameters.embedHLS) {
					launchUrl += '&embedHLS=1';
				}
				if (parameters.popoutTitle) {
					launchUrl += '&popoutTitle='+encodeURIComponent(parameters.popoutTitle);
				}


//document.getElementById('message').innerHTML = 'LOC:'+launchUrl+' win:'+document.unifiedPlayerVideoWindow;
				if (document.unifiedPlayerVideoWindow)
					document.unifiedPlayerVideoWindow.location.href = launchUrl;
				else // fallback if the browser does not support window.open() (Opera Mini)
					window.location.href = launchUrl;
			}
		}
		return {
			player: player
		}
	};

	this.startsWith = function(string,prefix) {
		if (prefix.length > string.length)
			return false;
		for (var i=0;i<prefix.length;++i) {
			if (string[i] != prefix[i])
				return false;
		}
		return true;
	}

	this.addPostrollListener = function(listener) {
		unifiedPlayer._postrollListeners.push(listener);
	}

	// The idea is that we get a video to play without making the user install\upgrade
	// anything if at all possible. Formats\Players with better experiences should be tried first.
	// DASH > SmoothStreaming > Apple HLS > Flash HDS > MP4 (non adaptive)
	this.getOptimalFormat = function(allowedFormats, defaultFormat) {
		if (!allowedFormats) {
			allowedFormats = ['HLS','DASH','FlashDynamic','MP4','SmoothStreaming'];
		}

		var userAgent = navigator.userAgent;
		var isAndroid = userAgent.indexOf("Android") != -1;

//console.log('MS:'+window.MediaSource);
//console.log('H264:'+window.MediaSource.isTypeSupported('video/mp4;codecs=avc1.42001f'));
		// If it can play DASH (MediaSource)
		if (unifiedPlayer._indexOf(allowedFormats,'DASH') != -1) {
			if (window.MediaSource && // browser must support MediaSourceExtensions
				window.MediaSource.isTypeSupported('video/mp4;codecs=avc1.42001f') && // requires basic h.264 decoder
				window.MediaSource.isTypeSupported('audio/mp4;codecs=mp4a.40.2') && // requires basic AAC decoder
				!(userAgent.indexOf("Macintosh") != -1 &&
					userAgent.indexOf("Mac OS X") != -1 &&
					userAgent.indexOf("Chrome") == -1 &&
					userAgent.indexOf("Firefox") == -1) ) { // Mac MSE is sorta broken
				// TODO if in the allow list of devices\browsers
				return 'DASH';
			}
		}

		// If it should probably get HLS
		if (unifiedPlayer._indexOf(allowedFormats,'HLS') != -1) {
			//Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/601.5.17 (KHTML, like Gecko) Version/9.1 Safari/601.5.17
			var canSafariPlay = false;
			if (userAgent.indexOf("Safari/") != -1 && userAgent.indexOf("Mac OS") != -1 && userAgent.indexOf("Chrome/") == -1) {
				var sidx = userAgent.indexOf("Safari/")+7;
				var eidx = userAgent.indexOf(" ",sidx);
				if (eidx == -1)
					eidx = userAgent.length;
				var d1idx = userAgent.indexOf(".",sidx);
				var d2idx = userAgent.indexOf(".",d1idx+1);
				var majorVersion = parseInt(userAgent.substring(sidx,d1idx));
				var minorVersion = parseInt(userAgent.substring(d1idx+1,d2idx));
				var pointVersion = parseInt(userAgent.substring(d2idx+1,eidx));
				if (majorVersion > 601)
					canSafariPlay = true;
				else if (majorVersion == 601) {
					if (minorVersion > 5)
						canSafariPlay = true;
					else if (minorVersion = 5) {
						if (pointVersion >= 17)
							canSafariPlay = true;
					}
				}
			}

			if (userAgent.indexOf("iPhone") != -1  || userAgent.indexOf("iPad") != -1 || canSafariPlay) {
				return 'HLS';
			}


			// if Android >= 5.1 it will *probably* play HLS
			if (isAndroid) {
				var matchResults = userAgent.match(/Android [\d+\.]{3,5}/);
				if (matchResults != null) {
					var androidVersion = matchResults[0].replace('Android ','');
					if (androidVersion >= '5.1') {
						return 'HLS';
					}
					// TODO some older manufacturer builds support HLS nicely...
				}
			}
		}

		// If it supports Flash HDS. Browser may complain if the version is too old so it is a near last resort.
		if (unifiedPlayer._indexOf(allowedFormats,'FlashDynamic') != -1) {
			if (typeof swfobject != 'undefined' && swfobject) {
				var flashVer = swfobject.getFlashPlayerVersion();
				if (flashVer.major >= 10 && (userAgent.indexOf("Android") == -1)) {
					return 'FlashDynamic';
				}
			}
		}

		// If it supports Smooth Streaming
		// TODO Chrome embedded Smooth Streaming has some issues...
		if (unifiedPlayer._indexOf(allowedFormats,'SmoothStreaming') != -1) {
			if (typeof Silverlight != 'undefined' && Silverlight && Silverlight.isInstalled("4.00")) {
				return 'SmoothStreaming';
			}
		}

		// Return MP4 if allowed. If this isn't supported, nothing we have will work.
		if (unifiedPlayer._indexOf(allowedFormats,'MP4') != -1) {
			return 'MP4';
		}

		// Last ditch attempt HLS. TODO hopefully DASH can be here in the future
		return defaultFormat?defaultFormat:'HLS';  // adding a hook for providing your own default
	};

	// Internal functions & fields
	this._videoElement = undefined;
	this._flashPlayer = undefined;
	this._uid = Math.random().toString(36).substring(7); // a unique ID for this player instance
	this._postrollListeners = [];

	this._videoEnded = function() {
		for (var i=0;i<unifiedPlayer._postrollListeners.length;++i) {
			unifiedPlayer._postrollListeners[i](unifiedPlayer.embedElementId);
		}
	}

	this._indexOf = function(arr,val) {
		if (!arr)
			return -1;
		for (var i=0;i<arr.length;++i) {
			if (arr[i] == val)
				return i;
		}
		return -1;
	}

	this._createCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+escape(value)+expires+"; path=/";
	}
	this._readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ')
				c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0)
				return unescape(c.substring(nameEQ.length,c.length));
		}
		return null;
	}

	// Player events. Flash needs these at the root... fugly.
	window['onJavaScriptBridgeCreated_'+unifiedPlayer._uid] = function(playerId) {
		unifiedPlayer._flashPlayer = document.getElementById(playerId);
		if (!unifiedPlayer._flashPlayer.hasListeners) {
			unifiedPlayer._flashPlayer.addEventListener("volumeChange", 'onVolumeChanged_'+unifiedPlayer._uid);
			unifiedPlayer._flashPlayer.addEventListener("complete", "onVideoEnded_"+unifiedPlayer._uid);
			unifiedPlayer._flashPlayer.addEventListener("mutedChange", "onMuteChanged_"+unifiedPlayer._uid);
			//unifiedPlayer._flashPlayer.addEventListener("mediaPlayerStateChange", "onMediaPlayerStateChange");
			unifiedPlayer._flashPlayer.hasListeners = 1;
		}
	}
	window['onMuteChanged_'+unifiedPlayer._uid] = function(event) {
		unifiedPlayer._createCookie('PlayerMuted', event);
	}
	window['onVolumeChanged_'+unifiedPlayer._uid] = function(event) {
		var newVolume = 0.25;
		if (unifiedPlayer._flashPlayer) {
			newVolume = event;
		} else if (unifiedPlayer._videoElement) {
			newVolume = unifiedPlayer._videoElement.volume;
			unifiedPlayer._createCookie('PlayerMuted', unifiedPlayer._videoElement.muted);
		}
		unifiedPlayer._createCookie('PlayerVolume', newVolume);
		//console.log('##### volume changed '+newVolume);
	}
	window['onVideoEnded_'+unifiedPlayer._uid] = function(event) {
		unifiedPlayer._videoEnded();
	}
};
