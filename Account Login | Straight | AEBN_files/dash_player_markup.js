var dashPlayerMarkup = '<div class="aebn_unified_player wrapper">\
	<div class="player-container">\
		<video class="player" controls></video>\
		<div class="play-button-overlay"><div class="control-icon-play-overlay"></div></div>\
		<div class="buffer-overlay"><div class="control-icon-spinner"></div></div>\
		<div class="controls"><!--control background-->\
			<div class="control-wrapper">\
				<div class="row timeSeekbar-wrapper">\
					<div class="current-time seekbar-time-display">00:00</div>\
					<div class="seekbar-wrapper">\
						<div class="seekbar"></div>\
						<div class="seekbar-progress-wrapper">\
							<div class="seekbar-progress-background">\
								<div class="seekbar-progress"></div>\
							</div>\
						</div>\
					</div>\
					<div class="duration-time seekbar-time-display">00:00</div>\
				</div>\
				<div class="trick-play-wrapper">\
					<div class="trick-play-image-container"></div>\
					<div class="trick-play-spinner"><div class="control-icon-spinner"></div></i></div>\
					<div class="trick-play-time"></div>\
				</div>\
				<ul class="row">\
					<li class="control-container"><i class="play control-icon-play touch-target"></i></li>\
					<li class="control-container"><i class="volume control-icon-volume touch-target"></i></li>\
					<li class="control-container settings-icon-wrapper"><span class="settings control-icon-settings touch-target"><span class="current-quality current-quality-display current"></span></span></li>\
					<li class="control-container popout-icon-wrapper"><i class="popout control-icon-popout touch-target"></i></li>\
					<li class="control-container"><i class="fullscreen control-icon-fullscreen touch-target"></i></li>\
				</ul>\
			</div>\
		</div>\
		<div class="secondaryControls"><i class="closeModal control-icon-closeModal touch-target"></i></div>\
	</div>\
\
\
	<div class="touch-shield">\
		<div class="settings-controller settings-control">\
			<div class="settings-header">\
				<div class="settings-header-text">\
					<div class="settings-title">Settings</div>\
				</div>\
				<div class="icon-wrapper"><span class="close"></span></div>\
			</div>\
			<ul class="settings-menu">\
				<li class="quality control-container">Video Quality</li>\
				<li class="stats control-container">Video Stats</li>\
			</ul>\
		</div>\
		<div class="quality-controller quality-control">\
			<div class="quality-header">\
				<div class="quality-header-text">\
					<div class="quality-title">Quality</div>\
					<div class="quality-details">\
						<span>Target/</span><span class="target-label target"></span>&nbsp;<span>Current/</span><span class="current-label current"></span>\
					</div>\
				</div>\
				<div class="icon-wrapper"><span class="close"></span></div>\
			</div>\
			<ul class="quality-menu"></ul>\
		</div>\
\
\
		<div class="volume-controller volume-control"><!--MAY NEED TO ADJUST SOME JS AND HTML FOR OUTPUT LABEL-->\
			<div class="volume-flex-wrapper">\
				<div class="icon-wrapper close-volume item-1"><span class="close"></span></div>\
				<div class="volume-slider-wrapper item-2">\
						<div class="volume-slider"></div>\
						<div class="volume-slider-progress-wrapper">\
							<div class="volume-slider-progress-background">\
								<div class="volume-slider-progress"></div>\
							</div>\
						</div>\
					</div>\
				<div class="mute icon-wrapper mute-icon control-icon-volume-on touch-target item-3"></div>\
			</div>\
		</div>\
\
\
		<div class="stats-controller stats-display">\
			<div class="stats-header">\
				<div class="stats-header-text">\
					<span class="stats-title">Statistics</span>\
				</div>\
			<div class="icon-wrapper"><span class="close"></span></div>\
			</div>\
			<div class="stats-information">\
				<div>\
					<div class="video-id">\
						<label class="section">Video ID: </label>\
						<span class="videoId"></span>\
						&nbsp;&nbsp;\
						<label class="section">Build: </label>\
						<span class="buildVersion">baaca6f9056f30209d786deb17f1a0176f46714a</span>\
					</div>\
					<div class="video-data">\
						<div>\
							<div class="stats-left">\
								<div><label>Video:</label><span><output class="vidDimensions">&nbsp;</output></span></div>\
							</div>\
							<div class="stats-right">\
								<div><label>Bitrate:</label><span><output class="vidBitrate">&nbsp;</output><small>&nbsp;kbps</small></span></div>\
							</div>\
						</div>\
						<div>\
							<div class="stats-left">\
								<div><label>Current:</label><span><output class="repIndex">&nbsp;</output><span class="vidAdaptDirection"></span></span></div>\
							</div>\
							<div class="stats-right">\
								<div><label>Capacity:</label><span><output class="dlBitrate">&nbsp;</output><small>&nbsp;kbps</small></span></div>\
							</div>\
						</div>\
						<div>\
							<div class="stats-left">\
								<div><label>Frame Loss:</label><span><output class="vidDroppedFrames">&nbsp;</output></span></div>\
							</div>\
							<div class="stats-right">\
								<div><label>Latency:</label><span><output class="vidLatency">&nbsp;</output><small>&nbsp;ms</small></span></div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="graphs">\
					<label class="section">Bandwith:</label>\
					<output class="buffer">\
						<canvas class="brCanvas"></canvas>\
					</output>\
					<label class="section">Buffer:</label>\
					<outputclass="bandwidth">\
						<div class="bufferMeter" style="width: 92%; background-color: rgb(0, 128, 0);"></div>\
					</output>\
				</div>\
				<div>\
					<div class="video-data bottom-data">\
						<label class="section">Errors:</label><br/>\
						<div class="stats-left">\
							<div><label>Freeze:</label><output class="freezes">&nbsp;</output></div>\
							<div><label>Adapt:</label><output class="adaptFails">&nbsp;</output></div>\
						</div>\
						<div class="stats-right">\
							<div><label>Source:</label><output class="droppedSources">&nbsp;</output></div>\
							<div><label>Congestion:</label><output class="congestionRescue">&nbsp;</output></div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>';
