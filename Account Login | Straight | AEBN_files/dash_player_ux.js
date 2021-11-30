
// This code controls the instantiation of a player.
// The flow of the code:
// UnifiedPlayer calls DashVideoControls. The BehaviorModule function is called. This calls the EventsModule.
// State is held in the StateModule, for the most part. The BehaviorModule still contains code that should be held in StateModule.
// UtilitiesModule at some point should be probably be turned into a completely separate file independent of the player.
var  DashVideoControls = function (playerWrapper, playerHTML, dashPlayerCoreObject, parameters) {

	// The wrapper is this player's parent node that the markup is appended to.
	var wrapper;
	// The javascript string that is appended to the wrapper that composes the HTML syntax for a player.
	var playerMarkup;
	// PlayerInstanceId is the unique reference to this instance of the player.
	var	playerInstanceId;
	// The ID of the current movie/scene/clip.
	var thisMovieId;
	// In case of an initialization error set this to true to prevent further processing of code.
	var error = false;
	var embedId = parameters.embedId;
	var currentMovieId = parameters.movieId;
	// src url for video
	var url = parameters.url;
	var trickPlayImgPrefix = parameters.trickPlayImgPrefix;
	// if modal player is being used set to callback function in application or else null
	var killModalPlayer = parameters.killModalPlayer || null;

	// For non DASH controls, this tells us how far to offset the trickplay images
	var startOffsetSeconds = parameters.startSeconds;

	var isEdge = /Edge/.test(navigator.userAgent);

	// Initialize a player instance, append html markup to the player wrapper. If the wrapper does not exist
	// create one and assign the wrapper an id.
	// TODO: MAKE ERROR HANDLING MORE ROBUST. THIS IS LAZY AND JUST WRONG. I THREW IT TOGETHER TO GET THE BALL ROLLING.
	/**************** CRITICAL ERRORS ****************/
	// PLAYER WILL NOT WORK IF WE GET ONE OF THESE!
	// Check to make sure the player markup exists. If it does not return and throw an error and message the end-user.

	if (typeof playerHTML !== 'string' || !playerHTML) {
		error = true;
		playerMarkup = '<div class="aebn_unified_player wrapper error-markup"><span>There was an error loading this video content. Please refresh this page and try again.</span></div>';
	} else {
		playerMarkup = playerHTML;
	}

	if (embedId == document.body.id || parameters.disablePopoutOption || !parameters.popoutHtmlUrl || !parameters.popoutHtmlUrl.length || typeof window.open != 'function' ){
		playerMarkup = '<style>#' + embedId + ' .popout-icon-wrapper {display: none;}</style> ' + playerMarkup;
	}

	if (isEdge && parameters.format == 'HLS'){
		playerMarkup = '<style>#' + embedId + ' .settings-icon-wrapper {display: none;}</style> ' + playerMarkup;
	}	

	// Check to make sure there is a current movie ID, and if not throw an error.
	if (isNaN(currentMovieId) || !currentMovieId) {
		error = true;
		thisMovieId = Math.floor(Math.random()*100000000000000);
	} else {
		thisMovieId = currentMovieId;
	}

	/**************** NON-CRITICAL ERRORS ****************/
	// MAY NOT BE OPTIMAL, BUT WE CAN FAKE IT TILL WE MAKE IT!
	// Check to make sure there is an embedId if not create one
	if (typeof embedId === 'undefined' && !embedId) {
		playerInstanceId = 'player_' + Math.floor(Math.random()*thisMovieId);
	} else {
		playerInstanceId = embedId;
	}

	// Check to make sure there is a node to attach the player markup to, if not create one.
	if (typeof playerWrapper !== 'object' && !playerWrapper) {
		playerInstanceId = 'player_' + Math.floor(Math.random()*thisMovieId);
		wrapper = document.createElement('div');
		wrapper.setAttribute('id', playerInstanceId);
		document.body.appendChild(wrapper);
	} else {
		wrapper = playerWrapper;
	}

	// Append the html markup to the player wrapper.
	wrapper.innerHTML = playerMarkup;

	// This should only evaluate to true in the event that the player does not instantiate correctly.
	if (error) {return}

	// Declare the variables that specific nodes in the player will be assigned.
	var embedElement, _body, controls, touchShield, close, video, bufferOverlay, playButtonOverlay, playButtonOverlayIcon,
		play, quality, qualityMenu, trickPlayWrapper, trickPlayTimeCode, trickPlayContainer, trickPlaySpinner,
		qualityCurrentDisplay, volume, stats, fullscreen, seekbar, seekbarProgress, controllerPanels, durationTime,
		currentTime, muteIconX, muteIcon,volumeSlider, volumeProgress, volumeDisplay, volumeSliderWrapper,
		qualityDetailsTarget, qualityDetailsCurrent, bufferMeter, adaptDirection, secondaryControls, closeModal;

	// This should probably be a configuration parameter passed into the player on a per app basis.
	var timingObj = {
		hideControlsThreshold: 2500, // time before controls fade out if no user interaction occurs
		seekbarInterval: 500,
		bitrateInterval: 500,
		heartbeatInterval: 500,
		trickplayInterval: 500,
		hideTrickPlayImg: 1000,
		showTrickPlayImg: 1000
	};

	// Helper functions
	// These should probably exist as a separate JavaScript file in UnifiedPlayer.
	var UtilitiesModule = (function () {

		// IE11 polyfill for includes method
		var includesPolyfill = function () {
			if (!Array.prototype.includes) {
				Object.defineProperty(Array.prototype, "includes", {
					enumerable: false,
					value: function (obj) {
						var newArr = this.filter(function (el) {
							return el == obj;
						});
						return newArr.length > 0;
					}
				});
			}
		};

		// Currently not used
		// matchParentNode = function (node,target,func) {
		//	func(node);
		//	node = node.parentNode;
		//	while(node !== target) {
		//		matchParentNode(node,target,func);
		//		node = node.nextSibling;
		//	}
		//	var element; //your clicked element
		//	while(element.parentNode) {
		//		if(element.parentNode === target){
		//			mouseOverControls = true;
		//		}
		//		//display, log or do what you want with element
		//		element = element.parentNode;
		//	}
		//};


		var isTouch = function (e) {
			if (e.pointerType !== undefined && e.pointerType === 'touch') {return true}
			if (e.type === 'touchstart' || e.type === 'touchend' || e.type === 'touchmove') {return true}
			// On mobile devices Firefox and Chrome report a touch generated click event as a MouseEvent and not a TouchEvent.
			// The two if statements below identify a click event on these browsers that was generated by touch.
			// Chrome
			if (e.sourceCapabilities !== undefined && e.sourceCapabilities !== null && e.sourceCapabilities.firesTouchEvents === true) {return true}
			// Firefox
			return e.mozInputSource !== undefined && e.mozInputSource === 5;
		};

		var setNewTime = function () {
			return new Date().getTime();
		};


		var hasTimeIntervalElapsed = function (startTime,interval) {
			return  setNewTime() - startTime > interval;
		};


		/*  FUTURE DRAGGABLE IMPLEMENTATION
		 makeDraggable = (function () {
		 var removeDrag, addDrag, dragIt, positionReset, preventScrolling;
		 var dragNode, type, calculatedOffsetValue, windowOffset;

		 // reset the draggable node position and clean up event listeners
		 removeDrag = function () {
		 console.log('remove type = ', type)
		 dragNode.classList.remove('drag');
		 if (type = 'pointerdown') {
		 window.removeEventListener('pointerup', removeDrag, false);
		 window.removeEventListener('pointermove', dragIt, false);
		 return;
		 }
		 if (type === 'mousedown') {
		 window.removeEventListener('mousemove', dragIt, false);
		 window.removeEventListener('mouseup', removeDrag, false);
		 return;
		 }
		 if (type === 'touchstart') {
		 window.removeEventListener('touchmove', dragIt, false);
		 window.removeEventListener('scroll', preventScrolling, false);
		 window.removeEventListener('touchend', removeDrag, false);
		 return;
		 }
		 };

		 // set up drag events and calculate the draggable nodes offset values from the cursor
		 addDrag = function (e) {
		 dragNode = e.currentTarget;
		 type = e.type;
		 windowOffset = {
		 _X:  window.scrollX,
		 _Y: window.scrollY
		 }
		 if (type === 'touchstart') {
		 var e = e.targetTouches[0];
		 };
		 // calculated offset value for the position of cursor from the top
		 // and left of the draggable node,
		 // needs to switch the sign of the number to work properly
		 // used to keep the draggable node from jumping under the cursor
		 // on the start of mouse move event
		 calculatedOffsetValue = {
		 offsetX: -(dragNode.offsetLeft - e.clientX),
		 offsetY: -(dragNode.offsetTop - e.clientY)

		 };
		 // working for chrome
		 //console.log('dragNode.offsetTop = ',dragNode.offsetTop);
		 //console.log('e.clientY = ', e.clientY);
		 //console.log('- __________________')
		 //console.log('calculated offset value for Y = ',calculatedOffsetValue.offsetY);
		 //console.log(' ');
		 ////console.log(dragNode.scrollTop);
		 //console.log('e.clientY = ', e.clientY);
		 //console.log('calculated offset value for Y = ',calculatedOffsetValue.offsetY)
		 //console.log('- __________________')
		 //console.log('dragNode.style.top = ', (e.clientY - calculatedOffsetValue.offsetY));
		 //console.log(' ');
		 //console.log('document.body.scrollTop = ', document.body.scrollTop);
		 //console.log('- __________________')
		 //console.log('dragNode.style.top w/ d.b.sT = ', (e.clientY - calculatedOffsetValue.offsetY) - document.body.scrollTop);
		 //console.log('////////////////////////////////////////////')
		 if (type === 'pointerdown') {
		 console.log('caught pointer on dragnode');
		 console.log('e coors = ',e.clientX , e.clientY);
		 window.addEventListener('pointerup', removeDrag, false);
		 window.addEventListener('mousemove', dragIt, false);
		 //window.addEventListener('pointermove', dragIt, false);
		 return;
		 }
		 if (type === 'mousedown') {
		 console.log('there');
		 window.addEventListener('mouseup', removeDrag, false);
		 window.addEventListener('mousemove', dragIt, false);
		 }
		 if (type === 'touchstart') {
		 console.log('where');
		 window.addEventListener('touchmove', dragIt, false);
		 window.addEventListener('scroll', preventScrolling, false);
		 window.addEventListener('touchend', removeDrag, false);
		 }
		 };

		 // move the draggable node
		 dragIt = function (e) {

		 console.log('drag type = ', type)
		 var evt = e;
		 if (type === 'touchstart') {
		 evt = e.targetTouches[0];
		 };
		 console.log('evt coors = ',evt.clientX , evt.clientY);
		 dragNode.classList.add('drag');
		 dragNode.style.top = (evt.clientY - calculatedOffsetValue.offsetY) + 'px';
		 dragNode.style.left = (evt.clientX - calculatedOffsetValue.offsetX) + 'px';
		 };

		 // remove the style attribute attached to the draggable node if it exists
		 // to reset the draggable nodes position for the next drag event
		 positionReset = function () {
		 if(typeof dragNode !== 'undefined') {
		 dragNode.removeAttribute('style');
		 }
		 };

		 //prevent dragging of node to cause scrolling in window
		 preventScrolling = function () {
		 console.log('happening');
		 window.scrollTo( windowOffset._X, windowOffset._Y );
		 };

		 return {
		 addDrag: addDrag,
		 positionReset: positionReset
		 }
		 }());
		 */

		var createCookie = function(name,value,days) {
			var expires;
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				expires = "; expires="+date.toGMTString();
			}
			else expires = "";
			document.cookie = name+"="+escape(value)+expires+"; path=/";
		};

		var readCookie = function(name) {
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
		};

		//// best guess mobile device
		//isMobile = (function() {
		//	var isMobile = false; //initiate as false
		//	var isTouch = 'ontouchstart' in document.documentElement; //check for touch capabilities, return boolean
		//
		//	// device detection
		//	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		//		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
		//		isMobile = true;
		//	}
		//	return (isMobile && isTouch);
		//}());

		//// detect if is MS edge and the mode that you are in, tablet or desktop
		//// may need to revisit this if other browsers start supporting pointer events
		//msEdgeMode = function () {
		//	var scrollDiv, scrollWidth, tablet, desktop;
		//	if (window.PointerEvent) {
		//		scrollDiv = document.createElement("div");
		//		scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
		//		document.body.appendChild(scrollDiv);
		//		scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		//		document.body.removeChild(scrollDiv);
		//		return scrollWidth > 0 ? 'desktop' : 'tablet';
		//	} else {
		//		return false;
		//	}
		//};

		// toggle between two class names
		// used for showing hiding elements,
		// switching between font awesome icons,
		// starting css animations
		var toggleClassName = function (node, class1, class2) {
			if (arguments.length > 2) {
				if (node.classList.contains(class1)) {
					node.classList.remove(class1);
					node.classList.add(class2);
				} else {
					node.classList.remove(class2);
					node.classList.add(class1);
				}
			}
		};

		// takes a string value an pads it to a given length
		var padStringLeft = function (string,pad,length) {
			return (new Array(length+1).join(pad)+string).slice(-length);
		};

		// generate random number
		var getRandom = function () {
			return Math.floor(Math.random() * Math.pow(10,8));
		};

		//// check if touch is supported
		//isTouchSupported = (function () {
		//	var msTouchEnabled = window.navigator.msMaxTouchPoints;
		//	var generalTouchEnabled = "ontouchstart" in document.createElement("div");
		//	if (msTouchEnabled || generalTouchEnabled) { return true }
		//	return false;
		//}());

		// get the display times, current time and video duration
		var returnTime = function(time) {
			var hours, minutes, seconds, durationInMinutes;
			durationInMinutes = Math.floor(time / 60);
			minutes = durationInMinutes % 60;
			hours = Math.floor(durationInMinutes / 60);
			seconds = Math.floor(time % 60);
			return setTimeAsString(hours,minutes,seconds);
		};

		// return hours, minutes and seconds as a string
		var setTimeAsString = function (hours,minutes,seconds) {
			if(hours > 0) {
				return UtilitiesModule.padStringLeft(hours,'0',2)+':'+UtilitiesModule.padStringLeft(minutes,'0',2)+':'+UtilitiesModule.padStringLeft(seconds,'0',2);
			} else {
				return UtilitiesModule.padStringLeft(minutes,'0',2)+':'+UtilitiesModule.padStringLeft(seconds,'0',2);
			}
		};

		// need to sniff out ie11 on windows 8.1
		// not sure how this effects windows 10, ie11 users?
		var isIE11 = (function () {
			var str = navigator.userAgent;
			return /Trident.*rv[ :]*11\./.test(str);
		}());

		return {
			includesPolyfill: includesPolyfill,
			isTouch: isTouch,
			setNewTime: setNewTime,
			hasTimeIntervalElapsed: hasTimeIntervalElapsed,
			createCookie: createCookie,
			readCookie: readCookie,
			toggleClassName: toggleClassName,
			getRandom: getRandom,
			padStringLeft: padStringLeft,
			returnTime: returnTime,
			isIE11: isIE11
		}
	}());


	// Determine the event interface the browser supports.
	// Contains a generic callback function attached to all event listeners.
	// Generic callback parses the node list and calls the proper behavior method for the DOM node.
	// Set the event listeners on the nodes in the node list passed to the function.
	var EventModule = function (NodeList) {
		var _interface;
		var supportedInterfaces = [];
		// list of event interfaces
		var EVENT_INTERFACES =  {
			pointer: window.PointerEvent,
			touch: window.TouchEvent,
			mouse: window.MouseEvent
		};

		// Add the event interfaces the browser supports to the array setSupportedInterfaces.
		// Interfaces that a browser does not support have a value of undefined.
		// Supported interfaces return a value of null.(?)
		Object.keys(EVENT_INTERFACES).forEach( function (key)  {
			if (EVENT_INTERFACES[key] !== undefined) {
				supportedInterfaces.push(key);
			}
		});
		//console.log('the supported interfaces are',supportedInterfaces);

		// IE11 polyfill for includes method
		UtilitiesModule.includesPolyfill();

		// Set the event interface.
		// Loop through the supported interfaces and choose one in descending order (pointer, touch, mouse).
		// This needs some work, possibly precursor function to test individual handler support.
		// We shouldn't need to hard-code the order.
		if (supportedInterfaces.includes('pointer')) {
			_interface = 'pointer';
		} else if (supportedInterfaces.includes('touch')) {
			_interface = 'touch';
		} else {
			_interface = 'mouse';
		}

		// A list of events handlers used in the application note that not all the handlers an interface
		// (pointer, touch, mouse) supports are listed.
		// The other property is an object that holds additional handlers that fall outside the primary event
		// interfaces but are needed for the entire lifecycle of the application.
		var EVENT_HANDLERS = {
			pointer: {
				click: ['click'],
				downup: ['pointerdown','pointerup'],
				enterleave: ['pointerenter','pointerleave'],
				move: ['pointermove'],
				overout: ['pointerout','pointerover']
			},
			touch: {
				click: ['click'],
				downup: ['touchstart','touchend'],
				enterleave: ['touchenter','touchleave'],
				move: ['touchmove'],
				overout: ['touchenter','touchleave']
			},
			mouse: {
				click: ['click'],
				downup: ['mousedown','mouseup'],
				enterleave: ['mouseenter','mouseleave'],
				move: ['mousemove'],
				overout: ['mouseout','mouseover']
			},
			other: {
				volumeChange: ['volumeChange']
			}
		};

		// A map of alternate handlers if the current browser does not support a given handler.
		// Example, a browser does not support the touchleave handler it then maps to and uses mouseout.
		var ALT_HANDLERS = {
			pointerdown: 'mousedown',
			pointerup: 'mouseup',
			pointermove: 'mousemove',
			pointerout: 'mouseout',
			pointerover: 'mouseover',
			pointerenter: 'mouseenter',
			pointerleave: 'mouseleave',
			touchenter: 'mouseenter',
			touchleave: 'mouseleave',
			touchmove: 'mousemove',
			touchstart: 'mousedown',
			touchend: 'mouseup'
		};

		// The callback function for all events.
		// delegate behavior based on event targets down/start, up/end, move, other
		var callback = function(key,e)  {
			var trigger = e.currentTarget;
			var target = e.target;
			// capture the event only on the nodes that fire them
			if(trigger === target) {
				if (NodeList.hasOwnProperty(key)) {
					NodeList[key].behavior(e);
					return;
				}
			}
			//always capture and delegate move and out type events on the wrapper (controls show hide functionality)
			if(trigger !== target && (e.type === 'pointermove' || e.type === 'touchmove' || e.type === 'mousemove' || e.type === 'pointerout' || e.type === 'touchleave' || e.type === 'mouseout')) {
				if (NodeList.hasOwnProperty(key)) {
					NodeList[key].behavior(e);
				}
			}
		};

		// Sets the event listeners on the player instance.
		var setListeners = function (_callback,NodeList) {
			//get the object containing the list of event handlers supported by this browser
			var interfaceHandlers = EVENT_HANDLERS[_interface];

			// Returns a boolean, registering if the event handler is support in the current browser.
			var checkHandlerSupport = function (handler, node)  {
				var isSupported;
				var el = node || document.createElement('div');
				handler = 'on' + handler;
				isSupported = (handler in el);
				//for certain ancient browsers
				if (!isSupported && el !== window && el !== document) {
					el.setAttribute(handler, 'return;');
					isSupported = typeof el[handler] == 'function';
				}
				return isSupported;
			};

			// attach the event handlers
			// set event listeners by compiling the handlers mapped from the chosen interface to the members of the NODE_LISTENER_LIST
			// handle cases in which an individual handler is not supported by a browser using the map ALT_HANDLERS
			// for each key in NODE_LISTENER_LIST do the following
			Object.keys(NodeList).forEach( function (key) {
				//loop through the list of handlerTypes
				NodeList[key].handlerTypes.forEach( function (handlerType) {
					// Handle events that are not the main input events (click, move, over/out, etc)
					if (handlerType !== 'move' && handlerType !== 'click' && handlerType !== 'overout' && handlerType !== 'enterleave'&& handlerType !== 'downup') {
						if (!checkHandlerSupport(handlerType, NodeList[key].node)) { handlerType = ALT_HANDLERS[handlerType] }
						NodeList[key].node.addEventListener(handlerType, _callback.bind(null,key), false);
						// UN-COMMENT OUT THE CODE BELOW TO VIEW THR NODE AND HANDLERS ASSIGNED TO BUILD A LISTENER
						//console.log('handler type 1',NodeList[key].node.classList,handlerType);
					}
					else {
						// use the the value of the handlerTypes to loop through the list of handler names associated with the handlerType(s)
						interfaceHandlers[handlerType].forEach( function (handlerName) {
							//check to make sure the handler type is supported and if not fallback to an alternate
							if (!checkHandlerSupport(handlerName, NodeList[key].node)) { handlerName = ALT_HANDLERS[handlerName] }
							NodeList[key].node.addEventListener(handlerName, _callback.bind(null,key), false);
							// UN-COMMENT OUT THE CODE BELOW TO VIEW THR NODE AND HANDLERS ASSIGNED TO BUILD A LISTENER
							//console.log('handler type 2',NodeList[key].node.classList,handlerName);
						});
					}
				});
			});
		};

		setListeners(callback,NodeList);
	};


	// This holds state and updates state.
	// This is only partially fleshed out at this time.
	// Needs to be improved and expanded.
	var StateModule = (function () {
		//state data
		var uiState = {
			controlsVisible: null,
			mouseVisible: null,
			lastInteraction: null,
			overlayVisible: null,
			panelVisible: false,
			seeking: false,
			seekPosition: null,
			trickPlaySpinnerVisible: false,
			trickPlayWrapperVisible: false,
			trickPlayLoading: false,
			videoDuration: null,
			isMuted: function () {return (video.muted)},
			isPlaying: function () {return !(video.paused || video.ended)}
		};

		// sets and gets the last known time stamp for when the user interacted with the player
		var lastUserInteractionTime = {
			setLastInteractionTime: function (customTime) {
				if (customTime === undefined) {
					uiState.lastInteraction = UtilitiesModule.setNewTime();
				} else {
					uiState.lastInteraction = customTime;
				}
			},
			getTimeSinceLastInteraction: function () {
				return new Date().getTime() - uiState.lastInteraction;
			}
		};

		var setTheControlsVisibilityState = {
			determineState: function () {
				uiState.controlsVisible ? setTheControlsVisibilityState.hide() : setTheControlsVisibilityState.show();
			},
			hide: function () {
				controls.style.display = 'none';
				if (killModalPlayer !== null) {secondaryControls.style.display = 'none';}
				uiState.controlsVisible = false;
			},
			show: function () {
				controls.style.display = 'flex';
				if (killModalPlayer !== null) {secondaryControls.style.display = 'flex';}
				uiState.controlsVisible = true;
			}
		};

		var setPlayPauseUiState = {
			overlayVisibility: {
				determineState: function () {
					//uiState.controlsVisible && !uiState.isPlaying() ? setPlayPauseUiState.overlayVisibility.show() : setPlayPauseUiState.overlayVisibility.hide();
					if (StateModule.uiState.isPlaying() === false) {
						StateModule.setPlayPauseUiState.overlayVisibility.show();
					}
					else{
						StateModule.setPlayPauseUiState.overlayVisibility.hide();
					}
				},
				hide: function () {
					playButtonOverlay.style.display = 'none';
					uiState.overlayVisible = false;
				},
				show: function () {
					playButtonOverlay.style.display = 'block';
					uiState.overlayVisible = true;
				}
			},
			buttonState: {
				determineState: function () {
					uiState.isPlaying() ? setPlayPauseUiState.buttonState.pause() : setPlayPauseUiState.buttonState.play();
				},
				pause: function () {
					play.classList.add('control-icon-pause');
					play.classList.remove('control-icon-play');
					playButtonOverlayIcon.classList.add('control-icon-pause-overlay');
					playButtonOverlayIcon.classList.remove('control-icon-play-overlay');
				},
				play: function () {
					play.classList.add('control-icon-play');
					play.classList.remove('control-icon-pause');
					playButtonOverlayIcon.classList.add('control-icon-play-overlay');
					playButtonOverlayIcon.classList.remove('control-icon-pause-overlay');
				}
			}
		};

		var setMouseVisibilityState = {
			determineState: function () {
				uiState.controlsVisible || uiState.panelVisible ? setMouseVisibilityState.show(): setMouseVisibilityState.hide();
			},
			hide: function () {
				video.classList.add('cursor-hidden');
				video.style.cursor = 'none';
				uiState.mouseVisible = false;
			},
			show: function () {
				video.classList.remove('cursor-hidden');
				video.style.cursor = 'default';
				uiState.mouseVisible = true;
			}
		};

		// set controls visibility at end of video
		var setEndVideoState = function () {
			if (!uiState.isPlaying()) {video.pause()} // some browsers do not set video pause on video ended event
			setPlayPauseUiState.buttonState.play();
			setPlayPauseUiState.overlayVisibility.show();
		};

		var setBufferOverlayVisibility = {
			hide: function () {
				if (bufferOverlay.classList.contains('show')) {bufferOverlay.classList.remove('show')}
			},
			show: function () {
				if (!bufferOverlay.classList.contains('show')) {bufferOverlay.classList.add('show')}
			}
		};

		var setMuteState = function () {
			if (uiState.isMuted()) {
				muteIcon.classList.remove('control-icon-volume-on');
				muteIcon.classList.add('control-icon-volume-mute');
				volume.classList.add('control-icon-volume-mute');
				volumeProgress.style.width = 0;
			}
			else {
				muteIcon.classList.remove('control-icon-volume-mute');
				muteIcon.classList.add('control-icon-volume-on');
				volume.classList.remove('control-icon-volume-mute');
				volumeProgress.style.width = (video.volume * 100) + '%';
			}
		};

		var setPanelState = {
			touchShield: {
				hide: function () {
					touchShield.classList.remove('flex');
					uiState.panelVisible = false;
				},
				show: function () {
					touchShield.classList.add('flex');
					uiState.panelVisible = true;
				}
			},
			panelNode: {
				hide: function (node) {
					node.classList.remove('show');
				},
				show: function (node) {
					node.classList.add('show');
				}
			}
		};

		var setTrickPlayState = {
			spinner: {
				hide: function () {
					trickPlaySpinner.classList.remove('spin');
					uiState.trickPlaySpinnerVisible = false;
				},
				show: function () {
					trickPlaySpinner.classList.add('spin');
					trickPlayWrapper.style.display = 'block';
					uiState.trickPlaySpinnerVisible = true;
				}
			},
			wrapper: {
				hide: function () {
					trickPlayWrapper.style.display = 'none';
					uiState.trickPlayWrapperVisible = false;
				},
				show: function () {
					trickPlayWrapper.style.display = 'block';
					uiState.trickPlayWrapperVisible = true;
				}
			}
		};

		return {
			uiState: uiState,
			lastUserInteractionTime: lastUserInteractionTime,
			setTheControlsVisibilityState: setTheControlsVisibilityState,
			setMouseVisibilityState: setMouseVisibilityState,
			setPlayPauseUiState: setPlayPauseUiState,
			setBufferOverlayVisibility: setBufferOverlayVisibility,
			setEndVideoState: setEndVideoState,
			setMuteState: setMuteState,
			setPanelState: setPanelState,
			setTrickPlayState: setTrickPlayState
		}
	}());


	// The behavior for the player.
	// Some state control still resides in here and should be moved to the StateModule.
	// Contains the initialization function for the player.
	// Calls the event module and passes it a node list, that contains references
	// to event handlers, and methods that will be called by the events.
	var BehaviorModule = (function () {
		var playerInstanceSelector;
		// methods of the behavior module
		var InitPlayerControls, FullScreenBehavior, TrickPlayBehavior, PlayerControlsVisibility, PlayerBehavior,
			PanelVisibility, VolumeSettings, SeekBarBehavior, BitrateSettingsBehavior, StatsSettingsBehavior;
		// collection of nodes that display current bitrates (used for pulse animation on bitrate change)
		var activeChangingBitrate;
		// Reference to the current dash player core instance
		var dashPlayer = dashPlayerCoreObject;
		// URL prefix for 10 second image controls for SSL
		var trickPlayImgURLPrefix = trickPlayImgPrefix;

		// Used to set event listeners that are not need for the lifecycle of the page. They are set when needed
		// and removed when no longer necessary.
		var temporaryEventListener = {
			add: function (node, handler, func)  {node.addEventListener(handler,func)},
			remove: function (node, handler, func) {node.removeEventListener(handler,func)},
			methodList: {
				closePanel: function () {PanelVisibility.closePanel()},
				hidePanelOnBlur: function () {PanelVisibility.hidePanelOnBlur()},
				volumeSliderWidth: function () {VolumeSettings.volumeSliderWidth()}
			}
		};


		// Controls full-screen behavior
		FullScreenBehavior = (function () {
			// functions
			var toggleFullScreenMode, enterFullScreenMode, exitFullScreenMode, syncFullScreenIcon, fullscreenEventHandler;
			// interval handler
			var syncHandler;
			// flag that is set to reflect whether the video is fullscreen or not
			var isFullScreen = false;

			// toggle entering or exiting fullscreen mode
			toggleFullScreenMode = function () {
				var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
				var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
				if (fullscreenEnabled) {
					if (fullscreenElement === null  || fullscreenElement === undefined) {
						enterFullScreenMode(wrapper);
					} else {
						exitFullScreenMode();
					}
				}
				UtilitiesModule.toggleClassName(fullscreen,'control-icon-fullscreen','control-icon-windowed');
			};

			// launch fullscreen mode
			enterFullScreenMode = function (el) {
				if(el.requestFullscreen) {
					el.requestFullscreen();
				} else if(el.mozRequestFullScreen) {
					el.mozRequestFullScreen();
				} else if(el.webkitRequestFullscreen) {
					el.webkitRequestFullscreen();
				} else if(el.msRequestFullscreen) {
					el.msRequestFullscreen();
				}
			};

			// exit fullscreen mode
			exitFullScreenMode = function () {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			};

			// check fullscreen icon
			// (the icon can be out of sync with state due to the ability to cancel fullscreen with the esc key)
			syncFullScreenIcon = function () {
				isFullScreen = !isFullScreen;
				if ((isFullScreen && fullscreen.classList.contains('control-icon-fullscreen')) || (!isFullScreen && fullscreen.classList.contains('control-icon-windowed'))) {
					UtilitiesModule.toggleClassName(fullscreen,'control-icon-fullscreen','control-icon-windowed');
				}
			};

			// select the correct prefix for fullscreen change event handler and a set listener for the event
			(function () {
				var testElem = document.createElement('fullscreenTestElem');
				var handlerName = {
					transition: 'fullscreenchange',
					MSTransition: 'MSFullscreenChange',
					MozTransition: 'mozfullscreenchange',
					WebkitTransition: 'webkitfullscreenchange'
				};
				for ( var t in handlerName ) {
					if(handlerName.hasOwnProperty(t) && testElem.style[t] !== undefined ){
						document.addEventListener(handlerName[t], syncFullScreenIcon, false);
					}
				}
			}());

			return {
				toggleFullScreenMode: toggleFullScreenMode
			}
		}());


		// Behavior related to trick play.
		TrickPlayBehavior = (function () {
			var trickPlayUrl, pointerNotOverSeekBar, lastCreatedTrickPlayUrl;

			var lastCreatededImageNumber = undefined;
			var trickPlayImage = undefined;
			var trickPlayHeight = 90;
			var trickPlayLastLoadTime = 0;
			var trickPlayStartTime = 0;

			// return a number as the current seek position on the seekbar
			// need this in order to figure out what image to request as the trickplay image
			var getCurrentSeekPosition = function (e) {
				var seekbarBoundingRect, scrubPositionX_Axis, seekPosition;

				seekbarBoundingRect = seekbar.getBoundingClientRect();
				// map touchmove event
				if (e.clientX === undefined) {
					e.clientX = e.touches[0].clientX;
					e.clientY = e.touches[0].clientY
				}
				// center point of the pointer over the seekbar on the x axis
				scrubPositionX_Axis = e.clientX - Math.floor(seekbarBoundingRect.left);

				if (e.clientY < seekbarBoundingRect.top) {
					return null;
				}
				else {
					seekPosition = Math.floor( Math.floor(scrubPositionX_Axis) / Math.floor(seekbarBoundingRect.width) * StateModule.uiState.videoDuration);
				}

				if (seekPosition <= 0) {seekPosition = 0}
				if (seekPosition >= StateModule.uiState.videoDuration) {seekPosition = StateModule.uiState.videoDuration}
				return seekPosition;
			};

			// generate the  trick play image number by using currentSeekPosition to find the actual media time from the media stream
			var getTimeFromMediaStream = function (seekPosition) {
				var mediaTimeAtTrickTime = seekPosition;
				var movieId = thisMovieId;

				if (dashPlayer) {
					var segmentIndexAtTrickTime = dashPlayer.stream.getStreamSegmentIndexAtStreamTime(seekPosition);
					var mediaSegmentInfoAtTrickTime = dashPlayer.stream.getMediaSegmentIndexAtStreamSegmentIndex(segmentIndexAtTrickTime);
					var periodAtTrickTime = dashPlayer.stream.periods[mediaSegmentInfoAtTrickTime.periodIndex];
					mediaTimeAtTrickTime = mediaSegmentInfoAtTrickTime.mediaSegmentIndex * periodAtTrickTime.segmentDuration;
					// used for playlist where the movieId in the trickplay image url may change from one trickplay image to another
					if (periodAtTrickTime.movieId) {movieId = periodAtTrickTime.movieId}
				} else {
					if (startOffsetSeconds) {
						mediaTimeAtTrickTime+=startOffsetSeconds;
					}
				}
				return {
					imageNumber: Math.floor((mediaTimeAtTrickTime + 5) / 10),
					movieId: movieId
				};
			};


			// build the URL for the trick play image src attribute
			var startTrickPlay = function (e) {
				var imageNumber, imageNumberAsString, getStreamTime;
				var movieId = thisMovieId;

				// there is no stream so return
				// TODO Do we need this?
				//if (dashPlayer && !dashPlayer.stream && StateModule.uiState.seeking) {return}

				// last trick play image load request threw an error event and looped back through this function
				if (e.type === "error") {
					imageNumber = lastCreatededImageNumber - 1;
				}
				else {
					// used to hide the trickplay image if the threshold for how long an image is shown is exceeded
					trickPlayStartTime = UtilitiesModule.setNewTime();

					// Set the current position on the seekbar.
					StateModule.uiState.seekPosition = getCurrentSeekPosition(e);

					if (StateModule.uiState.seekPosition === null) {return}
					getStreamTime = getTimeFromMediaStream(StateModule.uiState.seekPosition);
					imageNumber = getStreamTime.imageNumber;

					if (isNaN(imageNumber) || imageNumber === undefined) {return}
					if (imageNumber < 1) {imageNumber = 1} // trickplay images start at 1
					if (getStreamTime.movieId) {movieId = getStreamTime.movieId}
					// used when an error event occurs trying to load a trick play image
					// and the code has to fall back to the last successfully loaded image number
					lastCreatededImageNumber = imageNumber;
				}
				//change the image number to a string so we can pad it correctly
				imageNumberAsString = imageNumber.toString();
				// pad the image number with 0s to fit the url format
				while (imageNumberAsString.length < 8) {imageNumberAsString = '0' + imageNumberAsString}

				//create the trickplay image url
				lastCreatedTrickPlayUrl = trickPlayImgURLPrefix + movieId+ '/' +movieId+ '_' +imageNumberAsString+ '.jpg?s=' +trickPlayHeight+ 'h';

				if (trickPlayUrl !== lastCreatedTrickPlayUrl) {loadTrickPlayImage(lastCreatedTrickPlayUrl)}
			};


			var loadTrickPlayImage = function (url) {
				var newTrickPlayImage;

				// if an image has not loaded in 500ms put up spinner
				if (!StateModule.uiState.trickPlaySpinnerVisible && UtilitiesModule.hasTimeIntervalElapsed(trickPlayLastLoadTime,500)) {
					StateModule.setTrickPlayState.spinner.show();
					StateModule.setTrickPlayState.wrapper.show();
				}

				// only load 1 image at a time or if it has been at least 1 seconds since the last image load time
				// if we loaded every time, we would spam the network with hundreds of image requests
				if (!StateModule.uiState.trickPlayLoading || UtilitiesModule.hasTimeIntervalElapsed(trickPlayLastLoadTime,1000)) {

					trickPlayUrl = url;
					StateModule.uiState.trickPlayLoading = true;
					pointerNotOverSeekBar = false;
					trickPlayLastLoadTime = UtilitiesModule.setNewTime();

					// if we attempt to re-use the img element & replace the src attribute, chrome may not display the new image (chrome bug).
					newTrickPlayImage = new Image();

					newTrickPlayImage.onload = function() {// don't swap it in 'till we load the image, otherwise it will blink a bit too much.
						if (StateModule.uiState.trickPlaySpinnerVisible) {StateModule.setTrickPlayState.spinner.hide()}
						if (trickPlayImage) {trickPlayContainer.removeChild(trickPlayImage)}
						trickPlayImage = newTrickPlayImage;
						trickPlayContainer.appendChild(trickPlayImage);
						if (pointerNotOverSeekBar !== true) {StateModule.setTrickPlayState.wrapper.show()}
						StateModule.uiState.trickPlayLoading = false;

						// see if a new image was requested while this image was being loaded, if so, start loading the new image
						if (trickPlayUrl !== newTrickPlayImage.src) {loadTrickPlayImage(trickPlayUrl,StateModule.uiState.seekPosition)}
					};

					newTrickPlayImage.onerror = function(e) {
						newTrickPlayImage.onload = undefined;
						StateModule.uiState.trickPlayLoading = false;
						startTrickPlay(e);
					};

					newTrickPlayImage.src = url;
					//display the time code that corresponds to the trickplay image
					trickPlayTimeCode.innerHTML = UtilitiesModule.returnTime(StateModule.uiState.seekPosition);
				}
				else {
					if (UtilitiesModule.hasTimeIntervalElapsed(trickPlayLastLoadTime,500) && !StateModule.uiState.trickPlaySpinnerVisible){
						StateModule.setTrickPlayState.spinner.show();
					}
				}
			};

			// hide trick play container
			var stopTrickPlay = function () {
				var timeNow = UtilitiesModule.setNewTime();
				pointerNotOverSeekBar = true;

				if (StateModule.uiState.trickPlayWrapperVisible) {
					StateModule.setTrickPlayState.wrapper.hide();
					return;
				}
				if (timeNow - trickPlayStartTime > timingObj.hideTrickPlayImg || !StateModule.uiState.controlsVisible) {
					StateModule.setTrickPlayState.wrapper.hide();
				}
			};

			return {
				startTrickPlay: startTrickPlay,
				stopTrickPlay: stopTrickPlay
			}
		}());


		// Behavior associated with the seekbar control including time displays.
		SeekBarBehavior = (function () {
			var currentSeekPosition;
			// set the time value of the video duration on player load
			var setDurationTime = function (duration) {
				durationTime.innerHTML = UtilitiesModule.returnTime(Number(duration));
			};

			// set the current video time
			var setCurrentTime = function () {
				currentTime.innerHTML =  UtilitiesModule.returnTime(video.currentTime);
			};

			// set the current time display in the player on player load
			var syncSeekbar = function (dimension) {
				var duration = video.duration;
				if (dashPlayer) {duration=dashPlayer.stream.duration;}
				currentSeekPosition = (dimension / duration) * 100;
				seekbarProgress.style.width = currentSeekPosition + '%';
			};

			// sync the current time to the the seekbar position (touchend/mouseup event)
			var syncCurrentTimeToSeek = function () {
				video.currentTime =  StateModule.uiState.seekPosition;
				setCurrentTime();
				syncSeekbar(video.currentTime);

			};

			// Determine what behavior to run based on the type of event that is initiating it.
			var manageSeekEvents = function (e) {
				if (e.type === "pointerdown" || (e.pointerType === 'touch' && e.type === "pointerenter") || e.type === "touchstart" || e.type === "mousedown") {
					e.stopPropagation();
					StateModule.setPlayPauseUiState.overlayVisibility.hide();
					StateModule.setBufferOverlayVisibility.show();
					TrickPlayBehavior.startTrickPlay(e);
					StateModule.uiState.seeking = true;
				}
				if (e.type === "pointerup" || e.type === "touchend" || e.type === "mouseup") {
					e.stopPropagation();
					StateModule.setBufferOverlayVisibility.hide();
					syncCurrentTimeToSeek();
					if (e.pointerType === 'touch' || e.type === "touchend") {
						TrickPlayBehavior.stopTrickPlay(e);
					}
					StateModule.uiState.seeking = false;
				}
				if (e.type === "pointermove" || e.type === "touchmove" || e.type === "mousemove") {
					e.stopPropagation();
					StateModule.setPlayPauseUiState.overlayVisibility.hide();
					// change seekbar progress indicator pointer movement but do not update main time display
					if (e.buttons === 1 || (e.buttons === undefined && e.which !== undefined && e.which === 1)) {syncSeekbar(StateModule.uiState.seekPosition)}
					TrickPlayBehavior.startTrickPlay(e);
					StateModule.uiState.seeking = true;
				}
				if (e.type === "touchleave"  ||  e.type === "pointerleave" ||  e.type === "mouseleave" ||  e.type === "pointerout" ||  e.type === "mouseout" ) {
					StateModule.setBufferOverlayVisibility.hide();
					TrickPlayBehavior.stopTrickPlay(e);
					StateModule.uiState.seeking = false;
				}
			};

			return {
				manageSeekEvents: manageSeekEvents,
				setDurationTime: setDurationTime,
				setCurrentTime: setCurrentTime,
				syncSeekbar: syncSeekbar
			};
		}());


		// Manage user generated events on the player that deal with showing and hiding UI controls.
		PlayerControlsVisibility = (function () {
			var lastMoveEventCoordinates = {
				lastCoors: {
					_X: null,
					_Y: null
				},
				setLastCoors: function (e,coors) {
					// touchmove stores x/y coordinates on different property than pointermove and mousemove
					if (e.type === 'touchmove') {
						coors._X = e.touches[0].clientX;
						coors._Y = e.touches[0].clientY;
					}
					else {
						coors._X = e.clientX;
						coors._Y = e.clientY;
					}
				}
			};

			// based on the event type call setControlsVisibility with the correct boolean argument to affect the showing and hiding of the player controls
			var manageVisibilityEvents = function (e) {
				e.stopPropagation();

				// if (e.type === 'pointermove' || e.type === 'touchmove' || e.type === 'mousemove') {
				if (e.pointerType != 'touch' && (e.type === 'pointermove' || e.type === 'touchmove' || e.type === 'mousemove')) {
					// if the mouse hasn't moved since last move event fired do not run further behavior
					// (used when the last user interaction time exceeds threshold time for hiding the controls)
					// touchmove stores x/y coordinates on different property than pointermove and mousemove (see lastMoveEventCoordinates.setLastCoors)
					if ((lastMoveEventCoordinates.lastCoors._X === e.clientX && lastMoveEventCoordinates.lastCoors._Y === e.clientY) || (e.type=== 'touchmove' && lastMoveEventCoordinates.lastCoors._X === e.touches[0].clientX && lastMoveEventCoordinates.lastCoors._Y === e.touches[0].clientY)) {
						return;
					}

					StateModule.lastUserInteractionTime.setLastInteractionTime();
					StateModule.setTheControlsVisibilityState.show();
					StateModule.setPlayPauseUiState.overlayVisibility.determineState();
					if (!UtilitiesModule.isTouch(e)) {StateModule.setMouseVisibilityState.determineState()}
					lastMoveEventCoordinates.setLastCoors(e, lastMoveEventCoordinates.lastCoors);
					return;
				}

				// when a touch, mouse or pointer, that has a pointer type of mouse, leaves or exits the wrapper hide the controls
				if (e.type === 'touchleave' || (e.type === 'pointerout' && e.pointerType === "mouse") || (e.type === 'pointerleave' && e.pointerType === "mouse") || e.type === 'mouseout' || e.type === 'mouseleave') {
					StateModule.setTheControlsVisibilityState.hide();
					StateModule.setPlayPauseUiState.overlayVisibility.hide();
					return;
				}

				if (e.type === 'click') {
					StateModule.setTheControlsVisibilityState.show();
					StateModule.setPlayPauseUiState.overlayVisibility.determineState();
					if (!UtilitiesModule.isTouch(e)) {StateModule.setMouseVisibilityState.determineState()}
				}
			};

			return {
				manageVisibilityEvents: manageVisibilityEvents
			}
		}());


		// Behavior related to video play/pause functionality.
		PlayerBehavior = (function () {
			var managePlayEvents = function (e) {

				e.stopPropagation();
				StateModule.lastUserInteractionTime.setLastInteractionTime();

				// this is called on startup and any other time there is a change to the volume not caused by a user interaction
				//if (e.type === 'volumechange') {
				//	StateModule.setMuteState();
				//	return;
				//}

				// on touch input set play state only if controls are visible
				if (UtilitiesModule.isTouch(e)){
					if ((StateModule.uiState.controlsVisible || e.target === playButtonOverlayIcon)) {
						setPlayState();
						StateModule.setPlayPauseUiState.buttonState.determineState();
					}
				}
				// on non-touch input always set play state
				else {
					setPlayState();
					StateModule.setPlayPauseUiState.buttonState.determineState();
				}
				PlayerControlsVisibility.manageVisibilityEvents(e);
			};

			// set the video play state to either play or pause, update state of play button
			var setPlayState = function () {
				video.paused || video.ended ? video.play() : video.pause();
			};

			return {managePlayEvents: managePlayEvents};
		}());

		// Behavior that controls the visibility of the various panels.
		PanelVisibility = (function () {

			// Get the reference to the currently opened panel node.
			var getActivePanel = function () {
				for (var property in controllerPanels) {
					if ( controllerPanels.hasOwnProperty(property) && controllerPanels[property].classList.contains('show')) {
						return controllerPanels[property];
					}
				}
			};

			// Set a reference to the panel as active and return the active node to the calling function
			var setActivePanel = function (target) {
				for (var property in controllerPanels) {
					if ( controllerPanels.hasOwnProperty(property) && (target.classList.contains(property) || target.parentNode.classList.contains(property)) ) {
						return controllerPanels[property];
					}
				}
			};

			//when the window that contains a player looses focus check to see if a panel is open and if so close it
			var hidePanelOnBlur = function () {
				for (var property in controllerPanels) {
					// stats panel is only panel that will not close by default
					// add other property values to condition to keep them open and available for debugging
					if (controllerPanels.hasOwnProperty(property) && property !== 'stats' && controllerPanels[property].classList.contains('show')) {
						closePanel();
					}
				}
			};

			// for the touchShield node which has multiple events assigned to it on different handlers
			var managePanelEvent = function (e) {
				if (e !== undefined && (e.type === 'pointermove' || e.type === 'touchmove' || e.type === 'mousemove')) {
					e.stopPropagation();
				}
				if (e !== undefined && (e.type === 'click' || e.type === 'touchend')) {
					closePanel();
				}
			};

			var showPanel = function (e) {

				controllerPanels.settings.classList.remove('show');

				StateModule.setTheControlsVisibilityState.hide();
				StateModule.setPlayPauseUiState.overlayVisibility.hide();
				if (!UtilitiesModule.isTouch(e)) {StateModule.setMouseVisibilityState.determineState()}
				StateModule.setPanelState.touchShield.show();
				StateModule.setPanelState.panelNode.show(setActivePanel(e.target));

				// add temporary event listeners on opening panels
				// add any panel specific conditions
				if (e.target.classList.contains('volume')) {
					// set initial width
					VolumeSettings.volumeSliderWidth();
					temporaryEventListener.add(window,'resize',temporaryEventListener.methodList.volumeSliderWidth);
				}
				for (var i = 0; i < close.length; i++) {
					temporaryEventListener.add(close[i],'click',temporaryEventListener.methodList.closePanel);
				}
				temporaryEventListener.add(window,'blur',temporaryEventListener.methodList.hidePanelOnBlur);
			};

			var closePanel = function () {

				// remove temporary event listeners on closing panel
				if (getActivePanel() === controllerPanels.volume) {
					temporaryEventListener.remove(window, 'resize', temporaryEventListener.methodList.volumeSliderWidth);
				}
				for (var i = 0; i < close.length; i++) {
					temporaryEventListener.remove(close[i],'click',temporaryEventListener.methodList.closePanel);
				}
				temporaryEventListener.remove(window,'blur',temporaryEventListener.methodList.hidePanelOnBlur);

				StateModule.setPanelState.touchShield.hide();
				StateModule.setPanelState.panelNode.hide(getActivePanel());

				if (StateModule.uiState.isPlaying() === false) {StateModule.setPlayPauseUiState.overlayVisibility.show()}
			};

			return {
				hidePanelOnBlur: hidePanelOnBlur,
				setActivePanel: setActivePanel,
				managePanelEvent: managePanelEvent,
				showPanel: showPanel,
				closePanel: closePanel
			};
		}());


		// Behavior that relates to setting the player volume
		VolumeSettings = (function () {
			// Sync the player volume to the position of the volume scrub bar and set the video volume
			var syncVolumeToVolumeScrubPosition = function (e) {
				var volumeBoundingRect, volumePositionX_Axis, rightRelativePosition, scrubPosition;

				volumeBoundingRect = volumeSlider.getBoundingClientRect();

				// map touch event properties to mouse and pointer event properties
				if (e.clientX === undefined) {
					e.clientX = e.touches[0].clientX;
					e.clientY = e.touches[0].clientY
				}

				volumePositionX_Axis = e.clientX - Math.floor(volumeBoundingRect.left);
				rightRelativePosition = Math.floor(volumeBoundingRect.right) - Math.floor(volumeBoundingRect.left);

				scrubPosition = (volumePositionX_Axis / rightRelativePosition);
				volumeProgress.style.width = (scrubPosition * 100) + '%';
				video.volume = scrubPosition;
			};

			// Manage the player mute state
			var manageMute = function () {
				video.muted = !video.muted;
				StateModule.setMuteState();
			};

			// Manage events that deal with the player volume
			var manageVolume = function (e) {
				if (e !== undefined && (e.type === 'pointermove' || e.type === 'touchmove' || e.type === 'mousemove')) {
					if (e.buttons === 1 || (e.buttons === undefined && e.which !== undefined && e.which === 1)) {
						syncVolumeToVolumeScrubPosition(e);
						if (StateModule.uiState.isMuted()) {manageMute()}
					}
				}
				if (e !== undefined && ((e.type === 'pointerdown' || e.type === 'touchstart' || e.type === 'mousedown') || (e.type === 'pointerup' || e.type === 'touchend' || e.type === 'mouseup'))) {
					syncVolumeToVolumeScrubPosition(e);
					if (StateModule.uiState.isMuted()) {manageMute()}
				}
			};

			// Set the width of the volume slider when it is first made visible and on orientation change.
			var volumeSliderWidth = function () {
				var videoWidth = video.clientWidth > 960 ? 960 : video.clientWidth;

				// reset style attribute on volume range input
				if (volumeSliderWrapper.hasAttribute('style')) {
					volumeSliderWrapper.removeAttribute('style');
				}
				volumeSliderWrapper.style.width = Number(videoWidth - 120) + 'px';
			};

			return {
				manageVolume: manageVolume,
				volumeSliderWidth: volumeSliderWidth,
				manageMute: manageMute
			};
		}());


		// Behavior related to changing and displaying bitrates in the player.
		BitrateSettingsBehavior = (function () {
			// ARRAYS
			var adaptPoints, adaptNames;
			// the current and target adaptPoints indexes returned and the current bitrate representation
			// in the get bitrate array for loop
			var currentAdaptPointIndex, targetAdaptPointIndex, rep, currentBitrate;
			// set interval reference
			var bitrateUpdateTimer;
			// functions
			var getBitrateArray, buildBitrateSelectionMenu, setTargetBitrate, updateCurrentBitrate;
			// related to building dom nodes for quality setting menu in ui
			var menuItem, value, menuItems;

			// load available video bitrates and cap values. this is ugly because we have to convert bitrate to index\Size
			adaptPoints = [];
			adaptNames = [];
			currentAdaptPointIndex = -1; // where we are
			targetAdaptPointIndex = -1; // where we want to adapt to

			// get bitrates from dash core
			getBitrateArray = function () {
				if (dashPlayer && dashPlayer.stream) {
					var streamSegmentIndex = dashPlayer.stream.getStreamSegmentIndexAtStreamTime(video.currentTime);
					var mediaSegmentInfo = dashPlayer.stream.getMediaSegmentIndexAtStreamSegmentIndex(streamSegmentIndex);
					var currentPeriod = dashPlayer.stream.periods[mediaSegmentInfo.periodIndex];

					targetAdaptPointIndex = currentPeriod.videoAdaptationSet.representations.length - 1;
					for (var i = 0; i < currentPeriod.videoAdaptationSet.representations.length; ++i) {
						rep = currentPeriod.videoAdaptationSet.representations[i];
						adaptNames.push(rep.height + 'p');
						if (i < currentPeriod.videoAdaptationSet.representations.length-1) {
							adaptPoints.push((rep.bitrate + (currentPeriod.videoAdaptationSet.representations[i + 1].bitrate - rep.bitrate) / 2) / 1000);
						} else {
							adaptPoints.push(999999999);
						}
						if (dashPlayer.maxVideoBitrate && dashPlayer.maxVideoBitrate >= adaptPoints[i]) {
							targetAdaptPointIndex = i;
						}
						if (rep.height == video.videoHeight) {
							currentAdaptPointIndex = i;
							currentBitrate = adaptNames[i];
						}
					}
				} else {
					if (video.videoHeight && video.videoHeight > 0) {
						currentBitrate = video.videoHeight+'p';
					}
				}
				// need more checking here to make sure bitrates still match up one to one
				if (qualityMenu.innerHTML === '') {
					buildBitrateSelectionMenu();
				}
				updateCurrentBitrate(currentBitrate);
			};

			// build bitrate menu
			buildBitrateSelectionMenu = function () {
				for (var i = adaptNames.length-1; i >= 0; --i) {
					menuItem = document.createElement('li');
					menuItem.classList.add('bitrate');
					value = adaptNames[i];
					menuItem.dataset.bitrate = value;
					menuItem.innerHTML = value;
					if (i == targetAdaptPointIndex) {
						menuItem.classList.add('target');
						qualityDetailsTarget.innerHTML = value;
					}
					if (i == currentAdaptPointIndex) {
						qualityDetailsCurrent.innerHTML = value;
					}
					menuItem.point = adaptPoints[i];
					(function (pointer) {
						menuItem.addEventListener('click', function (e) {setTargetBitrate(e, pointer)}, false);
					}(menuItem.point));
					qualityMenu.appendChild(menuItem);
				}
				menuItems = document.querySelectorAll('.bitrate');
			};

			//SET TARGET BITRATE WHEN USER CLICKS ON AN OPTION IN THE QUALITY SETTINGS MENU
			setTargetBitrate = function (e, bitrateIndex) {
				e.stopPropagation();
				if (dashPlayer) {
					for (var i = 0; i < menuItems.length; i++) {
						if (menuItems[i].classList.contains('target')) {
							menuItems[i].classList.remove('target')
						}
					}
					e.target.classList.add('target');
					qualityDetailsTarget.innerHTML = e.target.dataset.bitrate;
					dashPlayer.maxVideoBitrate = bitrateIndex;

					setTimeout(PanelVisibility.closePanel, 500);
				}
			};

			// update current bitrate in menu and bitrate button on top level controls
			updateCurrentBitrate = function (current) {
				if (typeof current === "undefined") {
					qualityCurrentDisplay.innerHTML = '';
					qualityDetailsCurrent.innerHTML = '';
				} else {
					qualityCurrentDisplay.innerHTML = current;
					qualityDetailsCurrent.innerHTML = current;
				}
			};



			return {
				getBitrateArray: getBitrateArray
			};
		}());


		//Behavior that controls the output and display of the player stats.
		StatsSettingsBehavior = (function () {
			var Graph2, graphInstance, numberWithCommas, updateStats;

			// new graph, this one has an x axis of seconds playing
			Graph2 = function() {
				if (!dashPlayer) return;

				var graph = this;
				this.slices = [];
				this.widthTimeMs = (dashPlayer.MAX_BUFFER_TIME*2+dashPlayer.MAX_SOURCE_BUFFER_TIME)*1000;
				this.playDuration=0;
				this.lastSliceTime = UtilitiesModule.setNewTime();
				this.lastVideoTime = 0;

				this.iteration = function() {
					// Only collect slice data and update the graph if user is playing
					if (!video.paused) {
						var slice = {
							bitrateCount:0,
							averageBitrate:0,
							bandwidth:dashPlayer.getCurrentDownloadBitrate(),
							playStartTime:0,
							playEndTime:0,
							videoStartTime:video.currentTime,
							videoEndTime:0};
						var timeNow = UtilitiesModule.setNewTime();

						var dt = timeNow-graph.lastSliceTime;

						slice.playStartTime = graph.playDuration;
						graph.playDuration += dt;
						slice.playEndTime = graph.playDuration;

						// find all downloaded segments within this time slice
						if (dashPlayer.stream.videoStreamComponent && dashPlayer.stream.videoStreamComponent.buffer.length > 0) {
							var bitrateAcc = 0;
							slice.bitrateCount = 0;
							var foundStart=false;

							for (var i=0;i<dashPlayer.stream.videoStreamComponent.buffer.length;++i) {
								var seg = dashPlayer.stream.videoStreamComponent.buffer[i];
								// if this segment is within the slice time
								if (seg.timestamp > graph.lastSliceTime && seg.timestamp < timeNow) {
									if (!foundStart) {
										slice.videoStartTime = seg.startTime;
										foundStart=true;
									}
									//if (seg.startTime+dashPlayer.stream.videoAdaptationSet.segmentDuration < slice.videoEndTime)
									slice.videoEndTime = seg.startTime+seg.period.segmentDuration;
									graph.lastVideoTime = seg.startTime+seg.period.segmentDuration;
									bitrateAcc += seg.bitrate;
									++slice.bitrateCount;
								}
							}
							if (slice.bitrateCount > 0) { // Use the averag bitrate for segments downloaded within this slice
								slice.averageBitrate = bitrateAcc/slice.bitrateCount;
								graph.slices.push(slice);
							} else {
								if (graph.slices.length > 0) {
									var capacityDiff = Math.abs(graph.slices[graph.slices.length-1].bandwidth - slice.bandwidth);
									if (capacityDiff > 500) {
										slice.videoStartTime = graph.slices[graph.slices.length-1].videoEndTime;
										slice.videoEndTime = graph.slices[graph.slices.length-1].videoEndTime;
										slice.averageBitrate = dashPlayer.getLatestVideoBitrate();
										graph.slices.push(slice);
									}
								}
							}
						}
						//graph.slices.push(slice);

						// cull any old slices that fell off the back of the graph
						while (graph.slices.length > 0 && (graph.slices[0].playEndTime < (graph.playDuration-(graph.widthTimeMs+graph.widthTimeMs/4)))) {
							graph.slices.splice(0,1);
						}
						// paint the Graph
						// X axis should be in seconds playing (slice.playStartTime).
						// Y axis should be in kbps

						// determine the graph bounds (minX,maxX,minY=0,maxY)
						var maxX = graph.playDuration;
						var minX = maxX - graph.widthTimeMs;
						var minY = 0;
						var maxY = 250;
						var videoCurrentTime = video.currentTime;
						var playPositionX = 0;
						for (var i=0;i<graph.slices.length;++i) {
							if (graph.slices[i].averageBitrate > maxY)
								maxY = graph.slices[i].averageBitrate;
							if (graph.slices[i].bandwidth > maxY)
								maxY = graph.slices[i].bandwidth;
						}
						// determine the position of the current video time.
						for (var i=graph.slices.length-1;i>=0;--i) {
							if (graph.slices[i].videoStartTime < videoCurrentTime) {
								var sliceDirationS = graph.slices[i].videoEndTime-graph.slices[i].videoStartTime;
								var playDuration = graph.slices[i].playEndTime-graph.slices[i].playStartTime;
								if (graph.slices.length > i+1)
									playDuration = graph.slices[i+1].playStartTime-graph.slices[i].playStartTime;
								var dt = video.currentTime-graph.slices[i].videoStartTime;
								var offsetRatio = dt/sliceDirationS;
								playPositionX = graph.slices[i].playStartTime+playDuration*offsetRatio;
								break;
							}
						}

						// plot the graph
						// var canvas = document.getElementById('brCanvas');
						var canvas = wrapper.querySelector('.brCanvas');
						var ctx = canvas.getContext('2d');
						// Fill with a white background
						ctx.clearRect(0,0,canvas.width,canvas.height);

						// calculate the graph X,Y scalars
						var xScalar = (canvas.width-1) / (maxX-minX);
						var yScalar = (canvas.height-1) / (maxY-minY);

						ctx.lineWidth = 2;
						// Draw the bandwidth
						var gr = ctx.createLinearGradient(0,0,0,(canvas.height-1));
						gr.addColorStop(0,"rgba(0, 176, 0, 0.7)");
						gr.addColorStop(1,"rgba(0, 176, 0, 0.1)");
						ctx.beginPath();
						ctx.moveTo(0,(canvas.height-1));
						if (graph.slices.length > 0)
							ctx.lineTo(0,  (canvas.height-1) - yScalar*graph.slices[0].bandwidth );
						for (var i=0;i<graph.slices.length;++i) {
							var slice = graph.slices[i];
							ctx.lineTo(xScalar*(slice.playEndTime-minX),  (canvas.height-1) - yScalar*slice.bandwidth );
						}
						if (graph.slices.length > 0) {
							ctx.lineTo((canvas.width-1),  (canvas.height-1) - yScalar*graph.slices[graph.slices.length-1].bandwidth);
							ctx.lineTo((canvas.width-1),  (canvas.height-1));
						} else
							ctx.lineTo((canvas.width-1),  (canvas.height-1));
						ctx.closePath();
						ctx.fillStyle=gr;
						ctx.fill();

						// Draw the average bitrate
						var gr = ctx.createLinearGradient(0,0,0,(canvas.height-1));
						gr.addColorStop(0,"rgba(80, 80, 255, 1)");
						gr.addColorStop(1,"rgba(80, 80, 255, 0.3)");
						ctx.beginPath();
						ctx.moveTo(0,(canvas.height-1));
						if (graph.slices.length > 0)
							ctx.lineTo(0,  (canvas.height-1) - yScalar*graph.slices[0].averageBitrate );
						for (var i=0;i<graph.slices.length;++i) {
							var slice = graph.slices[i];
							ctx.lineTo(xScalar*(slice.playEndTime-minX),  (canvas.height-1) - yScalar*slice.averageBitrate );
						}
						if (graph.slices.length > 0) {
							ctx.lineTo((canvas.width-1),  (canvas.height-1) - yScalar*graph.slices[graph.slices.length-1].averageBitrate);
							ctx.lineTo((canvas.width-1),  (canvas.height-1));
						} else
							ctx.lineTo((canvas.width-1),  (canvas.height-1));
						ctx.closePath();
						ctx.fillStyle=gr;
						ctx.fill();

						// Draw the play position
						var x1 = xScalar*(playPositionX-minX);
						ctx.beginPath();
						ctx.strokeStyle="#FFA000";
						ctx.moveTo(x1,0);
						ctx.lineTo(x1,(canvas.height-1));
						ctx.stroke();


						graph.lastSliceTime = timeNow;
					} else
						graph.lastSliceTime = UtilitiesModule.setNewTime();

				};
			};

			graphInstance = new Graph2();

			numberWithCommas = function (x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			};


			updateStats = function () {
				if (!dashPlayer) return;

				var decoderBufferDuration = dashPlayer.getDecoderBufferDuration();
				var bufferDuration = dashPlayer.getJSBufferDuration();
				var bufferPercent = ((bufferDuration+decoderBufferDuration) / (dashPlayer.MAX_BUFFER_TIME+dashPlayer.MAX_SOURCE_BUFFER_TIME) * 100);
				if (bufferPercent > 100) { bufferPercent=100; }
				bufferMeter.innerHTML = '&nbsp;'+(bufferDuration+decoderBufferDuration).toFixed(2)+'s';
				bufferMeter.style.width = bufferPercent.toFixed(0)+'%';
				if (bufferPercent > 60) {
					bufferMeter.style.backgroundColor = '#008000';
				} else if (bufferPercent > 40) {
					bufferMeter.style.backgroundColor = '#808000';
				} else {
					bufferMeter.style.backgroundColor = '#900000';
				}

				var repIndex = wrapper.querySelector('.repIndex');
				if (!repIndex)
					return;
				wrapper.querySelector('.repIndex').innerHTML = (dashPlayer.getCurrentVideoRepresentationIndex()+1)+'/'+dashPlayer.getVideoRepresentationCount();
				if (dashPlayer.getCurrentVideoRepresentationIndex() < dashPlayer.getLatestVideoRepresentationIndex()) {
					adaptDirection.innerHTML = '+';
				} else if (dashPlayer.getCurrentVideoRepresentationIndex() > dashPlayer.getLatestVideoRepresentationIndex()) {
					adaptDirection.innerHTML = '-';
				} else {
					adaptDirection.innerHTML = '';
				}

				if (dashPlayer.stream) {
					var streamSegmentIndex = dashPlayer.stream.getStreamSegmentIndexAtStreamTime(video.currentTime);
					var mediaSegmentInfo = dashPlayer.stream.getMediaSegmentIndexAtStreamSegmentIndex(streamSegmentIndex);
					var currentPeriod = dashPlayer.stream.periods[mediaSegmentInfo.periodIndex];
					var vidId = thisMovieId;
					if (currentPeriod.movieId)
						vidId = currentPeriod.movieId;
				wrapper.querySelector('.videoId').innerHTML = vidId;
				}

				var bandwidth = dashPlayer.getCurrentDownloadBitrate();
				wrapper.querySelector('.dlBitrate').innerHTML = numberWithCommas(bandwidth.toFixed(0));
				var vidBitrate = dashPlayer.getCurrentVideoBitrate();
				wrapper.querySelector('.vidBitrate').innerHTML = numberWithCommas(vidBitrate.toFixed(0));
				wrapper.querySelector('.vidDimensions').innerHTML = video.videoWidth+'<small>x</small>'+video.videoHeight;

				wrapper.querySelector('.vidLatency').innerHTML = dashPlayer.getLatencyMS().toFixed(0);


				var droppedFrames = 0;
				if(typeof video.getVideoPlaybackQuality === 'function') { // Firefox
					var vdeoPlaybackQuality = video.getVideoPlaybackQuality();
					if (vdeoPlaybackQuality) {
						droppedFrames = vdeoPlaybackQuality.droppedVideoFrames;
					}
				}
				else if ("webkitDroppedFrameCount" in video) { // Chrome/Safari
					droppedFrames = video.webkitDroppedFrameCount;
				}

				<!-- error stats -->
				wrapper.querySelector('.vidDroppedFrames').innerHTML = droppedFrames;
				if (dashPlayer.stream) {
					wrapper.querySelector('.freezes').innerHTML = dashPlayer.stream.freezeCount;
					wrapper.querySelector('.adaptFails').innerHTML =  dashPlayer.stream.adaptFailureCount;
					wrapper.querySelector('.droppedSources').innerHTML = dashPlayer.stream.deletedSourceCount;
					wrapper.querySelector('.congestionRescue').innerHTML = dashPlayer.stream.congestionCount;
				}

				graphInstance.iteration();
			};

			return {
				updateStats: updateStats
			};
		}());


		// Initiate the setup and display of the video player controls
		InitPlayerControls = function (playerInstanceId) {
			// Set this players unique selector string. This is required for multiple players on a single page.
			playerInstanceSelector = '#' + playerInstanceId;

			// Assign the player nodes to the variables declared in the top level of dash_player_ux.
			embedElement = document.getElementById(embedId);
			_body = document.body;
			video = document.querySelector(playerInstanceSelector + ' video');
			controls = document.querySelector(playerInstanceSelector + ' .controls');
			secondaryControls = document.querySelector(playerInstanceSelector + ' .secondaryControls');
			touchShield = document.querySelector(playerInstanceSelector + ' .touch-shield');
			close = document.querySelectorAll(playerInstanceSelector + ' .close');
			closeModal = document.querySelector(playerInstanceSelector + ' .closeModal');
			bufferOverlay = document.querySelector(playerInstanceSelector + ' .buffer-overlay');
			playButtonOverlay = document.querySelector(playerInstanceSelector + ' .play-button-overlay');
			playButtonOverlayIcon = document.querySelector(playerInstanceSelector + ' .play-button-overlay div');
			play = document.querySelector(playerInstanceSelector + ' .play');
			quality = document.querySelector(playerInstanceSelector+ ' .quality');
			qualityMenu = document.querySelector(playerInstanceSelector+ ' .quality-menu');
			activeChangingBitrate = document.querySelectorAll('.current');
			qualityDetailsCurrent = document.querySelector(playerInstanceSelector+ ' .quality-details .current');
			qualityDetailsTarget = document.querySelector(playerInstanceSelector+ ' .quality-details .target');
			qualityCurrentDisplay = document.querySelector(playerInstanceSelector+ ' .current-quality-display');
			volume = document.querySelector(playerInstanceSelector + ' .volume');
			muteIconX = document.querySelector(playerInstanceSelector + ' .mute-x');
			muteIcon = document.querySelector(playerInstanceSelector + ' .mute-icon');
			volumeSlider = document.querySelector(playerInstanceSelector + ' .volume-slider');
			volumeProgress = document.querySelector(playerInstanceSelector + ' .volume-slider-progress');
			volumeDisplay = document.querySelector(playerInstanceSelector + ' .volume-display');
			volumeSliderWrapper = document.querySelector(playerInstanceSelector + ' .volume-slider-wrapper');
			popout = document.querySelector(playerInstanceSelector + ' .popout');
			settings = document.querySelector(playerInstanceSelector + ' .settings');
			stats = document.querySelector(playerInstanceSelector + ' .stats');
			fullscreen = document.querySelector(playerInstanceSelector + ' .fullscreen');
			seekbar = document.querySelector(playerInstanceSelector + ' .seekbar');
			seekbarProgress = document.querySelector(playerInstanceSelector + ' .seekbar-progress');
			durationTime = document.querySelector(playerInstanceSelector + ' .duration-time');
			currentTime = document.querySelector(playerInstanceSelector + ' .current-time');
			trickPlayWrapper = document.querySelector(playerInstanceSelector + ' .trick-play-wrapper');
			trickPlayTimeCode = document.querySelector(playerInstanceSelector + ' .trick-play-time');
			trickPlayContainer = document.querySelector(playerInstanceSelector + ' .trick-play-image-container');
			trickPlaySpinner = document.querySelector(playerInstanceSelector + ' .trick-play-spinner');
			bufferMeter = wrapper.querySelector('.bufferMeter');
			adaptDirection = wrapper.querySelector('.vidAdaptDirection');
			controllerPanels = {
				quality: document.querySelector(playerInstanceSelector + ' .quality-controller'),
				volume: document.querySelector(playerInstanceSelector + ' .volume-controller'),
				stats: document.querySelector(playerInstanceSelector + ' .stats-controller'),
				settings: document.querySelector(playerInstanceSelector + ' .settings-controller'),
			};

			var doPopout = function(){

                        if (parameters.popoutCallback) {
                            parameters.popoutCallback();
                        }

		        var endedEvent, popoutWindow;
		        try  {
		            endedEvent = new Event('ended');
		        } catch(err) {							// This is IE
		            endedEvent = document.createEvent('Event');
					endedEvent.initEvent('ended', true, true);
		        }

			  	if (endedEvent) video.dispatchEvent(endedEvent);
				if (typeof killModalPlayer == 'function') killModalPlayer();

				if (isEdge) {
					var cb = parseInt(Math.random() * 10000);
					popoutWindow = window.open(parameters.popoutHtmlUrl + '?url=' + parameters.url + '&format=' + parameters.format + '&movieId=' + thisMovieId + '&useNativeControls=' + parameters.useNativeControls + (parameters.popoutTitle ? '&popoutTitle=' + parameters.popoutTitle : '') + (parameters.format == 'HLS' ? '&embedHLS=1' : ''), 'videoPlayer' + cb);   // force open in tab
				} else {	
					popoutWindow = window.open(parameters.popoutHtmlUrl + '?url=' + parameters.url + '&format=' + parameters.format + '&movieId=' + thisMovieId + '&so=' + dashPlayerCoreObject.stream.time + '&useNativeControls=' + parameters.useNativeControls + (parameters.popoutTitle ? '&popoutTitle=' + parameters.popoutTitle : ''), 'videoPlayer', 'width=848, height=480, modal=yes,resizable=1, top=0,left=0,menubar=0,toolbar=0,location=0');   //width=848, height=480,
				}	

				if (popoutWindow) popoutWindow.focus();
			}

			// hide default video controls
			// prevents bugs and strange behavior associated with not having
			// the control attribute initially set on the video element in certain browsers
			video.controls = false;

			// list of nodes that listeners will be attached to for the lifecycle of the page
			// a few temporary event listeners are set up in the PanelVisibility function
			// node property is a reference to the DOM node
			// handlerTypes property is a shorthand for the handlers to attach to the node value and are mapped to actual handlers in the EventNodule
			// behavior is the method run by the event listener callback
			var NODE_LISTENER_LIST = {
				fullScreen: {
					node: fullscreen,
					handlerTypes: ['click'],
					behavior: FullScreenBehavior.toggleFullScreenMode
				},
				muteIcon: {
					node: muteIcon,
					handlerTypes: ['click'],
					behavior: VolumeSettings.manageMute
				},
				play: {
					node: play,
					handlerTypes: ['click'],
					behavior: PlayerBehavior.managePlayEvents
				},
				playButtonOverlay: {
					node: playButtonOverlay,
					handlerTypes: ['click'],
					behavior: PlayerBehavior.managePlayEvents
				},
				playButtonOverlayIcon: {
					node: playButtonOverlayIcon,
					handlerTypes: ['click'],
					behavior: PlayerBehavior.managePlayEvents
				},
				settings: {
					node: settings,
					handlerTypes: ['click'],
					behavior: PanelVisibility.showPanel
				},
				quality: {
					node: quality,
					handlerTypes: ['click'],
					behavior: PanelVisibility.showPanel
				},
				qualityCurrentDisplay: {
					node: qualityCurrentDisplay,
					handlerTypes: ['click'],
					behavior: PanelVisibility.showPanel
				},
				seekbar: {
					node: seekbar,
					handlerTypes: ['downup','overout','enterleave','move'],
					behavior: SeekBarBehavior.manageSeekEvents
				},

				popout: {
					node: popout,
					handlerTypes: ['click'],
					behavior: doPopout
				},

				stats: {
					node: stats,
					handlerTypes: ['click'],
					behavior: PanelVisibility.showPanel
				},

				touchShield: {
					node: touchShield,
					handlerTypes: ['click','move'],
					behavior: PanelVisibility.managePanelEvent
				},
				video: {
					node: video,
					handlerTypes: ['click'],
					behavior: PlayerBehavior.managePlayEvents
				},
				volume: {
					node: volume,
					handlerTypes: ['click'],
					behavior: PanelVisibility.showPanel
				},
				volumeSlider: {
					node: volumeSlider,
					handlerTypes: ['move','downup'],
					behavior: VolumeSettings.manageVolume
				},
				wrapper: {
					node: wrapper,
					handlerTypes: ['move','enterleave'],
					behavior: PlayerControlsVisibility.manageVisibilityEvents
				}
			};

			// If this is not DASH, hide the stats & bitrate change stuff
			if (!dashPlayer) {
				stats.style.visibility = 'hidden';
				quality.style.backgroundImage = 'none';
				quality.style.cursor = 'auto';
				delete NODE_LISTENER_LIST['stats'];
				delete NODE_LISTENER_LIST['quality'];
				delete NODE_LISTENER_LIST['qualityCurrentDisplay'];
			}

			if (typeof killModalPlayer === 'function') {
				NODE_LISTENER_LIST.closeModal = {
					node: closeModal,
					handlerTypes: ['click'],
					behavior: killModalPlayer
				};
			}

			// Set player heartbeat that initializes certain player settings then periodically checks the player state.
			(function () {
				var initialDurationSet = false;
				var initialVolumeSet = false;
				var initialBitratesStatsSet = false;
				var initialPlayStateSet = false;


				var setInitialPlayState = function () {
					// On autoplay the player can get stuck in a state where the video starts playing and the overlay
					// play/pause button will remain visible on the screen. This function will check for that state,
					// and set the overlay button to the correct visibility state.
					if (!initialPlayStateSet && !StateModule.uiState.controlsVisible && StateModule.uiState.isPlaying()) {
						StateModule.setTheControlsVisibilityState.hide();
						StateModule.setPlayPauseUiState.overlayVisibility.hide();
						// Since this is not a user driven event we cannot determine definitively if the user is on a touch, hybrid or mouse enabled device so just hide the mouse.
						StateModule.setMouseVisibilityState.hide();
						initialPlayStateSet = true;
					}

					// Added when Chrome stopped supporting autoplay in HTML5 player
					// persist the play button overlay if user has not initialized playing
					if(initialPlayStateSet === false && (StateModule.uiState.overlayVisible === null || StateModule.uiState.overlayVisible === false) ){
						StateModule.setPlayPauseUiState.overlayVisibility.show();
					}

				};

				// set the initial mute and volume setting
				var setInitialVolume = function () {
					if (initialVolumeSet === false && video.readyState > 0 && video.volume !== null ) {
						StateModule.setMuteState();
					}
				};

				// set the video duration in the player
				var setInitialDuration = function () {
					if (initialDurationSet === false && video.readyState > 0) {
						var duration = video.duration;
						if (dashPlayer) duration=dashPlayer.stream.duration;
						SeekBarBehavior.setDurationTime(duration);
						StateModule.uiState.videoDuration = Math.floor(duration); // in seconds
						initialDurationSet = true;
					}
				};

				// Set the current play button state to match the current video state.
				var setPlayButtonState = function () {
					//if(StateModule.uiState.isPlaying()) {StateModule.setPlayPauseUiState.overlayVisibility.hide()}
					StateModule.setPlayPauseUiState.buttonState.determineState();
				};

				// Set the current time to displayed.
				var setCurrentTime = function () {
					if (video.readyState > 0) {SeekBarBehavior.setCurrentTime()}
				};

				// Suspend setting seekbar while a user is actively scrubbing on the seekbar.
				var setSeekbar = function () {
					if (!StateModule.uiState.seeking && video.readyState > 0) {SeekBarBehavior.syncSeekbar(video.currentTime)}
				};

				// controls the visibility of the controls and mouse if there is no user interaction with the player for a given time
				var checkPlayerControlsVisibility = function () {
					if (!StateModule.uiState.seeking && StateModule.lastUserInteractionTime.getTimeSinceLastInteraction() >= timingObj.hideControlsThreshold && StateModule.uiState.controlsVisible !== false) {
						StateModule.setTheControlsVisibilityState.hide();
						// allows the play overlay button to remain visible on the start of a play event on devices that do not autoplay
						if ((video.readyState > 0 && Number(video.currentTime) > 0)) {
							StateModule.setPlayPauseUiState.overlayVisibility.hide();
						}

						// Since this is not a user driven event we cannot determine definitively if the user is on a touch, hybrid or mouse enabled device so just hide the mouse.
						StateModule.setMouseVisibilityState.hide();
						StateModule.uiState.seeking = false;
					}
				};

				// On play initialization update the player stats.
				var runStatsUpdate = function () {
					if (video.readyState > 0) { StatsSettingsBehavior.updateStats() }
				};

				// Check to make sure the video is still attached to the page, if it isn't kill the heartbeat.
				var checkVideoState = function () {
					var attached = false;
					var elem = video;
					while (elem) {
						if (elem.nodeName.toUpperCase() == 'HTML') {
							attached = true;
							break;
						}
						elem = elem.parentElement;
					}
					if (!attached) { killHeartBeat(); }
				};

				// Kill the heartbeat if video is removed from DOM.
				var killHeartBeat = function () { 
					clearInterval(playerHeartBeat);
					clearInterval(BitrateSettingsBehavior.bitrateUpdateTimer);
				};

				var checkAdaptingState = function() {
					if (!dashPlayer) return;
					var currentRepIndex = dashPlayer.getCurrentVideoRepresentationIndex();
					var latestRepIndex = dashPlayer.getLatestVideoRepresentationIndex();
					if (currentRepIndex != latestRepIndex) {
						for (var i = 0; i < activeChangingBitrate.length; i++) {
							if (!activeChangingBitrate[i].classList.contains('pulse')) {
								activeChangingBitrate[i].classList.add('pulse');
							}
						}
					} else {
						for (var i = 0; i < activeChangingBitrate.length; i++) {
							if (activeChangingBitrate[i].classList.contains('pulse')) {
								activeChangingBitrate[i].classList.remove('pulse');
							}
						}
					}
				};

				// the heart beat
				var playerHeartBeat = setInterval (
					function() {
						setPlayButtonState();
						setCurrentTime();
						setSeekbar();
						checkPlayerControlsVisibility();
						runStatsUpdate();
						checkAdaptingState();
						checkVideoState();
						BitrateSettingsBehavior.getBitrateArray();
						// check and run the following functions once on initialization
						setInitialPlayState();
						setInitialDuration();
						setInitialVolume();
					},
					timingObj.heartbeatInterval);
			}());


			// Call the event module
			EventModule(NODE_LISTENER_LIST);
		};

		return {
			InitPlayerControls: InitPlayerControls
		}
	}());


	// Set the initial user interaction time.
	StateModule.lastUserInteractionTime.setLastInteractionTime();

	// Attach player behavior to the DOM elements.
	BehaviorModule.InitPlayerControls(playerInstanceId);

	return {
		playerInstanceId: playerInstanceId,
		controlsEndOfStreamCallback: StateModule.setEndVideoState
	};
};
