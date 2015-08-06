//  easeTo.js 0.0.1
//  https://github.com/flovan/easeTo
//  (c) 2015-whateverthecurrentyearis Florian Vanthuyne
//  easeTo may be freely distributed under the MIT license.

(function (w, d) {
	'use strict';

	///////////////////////////////////////////////////////////////////////////
	//                                                                       //
	// IE POLYFILLS                                                          //
	//                                                                       //
	///////////////////////////////////////////////////////////////////////////

	// Map console to empty function to prevent page errors
	w.console = w.console || {
		error: function () {}
	}

	// Add a `hasOwnProperty()` method on window if there is none
	window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty;

	///////////////////////////////////////////////////////////////////////////
	//                                                                       //
	// Constructor                                                           //
	//                                                                       //
	///////////////////////////////////////////////////////////////////////////

	function easeTo (trg, opts) {
		var
			_engine      = null,
			_counter     = 0,
			_startValue  = 0,
			_offsetValue = 0,
			_endValue    = 0,
			_easing      = null,
			_settings    = {
				easing:   'linear',
				duration: 250
			}
		;

		// Prevent empty or invalid target
		if (trg === undefined) {
			console.error('`easeTo` requires a target of type Number or a Node element).');
			return;
		} else if (typeof trg !== 'number' && typeof trg !== 'object') {
			// TODO: maybe add an extra check to see if this is really a Node
			console.error('The `easeTo` target should be a Number or a Node element.');
			return;
		}

		// Prevent invalid options
		opts = opts || {};
		if (!isObject(opts)) {
			console.error('The options passed into `easeTo` should be an Object. Continuing with default settings.');
			opts = {};
			return;
		}

		// Grab window offset
		_startValue = w.pageYOffset || d.body.scrollTop;

		// Get the target value
		_endValue = (typeof trg !== 'number') ? trg.offsetTop : trg;

		// Merge options with default settings
		_settings = extend({}, _settings, opts);

		// Define the easing functions
		_easing = generateEasingFcts();

		// Let the engine run
		_engine = setInterval(function () {
			_offsetValue = _easing[_settings.easing](
				_counter,
				_startValue,
				_endValue - _startValue,
				_settings.duration
			);

			console.log('Scrolling to %s with easing %', _endValue, _settings.easing);

			_counter++;
			window.scrollTo(0, _offsetValue);

			if (_counter > _settings.duration) {
				clearInterval(_engine);
			}
		}, 1);
	}

	w.easeTo = w.easeTo || easeTo;

	///////////////////////////////////////////////////////////////////////////
	//                                                                       //
	// HELPER FUNCTIONS                                                      //
	//                                                                       //
	///////////////////////////////////////////////////////////////////////////

	function generateEasingFcts () {
		// Easing functions have following parameters:
		//
		// t = current time
		// b = start value
		// c = change in value
		// d = duration
		//
		// Source: http://www.gizma.com/easing

		return {
			// simple linear tweening - no easing, no acceleration
			linear: function (t, b, c, d) {
				return c*t/d + b;
			},

			// quadratic easing in - accelerating from zero velocity
			easeInQuad: function (t, b, c, d) {
				t /= d;
				return c*t*t + b;
			},

			// quadratic easing out - decelerating to zero velocity
			easeOutQuad: function (t, b, c, d) {
				t /= d;
				return -c * t*(t-2) + b;
			},

			// quadratic easing in/out - acceleration until halfway, then deceleration
			easeInOutQuad: function (t, b, c, d) {
				t /= d/2;
				if (t < 1) return c/2*t*t + b;
				t--;
				return -c/2 * (t*(t-2) - 1) + b;
			},

			// cubic easing in - accelerating from zero velocity
			easeInCubic: function (t, b, c, d) {
				t /= d;
				return c*t*t*t + b;
			},

			// cubic easing out - decelerating to zero velocity
			easeOutCubic: function (t, b, c, d) {
				t /= d;
				t--;
				return c*(t*t*t + 1) + b;
			},

			// cubic easing in/out - acceleration until halfway, then deceleration
			easeInOutCubic: function (t, b, c, d) {
				t /= d/2;
				if (t < 1) return c/2*t*t*t + b;
				t -= 2;
				return c/2*(t*t*t + 2) + b;
			},

			// quartic easing in - accelerating from zero velocity
			easeInQuart: function (t, b, c, d) {
				t /= d;
				return c*t*t*t*t + b;
			},

			// quartic easing out - decelerating to zero velocity
			easeOutQuart: function (t, b, c, d) {
				t /= d;
				t--;
				return -c * (t*t*t*t - 1) + b;
			},

			// quartic easing in/out - acceleration until halfway, then deceleration
			easeInOutQuart: function (t, b, c, d) {
				t /= d/2;
				if (t < 1) return c/2*t*t*t*t + b;
				t -= 2;
				return -c/2 * (t*t*t*t - 2) + b;
			},

			// quintic easing in - accelerating from zero velocity
			easeInQuint: function (t, b, c, d) {
				t /= d;
				return c*t*t*t*t*t + b;
			},

			// quintic easing out - decelerating to zero velocity
			easeOutQuint: function (t, b, c, d) {
				t /= d;
				t--;
				return c*(t*t*t*t*t + 1) + b;
			},

			// quintic easing in/out - acceleration until halfway, then deceleration
			easeInOutQuint: function (t, b, c, d) {
				t /= d/2;
				if (t < 1) return c/2*t*t*t*t*t + b;
				t -= 2;
				return c/2*(t*t*t*t*t + 2) + b;
			},

			// sinusoidal easing in - accelerating from zero velocity
			easeInSine: function (t, b, c, d) {
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},

			// sinusoidal easing out - decelerating to zero velocity
			easeOutSine: function (t, b, c, d) {
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},

			// sinusoidal easing in/out - accelerating until halfway, then decelerating
			easeInOutSine: function (t, b, c, d) {
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			},

			// exponential easing in - accelerating from zero velocity
			easeInExpo: function (t, b, c, d) {
				return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
			},

			// exponential easing out - decelerating to zero velocity
			easeOutExpo: function (t, b, c, d) {
				return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
			},

			// exponential easing in/out - accelerating until halfway, then decelerating
			easeInOutExpo: function (t, b, c, d) {
				t /= d/2;
				if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
				t--;
				return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
			},

			// circular easing in - accelerating from zero velocity
			easeInCirc: function (t, b, c, d) {
				t /= d;
				return -c * (Math.sqrt(1 - t*t) - 1) + b;
			},

			// circular easing out - decelerating to zero velocity
			easeOutCirc: function (t, b, c, d) {
				t /= d;
				t--;
				return c * Math.sqrt(1 - t*t) + b;
			},

			// circular easing in/out - acceleration until halfway, then deceleration
			easeInOutCirc: function (t, b, c, d) {
				t /= d/2;
				if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				t -= 2;
				return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
			}
		};
	}

	///////////////////////////////////////////////////////////////////////////
	//                                                                       //
	// LIBS                                                                  //
	//                                                                       //
	// A subset of Underscore.js functions                                   //
	// https://github.com/jashkenas/underscore                               //
	//                                                                       //
	///////////////////////////////////////////////////////////////////////////

	// Extends an object with another object
	var extend = function(obj) {
		if (!isObject(obj)) return obj;
		var source, prop;
		for (var i = 1, length = arguments.length; i < length; i++) {
			source = arguments[i];
			for (prop in source) {
				if (hasOwnProperty.call(source, prop)) {
					obj[prop] = source[prop];
				}
			}
		}
		return obj;
	};

	// Checks if a variable is an object
	var isObject = function(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !!obj;
	};
})(window, document);