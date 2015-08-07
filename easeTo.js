//  easeTo.js 0.0.2
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
			_engine        = null,
			_counter       = 0,
			_startValue    = 0,
			_offsetValue   = 0,
			_endValue      = 0,
			_easing        = generateEasingFcts(),
			_containerFlag = false,
			_defaults      = {
				easing:    'linear',
				duration:  250,
				offset:    0,
				container: w,
				callback:  null
			},
			_settings      = {},
			_trgType       = typeof trg
		;

		// Prevent empty or invalid target
		if (trg === undefined || (_trgType !== 'number' && _trgType !== 'object' || _trgType === 'object' && !trg.nodeType > 0)) {
			console.error('The `easeTo` target parameter should be a Number or an element.');
			return;
		}

		// Prevent invalid options
		opts = opts || {};
		if (!isObject(opts)) {
			console.error('The options parameter passed into `easeTo` should be an Object. Continuing with default settings.');
			opts = {};
			return;
		}

		// Prevent invalid easing
		if (opts.easing === undefined || _easing[opts.easing] === 'undefined') {
			console.error('The easing option passed into `easeTo` is not valid. Using default value.');
			opts.easing = _defaults.easing;
		}

		// Prevent invalid duration
		if (opts.duration !== undefined && typeof opts.duration !== 'number') {
			console.error('The duration option passed into `easeTo` should be a Number. Using default value.');
			opts.duration = _defaults.duration;
		}

		// Prevent invalid offset
		if (opts.offset !== undefined && typeof opts.offset !== 'number') {
			console.error('The offset option passed into `easeTo` should be a Number. Using default value.');
			opts.offset = _defaults.offset;
		}

		// Merge options with default settings
		_settings = extend(_settings, _defaults, opts);
		
		// Get the target value
		_endValue = ((_trgType !== 'number') ? trg.offsetTop : trg) + _settings.offset;

		// Check if a custom container was passed and if it's valid
		// Also set the startValue
		if (_settings.container !== w) {
			if (!_settings.container.nodeType > 0) {
				console.error('The container that was passed into the `easeTo` options is not an element.');
				return;
			}

			_containerFlag = true;
			_startValue = _settings.container.scrollTop;
		} else {
			_startValue = w.pageYOffset || d.body.scrollTop;
		}

		// If the endValue is already the startValue, quit early
		if (_startValue === _endValue) {
			if (typeof _settings.callback === 'function') {
				_settings.callback.apply(_settings.container);
			}
			return;
		}

		// Let the engine run
		_engine = setInterval(function () {
			_offsetValue = _easing[_settings.easing](
				_counter,
				_startValue,
				_endValue - _startValue,
				_settings.duration
			);

			if (_containerFlag) {
				_settings.container.scrollTop = _offsetValue;
			} else {
				window.scrollTo(0, _offsetValue);
			}

			_counter++;
			if (_counter > _settings.duration) {
				clearInterval(_engine);

				if (typeof _settings.callback === 'function') {
					_settings.callback.apply(_settings.container);
				}
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