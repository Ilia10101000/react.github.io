/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30);
	module.exports = __webpack_require__(15);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	if (true) {
	  module.exports = __webpack_require__(32);
	} else {
	  module.exports = require('./cjs/react.development.js');
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var asap = __webpack_require__(5);
	
	function noop() {}
	
	// States:
	//
	// 0 - pending
	// 1 - fulfilled with _value
	// 2 - rejected with _value
	// 3 - adopted the state of another promise, _value
	//
	// once the state is no longer pending (0) it is immutable
	
	// All `_` prefixed properties will be reduced to `_{random number}`
	// at build time to obfuscate them and discourage their use.
	// We don't use symbols or Object.defineProperty to fully hide them
	// because the performance isn't good enough.
	
	
	// to avoid using try/catch inside critical functions, we
	// extract them to here.
	var LAST_ERROR = null;
	var IS_ERROR = {};
	function getThen(obj) {
	  try {
	    return obj.then;
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	
	function tryCallOne(fn, a) {
	  try {
	    return fn(a);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	function tryCallTwo(fn, a, b) {
	  try {
	    fn(a, b);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	
	module.exports = Promise;
	
	function Promise(fn) {
	  if (typeof this !== 'object') {
	    throw new TypeError('Promises must be constructed via new');
	  }
	  if (typeof fn !== 'function') {
	    throw new TypeError('not a function');
	  }
	  this._45 = 0;
	  this._81 = 0;
	  this._65 = null;
	  this._54 = null;
	  if (fn === noop) return;
	  doResolve(fn, this);
	}
	Promise._10 = null;
	Promise._97 = null;
	Promise._61 = noop;
	
	Promise.prototype.then = function(onFulfilled, onRejected) {
	  if (this.constructor !== Promise) {
	    return safeThen(this, onFulfilled, onRejected);
	  }
	  var res = new Promise(noop);
	  handle(this, new Handler(onFulfilled, onRejected, res));
	  return res;
	};
	
	function safeThen(self, onFulfilled, onRejected) {
	  return new self.constructor(function (resolve, reject) {
	    var res = new Promise(noop);
	    res.then(resolve, reject);
	    handle(self, new Handler(onFulfilled, onRejected, res));
	  });
	};
	function handle(self, deferred) {
	  while (self._81 === 3) {
	    self = self._65;
	  }
	  if (Promise._10) {
	    Promise._10(self);
	  }
	  if (self._81 === 0) {
	    if (self._45 === 0) {
	      self._45 = 1;
	      self._54 = deferred;
	      return;
	    }
	    if (self._45 === 1) {
	      self._45 = 2;
	      self._54 = [self._54, deferred];
	      return;
	    }
	    self._54.push(deferred);
	    return;
	  }
	  handleResolved(self, deferred);
	}
	
	function handleResolved(self, deferred) {
	  asap(function() {
	    var cb = self._81 === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      if (self._81 === 1) {
	        resolve(deferred.promise, self._65);
	      } else {
	        reject(deferred.promise, self._65);
	      }
	      return;
	    }
	    var ret = tryCallOne(cb, self._65);
	    if (ret === IS_ERROR) {
	      reject(deferred.promise, LAST_ERROR);
	    } else {
	      resolve(deferred.promise, ret);
	    }
	  });
	}
	function resolve(self, newValue) {
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {
	    return reject(
	      self,
	      new TypeError('A promise cannot be resolved with itself.')
	    );
	  }
	  if (
	    newValue &&
	    (typeof newValue === 'object' || typeof newValue === 'function')
	  ) {
	    var then = getThen(newValue);
	    if (then === IS_ERROR) {
	      return reject(self, LAST_ERROR);
	    }
	    if (
	      then === self.then &&
	      newValue instanceof Promise
	    ) {
	      self._81 = 3;
	      self._65 = newValue;
	      finale(self);
	      return;
	    } else if (typeof then === 'function') {
	      doResolve(then.bind(newValue), self);
	      return;
	    }
	  }
	  self._81 = 1;
	  self._65 = newValue;
	  finale(self);
	}
	
	function reject(self, newValue) {
	  self._81 = 2;
	  self._65 = newValue;
	  if (Promise._97) {
	    Promise._97(self, newValue);
	  }
	  finale(self);
	}
	function finale(self) {
	  if (self._45 === 1) {
	    handle(self, self._54);
	    self._54 = null;
	  }
	  if (self._45 === 2) {
	    for (var i = 0; i < self._54.length; i++) {
	      handle(self, self._54[i]);
	    }
	    self._54 = null;
	  }
	}
	
	function Handler(onFulfilled, onRejected, promise){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}
	
	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, promise) {
	  var done = false;
	  var res = tryCallTwo(fn, function (value) {
	    if (done) return;
	    done = true;
	    resolve(promise, value);
	  }, function (reason) {
	    if (done) return;
	    done = true;
	    reject(promise, reason);
	  })
	  if (!done && res === IS_ERROR) {
	    done = true;
	    reject(promise, LAST_ERROR);
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
	  ) {
	    return;
	  }
	  if (false) {
	    // This branch is unreachable because this function is only called
	    // in production, but the condition is true only in development.
	    // Therefore if the branch is still here, dead code elimination wasn't
	    // properly applied.
	    // Don't change the message. React DevTools relies on it. Also make sure
	    // this message doesn't occur elsewhere in this function, or it will cause
	    // a false positive.
	    throw new Error('^_^');
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}
	
	if (true) {
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = __webpack_require__(29);
	} else {
	  module.exports = require('./cjs/react-dom.development.js');
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	var require$$0 = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	
	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }
	
	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}
	
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var require$$0__namespace = /*#__PURE__*/_interopNamespace(require$$0);
	var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);
	
	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
	
	var jsxRuntime = {exports: {}};
	
	var reactJsxRuntime_production_min = {};
	
	/**
	 * @license React
	 * react-jsx-runtime.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	var hasRequiredReactJsxRuntime_production_min;
	
	function requireReactJsxRuntime_production_min () {
		if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
		hasRequiredReactJsxRuntime_production_min = 1;
	var f=require$$0__default["default"],k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
		function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
		return reactJsxRuntime_production_min;
	}
	
	var reactJsxRuntime_development = {};
	
	/**
	 * @license React
	 * react-jsx-runtime.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	var hasRequiredReactJsxRuntime_development;
	
	function requireReactJsxRuntime_development () {
		if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
		hasRequiredReactJsxRuntime_development = 1;
	
		if (false) {
		  (function() {
	
		var React = require$$0__default["default"];
	
		// ATTENTION
		// When adding new symbols to this file,
		// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
		// The Symbol used to tag the ReactElement-like types.
		var REACT_ELEMENT_TYPE = Symbol.for('react.element');
		var REACT_PORTAL_TYPE = Symbol.for('react.portal');
		var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
		var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
		var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
		var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
		var REACT_CONTEXT_TYPE = Symbol.for('react.context');
		var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
		var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
		var REACT_MEMO_TYPE = Symbol.for('react.memo');
		var REACT_LAZY_TYPE = Symbol.for('react.lazy');
		var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = '@@iterator';
		function getIteratorFn(maybeIterable) {
		  if (maybeIterable === null || typeof maybeIterable !== 'object') {
		    return null;
		  }
	
		  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
	
		  if (typeof maybeIterator === 'function') {
		    return maybeIterator;
		  }
	
		  return null;
		}
	
		var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	
		function error(format) {
		  {
		    {
		      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		        args[_key2 - 1] = arguments[_key2];
		      }
	
		      printWarning('error', format, args);
		    }
		  }
		}
	
		function printWarning(level, format, args) {
		  // When changing this logic, you might want to also
		  // update consoleWithStackDev.www.js as well.
		  {
		    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		    var stack = ReactDebugCurrentFrame.getStackAddendum();
	
		    if (stack !== '') {
		      format += '%s';
		      args = args.concat([stack]);
		    } // eslint-disable-next-line react-internal/safe-string-coercion
	
	
		    var argsWithFormat = args.map(function (item) {
		      return String(item);
		    }); // Careful: RN currently depends on this prefix
	
		    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
		    // breaks IE9: https://github.com/facebook/react/issues/13610
		    // eslint-disable-next-line react-internal/no-production-logging
	
		    Function.prototype.apply.call(console[level], console, argsWithFormat);
		  }
		}
	
		// -----------------------------------------------------------------------------
	
		var enableScopeAPI = false; // Experimental Create Event Handle API.
		var enableCacheElement = false;
		var enableTransitionTracing = false; // No known bugs, but needs performance testing
	
		var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
		// stuff. Intended to enable React core members to more easily debug scheduling
		// issues in DEV builds.
	
		var enableDebugTracing = false; // Track which Fiber(s) schedule render work.
	
		var REACT_MODULE_REFERENCE;
	
		{
		  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
		}
	
		function isValidElementType(type) {
		  if (typeof type === 'string' || typeof type === 'function') {
		    return true;
		  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).
	
	
		  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
		    return true;
		  }
	
		  if (typeof type === 'object' && type !== null) {
		    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
		    // types supported by any Flight configuration anywhere since
		    // we don't know which Flight build this will end up being used
		    // with.
		    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
		      return true;
		    }
		  }
	
		  return false;
		}
	
		function getWrappedName(outerType, innerType, wrapperName) {
		  var displayName = outerType.displayName;
	
		  if (displayName) {
		    return displayName;
		  }
	
		  var functionName = innerType.displayName || innerType.name || '';
		  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
		} // Keep in sync with react-reconciler/getComponentNameFromFiber
	
	
		function getContextName(type) {
		  return type.displayName || 'Context';
		} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
	
	
		function getComponentNameFromType(type) {
		  if (type == null) {
		    // Host root, text node or just invalid type.
		    return null;
		  }
	
		  {
		    if (typeof type.tag === 'number') {
		      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
		    }
		  }
	
		  if (typeof type === 'function') {
		    return type.displayName || type.name || null;
		  }
	
		  if (typeof type === 'string') {
		    return type;
		  }
	
		  switch (type) {
		    case REACT_FRAGMENT_TYPE:
		      return 'Fragment';
	
		    case REACT_PORTAL_TYPE:
		      return 'Portal';
	
		    case REACT_PROFILER_TYPE:
		      return 'Profiler';
	
		    case REACT_STRICT_MODE_TYPE:
		      return 'StrictMode';
	
		    case REACT_SUSPENSE_TYPE:
		      return 'Suspense';
	
		    case REACT_SUSPENSE_LIST_TYPE:
		      return 'SuspenseList';
	
		  }
	
		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_CONTEXT_TYPE:
		        var context = type;
		        return getContextName(context) + '.Consumer';
	
		      case REACT_PROVIDER_TYPE:
		        var provider = type;
		        return getContextName(provider._context) + '.Provider';
	
		      case REACT_FORWARD_REF_TYPE:
		        return getWrappedName(type, type.render, 'ForwardRef');
	
		      case REACT_MEMO_TYPE:
		        var outerName = type.displayName || null;
	
		        if (outerName !== null) {
		          return outerName;
		        }
	
		        return getComponentNameFromType(type.type) || 'Memo';
	
		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;
	
		          try {
		            return getComponentNameFromType(init(payload));
		          } catch (x) {
		            return null;
		          }
		        }
	
		      // eslint-disable-next-line no-fallthrough
		    }
		  }
	
		  return null;
		}
	
		var assign = Object.assign;
	
		// Helpers to patch console.logs to avoid logging during side-effect free
		// replaying on render function. This currently only patches the object
		// lazily which won't cover if the log function was extracted eagerly.
		// We could also eagerly patch the method.
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;
	
		function disabledLog() {}
	
		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
		  {
		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      prevLog = console.log;
		      prevInfo = console.info;
		      prevWarn = console.warn;
		      prevError = console.error;
		      prevGroup = console.group;
		      prevGroupCollapsed = console.groupCollapsed;
		      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099
	
		      var props = {
		        configurable: true,
		        enumerable: true,
		        value: disabledLog,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.
	
		      Object.defineProperties(console, {
		        info: props,
		        log: props,
		        warn: props,
		        error: props,
		        group: props,
		        groupCollapsed: props,
		        groupEnd: props
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }
	
		    disabledDepth++;
		  }
		}
		function reenableLogs() {
		  {
		    disabledDepth--;
	
		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      var props = {
		        configurable: true,
		        enumerable: true,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.
	
		      Object.defineProperties(console, {
		        log: assign({}, props, {
		          value: prevLog
		        }),
		        info: assign({}, props, {
		          value: prevInfo
		        }),
		        warn: assign({}, props, {
		          value: prevWarn
		        }),
		        error: assign({}, props, {
		          value: prevError
		        }),
		        group: assign({}, props, {
		          value: prevGroup
		        }),
		        groupCollapsed: assign({}, props, {
		          value: prevGroupCollapsed
		        }),
		        groupEnd: assign({}, props, {
		          value: prevGroupEnd
		        })
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }
	
		    if (disabledDepth < 0) {
		      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
		    }
		  }
		}
	
		var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
		  {
		    if (prefix === undefined) {
		      // Extract the VM specific prefix used by each line.
		      try {
		        throw Error();
		      } catch (x) {
		        var match = x.stack.trim().match(/\n( *(at )?)/);
		        prefix = match && match[1] || '';
		      }
		    } // We use the prefix to ensure our stacks line up with native stack frames.
	
	
		    return '\n' + prefix + name;
		  }
		}
		var reentry = false;
		var componentFrameCache;
	
		{
		  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
		  componentFrameCache = new PossiblyWeakMap();
		}
	
		function describeNativeComponentFrame(fn, construct) {
		  // If something asked for a stack inside a fake render, it should get ignored.
		  if ( !fn || reentry) {
		    return '';
		  }
	
		  {
		    var frame = componentFrameCache.get(fn);
	
		    if (frame !== undefined) {
		      return frame;
		    }
		  }
	
		  var control;
		  reentry = true;
		  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.
	
		  Error.prepareStackTrace = undefined;
		  var previousDispatcher;
	
		  {
		    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
		    // for warnings.
	
		    ReactCurrentDispatcher.current = null;
		    disableLogs();
		  }
	
		  try {
		    // This should throw.
		    if (construct) {
		      // Something should be setting the props in the constructor.
		      var Fake = function () {
		        throw Error();
		      }; // $FlowFixMe
	
	
		      Object.defineProperty(Fake.prototype, 'props', {
		        set: function () {
		          // We use a throwing setter instead of frozen or non-writable props
		          // because that won't throw in a non-strict mode function.
		          throw Error();
		        }
		      });
	
		      if (typeof Reflect === 'object' && Reflect.construct) {
		        // We construct a different control for this case to include any extra
		        // frames added by the construct call.
		        try {
		          Reflect.construct(Fake, []);
		        } catch (x) {
		          control = x;
		        }
	
		        Reflect.construct(fn, [], Fake);
		      } else {
		        try {
		          Fake.call();
		        } catch (x) {
		          control = x;
		        }
	
		        fn.call(Fake.prototype);
		      }
		    } else {
		      try {
		        throw Error();
		      } catch (x) {
		        control = x;
		      }
	
		      fn();
		    }
		  } catch (sample) {
		    // This is inlined manually because closure doesn't do it for us.
		    if (sample && control && typeof sample.stack === 'string') {
		      // This extracts the first frame from the sample that isn't also in the control.
		      // Skipping one frame that we assume is the frame that calls the two.
		      var sampleLines = sample.stack.split('\n');
		      var controlLines = control.stack.split('\n');
		      var s = sampleLines.length - 1;
		      var c = controlLines.length - 1;
	
		      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
		        // We expect at least one stack frame to be shared.
		        // Typically this will be the root most one. However, stack frames may be
		        // cut off due to maximum stack limits. In this case, one maybe cut off
		        // earlier than the other. We assume that the sample is longer or the same
		        // and there for cut off earlier. So we should find the root most frame in
		        // the sample somewhere in the control.
		        c--;
		      }
	
		      for (; s >= 1 && c >= 0; s--, c--) {
		        // Next we find the first one that isn't the same which should be the
		        // frame that called our sample function and the control.
		        if (sampleLines[s] !== controlLines[c]) {
		          // In V8, the first line is describing the message but other VMs don't.
		          // If we're about to return the first line, and the control is also on the same
		          // line, that's a pretty good indicator that our sample threw at same line as
		          // the control. I.e. before we entered the sample frame. So we ignore this result.
		          // This can happen if you passed a class to function component, or non-function.
		          if (s !== 1 || c !== 1) {
		            do {
		              s--;
		              c--; // We may still have similar intermediate frames from the construct call.
		              // The next one that isn't the same should be our match though.
	
		              if (c < 0 || sampleLines[s] !== controlLines[c]) {
		                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
		                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
		                // but we have a user-provided "displayName"
		                // splice it in to make the stack more readable.
	
	
		                if (fn.displayName && _frame.includes('<anonymous>')) {
		                  _frame = _frame.replace('<anonymous>', fn.displayName);
		                }
	
		                {
		                  if (typeof fn === 'function') {
		                    componentFrameCache.set(fn, _frame);
		                  }
		                } // Return the line we found.
	
	
		                return _frame;
		              }
		            } while (s >= 1 && c >= 0);
		          }
	
		          break;
		        }
		      }
		    }
		  } finally {
		    reentry = false;
	
		    {
		      ReactCurrentDispatcher.current = previousDispatcher;
		      reenableLogs();
		    }
	
		    Error.prepareStackTrace = previousPrepareStackTrace;
		  } // Fallback to just using the name if we couldn't make it throw.
	
	
		  var name = fn ? fn.displayName || fn.name : '';
		  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
	
		  {
		    if (typeof fn === 'function') {
		      componentFrameCache.set(fn, syntheticFrame);
		    }
		  }
	
		  return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
		  {
		    return describeNativeComponentFrame(fn, false);
		  }
		}
	
		function shouldConstruct(Component) {
		  var prototype = Component.prototype;
		  return !!(prototype && prototype.isReactComponent);
		}
	
		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
	
		  if (type == null) {
		    return '';
		  }
	
		  if (typeof type === 'function') {
		    {
		      return describeNativeComponentFrame(type, shouldConstruct(type));
		    }
		  }
	
		  if (typeof type === 'string') {
		    return describeBuiltInComponentFrame(type);
		  }
	
		  switch (type) {
		    case REACT_SUSPENSE_TYPE:
		      return describeBuiltInComponentFrame('Suspense');
	
		    case REACT_SUSPENSE_LIST_TYPE:
		      return describeBuiltInComponentFrame('SuspenseList');
		  }
	
		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_FORWARD_REF_TYPE:
		        return describeFunctionComponentFrame(type.render);
	
		      case REACT_MEMO_TYPE:
		        // Memo may contain any component type so we recursively resolve it.
		        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
	
		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;
	
		          try {
		            // Lazy may contain any component type so we recursively resolve it.
		            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
		          } catch (x) {}
		        }
		    }
		  }
	
		  return '';
		}
	
		var hasOwnProperty = Object.prototype.hasOwnProperty;
	
		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	
		function setCurrentlyValidatingElement(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame.setExtraStackFrame(null);
		    }
		  }
		}
	
		function checkPropTypes(typeSpecs, values, location, componentName, element) {
		  {
		    // $FlowFixMe This is okay but Flow doesn't know it.
		    var has = Function.call.bind(hasOwnProperty);
	
		    for (var typeSpecName in typeSpecs) {
		      if (has(typeSpecs, typeSpecName)) {
		        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
		        // fail the render phase where it didn't fail before. So we log it.
		        // After these have been cleaned up, we'll let them throw.
	
		        try {
		          // This is intentionally an invariant that gets caught. It's the same
		          // behavior as without this statement except with a better message.
		          if (typeof typeSpecs[typeSpecName] !== 'function') {
		            // eslint-disable-next-line react-internal/prod-error-codes
		            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
		            err.name = 'Invariant Violation';
		            throw err;
		          }
	
		          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
		        } catch (ex) {
		          error$1 = ex;
		        }
	
		        if (error$1 && !(error$1 instanceof Error)) {
		          setCurrentlyValidatingElement(element);
	
		          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
	
		          setCurrentlyValidatingElement(null);
		        }
	
		        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
		          // Only monitor this failure once because there tends to be a lot of the
		          // same error.
		          loggedTypeFailures[error$1.message] = true;
		          setCurrentlyValidatingElement(element);
	
		          error('Failed %s type: %s', location, error$1.message);
	
		          setCurrentlyValidatingElement(null);
		        }
		      }
		    }
		  }
		}
	
		var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare
	
		function isArray(a) {
		  return isArrayImpl(a);
		}
	
		/*
		 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
		 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
		 *
		 * The functions in this module will throw an easier-to-understand,
		 * easier-to-debug exception with a clear errors message message explaining the
		 * problem. (Instead of a confusing exception thrown inside the implementation
		 * of the `value` object).
		 */
		// $FlowFixMe only called in DEV, so void return is not possible.
		function typeName(value) {
		  {
		    // toStringTag is needed for namespaced types like Temporal.Instant
		    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
		    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
		    return type;
		  }
		} // $FlowFixMe only called in DEV, so void return is not possible.
	
	
		function willCoercionThrow(value) {
		  {
		    try {
		      testStringCoercion(value);
		      return false;
		    } catch (e) {
		      return true;
		    }
		  }
		}
	
		function testStringCoercion(value) {
		  // If you ended up here by following an exception call stack, here's what's
		  // happened: you supplied an object or symbol value to React (as a prop, key,
		  // DOM attribute, CSS property, string ref, etc.) and when React tried to
		  // coerce it to a string using `'' + value`, an exception was thrown.
		  //
		  // The most common types that will cause this exception are `Symbol` instances
		  // and Temporal objects like `Temporal.Instant`. But any object that has a
		  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
		  // exception. (Library authors do this to prevent users from using built-in
		  // numeric operators like `+` or comparison operators like `>=` because custom
		  // methods are needed to perform accurate arithmetic or comparison.)
		  //
		  // To fix the problem, coerce this object or symbol value to a string before
		  // passing it to React. The most reliable way is usually `String(value)`.
		  //
		  // To find which value is throwing, check the browser or debugger console.
		  // Before this exception was thrown, there should be `console.error` output
		  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
		  // problem and how that type was used: key, atrribute, input value prop, etc.
		  // In most cases, this console output also shows the component and its
		  // ancestor components where the exception happened.
		  //
		  // eslint-disable-next-line react-internal/safe-string-coercion
		  return '' + value;
		}
		function checkKeyStringCoercion(value) {
		  {
		    if (willCoercionThrow(value)) {
		      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));
	
		      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
		    }
		  }
		}
	
		var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
		var RESERVED_PROPS = {
		  key: true,
		  ref: true,
		  __self: true,
		  __source: true
		};
		var specialPropKeyWarningShown;
		var specialPropRefWarningShown;
		var didWarnAboutStringRefs;
	
		{
		  didWarnAboutStringRefs = {};
		}
	
		function hasValidRef(config) {
		  {
		    if (hasOwnProperty.call(config, 'ref')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	
		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }
	
		  return config.ref !== undefined;
		}
	
		function hasValidKey(config) {
		  {
		    if (hasOwnProperty.call(config, 'key')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	
		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }
	
		  return config.key !== undefined;
		}
	
		function warnIfStringRefCannotBeAutoConverted(config, self) {
		  {
		    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
		      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
	
		      if (!didWarnAboutStringRefs[componentName]) {
		        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
	
		        didWarnAboutStringRefs[componentName] = true;
		      }
		    }
		  }
		}
	
		function defineKeyPropWarningGetter(props, displayName) {
		  {
		    var warnAboutAccessingKey = function () {
		      if (!specialPropKeyWarningShown) {
		        specialPropKeyWarningShown = true;
	
		        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    };
	
		    warnAboutAccessingKey.isReactWarning = true;
		    Object.defineProperty(props, 'key', {
		      get: warnAboutAccessingKey,
		      configurable: true
		    });
		  }
		}
	
		function defineRefPropWarningGetter(props, displayName) {
		  {
		    var warnAboutAccessingRef = function () {
		      if (!specialPropRefWarningShown) {
		        specialPropRefWarningShown = true;
	
		        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    };
	
		    warnAboutAccessingRef.isReactWarning = true;
		    Object.defineProperty(props, 'ref', {
		      get: warnAboutAccessingRef,
		      configurable: true
		    });
		  }
		}
		/**
		 * Factory method to create a new React element. This no longer adheres to
		 * the class pattern, so do not use new to call it. Also, instanceof check
		 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		 * if something is a React Element.
		 *
		 * @param {*} type
		 * @param {*} props
		 * @param {*} key
		 * @param {string|object} ref
		 * @param {*} owner
		 * @param {*} self A *temporary* helper to detect places where `this` is
		 * different from the `owner` when React.createElement is called, so that we
		 * can warn. We want to get rid of owner and replace string `ref`s with arrow
		 * functions, and as long as `this` and owner are the same, there will be no
		 * change in behavior.
		 * @param {*} source An annotation object (added by a transpiler or otherwise)
		 * indicating filename, line number, and/or other information.
		 * @internal
		 */
	
	
		var ReactElement = function (type, key, ref, self, source, owner, props) {
		  var element = {
		    // This tag allows us to uniquely identify this as a React Element
		    $$typeof: REACT_ELEMENT_TYPE,
		    // Built-in properties that belong on the element
		    type: type,
		    key: key,
		    ref: ref,
		    props: props,
		    // Record the component responsible for creating this element.
		    _owner: owner
		  };
	
		  {
		    // The validation flag is currently mutative. We put it on
		    // an external backing store so that we can freeze the whole object.
		    // This can be replaced with a WeakMap once they are implemented in
		    // commonly used development environments.
		    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
		    // the validation flag non-enumerable (where possible, which should
		    // include every environment we run tests in), so the test framework
		    // ignores it.
	
		    Object.defineProperty(element._store, 'validated', {
		      configurable: false,
		      enumerable: false,
		      writable: true,
		      value: false
		    }); // self and source are DEV only properties.
	
		    Object.defineProperty(element, '_self', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: self
		    }); // Two elements created in two different places should be considered
		    // equal for testing purposes and therefore we hide it from enumeration.
	
		    Object.defineProperty(element, '_source', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: source
		    });
	
		    if (Object.freeze) {
		      Object.freeze(element.props);
		      Object.freeze(element);
		    }
		  }
	
		  return element;
		};
		/**
		 * https://github.com/reactjs/rfcs/pull/107
		 * @param {*} type
		 * @param {object} props
		 * @param {string} key
		 */
	
		function jsxDEV(type, config, maybeKey, source, self) {
		  {
		    var propName; // Reserved names are extracted
	
		    var props = {};
		    var key = null;
		    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
		    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
		    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
		    // but as an intermediary step, we will use jsxDEV for everything except
		    // <div {...props} key="Hi" />, because we aren't currently able to tell if
		    // key is explicitly declared to be undefined or not.
	
		    if (maybeKey !== undefined) {
		      {
		        checkKeyStringCoercion(maybeKey);
		      }
	
		      key = '' + maybeKey;
		    }
	
		    if (hasValidKey(config)) {
		      {
		        checkKeyStringCoercion(config.key);
		      }
	
		      key = '' + config.key;
		    }
	
		    if (hasValidRef(config)) {
		      ref = config.ref;
		      warnIfStringRefCannotBeAutoConverted(config, self);
		    } // Remaining properties are added to a new props object
	
	
		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        props[propName] = config[propName];
		      }
		    } // Resolve default props
	
	
		    if (type && type.defaultProps) {
		      var defaultProps = type.defaultProps;
	
		      for (propName in defaultProps) {
		        if (props[propName] === undefined) {
		          props[propName] = defaultProps[propName];
		        }
		      }
		    }
	
		    if (key || ref) {
		      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	
		      if (key) {
		        defineKeyPropWarningGetter(props, displayName);
		      }
	
		      if (ref) {
		        defineRefPropWarningGetter(props, displayName);
		      }
		    }
	
		    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		  }
		}
	
		var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
	
		function setCurrentlyValidatingElement$1(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		    }
		  }
		}
	
		var propTypesMisspellWarningShown;
	
		{
		  propTypesMisspellWarningShown = false;
		}
		/**
		 * Verifies the object is a ReactElement.
		 * See https://reactjs.org/docs/react-api.html#isvalidelement
		 * @param {?object} object
		 * @return {boolean} True if `object` is a ReactElement.
		 * @final
		 */
	
	
		function isValidElement(object) {
		  {
		    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		  }
		}
	
		function getDeclarationErrorAddendum() {
		  {
		    if (ReactCurrentOwner$1.current) {
		      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
	
		      if (name) {
		        return '\n\nCheck the render method of `' + name + '`.';
		      }
		    }
	
		    return '';
		  }
		}
	
		function getSourceInfoErrorAddendum(source) {
		  {
		    if (source !== undefined) {
		      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
		      var lineNumber = source.lineNumber;
		      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
		    }
	
		    return '';
		  }
		}
		/**
		 * Warn if there's no key explicitly set on dynamic arrays of children or
		 * object keys are not valid. This allows us to keep track of children between
		 * updates.
		 */
	
	
		var ownerHasKeyUseWarning = {};
	
		function getCurrentComponentErrorInfo(parentType) {
		  {
		    var info = getDeclarationErrorAddendum();
	
		    if (!info) {
		      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	
		      if (parentName) {
		        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
		      }
		    }
	
		    return info;
		  }
		}
		/**
		 * Warn if the element doesn't have an explicit key assigned to it.
		 * This element is in an array. The array could grow and shrink or be
		 * reordered. All children that haven't already been validated are required to
		 * have a "key" property assigned to it. Error statuses are cached so a warning
		 * will only be shown once.
		 *
		 * @internal
		 * @param {ReactElement} element Element that requires a key.
		 * @param {*} parentType element's parent's type.
		 */
	
	
		function validateExplicitKey(element, parentType) {
		  {
		    if (!element._store || element._store.validated || element.key != null) {
		      return;
		    }
	
		    element._store.validated = true;
		    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	
		    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
		      return;
		    }
	
		    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
		    // property, it may be the creator of the child that's responsible for
		    // assigning it a key.
	
		    var childOwner = '';
	
		    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
		      // Give the component that originally created this child.
		      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
		    }
	
		    setCurrentlyValidatingElement$1(element);
	
		    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
	
		    setCurrentlyValidatingElement$1(null);
		  }
		}
		/**
		 * Ensure that every element either is passed in a static location, in an
		 * array with an explicit keys property defined, or in an object literal
		 * with valid key property.
		 *
		 * @internal
		 * @param {ReactNode} node Statically passed child of any type.
		 * @param {*} parentType node's parent's type.
		 */
	
	
		function validateChildKeys(node, parentType) {
		  {
		    if (typeof node !== 'object') {
		      return;
		    }
	
		    if (isArray(node)) {
		      for (var i = 0; i < node.length; i++) {
		        var child = node[i];
	
		        if (isValidElement(child)) {
		          validateExplicitKey(child, parentType);
		        }
		      }
		    } else if (isValidElement(node)) {
		      // This element was passed in a valid location.
		      if (node._store) {
		        node._store.validated = true;
		      }
		    } else if (node) {
		      var iteratorFn = getIteratorFn(node);
	
		      if (typeof iteratorFn === 'function') {
		        // Entry iterators used to provide implicit keys,
		        // but now we print a separate warning for them later.
		        if (iteratorFn !== node.entries) {
		          var iterator = iteratorFn.call(node);
		          var step;
	
		          while (!(step = iterator.next()).done) {
		            if (isValidElement(step.value)) {
		              validateExplicitKey(step.value, parentType);
		            }
		          }
		        }
		      }
		    }
		  }
		}
		/**
		 * Given an element, validate that its props follow the propTypes definition,
		 * provided by the type.
		 *
		 * @param {ReactElement} element
		 */
	
	
		function validatePropTypes(element) {
		  {
		    var type = element.type;
	
		    if (type === null || type === undefined || typeof type === 'string') {
		      return;
		    }
	
		    var propTypes;
	
		    if (typeof type === 'function') {
		      propTypes = type.propTypes;
		    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
		    // Inner props are checked in the reconciler.
		    type.$$typeof === REACT_MEMO_TYPE)) {
		      propTypes = type.propTypes;
		    } else {
		      return;
		    }
	
		    if (propTypes) {
		      // Intentionally inside to avoid triggering lazy initializers:
		      var name = getComponentNameFromType(type);
		      checkPropTypes(propTypes, element.props, 'prop', name, element);
		    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
		      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:
	
		      var _name = getComponentNameFromType(type);
	
		      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
		    }
	
		    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
		      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
		    }
		  }
		}
		/**
		 * Given a fragment, validate that it can only be provided with fragment props
		 * @param {ReactElement} fragment
		 */
	
	
		function validateFragmentProps(fragment) {
		  {
		    var keys = Object.keys(fragment.props);
	
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
	
		      if (key !== 'children' && key !== 'key') {
		        setCurrentlyValidatingElement$1(fragment);
	
		        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
	
		        setCurrentlyValidatingElement$1(null);
		        break;
		      }
		    }
	
		    if (fragment.ref !== null) {
		      setCurrentlyValidatingElement$1(fragment);
	
		      error('Invalid attribute `ref` supplied to `React.Fragment`.');
	
		      setCurrentlyValidatingElement$1(null);
		    }
		  }
		}
	
		function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
		  {
		    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
		    // succeed and there will likely be errors in render.
	
		    if (!validType) {
		      var info = '';
	
		      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
		        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
		      }
	
		      var sourceInfo = getSourceInfoErrorAddendum(source);
	
		      if (sourceInfo) {
		        info += sourceInfo;
		      } else {
		        info += getDeclarationErrorAddendum();
		      }
	
		      var typeString;
	
		      if (type === null) {
		        typeString = 'null';
		      } else if (isArray(type)) {
		        typeString = 'array';
		      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
		        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
		        info = ' Did you accidentally export a JSX literal instead of a component?';
		      } else {
		        typeString = typeof type;
		      }
	
		      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
		    }
	
		    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
		    // TODO: Drop this when these are no longer allowed as the type argument.
	
		    if (element == null) {
		      return element;
		    } // Skip key warning if the type isn't valid since our key validation logic
		    // doesn't expect a non-string/function type and can throw confusing errors.
		    // We don't want exception behavior to differ between dev and prod.
		    // (Rendering will throw with a helpful message and as soon as the type is
		    // fixed, the key warnings will appear.)
	
	
		    if (validType) {
		      var children = props.children;
	
		      if (children !== undefined) {
		        if (isStaticChildren) {
		          if (isArray(children)) {
		            for (var i = 0; i < children.length; i++) {
		              validateChildKeys(children[i], type);
		            }
	
		            if (Object.freeze) {
		              Object.freeze(children);
		            }
		          } else {
		            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
		          }
		        } else {
		          validateChildKeys(children, type);
		        }
		      }
		    }
	
		    if (type === REACT_FRAGMENT_TYPE) {
		      validateFragmentProps(element);
		    } else {
		      validatePropTypes(element);
		    }
	
		    return element;
		  }
		} // These two functions exist to still get child warnings in dev
		// even with the prod transform. This means that jsxDEV is purely
		// opt-in behavior for better messages but that we won't stop
		// giving you warnings if you use production apis.
	
		function jsxWithValidationStatic(type, props, key) {
		  {
		    return jsxWithValidation(type, props, key, true);
		  }
		}
		function jsxWithValidationDynamic(type, props, key) {
		  {
		    return jsxWithValidation(type, props, key, false);
		  }
		}
	
		var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
		// for now we can ship identical prod functions
	
		var jsxs =  jsxWithValidationStatic ;
	
		reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
		reactJsxRuntime_development.jsx = jsx;
		reactJsxRuntime_development.jsxs = jsxs;
		  })();
		}
		return reactJsxRuntime_development;
	}
	
	(function (module) {
	
		if (true) {
		  module.exports = requireReactJsxRuntime_production_min();
		} else {
		  module.exports = requireReactJsxRuntime_development();
		}
	} (jsxRuntime));
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var NODE_ENV = ("production");
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	var invariant_1 = invariant;
	
	const MapContext = require$$0.createContext(null);
	function useGoogleMap() {
	    invariant_1(!!require$$0.useContext, 'useGoogleMap is React hook and requires React version 16.8+');
	    const map = require$$0.useContext(MapContext);
	    invariant_1(!!map, 'useGoogleMap needs a GoogleMap available up in the tree');
	    return map;
	}
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function reduce(obj, fn, acc) {
	    return Object.keys(obj).reduce(function reducer(newAcc, key) {
	        return fn(newAcc, obj[key], key);
	    }, acc);
	}
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function forEach(obj, fn) {
	    Object.keys(obj).forEach((key) => {
	        return fn(obj[key], key);
	    });
	}
	
	/* global google */
	function applyUpdaterToNextProps(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updaterMap, 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	prevProps, 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	nextProps, 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	instance
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	) {
	    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	    const map = {};
	    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	    const iter = (fn, key) => {
	        const nextValue = nextProps[key];
	        if (nextValue !== prevProps[key]) {
	            map[key] = nextValue;
	            fn(instance, nextValue);
	        }
	    };
	    forEach(updaterMap, iter);
	    return map;
	}
	function registerEvents(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props, 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	instance, eventMap) {
	    const registeredList = reduce(eventMap, function reducer(acc, googleEventName, 
	    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	    onEventName) {
	        if (typeof props[onEventName] === 'function') {
	            acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
	        }
	        return acc;
	    }, []);
	    return registeredList;
	}
	function unregisterEvent(registered) {
	    google.maps.event.removeListener(registered);
	}
	function unregisterEvents(events = []) {
	    events.forEach(unregisterEvent);
	}
	function applyUpdatersToPropsAndRegisterEvents({ updaterMap, eventMap, prevProps, nextProps, instance, }) {
	    const registeredEvents = registerEvents(nextProps, instance, eventMap);
	    applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance);
	    return registeredEvents;
	}
	
	const eventMap$i = {
	    onDblClick: 'dblclick',
	    onDragEnd: 'dragend',
	    onDragStart: 'dragstart',
	    onMapTypeIdChanged: 'maptypeid_changed',
	    onMouseMove: 'mousemove',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseDown: 'mousedown',
	    onMouseUp: 'mouseup',
	    onRightClick: 'rightclick',
	    onTilesLoaded: 'tilesloaded',
	    onBoundsChanged: 'bounds_changed',
	    onCenterChanged: 'center_changed',
	    onClick: 'click',
	    onDrag: 'drag',
	    onHeadingChanged: 'heading_changed',
	    onIdle: 'idle',
	    onProjectionChanged: 'projection_changed',
	    onResize: 'resize',
	    onTiltChanged: 'tilt_changed',
	    onZoomChanged: 'zoom_changed',
	};
	const updaterMap$i = {
	    extraMapTypes(map, extra) {
	        extra.forEach(function forEachExtra(it, i) {
	            map.mapTypes.set(String(i), it);
	        });
	    },
	    center(map, center) {
	        map.setCenter(center);
	    },
	    clickableIcons(map, clickable) {
	        map.setClickableIcons(clickable);
	    },
	    heading(map, heading) {
	        map.setHeading(heading);
	    },
	    mapTypeId(map, mapTypeId) {
	        map.setMapTypeId(mapTypeId);
	    },
	    options(map, options) {
	        map.setOptions(options);
	    },
	    streetView(map, streetView) {
	        map.setStreetView(streetView);
	    },
	    tilt(map, tilt) {
	        map.setTilt(tilt);
	    },
	    zoom(map, zoom) {
	        map.setZoom(zoom);
	    },
	};
	// TODO: unfinished!
	function GoogleMapFunctional({ children, options, id, mapContainerStyle, mapContainerClassName, center, 
	// clickableIcons,
	// extraMapTypes,
	// heading,
	// mapTypeId,
	onClick, onDblClick, onDrag, onDragEnd, onDragStart, onMouseMove, onMouseOut, onMouseOver, onMouseDown, onMouseUp, onRightClick, 
	// onMapTypeIdChanged,
	// onTilesLoaded,
	// onBoundsChanged,
	onCenterChanged, 
	// onHeadingChanged,
	// onIdle,
	// onProjectionChanged,
	// onResize,
	// onTiltChanged,
	// onZoomChanged,
	onLoad, onUnmount, }) {
	    const [map, setMap] = require$$0.useState(null);
	    const ref = require$$0.useRef(null);
	    // const [extraMapTypesListener, setExtraMapTypesListener] = useState<google.maps.MapsEventListener | null>(null)
	    const [centerChangedListener, setCenterChangedListener] = require$$0.useState(null);
	    const [dblclickListener, setDblclickListener] = require$$0.useState(null);
	    const [dragendListener, setDragendListener] = require$$0.useState(null);
	    const [dragstartListener, setDragstartListener] = require$$0.useState(null);
	    const [mousedownListener, setMousedownListener] = require$$0.useState(null);
	    const [mousemoveListener, setMousemoveListener] = require$$0.useState(null);
	    const [mouseoutListener, setMouseoutListener] = require$$0.useState(null);
	    const [mouseoverListener, setMouseoverListener] = require$$0.useState(null);
	    const [mouseupListener, setMouseupListener] = require$$0.useState(null);
	    const [rightclickListener, setRightclickListener] = require$$0.useState(null);
	    const [clickListener, setClickListener] = require$$0.useState(null);
	    const [dragListener, setDragListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (options && map !== null) {
	            map.setOptions(options);
	        }
	    }, [map, options]);
	    require$$0.useEffect(() => {
	        if (map !== null && typeof center !== 'undefined') {
	            map.setCenter(center);
	        }
	    }, [map, center]);
	    require$$0.useEffect(() => {
	        if (map && onDblClick) {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            setDblclickListener(google.maps.event.addListener(map, 'dblclick', onDblClick));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (map && onDragEnd) {
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            setDragendListener(google.maps.event.addListener(map, 'dragend', onDragEnd));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (map && onDragStart) {
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            setDragstartListener(google.maps.event.addListener(map, 'dragstart', onDragStart));
	        }
	    }, [onDragStart]);
	    require$$0.useEffect(() => {
	        if (map && onMouseDown) {
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            setMousedownListener(google.maps.event.addListener(map, 'mousedown', onMouseDown));
	        }
	    }, [onMouseDown]);
	    require$$0.useEffect(() => {
	        if (map && onMouseMove) {
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            setMousemoveListener(google.maps.event.addListener(map, 'mousemove', onMouseMove));
	        }
	    }, [onMouseMove]);
	    require$$0.useEffect(() => {
	        if (map && onMouseOut) {
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            setMouseoutListener(google.maps.event.addListener(map, 'mouseout', onMouseOut));
	        }
	    }, [onMouseOut]);
	    require$$0.useEffect(() => {
	        if (map && onMouseOver) {
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            setMouseoverListener(google.maps.event.addListener(map, 'mouseover', onMouseOver));
	        }
	    }, [onMouseOver]);
	    require$$0.useEffect(() => {
	        if (map && onMouseUp) {
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            setMouseupListener(google.maps.event.addListener(map, 'mouseup', onMouseUp));
	        }
	    }, [onMouseUp]);
	    require$$0.useEffect(() => {
	        if (map && onRightClick) {
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            setRightclickListener(google.maps.event.addListener(map, 'rightclick', onRightClick));
	        }
	    }, [onRightClick]);
	    require$$0.useEffect(() => {
	        if (map && onClick) {
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            setClickListener(google.maps.event.addListener(map, 'click', onClick));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (map && onDrag) {
	            if (dragListener !== null) {
	                google.maps.event.removeListener(dragListener);
	            }
	            setDragListener(google.maps.event.addListener(map, 'drag', onDrag));
	        }
	    }, [onDrag]);
	    require$$0.useEffect(() => {
	        if (map && onCenterChanged) {
	            if (centerChangedListener !== null) {
	                google.maps.event.removeListener(centerChangedListener);
	            }
	            setCenterChangedListener(google.maps.event.addListener(map, 'center_changed', onCenterChanged));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        const map = ref.current === null
	            ? null
	            : new google.maps.Map(ref.current, options);
	        setMap(map);
	        if (map !== null && onLoad) {
	            onLoad(map);
	        }
	        return () => {
	            if (map !== null) {
	                if (onUnmount) {
	                    onUnmount(map);
	                }
	            }
	        };
	    }, []);
	    return (jsxRuntime.exports.jsx("div", Object.assign({ id: id, ref: ref, style: mapContainerStyle, className: mapContainerClassName }, { children: jsxRuntime.exports.jsx(MapContext.Provider, Object.assign({ value: map }, { children: map !== null ? children : jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {}) })) })));
	}
	require$$0.memo(GoogleMapFunctional);
	class GoogleMap extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            map: null,
	        };
	        this.registeredEvents = [];
	        this.mapRef = null;
	        this.getInstance = () => {
	            if (this.mapRef === null) {
	                return null;
	            }
	            return new google.maps.Map(this.mapRef, this.props.options);
	        };
	        this.panTo = (latLng) => {
	            const map = this.getInstance();
	            if (map) {
	                map.panTo(latLng);
	            }
	        };
	        this.setMapCallback = () => {
	            if (this.state.map !== null) {
	                if (this.props.onLoad) {
	                    this.props.onLoad(this.state.map);
	                }
	            }
	        };
	        this.getRef = (ref) => {
	            this.mapRef = ref;
	        };
	    }
	    componentDidMount() {
	        const map = this.getInstance();
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$i,
	            eventMap: eventMap$i,
	            prevProps: {},
	            nextProps: this.props,
	            instance: map,
	        });
	        this.setState(function setMap() {
	            return {
	                map,
	            };
	        }, this.setMapCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.map !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$i,
	                eventMap: eventMap$i,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.map,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.map !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.map);
	            }
	            unregisterEvents(this.registeredEvents);
	        }
	    }
	    render() {
	        return (jsxRuntime.exports.jsx("div", Object.assign({ id: this.props.id, ref: this.getRef, style: this.props.mapContainerStyle, className: this.props.mapContainerClassName }, { children: jsxRuntime.exports.jsx(MapContext.Provider, Object.assign({ value: this.state.map }, { children: this.state.map !== null ? this.props.children : jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {}) })) })));
	    }
	}
	
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	
	function __rest$1(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}
	
	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}
	
	const isBrowser = typeof document !== 'undefined';
	
	function injectScript({ url, id, nonce }) {
	    if (!isBrowser) {
	        return Promise.reject(new Error('document is undefined'));
	    }
	    return new Promise(function injectScriptCallback(resolve, reject) {
	        const existingScript = document.getElementById(id);
	        const windowWithGoogleMap = window;
	        if (existingScript) {
	            // Same script id/url: keep same script
	            const dataStateAttribute = existingScript.getAttribute('data-state');
	            if (existingScript.src === url && dataStateAttribute !== 'error') {
	                if (dataStateAttribute === 'ready') {
	                    return resolve(id);
	                }
	                else {
	                    const originalInitMap = windowWithGoogleMap.initMap;
	                    const originalErrorCallback = existingScript.onerror;
	                    windowWithGoogleMap.initMap = function initMap() {
	                        if (originalInitMap) {
	                            originalInitMap();
	                        }
	                        resolve(id);
	                    };
	                    existingScript.onerror = function (err) {
	                        if (originalErrorCallback) {
	                            originalErrorCallback(err);
	                        }
	                        reject(err);
	                    };
	                    return;
	                }
	            }
	            // Same script id, but either
	            // 1. requested URL is different
	            // 2. script failed to load
	            else {
	                existingScript.remove();
	            }
	        }
	        const script = document.createElement('script');
	        script.type = 'text/javascript';
	        script.src = url;
	        script.id = id;
	        script.async = true;
	        script.nonce = nonce;
	        script.onerror = function onerror(err) {
	            script.setAttribute('data-state', 'error');
	            reject(err);
	        };
	        windowWithGoogleMap.initMap = function onload() {
	            script.setAttribute('data-state', 'ready');
	            resolve(id);
	        };
	        document.head.appendChild(script);
	    }).catch(err => {
	        console.error('injectScript error: ', err);
	        throw err;
	    });
	}
	
	function isGoogleFontStyle(element) {
	    // 'Roboto' or 'Google Sans Text' font download
	    const href = element.href;
	    if (href && (href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0 ||
	        href.indexOf('https://fonts.googleapis.com/css?family=Google+Sans+Text') === 0)) {
	        return true;
	    }
	    // font style elements
	    if (element.tagName.toLowerCase() === 'style' &&
	        // @ts-ignore
	        element.styleSheet &&
	        // @ts-ignore
	        element.styleSheet.cssText &&
	        // @ts-ignore
	        element.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0) {
	        // @ts-ignore
	        element.styleSheet.cssText = '';
	        return true;
	    }
	    // font style elements for other browsers
	    if (element.tagName.toLowerCase() === 'style' &&
	        element.innerHTML &&
	        element.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0) {
	        element.innerHTML = '';
	        return true;
	    }
	    // when google tries to add empty style
	    if (element.tagName.toLowerCase() === 'style' &&
	        // @ts-ignore
	        !element.styleSheet &&
	        !element.innerHTML) {
	        return true;
	    }
	    return false;
	}
	// Preventing the Google Maps library from downloading an extra font
	function preventGoogleFonts() {
	    // we override these methods only for one particular head element
	    // default methods for other elements are not affected
	    const head = document.getElementsByTagName('head')[0];
	    const trueInsertBefore = head.insertBefore.bind(head);
	    // TODO: adding return before reflect solves the TS issue
	    // @ts-ignore
	    head.insertBefore = function insertBefore(newElement, referenceElement) {
	        if (!isGoogleFontStyle(newElement)) {
	            Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
	        }
	    };
	    const trueAppend = head.appendChild.bind(head);
	    // TODO: adding return before reflect solves the TS issue
	    // @ts-ignore
	    head.appendChild = function appendChild(textNode) {
	        if (!isGoogleFontStyle(textNode)) {
	            Reflect.apply(trueAppend, head, [textNode]);
	        }
	    };
	}
	
	function makeLoadScriptUrl({ googleMapsApiKey, googleMapsClientId, version = 'weekly', language, region, libraries, channel, mapIds, authReferrerPolicy }) {
	    const params = [];
	    invariant_1((googleMapsApiKey && googleMapsClientId) || !(googleMapsApiKey && googleMapsClientId), 'You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.');
	    if (googleMapsApiKey) {
	        params.push(`key=${googleMapsApiKey}`);
	    }
	    else if (googleMapsClientId) {
	        params.push(`client=${googleMapsClientId}`);
	    }
	    if (version) {
	        params.push(`v=${version}`);
	    }
	    if (language) {
	        params.push(`language=${language}`);
	    }
	    if (region) {
	        params.push(`region=${region}`);
	    }
	    if (libraries && libraries.length) {
	        params.push(`libraries=${libraries.sort().join(',')}`);
	    }
	    if (channel) {
	        params.push(`channel=${channel}`);
	    }
	    if (mapIds && mapIds.length) {
	        params.push(`map_ids=${mapIds.join(',')}`);
	    }
	    if (authReferrerPolicy) {
	        params.push(`auth_referrer_policy=${authReferrerPolicy}`);
	    }
	    params.push('callback=initMap');
	    return `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;
	}
	
	let cleaningUp = false;
	function DefaultLoadingElement() {
	    return jsxRuntime.exports.jsx("div", { children: `Loading...` });
	}
	const defaultLoadScriptProps = {
	    id: 'script-loader',
	    version: 'weekly',
	};
	class LoadScript extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.check = require$$0.createRef();
	        this.state = {
	            loaded: false,
	        };
	        this.cleanupCallback = () => {
	            // @ts-ignore
	            delete window.google.maps;
	            this.injectScript();
	        };
	        this.isCleaningUp = () => __awaiter(this, void 0, void 0, function* () {
	            function promiseCallback(resolve) {
	                if (!cleaningUp) {
	                    resolve();
	                }
	                else {
	                    if (isBrowser) {
	                        const timer = window.setInterval(function interval() {
	                            if (!cleaningUp) {
	                                window.clearInterval(timer);
	                                resolve();
	                            }
	                        }, 1);
	                    }
	                }
	                return;
	            }
	            return new Promise(promiseCallback);
	        });
	        this.cleanup = () => {
	            cleaningUp = true;
	            const script = document.getElementById(this.props.id);
	            if (script && script.parentNode) {
	                script.parentNode.removeChild(script);
	            }
	            Array.prototype.slice
	                .call(document.getElementsByTagName('script'))
	                .filter(function filter(script) {
	                return typeof script.src === 'string' && script.src.includes('maps.googleapis');
	            })
	                .forEach(function forEach(script) {
	                if (script.parentNode) {
	                    script.parentNode.removeChild(script);
	                }
	            });
	            Array.prototype.slice
	                .call(document.getElementsByTagName('link'))
	                .filter(function filter(link) {
	                return (link.href === 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans');
	            })
	                .forEach(function forEach(link) {
	                if (link.parentNode) {
	                    link.parentNode.removeChild(link);
	                }
	            });
	            Array.prototype.slice
	                .call(document.getElementsByTagName('style'))
	                .filter(function filter(style) {
	                return (style.innerText !== undefined &&
	                    style.innerText.length > 0 &&
	                    style.innerText.includes('.gm-'));
	            })
	                .forEach(function forEach(style) {
	                if (style.parentNode) {
	                    style.parentNode.removeChild(style);
	                }
	            });
	        };
	        this.injectScript = () => {
	            if (this.props.preventGoogleFontsLoading) {
	                preventGoogleFonts();
	            }
	            invariant_1(!!this.props.id, 'LoadScript requires "id" prop to be a string: %s', this.props.id);
	            const injectScriptOptions = {
	                id: this.props.id,
	                nonce: this.props.nonce,
	                url: makeLoadScriptUrl(this.props),
	            };
	            injectScript(injectScriptOptions)
	                .then(() => {
	                if (this.props.onLoad) {
	                    this.props.onLoad();
	                }
	                this.setState(function setLoaded() {
	                    return {
	                        loaded: true,
	                    };
	                });
	                return;
	            })
	                .catch(err => {
	                if (this.props.onError) {
	                    this.props.onError(err);
	                }
	                console.error(`
	          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${this
	                    .props.googleMapsApiKey || '-'}) or Client ID (${this.props.googleMapsClientId ||
	                    '-'}) to <LoadScript />
	          Otherwise it is a Network issue.
	        `);
	            });
	        };
	    }
	    componentDidMount() {
	        if (isBrowser) {
	            if (window.google && window.google.maps && !cleaningUp) {
	                console.error('google api is already presented');
	                return;
	            }
	            this.isCleaningUp()
	                .then(this.injectScript)
	                .catch(function error(err) {
	                console.error('Error at injecting script after cleaning up: ', err);
	            });
	        }
	    }
	    componentDidUpdate(prevProps) {
	        if (this.props.libraries !== prevProps.libraries) {
	            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
	        }
	        if (isBrowser && prevProps.language !== this.props.language) {
	            this.cleanup();
	            // TODO: refactor to use gDSFP maybe... wait for hooks refactoring.
	            // eslint-disable-next-line react/no-did-update-set-state
	            this.setState(function setLoaded() {
	                return {
	                    loaded: false,
	                };
	            }, this.cleanupCallback);
	        }
	    }
	    componentWillUnmount() {
	        if (isBrowser) {
	            this.cleanup();
	            const timeoutCallback = () => {
	                if (!this.check.current) {
	                    // @ts-ignore
	                    delete window.google;
	                    cleaningUp = false;
	                }
	            };
	            window.setTimeout(timeoutCallback, 1);
	            if (this.props.onUnmount) {
	                this.props.onUnmount();
	            }
	        }
	    }
	    render() {
	        return (jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, { children: [jsxRuntime.exports.jsx("div", { ref: this.check }), this.state.loaded
	                    ? this.props.children
	                    : this.props.loadingElement || jsxRuntime.exports.jsx(DefaultLoadingElement, {})] }));
	    }
	}
	LoadScript.defaultProps = defaultLoadScriptProps;
	
	/* eslint-disable filenames/match-regex */
	let previouslyLoadedUrl;
	function useLoadScript({ id = defaultLoadScriptProps.id, version = defaultLoadScriptProps.version, nonce, googleMapsApiKey, googleMapsClientId, language, region, libraries, preventGoogleFontsLoading, channel, mapIds, authReferrerPolicy, }) {
	    const isMounted = require$$0.useRef(false);
	    const [isLoaded, setLoaded] = require$$0.useState(false);
	    const [loadError, setLoadError] = require$$0.useState(undefined);
	    require$$0.useEffect(function trackMountedState() {
	        isMounted.current = true;
	        return () => {
	            isMounted.current = false;
	        };
	    }, []);
	    require$$0.useEffect(function applyPreventGoogleFonts() {
	        if (isBrowser && preventGoogleFontsLoading) {
	            preventGoogleFonts();
	        }
	    }, [preventGoogleFontsLoading]);
	    require$$0.useEffect(function validateLoadedState() {
	        if (isLoaded) {
	            invariant_1(!!window.google, 'useLoadScript was marked as loaded, but window.google is not present. Something went wrong.');
	        }
	    }, [isLoaded]);
	    const url = makeLoadScriptUrl({
	        version,
	        googleMapsApiKey,
	        googleMapsClientId,
	        language,
	        region,
	        libraries,
	        channel,
	        mapIds,
	        authReferrerPolicy
	    });
	    require$$0.useEffect(function loadScriptAndModifyLoadedState() {
	        if (!isBrowser) {
	            return;
	        }
	        function setLoadedIfMounted() {
	            if (isMounted.current) {
	                setLoaded(true);
	                previouslyLoadedUrl = url;
	            }
	        }
	        if (window.google && window.google.maps && previouslyLoadedUrl === url) {
	            setLoadedIfMounted();
	            return;
	        }
	        injectScript({ id, url, nonce })
	            .then(setLoadedIfMounted)
	            .catch(function handleInjectError(err) {
	            if (isMounted.current) {
	                setLoadError(err);
	            }
	            console.warn(`
	        There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${googleMapsApiKey ||
	                '-'}) or Client ID (${googleMapsClientId || '-'})
	        Otherwise it is a Network issue.
	      `);
	            console.error(err);
	        });
	    }, [id, url, nonce]);
	    const prevLibraries = require$$0.useRef();
	    require$$0.useEffect(function checkPerformance() {
	        if (prevLibraries.current && libraries !== prevLibraries.current) {
	            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
	        }
	        prevLibraries.current = libraries;
	    }, [libraries]);
	    return { isLoaded, loadError, url };
	}
	
	const defaultLoadingElement = jsxRuntime.exports.jsx(DefaultLoadingElement, {});
	function LoadScriptNext(_a) {
	    var { loadingElement, onLoad, onError, onUnmount, children } = _a, hookOptions = __rest$1(_a, ["loadingElement", "onLoad", "onError", "onUnmount", "children"]);
	    const { isLoaded, loadError } = useLoadScript(hookOptions);
	    require$$0.useEffect(function handleOnLoad() {
	        if (isLoaded && typeof onLoad === 'function') {
	            onLoad();
	        }
	    }, [isLoaded, onLoad]);
	    require$$0.useEffect(function handleOnError() {
	        if (loadError && typeof onError === 'function') {
	            onError(loadError);
	        }
	    }, [loadError, onError]);
	    require$$0.useEffect(function handleOnUnmount() {
	        return () => {
	            if (onUnmount) {
	                onUnmount();
	            }
	        };
	    }, [onUnmount]);
	    return isLoaded ? children : loadingElement || defaultLoadingElement;
	}
	var LoadScriptNext$1 = require$$0.memo(LoadScriptNext);
	
	// do not edit .js files directly - edit src/index.jst
	
	
	
	var fastDeepEqual$1 = function equal(a, b) {
	  if (a === b) return true;
	
	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    if (a.constructor !== b.constructor) return false;
	
	    var length, i, keys;
	    if (Array.isArray(a)) {
	      length = a.length;
	      if (length != b.length) return false;
	      for (i = length; i-- !== 0;)
	        if (!equal(a[i], b[i])) return false;
	      return true;
	    }
	
	
	
	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
	
	    keys = Object.keys(a);
	    length = keys.length;
	    if (length !== Object.keys(b).length) return false;
	
	    for (i = length; i-- !== 0;)
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	
	    for (i = length; i-- !== 0;) {
	      var key = keys[i];
	
	      if (!equal(a[key], b[key])) return false;
	    }
	
	    return true;
	  }
	
	  // true if both NaN, false otherwise
	  return a!==a && b!==b;
	};
	
	/**
	 * Copyright 2019 Google LLC. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at.
	 *
	 *      Http://www.apache.org/licenses/LICENSE-2.0.
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	const DEFAULT_ID = "__googleMapsScriptId";
	/**
	 * The status of the [[Loader]].
	 */
	var LoaderStatus;
	(function (LoaderStatus) {
	    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
	    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
	    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
	    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
	})(LoaderStatus || (LoaderStatus = {}));
	/**
	 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
	 * dynamically using
	 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
	 * It works by dynamically creating and appending a script node to the the
	 * document head and wrapping the callback function so as to return a promise.
	 *
	 * ```
	 * const loader = new Loader({
	 *   apiKey: "",
	 *   version: "weekly",
	 *   libraries: ["places"]
	 * });
	 *
	 * loader.load().then((google) => {
	 *   const map = new google.maps.Map(...)
	 * })
	 * ```
	 */
	class Loader {
	    /**
	     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
	     * using this library, instead the defaults are set by the Google Maps
	     * JavaScript API server.
	     *
	     * ```
	     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
	     * ```
	     */
	    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version, }) {
	        this.CALLBACK = "__googleMapsCallback";
	        this.callbacks = [];
	        this.done = false;
	        this.loading = false;
	        this.errors = [];
	        this.apiKey = apiKey;
	        this.authReferrerPolicy = authReferrerPolicy;
	        this.channel = channel;
	        this.client = client;
	        this.id = id || DEFAULT_ID; // Do not allow empty string
	        this.language = language;
	        this.libraries = libraries;
	        this.mapIds = mapIds;
	        this.nonce = nonce;
	        this.region = region;
	        this.retries = retries;
	        this.url = url;
	        this.version = version;
	        if (Loader.instance) {
	            if (!fastDeepEqual$1(this.options, Loader.instance.options)) {
	                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
	            }
	            return Loader.instance;
	        }
	        Loader.instance = this;
	    }
	    get options() {
	        return {
	            version: this.version,
	            apiKey: this.apiKey,
	            channel: this.channel,
	            client: this.client,
	            id: this.id,
	            libraries: this.libraries,
	            language: this.language,
	            region: this.region,
	            mapIds: this.mapIds,
	            nonce: this.nonce,
	            url: this.url,
	            authReferrerPolicy: this.authReferrerPolicy,
	        };
	    }
	    get status() {
	        if (this.errors.length) {
	            return LoaderStatus.FAILURE;
	        }
	        if (this.done) {
	            return LoaderStatus.SUCCESS;
	        }
	        if (this.loading) {
	            return LoaderStatus.LOADING;
	        }
	        return LoaderStatus.INITIALIZED;
	    }
	    get failed() {
	        return this.done && !this.loading && this.errors.length >= this.retries + 1;
	    }
	    /**
	     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
	     *
	     * @ignore
	     */
	    createUrl() {
	        let url = this.url;
	        url += `?callback=${this.CALLBACK}`;
	        if (this.apiKey) {
	            url += `&key=${this.apiKey}`;
	        }
	        if (this.channel) {
	            url += `&channel=${this.channel}`;
	        }
	        if (this.client) {
	            url += `&client=${this.client}`;
	        }
	        if (this.libraries.length > 0) {
	            url += `&libraries=${this.libraries.join(",")}`;
	        }
	        if (this.language) {
	            url += `&language=${this.language}`;
	        }
	        if (this.region) {
	            url += `&region=${this.region}`;
	        }
	        if (this.version) {
	            url += `&v=${this.version}`;
	        }
	        if (this.mapIds) {
	            url += `&map_ids=${this.mapIds.join(",")}`;
	        }
	        if (this.authReferrerPolicy) {
	            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
	        }
	        return url;
	    }
	    deleteScript() {
	        const script = document.getElementById(this.id);
	        if (script) {
	            script.remove();
	        }
	    }
	    /**
	     * Load the Google Maps JavaScript API script and return a Promise.
	     */
	    load() {
	        return this.loadPromise();
	    }
	    /**
	     * Load the Google Maps JavaScript API script and return a Promise.
	     *
	     * @ignore
	     */
	    loadPromise() {
	        return new Promise((resolve, reject) => {
	            this.loadCallback((err) => {
	                if (!err) {
	                    resolve(window.google);
	                }
	                else {
	                    reject(err.error);
	                }
	            });
	        });
	    }
	    /**
	     * Load the Google Maps JavaScript API script with a callback.
	     */
	    loadCallback(fn) {
	        this.callbacks.push(fn);
	        this.execute();
	    }
	    /**
	     * Set the script on document.
	     */
	    setScript() {
	        if (document.getElementById(this.id)) {
	            // TODO wrap onerror callback for cases where the script was loaded elsewhere
	            this.callback();
	            return;
	        }
	        const url = this.createUrl();
	        const script = document.createElement("script");
	        script.id = this.id;
	        script.type = "text/javascript";
	        script.src = url;
	        script.onerror = this.loadErrorCallback.bind(this);
	        script.defer = true;
	        script.async = true;
	        if (this.nonce) {
	            script.nonce = this.nonce;
	        }
	        document.head.appendChild(script);
	    }
	    /**
	     * Reset the loader state.
	     */
	    reset() {
	        this.deleteScript();
	        this.done = false;
	        this.loading = false;
	        this.errors = [];
	        this.onerrorEvent = null;
	    }
	    resetIfRetryingFailed() {
	        if (this.failed) {
	            this.reset();
	        }
	    }
	    loadErrorCallback(e) {
	        this.errors.push(e);
	        if (this.errors.length <= this.retries) {
	            const delay = this.errors.length * Math.pow(2, this.errors.length);
	            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
	            setTimeout(() => {
	                this.deleteScript();
	                this.setScript();
	            }, delay);
	        }
	        else {
	            this.onerrorEvent = e;
	            this.callback();
	        }
	    }
	    setCallback() {
	        window.__googleMapsCallback = this.callback.bind(this);
	    }
	    callback() {
	        this.done = true;
	        this.loading = false;
	        this.callbacks.forEach((cb) => {
	            cb(this.onerrorEvent);
	        });
	        this.callbacks = [];
	    }
	    execute() {
	        this.resetIfRetryingFailed();
	        if (this.done) {
	            this.callback();
	        }
	        else {
	            // short circuit and warn if google.maps is already loaded
	            if (window.google && window.google.maps && window.google.maps.version) {
	                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
	                    "This may result in undesirable behavior as options and script parameters may not match.");
	                this.callback();
	                return;
	            }
	            if (this.loading) ;
	            else {
	                this.loading = true;
	                this.setCallback();
	                this.setScript();
	            }
	        }
	    }
	}
	
	function useJsApiLoader({ id = defaultLoadScriptProps.id, version = defaultLoadScriptProps.version, nonce, googleMapsApiKey, 
	// googleMapsClientId,
	language, region, libraries, preventGoogleFontsLoading, 
	// channel,
	mapIds, authReferrerPolicy, }) {
	    const isMounted = require$$0.useRef(false);
	    const [isLoaded, setLoaded] = require$$0.useState(false);
	    const [loadError, setLoadError] = require$$0.useState(undefined);
	    require$$0.useEffect(function trackMountedState() {
	        isMounted.current = true;
	        return () => {
	            isMounted.current = false;
	        };
	    }, []);
	    const loader = require$$0.useMemo(function memo() {
	        return new Loader({
	            id,
	            apiKey: googleMapsApiKey,
	            version,
	            libraries,
	            language,
	            region,
	            mapIds,
	            nonce,
	            authReferrerPolicy,
	        });
	    }, [id, googleMapsApiKey, version, libraries, language, region, mapIds, nonce, authReferrerPolicy]);
	    require$$0.useEffect(function effect() {
	        if (isLoaded) {
	            return;
	        }
	        else {
	            loader.load().then(function then() {
	                if (isMounted.current)
	                    setLoaded(true);
	            })
	                .catch(function onrejected(error) {
	                setLoadError(error);
	            });
	        }
	    }, []);
	    require$$0.useEffect(function applyPreventGoogleFonts() {
	        if (isBrowser && preventGoogleFontsLoading) {
	            preventGoogleFonts();
	        }
	    }, [preventGoogleFontsLoading]);
	    const prevLibraries = require$$0.useRef();
	    require$$0.useEffect(function effect() {
	        if (prevLibraries.current && libraries !== prevLibraries.current) {
	            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
	        }
	        prevLibraries.current = libraries;
	    }, [libraries]);
	    return { isLoaded, loadError };
	}
	
	const eventMap$h = {};
	const updaterMap$h = {
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	};
	function TrafficLayerFunctional({ options, onLoad, onUnmount }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (options && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        const trafficLayer = new google.maps.TrafficLayer(Object.assign(Object.assign({}, (options || {})), { map }));
	        setInstance(trafficLayer);
	        if (onLoad) {
	            onLoad(trafficLayer);
	        }
	        return () => {
	            if (instance !== null) {
	                if (onUnmount) {
	                    onUnmount(instance);
	                }
	                instance.setMap(null);
	            }
	        };
	    }, []);
	    return null;
	}
	const TrafficLayerF = require$$0.memo(TrafficLayerFunctional);
	class TrafficLayer extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            trafficLayer: null,
	        };
	        this.setTrafficLayerCallback = () => {
	            if (this.state.trafficLayer !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.trafficLayer);
	            }
	        };
	        this.registeredEvents = [];
	    }
	    componentDidMount() {
	        const trafficLayer = new google.maps.TrafficLayer(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$h,
	            eventMap: eventMap$h,
	            prevProps: {},
	            nextProps: this.props,
	            instance: trafficLayer,
	        });
	        this.setState(function setTrafficLayer() {
	            return {
	                trafficLayer,
	            };
	        }, this.setTrafficLayerCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.trafficLayer !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$h,
	                eventMap: eventMap$h,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.trafficLayer,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.trafficLayer !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.trafficLayer);
	            }
	            unregisterEvents(this.registeredEvents);
	            // @ts-ignore
	            this.state.trafficLayer.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	TrafficLayer.contextType = MapContext;
	
	function BicyclingLayerFunctional({ onLoad, onUnmount }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        const bicyclingLayer = new google.maps.BicyclingLayer();
	        setInstance(bicyclingLayer);
	        bicyclingLayer.setMap(map);
	        if (onLoad) {
	            onLoad(bicyclingLayer);
	        }
	        return () => {
	            if (bicyclingLayer !== null) {
	                if (onUnmount) {
	                    onUnmount(bicyclingLayer);
	                }
	                bicyclingLayer.setMap(null);
	            }
	        };
	    }, []);
	    return null;
	}
	const BicyclingLayerF = require$$0.memo(BicyclingLayerFunctional);
	class BicyclingLayer extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            bicyclingLayer: null,
	        };
	        this.setBicyclingLayerCallback = () => {
	            if (this.state.bicyclingLayer !== null) {
	                this.state.bicyclingLayer.setMap(this.context);
	                if (this.props.onLoad) {
	                    this.props.onLoad(this.state.bicyclingLayer);
	                }
	            }
	        };
	    }
	    componentDidMount() {
	        const bicyclingLayer = new google.maps.BicyclingLayer();
	        this.setState(() => {
	            return {
	                bicyclingLayer,
	            };
	        }, this.setBicyclingLayerCallback);
	    }
	    componentWillUnmount() {
	        if (this.state.bicyclingLayer !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.bicyclingLayer);
	            }
	            this.state.bicyclingLayer.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	BicyclingLayer.contextType = MapContext;
	
	function TransitLayerFunctional({ onLoad, onUnmount }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        const transitLayer = new google.maps.TransitLayer();
	        setInstance(transitLayer);
	        transitLayer.setMap(map);
	        if (onLoad) {
	            onLoad(transitLayer);
	        }
	        return () => {
	            if (instance !== null) {
	                if (onUnmount) {
	                    onUnmount(instance);
	                }
	                // @ts-ignore
	                this.state.transitLayer.setMap(null);
	            }
	        };
	    }, []);
	    return null;
	}
	const TransitLayerF = require$$0.memo(TransitLayerFunctional);
	class TransitLayer extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            transitLayer: null,
	        };
	        this.setTransitLayerCallback = () => {
	            if (this.state.transitLayer !== null) {
	                // @ts-ignore
	                this.state.transitLayer.setMap(this.context);
	                if (this.props.onLoad) {
	                    // @ts-ignore
	                    this.props.onLoad(this.state.transitLayer);
	                }
	            }
	        };
	    }
	    componentDidMount() {
	        const transitLayer = new google.maps.TransitLayer();
	        this.setState(function setTransitLayer() {
	            return {
	                transitLayer,
	            };
	        }, this.setTransitLayerCallback);
	    }
	    componentWillUnmount() {
	        if (this.state.transitLayer !== null) {
	            if (this.props.onUnmount) {
	                // @ts-ignore
	                this.props.onUnmount(this.state.transitLayer);
	            }
	            // @ts-ignore
	            this.state.transitLayer.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	TransitLayer.contextType = MapContext;
	
	/* globals google */
	const eventMap$g = {
	    onCircleComplete: 'circlecomplete',
	    onMarkerComplete: 'markercomplete',
	    onOverlayComplete: 'overlaycomplete',
	    onPolygonComplete: 'polygoncomplete',
	    onPolylineComplete: 'polylinecomplete',
	    onRectangleComplete: 'rectanglecomplete',
	};
	const updaterMap$g = {
	    drawingMode(instance, drawingMode) {
	        instance.setDrawingMode(drawingMode);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	};
	function DrawingManagerFunctional({ options, drawingMode, onCircleComplete, onMarkerComplete, onOverlayComplete, onPolygonComplete, onPolylineComplete, onRectangleComplete, onLoad, onUnmount }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [circlecompleteListener, setCircleCompleteListener] = require$$0.useState(null);
	    const [markercompleteListener, setMarkerCompleteListener] = require$$0.useState(null);
	    const [overlaycompleteListener, setOverlayCompleteListener] = require$$0.useState(null);
	    const [polygoncompleteListener, setPolygonCompleteListener] = require$$0.useState(null);
	    const [polylinecompleteListener, setPolylineCompleteListener] = require$$0.useState(null);
	    const [rectanglecompleteListener, setRectangleCompleteListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (options && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (drawingMode && instance !== null) {
	            instance.setDrawingMode(drawingMode);
	        }
	    }, [instance, drawingMode]);
	    require$$0.useEffect(() => {
	        if (instance && onCircleComplete) {
	            if (circlecompleteListener !== null) {
	                google.maps.event.removeListener(circlecompleteListener);
	            }
	            setCircleCompleteListener(google.maps.event.addListener(instance, 'circlecomplete', onCircleComplete));
	        }
	    }, [instance, onCircleComplete]);
	    require$$0.useEffect(() => {
	        if (instance && onMarkerComplete) {
	            if (markercompleteListener !== null) {
	                google.maps.event.removeListener(markercompleteListener);
	            }
	            setMarkerCompleteListener(google.maps.event.addListener(instance, 'markercomplete', onMarkerComplete));
	        }
	    }, [instance, onMarkerComplete]);
	    require$$0.useEffect(() => {
	        if (instance && onOverlayComplete) {
	            if (overlaycompleteListener !== null) {
	                google.maps.event.removeListener(overlaycompleteListener);
	            }
	            setOverlayCompleteListener(google.maps.event.addListener(instance, 'overlaycomplete', onOverlayComplete));
	        }
	    }, [instance, onOverlayComplete]);
	    require$$0.useEffect(() => {
	        if (instance && onPolygonComplete) {
	            if (polygoncompleteListener !== null) {
	                google.maps.event.removeListener(polygoncompleteListener);
	            }
	            setPolygonCompleteListener(google.maps.event.addListener(instance, 'polygoncomplete', onPolygonComplete));
	        }
	    }, [instance, onPolygonComplete]);
	    require$$0.useEffect(() => {
	        if (instance && onPolylineComplete) {
	            if (polylinecompleteListener !== null) {
	                google.maps.event.removeListener(polylinecompleteListener);
	            }
	            setPolylineCompleteListener(google.maps.event.addListener(instance, 'polylinecomplete', onPolylineComplete));
	        }
	    }, [instance, onPolylineComplete]);
	    require$$0.useEffect(() => {
	        if (instance && onRectangleComplete) {
	            if (rectanglecompleteListener !== null) {
	                google.maps.event.removeListener(rectanglecompleteListener);
	            }
	            setRectangleCompleteListener(google.maps.event.addListener(instance, 'rectanglecomplete', onRectangleComplete));
	        }
	    }, [instance, onRectangleComplete]);
	    require$$0.useEffect(() => {
	        invariant_1(!!google.maps.drawing, `Did you include prop libraries={['drawing']} in the URL? %s`, google.maps.drawing);
	        const drawingManager = new google.maps.drawing.DrawingManager(Object.assign(Object.assign({}, (options || {})), { map }));
	        if (drawingMode) {
	            drawingManager.setDrawingMode(drawingMode);
	        }
	        if (onCircleComplete) {
	            setCircleCompleteListener(google.maps.event.addListener(drawingManager, 'circlecomplete', onCircleComplete));
	        }
	        if (onMarkerComplete) {
	            setMarkerCompleteListener(google.maps.event.addListener(drawingManager, 'markercomplete', onMarkerComplete));
	        }
	        if (onOverlayComplete) {
	            setOverlayCompleteListener(google.maps.event.addListener(drawingManager, 'overlaycomplete', onOverlayComplete));
	        }
	        if (onPolygonComplete) {
	            setPolygonCompleteListener(google.maps.event.addListener(drawingManager, 'polygoncomplete', onPolygonComplete));
	        }
	        if (onPolylineComplete) {
	            setPolylineCompleteListener(google.maps.event.addListener(drawingManager, 'polylinecomplete', onPolylineComplete));
	        }
	        if (onRectangleComplete) {
	            setRectangleCompleteListener(google.maps.event.addListener(drawingManager, 'rectanglecomplete', onRectangleComplete));
	        }
	        setInstance(drawingManager);
	        if (onLoad) {
	            onLoad(drawingManager);
	        }
	        return () => {
	            if (instance !== null) {
	                if (circlecompleteListener) {
	                    google.maps.event.removeListener(circlecompleteListener);
	                }
	                if (markercompleteListener) {
	                    google.maps.event.removeListener(markercompleteListener);
	                }
	                if (overlaycompleteListener) {
	                    google.maps.event.removeListener(overlaycompleteListener);
	                }
	                if (polygoncompleteListener) {
	                    google.maps.event.removeListener(polygoncompleteListener);
	                }
	                if (polylinecompleteListener) {
	                    google.maps.event.removeListener(polylinecompleteListener);
	                }
	                if (rectanglecompleteListener) {
	                    google.maps.event.removeListener(rectanglecompleteListener);
	                }
	                if (onUnmount) {
	                    onUnmount(instance);
	                }
	                instance.setMap(null);
	            }
	        };
	    }, []);
	    return null;
	}
	const DrawingManagerF = require$$0.memo(DrawingManagerFunctional);
	class DrawingManager extends require$$0.PureComponent {
	    constructor(props) {
	        super(props);
	        this.registeredEvents = [];
	        this.state = {
	            drawingManager: null,
	        };
	        this.setDrawingManagerCallback = () => {
	            if (this.state.drawingManager !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.drawingManager);
	            }
	        };
	        invariant_1(!!google.maps.drawing, `Did you include prop libraries={['drawing']} in the URL? %s`, google.maps.drawing);
	    }
	    componentDidMount() {
	        const drawingManager = new google.maps.drawing.DrawingManager(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$g,
	            eventMap: eventMap$g,
	            prevProps: {},
	            nextProps: this.props,
	            instance: drawingManager,
	        });
	        this.setState(function setDrawingManager() {
	            return {
	                drawingManager,
	            };
	        }, this.setDrawingManagerCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.drawingManager !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$g,
	                eventMap: eventMap$g,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.drawingManager,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.drawingManager !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.drawingManager);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.drawingManager.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	DrawingManager.contextType = MapContext;
	
	const eventMap$f = {
	    onAnimationChanged: 'animation_changed',
	    onClick: 'click',
	    onClickableChanged: 'clickable_changed',
	    onCursorChanged: 'cursor_changed',
	    onDblClick: 'dblclick',
	    onDrag: 'drag',
	    onDragEnd: 'dragend',
	    onDraggableChanged: 'draggable_changed',
	    onDragStart: 'dragstart',
	    onFlatChanged: 'flat_changed',
	    onIconChanged: 'icon_changed',
	    onMouseDown: 'mousedown',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseUp: 'mouseup',
	    onPositionChanged: 'position_changed',
	    onRightClick: 'rightclick',
	    onShapeChanged: 'shape_changed',
	    onTitleChanged: 'title_changed',
	    onVisibleChanged: 'visible_changed',
	    onZindexChanged: 'zindex_changed',
	};
	const updaterMap$f = {
	    animation(instance, animation) {
	        instance.setAnimation(animation);
	    },
	    clickable(instance, clickable) {
	        instance.setClickable(clickable);
	    },
	    cursor(instance, cursor) {
	        instance.setCursor(cursor);
	    },
	    draggable(instance, draggable) {
	        instance.setDraggable(draggable);
	    },
	    icon(instance, icon) {
	        instance.setIcon(icon);
	    },
	    label(instance, label) {
	        instance.setLabel(label);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    opacity(instance, opacity) {
	        instance.setOpacity(opacity);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    position(instance, position) {
	        instance.setPosition(position);
	    },
	    shape(instance, shape) {
	        instance.setShape(shape);
	    },
	    title(instance, title) {
	        instance.setTitle(title);
	    },
	    visible(instance, visible) {
	        instance.setVisible(visible);
	    },
	    zIndex(instance, zIndex) {
	        instance.setZIndex(zIndex);
	    },
	};
	const defaultOptions$4 = {};
	function MarkerFunctional({ position, options, clusterer, noClustererRedraw, children, draggable, visible, animation, clickable, cursor, icon, label, opacity, shape, title, zIndex, onClick, onDblClick, onDrag, onDragEnd, onDragStart, onMouseOut, onMouseOver, onMouseUp, onMouseDown, onRightClick, onClickableChanged, onCursorChanged, onAnimationChanged, onDraggableChanged, onFlatChanged, onIconChanged, onPositionChanged, onShapeChanged, onTitleChanged, onVisibleChanged, onZindexChanged, onLoad, onUnmount }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [dblclickListener, setDblclickListener] = require$$0.useState(null);
	    const [dragendListener, setDragendListener] = require$$0.useState(null);
	    const [dragstartListener, setDragstartListener] = require$$0.useState(null);
	    const [mousedownListener, setMousedownListener] = require$$0.useState(null);
	    const [mouseoutListener, setMouseoutListener] = require$$0.useState(null);
	    const [mouseoverListener, setMouseoverListener] = require$$0.useState(null);
	    const [mouseupListener, setMouseupListener] = require$$0.useState(null);
	    const [rightclickListener, setRightclickListener] = require$$0.useState(null);
	    const [clickListener, setClickListener] = require$$0.useState(null);
	    const [dragListener, setDragListener] = require$$0.useState(null);
	    const [clickableChangedListener, setClickableChangedListener] = require$$0.useState(null);
	    const [cursorChangedListener, setCursorChangedListener] = require$$0.useState(null);
	    const [animationChangedListener, setAnimationChangedListener] = require$$0.useState(null);
	    const [draggableChangedListener, setDraggableChangedListener] = require$$0.useState(null);
	    const [flatChangedListener, setFlatChangedListener] = require$$0.useState(null);
	    const [iconChangedListener, setIconChangedListener] = require$$0.useState(null);
	    const [positionChangedListener, setPositionChangedListener] = require$$0.useState(null);
	    const [shapeChangedListener, setShapeChangedListener] = require$$0.useState(null);
	    const [titleChangedListener, setTitleChangedListener] = require$$0.useState(null);
	    const [visibleChangedListener, setVisibleChangedListener] = require$$0.useState(null);
	    const [zIndexChangedListener, setZindexChangedListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (typeof options !== 'undefined' && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (typeof draggable !== 'undefined' && instance !== null) {
	            instance.setDraggable(draggable);
	        }
	    }, [instance, draggable]);
	    require$$0.useEffect(() => {
	        if (position && instance !== null) {
	            instance.setPosition(position);
	        }
	    }, [instance, position]);
	    require$$0.useEffect(() => {
	        if (typeof visible !== 'undefined' && instance !== null) {
	            instance.setVisible(visible);
	        }
	    }, [instance, visible]);
	    require$$0.useEffect(() => {
	        if (animation && instance !== null) {
	            instance.setAnimation(animation);
	        }
	    }, [instance, animation]);
	    require$$0.useEffect(() => {
	        if (instance && onDblClick) {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragEnd) {
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragStart) {
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
	        }
	    }, [onDragStart]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseDown) {
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
	        }
	    }, [onMouseDown]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOut) {
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
	        }
	    }, [onMouseOut]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOver) {
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
	        }
	    }, [onMouseOver]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseUp) {
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
	        }
	    }, [onMouseUp]);
	    require$$0.useEffect(() => {
	        if (instance && onRightClick) {
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
	        }
	    }, [onRightClick]);
	    require$$0.useEffect(() => {
	        if (instance && onClick) {
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDrag) {
	            if (dragListener !== null) {
	                google.maps.event.removeListener(dragListener);
	            }
	            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
	        }
	    }, [onDrag]);
	    require$$0.useEffect(() => {
	        if (instance && onClickableChanged) {
	            if (clickableChangedListener !== null) {
	                google.maps.event.removeListener(clickableChangedListener);
	            }
	            setClickableChangedListener(google.maps.event.addListener(instance, 'clickable_changed', onClickableChanged));
	        }
	    }, [onClickableChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onCursorChanged) {
	            if (cursorChangedListener !== null) {
	                google.maps.event.removeListener(cursorChangedListener);
	            }
	            setCursorChangedListener(google.maps.event.addListener(instance, 'cursor_changed', onCursorChanged));
	        }
	    }, [onCursorChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onAnimationChanged) {
	            if (animationChangedListener !== null) {
	                google.maps.event.removeListener(animationChangedListener);
	            }
	            setAnimationChangedListener(google.maps.event.addListener(instance, 'animation_changed', onAnimationChanged));
	        }
	    }, [onAnimationChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onDraggableChanged) {
	            if (draggableChangedListener !== null) {
	                google.maps.event.removeListener(draggableChangedListener);
	            }
	            setDraggableChangedListener(google.maps.event.addListener(instance, 'draggable_changed', onDraggableChanged));
	        }
	    }, [onDraggableChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onFlatChanged) {
	            if (flatChangedListener !== null) {
	                google.maps.event.removeListener(flatChangedListener);
	            }
	            setFlatChangedListener(google.maps.event.addListener(instance, 'flat_changed', onFlatChanged));
	        }
	    }, [onFlatChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onIconChanged) {
	            if (iconChangedListener !== null) {
	                google.maps.event.removeListener(iconChangedListener);
	            }
	            setIconChangedListener(google.maps.event.addListener(instance, 'icon_changed', onIconChanged));
	        }
	    }, [onIconChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onPositionChanged) {
	            if (positionChangedListener !== null) {
	                google.maps.event.removeListener(positionChangedListener);
	            }
	            setPositionChangedListener(google.maps.event.addListener(instance, 'position_changed', onPositionChanged));
	        }
	    }, [onPositionChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onShapeChanged) {
	            if (shapeChangedListener !== null) {
	                google.maps.event.removeListener(shapeChangedListener);
	            }
	            setShapeChangedListener(google.maps.event.addListener(instance, 'shape_changed', onShapeChanged));
	        }
	    }, [onShapeChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onTitleChanged) {
	            if (titleChangedListener !== null) {
	                google.maps.event.removeListener(titleChangedListener);
	            }
	            setTitleChangedListener(google.maps.event.addListener(instance, 'title_changed', onTitleChanged));
	        }
	    }, [onTitleChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onVisibleChanged) {
	            if (visibleChangedListener !== null) {
	                google.maps.event.removeListener(visibleChangedListener);
	            }
	            setVisibleChangedListener(google.maps.event.addListener(instance, 'visible_changed', onVisibleChanged));
	        }
	    }, [onVisibleChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onZindexChanged) {
	            if (zIndexChangedListener !== null) {
	                google.maps.event.removeListener(zIndexChangedListener);
	            }
	            setZindexChangedListener(google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged));
	        }
	    }, [onZindexChanged]);
	    require$$0.useEffect(() => {
	        const markerOptions = Object.assign(Object.assign(Object.assign({}, (options || defaultOptions$4)), (clusterer ? defaultOptions$4 : { map })), { position: position });
	        const marker = new google.maps.Marker(markerOptions);
	        if (clusterer) {
	            clusterer.addMarker(marker, !!noClustererRedraw);
	        }
	        else {
	            marker.setMap(map);
	        }
	        if (position) {
	            marker.setPosition(position);
	        }
	        if (typeof visible !== 'undefined') {
	            marker.setVisible(visible);
	        }
	        if (typeof draggable !== 'undefined') {
	            marker.setDraggable(draggable);
	        }
	        if (typeof clickable !== 'undefined') {
	            marker.setClickable(clickable);
	        }
	        if (typeof cursor === 'string') {
	            marker.setCursor(cursor);
	        }
	        if (icon) {
	            marker.setIcon(icon);
	        }
	        if (typeof label !== 'undefined') {
	            marker.setLabel(label);
	        }
	        if (typeof opacity !== 'undefined') {
	            marker.setOpacity(opacity);
	        }
	        if (shape) {
	            marker.setShape(shape);
	        }
	        if (typeof title === 'string') {
	            marker.setTitle(title);
	        }
	        if (typeof zIndex === 'number') {
	            marker.setZIndex(zIndex);
	        }
	        if (onDblClick) {
	            setDblclickListener(google.maps.event.addListener(marker, 'dblclick', onDblClick));
	        }
	        if (onDragEnd) {
	            setDragendListener(google.maps.event.addListener(marker, 'dragend', onDragEnd));
	        }
	        if (onDragStart) {
	            setDragstartListener(google.maps.event.addListener(marker, 'dragstart', onDragStart));
	        }
	        if (onMouseDown) {
	            setMousedownListener(google.maps.event.addListener(marker, 'mousedown', onMouseDown));
	        }
	        if (onMouseOut) {
	            setMouseoutListener(google.maps.event.addListener(marker, 'mouseout', onMouseOut));
	        }
	        if (onMouseOver) {
	            setMouseoverListener(google.maps.event.addListener(marker, 'mouseover', onMouseOver));
	        }
	        if (onMouseUp) {
	            setMouseupListener(google.maps.event.addListener(marker, 'mouseup', onMouseUp));
	        }
	        if (onRightClick) {
	            setRightclickListener(google.maps.event.addListener(marker, 'rightclick', onRightClick));
	        }
	        if (onClick) {
	            setClickListener(google.maps.event.addListener(marker, 'click', onClick));
	        }
	        if (onDrag) {
	            setDragListener(google.maps.event.addListener(marker, 'drag', onDrag));
	        }
	        if (onClickableChanged) {
	            setClickableChangedListener(google.maps.event.addListener(marker, 'clickable_changed', onClickableChanged));
	        }
	        if (onCursorChanged) {
	            setCursorChangedListener(google.maps.event.addListener(marker, 'cursor_changed', onCursorChanged));
	        }
	        if (onAnimationChanged) {
	            setAnimationChangedListener(google.maps.event.addListener(marker, 'animation_changed', onAnimationChanged));
	        }
	        if (onDraggableChanged) {
	            setDraggableChangedListener(google.maps.event.addListener(marker, 'draggable_changed', onDraggableChanged));
	        }
	        if (onFlatChanged) {
	            setFlatChangedListener(google.maps.event.addListener(marker, 'flat_changed', onFlatChanged));
	        }
	        if (onIconChanged) {
	            setIconChangedListener(google.maps.event.addListener(marker, 'icon_changed', onIconChanged));
	        }
	        if (onPositionChanged) {
	            setPositionChangedListener(google.maps.event.addListener(marker, 'position_changed', onPositionChanged));
	        }
	        if (onShapeChanged) {
	            setShapeChangedListener(google.maps.event.addListener(marker, 'shape_changed', onShapeChanged));
	        }
	        if (onTitleChanged) {
	            setTitleChangedListener(google.maps.event.addListener(marker, 'title_changed', onTitleChanged));
	        }
	        if (onVisibleChanged) {
	            setVisibleChangedListener(google.maps.event.addListener(marker, 'visible_changed', onVisibleChanged));
	        }
	        if (onZindexChanged) {
	            setZindexChangedListener(google.maps.event.addListener(marker, 'zindex_changed', onZindexChanged));
	        }
	        setInstance(marker);
	        if (onLoad) {
	            onLoad(marker);
	        }
	        return () => {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            if (clickableChangedListener !== null) {
	                google.maps.event.removeListener(clickableChangedListener);
	            }
	            if (cursorChangedListener !== null) {
	                google.maps.event.removeListener(cursorChangedListener);
	            }
	            if (animationChangedListener !== null) {
	                google.maps.event.removeListener(animationChangedListener);
	            }
	            if (draggableChangedListener !== null) {
	                google.maps.event.removeListener(draggableChangedListener);
	            }
	            if (flatChangedListener !== null) {
	                google.maps.event.removeListener(flatChangedListener);
	            }
	            if (iconChangedListener !== null) {
	                google.maps.event.removeListener(iconChangedListener);
	            }
	            if (positionChangedListener !== null) {
	                google.maps.event.removeListener(positionChangedListener);
	            }
	            if (titleChangedListener !== null) {
	                google.maps.event.removeListener(titleChangedListener);
	            }
	            if (visibleChangedListener !== null) {
	                google.maps.event.removeListener(visibleChangedListener);
	            }
	            if (zIndexChangedListener !== null) {
	                google.maps.event.removeListener(zIndexChangedListener);
	            }
	            if (onUnmount) {
	                onUnmount(marker);
	            }
	            if (clusterer) {
	                clusterer.removeMarker(marker, !!noClustererRedraw);
	            }
	            else if (marker) {
	                marker.setMap(null);
	            }
	        };
	    }, []);
	    const chx = require$$0.useMemo(() => {
	        return children
	            ? require$$0.Children.map(children, child => {
	                if (!require$$0.isValidElement(child)) {
	                    return child;
	                }
	                const elementChild = child;
	                return require$$0.cloneElement(elementChild, { anchor: instance });
	            })
	            : null;
	    }, [children, instance]);
	    return jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, { children: chx }) || null;
	}
	const MarkerF = require$$0.memo(MarkerFunctional);
	class Marker extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	    }
	    componentDidMount() {
	        const markerOptions = Object.assign(Object.assign(Object.assign({}, (this.props.options || defaultOptions$4)), (this.props.clusterer ? defaultOptions$4 : { map: this.context })), { position: this.props.position });
	        // Unfortunately we can't just do this in the contstructor, because the
	        // `MapContext` might not be filled in yet.
	        this.marker = new google.maps.Marker(markerOptions);
	        if (this.props.clusterer) {
	            this.props.clusterer.addMarker(this.marker, !!this.props.noClustererRedraw);
	        }
	        else {
	            this.marker.setMap(this.context);
	        }
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$f,
	            eventMap: eventMap$f,
	            prevProps: {},
	            nextProps: this.props,
	            instance: this.marker,
	        });
	        if (this.props.onLoad) {
	            this.props.onLoad(this.marker);
	        }
	    }
	    componentDidUpdate(prevProps) {
	        if (this.marker) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$f,
	                eventMap: eventMap$f,
	                prevProps,
	                nextProps: this.props,
	                instance: this.marker,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.marker) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.marker);
	            }
	            unregisterEvents(this.registeredEvents);
	            if (this.props.clusterer) {
	                this.props.clusterer.removeMarker(this.marker, !!this.props.noClustererRedraw);
	            }
	            else {
	                this.marker && this.marker.setMap(null);
	            }
	        }
	    }
	    render() {
	        let children = null;
	        if (this.props.children) {
	            children = require$$0.Children.map(this.props.children, child => {
	                if (!require$$0.isValidElement(child)) {
	                    return child;
	                }
	                let elementChild = child;
	                return require$$0.cloneElement(elementChild, { anchor: this.marker });
	            });
	        }
	        return children || null;
	    }
	}
	Marker.contextType = MapContext;
	
	var ClusterIcon = /** @class */ (function () {
	    function ClusterIcon(cluster, styles) {
	        cluster.getClusterer().extend(ClusterIcon, google.maps.OverlayView);
	        this.cluster = cluster;
	        this.clusterClassName = this.cluster.getClusterer().getClusterClass();
	        this.className = this.clusterClassName;
	        this.styles = styles;
	        this.center = undefined;
	        this.div = null;
	        this.sums = null;
	        this.visible = false;
	        this.boundsChangedListener = null;
	        this.url = '';
	        this.height = 0;
	        this.width = 0;
	        this.anchorText = [0, 0];
	        this.anchorIcon = [0, 0];
	        this.textColor = 'black';
	        this.textSize = 11;
	        this.textDecoration = 'none';
	        this.fontWeight = 'bold';
	        this.fontStyle = 'normal';
	        this.fontFamily = 'Arial,sans-serif';
	        this.backgroundPosition = '0 0';
	        this.cMouseDownInCluster = null;
	        this.cDraggingMapByCluster = null;
	        this.timeOut = null;
	        this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
	        this.onBoundsChanged = this.onBoundsChanged.bind(this);
	        this.onMouseDown = this.onMouseDown.bind(this);
	        this.onClick = this.onClick.bind(this);
	        this.onMouseOver = this.onMouseOver.bind(this);
	        this.onMouseOut = this.onMouseOut.bind(this);
	        this.onAdd = this.onAdd.bind(this);
	        this.onRemove = this.onRemove.bind(this);
	        this.draw = this.draw.bind(this);
	        this.hide = this.hide.bind(this);
	        this.show = this.show.bind(this);
	        this.useStyle = this.useStyle.bind(this);
	        this.setCenter = this.setCenter.bind(this);
	        this.getPosFromLatLng = this.getPosFromLatLng.bind(this);
	    }
	    ClusterIcon.prototype.onBoundsChanged = function () {
	        this.cDraggingMapByCluster = this.cMouseDownInCluster;
	    };
	    ClusterIcon.prototype.onMouseDown = function () {
	        this.cMouseDownInCluster = true;
	        this.cDraggingMapByCluster = false;
	    };
	    ClusterIcon.prototype.onClick = function (event) {
	        this.cMouseDownInCluster = false;
	        if (!this.cDraggingMapByCluster) {
	            var markerClusterer_1 = this.cluster.getClusterer();
	            /**
	             * This event is fired when a cluster marker is clicked.
	             * @name MarkerClusterer#click
	             * @param {Cluster} c The cluster that was clicked.
	             * @event
	             */
	            google.maps.event.trigger(markerClusterer_1, 'click', this.cluster);
	            google.maps.event.trigger(markerClusterer_1, 'clusterclick', this.cluster); // deprecated name
	            // The default click handler follows. Disable it by setting
	            // the zoomOnClick property to false.
	            if (markerClusterer_1.getZoomOnClick()) {
	                // Zoom into the cluster.
	                var maxZoom_1 = markerClusterer_1.getMaxZoom();
	                var bounds_1 = this.cluster.getBounds();
	                var map = markerClusterer_1.getMap();
	                if (map !== null && 'fitBounds' in map) {
	                    map.fitBounds(bounds_1);
	                }
	                // There is a fix for Issue 170 here:
	                this.timeOut = window.setTimeout(function () {
	                    var map = markerClusterer_1.getMap();
	                    if (map !== null) {
	                        if ('fitBounds' in map) {
	                            map.fitBounds(bounds_1);
	                        }
	                        var zoom = map.getZoom() || 0;
	                        // Don't zoom beyond the max zoom level
	                        if (maxZoom_1 !== null &&
	                            zoom > maxZoom_1) {
	                            map.setZoom(maxZoom_1 + 1);
	                        }
	                    }
	                }, 100);
	            }
	            // Prevent event propagation to the map:
	            event.cancelBubble = true;
	            if (event.stopPropagation) {
	                event.stopPropagation();
	            }
	        }
	    };
	    ClusterIcon.prototype.onMouseOver = function () {
	        /**
	         * This event is fired when the mouse moves over a cluster marker.
	         * @name MarkerClusterer#mouseover
	         * @param {Cluster} c The cluster that the mouse moved over.
	         * @event
	         */
	        google.maps.event.trigger(this.cluster.getClusterer(), 'mouseover', this.cluster);
	    };
	    ClusterIcon.prototype.onMouseOut = function () {
	        /**
	         * This event is fired when the mouse moves out of a cluster marker.
	         * @name MarkerClusterer#mouseout
	         * @param {Cluster} c The cluster that the mouse moved out of.
	         * @event
	         */
	        google.maps.event.trigger(this.cluster.getClusterer(), 'mouseout', this.cluster);
	    };
	    ClusterIcon.prototype.onAdd = function () {
	        var _a;
	        this.div = document.createElement('div');
	        this.div.className = this.className;
	        if (this.visible) {
	            this.show();
	        }
	        (_a = this.getPanes()) === null || _a === void 0 ? void 0 : _a.overlayMouseTarget.appendChild(this.div);
	        var map = this.getMap();
	        if (map !== null) {
	            // Fix for Issue 157
	            this.boundsChangedListener = google.maps.event.addListener(map, 'bounds_changed', this.onBoundsChanged);
	            this.div.addEventListener('mousedown', this.onMouseDown);
	            this.div.addEventListener('click', this.onClick);
	            this.div.addEventListener('mouseover', this.onMouseOver);
	            this.div.addEventListener('mouseout', this.onMouseOut);
	        }
	    };
	    ClusterIcon.prototype.onRemove = function () {
	        if (this.div && this.div.parentNode) {
	            this.hide();
	            if (this.boundsChangedListener !== null) {
	                google.maps.event.removeListener(this.boundsChangedListener);
	            }
	            this.div.removeEventListener('mousedown', this.onMouseDown);
	            this.div.removeEventListener('click', this.onClick);
	            this.div.removeEventListener('mouseover', this.onMouseOver);
	            this.div.removeEventListener('mouseout', this.onMouseOut);
	            this.div.parentNode.removeChild(this.div);
	            if (this.timeOut !== null) {
	                window.clearTimeout(this.timeOut);
	                this.timeOut = null;
	            }
	            this.div = null;
	        }
	    };
	    ClusterIcon.prototype.draw = function () {
	        if (this.visible && this.div !== null && this.center) {
	            var pos = this.getPosFromLatLng(this.center);
	            this.div.style.top = pos !== null ? "".concat(pos.y, "px") : '0';
	            this.div.style.left = pos !== null ? "".concat(pos.x, "px") : '0';
	        }
	    };
	    ClusterIcon.prototype.hide = function () {
	        if (this.div) {
	            this.div.style.display = 'none';
	        }
	        this.visible = false;
	    };
	    ClusterIcon.prototype.show = function () {
	        var _a;
	        if (this.div && this.center) {
	            var divTitle = '';
	            // NOTE: values must be specified in px units
	            var bp = this.backgroundPosition.split(' ');
	            var spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ''), 10);
	            var spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ''), 10);
	            var pos = this.getPosFromLatLng(this.center);
	            if (this.sums === null ||
	                typeof this.sums.title === 'undefined' ||
	                this.sums.title === '') {
	                divTitle = this.cluster.getClusterer().getTitle();
	            }
	            else {
	                divTitle = this.sums.title;
	            }
	            this.div.className = this.className;
	            this.div.style.cursor = 'pointer';
	            this.div.style.position = 'absolute';
	            this.div.style.top = pos !== null ? "".concat(pos.y, "px") : '0';
	            this.div.style.left = pos !== null ? "".concat(pos.x, "px") : '0';
	            this.div.style.width = "".concat(this.width, "px");
	            this.div.style.height = "".concat(this.height, "px");
	            var img = document.createElement('img');
	            img.alt = divTitle;
	            img.src = this.url;
	            img.width = this.width;
	            img.height = this.height;
	            img.style.position = 'absolute';
	            img.style.top = "".concat(spriteV, "px");
	            img.style.left = "".concat(spriteH, "px");
	            if (!this.cluster.getClusterer().enableRetinaIcons) {
	                img.style.clip = "rect(-".concat(spriteV, "px, -").concat(spriteH + this.width, "px, -").concat(spriteV + this.height, ", -").concat(spriteH, ")");
	            }
	            var textElm = document.createElement('div');
	            textElm.style.position = 'absolute';
	            textElm.style.top = "".concat(this.anchorText[0], "px");
	            textElm.style.left = "".concat(this.anchorText[1], "px");
	            textElm.style.color = this.textColor;
	            textElm.style.fontSize = "".concat(this.textSize, "px");
	            textElm.style.fontFamily = this.fontFamily;
	            textElm.style.fontWeight = this.fontWeight;
	            textElm.style.fontStyle = this.fontStyle;
	            textElm.style.textDecoration = this.textDecoration;
	            textElm.style.textAlign = 'center';
	            textElm.style.width = "".concat(this.width, "px");
	            textElm.style.lineHeight = "".concat(this.height, "px");
	            textElm.innerText = "".concat((_a = this.sums) === null || _a === void 0 ? void 0 : _a.text);
	            this.div.innerHTML = '';
	            this.div.appendChild(img);
	            this.div.appendChild(textElm);
	            this.div.title = divTitle;
	            this.div.style.display = '';
	        }
	        this.visible = true;
	    };
	    ClusterIcon.prototype.useStyle = function (sums) {
	        this.sums = sums;
	        var styles = this.cluster.getClusterer().getStyles();
	        var style = styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))];
	        this.url = style.url;
	        this.height = style.height;
	        this.width = style.width;
	        if (style.className)
	            this.className = "".concat(this.clusterClassName, " ").concat(style.className);
	        this.anchorText = style.anchorText || [0, 0];
	        this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2];
	        this.textColor = style.textColor || 'black';
	        this.textSize = style.textSize || 11;
	        this.textDecoration = style.textDecoration || 'none';
	        this.fontWeight = style.fontWeight || 'bold';
	        this.fontStyle = style.fontStyle || 'normal';
	        this.fontFamily = style.fontFamily || 'Arial,sans-serif';
	        this.backgroundPosition = style.backgroundPosition || '0 0';
	    };
	    ClusterIcon.prototype.setCenter = function (center) {
	        this.center = center;
	    };
	    ClusterIcon.prototype.getPosFromLatLng = function (latlng) {
	        var pos = this.getProjection().fromLatLngToDivPixel(latlng);
	        if (pos !== null) {
	            pos.x -= this.anchorIcon[1];
	            pos.y -= this.anchorIcon[0];
	        }
	        return pos;
	    };
	    return ClusterIcon;
	}());
	
	var Cluster$1 = /** @class */ (function () {
	    function Cluster(markerClusterer) {
	        this.markerClusterer = markerClusterer;
	        this.map = this.markerClusterer.getMap();
	        this.gridSize = this.markerClusterer.getGridSize();
	        this.minClusterSize = this.markerClusterer.getMinimumClusterSize();
	        this.averageCenter = this.markerClusterer.getAverageCenter();
	        this.markers = [];
	        this.center = undefined;
	        this.bounds = null;
	        this.clusterIcon = new ClusterIcon(this, this.markerClusterer.getStyles());
	        this.getSize = this.getSize.bind(this);
	        this.getMarkers = this.getMarkers.bind(this);
	        this.getCenter = this.getCenter.bind(this);
	        this.getMap = this.getMap.bind(this);
	        this.getClusterer = this.getClusterer.bind(this);
	        this.getBounds = this.getBounds.bind(this);
	        this.remove = this.remove.bind(this);
	        this.addMarker = this.addMarker.bind(this);
	        this.isMarkerInClusterBounds = this.isMarkerInClusterBounds.bind(this);
	        this.calculateBounds = this.calculateBounds.bind(this);
	        this.updateIcon = this.updateIcon.bind(this);
	        this.isMarkerAlreadyAdded = this.isMarkerAlreadyAdded.bind(this);
	    }
	    Cluster.prototype.getSize = function () {
	        return this.markers.length;
	    };
	    Cluster.prototype.getMarkers = function () {
	        return this.markers;
	    };
	    Cluster.prototype.getCenter = function () {
	        return this.center;
	    };
	    Cluster.prototype.getMap = function () {
	        return this.map;
	    };
	    Cluster.prototype.getClusterer = function () {
	        return this.markerClusterer;
	    };
	    Cluster.prototype.getBounds = function () {
	        var bounds = new google.maps.LatLngBounds(this.center, this.center);
	        var markers = this.getMarkers();
	        for (var i = 0; i < markers.length; i++) {
	            var position = markers[i].getPosition();
	            if (position) {
	                bounds.extend(position);
	            }
	        }
	        return bounds;
	    };
	    Cluster.prototype.remove = function () {
	        this.clusterIcon.setMap(null);
	        this.markers = [];
	        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	        // @ts-ignore
	        delete this.markers;
	    };
	    Cluster.prototype.addMarker = function (marker) {
	        var _a;
	        if (this.isMarkerAlreadyAdded(marker)) {
	            return false;
	        }
	        if (!this.center) {
	            var position = marker.getPosition();
	            if (position) {
	                this.center = position;
	                this.calculateBounds();
	            }
	        }
	        else {
	            if (this.averageCenter) {
	                var position = marker.getPosition();
	                if (position) {
	                    var length_1 = this.markers.length + 1;
	                    this.center = new google.maps.LatLng((this.center.lat() * (length_1 - 1) + position.lat()) / length_1, (this.center.lng() * (length_1 - 1) + position.lng()) / length_1);
	                    this.calculateBounds();
	                }
	            }
	        }
	        marker.isAdded = true;
	        this.markers.push(marker);
	        var mCount = this.markers.length;
	        var maxZoom = this.markerClusterer.getMaxZoom();
	        var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
	        if (maxZoom !== null && typeof zoom !== 'undefined' && zoom > maxZoom) {
	            // Zoomed in past max zoom, so show the marker.
	            if (marker.getMap() !== this.map) {
	                marker.setMap(this.map);
	            }
	        }
	        else if (mCount < this.minClusterSize) {
	            // Min cluster size not reached so show the marker.
	            if (marker.getMap() !== this.map) {
	                marker.setMap(this.map);
	            }
	        }
	        else if (mCount === this.minClusterSize) {
	            // Hide the markers that were showing.
	            for (var i = 0; i < mCount; i++) {
	                this.markers[i].setMap(null);
	            }
	        }
	        else {
	            marker.setMap(null);
	        }
	        return true;
	    };
	    Cluster.prototype.isMarkerInClusterBounds = function (marker) {
	        if (this.bounds !== null) {
	            var position = marker.getPosition();
	            if (position) {
	                return this.bounds.contains(position);
	            }
	        }
	        return false;
	    };
	    Cluster.prototype.calculateBounds = function () {
	        this.bounds = this.markerClusterer.getExtendedBounds(new google.maps.LatLngBounds(this.center, this.center));
	    };
	    Cluster.prototype.updateIcon = function () {
	        var _a;
	        var mCount = this.markers.length;
	        var maxZoom = this.markerClusterer.getMaxZoom();
	        var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
	        if (maxZoom !== null && typeof zoom !== 'undefined' && zoom > maxZoom) {
	            this.clusterIcon.hide();
	            return;
	        }
	        if (mCount < this.minClusterSize) {
	            // Min cluster size not yet reached.
	            this.clusterIcon.hide();
	            return;
	        }
	        if (this.center) {
	            this.clusterIcon.setCenter(this.center);
	        }
	        this.clusterIcon.useStyle(this.markerClusterer.getCalculator()(this.markers, this.markerClusterer.getStyles().length));
	        this.clusterIcon.show();
	    };
	    Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
	        if (this.markers.includes) {
	            return this.markers.includes(marker);
	        }
	        for (var i = 0; i < this.markers.length; i++) {
	            if (marker === this.markers[i]) {
	                return true;
	            }
	        }
	        return false;
	    };
	    return Cluster;
	}());
	
	/* global google */
	/**
	 * Supports up to 9007199254740991 (Number.MAX_SAFE_INTEGER) markers
	 * which is not a problem as max array length is 4294967296 (2**32)
	 */
	function CALCULATOR(markers, numStyles) {
	    var count = markers.length;
	    var numberOfDigits = count.toString().length;
	    var index = Math.min(numberOfDigits, numStyles);
	    return {
	        text: count.toString(),
	        index: index,
	        title: '',
	    };
	}
	var BATCH_SIZE = 2000;
	var BATCH_SIZE_IE = 500;
	var IMAGE_PATH = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
	var IMAGE_EXTENSION = 'png';
	var IMAGE_SIZES = [53, 56, 66, 78, 90];
	var CLUSTERER_CLASS = 'cluster';
	var Clusterer = /** @class */ (function () {
	    function Clusterer(map, optMarkers, optOptions) {
	        if (optMarkers === void 0) { optMarkers = []; }
	        if (optOptions === void 0) { optOptions = {}; }
	        this.getMinimumClusterSize = this.getMinimumClusterSize.bind(this);
	        this.setMinimumClusterSize = this.setMinimumClusterSize.bind(this);
	        this.getEnableRetinaIcons = this.getEnableRetinaIcons.bind(this);
	        this.setEnableRetinaIcons = this.setEnableRetinaIcons.bind(this);
	        this.addToClosestCluster = this.addToClosestCluster.bind(this);
	        this.getImageExtension = this.getImageExtension.bind(this);
	        this.setImageExtension = this.setImageExtension.bind(this);
	        this.getExtendedBounds = this.getExtendedBounds.bind(this);
	        this.getAverageCenter = this.getAverageCenter.bind(this);
	        this.setAverageCenter = this.setAverageCenter.bind(this);
	        this.getTotalClusters = this.getTotalClusters.bind(this);
	        this.fitMapToMarkers = this.fitMapToMarkers.bind(this);
	        this.getIgnoreHidden = this.getIgnoreHidden.bind(this);
	        this.setIgnoreHidden = this.setIgnoreHidden.bind(this);
	        this.getClusterClass = this.getClusterClass.bind(this);
	        this.setClusterClass = this.setClusterClass.bind(this);
	        this.getTotalMarkers = this.getTotalMarkers.bind(this);
	        this.getZoomOnClick = this.getZoomOnClick.bind(this);
	        this.setZoomOnClick = this.setZoomOnClick.bind(this);
	        this.getBatchSizeIE = this.getBatchSizeIE.bind(this);
	        this.setBatchSizeIE = this.setBatchSizeIE.bind(this);
	        this.createClusters = this.createClusters.bind(this);
	        this.onZoomChanged = this.onZoomChanged.bind(this);
	        this.getImageSizes = this.getImageSizes.bind(this);
	        this.setImageSizes = this.setImageSizes.bind(this);
	        this.getCalculator = this.getCalculator.bind(this);
	        this.setCalculator = this.setCalculator.bind(this);
	        this.removeMarkers = this.removeMarkers.bind(this);
	        this.resetViewport = this.resetViewport.bind(this);
	        this.getImagePath = this.getImagePath.bind(this);
	        this.setImagePath = this.setImagePath.bind(this);
	        this.pushMarkerTo = this.pushMarkerTo.bind(this);
	        this.removeMarker = this.removeMarker.bind(this);
	        this.clearMarkers = this.clearMarkers.bind(this);
	        this.setupStyles = this.setupStyles.bind(this);
	        this.getGridSize = this.getGridSize.bind(this);
	        this.setGridSize = this.setGridSize.bind(this);
	        this.getClusters = this.getClusters.bind(this);
	        this.getMaxZoom = this.getMaxZoom.bind(this);
	        this.setMaxZoom = this.setMaxZoom.bind(this);
	        this.getMarkers = this.getMarkers.bind(this);
	        this.addMarkers = this.addMarkers.bind(this);
	        this.getStyles = this.getStyles.bind(this);
	        this.setStyles = this.setStyles.bind(this);
	        this.addMarker = this.addMarker.bind(this);
	        this.onRemove = this.onRemove.bind(this);
	        this.getTitle = this.getTitle.bind(this);
	        this.setTitle = this.setTitle.bind(this);
	        this.repaint = this.repaint.bind(this);
	        this.onIdle = this.onIdle.bind(this);
	        this.redraw = this.redraw.bind(this);
	        this.extend = this.extend.bind(this);
	        this.onAdd = this.onAdd.bind(this);
	        this.draw = this.draw.bind(this);
	        this.extend(Clusterer, google.maps.OverlayView);
	        this.markers = [];
	        this.clusters = [];
	        this.listeners = [];
	        this.activeMap = null;
	        this.ready = false;
	        this.gridSize = optOptions.gridSize || 60;
	        this.minClusterSize = optOptions.minimumClusterSize || 2;
	        this.maxZoom = optOptions.maxZoom || null;
	        this.styles = optOptions.styles || [];
	        this.title = optOptions.title || '';
	        this.zoomOnClick = true;
	        if (optOptions.zoomOnClick !== undefined) {
	            this.zoomOnClick = optOptions.zoomOnClick;
	        }
	        this.averageCenter = false;
	        if (optOptions.averageCenter !== undefined) {
	            this.averageCenter = optOptions.averageCenter;
	        }
	        this.ignoreHidden = false;
	        if (optOptions.ignoreHidden !== undefined) {
	            this.ignoreHidden = optOptions.ignoreHidden;
	        }
	        this.enableRetinaIcons = false;
	        if (optOptions.enableRetinaIcons !== undefined) {
	            this.enableRetinaIcons = optOptions.enableRetinaIcons;
	        }
	        this.imagePath = optOptions.imagePath || IMAGE_PATH;
	        this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION;
	        this.imageSizes = optOptions.imageSizes || IMAGE_SIZES;
	        this.calculator = optOptions.calculator || CALCULATOR;
	        this.batchSize = optOptions.batchSize || BATCH_SIZE;
	        this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE;
	        this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS;
	        if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
	            // Try to avoid IE timeout when processing a huge number of markers:
	            this.batchSize = this.batchSizeIE;
	        }
	        this.timerRefStatic = null;
	        this.setupStyles();
	        this.addMarkers(optMarkers, true);
	        this.setMap(map); // Note: this causes onAdd to be called
	    }
	    Clusterer.prototype.onZoomChanged = function () {
	        var _a, _b;
	        this.resetViewport(false);
	        // Workaround for this Google bug: when map is at level 0 and "-" of
	        // zoom slider is clicked, a "zoom_changed" event is fired even though
	        // the map doesn't zoom out any further. In this situation, no "idle"
	        // event is triggered so the cluster markers that have been removed
	        // do not get redrawn. Same goes for a zoom in at maxZoom.
	        if (((_a = this.getMap()) === null || _a === void 0 ? void 0 : _a.getZoom()) === (this.get('minZoom') || 0) ||
	            ((_b = this.getMap()) === null || _b === void 0 ? void 0 : _b.getZoom()) === this.get('maxZoom')) {
	            google.maps.event.trigger(this, 'idle');
	        }
	    };
	    Clusterer.prototype.onIdle = function () {
	        this.redraw();
	    };
	    Clusterer.prototype.onAdd = function () {
	        var map = this.getMap();
	        this.activeMap = map;
	        this.ready = true;
	        this.repaint();
	        if (map !== null) {
	            // Add the map event listeners
	            this.listeners = [
	                google.maps.event.addListener(map, 'zoom_changed', this.onZoomChanged),
	                google.maps.event.addListener(map, 'idle', this.onIdle),
	            ];
	        }
	    };
	    Clusterer.prototype.onRemove = function () {
	        // Put all the managed markers back on the map:
	        for (var i = 0; i < this.markers.length; i++) {
	            if (this.markers[i].getMap() !== this.activeMap) {
	                this.markers[i].setMap(this.activeMap);
	            }
	        }
	        // Remove all clusters:
	        for (var i = 0; i < this.clusters.length; i++) {
	            this.clusters[i].remove();
	        }
	        this.clusters = [];
	        // Remove map event listeners:
	        for (var i = 0; i < this.listeners.length; i++) {
	            google.maps.event.removeListener(this.listeners[i]);
	        }
	        this.listeners = [];
	        this.activeMap = null;
	        this.ready = false;
	    };
	    Clusterer.prototype.draw = function () { return; };
	    Clusterer.prototype.setupStyles = function () {
	        if (this.styles.length > 0) {
	            return;
	        }
	        for (var i = 0; i < this.imageSizes.length; i++) {
	            this.styles.push({
	                url: "".concat(this.imagePath + (i + 1), ".").concat(this.imageExtension),
	                height: this.imageSizes[i],
	                width: this.imageSizes[i],
	            });
	        }
	    };
	    Clusterer.prototype.fitMapToMarkers = function () {
	        var markers = this.getMarkers();
	        var bounds = new google.maps.LatLngBounds();
	        for (var i = 0; i < markers.length; i++) {
	            var position = markers[i].getPosition();
	            if (position) {
	                bounds.extend(position);
	            }
	        }
	        var map = this.getMap();
	        if (map !== null && 'fitBounds' in map) {
	            map.fitBounds(bounds);
	        }
	    };
	    Clusterer.prototype.getGridSize = function () {
	        return this.gridSize;
	    };
	    Clusterer.prototype.setGridSize = function (gridSize) {
	        this.gridSize = gridSize;
	    };
	    Clusterer.prototype.getMinimumClusterSize = function () {
	        return this.minClusterSize;
	    };
	    Clusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
	        this.minClusterSize = minimumClusterSize;
	    };
	    Clusterer.prototype.getMaxZoom = function () {
	        return this.maxZoom;
	    };
	    Clusterer.prototype.setMaxZoom = function (maxZoom) {
	        this.maxZoom = maxZoom;
	    };
	    Clusterer.prototype.getStyles = function () {
	        return this.styles;
	    };
	    Clusterer.prototype.setStyles = function (styles) {
	        this.styles = styles;
	    };
	    Clusterer.prototype.getTitle = function () {
	        return this.title;
	    };
	    Clusterer.prototype.setTitle = function (title) {
	        this.title = title;
	    };
	    Clusterer.prototype.getZoomOnClick = function () {
	        return this.zoomOnClick;
	    };
	    Clusterer.prototype.setZoomOnClick = function (zoomOnClick) {
	        this.zoomOnClick = zoomOnClick;
	    };
	    Clusterer.prototype.getAverageCenter = function () {
	        return this.averageCenter;
	    };
	    Clusterer.prototype.setAverageCenter = function (averageCenter) {
	        this.averageCenter = averageCenter;
	    };
	    Clusterer.prototype.getIgnoreHidden = function () {
	        return this.ignoreHidden;
	    };
	    Clusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
	        this.ignoreHidden = ignoreHidden;
	    };
	    Clusterer.prototype.getEnableRetinaIcons = function () {
	        return this.enableRetinaIcons;
	    };
	    Clusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
	        this.enableRetinaIcons = enableRetinaIcons;
	    };
	    Clusterer.prototype.getImageExtension = function () {
	        return this.imageExtension;
	    };
	    Clusterer.prototype.setImageExtension = function (imageExtension) {
	        this.imageExtension = imageExtension;
	    };
	    Clusterer.prototype.getImagePath = function () {
	        return this.imagePath;
	    };
	    Clusterer.prototype.setImagePath = function (imagePath) {
	        this.imagePath = imagePath;
	    };
	    Clusterer.prototype.getImageSizes = function () {
	        return this.imageSizes;
	    };
	    Clusterer.prototype.setImageSizes = function (imageSizes) {
	        this.imageSizes = imageSizes;
	    };
	    Clusterer.prototype.getCalculator = function () {
	        return this.calculator;
	    };
	    Clusterer.prototype.setCalculator = function (calculator) {
	        this.calculator = calculator;
	    };
	    Clusterer.prototype.getBatchSizeIE = function () {
	        return this.batchSizeIE;
	    };
	    Clusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
	        this.batchSizeIE = batchSizeIE;
	    };
	    Clusterer.prototype.getClusterClass = function () {
	        return this.clusterClass;
	    };
	    Clusterer.prototype.setClusterClass = function (clusterClass) {
	        this.clusterClass = clusterClass;
	    };
	    Clusterer.prototype.getMarkers = function () {
	        return this.markers;
	    };
	    Clusterer.prototype.getTotalMarkers = function () {
	        return this.markers.length;
	    };
	    Clusterer.prototype.getClusters = function () {
	        return this.clusters;
	    };
	    Clusterer.prototype.getTotalClusters = function () {
	        return this.clusters.length;
	    };
	    Clusterer.prototype.addMarker = function (marker, optNoDraw) {
	        this.pushMarkerTo(marker);
	        if (!optNoDraw) {
	            this.redraw();
	        }
	    };
	    Clusterer.prototype.addMarkers = function (markers, optNoDraw) {
	        for (var key in markers) {
	            if (Object.prototype.hasOwnProperty.call(markers, key)) {
	                this.pushMarkerTo(markers[key]);
	            }
	        }
	        if (!optNoDraw) {
	            this.redraw();
	        }
	    };
	    Clusterer.prototype.pushMarkerTo = function (marker) {
	        var _this = this;
	        // If the marker is draggable add a listener so we can update the clusters on the dragend:
	        if (marker.getDraggable()) {
	            google.maps.event.addListener(marker, 'dragend', function () {
	                if (_this.ready) {
	                    marker.isAdded = false;
	                    _this.repaint();
	                }
	            });
	        }
	        marker.isAdded = false;
	        this.markers.push(marker);
	    };
	    Clusterer.prototype.removeMarker_ = function (marker) {
	        var index = -1;
	        if (this.markers.indexOf) {
	            index = this.markers.indexOf(marker);
	        }
	        else {
	            for (var i = 0; i < this.markers.length; i++) {
	                if (marker === this.markers[i]) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        if (index === -1) {
	            // Marker is not in our list of markers, so do nothing:
	            return false;
	        }
	        marker.setMap(null);
	        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
	        return true;
	    };
	    Clusterer.prototype.removeMarker = function (marker, optNoDraw) {
	        var removed = this.removeMarker_(marker);
	        if (!optNoDraw && removed) {
	            this.repaint();
	        }
	        return removed;
	    };
	    Clusterer.prototype.removeMarkers = function (markers, optNoDraw) {
	        var removed = false;
	        for (var i = 0; i < markers.length; i++) {
	            removed = removed || this.removeMarker_(markers[i]);
	        }
	        if (!optNoDraw && removed) {
	            this.repaint();
	        }
	        return removed;
	    };
	    Clusterer.prototype.clearMarkers = function () {
	        this.resetViewport(true);
	        this.markers = [];
	    };
	    Clusterer.prototype.repaint = function () {
	        var oldClusters = this.clusters.slice();
	        this.clusters = [];
	        this.resetViewport(false);
	        this.redraw();
	        // Remove the old clusters.
	        // Do it in a timeout to prevent blinking effect.
	        setTimeout(function timeout() {
	            for (var i = 0; i < oldClusters.length; i++) {
	                oldClusters[i].remove();
	            }
	        }, 0);
	    };
	    Clusterer.prototype.getExtendedBounds = function (bounds) {
	        var projection = this.getProjection();
	        // Convert the points to pixels and the extend out by the grid size.
	        var trPix = projection.fromLatLngToDivPixel(
	        // Turn the bounds into latlng.
	        new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng()));
	        if (trPix !== null) {
	            trPix.x += this.gridSize;
	            trPix.y -= this.gridSize;
	        }
	        var blPix = projection.fromLatLngToDivPixel(
	        // Turn the bounds into latlng.
	        new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()));
	        if (blPix !== null) {
	            blPix.x -= this.gridSize;
	            blPix.y += this.gridSize;
	        }
	        // Extend the bounds to contain the new bounds.
	        if (trPix !== null) {
	            // Convert the pixel points back to LatLng nw
	            var point1 = projection.fromDivPixelToLatLng(trPix);
	            if (point1 !== null) {
	                bounds.extend(point1);
	            }
	        }
	        if (blPix !== null) {
	            // Convert the pixel points back to LatLng sw
	            var point2 = projection.fromDivPixelToLatLng(blPix);
	            if (point2 !== null) {
	                bounds.extend(point2);
	            }
	        }
	        return bounds;
	    };
	    Clusterer.prototype.redraw = function () {
	        // Redraws all the clusters.
	        this.createClusters(0);
	    };
	    Clusterer.prototype.resetViewport = function (optHide) {
	        // Remove all the clusters
	        for (var i = 0; i < this.clusters.length; i++) {
	            this.clusters[i].remove();
	        }
	        this.clusters = [];
	        // Reset the markers to not be added and to be removed from the map.
	        for (var i = 0; i < this.markers.length; i++) {
	            var marker = this.markers[i];
	            marker.isAdded = false;
	            if (optHide) {
	                marker.setMap(null);
	            }
	        }
	    };
	    Clusterer.prototype.distanceBetweenPoints = function (p1, p2) {
	        var R = 6371; // Radius of the Earth in km
	        var dLat = ((p2.lat() - p1.lat()) * Math.PI) / 180;
	        var dLon = ((p2.lng() - p1.lng()) * Math.PI) / 180;
	        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	            Math.cos((p1.lat() * Math.PI) / 180) *
	                Math.cos((p2.lat() * Math.PI) / 180) *
	                Math.sin(dLon / 2) *
	                Math.sin(dLon / 2);
	        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
	    };
	    Clusterer.prototype.isMarkerInBounds = function (marker, bounds) {
	        var position = marker.getPosition();
	        if (position) {
	            return bounds.contains(position);
	        }
	        return false;
	    };
	    Clusterer.prototype.addToClosestCluster = function (marker) {
	        var cluster;
	        var distance = 40000; // Some large number
	        var clusterToAddTo = null;
	        for (var i = 0; i < this.clusters.length; i++) {
	            cluster = this.clusters[i];
	            var center = cluster.getCenter();
	            var position = marker.getPosition();
	            if (center && position) {
	                var d = this.distanceBetweenPoints(center, position);
	                if (d < distance) {
	                    distance = d;
	                    clusterToAddTo = cluster;
	                }
	            }
	        }
	        if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
	            clusterToAddTo.addMarker(marker);
	        }
	        else {
	            cluster = new Cluster$1(this);
	            cluster.addMarker(marker);
	            this.clusters.push(cluster);
	        }
	    };
	    Clusterer.prototype.createClusters = function (iFirst) {
	        var _this = this;
	        if (!this.ready) {
	            return;
	        }
	        // Cancel previous batch processing if we're working on the first batch:
	        if (iFirst === 0) {
	            /**
	             * This event is fired when the <code>Clusterer</code> begins
	             *  clustering markers.
	             * @name Clusterer#clusteringbegin
	             * @param {Clusterer} mc The Clusterer whose markers are being clustered.
	             * @event
	             */
	            google.maps.event.trigger(this, 'clusteringbegin', this);
	            if (this.timerRefStatic !== null) {
	                window.clearTimeout(this.timerRefStatic);
	                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                // @ts-ignore
	                delete this.timerRefStatic;
	            }
	        }
	        var map = this.getMap();
	        var bounds = map !== null && 'getBounds' in map ? map.getBounds() : null;
	        var zoom = (map === null || map === void 0 ? void 0 : map.getZoom()) || 0;
	        // Get our current map view bounds.
	        // Create a new bounds object so we don't affect the map.
	        //
	        // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
	        var mapBounds = zoom > 3
	            ? new google.maps.LatLngBounds(bounds === null || bounds === void 0 ? void 0 : bounds.getSouthWest(), bounds === null || bounds === void 0 ? void 0 : bounds.getNorthEast())
	            : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
	        var extendedMapBounds = this.getExtendedBounds(mapBounds);
	        var iLast = Math.min(iFirst + this.batchSize, this.markers.length);
	        for (var i = iFirst; i < iLast; i++) {
	            var marker = this.markers[i];
	            if (!marker.isAdded && this.isMarkerInBounds(marker, extendedMapBounds) && (!this.ignoreHidden || (this.ignoreHidden && marker.getVisible()))) {
	                this.addToClosestCluster(marker);
	            }
	        }
	        if (iLast < this.markers.length) {
	            this.timerRefStatic = window.setTimeout(function () {
	                _this.createClusters(iLast);
	            }, 0);
	        }
	        else {
	            this.timerRefStatic = null;
	            /**
	             * This event is fired when the <code>Clusterer</code> stops
	             *  clustering markers.
	             * @name Clusterer#clusteringend
	             * @param {Clusterer} mc The Clusterer whose markers are being clustered.
	             * @event
	             */
	            google.maps.event.trigger(this, 'clusteringend', this);
	            for (var i = 0; i < this.clusters.length; i++) {
	                this.clusters[i].updateIcon();
	            }
	        }
	    };
	    Clusterer.prototype.extend = function (obj1, obj2) {
	        return function applyExtend(object) {
	            for (var property in object.prototype) {
	                // @ts-ignore
	                this.prototype[property] = object.prototype[property];
	            }
	            return this;
	        }.apply(obj1, [obj2]);
	    };
	    return Clusterer;
	}());
	
	const eventMap$e = {
	    onClick: 'click',
	    onClusteringBegin: 'clusteringbegin',
	    onClusteringEnd: 'clusteringend',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	};
	const updaterMap$e = {
	    averageCenter(instance, averageCenter) {
	        instance.setAverageCenter(averageCenter);
	    },
	    batchSizeIE(instance, batchSizeIE) {
	        instance.setBatchSizeIE(batchSizeIE);
	    },
	    calculator(instance, calculator) {
	        instance.setCalculator(calculator);
	    },
	    clusterClass(instance, clusterClass) {
	        instance.setClusterClass(clusterClass);
	    },
	    enableRetinaIcons(instance, enableRetinaIcons) {
	        instance.setEnableRetinaIcons(enableRetinaIcons);
	    },
	    gridSize(instance, gridSize) {
	        instance.setGridSize(gridSize);
	    },
	    ignoreHidden(instance, ignoreHidden) {
	        instance.setIgnoreHidden(ignoreHidden);
	    },
	    imageExtension(instance, imageExtension) {
	        instance.setImageExtension(imageExtension);
	    },
	    imagePath(instance, imagePath) {
	        instance.setImagePath(imagePath);
	    },
	    imageSizes(instance, imageSizes) {
	        instance.setImageSizes(imageSizes);
	    },
	    maxZoom(instance, maxZoom) {
	        instance.setMaxZoom(maxZoom);
	    },
	    minimumClusterSize(instance, minimumClusterSize) {
	        instance.setMinimumClusterSize(minimumClusterSize);
	    },
	    styles(instance, styles) {
	        instance.setStyles(styles);
	    },
	    title(instance, title) {
	        instance.setTitle(title);
	    },
	    zoomOnClick(instance, zoomOnClick) {
	        instance.setZoomOnClick(zoomOnClick);
	    },
	};
	function MarkerClustererFunctional({ children,
	// options,
	// averageCenter,
	// batchSizeIE,
	// calculator,
	// clusterClass,
	// enableRetinaIcons,
	// gridSize,
	// ignoreHidden,
	// imageExtension,
	// imagePath,
	// imageSizes,
	// maxZoom,
	// minimumClusterSize,
	// styles,
	// title,
	// zoomOnClick,
	// onClick,
	// onClusteringBegin,
	// onClusteringEnd,
	// onMouseOver,
	// onMouseOut,
	// onLoad,
	// onUnmount,
	 }) {
	    const [instance, /* setInstance */] = require$$0.useState(null);
	    // TODO!
	    return instance !== null
	        ? children(instance) || null
	        : null;
	}
	require$$0.memo(MarkerClustererFunctional);
	class ClustererComponent extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            markerClusterer: null,
	        };
	        this.setClustererCallback = () => {
	            if (this.state.markerClusterer !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.markerClusterer);
	            }
	        };
	    }
	    componentDidMount() {
	        if (this.context) {
	            const markerClusterer = new Clusterer(this.context, [], this.props.options);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$e,
	                eventMap: eventMap$e,
	                prevProps: {},
	                nextProps: this.props,
	                instance: markerClusterer,
	            });
	            this.setState(() => {
	                return {
	                    markerClusterer,
	                };
	            }, this.setClustererCallback);
	        }
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.markerClusterer) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$e,
	                eventMap: eventMap$e,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.markerClusterer,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.markerClusterer !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.markerClusterer);
	            }
	            unregisterEvents(this.registeredEvents);
	            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	            // @ts-ignore
	            this.state.markerClusterer.setMap(null);
	        }
	    }
	    render() {
	        return this.state.markerClusterer !== null
	            ? this.props.children(this.state.markerClusterer)
	            : null;
	    }
	}
	ClustererComponent.contextType = MapContext;
	
	// This handler prevents an event in the InfoBox from being passed on to the map.
	function cancelHandler(event) {
	    event.cancelBubble = true;
	    if (event.stopPropagation) {
	        event.stopPropagation();
	    }
	}
	var InfoBox = /** @class */ (function () {
	    function InfoBox(options) {
	        if (options === void 0) { options = {}; }
	        this.getCloseClickHandler = this.getCloseClickHandler.bind(this);
	        this.closeClickHandler = this.closeClickHandler.bind(this);
	        this.createInfoBoxDiv = this.createInfoBoxDiv.bind(this);
	        this.addClickHandler = this.addClickHandler.bind(this);
	        this.getCloseBoxImg = this.getCloseBoxImg.bind(this);
	        this.getBoxWidths = this.getBoxWidths.bind(this);
	        this.setBoxStyle = this.setBoxStyle.bind(this);
	        this.setPosition = this.setPosition.bind(this);
	        this.getPosition = this.getPosition.bind(this);
	        this.setOptions = this.setOptions.bind(this);
	        this.setContent = this.setContent.bind(this);
	        this.setVisible = this.setVisible.bind(this);
	        this.getContent = this.getContent.bind(this);
	        this.getVisible = this.getVisible.bind(this);
	        this.setZIndex = this.setZIndex.bind(this);
	        this.getZIndex = this.getZIndex.bind(this);
	        this.onRemove = this.onRemove.bind(this);
	        this.panBox = this.panBox.bind(this);
	        this.extend = this.extend.bind(this);
	        this.close = this.close.bind(this);
	        this.draw = this.draw.bind(this);
	        this.show = this.show.bind(this);
	        this.hide = this.hide.bind(this);
	        this.open = this.open.bind(this);
	        this.extend(InfoBox, google.maps.OverlayView);
	        // Standard options (in common with google.maps.InfoWindow):
	        this.content = options.content || '';
	        this.disableAutoPan = options.disableAutoPan || false;
	        this.maxWidth = options.maxWidth || 0;
	        this.pixelOffset = options.pixelOffset || new google.maps.Size(0, 0);
	        this.position = options.position || new google.maps.LatLng(0, 0);
	        this.zIndex = options.zIndex || null;
	        // Additional options (unique to InfoBox):
	        this.boxClass = options.boxClass || 'infoBox';
	        this.boxStyle = options.boxStyle || {};
	        this.closeBoxMargin = options.closeBoxMargin || '2px';
	        this.closeBoxURL = options.closeBoxURL || 'http://www.google.com/intl/en_us/mapfiles/close.gif';
	        if (options.closeBoxURL === '') {
	            this.closeBoxURL = '';
	        }
	        this.infoBoxClearance = options.infoBoxClearance || new google.maps.Size(1, 1);
	        if (typeof options.visible === 'undefined') {
	            if (typeof options.isHidden === 'undefined') {
	                options.visible = true;
	            }
	            else {
	                options.visible = !options.isHidden;
	            }
	        }
	        this.isHidden = !options.visible;
	        this.alignBottom = options.alignBottom || false;
	        this.pane = options.pane || 'floatPane';
	        this.enableEventPropagation = options.enableEventPropagation || false;
	        this.div = null;
	        this.closeListener = null;
	        this.moveListener = null;
	        this.mapListener = null;
	        this.contextListener = null;
	        this.eventListeners = null;
	        this.fixedWidthSet = null;
	    }
	    InfoBox.prototype.createInfoBoxDiv = function () {
	        var _this = this;
	        // This handler ignores the current event in the InfoBox and conditionally prevents
	        // the event from being passed on to the map. It is used for the contextmenu event.
	        var ignoreHandler = function (event) {
	            event.returnValue = false;
	            if (event.preventDefault) {
	                event.preventDefault();
	            }
	            if (!_this.enableEventPropagation) {
	                cancelHandler(event);
	            }
	        };
	        if (!this.div) {
	            this.div = document.createElement('div');
	            this.setBoxStyle();
	            if (typeof this.content === 'string') {
	                this.div.innerHTML = this.getCloseBoxImg() + this.content;
	            }
	            else {
	                this.div.innerHTML = this.getCloseBoxImg();
	                this.div.appendChild(this.content);
	            }
	            var panes = this.getPanes();
	            if (panes !== null) {
	                panes[this.pane].appendChild(this.div); // Add the InfoBox div to the DOM
	            }
	            this.addClickHandler();
	            if (this.div.style.width) {
	                this.fixedWidthSet = true;
	            }
	            else {
	                if (this.maxWidth !== 0 && this.div.offsetWidth > this.maxWidth) {
	                    this.div.style.width = this.maxWidth + 'px';
	                    this.fixedWidthSet = true;
	                }
	                else {
	                    // The following code is needed to overcome problems with MSIE
	                    var bw = this.getBoxWidths();
	                    this.div.style.width = this.div.offsetWidth - bw.left - bw.right + 'px';
	                    this.fixedWidthSet = false;
	                }
	            }
	            this.panBox(this.disableAutoPan);
	            if (!this.enableEventPropagation) {
	                this.eventListeners = [];
	                // Cancel event propagation.
	                // Note: mousemove not included (to resolve Issue 152)
	                var events = [
	                    'mousedown',
	                    'mouseover',
	                    'mouseout',
	                    'mouseup',
	                    'click',
	                    'dblclick',
	                    'touchstart',
	                    'touchend',
	                    'touchmove',
	                ];
	                for (var i = 0; i < events.length; i++) {
	                    this.eventListeners.push(google.maps.event.addListener(this.div, events[i], cancelHandler));
	                }
	                // Workaround for Google bug that causes the cursor to change to a pointer
	                // when the mouse moves over a marker underneath InfoBox.
	                this.eventListeners.push(google.maps.event.addListener(this.div, 'mouseover', function () {
	                    if (_this.div) {
	                        _this.div.style.cursor = 'default';
	                    }
	                }));
	            }
	            this.contextListener = google.maps.event.addListener(this.div, 'contextmenu', ignoreHandler);
	            /**
	             * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
	             * @name InfoBox#domready
	             * @event
	             */
	            google.maps.event.trigger(this, 'domready');
	        }
	    };
	    InfoBox.prototype.getCloseBoxImg = function () {
	        var img = '';
	        if (this.closeBoxURL !== '') {
	            img = '<img alt=""';
	            img += ' aria-hidden="true"';
	            img += " src='" + this.closeBoxURL + "'";
	            img += ' align=right'; // Do this because Opera chokes on style='float: right;'
	            img += " style='";
	            img += ' position: relative;'; // Required by MSIE
	            img += ' cursor: pointer;';
	            img += ' margin: ' + this.closeBoxMargin + ';';
	            img += "'>";
	        }
	        return img;
	    };
	    InfoBox.prototype.addClickHandler = function () {
	        this.closeListener = this.div && this.div.firstChild && this.closeBoxURL !== ''
	            ? google.maps.event.addListener(this.div.firstChild, 'click', this.getCloseClickHandler())
	            : null;
	    };
	    InfoBox.prototype.closeClickHandler = function (event) {
	        // 1.0.3 fix: Always prevent propagation of a close box click to the map:
	        event.cancelBubble = true;
	        if (event.stopPropagation) {
	            event.stopPropagation();
	        }
	        /**
	         * This event is fired when the InfoBox's close box is clicked.
	         * @name InfoBox#closeclick
	         * @event
	         */
	        google.maps.event.trigger(this, 'closeclick');
	        this.close();
	    };
	    InfoBox.prototype.getCloseClickHandler = function () {
	        return this.closeClickHandler;
	    };
	    InfoBox.prototype.panBox = function (disablePan) {
	        if (this.div && !disablePan) {
	            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	            // @ts-ignore
	            var map = this.getMap();
	            // Only pan if attached to map, not panorama
	            if (map instanceof google.maps.Map) {
	                var xOffset = 0;
	                var yOffset = 0;
	                var bounds = map.getBounds();
	                if (bounds && !bounds.contains(this.position)) {
	                    // Marker not in visible area of map, so set center
	                    // of map to the marker position first.
	                    map.setCenter(this.position);
	                }
	                var mapDiv = map.getDiv();
	                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                // @ts-ignore
	                var mapWidth = mapDiv.offsetWidth;
	                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                // @ts-ignore
	                var mapHeight = mapDiv.offsetHeight;
	                var iwOffsetX = this.pixelOffset.width;
	                var iwOffsetY = this.pixelOffset.height;
	                var iwWidth = this.div.offsetWidth;
	                var iwHeight = this.div.offsetHeight;
	                var padX = this.infoBoxClearance.width;
	                var padY = this.infoBoxClearance.height;
	                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                // @ts-ignore
	                var projection = this.getProjection();
	                var pixPosition = projection.fromLatLngToContainerPixel(this.position);
	                if (pixPosition !== null) {
	                    if (pixPosition.x < -iwOffsetX + padX) {
	                        xOffset = pixPosition.x + iwOffsetX - padX;
	                    }
	                    else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
	                        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
	                    }
	                    if (this.alignBottom) {
	                        if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
	                            yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
	                        }
	                        else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
	                            yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
	                        }
	                    }
	                    else {
	                        if (pixPosition.y < -iwOffsetY + padY) {
	                            yOffset = pixPosition.y + iwOffsetY - padY;
	                        }
	                        else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
	                            yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
	                        }
	                    }
	                }
	                if (!(xOffset === 0 && yOffset === 0)) {
	                    // Move the map to the shifted center.
	                    map.panBy(xOffset, yOffset);
	                }
	            }
	        }
	    };
	    InfoBox.prototype.setBoxStyle = function () {
	        if (this.div) {
	            // Apply style values from the style sheet defined in the boxClass parameter:
	            this.div.className = this.boxClass;
	            // Clear existing inline style values:
	            this.div.style.cssText = '';
	            // Apply style values defined in the boxStyle parameter:
	            var boxStyle = this.boxStyle;
	            for (var i in boxStyle) {
	                if (Object.prototype.hasOwnProperty.call(boxStyle, i)) {
	                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                    // @ts-ignore
	                    this.div.style[i] = boxStyle[i];
	                }
	            }
	            // Fix for iOS disappearing InfoBox problem
	            // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
	            this.div.style.webkitTransform = 'translateZ(0)';
	            // Fix up opacity style for benefit of MSIE
	            if (typeof this.div.style.opacity !== 'undefined' && this.div.style.opacity !== '') {
	                // See http://www.quirksmode.org/css/opacity.html
	                var opacity = parseFloat(this.div.style.opacity || '');
	                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                // @ts-ignore
	                this.div.style.msFilter =
	                    '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')"';
	                this.div.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
	            }
	            // Apply required styles
	            this.div.style.position = 'absolute';
	            this.div.style.visibility = 'hidden';
	            if (this.zIndex !== null) {
	                this.div.style.zIndex = this.zIndex + '';
	            }
	            if (!this.div.style.overflow) {
	                this.div.style.overflow = 'auto';
	            }
	        }
	    };
	    InfoBox.prototype.getBoxWidths = function () {
	        var bw = { top: 0, bottom: 0, left: 0, right: 0 };
	        if (!this.div) {
	            return bw;
	        }
	        if (document.defaultView) {
	            var ownerDocument = this.div.ownerDocument;
	            var computedStyle = ownerDocument && ownerDocument.defaultView
	                ? ownerDocument.defaultView.getComputedStyle(this.div, '')
	                : null;
	            if (computedStyle) {
	                // The computed styles are always in pixel units (good!)
	                bw.top = parseInt(computedStyle.borderTopWidth || '', 10) || 0;
	                bw.bottom = parseInt(computedStyle.borderBottomWidth || '', 10) || 0;
	                bw.left = parseInt(computedStyle.borderLeftWidth || '', 10) || 0;
	                bw.right = parseInt(computedStyle.borderRightWidth || '', 10) || 0;
	            }
	        }
	        else if (
	        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	        // @ts-ignore
	        document.documentElement.currentStyle // MSIE
	        ) {
	            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	            // @ts-ignore
	            var currentStyle = this.div.currentStyle;
	            if (currentStyle) {
	                // The current styles may not be in pixel units, but assume they are (bad!)
	                bw.top = parseInt(currentStyle.borderTopWidth || '', 10) || 0;
	                bw.bottom = parseInt(currentStyle.borderBottomWidth || '', 10) || 0;
	                bw.left = parseInt(currentStyle.borderLeftWidth || '', 10) || 0;
	                bw.right = parseInt(currentStyle.borderRightWidth || '', 10) || 0;
	            }
	        }
	        return bw;
	    };
	    InfoBox.prototype.onRemove = function () {
	        if (this.div && this.div.parentNode) {
	            this.div.parentNode.removeChild(this.div);
	            this.div = null;
	        }
	    };
	    InfoBox.prototype.draw = function () {
	        this.createInfoBoxDiv();
	        if (this.div) {
	            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	            // @ts-ignore
	            var projection = this.getProjection();
	            var pixPosition = projection.fromLatLngToDivPixel(this.position);
	            if (pixPosition !== null) {
	                this.div.style.left = pixPosition.x + this.pixelOffset.width + 'px';
	                if (this.alignBottom) {
	                    this.div.style.bottom = -(pixPosition.y + this.pixelOffset.height) + 'px';
	                }
	                else {
	                    this.div.style.top = pixPosition.y + this.pixelOffset.height + 'px';
	                }
	            }
	            if (this.isHidden) {
	                this.div.style.visibility = 'hidden';
	            }
	            else {
	                this.div.style.visibility = 'visible';
	            }
	        }
	    };
	    InfoBox.prototype.setOptions = function (options) {
	        if (options === void 0) { options = {}; }
	        if (typeof options.boxClass !== 'undefined') {
	            // Must be first
	            this.boxClass = options.boxClass;
	            this.setBoxStyle();
	        }
	        if (typeof options.boxStyle !== 'undefined') {
	            // Must be second
	            this.boxStyle = options.boxStyle;
	            this.setBoxStyle();
	        }
	        if (typeof options.content !== 'undefined') {
	            this.setContent(options.content);
	        }
	        if (typeof options.disableAutoPan !== 'undefined') {
	            this.disableAutoPan = options.disableAutoPan;
	        }
	        if (typeof options.maxWidth !== 'undefined') {
	            this.maxWidth = options.maxWidth;
	        }
	        if (typeof options.pixelOffset !== 'undefined') {
	            this.pixelOffset = options.pixelOffset;
	        }
	        if (typeof options.alignBottom !== 'undefined') {
	            this.alignBottom = options.alignBottom;
	        }
	        if (typeof options.position !== 'undefined') {
	            this.setPosition(options.position);
	        }
	        if (typeof options.zIndex !== 'undefined') {
	            this.setZIndex(options.zIndex);
	        }
	        if (typeof options.closeBoxMargin !== 'undefined') {
	            this.closeBoxMargin = options.closeBoxMargin;
	        }
	        if (typeof options.closeBoxURL !== 'undefined') {
	            this.closeBoxURL = options.closeBoxURL;
	        }
	        if (typeof options.infoBoxClearance !== 'undefined') {
	            this.infoBoxClearance = options.infoBoxClearance;
	        }
	        if (typeof options.isHidden !== 'undefined') {
	            this.isHidden = options.isHidden;
	        }
	        if (typeof options.visible !== 'undefined') {
	            this.isHidden = !options.visible;
	        }
	        if (typeof options.enableEventPropagation !== 'undefined') {
	            this.enableEventPropagation = options.enableEventPropagation;
	        }
	        if (this.div) {
	            this.draw();
	        }
	    };
	    InfoBox.prototype.setContent = function (content) {
	        this.content = content;
	        if (this.div) {
	            if (this.closeListener) {
	                google.maps.event.removeListener(this.closeListener);
	                this.closeListener = null;
	            }
	            // Odd code required to make things work with MSIE.
	            if (!this.fixedWidthSet) {
	                this.div.style.width = '';
	            }
	            if (typeof content === 'string') {
	                this.div.innerHTML = this.getCloseBoxImg() + content;
	            }
	            else {
	                this.div.innerHTML = this.getCloseBoxImg();
	                this.div.appendChild(content);
	            }
	            // Perverse code required to make things work with MSIE.
	            // (Ensures the close box does, in fact, float to the right.)
	            if (!this.fixedWidthSet) {
	                this.div.style.width = this.div.offsetWidth + 'px';
	                if (typeof content === 'string') {
	                    this.div.innerHTML = this.getCloseBoxImg() + content;
	                }
	                else {
	                    this.div.innerHTML = this.getCloseBoxImg();
	                    this.div.appendChild(content);
	                }
	            }
	            this.addClickHandler();
	        }
	        /**
	         * This event is fired when the content of the InfoBox changes.
	         * @name InfoBox#content_changed
	         * @event
	         */
	        google.maps.event.trigger(this, 'content_changed');
	    };
	    InfoBox.prototype.setPosition = function (latLng) {
	        this.position = latLng;
	        if (this.div) {
	            this.draw();
	        }
	        /**
	         * This event is fired when the position of the InfoBox changes.
	         * @name InfoBox#position_changed
	         * @event
	         */
	        google.maps.event.trigger(this, 'position_changed');
	    };
	    InfoBox.prototype.setVisible = function (isVisible) {
	        this.isHidden = !isVisible;
	        if (this.div) {
	            this.div.style.visibility = this.isHidden ? 'hidden' : 'visible';
	        }
	    };
	    InfoBox.prototype.setZIndex = function (index) {
	        this.zIndex = index;
	        if (this.div) {
	            this.div.style.zIndex = index + '';
	        }
	        /**
	         * This event is fired when the zIndex of the InfoBox changes.
	         * @name InfoBox#zindex_changed
	         * @event
	         */
	        google.maps.event.trigger(this, 'zindex_changed');
	    };
	    InfoBox.prototype.getContent = function () {
	        return this.content;
	    };
	    InfoBox.prototype.getPosition = function () {
	        return this.position;
	    };
	    InfoBox.prototype.getZIndex = function () {
	        return this.zIndex;
	    };
	    InfoBox.prototype.getVisible = function () {
	        var map = this.getMap();
	        return typeof map === 'undefined' || map === null ? false : !this.isHidden;
	    };
	    InfoBox.prototype.show = function () {
	        this.isHidden = false;
	        if (this.div) {
	            this.div.style.visibility = 'visible';
	        }
	    };
	    InfoBox.prototype.hide = function () {
	        this.isHidden = true;
	        if (this.div) {
	            this.div.style.visibility = 'hidden';
	        }
	    };
	    InfoBox.prototype.open = function (map, anchor) {
	        var _this = this;
	        if (anchor) {
	            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	            // @ts-ignore
	            this.position = anchor.getPosition();
	            this.moveListener = google.maps.event.addListener(anchor, 'position_changed', function () {
	                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                // @ts-ignore
	                var position = anchor.getPosition();
	                _this.setPosition(position);
	            });
	            this.mapListener = google.maps.event.addListener(anchor, 'map_changed', function () {
	                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                // @ts-ignore
	                _this.setMap(anchor.map);
	            });
	        }
	        this.setMap(map);
	        if (this.div) {
	            this.panBox();
	        }
	    };
	    InfoBox.prototype.close = function () {
	        if (this.closeListener) {
	            google.maps.event.removeListener(this.closeListener);
	            this.closeListener = null;
	        }
	        if (this.eventListeners) {
	            for (var i = 0; i < this.eventListeners.length; i++) {
	                google.maps.event.removeListener(this.eventListeners[i]);
	            }
	            this.eventListeners = null;
	        }
	        if (this.moveListener) {
	            google.maps.event.removeListener(this.moveListener);
	            this.moveListener = null;
	        }
	        if (this.mapListener) {
	            google.maps.event.removeListener(this.mapListener);
	            this.mapListener = null;
	        }
	        if (this.contextListener) {
	            google.maps.event.removeListener(this.contextListener);
	            this.contextListener = null;
	        }
	        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	        // @ts-ignore
	        this.setMap(null);
	    };
	    InfoBox.prototype.extend = function (obj1, obj2) {
	        return function applyExtend(object) {
	            for (var property in object.prototype) {
	                if (!Object.prototype.hasOwnProperty.call(this, property)) {
	                    // @ts-ignore
	                    this.prototype[property] = object.prototype[property];
	                }
	            }
	            return this;
	        }.apply(obj1, [obj2]);
	    };
	    return InfoBox;
	}());
	
	const eventMap$d = {
	    onCloseClick: 'closeclick',
	    onContentChanged: 'content_changed',
	    onDomReady: 'domready',
	    onPositionChanged: 'position_changed',
	    onZindexChanged: 'zindex_changed',
	};
	const updaterMap$d = {
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    position(instance, position) {
	        if (position instanceof google.maps.LatLng) {
	            instance.setPosition(position);
	        }
	        else {
	            instance.setPosition(new google.maps.LatLng(position.lat, position.lng));
	        }
	    },
	    visible(instance, visible) {
	        instance.setVisible(visible);
	    },
	    zIndex(instance, zIndex) {
	        instance.setZIndex(zIndex);
	    },
	};
	const defaultOptions$3 = {};
	function InfoBoxFunctional({ children, anchor, options, position, zIndex, onCloseClick, onDomReady, onContentChanged, onPositionChanged, onZindexChanged, onLoad, onUnmount }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [closeclickListener, setCloseClickListener] = require$$0.useState(null);
	    const [domreadyclickListener, setDomReadyClickListener] = require$$0.useState(null);
	    const [contentchangedclickListener, setContentChangedClickListener] = require$$0.useState(null);
	    const [positionchangedclickListener, setPositionChangedClickListener] = require$$0.useState(null);
	    const [zindexchangedclickListener, setZindexChangedClickListener] = require$$0.useState(null);
	    const containerElementRef = require$$0.useRef(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (map && instance !== null) {
	            instance.close();
	            if (anchor) {
	                instance.open(map, anchor);
	            }
	            else if (instance.getPosition()) {
	                instance.open(map);
	            }
	        }
	    }, [map, instance, anchor]);
	    require$$0.useEffect(() => {
	        if (options && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (position && instance !== null) {
	            const positionLatLng = position instanceof google.maps.LatLng
	                ? position
	                // @ts-ignore
	                : new google.maps.LatLng(position.lat, position.lng);
	            instance.setPosition(positionLatLng);
	        }
	    }, [position]);
	    require$$0.useEffect(() => {
	        if (typeof zIndex === 'number' && instance !== null) {
	            instance.setZIndex(zIndex);
	        }
	    }, [zIndex]);
	    require$$0.useEffect(() => {
	        if (instance && onCloseClick) {
	            if (closeclickListener !== null) {
	                google.maps.event.removeListener(closeclickListener);
	            }
	            setCloseClickListener(google.maps.event.addListener(instance, 'closeclick', onCloseClick));
	        }
	    }, [onCloseClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDomReady) {
	            if (domreadyclickListener !== null) {
	                google.maps.event.removeListener(domreadyclickListener);
	            }
	            setDomReadyClickListener(google.maps.event.addListener(instance, 'domready', onDomReady));
	        }
	    }, [onDomReady]);
	    require$$0.useEffect(() => {
	        if (instance && onContentChanged) {
	            if (contentchangedclickListener !== null) {
	                google.maps.event.removeListener(contentchangedclickListener);
	            }
	            setContentChangedClickListener(google.maps.event.addListener(instance, 'content_changed', onContentChanged));
	        }
	    }, [onContentChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onPositionChanged) {
	            if (positionchangedclickListener !== null) {
	                google.maps.event.removeListener(positionchangedclickListener);
	            }
	            setPositionChangedClickListener(google.maps.event.addListener(instance, 'position_changed', onPositionChanged));
	        }
	    }, [onPositionChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onZindexChanged) {
	            if (zindexchangedclickListener !== null) {
	                google.maps.event.removeListener(zindexchangedclickListener);
	            }
	            setZindexChangedClickListener(google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged));
	        }
	    }, [onZindexChanged]);
	    require$$0.useEffect(() => {
	        if (map) {
	            const _a = options || defaultOptions$3, { position } = _a, infoBoxOptions = __rest$1(_a, ["position"]);
	            let positionLatLng;
	            if (position && !(position instanceof google.maps.LatLng)) {
	                // @ts-ignore
	                positionLatLng = new google.maps.LatLng(position.lat, position.lng);
	            }
	            const infoBox = new InfoBox(Object.assign(Object.assign({}, infoBoxOptions), (positionLatLng ? { position: positionLatLng } : {})));
	            containerElementRef.current = document.createElement('div');
	            setInstance(infoBox);
	            if (onCloseClick) {
	                setCloseClickListener(google.maps.event.addListener(infoBox, 'closeclick', onCloseClick));
	            }
	            if (onDomReady) {
	                setDomReadyClickListener(google.maps.event.addListener(infoBox, 'domready', onDomReady));
	            }
	            if (onContentChanged) {
	                setContentChangedClickListener(google.maps.event.addListener(infoBox, 'content_changed', onContentChanged));
	            }
	            if (onPositionChanged) {
	                setPositionChangedClickListener(google.maps.event.addListener(infoBox, 'position_changed', onPositionChanged));
	            }
	            if (onZindexChanged) {
	                setZindexChangedClickListener(google.maps.event.addListener(infoBox, 'zindex_changed', onZindexChanged));
	            }
	            infoBox.setContent(containerElementRef.current);
	            if (anchor) {
	                infoBox.open(map, anchor);
	            }
	            else if (infoBox.getPosition()) {
	                infoBox.open(map);
	            }
	            else {
	                invariant_1(false, 'You must provide either an anchor or a position prop for <InfoBox>.');
	            }
	            if (onLoad) {
	                onLoad(infoBox);
	            }
	        }
	        return () => {
	            if (instance !== null) {
	                if (closeclickListener) {
	                    google.maps.event.removeListener(closeclickListener);
	                }
	                if (contentchangedclickListener) {
	                    google.maps.event.removeListener(contentchangedclickListener);
	                }
	                if (domreadyclickListener) {
	                    google.maps.event.removeListener(domreadyclickListener);
	                }
	                if (positionchangedclickListener) {
	                    google.maps.event.removeListener(positionchangedclickListener);
	                }
	                if (zindexchangedclickListener) {
	                    google.maps.event.removeListener(zindexchangedclickListener);
	                }
	                if (onUnmount) {
	                    onUnmount(instance);
	                }
	                instance.close();
	            }
	        };
	    }, []);
	    return containerElementRef.current ? ReactDOM.createPortal(require$$0.Children.only(children), containerElementRef.current) : null;
	}
	const InfoBoxF = require$$0.memo(InfoBoxFunctional);
	class InfoBoxComponent extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.containerElement = null;
	        this.state = {
	            infoBox: null,
	        };
	        this.open = (infoBox, anchor) => {
	            if (anchor) {
	                // @ts-ignore
	                infoBox.open(this.context, anchor);
	            }
	            else if (infoBox.getPosition()) {
	                // @ts-ignore
	                infoBox.open(this.context);
	            }
	            else {
	                invariant_1(false, 'You must provide either an anchor or a position prop for <InfoBox>.');
	            }
	        };
	        this.setInfoBoxCallback = () => {
	            if (this.state.infoBox !== null && this.containerElement !== null) {
	                this.state.infoBox.setContent(this.containerElement);
	                this.open(this.state.infoBox, this.props.anchor);
	                if (this.props.onLoad) {
	                    this.props.onLoad(this.state.infoBox);
	                }
	            }
	        };
	    }
	    componentDidMount() {
	        const _a = this.props.options || {}, { position } = _a, infoBoxOptions = __rest$1(_a, ["position"]);
	        let positionLatLng;
	        if (position && !(position instanceof google.maps.LatLng)) {
	            // @ts-ignore
	            positionLatLng = new google.maps.LatLng(position.lat, position.lng);
	        }
	        const infoBox = new InfoBox(Object.assign(Object.assign({}, infoBoxOptions), (positionLatLng ? { position: positionLatLng } : {})));
	        this.containerElement = document.createElement('div');
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$d,
	            eventMap: eventMap$d,
	            prevProps: {},
	            nextProps: this.props,
	            instance: infoBox,
	        });
	        this.setState({ infoBox }, this.setInfoBoxCallback);
	    }
	    componentDidUpdate(prevProps) {
	        const { infoBox } = this.state;
	        if (infoBox !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$d,
	                eventMap: eventMap$d,
	                prevProps,
	                nextProps: this.props,
	                instance: infoBox,
	            });
	        }
	    }
	    componentWillUnmount() {
	        const { onUnmount } = this.props;
	        const { infoBox } = this.state;
	        if (infoBox !== null) {
	            if (onUnmount) {
	                onUnmount(infoBox);
	            }
	            unregisterEvents(this.registeredEvents);
	            infoBox.close();
	        }
	    }
	    render() {
	        return this.containerElement ? ReactDOM.createPortal(require$$0.Children.only(this.props.children), this.containerElement) : null;
	    }
	}
	InfoBoxComponent.contextType = MapContext;
	
	// do not edit .js files directly - edit src/index.jst
	
	
	
	var fastDeepEqual = function equal(a, b) {
	  if (a === b) return true;
	
	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    if (a.constructor !== b.constructor) return false;
	
	    var length, i, keys;
	    if (Array.isArray(a)) {
	      length = a.length;
	      if (length != b.length) return false;
	      for (i = length; i-- !== 0;)
	        if (!equal(a[i], b[i])) return false;
	      return true;
	    }
	
	
	
	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
	
	    keys = Object.keys(a);
	    length = keys.length;
	    if (length !== Object.keys(b).length) return false;
	
	    for (i = length; i-- !== 0;)
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	
	    for (i = length; i-- !== 0;) {
	      var key = keys[i];
	
	      if (!equal(a[key], b[key])) return false;
	    }
	
	    return true;
	  }
	
	  // true if both NaN, false otherwise
	  return a!==a && b!==b;
	};
	
	var kdbush = {exports: {}};
	
	(function (module, exports) {
		(function (global, factory) {
		module.exports = factory() ;
		}(commonjsGlobal, (function () {
		function sortKD(ids, coords, nodeSize, left, right, depth) {
		    if (right - left <= nodeSize) { return; }
	
		    var m = (left + right) >> 1;
	
		    select(ids, coords, m, left, right, depth % 2);
	
		    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
		    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
		}
	
		function select(ids, coords, k, left, right, inc) {
	
		    while (right > left) {
		        if (right - left > 600) {
		            var n = right - left + 1;
		            var m = k - left + 1;
		            var z = Math.log(n);
		            var s = 0.5 * Math.exp(2 * z / 3);
		            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
		            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
		            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
		            select(ids, coords, k, newLeft, newRight, inc);
		        }
	
		        var t = coords[2 * k + inc];
		        var i = left;
		        var j = right;
	
		        swapItem(ids, coords, left, k);
		        if (coords[2 * right + inc] > t) { swapItem(ids, coords, left, right); }
	
		        while (i < j) {
		            swapItem(ids, coords, i, j);
		            i++;
		            j--;
		            while (coords[2 * i + inc] < t) { i++; }
		            while (coords[2 * j + inc] > t) { j--; }
		        }
	
		        if (coords[2 * left + inc] === t) { swapItem(ids, coords, left, j); }
		        else {
		            j++;
		            swapItem(ids, coords, j, right);
		        }
	
		        if (j <= k) { left = j + 1; }
		        if (k <= j) { right = j - 1; }
		    }
		}
	
		function swapItem(ids, coords, i, j) {
		    swap(ids, i, j);
		    swap(coords, 2 * i, 2 * j);
		    swap(coords, 2 * i + 1, 2 * j + 1);
		}
	
		function swap(arr, i, j) {
		    var tmp = arr[i];
		    arr[i] = arr[j];
		    arr[j] = tmp;
		}
	
		function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
		    var stack = [0, ids.length - 1, 0];
		    var result = [];
		    var x, y;
	
		    while (stack.length) {
		        var axis = stack.pop();
		        var right = stack.pop();
		        var left = stack.pop();
	
		        if (right - left <= nodeSize) {
		            for (var i = left; i <= right; i++) {
		                x = coords[2 * i];
		                y = coords[2 * i + 1];
		                if (x >= minX && x <= maxX && y >= minY && y <= maxY) { result.push(ids[i]); }
		            }
		            continue;
		        }
	
		        var m = Math.floor((left + right) / 2);
	
		        x = coords[2 * m];
		        y = coords[2 * m + 1];
	
		        if (x >= minX && x <= maxX && y >= minY && y <= maxY) { result.push(ids[m]); }
	
		        var nextAxis = (axis + 1) % 2;
	
		        if (axis === 0 ? minX <= x : minY <= y) {
		            stack.push(left);
		            stack.push(m - 1);
		            stack.push(nextAxis);
		        }
		        if (axis === 0 ? maxX >= x : maxY >= y) {
		            stack.push(m + 1);
		            stack.push(right);
		            stack.push(nextAxis);
		        }
		    }
	
		    return result;
		}
	
		function within(ids, coords, qx, qy, r, nodeSize) {
		    var stack = [0, ids.length - 1, 0];
		    var result = [];
		    var r2 = r * r;
	
		    while (stack.length) {
		        var axis = stack.pop();
		        var right = stack.pop();
		        var left = stack.pop();
	
		        if (right - left <= nodeSize) {
		            for (var i = left; i <= right; i++) {
		                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) { result.push(ids[i]); }
		            }
		            continue;
		        }
	
		        var m = Math.floor((left + right) / 2);
	
		        var x = coords[2 * m];
		        var y = coords[2 * m + 1];
	
		        if (sqDist(x, y, qx, qy) <= r2) { result.push(ids[m]); }
	
		        var nextAxis = (axis + 1) % 2;
	
		        if (axis === 0 ? qx - r <= x : qy - r <= y) {
		            stack.push(left);
		            stack.push(m - 1);
		            stack.push(nextAxis);
		        }
		        if (axis === 0 ? qx + r >= x : qy + r >= y) {
		            stack.push(m + 1);
		            stack.push(right);
		            stack.push(nextAxis);
		        }
		    }
	
		    return result;
		}
	
		function sqDist(ax, ay, bx, by) {
		    var dx = ax - bx;
		    var dy = ay - by;
		    return dx * dx + dy * dy;
		}
	
		var defaultGetX = function (p) { return p[0]; };
		var defaultGetY = function (p) { return p[1]; };
	
		var KDBush = function KDBush(points, getX, getY, nodeSize, ArrayType) {
		    if ( getX === void 0 ) getX = defaultGetX;
		    if ( getY === void 0 ) getY = defaultGetY;
		    if ( nodeSize === void 0 ) nodeSize = 64;
		    if ( ArrayType === void 0 ) ArrayType = Float64Array;
	
		    this.nodeSize = nodeSize;
		    this.points = points;
	
		    var IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;
	
		    var ids = this.ids = new IndexArrayType(points.length);
		    var coords = this.coords = new ArrayType(points.length * 2);
	
		    for (var i = 0; i < points.length; i++) {
		        ids[i] = i;
		        coords[2 * i] = getX(points[i]);
		        coords[2 * i + 1] = getY(points[i]);
		    }
	
		    sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
		};
	
		KDBush.prototype.range = function range$1 (minX, minY, maxX, maxY) {
		    return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
		};
	
		KDBush.prototype.within = function within$1 (x, y, r) {
		    return within(this.ids, this.coords, x, y, r, this.nodeSize);
		};
	
		return KDBush;
	
		})));
	} (kdbush));
	
	var KDBush = kdbush.exports;
	
	const defaultOptions$2 = {
	    minZoom: 0,   // min zoom to generate clusters on
	    maxZoom: 16,  // max zoom level to cluster the points on
	    minPoints: 2, // minimum points to form a cluster
	    radius: 40,   // cluster radius in pixels
	    extent: 512,  // tile extent (radius is calculated relative to it)
	    nodeSize: 64, // size of the KD-tree leaf node, affects performance
	    log: false,   // whether to log timing info
	
	    // whether to generate numeric ids for input features (in vector tiles)
	    generateId: false,
	
	    // a reduce function for calculating custom cluster properties
	    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }
	
	    // properties to use for individual points when running the reducer
	    map: props => props // props => ({sum: props.my_value})
	};
	
	const fround = Math.fround || (tmp => ((x) => { tmp[0] = +x; return tmp[0]; }))(new Float32Array(1));
	
	class Supercluster {
	    constructor(options) {
	        this.options = extend$1(Object.create(defaultOptions$2), options);
	        this.trees = new Array(this.options.maxZoom + 1);
	    }
	
	    load(points) {
	        const {log, minZoom, maxZoom, nodeSize} = this.options;
	
	        if (log) console.time('total time');
	
	        const timerId = `prepare ${  points.length  } points`;
	        if (log) console.time(timerId);
	
	        this.points = points;
	
	        // generate a cluster object for each point and index input points into a KD-tree
	        let clusters = [];
	        for (let i = 0; i < points.length; i++) {
	            if (!points[i].geometry) continue;
	            clusters.push(createPointCluster(points[i], i));
	        }
	        this.trees[maxZoom + 1] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);
	
	        if (log) console.timeEnd(timerId);
	
	        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
	        // results in a cluster hierarchy across zoom levels
	        for (let z = maxZoom; z >= minZoom; z--) {
	            const now = +Date.now();
	
	            // create a new set of clusters for the zoom and index them with a KD-tree
	            clusters = this._cluster(clusters, z);
	            this.trees[z] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);
	
	            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
	        }
	
	        if (log) console.timeEnd('total time');
	
	        return this;
	    }
	
	    getClusters(bbox, zoom) {
	        let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
	        const minLat = Math.max(-90, Math.min(90, bbox[1]));
	        let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
	        const maxLat = Math.max(-90, Math.min(90, bbox[3]));
	
	        if (bbox[2] - bbox[0] >= 360) {
	            minLng = -180;
	            maxLng = 180;
	        } else if (minLng > maxLng) {
	            const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
	            const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
	            return easternHem.concat(westernHem);
	        }
	
	        const tree = this.trees[this._limitZoom(zoom)];
	        const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
	        const clusters = [];
	        for (const id of ids) {
	            const c = tree.points[id];
	            clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
	        }
	        return clusters;
	    }
	
	    getChildren(clusterId) {
	        const originId = this._getOriginId(clusterId);
	        const originZoom = this._getOriginZoom(clusterId);
	        const errorMsg = 'No cluster with the specified id.';
	
	        const index = this.trees[originZoom];
	        if (!index) throw new Error(errorMsg);
	
	        const origin = index.points[originId];
	        if (!origin) throw new Error(errorMsg);
	
	        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
	        const ids = index.within(origin.x, origin.y, r);
	        const children = [];
	        for (const id of ids) {
	            const c = index.points[id];
	            if (c.parentId === clusterId) {
	                children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
	            }
	        }
	
	        if (children.length === 0) throw new Error(errorMsg);
	
	        return children;
	    }
	
	    getLeaves(clusterId, limit, offset) {
	        limit = limit || 10;
	        offset = offset || 0;
	
	        const leaves = [];
	        this._appendLeaves(leaves, clusterId, limit, offset, 0);
	
	        return leaves;
	    }
	
	    getTile(z, x, y) {
	        const tree = this.trees[this._limitZoom(z)];
	        const z2 = Math.pow(2, z);
	        const {extent, radius} = this.options;
	        const p = radius / extent;
	        const top = (y - p) / z2;
	        const bottom = (y + 1 + p) / z2;
	
	        const tile = {
	            features: []
	        };
	
	        this._addTileFeatures(
	            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
	            tree.points, x, y, z2, tile);
	
	        if (x === 0) {
	            this._addTileFeatures(
	                tree.range(1 - p / z2, top, 1, bottom),
	                tree.points, z2, y, z2, tile);
	        }
	        if (x === z2 - 1) {
	            this._addTileFeatures(
	                tree.range(0, top, p / z2, bottom),
	                tree.points, -1, y, z2, tile);
	        }
	
	        return tile.features.length ? tile : null;
	    }
	
	    getClusterExpansionZoom(clusterId) {
	        let expansionZoom = this._getOriginZoom(clusterId) - 1;
	        while (expansionZoom <= this.options.maxZoom) {
	            const children = this.getChildren(clusterId);
	            expansionZoom++;
	            if (children.length !== 1) break;
	            clusterId = children[0].properties.cluster_id;
	        }
	        return expansionZoom;
	    }
	
	    _appendLeaves(result, clusterId, limit, offset, skipped) {
	        const children = this.getChildren(clusterId);
	
	        for (const child of children) {
	            const props = child.properties;
	
	            if (props && props.cluster) {
	                if (skipped + props.point_count <= offset) {
	                    // skip the whole cluster
	                    skipped += props.point_count;
	                } else {
	                    // enter the cluster
	                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
	                    // exit the cluster
	                }
	            } else if (skipped < offset) {
	                // skip a single point
	                skipped++;
	            } else {
	                // add a single point
	                result.push(child);
	            }
	            if (result.length === limit) break;
	        }
	
	        return skipped;
	    }
	
	    _addTileFeatures(ids, points, x, y, z2, tile) {
	        for (const i of ids) {
	            const c = points[i];
	            const isCluster = c.numPoints;
	
	            let tags, px, py;
	            if (isCluster) {
	                tags = getClusterProperties(c);
	                px = c.x;
	                py = c.y;
	            } else {
	                const p = this.points[c.index];
	                tags = p.properties;
	                px = lngX(p.geometry.coordinates[0]);
	                py = latY(p.geometry.coordinates[1]);
	            }
	
	            const f = {
	                type: 1,
	                geometry: [[
	                    Math.round(this.options.extent * (px * z2 - x)),
	                    Math.round(this.options.extent * (py * z2 - y))
	                ]],
	                tags
	            };
	
	            // assign id
	            let id;
	            if (isCluster) {
	                id = c.id;
	            } else if (this.options.generateId) {
	                // optionally generate id
	                id = c.index;
	            } else if (this.points[c.index].id) {
	                // keep id if already assigned
	                id = this.points[c.index].id;
	            }
	
	            if (id !== undefined) f.id = id;
	
	            tile.features.push(f);
	        }
	    }
	
	    _limitZoom(z) {
	        return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
	    }
	
	    _cluster(points, zoom) {
	        const clusters = [];
	        const {radius, extent, reduce, minPoints} = this.options;
	        const r = radius / (extent * Math.pow(2, zoom));
	
	        // loop through each point
	        for (let i = 0; i < points.length; i++) {
	            const p = points[i];
	            // if we've already visited the point at this zoom level, skip it
	            if (p.zoom <= zoom) continue;
	            p.zoom = zoom;
	
	            // find all nearby points
	            const tree = this.trees[zoom + 1];
	            const neighborIds = tree.within(p.x, p.y, r);
	
	            const numPointsOrigin = p.numPoints || 1;
	            let numPoints = numPointsOrigin;
	
	            // count the number of points in a potential cluster
	            for (const neighborId of neighborIds) {
	                const b = tree.points[neighborId];
	                // filter out neighbors that are already processed
	                if (b.zoom > zoom) numPoints += b.numPoints || 1;
	            }
	
	            // if there were neighbors to merge, and there are enough points to form a cluster
	            if (numPoints > numPointsOrigin && numPoints >= minPoints) {
	                let wx = p.x * numPointsOrigin;
	                let wy = p.y * numPointsOrigin;
	
	                let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;
	
	                // encode both zoom and point index on which the cluster originated -- offset by total length of features
	                const id = (i << 5) + (zoom + 1) + this.points.length;
	
	                for (const neighborId of neighborIds) {
	                    const b = tree.points[neighborId];
	
	                    if (b.zoom <= zoom) continue;
	                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)
	
	                    const numPoints2 = b.numPoints || 1;
	                    wx += b.x * numPoints2; // accumulate coordinates for calculating weighted center
	                    wy += b.y * numPoints2;
	
	                    b.parentId = id;
	
	                    if (reduce) {
	                        if (!clusterProperties) clusterProperties = this._map(p, true);
	                        reduce(clusterProperties, this._map(b));
	                    }
	                }
	
	                p.parentId = id;
	                clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));
	
	            } else { // left points as unclustered
	                clusters.push(p);
	
	                if (numPoints > 1) {
	                    for (const neighborId of neighborIds) {
	                        const b = tree.points[neighborId];
	                        if (b.zoom <= zoom) continue;
	                        b.zoom = zoom;
	                        clusters.push(b);
	                    }
	                }
	            }
	        }
	
	        return clusters;
	    }
	
	    // get index of the point from which the cluster originated
	    _getOriginId(clusterId) {
	        return (clusterId - this.points.length) >> 5;
	    }
	
	    // get zoom of the point from which the cluster originated
	    _getOriginZoom(clusterId) {
	        return (clusterId - this.points.length) % 32;
	    }
	
	    _map(point, clone) {
	        if (point.numPoints) {
	            return clone ? extend$1({}, point.properties) : point.properties;
	        }
	        const original = this.points[point.index].properties;
	        const result = this.options.map(original);
	        return clone && result === original ? extend$1({}, result) : result;
	    }
	}
	
	function createCluster(x, y, id, numPoints, properties) {
	    return {
	        x: fround(x), // weighted cluster center; round for consistency with Float32Array index
	        y: fround(y),
	        zoom: Infinity, // the last zoom the cluster was processed at
	        id, // encodes index of the first child of the cluster and its zoom level
	        parentId: -1, // parent cluster id
	        numPoints,
	        properties
	    };
	}
	
	function createPointCluster(p, id) {
	    const [x, y] = p.geometry.coordinates;
	    return {
	        x: fround(lngX(x)), // projected point coordinates
	        y: fround(latY(y)),
	        zoom: Infinity, // the last zoom the point was processed at
	        index: id, // index of the source feature in the original input array,
	        parentId: -1 // parent cluster id
	    };
	}
	
	function getClusterJSON(cluster) {
	    return {
	        type: 'Feature',
	        id: cluster.id,
	        properties: getClusterProperties(cluster),
	        geometry: {
	            type: 'Point',
	            coordinates: [xLng(cluster.x), yLat(cluster.y)]
	        }
	    };
	}
	
	function getClusterProperties(cluster) {
	    const count = cluster.numPoints;
	    const abbrev =
	        count >= 10000 ? `${Math.round(count / 1000)  }k` :
	        count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
	    return extend$1(extend$1({}, cluster.properties), {
	        cluster: true,
	        cluster_id: cluster.id,
	        point_count: count,
	        point_count_abbreviated: abbrev
	    });
	}
	
	// longitude/latitude to spherical mercator in [0..1] range
	function lngX(lng) {
	    return lng / 360 + 0.5;
	}
	function latY(lat) {
	    const sin = Math.sin(lat * Math.PI / 180);
	    const y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
	    return y < 0 ? 0 : y > 1 ? 1 : y;
	}
	
	// spherical mercator to longitude/latitude
	function xLng(x) {
	    return (x - 0.5) * 360;
	}
	function yLat(y) {
	    const y2 = (180 - y * 360) * Math.PI / 180;
	    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
	}
	
	function extend$1(dest, src) {
	    for (const id in src) dest[id] = src[id];
	    return dest;
	}
	
	function getX(p) {
	    return p.x;
	}
	function getY(p) {
	    return p.y;
	}
	
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	
	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	class Cluster {
	    constructor({ markers, position }) {
	        this.markers = markers;
	        if (position) {
	            if (position instanceof google.maps.LatLng) {
	                this._position = position;
	            }
	            else {
	                this._position = new google.maps.LatLng(position);
	            }
	        }
	    }
	    get bounds() {
	        if (this.markers.length === 0 && !this._position) {
	            return undefined;
	        }
	        return this.markers.reduce((bounds, marker) => {
	            return bounds.extend(marker.getPosition());
	        }, new google.maps.LatLngBounds(this._position, this._position));
	    }
	    get position() {
	        return this._position || this.bounds.getCenter();
	    }
	    /**
	     * Get the count of **visible** markers.
	     */
	    get count() {
	        return this.markers.filter((m) => m.getVisible())
	            .length;
	    }
	    /**
	     * Add a marker to the cluster.
	     */
	    push(marker) {
	        this.markers.push(marker);
	    }
	    /**
	     * Cleanup references and remove marker from map.
	     */
	    delete() {
	        if (this.marker) {
	            this.marker.setMap(null);
	            delete this.marker;
	        }
	        this.markers.length = 0;
	    }
	}
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPadding) => {
	    const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPadding);
	    return markers.filter((marker) => extendedMapBounds.contains(marker.getPosition()));
	};
	/**
	 * Extends a bounds by a number of pixels in each direction.
	 */
	const extendBoundsToPaddedViewport = (bounds, projection, pixels) => {
	    const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
	    const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, pixels);
	    return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
	};
	/**
	 * @hidden
	 */
	const distanceBetweenPoints = (p1, p2) => {
	    const R = 6371; // Radius of the Earth in km
	    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
	    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
	    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	        Math.cos((p1.lat * Math.PI) / 180) *
	            Math.cos((p2.lat * Math.PI) / 180) *
	            Math.sin(dLon / 2) *
	            Math.sin(dLon / 2);
	    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    return R * c;
	};
	/**
	 * @hidden
	 */
	const latLngBoundsToPixelBounds = (bounds, projection) => {
	    return {
	        northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
	        southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest()),
	    };
	};
	/**
	 * @hidden
	 */
	const extendPixelBounds = ({ northEast, southWest }, pixels) => {
	    northEast.x += pixels;
	    northEast.y -= pixels;
	    southWest.x -= pixels;
	    southWest.y += pixels;
	    return { northEast, southWest };
	};
	/**
	 * @hidden
	 */
	const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
	    const bounds = new google.maps.LatLngBounds();
	    bounds.extend(projection.fromDivPixelToLatLng(northEast));
	    bounds.extend(projection.fromDivPixelToLatLng(southWest));
	    return bounds;
	};
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/**
	 * @hidden
	 */
	class AbstractAlgorithm {
	    constructor({ maxZoom = 16 }) {
	        this.maxZoom = maxZoom;
	    }
	    /**
	     * Helper function to bypass clustering based upon some map state such as
	     * zoom, number of markers, etc.
	     *
	     * ```typescript
	     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
	     *    if (shouldBypassClustering(map)) {
	     *      return this.noop({markers, map})
	     *    }
	     * }
	     * ```
	     */
	    noop({ markers }) {
	        return noop$1(markers);
	    }
	}
	/**
	 * Abstract viewport algorithm proves a class to filter markers by a padded
	 * viewport. This is a common optimization.
	 *
	 * @hidden
	 */
	class AbstractViewportAlgorithm extends AbstractAlgorithm {
	    constructor(_a) {
	        var { viewportPadding = 60 } = _a, options = __rest(_a, ["viewportPadding"]);
	        super(options);
	        this.viewportPadding = 60;
	        this.viewportPadding = viewportPadding;
	    }
	    calculate({ markers, map, mapCanvasProjection, }) {
	        if (map.getZoom() >= this.maxZoom) {
	            return {
	                clusters: this.noop({
	                    markers,
	                    map,
	                    mapCanvasProjection,
	                }),
	                changed: false,
	            };
	        }
	        return {
	            clusters: this.cluster({
	                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
	                map,
	                mapCanvasProjection,
	            }),
	        };
	    }
	}
	/**
	 * @hidden
	 */
	const noop$1 = (markers) => {
	    const clusters = markers.map((marker) => new Cluster({
	        position: marker.getPosition(),
	        markers: [marker],
	    }));
	    return clusters;
	};
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/**
	 * The default Grid algorithm historically used in Google Maps marker
	 * clustering.
	 *
	 * The Grid algorithm does not implement caching and markers may flash as the
	 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
	 */
	class GridAlgorithm extends AbstractViewportAlgorithm {
	    constructor(_a) {
	        var { maxDistance = 40000, gridSize = 40 } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
	        super(options);
	        this.clusters = [];
	        this.maxDistance = maxDistance;
	        this.gridSize = gridSize;
	        this.state = { zoom: null };
	    }
	    calculate({ markers, map, mapCanvasProjection, }) {
	        const state = { zoom: map.getZoom() };
	        let changed = false;
	        if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ;
	        else {
	            changed = !fastDeepEqual(this.state, state);
	        }
	        this.state = state;
	        if (map.getZoom() >= this.maxZoom) {
	            return {
	                clusters: this.noop({
	                    markers,
	                    map,
	                    mapCanvasProjection,
	                }),
	                changed: changed,
	            };
	        }
	        return {
	            clusters: this.cluster({
	                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
	                map,
	                mapCanvasProjection,
	            }),
	        };
	    }
	    cluster({ markers, map, mapCanvasProjection, }) {
	        this.clusters = [];
	        markers.forEach((marker) => {
	            this.addToClosestCluster(marker, map, mapCanvasProjection);
	        });
	        return this.clusters;
	    }
	    addToClosestCluster(marker, map, projection) {
	        let maxDistance = this.maxDistance; // Some large number
	        let cluster = null;
	        for (let i = 0; i < this.clusters.length; i++) {
	            const candidate = this.clusters[i];
	            const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), marker.getPosition().toJSON());
	            if (distance < maxDistance) {
	                maxDistance = distance;
	                cluster = candidate;
	            }
	        }
	        if (cluster &&
	            extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(marker.getPosition())) {
	            cluster.push(marker);
	        }
	        else {
	            const cluster = new Cluster({ markers: [marker] });
	            this.clusters.push(cluster);
	        }
	    }
	}
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/**
	 * Noop algorithm does not generate any clusters or filter markers by the an extended viewport.
	 */
	class NoopAlgorithm extends AbstractAlgorithm {
	    constructor(_a) {
	        var options = __rest(_a, []);
	        super(options);
	    }
	    calculate({ markers, map, mapCanvasProjection, }) {
	        return {
	            clusters: this.cluster({ markers, map, mapCanvasProjection }),
	            changed: false,
	        };
	    }
	    cluster(input) {
	        return this.noop(input);
	    }
	}
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/**
	 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
	 *
	 * @see https://www.npmjs.com/package/supercluster for more information on options.
	 */
	class SuperClusterAlgorithm extends AbstractAlgorithm {
	    constructor(_a) {
	        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
	        super({ maxZoom });
	        this.superCluster = new Supercluster(Object.assign({ maxZoom: this.maxZoom, radius }, options));
	        this.state = { zoom: null };
	    }
	    calculate(input) {
	        let changed = false;
	        if (!fastDeepEqual(input.markers, this.markers)) {
	            changed = true;
	            // TODO use proxy to avoid copy?
	            this.markers = [...input.markers];
	            const points = this.markers.map((marker) => {
	                return {
	                    type: "Feature",
	                    geometry: {
	                        type: "Point",
	                        coordinates: [
	                            marker.getPosition().lng(),
	                            marker.getPosition().lat(),
	                        ],
	                    },
	                    properties: { marker },
	                };
	            });
	            this.superCluster.load(points);
	        }
	        const state = { zoom: input.map.getZoom() };
	        if (!changed) {
	            if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ;
	            else {
	                changed = changed || !fastDeepEqual(this.state, state);
	            }
	        }
	        this.state = state;
	        if (changed) {
	            this.clusters = this.cluster(input);
	        }
	        return { clusters: this.clusters, changed };
	    }
	    cluster({ map }) {
	        return this.superCluster
	            .getClusters([-180, -90, 180, 90], Math.round(map.getZoom()))
	            .map(this.transformCluster.bind(this));
	    }
	    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
	        if (properties.cluster) {
	            return new Cluster({
	                markers: this.superCluster
	                    .getLeaves(properties.cluster_id, Infinity)
	                    .map((leaf) => leaf.properties.marker),
	                position: new google.maps.LatLng({ lat, lng }),
	            });
	        }
	        else {
	            const marker = properties.marker;
	            return new Cluster({
	                markers: [marker],
	                position: marker.getPosition(),
	            });
	        }
	    }
	}
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/**
	 * Provides statistics on all clusters in the current render cycle for use in {@link Renderer.render}.
	 */
	class ClusterStats {
	    constructor(markers, clusters) {
	        this.markers = { sum: markers.length };
	        const clusterMarkerCounts = clusters.map((a) => a.count);
	        const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
	        this.clusters = {
	            count: clusters.length,
	            markers: {
	                mean: clusterMarkerSum / clusters.length,
	                sum: clusterMarkerSum,
	                min: Math.min(...clusterMarkerCounts),
	                max: Math.max(...clusterMarkerCounts),
	            },
	        };
	    }
	}
	class DefaultRenderer {
	    /**
	     * The default render function for the library used by {@link MarkerClusterer}.
	     *
	     * Currently set to use the following:
	     *
	     * ```typescript
	     * // change color if this cluster has more markers than the mean cluster
	     * const color =
	     *   count > Math.max(10, stats.clusters.markers.mean)
	     *     ? "#ff0000"
	     *     : "#0000ff";
	     *
	     * // create svg url with fill color
	     * const svg = window.btoa(`
	     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
	     *   <circle cx="120" cy="120" opacity=".6" r="70" />
	     *   <circle cx="120" cy="120" opacity=".3" r="90" />
	     *   <circle cx="120" cy="120" opacity=".2" r="110" />
	     *   <circle cx="120" cy="120" opacity=".1" r="130" />
	     * </svg>`);
	     *
	     * // create marker using svg icon
	     * return new google.maps.Marker({
	     *   position,
	     *   icon: {
	     *     url: `data:image/svg+xml;base64,${svg}`,
	     *     scaledSize: new google.maps.Size(45, 45),
	     *   },
	     *   label: {
	     *     text: String(count),
	     *     color: "rgba(255,255,255,0.9)",
	     *     fontSize: "12px",
	     *   },
	     *   // adjust zIndex to be above other markers
	     *   zIndex: 1000 + count,
	     * });
	     * ```
	     */
	    render({ count, position }, stats) {
	        // change color if this cluster has more markers than the mean cluster
	        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
	        // create svg url with fill color
	        const svg = window.btoa(`
	  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
	    <circle cx="120" cy="120" opacity=".6" r="70" />
	    <circle cx="120" cy="120" opacity=".3" r="90" />
	    <circle cx="120" cy="120" opacity=".2" r="110" />
	  </svg>`);
	        // create marker using svg icon
	        return new google.maps.Marker({
	            position,
	            icon: {
	                url: `data:image/svg+xml;base64,${svg}`,
	                scaledSize: new google.maps.Size(45, 45),
	            },
	            label: {
	                text: String(count),
	                color: "rgba(255,255,255,0.9)",
	                fontSize: "12px",
	            },
	            title: `Cluster of ${count} markers`,
	            // adjust zIndex to be above other markers
	            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
	        });
	    }
	}
	
	/**
	 * Copyright 2019 Google LLC. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	/**
	 * Extends an object's prototype by another's.
	 *
	 * @param type1 The Type to be extended.
	 * @param type2 The Type to extend with.
	 * @ignore
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function extend(type1, type2) {
	    /* istanbul ignore next */
	    // eslint-disable-next-line prefer-const
	    for (let property in type2.prototype) {
	        type1.prototype[property] = type2.prototype[property];
	    }
	}
	/**
	 * @ignore
	 */
	class OverlayViewSafe {
	    constructor() {
	        // MarkerClusterer implements google.maps.OverlayView interface. We use the
	        // extend function to extend MarkerClusterer with google.maps.OverlayView
	        // because it might not always be available when the code is defined so we
	        // look for it at the last possible moment. If it doesn't exist now then
	        // there is no point going ahead :)
	        extend(OverlayViewSafe, google.maps.OverlayView);
	    }
	}
	
	/**
	 * Copyright 2021 Google LLC
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	var MarkerClustererEvents;
	(function (MarkerClustererEvents) {
	    MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
	    MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
	    MarkerClustererEvents["CLUSTER_CLICK"] = "click";
	})(MarkerClustererEvents || (MarkerClustererEvents = {}));
	const defaultOnClusterClickHandler = (_, cluster, map) => {
	    map.fitBounds(cluster.bounds);
	};
	/**
	 * MarkerClusterer creates and manages per-zoom-level clusters for large amounts
	 * of markers. See {@link MarkerClustererOptions} for more details.
	 *
	 */
	class MarkerClusterer extends OverlayViewSafe {
	    constructor({ map, markers = [], algorithm = new SuperClusterAlgorithm({}), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
	        super();
	        this.markers = [...markers];
	        this.clusters = [];
	        this.algorithm = algorithm;
	        this.renderer = renderer;
	        this.onClusterClick = onClusterClick;
	        if (map) {
	            this.setMap(map);
	        }
	    }
	    addMarker(marker, noDraw) {
	        if (this.markers.includes(marker)) {
	            return;
	        }
	        this.markers.push(marker);
	        if (!noDraw) {
	            this.render();
	        }
	    }
	    addMarkers(markers, noDraw) {
	        markers.forEach((marker) => {
	            this.addMarker(marker, true);
	        });
	        if (!noDraw) {
	            this.render();
	        }
	    }
	    removeMarker(marker, noDraw) {
	        const index = this.markers.indexOf(marker);
	        if (index === -1) {
	            // Marker is not in our list of markers, so do nothing:
	            return false;
	        }
	        marker.setMap(null);
	        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
	        if (!noDraw) {
	            this.render();
	        }
	        return true;
	    }
	    removeMarkers(markers, noDraw) {
	        let removed = false;
	        markers.forEach((marker) => {
	            removed = this.removeMarker(marker, true) || removed;
	        });
	        if (removed && !noDraw) {
	            this.render();
	        }
	        return removed;
	    }
	    clearMarkers(noDraw) {
	        this.markers.length = 0;
	        if (!noDraw) {
	            this.render();
	        }
	    }
	    /**
	     * Recalculates and draws all the marker clusters.
	     */
	    render() {
	        const map = this.getMap();
	        if (map instanceof google.maps.Map && this.getProjection()) {
	            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
	            const { clusters, changed } = this.algorithm.calculate({
	                markers: this.markers,
	                map,
	                mapCanvasProjection: this.getProjection(),
	            });
	            // allow algorithms to return flag on whether the clusters/markers have changed
	            if (changed || changed == undefined) {
	                // reset visibility of markers and clusters
	                this.reset();
	                // store new clusters
	                this.clusters = clusters;
	                this.renderClusters();
	            }
	            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
	        }
	    }
	    onAdd() {
	        this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
	        this.render();
	    }
	    onRemove() {
	        google.maps.event.removeListener(this.idleListener);
	        this.reset();
	    }
	    reset() {
	        this.markers.forEach((marker) => marker.setMap(null));
	        this.clusters.forEach((cluster) => cluster.delete());
	        this.clusters = [];
	    }
	    renderClusters() {
	        // generate stats to pass to renderers
	        const stats = new ClusterStats(this.markers, this.clusters);
	        const map = this.getMap();
	        this.clusters.forEach((cluster) => {
	            if (cluster.markers.length === 1) {
	                cluster.marker = cluster.markers[0];
	            }
	            else {
	                cluster.marker = this.renderer.render(cluster, stats);
	                if (this.onClusterClick) {
	                    cluster.marker.addListener("click", 
	                    /* istanbul ignore next */
	                    (event) => {
	                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
	                        this.onClusterClick(event, cluster, map);
	                    });
	                }
	            }
	            cluster.marker.setMap(map);
	        });
	    }
	}
	
	var index_esm = /*#__PURE__*/Object.freeze({
		__proto__: null,
		AbstractAlgorithm: AbstractAlgorithm,
		AbstractViewportAlgorithm: AbstractViewportAlgorithm,
		Cluster: Cluster,
		ClusterStats: ClusterStats,
		DefaultRenderer: DefaultRenderer,
		GridAlgorithm: GridAlgorithm,
		MarkerClusterer: MarkerClusterer,
		get MarkerClustererEvents () { return MarkerClustererEvents; },
		NoopAlgorithm: NoopAlgorithm,
		SuperClusterAlgorithm: SuperClusterAlgorithm,
		defaultOnClusterClickHandler: defaultOnClusterClickHandler,
		distanceBetweenPoints: distanceBetweenPoints,
		extendBoundsToPaddedViewport: extendBoundsToPaddedViewport,
		extendPixelBounds: extendPixelBounds,
		filterMarkersToPaddedViewport: filterMarkersToPaddedViewport,
		noop: noop$1,
		pixelBoundsToLatLngBounds: pixelBoundsToLatLngBounds
	});
	
	function useGoogleMarkerClusterer(options) {
	    const map = useGoogleMap();
	    const [markerClusterer, setMarkerClusterer] = require$$0.useState(null);
	    require$$0.useEffect(() => {
	        if (map && markerClusterer === null) {
	            const markerCluster = new MarkerClusterer(Object.assign(Object.assign({}, options), { map }));
	            setMarkerClusterer(markerCluster);
	        }
	    }, [map]);
	    return markerClusterer;
	}
	/** Wrapper around [@googlemaps/markerclusterer](https://github.com/googlemaps/js-markerclusterer)
	 *
	 * Accepts {@link  MarkerClustererOptionsSubset} which is a subset of  {@link MarkerClustererOptions}
	 */
	function GoogleMarkerClusterer({ children, options }) {
	    const markerClusterer = useGoogleMarkerClusterer(options);
	    return markerClusterer !== null ? children(markerClusterer) : null;
	}
	var GoogleMarkerClusterer$1 = require$$0.memo(GoogleMarkerClusterer);
	
	/* global google */
	const eventMap$c = {
	    onCloseClick: 'closeclick',
	    onContentChanged: 'content_changed',
	    onDomReady: 'domready',
	    onPositionChanged: 'position_changed',
	    onZindexChanged: 'zindex_changed',
	};
	const updaterMap$c = {
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    position(instance, position) {
	        instance.setPosition(position);
	    },
	    zIndex(instance, zIndex) {
	        instance.setZIndex(zIndex);
	    },
	};
	function InfoWindowFunctional({ children, anchor, options, position, zIndex, onCloseClick, onDomReady, onContentChanged, onPositionChanged, onZindexChanged, onLoad, onUnmount }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [closeclickListener, setCloseClickListener] = require$$0.useState(null);
	    const [domreadyclickListener, setDomReadyClickListener] = require$$0.useState(null);
	    const [contentchangedclickListener, setContentChangedClickListener] = require$$0.useState(null);
	    const [positionchangedclickListener, setPositionChangedClickListener] = require$$0.useState(null);
	    const [zindexchangedclickListener, setZindexChangedClickListener] = require$$0.useState(null);
	    const containerElementRef = require$$0.useRef(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.close();
	            if (anchor) {
	                instance.open(map, anchor);
	            }
	            else if (instance.getPosition()) {
	                instance.open(map);
	            }
	        }
	    }, [map, instance, anchor]);
	    require$$0.useEffect(() => {
	        if (options && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (position && instance !== null) {
	            instance.setPosition(position);
	        }
	    }, [position]);
	    require$$0.useEffect(() => {
	        if (typeof zIndex === 'number' && instance !== null) {
	            instance.setZIndex(zIndex);
	        }
	    }, [zIndex]);
	    require$$0.useEffect(() => {
	        if (instance && onCloseClick) {
	            if (closeclickListener !== null) {
	                google.maps.event.removeListener(closeclickListener);
	            }
	            setCloseClickListener(google.maps.event.addListener(instance, 'closeclick', onCloseClick));
	        }
	    }, [onCloseClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDomReady) {
	            if (domreadyclickListener !== null) {
	                google.maps.event.removeListener(domreadyclickListener);
	            }
	            setDomReadyClickListener(google.maps.event.addListener(instance, 'domready', onDomReady));
	        }
	    }, [onDomReady]);
	    require$$0.useEffect(() => {
	        if (instance && onContentChanged) {
	            if (contentchangedclickListener !== null) {
	                google.maps.event.removeListener(contentchangedclickListener);
	            }
	            setContentChangedClickListener(google.maps.event.addListener(instance, 'content_changed', onContentChanged));
	        }
	    }, [onContentChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onPositionChanged) {
	            if (positionchangedclickListener !== null) {
	                google.maps.event.removeListener(positionchangedclickListener);
	            }
	            setPositionChangedClickListener(google.maps.event.addListener(instance, 'position_changed', onPositionChanged));
	        }
	    }, [onPositionChanged]);
	    require$$0.useEffect(() => {
	        if (instance && onZindexChanged) {
	            if (zindexchangedclickListener !== null) {
	                google.maps.event.removeListener(zindexchangedclickListener);
	            }
	            setZindexChangedClickListener(google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged));
	        }
	    }, [onZindexChanged]);
	    require$$0.useEffect(() => {
	        const infoWindow = new google.maps.InfoWindow(Object.assign({}, (options || {})));
	        setInstance(infoWindow);
	        containerElementRef.current = document.createElement('div');
	        if (onCloseClick) {
	            setCloseClickListener(google.maps.event.addListener(infoWindow, 'closeclick', onCloseClick));
	        }
	        if (onDomReady) {
	            setDomReadyClickListener(google.maps.event.addListener(infoWindow, 'domready', onDomReady));
	        }
	        if (onContentChanged) {
	            setContentChangedClickListener(google.maps.event.addListener(infoWindow, 'content_changed', onContentChanged));
	        }
	        if (onPositionChanged) {
	            setPositionChangedClickListener(google.maps.event.addListener(infoWindow, 'position_changed', onPositionChanged));
	        }
	        if (onZindexChanged) {
	            setZindexChangedClickListener(google.maps.event.addListener(infoWindow, 'zindex_changed', onZindexChanged));
	        }
	        infoWindow.setContent(containerElementRef.current);
	        if (position) {
	            infoWindow.setPosition(position);
	        }
	        if (zIndex) {
	            infoWindow.setZIndex(zIndex);
	        }
	        if (anchor) {
	            infoWindow.open(map, anchor);
	        }
	        else if (infoWindow.getPosition()) {
	            infoWindow.open(map);
	        }
	        else {
	            invariant_1(false, `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`);
	        }
	        if (onLoad) {
	            onLoad(infoWindow);
	        }
	        return () => {
	            if (closeclickListener) {
	                google.maps.event.removeListener(closeclickListener);
	            }
	            if (contentchangedclickListener) {
	                google.maps.event.removeListener(contentchangedclickListener);
	            }
	            if (domreadyclickListener) {
	                google.maps.event.removeListener(domreadyclickListener);
	            }
	            if (positionchangedclickListener) {
	                google.maps.event.removeListener(positionchangedclickListener);
	            }
	            if (zindexchangedclickListener) {
	                google.maps.event.removeListener(zindexchangedclickListener);
	            }
	            if (onUnmount) {
	                onUnmount(infoWindow);
	            }
	            infoWindow.close();
	        };
	    }, []);
	    return containerElementRef.current ? (ReactDOM.createPortal(require$$0.Children.only(children), containerElementRef.current)) : (null);
	}
	const InfoWindowF = require$$0.memo(InfoWindowFunctional);
	class InfoWindow extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.containerElement = null;
	        this.state = {
	            infoWindow: null,
	        };
	        this.open = (infoWindow, anchor) => {
	            if (anchor) {
	                infoWindow.open(this.context, anchor);
	            }
	            else if (infoWindow.getPosition()) {
	                // @ts-ignore
	                infoWindow.open(this.context);
	            }
	            else {
	                invariant_1(false, `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`);
	            }
	        };
	        this.setInfoWindowCallback = () => {
	            if (this.state.infoWindow !== null && this.containerElement !== null) {
	                this.state.infoWindow.setContent(this.containerElement);
	                this.open(this.state.infoWindow, this.props.anchor);
	                if (this.props.onLoad) {
	                    this.props.onLoad(this.state.infoWindow);
	                }
	            }
	        };
	    }
	    componentDidMount() {
	        const infoWindow = new google.maps.InfoWindow(Object.assign({}, (this.props.options || {})));
	        this.containerElement = document.createElement('div');
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$c,
	            eventMap: eventMap$c,
	            prevProps: {},
	            nextProps: this.props,
	            instance: infoWindow,
	        });
	        this.setState(() => {
	            return {
	                infoWindow,
	            };
	        }, this.setInfoWindowCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.infoWindow !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$c,
	                eventMap: eventMap$c,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.infoWindow,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.infoWindow !== null) {
	            unregisterEvents(this.registeredEvents);
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.infoWindow);
	            }
	            this.state.infoWindow.close();
	        }
	    }
	    render() {
	        return this.containerElement ? (ReactDOM.createPortal(require$$0.Children.only(this.props.children), this.containerElement)) : (null);
	    }
	}
	InfoWindow.contextType = MapContext;
	
	const eventMap$b = {
	    onClick: 'click',
	    onDblClick: 'dblclick',
	    onDrag: 'drag',
	    onDragEnd: 'dragend',
	    onDragStart: 'dragstart',
	    onMouseDown: 'mousedown',
	    onMouseMove: 'mousemove',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseUp: 'mouseup',
	    onRightClick: 'rightclick',
	};
	const updaterMap$b = {
	    draggable(instance, draggable) {
	        instance.setDraggable(draggable);
	    },
	    editable(instance, editable) {
	        instance.setEditable(editable);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    path(instance, path) {
	        instance.setPath(path);
	    },
	    visible(instance, visible) {
	        instance.setVisible(visible);
	    },
	};
	const defaultOptions$1 = {};
	function PolylineFunctional({ options, draggable, editable, visible, path, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onLoad, onUnmount, }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [dblclickListener, setDblclickListener] = require$$0.useState(null);
	    const [dragendListener, setDragendListener] = require$$0.useState(null);
	    const [dragstartListener, setDragstartListener] = require$$0.useState(null);
	    const [mousedownListener, setMousedownListener] = require$$0.useState(null);
	    const [mousemoveListener, setMousemoveListener] = require$$0.useState(null);
	    const [mouseoutListener, setMouseoutListener] = require$$0.useState(null);
	    const [mouseoverListener, setMouseoverListener] = require$$0.useState(null);
	    const [mouseupListener, setMouseupListener] = require$$0.useState(null);
	    const [rightclickListener, setRightclickListener] = require$$0.useState(null);
	    const [clickListener, setClickListener] = require$$0.useState(null);
	    const [dragListener, setDragListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (typeof options !== 'undefined' && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (typeof draggable !== 'undefined' && instance !== null) {
	            instance.setDraggable(draggable);
	        }
	    }, [instance, draggable]);
	    require$$0.useEffect(() => {
	        if (typeof editable !== 'undefined' && instance !== null) {
	            instance.setEditable(editable);
	        }
	    }, [instance, editable]);
	    require$$0.useEffect(() => {
	        if (typeof visible !== 'undefined' && instance !== null) {
	            instance.setVisible(visible);
	        }
	    }, [instance, visible]);
	    require$$0.useEffect(() => {
	        if (typeof path !== 'undefined' && instance !== null) {
	            instance.setPath(path);
	        }
	    }, [instance, path]);
	    require$$0.useEffect(() => {
	        if (instance && onDblClick) {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragEnd) {
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragStart) {
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
	        }
	    }, [onDragStart]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseDown) {
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
	        }
	    }, [onMouseDown]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseMove) {
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
	        }
	    }, [onMouseMove]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOut) {
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
	        }
	    }, [onMouseOut]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOver) {
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
	        }
	    }, [onMouseOver]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseUp) {
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
	        }
	    }, [onMouseUp]);
	    require$$0.useEffect(() => {
	        if (instance && onRightClick) {
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
	        }
	    }, [onRightClick]);
	    require$$0.useEffect(() => {
	        if (instance && onClick) {
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDrag) {
	            if (dragListener !== null) {
	                google.maps.event.removeListener(dragListener);
	            }
	            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
	        }
	    }, [onDrag]);
	    require$$0.useEffect(() => {
	        const polyline = new google.maps.Polyline(Object.assign(Object.assign({}, (options || defaultOptions$1)), { map }));
	        if (path) {
	            polyline.setPath(path);
	        }
	        if (typeof visible !== 'undefined') {
	            polyline.setVisible(visible);
	        }
	        if (typeof editable !== 'undefined') {
	            polyline.setEditable(editable);
	        }
	        if (typeof draggable !== 'undefined') {
	            polyline.setDraggable(draggable);
	        }
	        if (onDblClick) {
	            setDblclickListener(google.maps.event.addListener(polyline, 'dblclick', onDblClick));
	        }
	        if (onDragEnd) {
	            setDragendListener(google.maps.event.addListener(polyline, 'dragend', onDragEnd));
	        }
	        if (onDragStart) {
	            setDragstartListener(google.maps.event.addListener(polyline, 'dragstart', onDragStart));
	        }
	        if (onMouseDown) {
	            setMousedownListener(google.maps.event.addListener(polyline, 'mousedown', onMouseDown));
	        }
	        if (onMouseMove) {
	            setMousemoveListener(google.maps.event.addListener(polyline, 'mousemove', onMouseMove));
	        }
	        if (onMouseOut) {
	            setMouseoutListener(google.maps.event.addListener(polyline, 'mouseout', onMouseOut));
	        }
	        if (onMouseOver) {
	            setMouseoverListener(google.maps.event.addListener(polyline, 'mouseover', onMouseOver));
	        }
	        if (onMouseUp) {
	            setMouseupListener(google.maps.event.addListener(polyline, 'mouseup', onMouseUp));
	        }
	        if (onRightClick) {
	            setRightclickListener(google.maps.event.addListener(polyline, 'rightclick', onRightClick));
	        }
	        if (onClick) {
	            setClickListener(google.maps.event.addListener(polyline, 'click', onClick));
	        }
	        if (onDrag) {
	            setDragListener(google.maps.event.addListener(polyline, 'drag', onDrag));
	        }
	        setInstance(polyline);
	        if (onLoad) {
	            onLoad(polyline);
	        }
	        return () => {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            if (onUnmount) {
	                onUnmount(polyline);
	            }
	            polyline.setMap(null);
	        };
	    }, []);
	    return null;
	}
	const PolylineF = require$$0.memo(PolylineFunctional);
	class Polyline extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            polyline: null,
	        };
	        this.setPolylineCallback = () => {
	            if (this.state.polyline !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.polyline);
	            }
	        };
	    }
	    componentDidMount() {
	        const polyline = new google.maps.Polyline(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$b,
	            eventMap: eventMap$b,
	            prevProps: {},
	            nextProps: this.props,
	            instance: polyline,
	        });
	        this.setState(function setPolyline() {
	            return {
	                polyline,
	            };
	        }, this.setPolylineCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.polyline !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$b,
	                eventMap: eventMap$b,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.polyline,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.polyline !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.polyline);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.polyline.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	Polyline.contextType = MapContext;
	
	/* global google */
	const eventMap$a = {
	    onClick: 'click',
	    onDblClick: 'dblclick',
	    onDrag: 'drag',
	    onDragEnd: 'dragend',
	    onDragStart: 'dragstart',
	    onMouseDown: 'mousedown',
	    onMouseMove: 'mousemove',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseUp: 'mouseup',
	    onRightClick: 'rightclick',
	};
	const updaterMap$a = {
	    draggable(instance, draggable) {
	        instance.setDraggable(draggable);
	    },
	    editable(instance, editable) {
	        instance.setEditable(editable);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    path(instance, path) {
	        instance.setPath(path);
	    },
	    paths(instance, paths) {
	        instance.setPaths(paths);
	    },
	    visible(instance, visible) {
	        instance.setVisible(visible);
	    },
	};
	function PolygonFunctional({ options, draggable, editable, visible, path, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onLoad, onUnmount, }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [dblclickListener, setDblclickListener] = require$$0.useState(null);
	    const [dragendListener, setDragendListener] = require$$0.useState(null);
	    const [dragstartListener, setDragstartListener] = require$$0.useState(null);
	    const [mousedownListener, setMousedownListener] = require$$0.useState(null);
	    const [mousemoveListener, setMousemoveListener] = require$$0.useState(null);
	    const [mouseoutListener, setMouseoutListener] = require$$0.useState(null);
	    const [mouseoverListener, setMouseoverListener] = require$$0.useState(null);
	    const [mouseupListener, setMouseupListener] = require$$0.useState(null);
	    const [rightclickListener, setRightclickListener] = require$$0.useState(null);
	    const [clickListener, setClickListener] = require$$0.useState(null);
	    const [dragListener, setDragListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (typeof options !== 'undefined' && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (typeof draggable !== 'undefined' && instance !== null) {
	            instance.setDraggable(draggable);
	        }
	    }, [instance, draggable]);
	    require$$0.useEffect(() => {
	        if (typeof editable !== 'undefined' && instance !== null) {
	            instance.setEditable(editable);
	        }
	    }, [instance, editable]);
	    require$$0.useEffect(() => {
	        if (typeof visible !== 'undefined' && instance !== null) {
	            instance.setVisible(visible);
	        }
	    }, [instance, visible]);
	    require$$0.useEffect(() => {
	        if (typeof path !== 'undefined' && instance !== null) {
	            instance.setPath(path);
	        }
	    }, [instance, path]);
	    require$$0.useEffect(() => {
	        if (instance && onDblClick) {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragEnd) {
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
	        }
	    }, [onDragEnd]);
	    require$$0.useEffect(() => {
	        if (instance && onDragStart) {
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
	        }
	    }, [onDragStart]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseDown) {
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
	        }
	    }, [onMouseDown]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseMove) {
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
	        }
	    }, [onMouseMove]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOut) {
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
	        }
	    }, [onMouseOut]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOver) {
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
	        }
	    }, [onMouseOver]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseUp) {
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
	        }
	    }, [onMouseUp]);
	    require$$0.useEffect(() => {
	        if (instance && onRightClick) {
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
	        }
	    }, [onRightClick]);
	    require$$0.useEffect(() => {
	        if (instance && onClick) {
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDrag) {
	            if (dragListener !== null) {
	                google.maps.event.removeListener(dragListener);
	            }
	            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
	        }
	    }, [onDrag]);
	    require$$0.useEffect(() => {
	        const polygon = new google.maps.Polygon(Object.assign(Object.assign({}, (options || {})), { map }));
	        if (path) {
	            polygon.setPath(path);
	        }
	        if (typeof visible !== 'undefined') {
	            polygon.setVisible(visible);
	        }
	        if (typeof editable !== 'undefined') {
	            polygon.setEditable(editable);
	        }
	        if (typeof draggable !== 'undefined') {
	            polygon.setDraggable(draggable);
	        }
	        if (onDblClick) {
	            setDblclickListener(google.maps.event.addListener(polygon, 'dblclick', onDblClick));
	        }
	        if (onDragEnd) {
	            setDragendListener(google.maps.event.addListener(polygon, 'dragend', onDragEnd));
	        }
	        if (onDragStart) {
	            setDragstartListener(google.maps.event.addListener(polygon, 'dragstart', onDragStart));
	        }
	        if (onMouseDown) {
	            setMousedownListener(google.maps.event.addListener(polygon, 'mousedown', onMouseDown));
	        }
	        if (onMouseMove) {
	            setMousemoveListener(google.maps.event.addListener(polygon, 'mousemove', onMouseMove));
	        }
	        if (onMouseOut) {
	            setMouseoutListener(google.maps.event.addListener(polygon, 'mouseout', onMouseOut));
	        }
	        if (onMouseOver) {
	            setMouseoverListener(google.maps.event.addListener(polygon, 'mouseover', onMouseOver));
	        }
	        if (onMouseUp) {
	            setMouseupListener(google.maps.event.addListener(polygon, 'mouseup', onMouseUp));
	        }
	        if (onRightClick) {
	            setRightclickListener(google.maps.event.addListener(polygon, 'rightclick', onRightClick));
	        }
	        if (onClick) {
	            setClickListener(google.maps.event.addListener(polygon, 'click', onClick));
	        }
	        if (onDrag) {
	            setDragListener(google.maps.event.addListener(polygon, 'drag', onDrag));
	        }
	        setInstance(polygon);
	        if (onLoad) {
	            onLoad(polygon);
	        }
	        return () => {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            if (onUnmount) {
	                onUnmount(polygon);
	            }
	            polygon.setMap(null);
	        };
	    }, []);
	    return null;
	}
	const PolygonF = require$$0.memo(PolygonFunctional);
	class Polygon extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            polygon: null,
	        };
	        this.setPolygonCallback = () => {
	            if (this.state.polygon !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.polygon);
	            }
	        };
	    }
	    componentDidMount() {
	        const polygon = new google.maps.Polygon(Object.assign(Object.assign({}, (this.props.options || {})), { 
	            // @ts-ignore
	            map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$a,
	            eventMap: eventMap$a,
	            prevProps: {},
	            nextProps: this.props,
	            instance: polygon,
	        });
	        this.setState(function setPolygon() {
	            return {
	                polygon,
	            };
	        }, this.setPolygonCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.polygon !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$a,
	                eventMap: eventMap$a,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.polygon,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.polygon !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.polygon);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.polygon && this.state.polygon.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	Polygon.contextType = MapContext;
	
	const eventMap$9 = {
	    onBoundsChanged: 'bounds_changed',
	    onClick: 'click',
	    onDblClick: 'dblclick',
	    onDrag: 'drag',
	    onDragEnd: 'dragend',
	    onDragStart: 'dragstart',
	    onMouseDown: 'mousedown',
	    onMouseMove: 'mousemove',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseUp: 'mouseup',
	    onRightClick: 'rightclick',
	};
	const updaterMap$9 = {
	    bounds(instance, bounds) {
	        instance.setBounds(bounds);
	    },
	    draggable(instance, draggable) {
	        instance.setDraggable(draggable);
	    },
	    editable(instance, editable) {
	        instance.setEditable(editable);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    visible(instance, visible) {
	        instance.setVisible(visible);
	    },
	};
	function RectangleFunctional({ options, bounds, draggable, editable, visible, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onBoundsChanged, onLoad, onUnmount, }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [dblclickListener, setDblclickListener] = require$$0.useState(null);
	    const [dragendListener, setDragendListener] = require$$0.useState(null);
	    const [dragstartListener, setDragstartListener] = require$$0.useState(null);
	    const [mousedownListener, setMousedownListener] = require$$0.useState(null);
	    const [mousemoveListener, setMousemoveListener] = require$$0.useState(null);
	    const [mouseoutListener, setMouseoutListener] = require$$0.useState(null);
	    const [mouseoverListener, setMouseoverListener] = require$$0.useState(null);
	    const [mouseupListener, setMouseupListener] = require$$0.useState(null);
	    const [rightclickListener, setRightclickListener] = require$$0.useState(null);
	    const [clickListener, setClickListener] = require$$0.useState(null);
	    const [dragListener, setDragListener] = require$$0.useState(null);
	    const [boundsChangedListener, setBoundsChangedListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (typeof options !== 'undefined' && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (typeof draggable !== 'undefined' && instance !== null) {
	            instance.setDraggable(draggable);
	        }
	    }, [instance, draggable]);
	    require$$0.useEffect(() => {
	        if (typeof editable !== 'undefined' && instance !== null) {
	            instance.setEditable(editable);
	        }
	    }, [instance, editable]);
	    require$$0.useEffect(() => {
	        if (typeof visible !== 'undefined' && instance !== null) {
	            instance.setVisible(visible);
	        }
	    }, [instance, visible]);
	    require$$0.useEffect(() => {
	        if (typeof bounds !== 'undefined' && instance !== null) {
	            instance.setBounds(bounds);
	        }
	    }, [instance, bounds]);
	    require$$0.useEffect(() => {
	        if (instance && onDblClick) {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragEnd) {
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragStart) {
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
	        }
	    }, [onDragStart]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseDown) {
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
	        }
	    }, [onMouseDown]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseMove) {
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
	        }
	    }, [onMouseMove]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOut) {
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
	        }
	    }, [onMouseOut]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOver) {
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
	        }
	    }, [onMouseOver]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseUp) {
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
	        }
	    }, [onMouseUp]);
	    require$$0.useEffect(() => {
	        if (instance && onRightClick) {
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
	        }
	    }, [onRightClick]);
	    require$$0.useEffect(() => {
	        if (instance && onClick) {
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDrag) {
	            if (dragListener !== null) {
	                google.maps.event.removeListener(dragListener);
	            }
	            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
	        }
	    }, [onDrag]);
	    require$$0.useEffect(() => {
	        if (instance && onBoundsChanged) {
	            if (boundsChangedListener !== null) {
	                google.maps.event.removeListener(boundsChangedListener);
	            }
	            setBoundsChangedListener(google.maps.event.addListener(instance, 'bounds_changed', onBoundsChanged));
	        }
	    }, [onBoundsChanged]);
	    require$$0.useEffect(() => {
	        const rectangle = new google.maps.Rectangle(Object.assign(Object.assign({}, (options || {})), { map }));
	        if (typeof visible !== 'undefined') {
	            rectangle.setVisible(visible);
	        }
	        if (typeof editable !== 'undefined') {
	            rectangle.setEditable(editable);
	        }
	        if (typeof draggable !== 'undefined') {
	            rectangle.setDraggable(draggable);
	        }
	        if (typeof bounds !== 'undefined') {
	            rectangle.setBounds(bounds);
	        }
	        if (onDblClick) {
	            setDblclickListener(google.maps.event.addListener(rectangle, 'dblclick', onDblClick));
	        }
	        if (onDragEnd) {
	            setDragendListener(google.maps.event.addListener(rectangle, 'dragend', onDragEnd));
	        }
	        if (onDragStart) {
	            setDragstartListener(google.maps.event.addListener(rectangle, 'dragstart', onDragStart));
	        }
	        if (onMouseDown) {
	            setMousedownListener(google.maps.event.addListener(rectangle, 'mousedown', onMouseDown));
	        }
	        if (onMouseMove) {
	            setMousemoveListener(google.maps.event.addListener(rectangle, 'mousemove', onMouseMove));
	        }
	        if (onMouseOut) {
	            setMouseoutListener(google.maps.event.addListener(rectangle, 'mouseout', onMouseOut));
	        }
	        if (onMouseOver) {
	            setMouseoverListener(google.maps.event.addListener(rectangle, 'mouseover', onMouseOver));
	        }
	        if (onMouseUp) {
	            setMouseupListener(google.maps.event.addListener(rectangle, 'mouseup', onMouseUp));
	        }
	        if (onRightClick) {
	            setRightclickListener(google.maps.event.addListener(rectangle, 'rightclick', onRightClick));
	        }
	        if (onClick) {
	            setClickListener(google.maps.event.addListener(rectangle, 'click', onClick));
	        }
	        if (onDrag) {
	            setDragListener(google.maps.event.addListener(rectangle, 'drag', onDrag));
	        }
	        if (onBoundsChanged) {
	            setBoundsChangedListener(google.maps.event.addListener(rectangle, 'bounds_changed', onBoundsChanged));
	        }
	        setInstance(rectangle);
	        if (onLoad) {
	            onLoad(rectangle);
	        }
	        return () => {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            if (dragListener !== null) {
	                google.maps.event.removeListener(dragListener);
	            }
	            if (boundsChangedListener !== null) {
	                google.maps.event.removeListener(boundsChangedListener);
	            }
	            if (onUnmount) {
	                onUnmount(rectangle);
	            }
	            rectangle.setMap(null);
	        };
	    }, []);
	    return null;
	}
	const RectangleF = require$$0.memo(RectangleFunctional);
	class Rectangle extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            rectangle: null,
	        };
	        this.setRectangleCallback = () => {
	            if (this.state.rectangle !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.rectangle);
	            }
	        };
	    }
	    componentDidMount() {
	        const rectangle = new google.maps.Rectangle(Object.assign(Object.assign({}, (this.props.options || {})), { 
	            // @ts-ignore
	            map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$9,
	            eventMap: eventMap$9,
	            prevProps: {},
	            nextProps: this.props,
	            instance: rectangle,
	        });
	        this.setState(function setRectangle() {
	            return {
	                rectangle,
	            };
	        }, this.setRectangleCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.rectangle !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$9,
	                eventMap: eventMap$9,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.rectangle,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.rectangle !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.rectangle);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.rectangle.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	Rectangle.contextType = MapContext;
	
	const eventMap$8 = {
	    onCenterChanged: 'center_changed',
	    onRadiusChanged: 'radius_changed',
	    onClick: 'click',
	    onDblClick: 'dblclick',
	    onDrag: 'drag',
	    onDragEnd: 'dragend',
	    onDragStart: 'dragstart',
	    onMouseDown: 'mousedown',
	    onMouseMove: 'mousemove',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseUp: 'mouseup',
	    onRightClick: 'rightclick',
	};
	const updaterMap$8 = {
	    center(instance, center) {
	        instance.setCenter(center);
	    },
	    draggable(instance, draggable) {
	        instance.setDraggable(draggable);
	    },
	    editable(instance, editable) {
	        instance.setEditable(editable);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    radius(instance, radius) {
	        instance.setRadius(radius);
	    },
	    visible(instance, visible) {
	        instance.setVisible(visible);
	    },
	};
	const defaultOptions = {};
	function CircleFunctional({ options, center, radius, draggable, editable, visible, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onCenterChanged, onRadiusChanged, onLoad, onUnmount, }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [dblclickListener, setDblclickListener] = require$$0.useState(null);
	    const [dragendListener, setDragendListener] = require$$0.useState(null);
	    const [dragstartListener, setDragstartListener] = require$$0.useState(null);
	    const [mousedownListener, setMousedownListener] = require$$0.useState(null);
	    const [mousemoveListener, setMousemoveListener] = require$$0.useState(null);
	    const [mouseoutListener, setMouseoutListener] = require$$0.useState(null);
	    const [mouseoverListener, setMouseoverListener] = require$$0.useState(null);
	    const [mouseupListener, setMouseupListener] = require$$0.useState(null);
	    const [rightclickListener, setRightclickListener] = require$$0.useState(null);
	    const [clickListener, setClickListener] = require$$0.useState(null);
	    const [dragListener, setDragListener] = require$$0.useState(null);
	    const [centerChangedListener, setCenterChangedListener] = require$$0.useState(null);
	    const [radiusChangedListener, setRadiusChangedListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (typeof options !== 'undefined' && instance !== null) {
	            instance.setOptions(options);
	        }
	    }, [instance, options]);
	    require$$0.useEffect(() => {
	        if (typeof draggable !== 'undefined' && instance !== null) {
	            instance.setDraggable(draggable);
	        }
	    }, [instance, draggable]);
	    require$$0.useEffect(() => {
	        if (typeof editable !== 'undefined' && instance !== null) {
	            instance.setEditable(editable);
	        }
	    }, [instance, editable]);
	    require$$0.useEffect(() => {
	        if (typeof visible !== 'undefined' && instance !== null) {
	            instance.setVisible(visible);
	        }
	    }, [instance, visible]);
	    require$$0.useEffect(() => {
	        if (typeof radius === 'number' && instance !== null) {
	            instance.setRadius(radius);
	        }
	    }, [instance, radius]);
	    require$$0.useEffect(() => {
	        if (typeof center !== 'undefined' && instance !== null) {
	            instance.setCenter(center);
	        }
	    }, [instance, center]);
	    require$$0.useEffect(() => {
	        if (instance && onDblClick) {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragEnd) {
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDragStart) {
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
	        }
	    }, [onDragStart]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseDown) {
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
	        }
	    }, [onMouseDown]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseMove) {
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
	        }
	    }, [onMouseMove]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOut) {
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
	        }
	    }, [onMouseOut]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOver) {
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
	        }
	    }, [onMouseOver]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseUp) {
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
	        }
	    }, [onMouseUp]);
	    require$$0.useEffect(() => {
	        if (instance && onRightClick) {
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
	        }
	    }, [onRightClick]);
	    require$$0.useEffect(() => {
	        if (instance && onClick) {
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (instance && onDrag) {
	            if (dragListener !== null) {
	                google.maps.event.removeListener(dragListener);
	            }
	            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
	        }
	    }, [onDrag]);
	    require$$0.useEffect(() => {
	        if (instance && onCenterChanged) {
	            if (centerChangedListener !== null) {
	                google.maps.event.removeListener(centerChangedListener);
	            }
	            setCenterChangedListener(google.maps.event.addListener(instance, 'center_changed', onCenterChanged));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (instance && onRadiusChanged) {
	            if (radiusChangedListener !== null) {
	                google.maps.event.removeListener(radiusChangedListener);
	            }
	            setRadiusChangedListener(google.maps.event.addListener(instance, 'radius_changed', onRadiusChanged));
	        }
	    }, [onRadiusChanged]);
	    require$$0.useEffect(() => {
	        const circle = new google.maps.Circle(Object.assign(Object.assign({}, (options || defaultOptions)), { map }));
	        if (typeof radius === 'number') {
	            circle.setRadius(radius);
	        }
	        if (typeof center !== 'undefined') {
	            circle.setCenter(center);
	        }
	        if (typeof radius === 'number') {
	            circle.setRadius(radius);
	        }
	        if (typeof visible !== 'undefined') {
	            circle.setVisible(visible);
	        }
	        if (typeof editable !== 'undefined') {
	            circle.setEditable(editable);
	        }
	        if (typeof draggable !== 'undefined') {
	            circle.setDraggable(draggable);
	        }
	        if (onDblClick) {
	            setDblclickListener(google.maps.event.addListener(circle, 'dblclick', onDblClick));
	        }
	        if (onDragEnd) {
	            setDragendListener(google.maps.event.addListener(circle, 'dragend', onDragEnd));
	        }
	        if (onDragStart) {
	            setDragstartListener(google.maps.event.addListener(circle, 'dragstart', onDragStart));
	        }
	        if (onMouseDown) {
	            setMousedownListener(google.maps.event.addListener(circle, 'mousedown', onMouseDown));
	        }
	        if (onMouseMove) {
	            setMousemoveListener(google.maps.event.addListener(circle, 'mousemove', onMouseMove));
	        }
	        if (onMouseOut) {
	            setMouseoutListener(google.maps.event.addListener(circle, 'mouseout', onMouseOut));
	        }
	        if (onMouseOver) {
	            setMouseoverListener(google.maps.event.addListener(circle, 'mouseover', onMouseOver));
	        }
	        if (onMouseUp) {
	            setMouseupListener(google.maps.event.addListener(circle, 'mouseup', onMouseUp));
	        }
	        if (onRightClick) {
	            setRightclickListener(google.maps.event.addListener(circle, 'rightclick', onRightClick));
	        }
	        if (onClick) {
	            setClickListener(google.maps.event.addListener(circle, 'click', onClick));
	        }
	        if (onDrag) {
	            setDragListener(google.maps.event.addListener(circle, 'drag', onDrag));
	        }
	        if (onCenterChanged) {
	            setCenterChangedListener(google.maps.event.addListener(circle, 'center_changed', onCenterChanged));
	        }
	        if (onRadiusChanged) {
	            setRadiusChangedListener(google.maps.event.addListener(circle, 'radius_changed', onRadiusChanged));
	        }
	        setInstance(circle);
	        if (onLoad) {
	            onLoad(circle);
	        }
	        return () => {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            if (dragendListener !== null) {
	                google.maps.event.removeListener(dragendListener);
	            }
	            if (dragstartListener !== null) {
	                google.maps.event.removeListener(dragstartListener);
	            }
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            if (centerChangedListener !== null) {
	                google.maps.event.removeListener(centerChangedListener);
	            }
	            if (radiusChangedListener !== null) {
	                google.maps.event.removeListener(radiusChangedListener);
	            }
	            if (onUnmount) {
	                onUnmount(circle);
	            }
	            circle.setMap(null);
	        };
	    }, []);
	    return null;
	}
	const CircleF = require$$0.memo(CircleFunctional);
	class Circle extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            circle: null,
	        };
	        this.setCircleCallback = () => {
	            if (this.state.circle !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.circle);
	            }
	        };
	    }
	    componentDidMount() {
	        const circle = new google.maps.Circle(Object.assign(Object.assign({}, (this.props.options || {})), { 
	            // @ts-ignore
	            map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$8,
	            eventMap: eventMap$8,
	            prevProps: {},
	            nextProps: this.props,
	            instance: circle,
	        });
	        this.setState(function setCircle() {
	            return {
	                circle,
	            };
	        }, this.setCircleCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.circle !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$8,
	                eventMap: eventMap$8,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.circle,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.circle !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.circle);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.circle && this.state.circle.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	Circle.contextType = MapContext;
	
	const eventMap$7 = {
	    onClick: 'click',
	    onDblClick: 'dblclick',
	    onMouseDown: 'mousedown',
	    onMouseOut: 'mouseout',
	    onMouseOver: 'mouseover',
	    onMouseUp: 'mouseup',
	    onRightClick: 'rightclick',
	    onAddFeature: 'addfeature',
	    onRemoveFeature: 'removefeature',
	    onRemoveProperty: 'removeproperty',
	    onSetGeometry: 'setgeometry',
	    onSetProperty: 'setproperty',
	};
	const updaterMap$7 = {
	    add(instance, feature) {
	        instance.add(feature);
	    },
	    addgeojson(instance, geojson, options) {
	        instance.addGeoJson(geojson, options);
	    },
	    contains(instance, feature) {
	        instance.contains(feature);
	    },
	    foreach(instance, callback) {
	        instance.forEach(callback);
	    },
	    loadgeojson(instance, url, options, callback) {
	        instance.loadGeoJson(url, options, callback);
	    },
	    overridestyle(instance, feature, style) {
	        instance.overrideStyle(feature, style);
	    },
	    remove(instance, feature) {
	        instance.remove(feature);
	    },
	    revertstyle(instance, feature) {
	        instance.revertStyle(feature);
	    },
	    controlposition(instance, controlPosition) {
	        instance.setControlPosition(controlPosition);
	    },
	    controls(instance, controls) {
	        instance.setControls(controls);
	    },
	    drawingmode(instance, mode) {
	        instance.setDrawingMode(mode);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    style(instance, style) {
	        instance.setStyle(style);
	    },
	    togeojson(instance, callback) {
	        instance.toGeoJson(callback);
	    },
	};
	function DataFunctional({ options, onClick, onDblClick, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onAddFeature, onRemoveFeature, onRemoveProperty, onSetGeometry, onSetProperty, onLoad, onUnmount, }) {
	    const map = require$$0.useContext(MapContext);
	    const [instance, setInstance] = require$$0.useState(null);
	    const [dblclickListener, setDblclickListener] = require$$0.useState(null);
	    const [mousedownListener, setMousedownListener] = require$$0.useState(null);
	    const [mousemoveListener, setMousemoveListener] = require$$0.useState(null);
	    const [mouseoutListener, setMouseoutListener] = require$$0.useState(null);
	    const [mouseoverListener, setMouseoverListener] = require$$0.useState(null);
	    const [mouseupListener, setMouseupListener] = require$$0.useState(null);
	    const [rightclickListener, setRightclickListener] = require$$0.useState(null);
	    const [clickListener, setClickListener] = require$$0.useState(null);
	    const [addFeatureListener, setAddFeatureListener] = require$$0.useState(null);
	    const [removeFeatureListener, setRemoveFeatureListener] = require$$0.useState(null);
	    const [removePropertyListener, setRemovePropertyListener] = require$$0.useState(null);
	    const [setGeometryListener, setSetGeometryListener] = require$$0.useState(null);
	    const [setPropertyListener, setSetPropertyListener] = require$$0.useState(null);
	    // Order does matter
	    require$$0.useEffect(() => {
	        if (instance !== null) {
	            instance.setMap(map);
	        }
	    }, [map]);
	    require$$0.useEffect(() => {
	        if (instance && onDblClick) {
	            if (dblclickListener !== null) {
	                google.maps.event.removeListener(dblclickListener);
	            }
	            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
	        }
	    }, [onDblClick]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseDown) {
	            if (mousedownListener !== null) {
	                google.maps.event.removeListener(mousedownListener);
	            }
	            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
	        }
	    }, [onMouseDown]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseMove) {
	            if (mousemoveListener !== null) {
	                google.maps.event.removeListener(mousemoveListener);
	            }
	            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
	        }
	    }, [onMouseMove]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOut) {
	            if (mouseoutListener !== null) {
	                google.maps.event.removeListener(mouseoutListener);
	            }
	            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
	        }
	    }, [onMouseOut]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseOver) {
	            if (mouseoverListener !== null) {
	                google.maps.event.removeListener(mouseoverListener);
	            }
	            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
	        }
	    }, [onMouseOver]);
	    require$$0.useEffect(() => {
	        if (instance && onMouseUp) {
	            if (mouseupListener !== null) {
	                google.maps.event.removeListener(mouseupListener);
	            }
	            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
	        }
	    }, [onMouseUp]);
	    require$$0.useEffect(() => {
	        if (instance && onRightClick) {
	            if (rightclickListener !== null) {
	                google.maps.event.removeListener(rightclickListener);
	            }
	            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
	        }
	    }, [onRightClick]);
	    require$$0.useEffect(() => {
	        if (instance && onClick) {
	            if (clickListener !== null) {
	                google.maps.event.removeListener(clickListener);
	            }
	            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
	        }
	    }, [onClick]);
	    require$$0.useEffect(() => {
	        if (instance && onAddFeature) {
	            if (addFeatureListener !== null) {
	                google.maps.event.removeListener(addFeatureListener);
	            }
	            setAddFeatureListener(google.maps.event.addListener(instance, 'addfeature', onAddFeature));
	        }
	    }, [onAddFeature]);
	    require$$0.useEffect(() => {
	        if (instance && onRemoveFeature) {
	            if (removeFeatureListener !== null) {
	                google.maps.event.removeListener(removeFeatureListener);
	            }
	            setRemoveFeatureListener(google.maps.event.addListener(instance, 'removefeature', onRemoveFeature));
	        }
	    }, [onRemoveFeature]);
	    require$$0.useEffect(() => {
	        if (instance && onRemoveProperty) {
	            if (removePropertyListener !== null) {
	                google.maps.event.removeListener(removePropertyListener);
	            }
	            setRemovePropertyListener(google.maps.event.addListener(instance, 'removeproperty', onRemoveProperty));
	        }
	    }, [onRemoveProperty]);
	    require$$0.useEffect(() => {
	        if (instance && onSetGeometry) {
	            if (setGeometryListener !== null) {
	                google.maps.event.removeListener(setGeometryListener);
	            }
	            setSetGeometryListener(google.maps.event.addListener(instance, 'setgeometry', onSetGeometry));
	        }
	    }, [onSetGeometry]);
	    require$$0.useEffect(() => {
	        if (instance && onSetProperty) {
	            if (setPropertyListener !== null) {
	                google.maps.event.removeListener(setPropertyListener);
	            }
	            setSetPropertyListener(google.maps.event.addListener(instance, 'setproperty', onSetProperty));
	        }
	    }, [onSetProperty]);
	    require$$0.useEffect(() => {
	        if (map !== null) {
	            const data = new google.maps.Data(Object.assign(Object.assign({}, (options || {})), { map }));
	            if (onDblClick) {
	                setDblclickListener(google.maps.event.addListener(data, 'dblclick', onDblClick));
	            }
	            if (onMouseDown) {
	                setMousedownListener(google.maps.event.addListener(data, 'mousedown', onMouseDown));
	            }
	            if (onMouseMove) {
	                setMousemoveListener(google.maps.event.addListener(data, 'mousemove', onMouseMove));
	            }
	            if (onMouseOut) {
	                setMouseoutListener(google.maps.event.addListener(data, 'mouseout', onMouseOut));
	            }
	            if (onMouseOver) {
	                setMouseoverListener(google.maps.event.addListener(data, 'mouseover', onMouseOver));
	            }
	            if (onMouseUp) {
	                setMouseupListener(google.maps.event.addListener(data, 'mouseup', onMouseUp));
	            }
	            if (onRightClick) {
	                setRightclickListener(google.maps.event.addListener(data, 'rightclick', onRightClick));
	            }
	            if (onClick) {
	                setClickListener(google.maps.event.addListener(data, 'click', onClick));
	            }
	            if (onAddFeature) {
	                setAddFeatureListener(google.maps.event.addListener(data, 'addfeature', onAddFeature));
	            }
	            if (onRemoveFeature) {
	                setRemoveFeatureListener(google.maps.event.addListener(data, 'removefeature', onRemoveFeature));
	            }
	            if (onRemoveProperty) {
	                setRemovePropertyListener(google.maps.event.addListener(data, 'removeproperty', onRemoveProperty));
	            }
	            if (onSetGeometry) {
	                setSetGeometryListener(google.maps.event.addListener(data, 'setgeometry', onSetGeometry));
	            }
	            if (onSetProperty) {
	                setSetPropertyListener(google.maps.event.addListener(data, 'setproperty', onSetProperty));
	            }
	            setInstance(data);
	            if (onLoad) {
	                onLoad(data);
	            }
	        }
	        return () => {
	            if (instance) {
	                if (dblclickListener !== null) {
	                    google.maps.event.removeListener(dblclickListener);
	                }
	                if (mousedownListener !== null) {
	                    google.maps.event.removeListener(mousedownListener);
	                }
	                if (mousemoveListener !== null) {
	                    google.maps.event.removeListener(mousemoveListener);
	                }
	                if (mouseoutListener !== null) {
	                    google.maps.event.removeListener(mouseoutListener);
	                }
	                if (mouseoverListener !== null) {
	                    google.maps.event.removeListener(mouseoverListener);
	                }
	                if (mouseupListener !== null) {
	                    google.maps.event.removeListener(mouseupListener);
	                }
	                if (rightclickListener !== null) {
	                    google.maps.event.removeListener(rightclickListener);
	                }
	                if (clickListener !== null) {
	                    google.maps.event.removeListener(clickListener);
	                }
	                if (addFeatureListener !== null) {
	                    google.maps.event.removeListener(addFeatureListener);
	                }
	                if (removeFeatureListener !== null) {
	                    google.maps.event.removeListener(removeFeatureListener);
	                }
	                if (removePropertyListener !== null) {
	                    google.maps.event.removeListener(removePropertyListener);
	                }
	                if (setGeometryListener !== null) {
	                    google.maps.event.removeListener(setGeometryListener);
	                }
	                if (setPropertyListener !== null) {
	                    google.maps.event.removeListener(setPropertyListener);
	                }
	                if (onUnmount) {
	                    onUnmount(instance);
	                }
	                instance.setMap(null);
	            }
	        };
	    }, []);
	    return null;
	}
	const DataF = require$$0.memo(DataFunctional);
	class Data extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            data: null,
	        };
	        this.setDataCallback = () => {
	            if (this.state.data !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.data);
	            }
	        };
	    }
	    componentDidMount() {
	        if (this.context !== null) {
	            const data = new google.maps.Data(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$7,
	                eventMap: eventMap$7,
	                prevProps: {},
	                nextProps: this.props,
	                instance: data,
	            });
	            this.setState(() => {
	                return {
	                    data,
	                };
	            }, this.setDataCallback);
	        }
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.data !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$7,
	                eventMap: eventMap$7,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.data,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.data !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.data);
	            }
	            unregisterEvents(this.registeredEvents);
	            if (this.state.data) {
	                this.state.data.setMap(null);
	            }
	        }
	    }
	    render() {
	        return null;
	    }
	}
	Data.contextType = MapContext;
	
	const eventMap$6 = {
	    onClick: 'click',
	    onDefaultViewportChanged: 'defaultviewport_changed',
	    onStatusChanged: 'status_changed',
	};
	const updaterMap$6 = {
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    url(instance, url) {
	        instance.setUrl(url);
	    },
	    zIndex(instance, zIndex) {
	        instance.setZIndex(zIndex);
	    },
	};
	class KmlLayer extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            kmlLayer: null,
	        };
	        this.setKmlLayerCallback = () => {
	            if (this.state.kmlLayer !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.kmlLayer);
	            }
	        };
	    }
	    componentDidMount() {
	        const kmlLayer = new google.maps.KmlLayer(Object.assign(Object.assign({}, this.props.options), { map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$6,
	            eventMap: eventMap$6,
	            prevProps: {},
	            nextProps: this.props,
	            instance: kmlLayer,
	        });
	        this.setState(function setLmlLayer() {
	            return {
	                kmlLayer,
	            };
	        }, this.setKmlLayerCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.kmlLayer !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$6,
	                eventMap: eventMap$6,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.kmlLayer,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.kmlLayer !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.kmlLayer);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.kmlLayer.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	KmlLayer.contextType = MapContext;
	
	function getOffsetOverride(containerElement, getPixelPositionOffset) {
	    return typeof getPixelPositionOffset === 'function'
	        ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight)
	        : {
	            x: 0,
	            y: 0,
	        };
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function createLatLng(inst, Type) { return new Type(inst.lat, inst.lng); }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function createLatLngBounds(inst, Type) {
	    return new Type(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function ensureOfType(inst, type, factory) {
	    return inst instanceof type ? inst : factory(inst, type);
	}
	function ensureOfTypeBounds(inst, type, factory) {
	    return inst instanceof type ? inst : factory(inst, type);
	}
	function getLayoutStylesByBounds(mapCanvasProjection, offset, bounds) {
	    const ne = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
	    const sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
	    if (ne && sw) {
	        return {
	            left: `${sw.x + offset.x}px`,
	            top: `${ne.y + offset.y}px`,
	            width: `${ne.x - sw.x - offset.x}px`,
	            height: `${sw.y - ne.y - offset.y}px`,
	        };
	    }
	    return {
	        left: '-9999px',
	        top: '-9999px',
	    };
	}
	function getLayoutStylesByPosition(mapCanvasProjection, offset, position) {
	    const point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position);
	    if (point) {
	        const { x, y } = point;
	        return {
	            left: `${x + offset.x}px`,
	            top: `${y + offset.y}px`,
	        };
	    }
	    return {
	        left: '-9999px',
	        top: '-9999px',
	    };
	}
	function getLayoutStyles(mapCanvasProjection, offset, bounds, position) {
	    return bounds !== undefined
	        ? getLayoutStylesByBounds(mapCanvasProjection, offset, ensureOfTypeBounds(bounds, google.maps.LatLngBounds, createLatLngBounds))
	        : getLayoutStylesByPosition(mapCanvasProjection, offset, ensureOfType(position, google.maps.LatLng, createLatLng));
	}
	function arePositionsEqual(currentPosition, previousPosition) {
	    return currentPosition.left === previousPosition.left
	        && currentPosition.top === previousPosition.top
	        && currentPosition.width === previousPosition.height
	        && currentPosition.height === previousPosition.height;
	}
	
	function createOverlay(container, pane, position, getPixelPositionOffset) {
	    class Overlay extends google.maps.OverlayView {
	        constructor(container, pane, position) {
	            super();
	            this.container = container;
	            this.pane = pane;
	            this.position = position;
	        }
	        onAdd() {
	            var _a;
	            const pane = (_a = this.getPanes()) === null || _a === void 0 ? void 0 : _a[this.pane];
	            pane === null || pane === void 0 ? void 0 : pane.appendChild(this.container);
	        }
	        draw() {
	            const projection = this.getProjection();
	            const point = projection.fromLatLngToDivPixel(this.position);
	            const offset = Object.assign({}, (this.container
	                ? getOffsetOverride(this.container, getPixelPositionOffset)
	                : {
	                    x: 0,
	                    y: 0,
	                }));
	            if (point === null) {
	                return;
	            }
	            this.container.style.transform = `translate(${point.x + offset.x}px, ${point.y + offset.y}px)`;
	        }
	        onRemove() {
	            if (this.container.parentNode !== null) {
	                this.container.parentNode.removeChild(this.container);
	            }
	        }
	    }
	    return new Overlay(container, pane, position);
	}
	
	function convertToLatLngString(latLngLike) {
	    if (!latLngLike) {
	        return '';
	    }
	    const latLng = latLngLike instanceof google.maps.LatLng
	        ? latLngLike
	        : new google.maps.LatLng(latLngLike.lat, latLngLike.lng);
	    return latLng + '';
	}
	function convertToLatLngBoundsString(latLngBoundsLike) {
	    if (!latLngBoundsLike) {
	        return '';
	    }
	    const latLngBounds = latLngBoundsLike instanceof google.maps.LatLngBounds
	        ? latLngBoundsLike
	        : new google.maps.LatLngBounds(new google.maps.LatLng(latLngBoundsLike.south, latLngBoundsLike.east), new google.maps.LatLng(latLngBoundsLike.north, latLngBoundsLike.west));
	    return latLngBounds + '';
	}
	const FLOAT_PANE = `floatPane`;
	const MAP_PANE = `mapPane`;
	const MARKER_LAYER = `markerLayer`;
	const OVERLAY_LAYER = `overlayLayer`;
	const OVERLAY_MOUSE_TARGET = `overlayMouseTarget`;
	function OverlayViewFunctional({ position, mapPaneName, zIndex, onLoad, onUnmount, getPixelPositionOffset, children, }) {
	    const map = require$$0.useContext(MapContext);
	    const container = require$$0.useMemo(() => {
	        const div = document.createElement('div');
	        div.style.position = 'absolute';
	        return div;
	    }, []);
	    const overlay = require$$0.useMemo(() => {
	        return createOverlay(container, mapPaneName, position, getPixelPositionOffset);
	    }, [container, mapPaneName, position]);
	    require$$0.useEffect(() => {
	        onLoad === null || onLoad === void 0 ? void 0 : onLoad(overlay);
	        overlay === null || overlay === void 0 ? void 0 : overlay.setMap(map);
	        return () => {
	            onUnmount === null || onUnmount === void 0 ? void 0 : onUnmount(overlay);
	            overlay === null || overlay === void 0 ? void 0 : overlay.setMap(null);
	        };
	    }, [map, overlay]);
	    // to move the container to the foreground and background
	    require$$0.useEffect(() => {
	        container.style.zIndex = `${zIndex}`;
	    }, [zIndex, container]);
	    return ReactDOM__namespace.createPortal(children, container);
	}
	const OverlayViewF = require$$0.memo(OverlayViewFunctional);
	class OverlayView extends require$$0.PureComponent {
	    constructor(props) {
	        super(props);
	        this.state = {
	            paneEl: null,
	            containerStyle: {
	                // set initial position
	                position: 'absolute',
	            },
	        };
	        this.updatePane = () => {
	            const mapPaneName = this.props.mapPaneName;
	            // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
	            const mapPanes = this.overlayView.getPanes();
	            invariant_1(!!mapPaneName, `OverlayView requires props.mapPaneName but got %s`, mapPaneName);
	            if (mapPanes) {
	                this.setState({
	                    paneEl: mapPanes[mapPaneName],
	                });
	            }
	            else {
	                this.setState({
	                    paneEl: null,
	                });
	            }
	        };
	        this.onAdd = () => {
	            var _a, _b;
	            this.updatePane();
	            (_b = (_a = this.props).onLoad) === null || _b === void 0 ? void 0 : _b.call(_a, this.overlayView);
	        };
	        this.onPositionElement = () => {
	            const mapCanvasProjection = this.overlayView.getProjection();
	            const offset = Object.assign({ x: 0, y: 0 }, (this.containerRef.current
	                ? getOffsetOverride(this.containerRef.current, this.props.getPixelPositionOffset)
	                : {}));
	            const layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props.bounds, this.props.position);
	            const { left, top, width, height } = this.state.containerStyle;
	            if (!arePositionsEqual(layoutStyles, { left, top, width, height })) {
	                this.setState({
	                    containerStyle: Object.assign(Object.assign({}, layoutStyles), { position: 'absolute' }),
	                });
	            }
	        };
	        this.draw = () => {
	            this.onPositionElement();
	        };
	        this.onRemove = () => {
	            var _a, _b;
	            this.setState(() => ({
	                paneEl: null,
	            }));
	            // this.mapPaneEl = null
	            (_b = (_a = this.props).onUnmount) === null || _b === void 0 ? void 0 : _b.call(_a, this.overlayView);
	        };
	        this.containerRef = require$$0.createRef();
	        // You must implement three methods: onAdd(), draw(), and onRemove().
	        const overlayView = new google.maps.OverlayView();
	        overlayView.onAdd = this.onAdd;
	        overlayView.draw = this.draw;
	        overlayView.onRemove = this.onRemove;
	        this.overlayView = overlayView;
	    }
	    componentDidMount() {
	        // You must call setMap() with a valid Map object to trigger the call to
	        // the onAdd() method and setMap(null) in order to trigger the onRemove() method.
	        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	        // @ts-ignore
	        this.overlayView.setMap(this.context);
	    }
	    componentDidUpdate(prevProps) {
	        const prevPositionString = convertToLatLngString(prevProps.position);
	        const positionString = convertToLatLngString(this.props.position);
	        const prevBoundsString = convertToLatLngBoundsString(prevProps.bounds);
	        const boundsString = convertToLatLngBoundsString(this.props.bounds);
	        if (prevPositionString !== positionString ||
	            prevBoundsString !== boundsString) {
	            this.overlayView.draw();
	        }
	        if (prevProps.mapPaneName !== this.props.mapPaneName) {
	            this.updatePane();
	        }
	    }
	    componentWillUnmount() {
	        this.overlayView.setMap(null);
	    }
	    render() {
	        const paneEl = this.state.paneEl;
	        if (paneEl) {
	            return ReactDOM__namespace.createPortal(jsxRuntime.exports.jsx("div", Object.assign({ ref: this.containerRef, style: this.state.containerStyle }, { children: require$$0.Children.only(this.props.children) })), paneEl);
	        }
	        else {
	            return null;
	        }
	    }
	}
	OverlayView.FLOAT_PANE = `floatPane`;
	OverlayView.MAP_PANE = `mapPane`;
	OverlayView.MARKER_LAYER = `markerLayer`;
	OverlayView.OVERLAY_LAYER = `overlayLayer`;
	OverlayView.OVERLAY_MOUSE_TARGET = `overlayMouseTarget`;
	OverlayView.contextType = MapContext;
	
	function noop() { return; }
	
	const eventMap$5 = {
	    onDblClick: 'dblclick',
	    onClick: 'click',
	};
	const updaterMap$5 = {
	    opacity(instance, opacity) {
	        instance.setOpacity(opacity);
	    },
	};
	class GroundOverlay extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            groundOverlay: null,
	        };
	        this.setGroundOverlayCallback = () => {
	            if (this.state.groundOverlay !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.groundOverlay);
	            }
	        };
	    }
	    componentDidMount() {
	        invariant_1(!!this.props.url || !!this.props.bounds, `For GroundOverlay, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps-api\`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`);
	        const groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, Object.assign(Object.assign({}, this.props.options), { 
	            // @ts-ignore
	            map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$5,
	            eventMap: eventMap$5,
	            prevProps: {},
	            nextProps: this.props,
	            instance: groundOverlay,
	        });
	        this.setState(function setGroundOverlay() {
	            return {
	                groundOverlay,
	            };
	        }, this.setGroundOverlayCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.groundOverlay !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$5,
	                eventMap: eventMap$5,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.groundOverlay,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.groundOverlay) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.groundOverlay);
	            }
	            this.state.groundOverlay.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	GroundOverlay.defaultProps = {
	    onLoad: noop,
	};
	GroundOverlay.contextType = MapContext;
	
	const eventMap$4 = {};
	const updaterMap$4 = {
	    data(instance, data) {
	        instance.setData(data);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	};
	class HeatmapLayer extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            heatmapLayer: null,
	        };
	        this.setHeatmapLayerCallback = () => {
	            if (this.state.heatmapLayer !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.heatmapLayer);
	            }
	        };
	    }
	    componentDidMount() {
	        invariant_1(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} to <LoadScript />? %s', google.maps.visualization);
	        invariant_1(!!this.props.data, 'data property is required in HeatmapLayer %s', this.props.data);
	        const heatmapLayer = new google.maps.visualization.HeatmapLayer(Object.assign(Object.assign({}, (this.props.options || {})), { data: this.props.data, 
	            // @ts-ignore
	            map: this.context }));
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$4,
	            eventMap: eventMap$4,
	            prevProps: {},
	            nextProps: this.props,
	            instance: heatmapLayer,
	        });
	        this.setState(function setHeatmapLayer() {
	            return {
	                heatmapLayer,
	            };
	        }, this.setHeatmapLayerCallback);
	    }
	    componentDidUpdate(prevProps) {
	        unregisterEvents(this.registeredEvents);
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$4,
	            eventMap: eventMap$4,
	            prevProps,
	            nextProps: this.props,
	            instance: this.state.heatmapLayer,
	        });
	    }
	    componentWillUnmount() {
	        if (this.state.heatmapLayer !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.heatmapLayer);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.heatmapLayer.setMap(null);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	HeatmapLayer.contextType = MapContext;
	
	const eventMap$3 = {
	    onCloseClick: 'closeclick',
	    onPanoChanged: 'pano_changed',
	    onPositionChanged: 'position_changed',
	    onPovChanged: 'pov_changed',
	    onResize: 'resize',
	    onStatusChanged: 'status_changed',
	    onVisibleChanged: 'visible_changed',
	    onZoomChanged: 'zoom_changed',
	};
	const updaterMap$3 = {
	    register(instance, provider, options) {
	        instance.registerPanoProvider(provider, options);
	    },
	    links(instance, links) {
	        instance.setLinks(links);
	    },
	    motionTracking(instance, motionTracking) {
	        instance.setMotionTracking(motionTracking);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    pano(instance, pano) {
	        instance.setPano(pano);
	    },
	    position(instance, position) {
	        instance.setPosition(position);
	    },
	    pov(instance, pov) {
	        instance.setPov(pov);
	    },
	    visible(instance, visible) {
	        instance.setVisible(visible);
	    },
	    zoom(instance, zoom) {
	        instance.setZoom(zoom);
	    },
	};
	class StreetViewPanorama extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            streetViewPanorama: null,
	        };
	        this.setStreetViewPanoramaCallback = () => {
	            if (this.state.streetViewPanorama !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.streetViewPanorama);
	            }
	        };
	    }
	    componentDidMount() {
	        // @ts-ignore
	        const streetViewPanorama = this.context.getStreetView();
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$3,
	            eventMap: eventMap$3,
	            prevProps: {},
	            nextProps: this.props,
	            instance: streetViewPanorama,
	        });
	        this.setState(() => {
	            return {
	                streetViewPanorama,
	            };
	        }, this.setStreetViewPanoramaCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.streetViewPanorama !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$3,
	                eventMap: eventMap$3,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.streetViewPanorama,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.streetViewPanorama !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.streetViewPanorama);
	            }
	            unregisterEvents(this.registeredEvents);
	            this.state.streetViewPanorama.setVisible(false);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	StreetViewPanorama.contextType = MapContext;
	
	class StreetViewService extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            streetViewService: null,
	        };
	        this.setStreetViewServiceCallback = () => {
	            if (this.state.streetViewService !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.streetViewService);
	            }
	        };
	    }
	    componentDidMount() {
	        const streetViewService = new google.maps.StreetViewService();
	        this.setState(function setStreetViewService() {
	            return {
	                streetViewService,
	            };
	        }, this.setStreetViewServiceCallback);
	    }
	    componentWillUnmount() {
	        if (this.state.streetViewService !== null && this.props.onUnmount) {
	            this.props.onUnmount(this.state.streetViewService);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	StreetViewService.contextType = MapContext;
	
	class DirectionsService extends require$$0__namespace.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            directionsService: null,
	        };
	        this.setDirectionsServiceCallback = () => {
	            if (this.state.directionsService !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.directionsService);
	            }
	        };
	    }
	    componentDidMount() {
	        invariant_1(!!this.props.options, 'DirectionsService expected options object as parameter, but got %s', this.props.options);
	        const directionsService = new google.maps.DirectionsService();
	        this.setState(function setDirectionsService() {
	            return {
	                directionsService,
	            };
	        }, this.setDirectionsServiceCallback);
	    }
	    componentDidUpdate() {
	        if (this.state.directionsService !== null) {
	            this.state.directionsService.route(this.props.options, this.props.callback);
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.directionsService !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.directionsService);
	            }
	        }
	    }
	    render() {
	        return null;
	    }
	}
	
	const eventMap$2 = {
	    onDirectionsChanged: 'directions_changed',
	};
	const updaterMap$2 = {
	    directions(instance, directions) {
	        instance.setDirections(directions);
	    },
	    map(instance, map) {
	        instance.setMap(map);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    panel(instance, panel) {
	        instance.setPanel(panel);
	    },
	    routeIndex(instance, routeIndex) {
	        instance.setRouteIndex(routeIndex);
	    },
	};
	class DirectionsRenderer extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.state = {
	            directionsRenderer: null,
	        };
	        this.setDirectionsRendererCallback = () => {
	            if (this.state.directionsRenderer !== null) {
	                // @ts-ignore
	                this.state.directionsRenderer.setMap(this.context);
	                if (this.props.onLoad) {
	                    this.props.onLoad(this.state.directionsRenderer);
	                }
	            }
	        };
	    }
	    componentDidMount() {
	        const directionsRenderer = new google.maps.DirectionsRenderer(this.props.options);
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap: updaterMap$2,
	            eventMap: eventMap$2,
	            prevProps: {},
	            nextProps: this.props,
	            instance: directionsRenderer,
	        });
	        this.setState(function setDirectionsRenderer() {
	            return {
	                directionsRenderer,
	            };
	        }, this.setDirectionsRendererCallback);
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.directionsRenderer !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$2,
	                eventMap: eventMap$2,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.directionsRenderer,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.directionsRenderer !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.directionsRenderer);
	            }
	            unregisterEvents(this.registeredEvents);
	            if (this.state.directionsRenderer) {
	                this.state.directionsRenderer.setMap(null);
	            }
	        }
	    }
	    render() {
	        return jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {});
	    }
	}
	DirectionsRenderer.contextType = MapContext;
	
	class DistanceMatrixService extends require$$0__namespace.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            distanceMatrixService: null,
	        };
	        this.setDistanceMatrixServiceCallback = () => {
	            if (this.state.distanceMatrixService !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.distanceMatrixService);
	            }
	        };
	    }
	    componentDidMount() {
	        invariant_1(!!this.props.options, 'DistanceMatrixService expected options object as parameter, but go %s', this.props.options);
	        const distanceMatrixService = new google.maps.DistanceMatrixService();
	        this.setState(function setDistanceMatrixService() {
	            return {
	                distanceMatrixService,
	            };
	        }, this.setDistanceMatrixServiceCallback);
	    }
	    componentDidUpdate() {
	        if (this.state.distanceMatrixService !== null) {
	            this.state.distanceMatrixService.getDistanceMatrix(this.props.options, this.props.callback);
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.distanceMatrixService !== null && this.props.onUnmount) {
	            this.props.onUnmount(this.state.distanceMatrixService);
	        }
	    }
	    render() {
	        return null;
	    }
	}
	
	const eventMap$1 = {
	    onPlacesChanged: 'places_changed',
	};
	const updaterMap$1 = {
	    bounds(instance, bounds) {
	        instance.setBounds(bounds);
	    },
	};
	class StandaloneSearchBox extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.containerElement = require$$0.createRef();
	        this.state = {
	            searchBox: null,
	        };
	        this.setSearchBoxCallback = () => {
	            if (this.state.searchBox !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.searchBox);
	            }
	        };
	    }
	    componentDidMount() {
	        invariant_1(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
	        if (this.containerElement !== null && this.containerElement.current !== null) {
	            const input = this.containerElement.current.querySelector('input');
	            if (input !== null) {
	                const searchBox = new google.maps.places.SearchBox(input, this.props.options);
	                this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                    updaterMap: updaterMap$1,
	                    eventMap: eventMap$1,
	                    prevProps: {},
	                    nextProps: this.props,
	                    instance: searchBox,
	                });
	                this.setState(function setSearchBox() {
	                    return {
	                        searchBox,
	                    };
	                }, this.setSearchBoxCallback);
	            }
	        }
	    }
	    componentDidUpdate(prevProps) {
	        if (this.state.searchBox !== null) {
	            unregisterEvents(this.registeredEvents);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap: updaterMap$1,
	                eventMap: eventMap$1,
	                prevProps,
	                nextProps: this.props,
	                instance: this.state.searchBox,
	            });
	        }
	    }
	    componentWillUnmount() {
	        if (this.state.searchBox !== null) {
	            if (this.props.onUnmount) {
	                this.props.onUnmount(this.state.searchBox);
	            }
	            unregisterEvents(this.registeredEvents);
	        }
	    }
	    render() {
	        return jsxRuntime.exports.jsx("div", Object.assign({ ref: this.containerElement }, { children: require$$0.Children.only(this.props.children) }));
	    }
	}
	StandaloneSearchBox.contextType = MapContext;
	
	const eventMap = {
	    onPlaceChanged: 'place_changed',
	};
	const updaterMap = {
	    bounds(instance, bounds) {
	        instance.setBounds(bounds);
	    },
	    restrictions(instance, restrictions) {
	        instance.setComponentRestrictions(restrictions);
	    },
	    fields(instance, fields) {
	        instance.setFields(fields);
	    },
	    options(instance, options) {
	        instance.setOptions(options);
	    },
	    types(instance, types) {
	        instance.setTypes(types);
	    },
	};
	class Autocomplete extends require$$0.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.registeredEvents = [];
	        this.containerElement = require$$0.createRef();
	        this.state = {
	            autocomplete: null,
	        };
	        this.setAutocompleteCallback = () => {
	            if (this.state.autocomplete !== null && this.props.onLoad) {
	                this.props.onLoad(this.state.autocomplete);
	            }
	        };
	    }
	    componentDidMount() {
	        invariant_1(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
	        // TODO: why current could be equal null?
	        // @ts-ignore
	        const input = this.containerElement.current.querySelector('input');
	        if (input) {
	            const autocomplete = new google.maps.places.Autocomplete(input, this.props.options);
	            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	                updaterMap,
	                eventMap,
	                prevProps: {},
	                nextProps: this.props,
	                instance: autocomplete,
	            });
	            this.setState(() => {
	                return {
	                    autocomplete,
	                };
	            }, this.setAutocompleteCallback);
	        }
	    }
	    componentDidUpdate(prevProps) {
	        unregisterEvents(this.registeredEvents);
	        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
	            updaterMap,
	            eventMap,
	            prevProps,
	            nextProps: this.props,
	            instance: this.state.autocomplete,
	        });
	    }
	    componentWillUnmount() {
	        if (this.state.autocomplete !== null) {
	            unregisterEvents(this.registeredEvents);
	        }
	    }
	    render() {
	        return jsxRuntime.exports.jsx("div", Object.assign({ ref: this.containerElement, className: this.props.className }, { children: require$$0.Children.only(this.props.children) }));
	    }
	}
	Autocomplete.defaultProps = {
	    className: ''
	};
	Autocomplete.contextType = MapContext;
	
	exports.Autocomplete = Autocomplete;
	exports.BicyclingLayer = BicyclingLayer;
	exports.BicyclingLayerF = BicyclingLayerF;
	exports.Circle = Circle;
	exports.CircleF = CircleF;
	exports.Data = Data;
	exports.DataF = DataF;
	exports.DirectionsRenderer = DirectionsRenderer;
	exports.DirectionsService = DirectionsService;
	exports.DistanceMatrixService = DistanceMatrixService;
	exports.DrawingManager = DrawingManager;
	exports.DrawingManagerF = DrawingManagerF;
	exports.FLOAT_PANE = FLOAT_PANE;
	exports.GoogleMap = GoogleMap;
	exports.GoogleMapsMarkerClusterer = index_esm;
	exports.GoogleMarkerClusterer = GoogleMarkerClusterer$1;
	exports.GroundOverlay = GroundOverlay;
	exports.HeatmapLayer = HeatmapLayer;
	exports.InfoBox = InfoBoxComponent;
	exports.InfoBoxF = InfoBoxF;
	exports.InfoWindow = InfoWindow;
	exports.InfoWindowF = InfoWindowF;
	exports.KmlLayer = KmlLayer;
	exports.LoadScript = LoadScript;
	exports.LoadScriptNext = LoadScriptNext$1;
	exports.MAP_PANE = MAP_PANE;
	exports.MARKER_LAYER = MARKER_LAYER;
	exports.MapContext = MapContext;
	exports.Marker = Marker;
	exports.MarkerClusterer = ClustererComponent;
	exports.MarkerF = MarkerF;
	exports.OVERLAY_LAYER = OVERLAY_LAYER;
	exports.OVERLAY_MOUSE_TARGET = OVERLAY_MOUSE_TARGET;
	exports.OverlayView = OverlayView;
	exports.OverlayViewF = OverlayViewF;
	exports.Polygon = Polygon;
	exports.PolygonF = PolygonF;
	exports.Polyline = Polyline;
	exports.PolylineF = PolylineF;
	exports.Rectangle = Rectangle;
	exports.RectangleF = RectangleF;
	exports.StandaloneSearchBox = StandaloneSearchBox;
	exports.StreetViewPanorama = StreetViewPanorama;
	exports.StreetViewService = StreetViewService;
	exports.TrafficLayer = TrafficLayer;
	exports.TrafficLayerF = TrafficLayerF;
	exports.TransitLayer = TransitLayer;
	exports.TransitLayerF = TransitLayerF;
	exports.useGoogleMap = useGoogleMap;
	exports.useJsApiLoader = useJsApiLoader;
	exports.useLoadScript = useLoadScript;
	//# sourceMappingURL=cjs.js.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}
	
	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;
	
	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}
	
	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593
	
	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` or `self` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	
	/* globals self */
	var scope = typeof global !== "undefined" ? global : self;
	var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
	
	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);
	
	// MessageChannels are desirable because they give direct access to the HTML
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	// 11-12, and in web workers in many engines.
	// Although message channels yield to any queued rendering and IO tasks, they
	// would be better than imposing the 4ms delay of timers.
	// However, they do not work reliably in Internet Explorer or Safari.
	
	// Internet Explorer 10 is the only browser that has setImmediate but does
	// not have MutationObservers.
	// Although setImmediate yields to the browser's renderer, it would be
	// preferrable to falling back to setTimeout since it does not have
	// the minimum 4ms penalty.
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	// Desktop to a lesser extent) that renders both setImmediate and
	// MessageChannel useless for the purposes of ASAP.
	// https://github.com/kriskowal/q/issues/396
	
	// Timers are implemented universally.
	// We fall back to timers in workers in most engines, and in foreground
	// contexts in the following browsers.
	// However, note that even this simple case requires nuances to operate in a
	// broad spectrum of browsers.
	//
	// - Firefox 3-13
	// - Internet Explorer 6-9
	// - iPad Safari 4.3
	// - Lynx 2.8.7
	} else {
	    requestFlush = makeRequestCallFromTimer(flush);
	}
	
	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;
	
	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, {characterData: true});
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}
	
	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html
	
	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.
	
	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }
	
	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.
	
	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }
	
	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.
	
	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.
	
	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);
	
	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}
	
	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;
	
	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(19);
	
	var _TodoList = __webpack_require__(11);
	
	var _TodoList2 = _interopRequireDefault(_TodoList);
	
	var _WeatherInfoRender = __webpack_require__(14);
	
	var _WeatherInfoRender2 = _interopRequireDefault(_WeatherInfoRender);
	
	var _Map = __webpack_require__(10);
	
	var _Map2 = _interopRequireDefault(_Map);
	
	var _Footer = __webpack_require__(7);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _eaderDescription = __webpack_require__(8);
	
	var _eaderDescription2 = _interopRequireDefault(_eaderDescription);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// REACT_APP_API_KEY_MAPS = AIzaSyBhstFIFZds_YIJBfVOIDm-X4pjb0nLdVI
	// REACT_APP_API_KEY_WEATHER = 568a480255541e4dab73060f474e6c75
	
	function App() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'none' },
	    _react2.default.createElement(
	      _react2.default.Fragment,
	      null,
	      _react2.default.createElement(_eaderDescription2.default, null),
	      _react2.default.createElement(
	        'div',
	        { className: 'container' },
	        _react2.default.createElement(
	          'div',
	          { className: 'leftSide' },
	          _react2.default.createElement(_WeatherInfoRender2.default, null),
	          _react2.default.createElement(_Map2.default, null)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'rightSide' },
	          _react2.default.createElement(_TodoList2.default, null)
	        )
	      ),
	      _react2.default.createElement(_Footer2.default, null)
	    )
	  );
	}
	
	exports.default = App;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Footer;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(20);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Footer() {
	    return _react2.default.createElement(
	        'div',
	        { className: 'mainFooterDiv' },
	        _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'a',
	                { target: '_blank', alt: 'github icon', href: 'https://github.com/Ilia10101000/react', className: 'aFooterImg' },
	                _react2.default.createElement('img', { alt: 'pict', className: 'aImg', src: './src/icons8-github-50.png' })
	            ),
	            _react2.default.createElement(
	                'a',
	                { target: '_blank', alt: 'facebook icon', href: 'https://www.facebook.com/profile.php?id=100029305913207', className: 'aFooterImg' },
	                _react2.default.createElement('img', { alt: 'pict', className: 'aImg', src: './src/icons8-facebook-\u043D\u043E\u0432\u044B\u0439-50.png' })
	            ),
	            _react2.default.createElement(
	                'a',
	                { target: '_blank', alt: 'linkedin icon', href: 'https://www.linkedin.com/in/ilia-krasnoper-scales10101000', className: 'aFooterImg' },
	                _react2.default.createElement('img', { alt: 'pict', className: 'aImg', src: './src/icons8-\u043B\u0438\u043D\u043A\u0435\u0434\u0438\u043D-50.png' })
	            ),
	            _react2.default.createElement(
	                'a',
	                { target: '_blank', alt: 'instagram icon', href: 'https://www.instagram.com/ilia_scales', className: 'aFooterImg' },
	                _react2.default.createElement('img', { alt: 'pict', className: 'aImg', src: './src/icons8-instagram-50.png' })
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('div', null),
	            _react2.default.createElement(
	                'div',
	                { className: 'aList' },
	                _react2.default.createElement(
	                    'a',
	                    { target: '_blank', className: 'aFooter', href: 'https://ilia10101000.github.io/mainPage.github.io/' },
	                    'Main page'
	                ),
	                _react2.default.createElement(
	                    'a',
	                    { target: '_blank', className: 'aFooter', href: 'https://ilia10101000.github.io/Portfolio.github.io/' },
	                    'Portfolio'
	                ),
	                _react2.default.createElement(
	                    'a',
	                    { target: '_blank', className: 'aFooter', href: 'https://ilia10101000.github.io/Tour-of-learning.github.io/' },
	                    'Tour of learning'
	                )
	            )
	        )
	    );
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = HeaderDescription;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function HeaderDescription() {
	    return _react2.default.createElement(
	        'div',
	        { className: 'mainHeaderDiv' },
	        _react2.default.createElement(
	            'div',
	            { className: 'descriptionDiv' },
	            'This is a demonstration of connecting the API and creating a page in React. On github you can see that I use a mixed approach in styling elements. This is only a demonstration, not a coding style.'
	        )
	    );
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Autocomplete = Autocomplete;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _usePlacesAutocomplete = __webpack_require__(37);
	
	var _usePlacesAutocomplete2 = _interopRequireDefault(_usePlacesAutocomplete);
	
	var _reactCoolOnclickoutside = __webpack_require__(28);
	
	var _reactCoolOnclickoutside2 = _interopRequireDefault(_reactCoolOnclickoutside);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var style = {
	  input: {
	    width: '99.5%',
	    minWidth: '310px',
	    border: '2px solid #ccc',
	    margin: '0',
	    padding: '0'
	
	  }
	};
	
	function Autocomplete(_ref) {
	  var isLoaded = _ref.isLoaded,
	      onSelect = _ref.onSelect;
	
	  var _usePlacesAutocomplet = (0, _usePlacesAutocomplete2.default)({
	    initOnMount: false,
	    debounce: 300
	  }),
	      ready = _usePlacesAutocomplet.ready,
	      value = _usePlacesAutocomplet.value,
	      init = _usePlacesAutocomplet.init,
	      _usePlacesAutocomplet2 = _usePlacesAutocomplet.suggestions,
	      status = _usePlacesAutocomplet2.status,
	      data = _usePlacesAutocomplet2.data,
	      setValue = _usePlacesAutocomplet.setValue,
	      clearSuggestions = _usePlacesAutocomplet.clearSuggestions;
	
	  var ref = (0, _reactCoolOnclickoutside2.default)(function () {
	    clearSuggestions();
	  });
	
	  var handleInput = function handleInput(e) {
	    setValue(e.target.value);
	  };
	
	  var handleSelect = function handleSelect(_ref2) {
	    var description = _ref2.description;
	    return function () {
	      setValue(description, false);
	      clearSuggestions();
	
	      (0, _usePlacesAutocomplete.getGeocode)({ address: description }).then(function (results) {
	        var _getLatLng = (0, _usePlacesAutocomplete.getLatLng)(results[0]),
	            lat = _getLatLng.lat,
	            lng = _getLatLng.lng;
	
	        console.log("📍 Coordinates: ", { lat: lat, lng: lng });
	        onSelect({ lat: lat, lng: lng });
	      });
	    };
	  };
	
	  var renderSuggestions = function renderSuggestions() {
	    return data.map(function (suggestion) {
	      var place_id = suggestion.place_id,
	          _suggestion$structure = suggestion.structured_formatting,
	          main_text = _suggestion$structure.main_text,
	          secondary_text = _suggestion$structure.secondary_text;
	
	
	      return _react2.default.createElement(
	        "li",
	        { key: place_id, onClick: handleSelect(suggestion) },
	        _react2.default.createElement(
	          "strong",
	          null,
	          main_text
	        ),
	        " ",
	        _react2.default.createElement(
	          "small",
	          null,
	          secondary_text
	        )
	      );
	    });
	  };
	
	  _react2.default.useEffect(function () {
	    if (isLoaded) {
	      init();
	    }
	  }, [isLoaded, init]);
	
	  return _react2.default.createElement(
	    "div",
	    { ref: ref },
	    _react2.default.createElement("input", {
	      style: style.input,
	      type: "text",
	      value: value,
	      onChange: handleInput,
	      disabled: !ready,
	      placeholder: "Where are you going?" }),
	    status === "OK" && _react2.default.createElement(
	      "ul",
	      null,
	      renderSuggestions()
	    )
	  );
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _api = __webpack_require__(4);
	
	var _AutoComplete = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_KEY = ("AIzaSyBhstFIFZds_YIJBfVOIDm-X4pjb0nLdVI");
	
	var containerStyle = {
	  width: '100%',
	  // minWidth:'310px',
	  height: '50vh'
	};
	
	var defaultCenter = {
	  lat: 50.450129,
	  lng: 30.5239758
	};
	
	var libraries = ['places'];
	
	function Map() {
	  var _React$useState = _react2.default.useState(defaultCenter),
	      _React$useState2 = _slicedToArray(_React$useState, 2),
	      center = _React$useState2[0],
	      setCenter = _React$useState2[1];
	
	  var defaultOptions = {
	    panControl: true,
	    zoomControl: true,
	    mapTypeControl: false,
	    scaleControl: false,
	    streetViewControl: false,
	    rotateControl: false,
	    clickableIcons: false,
	    keyboardShortcuts: false,
	    scrollwheel: false,
	    disableDoubleClickZoom: false,
	    fullscreenControl: false
	  };
	
	  var _useJsApiLoader = (0, _api.useJsApiLoader)({
	    id: 'google-map-script',
	    googleMapsApiKey: API_KEY,
	    libraries: libraries
	  }),
	      isLoaded = _useJsApiLoader.isLoaded;
	
	  var mapRef = _react2.default.useRef(undefined);
	
	  var onLoad = _react2.default.useCallback(function callback(map) {
	    mapRef.current = map;
	  }, []);
	
	  var onUnmount = _react2.default.useCallback(function callback(map) {
	    mapRef.current(undefined);
	  }, []);
	
	  var onPlaceSelect = _react2.default.useCallback(function (coordinates) {
	    setCenter(coordinates);
	  }, []);
	
	  return isLoaded ? _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'div',
	      { style: { display: 'flex', flexDirection: 'column' } },
	      _react2.default.createElement(_AutoComplete.Autocomplete, {
	        isLoaded: isLoaded,
	        onSelect: onPlaceSelect }),
	      _react2.default.createElement(_api.GoogleMap, {
	        mapContainerStyle: containerStyle,
	        center: center,
	        zoom: 12,
	        onLoad: onLoad,
	        onUnmount: onUnmount,
	        options: defaultOptions
	      })
	    )
	  ) : _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h2',
	      null,
	      'Loading maps...'
	    )
	  );
	}
	
	exports.default = _react2.default.memo(Map);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = TodoList;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactUuid = __webpack_require__(31);
	
	var _reactUuid2 = _interopRequireDefault(_reactUuid);
	
	var _element = __webpack_require__(12);
	
	var _element2 = _interopRequireDefault(_element);
	
	__webpack_require__(22);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var style = {
		divStyle: {
			border: '0.5px solid rgb(228,217,217)',
			padding: '30px',
			borderRadius: '15px',
			backgroundColor: 'rgb(245, 235, 235)',
			minWidth: '310px'
		},
		addButton: {
			border: 'none',
			backgroundColor: '#34ee13',
			borderRadius: '10px',
			padding: '7px',
			marginTop: '15px'
	
		}
	
	};
	
	function TodoList() {
	
		var arr = ['Connect weathers API', 'Connect google maps API', 'Create ToDo List'];
		var res = arr.map(function (item) {
			return {
				id: (0, _reactUuid2.default)(),
				completed: true,
				value: item,
				isEdit: false
			};
		});
	
		var _useState = (0, _react.useState)(res),
		    _useState2 = _slicedToArray(_useState, 2),
		    li = _useState2[0],
		    setLi = _useState2[1];
	
		function changeCompleted(id) {
			setLi(li.map(function (item) {
				if (item.id === id) {
					item.completed = !item.completed;
				}
				return item;
			}));
		}
	
		function changeEditModeByClick(id) {
			setLi(li.map(function (item) {
				if (item.id === id) {
					item.isEdit = !item.isEdit;
				}
				return item;
			}));
		};
		function addNewLi() {
			setLi([].concat(_toConsumableArray(li), [{
				id: (0, _reactUuid2.default)(),
				completed: false,
				value: '',
				isEdit: true
			}]));
		}
		function changeValue(id, event) {
			setLi(li.map(function (item) {
				if (item.id === id) {
					item.value = event.target.value;
				}
				return item;
			}));
		};
		function removeLi(id) {
			setLi(li.filter(function (item) {
				return item.id !== id;
			}));
		}
		function countTask() {
			var count = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = li[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var key = _step.value;
	
					if (!key.completed && key.value) {
						count++;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			return count;
		}
		var result = li.map(function (item) {
			return _react2.default.createElement(_element2.default, {
				key: item.id,
				item: item,
				changeEditModeByClick: changeEditModeByClick,
				changeCompleted: changeCompleted,
				onChangeValue: changeValue,
				removeLi: removeLi });
		});
	
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'div',
				{ style: { margin: '0 auto', width: '300px', minWidth: '290px', padding: '1px 7px', backgroundColor: 'rgb(245, 235, 235)', borderRadius: '20px', border: '0.5px solid rgb(228,217,217)', marginBottom: '10px' } },
				_react2.default.createElement(
					'h1',
					null,
					'You daily task book'
				)
			),
			_react2.default.createElement(
				'div',
				{ style: style.divStyle },
				li.length ? result : _react2.default.createElement(
					'p',
					null,
					'You dont have a task...'
				),
				_react2.default.createElement(
					'div',
					{ style: { display: 'flex', justifyContent: 'space-between' } },
					_react2.default.createElement(
						'button',
						{ className: 'addButton', style: style.addButton, onClick: addNewLi },
						'Add new task'
					),
					_react2.default.createElement(
						'div',
						null,
						li.every(function (item) {
							return item.completed === true;
						}) && li.length !== 0 ? _react2.default.createElement(
							'p',
							null,
							'You are good boy :)'
						) : li.length === 0 ? _react2.default.createElement('p', null) : _react2.default.createElement(
							'p',
							null,
							'You have to do ',
							countTask(),
							' task'
						)
					)
				)
			)
		);
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var style = {
	    li: {
	        display: 'flex',
	        border: '1px solid rgb(186,178,178)',
	        borderRadius: '5px',
	        marginBottom: '10px',
	        alignText: 'center',
	        padding: '4px',
	        justifyContent: 'space-between',
	        backgroundColor: 'white'
	    },
	    buttonRemove: {}
	
	};
	function Element(prop) {
	
	    var elem = void 0;
	    if (prop.item.isEdit) {
	        elem = _react2.default.createElement('input', {
	            placeholder: 'Write your goal...',
	            value: prop.item.value,
	            autoFocus: prop.item.isEdit ? true : false,
	            onChange: function onChange(event) {
	                return prop.onChangeValue(prop.item.id, event);
	            }
	        });
	    } else {
	        elem = _react2.default.createElement(
	            'span',
	            { className: prop.item.completed ? 'completedTask' : '' },
	            prop.item.value
	        );
	    }
	
	    return _react2.default.createElement(
	        'li',
	        {
	            style: style.li },
	        _react2.default.createElement(
	            'span',
	            null,
	            _react2.default.createElement('input', { style: { marginRight: '10px' }, disabled: prop.item.isEdit ? true : false, type: 'checkbox', checked: prop.item.completed ? true : false, onChange: function onChange() {
	                    return prop.changeCompleted(prop.item.id);
	                } }),
	            elem
	        ),
	        _react2.default.createElement(
	            'span',
	            null,
	            _react2.default.createElement(
	                'button',
	                {
	                    className: 'saveChangeButton',
	                    style: {
	                        backgroundColor: prop.item.isEdit ? '#34ee13' : '#13e6ee',
	                        border: 'none'
	                    },
	                    disabled: prop.item.completed ? true : false,
	                    onClick: function onClick() {
	                        return prop.changeEditModeByClick(prop.item.id);
	                    }
	                },
	                prop.item.isEdit ? 'Save' : 'Change'
	            ),
	            _react2.default.createElement(
	                'button',
	                {
	                    style: style.buttonRemove,
	                    className: 'removeButton',
	                    onClick: function onClick() {
	                        return prop.removeLi(prop.item.id);
	                    } },
	                '\xD7'
	            )
	        )
	    );
	}
	exports.default = Element;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var style = {
	    th: {
	        display: 'block',
	        fontSize: '13px'
	    },
	    td: {
	        textAlign: 'center'
	    },
	    dataTemp: {
	        fontSize: '40px',
	        marginRight: '20px'
	    },
	    dataMainTempInfo: {
	        display: 'flex',
	        flexDirection: 'column',
	        marginBottom: '10px'
	    },
	    thBody: {
	        display: 'flex',
	        backgroundColor: 'rgba(0,0,255,0.1)',
	        borderRadius: '7px',
	        justifyContent: 'space-between'
	    }
	};
	
	function normalizeTime(timesTemp) {
	    var time = timesTemp;
	    var date = new Date();
	    date.setTime(+time);
	    var normalTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	    return normalTime;
	}
	
	function WeatherInfo(data) {
	
	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'div',
	            { style: { display: 'flex' } },
	            _react2.default.createElement(
	                'div',
	                { style: style.dataMainTempInfo },
	                _react2.default.createElement(
	                    'div',
	                    { style: style.dataTemp },
	                    Math.round(data.data.temp),
	                    ' \xB0C'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    'Feels like ',
	                    Math.round(data.data.feelsLike),
	                    ' \xB0\u0421'
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'table',
	                    null,
	                    _react2.default.createElement(
	                        'tbody',
	                        { style: Object.assign({}, style.thBody, { width: '120%', position: 'relative', top: '10px', left: '5px' }) },
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'th',
	                                { style: style.th },
	                                'Sun rise'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                normalizeTime(data.data.sunRise)
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'th',
	                                { style: style.th },
	                                'Sun set'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { style: style.td },
	                                normalizeTime(data.data.sunSet)
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'th',
	                                { style: style.th },
	                                'Temp max'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { style: style.td },
	                                Math.round(data.data.tempMax),
	                                ' \xB0\u0421'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'th',
	                                { style: style.th },
	                                'Temp min'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                Math.floor(data.data.tempMin),
	                                ' \xB0\u0421'
	                            )
	                        )
	                    )
	                )
	            )
	        ),
	        _react2.default.createElement(
	            'table',
	            { style: { width: '50%' } },
	            _react2.default.createElement(
	                'tbody',
	                { style: style.thBody },
	                _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                        'th',
	                        { style: style.th },
	                        'Gust'
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        null,
	                        data.data.wind.gust ? data.data.wind.gust + ' m/s' : '---'
	                    )
	                ),
	                _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                        'th',
	                        { style: style.th },
	                        'Pressure'
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        null,
	                        data.data.pressure
	                    )
	                ),
	                _react2.default.createElement(
	                    'tr',
	                    null,
	                    _react2.default.createElement(
	                        'th',
	                        { style: style.th },
	                        'Humidity'
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        null,
	                        data.data.humidity,
	                        '%'
	                    )
	                )
	            )
	        ),
	        _react2.default.createElement(
	            'div',
	            { style: { marginTop: '7px' } },
	            'Data was obtained from ',
	            _react2.default.createElement(
	                'a',
	                { target: '_blank', href: 'https://openweathermap.org/', className: 'aDiv' },
	                'openweathermap.org'
	            )
	        )
	    );
	}
	exports.default = WeatherInfo;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _regenerator = __webpack_require__(16);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = WeatherInfoRender;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _WeatherInfo = __webpack_require__(13);
	
	var _WeatherInfo2 = _interopRequireDefault(_WeatherInfo);
	
	__webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var API_KEY = ("568a480255541e4dab73060f474e6c75");
	
	var style = {
	    mainDiv: {
	        width: '90%',
	        margin: '0 auto 10px auto',
	        borderRadius: '10px',
	        padding: '10px',
	        color: 'white'
	    },
	    dataName: {
	        marginBottom: '7px',
	        fontSize: '18px',
	        fontWeight: 'bold',
	        textAlign: 'center'
	    },
	    nameInputDiv: {
	        display: 'flex',
	        justifyContent: 'space-between',
	        marginBottom: '7x'
	    }
	};
	
	function WeatherInfoRender() {
	    var getWeatherData = function () {
	        var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(event) {
	            var city, fetchData, jsonData;
	            return _regenerator2.default.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            event.preventDefault();
	
	                            _context.prev = 1;
	                            city = event.target.elements.city.value;
	                            _context.next = 5;
	                            return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&&appid=' + API_KEY + '&units=metric');
	
	                        case 5:
	                            fetchData = _context.sent;
	                            _context.next = 8;
	                            return fetchData.json();
	
	                        case 8:
	                            jsonData = _context.sent;
	
	
	                            setData({
	                                name: jsonData.name,
	                                temp: jsonData.main.temp,
	                                feelsLike: jsonData.main.feels_like,
	                                tempMax: jsonData.main.temp_max,
	                                tempMin: jsonData.main.temp_min,
	                                wind: jsonData.wind,
	                                sunRise: jsonData.sys.sunrise,
	                                sunSet: jsonData.sys.sunset,
	                                pressure: jsonData.main.pressure,
	                                humidity: jsonData.main.humidity
	                            });
	                            _context.next = 15;
	                            break;
	
	                        case 12:
	                            _context.prev = 12;
	                            _context.t0 = _context['catch'](1);
	
	                            console.log(_context.t0.message);
	
	                        case 15:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this, [[1, 12]]);
	        }));
	
	        return function getWeatherData(_x) {
	            return _ref.apply(this, arguments);
	        };
	    }();
	
	    var _useState = (0, _react.useState)({
	        name: undefined,
	        temp: undefined,
	        feelsLike: undefined,
	        tempMax: undefined,
	        tempMin: undefined,
	        sunRise: undefined,
	        sunSet: undefined,
	        wind: undefined,
	        pressure: undefined,
	        humidity: undefined
	    }),
	        _useState2 = _slicedToArray(_useState, 2),
	        data = _useState2[0],
	        setData = _useState2[1];
	
	    ;
	
	    (0, _react.useEffect)(function () {
	        var f = function () {
	            var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
	                var data, jsonData;
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                _context2.next = 2;
	                                return fetch('https://api.openweathermap.org/data/2.5/weather?q=Kiev&&appid=' + API_KEY + '&units=metric');
	
	                            case 2:
	                                data = _context2.sent;
	                                _context2.next = 5;
	                                return data.json();
	
	                            case 5:
	                                jsonData = _context2.sent;
	
	                                setData({
	                                    name: jsonData.name,
	                                    temp: jsonData.main.temp,
	                                    feelsLike: jsonData.main.feels_like,
	                                    tempMax: jsonData.main.temp_max,
	                                    tempMin: jsonData.main.temp_min,
	                                    wind: jsonData.wind,
	                                    sunRise: jsonData.sys.sunrise,
	                                    sunSet: jsonData.sys.sunset,
	                                    pressure: jsonData.main.pressure,
	                                    humidity: jsonData.main.humidity
	                                });
	
	                            case 7:
	                            case 'end':
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	
	            return function f() {
	                return _ref2.apply(this, arguments);
	            };
	        }();
	
	        ;
	        f();
	    }, []);
	
	    return _react2.default.createElement(
	        'div',
	        { className: 'mainDiv', style: style.mainDiv },
	        _react2.default.createElement(
	            'div',
	            { style: style.nameInputDiv },
	            data.name ? _react2.default.createElement(
	                'div',
	                { style: style.dataName },
	                'Weather in ',
	                data.name,
	                ' today'
	            ) : _react2.default.createElement(
	                'p',
	                null,
	                'Check your internet connection!'
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'form',
	                    { className: 'formInput', style: { display: 'flex' }, onSubmit: function onSubmit(event) {
	                            return getWeatherData(event);
	                        } },
	                    _react2.default.createElement('input', { className: 'inputText', type: 'text', placeholder: 'Type a city name...', name: 'city' }),
	                    _react2.default.createElement('input', { className: 'inputSubmit', type: 'submit', value: 'Find' })
	                )
	            )
	        ),
	        data.name ? _react2.default.createElement(_WeatherInfo2.default, { data: data }) : _react2.default.createElement('p', null)
	    );
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _App = __webpack_require__(6);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(18);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 18 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };
	
	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }
	
	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof global.process === "object" && global.process.domain) {
	      invoke = global.process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      context.method = method;
	      context.arg = arg;
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }
	
	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;
	
	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }
	
	          context.dispatchException(context.arg);
	
	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          if (record.arg === ContinueSentinel) {
	            continue;
	          }
	
	          return {
	            value: record.arg,
	            done: context.done
	          };
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;
	
	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);
	
	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }
	
	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }
	
	      return ContinueSentinel;
	    }
	
	    var record = tryCatch(method, delegate.iterator, context.arg);
	
	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }
	
	    var info = record.arg;
	
	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }
	
	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;
	
	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;
	
	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }
	
	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }
	
	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.method = "next";
	      this.arg = undefined;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	
	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }
	
	        return !! caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }
	
	      return this.complete(record);
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	
	      return ContinueSentinel;
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */
19,
/* 21 */
19,
/* 22 */
19,
/* 23 */
19,
/* 24 */
/***/ function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//This file contains the ES6 extensions to the core Promises/A+ API
	
	var Promise = __webpack_require__(2);
	
	module.exports = Promise;
	
	/* Static Functions */
	
	var TRUE = valuePromise(true);
	var FALSE = valuePromise(false);
	var NULL = valuePromise(null);
	var UNDEFINED = valuePromise(undefined);
	var ZERO = valuePromise(0);
	var EMPTYSTRING = valuePromise('');
	
	function valuePromise(value) {
	  var p = new Promise(Promise._61);
	  p._81 = 1;
	  p._65 = value;
	  return p;
	}
	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value;
	
	  if (value === null) return NULL;
	  if (value === undefined) return UNDEFINED;
	  if (value === true) return TRUE;
	  if (value === false) return FALSE;
	  if (value === 0) return ZERO;
	  if (value === '') return EMPTYSTRING;
	
	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then;
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value));
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex);
	      });
	    }
	  }
	  return valuePromise(value);
	};
	
	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);
	
	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(i, val) {
	      if (val && (typeof val === 'object' || typeof val === 'function')) {
	        if (val instanceof Promise && val.then === Promise.prototype.then) {
	          while (val._81 === 3) {
	            val = val._65;
	          }
	          if (val._81 === 1) return res(i, val._65);
	          if (val._81 === 2) reject(val._65);
	          val.then(function (val) {
	            res(i, val);
	          }, reject);
	          return;
	        } else {
	          var then = val.then;
	          if (typeof then === 'function') {
	            var p = new Promise(then.bind(val));
	            p.then(function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          }
	        }
	      }
	      args[i] = val;
	      if (--remaining === 0) {
	        resolve(args);
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};
	
	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
	    reject(value);
	  });
	};
	
	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    });
	  });
	};
	
	/* Prototype Methods */
	
	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = __webpack_require__(2);
	
	var DEFAULT_WHITELIST = [
	  ReferenceError,
	  TypeError,
	  RangeError
	];
	
	var enabled = false;
	exports.disable = disable;
	function disable() {
	  enabled = false;
	  Promise._10 = null;
	  Promise._97 = null;
	}
	
	exports.enable = enable;
	function enable(options) {
	  options = options || {};
	  if (enabled) disable();
	  enabled = true;
	  var id = 0;
	  var displayId = 0;
	  var rejections = {};
	  Promise._10 = function (promise) {
	    if (
	      promise._81 === 2 && // IS REJECTED
	      rejections[promise._72]
	    ) {
	      if (rejections[promise._72].logged) {
	        onHandled(promise._72);
	      } else {
	        clearTimeout(rejections[promise._72].timeout);
	      }
	      delete rejections[promise._72];
	    }
	  };
	  Promise._97 = function (promise, err) {
	    if (promise._45 === 0) { // not yet handled
	      promise._72 = id++;
	      rejections[promise._72] = {
	        displayId: null,
	        error: err,
	        timeout: setTimeout(
	          onUnhandled.bind(null, promise._72),
	          // For reference errors and type errors, this almost always
	          // means the programmer made a mistake, so log them after just
	          // 100ms
	          // otherwise, wait 2 seconds to see if they get handled
	          matchWhitelist(err, DEFAULT_WHITELIST)
	            ? 100
	            : 2000
	        ),
	        logged: false
	      };
	    }
	  };
	  function onUnhandled(id) {
	    if (
	      options.allRejections ||
	      matchWhitelist(
	        rejections[id].error,
	        options.whitelist || DEFAULT_WHITELIST
	      )
	    ) {
	      rejections[id].displayId = displayId++;
	      if (options.onUnhandled) {
	        rejections[id].logged = true;
	        options.onUnhandled(
	          rejections[id].displayId,
	          rejections[id].error
	        );
	      } else {
	        rejections[id].logged = true;
	        logError(
	          rejections[id].displayId,
	          rejections[id].error
	        );
	      }
	    }
	  }
	  function onHandled(id) {
	    if (rejections[id].logged) {
	      if (options.onHandled) {
	        options.onHandled(rejections[id].displayId, rejections[id].error);
	      } else if (!rejections[id].onUnhandled) {
	        console.warn(
	          'Promise Rejection Handled (id: ' + rejections[id].displayId + '):'
	        );
	        console.warn(
	          '  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id ' +
	          rejections[id].displayId + '.'
	        );
	      }
	    }
	  }
	}
	
	function logError(id, error) {
	  console.warn('Possible Unhandled Promise Rejection (id: ' + id + '):');
	  var errStr = (error && (error.stack || error)) + '';
	  errStr.split('\n').forEach(function (line) {
	    console.warn('  ' + line);
	  });
	}
	
	function matchWhitelist(error, list) {
	  return list.some(function (cls) {
	    return error instanceof cls;
	  });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=__webpack_require__(1),n=function(e,n){var t;return null==(t=e.classList)?void 0:t.contains(n)},t=function(e,t){for(var r=e.target||e;r;){if(Array.isArray(t)){if(t.some((function(e){return n(r,e)})))return!0}else if(n(r,t))return!0;r=r.parentElement}return!1},r=function(e){return!(!e.includes("touch")||!function(){if("undefined"==typeof window||"function"!=typeof window.addEventListener)return!1;var e=!1,n=Object.defineProperty({},"passive",{get:function(){e=!0}}),t=function(){return null};return window.addEventListener("test",t,n),window.removeEventListener("test",t,n),e}())&&{passive:!0}};exports.DEFAULT_IGNORE_CLASS="ignore-onclickoutside",exports.default=function(n,u){var i=void 0===u?{}:u,o=i.refs,c=i.disabled,s=i.eventTypes,f=void 0===s?["mousedown","touchstart"]:s,d=i.excludeScrollbar,a=i.ignoreClass,l=void 0===a?"ignore-onclickoutside":a,v=i.detectIFrame,m=void 0===v||v,E=e.useState([]),w=E[0],p=E[1],g=e.useRef(n);g.current=n;var h=e.useCallback((function(e){return p((function(n){return[].concat(n,[{current:e}])}))}),[]);return e.useEffect((function(){if(null!=o&&o.length||w.length){var e=function(){var e=[];return(o||w).forEach((function(n){var t=n.current;return t&&e.push(t)})),e},n=function(n){t(n,l)||d&&function(e){return document.documentElement.clientWidth<=e.clientX||document.documentElement.clientHeight<=e.clientY}(n)||!e().every((function(e){return!e.contains(n.target)}))||g.current(n)},u=function(n){return setTimeout((function(){var r=document.activeElement;"IFRAME"!==(null==r?void 0:r.tagName)||t(r,l)||e().includes(r)||g.current(n)}),0)},i=function(){f.forEach((function(e){return document.removeEventListener(e,n,r(e))})),m&&window.removeEventListener("blur",u)};if(!c)return f.forEach((function(e){return document.addEventListener(e,n,r(e))})),m&&window.addEventListener("blur",u),function(){return i()};i()}}),[w,l,d,c,m,JSON.stringify(f)]),h};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license React
	 * react-dom.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	/*
	 Modernizr 3.0.0pre (Custom Build) | MIT
	*/
	'use strict';var aa=__webpack_require__(1),ca=__webpack_require__(34);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b)}
	function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a])}
	var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
	{},ma={};function oa(a){if(ja.call(ma,a))return!0;if(ja.call(la,a))return!1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return!1}function pa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
	function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var z={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1)});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1)});
	["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
	sa);z[b]=new v(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1)});
	z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0)});
	function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}
	var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
	var Ia=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return"function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||""}return"\n"+La+a}var Na=!1;
	function Oa(a,b){if(!a||Na)return"";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
	f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Ma(a):""}
	function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return""}}
	function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return(a.displayName||"Context")+".Consumer";case Ba:return(a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
	b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
	function Ra(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return"Offscreen";
	case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}
	function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
	null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
	function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1)}
	function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
	function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
	function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var eb=Array.isArray;
	function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
	function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
	function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function kb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
	function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var mb,nb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
	function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
	var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
	zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a]})});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
	function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
	function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
	function vb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
	function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb()}}
	function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
	typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb)}catch(a){Lb=!1}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments)}
	function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=l)}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
	function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
	c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling}return null}
	var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128))}catch(b){}}
	var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
	function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
	default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)))}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
	function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
	function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
	function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
	function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId)}}
	function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
	function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return!1}
	function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
	function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift()}return!0}function Zc(a,b,c){Xc(a)&&c.delete(b)}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc)}
	function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}
	function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;
	function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d)}finally{C=e,cd.transition=f}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d)}finally{C=e,cd.transition=f}}
	function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else hd(a,b,d,null,c)}}var id=null;
	function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);id=a;return null}
	function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
	case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
	function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
	function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
	(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
	var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
	a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
	Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
	119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
	var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
	a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
	deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
	function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
	function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
	var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
	function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b)}}
	function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
	function Ie(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return!1}return!0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
	function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Je(c)}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
	function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
	function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
	d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}
	var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
	function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
	function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
	ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function ff(a,b){df.set(a,b);fa(b,[a])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
	ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
	fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
	function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null}
	function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
	function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d))}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b))}}
	function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
	function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Jb(function(){var d=f,e=xb(c),g=[];
	a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
	Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
	w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
	n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
	vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x)}t=null}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else{na=De;var xa=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
	xa.controlled&&"number"===h.type&&cb(h,"number",h.value)}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
	break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
	0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a)}se(g,b)})}function tf(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
	function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
	var Cf=null,Df=null;function Ef(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
	var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;})}
	function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);bd(b)}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
	function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
	function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[Of]||a[uf];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return{current:a}}
	function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
	function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H)}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c)}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
	function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return!0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c)}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a)}function ig(a){fg=!0;hg(a)}
	function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b}
	function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a}else rg=1<<f|c<<e|d,sg=a}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0))}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;
	function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
	function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
	null,!0):!1;default:return!1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a)}}else{if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a}
	function Gg(a){if(a!==xg)return!1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling)}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}yg=
	null}}else yg=xg?Lf(a.stateNode.nextSibling):null;return!0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling)}function Ig(){yg=xg=null;I=!1}function Jg(a){null===zg?zg=[a]:zg.push(a)}var Kg=ua.ReactCurrentBatchConfig;function Lg(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var Mg=Uf(null),Ng=null,Og=null,Pg=null;function Qg(){Pg=Og=Ng=null}function Rg(a){var b=Mg.current;E(Mg);a._currentValue=b}
	function Sg(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Tg(a,b){Ng=a;Pg=Og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(Ug=!0),a.firstContext=null)}
	function Vg(a){var b=a._currentValue;if(Pg!==a)if(a={context:a,memoizedValue:b,next:null},null===Og){if(null===Ng)throw Error(p(308));Og=a;Ng.dependencies={lanes:0,firstContext:a}}else Og=Og.next=a;return b}var Wg=null;function Xg(a){null===Wg?Wg=[a]:Wg.push(a)}function Yg(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,Xg(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Zg(a,d)}
	function Zg(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var $g=!1;function ah(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
	function bh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function ch(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
	function dh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return Zg(a,c)}e=d.interleaved;null===e?(b.next=b,Xg(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Zg(a,c)}function eh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
	function fh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
	b;c.lastBaseUpdate=b}
	function gh(a,b,c,d){var e=a.updateQueue;$g=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k))}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
	next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:$g=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
	h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);hh|=g;a.lanes=g;a.memoizedState=q}}
	function ih(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d)}}}var jh=(new aa.Component).refs;function kh(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
	var nh={isMounted:function(a){return(a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=L(),e=lh(a),f=ch(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=dh(a,f,e);null!==b&&(mh(b,a,e,d),eh(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=L(),e=lh(a),f=ch(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=dh(a,f,e);null!==b&&(mh(b,a,e,d),eh(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=L(),d=
	lh(a),e=ch(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=dh(a,e,d);null!==b&&(mh(b,a,d,c),eh(b,a,d))}};function oh(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
	function ph(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=Vg(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=nh;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
	function qh(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&nh.enqueueReplaceState(b,b.state,null)}
	function rh(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=jh;ah(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=Vg(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(kh(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
	"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&nh.enqueueReplaceState(e,e.state,null),gh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}
	function sh(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;b===jh&&(b=e.refs={});null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
	function th(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function uh(a){var b=a._init;return b(a._payload)}
	function vh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=wh(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
	null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=xh(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&uh(f)===b.type))return d=e(b,c.props),d.ref=sh(a,b,c),d.return=a,d;d=yh(c.type,c.key,c.props,null,a.mode,d);d.ref=sh(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
	b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=zh(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Ah(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=xh(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=yh(b.type,b.key,b.props,null,a.mode,c),
	c.ref=sh(a,null,b),c.return=a,c;case wa:return b=zh(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Ah(b,a.mode,c,null),b.return=a,b;th(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
	b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);th(a,c)}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);th(b,d)}return null}
	function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
	x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x}if(n.done)return c(e,
	m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
	f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&uh(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=sh(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ya?(d=Ah(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=yh(f.type,f.key,f.props,null,a.mode,h),h.ref=sh(a,d,f),h.return=a,a=h)}return g(a);case wa:a:{for(l=f.key;null!==
	d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=zh(f,a.mode,h);d.return=a;a=d}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);th(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
	(c(a,d),d=xh(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Bh=vh(!0),Ch=vh(!1),Dh={},Eh=Uf(Dh),Fh=Uf(Dh),Gh=Uf(Dh);function Hh(a){if(a===Dh)throw Error(p(174));return a}function Ih(a,b){G(Gh,b);G(Fh,a);G(Eh,Dh);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a)}E(Eh);G(Eh,b)}function Jh(){E(Eh);E(Fh);E(Gh)}
	function Kh(a){Hh(Gh.current);var b=Hh(Eh.current);var c=lb(b,a.type);b!==c&&(G(Fh,a),G(Eh,c))}function Lh(a){Fh.current===a&&(E(Eh),E(Fh))}var M=Uf(0);
	function Mh(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var Nh=[];
	function Oh(){for(var a=0;a<Nh.length;a++)Nh[a]._workInProgressVersionPrimary=null;Nh.length=0}var Ph=ua.ReactCurrentDispatcher,Qh=ua.ReactCurrentBatchConfig,Rh=0,N=null,O=null,P=null,Sh=!1,Th=!1,Uh=0,Vh=0;function Q(){throw Error(p(321));}function Wh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
	function Xh(a,b,c,d,e,f){Rh=f;N=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Ph.current=null===a||null===a.memoizedState?Yh:Zh;a=c(d,e);if(Th){f=0;do{Th=!1;Uh=0;if(25<=f)throw Error(p(301));f+=1;P=O=null;b.updateQueue=null;Ph.current=$h;a=c(d,e)}while(Th)}Ph.current=ai;b=null!==O&&null!==O.next;Rh=0;P=O=N=null;Sh=!1;if(b)throw Error(p(300));return a}function bi(){var a=0!==Uh;Uh=0;return a}
	function ci(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===P?N.memoizedState=P=a:P=P.next=a;return P}function di(){if(null===O){var a=N.alternate;a=null!==a?a.memoizedState:null}else a=O.next;var b=null===P?N.memoizedState:P.next;if(null!==b)P=b,O=a;else{if(null===a)throw Error(p(310));O=a;a={memoizedState:O.memoizedState,baseState:O.baseState,baseQueue:O.baseQueue,queue:O.queue,next:null};null===P?N.memoizedState=P=a:P=P.next=a}return P}
	function ei(a,b){return"function"===typeof b?b(a):b}
	function fi(a){var b=di(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=O,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Rh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
	eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;N.lanes|=m;hh|=m}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(Ug=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,N.lanes|=f,hh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
	function gi(a){var b=di(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(Ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function hi(){}
	function ii(a,b){var c=N,d=di(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,Ug=!0);d=d.queue;ji(ki.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==P&&P.memoizedState.tag&1){c.flags|=2048;li(9,mi.bind(null,c,d,e,b),void 0,null);if(null===R)throw Error(p(349));0!==(Rh&30)||ni(c,b,e)}return e}function ni(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=N.updateQueue;null===b?(b={lastEffect:null,stores:null},N.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
	function mi(a,b,c,d){b.value=c;b.getSnapshot=d;oi(b)&&pi(a)}function ki(a,b,c){return c(function(){oi(b)&&pi(a)})}function oi(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!He(a,c)}catch(d){return!0}}function pi(a){var b=Zg(a,1);null!==b&&mh(b,a,1,-1)}
	function qi(a){var b=ci();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ei,lastRenderedState:a};b.queue=a;a=a.dispatch=ri.bind(null,N,a);return[b.memoizedState,a]}
	function li(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=N.updateQueue;null===b?(b={lastEffect:null,stores:null},N.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function si(){return di().memoizedState}function ti(a,b,c,d){var e=ci();N.flags|=a;e.memoizedState=li(1|b,c,void 0,void 0===d?null:d)}
	function ui(a,b,c,d){var e=di();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&Wh(d,g.deps)){e.memoizedState=li(b,c,f,d);return}}N.flags|=a;e.memoizedState=li(1|b,c,f,d)}function vi(a,b){return ti(8390656,8,a,b)}function ji(a,b){return ui(2048,8,a,b)}function wi(a,b){return ui(4,2,a,b)}function xi(a,b){return ui(4,4,a,b)}
	function yi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function zi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ui(4,4,yi.bind(null,b,a),c)}function Ai(){}function Bi(a,b){var c=di();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Wh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
	function Ci(a,b){var c=di();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Wh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Di(a,b,c){if(0===(Rh&21))return a.baseState&&(a.baseState=!1,Ug=!0),a.memoizedState=c;He(c,b)||(c=yc(),N.lanes|=c,hh|=c,a.baseState=!0);return b}function Ei(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Qh.transition;Qh.transition={};try{a(!1),b()}finally{C=c,Qh.transition=d}}function Fi(){return di().memoizedState}
	function Gi(a,b,c){var d=lh(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Hi(a))Ii(b,c);else if(c=Yg(a,b,c,d),null!==c){var e=L();mh(c,a,d,e);Ji(c,b,d)}}
	function ri(a,b,c){var d=lh(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Hi(a))Ii(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,Xg(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=Yg(a,b,e,d);null!==c&&(e=L(),mh(c,a,d,e),Ji(c,b,d))}}
	function Hi(a){var b=a.alternate;return a===N||null!==b&&b===N}function Ii(a,b){Th=Sh=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Ji(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
	var ai={readContext:Vg,useCallback:Q,useContext:Q,useEffect:Q,useImperativeHandle:Q,useInsertionEffect:Q,useLayoutEffect:Q,useMemo:Q,useReducer:Q,useRef:Q,useState:Q,useDebugValue:Q,useDeferredValue:Q,useTransition:Q,useMutableSource:Q,useSyncExternalStore:Q,useId:Q,unstable_isNewReconciler:!1},Yh={readContext:Vg,useCallback:function(a,b){ci().memoizedState=[a,void 0===b?null:b];return a},useContext:Vg,useEffect:vi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ti(4194308,
	4,yi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ti(4194308,4,a,b)},useInsertionEffect:function(a,b){return ti(4,2,a,b)},useMemo:function(a,b){var c=ci();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=ci();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=Gi.bind(null,N,a);return[d.memoizedState,a]},useRef:function(a){var b=
	ci();a={current:a};return b.memoizedState=a},useState:qi,useDebugValue:Ai,useDeferredValue:function(a){return ci().memoizedState=a},useTransition:function(){var a=qi(!1),b=a[0];a=Ei.bind(null,a[1]);ci().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=N,e=ci();if(I){if(void 0===c)throw Error(p(407));c=c()}else{c=b();if(null===R)throw Error(p(349));0!==(Rh&30)||ni(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;vi(ki.bind(null,d,
	f,a),[a]);d.flags|=2048;li(9,mi.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=ci(),b=R.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Uh++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Vh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Zh={readContext:Vg,useCallback:Bi,useContext:Vg,useEffect:ji,useImperativeHandle:zi,useInsertionEffect:wi,useLayoutEffect:xi,useMemo:Ci,useReducer:fi,useRef:si,useState:function(){return fi(ei)},
	useDebugValue:Ai,useDeferredValue:function(a){var b=di();return Di(b,O.memoizedState,a)},useTransition:function(){var a=fi(ei)[0],b=di().memoizedState;return[a,b]},useMutableSource:hi,useSyncExternalStore:ii,useId:Fi,unstable_isNewReconciler:!1},$h={readContext:Vg,useCallback:Bi,useContext:Vg,useEffect:ji,useImperativeHandle:zi,useInsertionEffect:wi,useLayoutEffect:xi,useMemo:Ci,useReducer:gi,useRef:si,useState:function(){return gi(ei)},useDebugValue:Ai,useDeferredValue:function(a){var b=di();return null===
	O?b.memoizedState=a:Di(b,O.memoizedState,a)},useTransition:function(){var a=gi(ei)[0],b=di().memoizedState;return[a,b]},useMutableSource:hi,useSyncExternalStore:ii,useId:Fi,unstable_isNewReconciler:!1};function Ki(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function Li(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}
	function Mi(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Ni="function"===typeof WeakMap?WeakMap:Map;function Oi(a,b,c){c=ch(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Pi||(Pi=!0,Qi=d);Mi(a,b)};return c}
	function Ri(a,b,c){c=ch(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Mi(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Mi(a,b);"function"!==typeof d&&(null===Si?Si=new Set([this]):Si.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
	function Ti(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Ni;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ui.bind(null,a,b,c),b.then(a,a))}function Vi(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
	function Wi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=ch(-1,1),b.tag=2,dh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Xi=ua.ReactCurrentOwner,Ug=!1;function Yi(a,b,c,d){b.child=null===a?Ch(b,null,c,d):Bh(b,a.child,c,d)}
	function Zi(a,b,c,d,e){c=c.render;var f=b.ref;Tg(b,e);d=Xh(a,b,c,d,f,e);c=bi();if(null!==a&&!Ug)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,$i(a,b,e);I&&c&&vg(b);b.flags|=1;Yi(a,b,d,e);return b.child}
	function aj(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!bj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,cj(a,b,f,d,e);a=yh(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return $i(a,b,e)}b.flags|=1;a=wh(f,d);a.ref=b.ref;a.return=b;return b.child=a}
	function cj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(Ug=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(Ug=!0);else return b.lanes=a.lanes,$i(a,b,e)}return dj(a,b,c,d,e)}
	function ej(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(fj,gj),gj|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(fj,gj),gj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(fj,gj);gj|=d}else null!==
	f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(fj,gj),gj|=d;Yi(a,b,e,c);return b.child}function hj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function dj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);Tg(b,e);c=Xh(a,b,c,d,f,e);d=bi();if(null!==a&&!Ug)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,$i(a,b,e);I&&d&&vg(b);b.flags|=1;Yi(a,b,c,e);return b.child}
	function ij(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b)}else f=!1;Tg(b,e);if(null===b.stateNode)jj(a,b),ph(b,c,d),rh(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=Vg(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
	(h!==d||k!==l)&&qh(b,g,d,l);$g=!1;var r=b.memoizedState;g.state=r;gh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||$g?("function"===typeof m&&(kh(b,c,m,d),k=b.memoizedState),(h=$g||oh(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
	("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;bh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Lg(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=Vg(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
	"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&qh(b,g,d,k);$g=!1;r=b.memoizedState;g.state=r;gh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||$g?("function"===typeof y&&(kh(b,c,y,d),n=b.memoizedState),(l=$g||oh(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
	g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
	a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return kj(a,b,c,d,f,e)}
	function kj(a,b,c,d,e,f){hj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),$i(a,b,f);d=b.stateNode;Xi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Bh(b,a.child,null,f),b.child=Bh(b,null,h,f)):Yi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function lj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);Ih(a,b.containerInfo)}
	function mj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Yi(a,b,c,d);return b.child}var nj={dehydrated:null,treeContext:null,retryLane:0};function oj(a){return{baseLanes:a,cachePool:null,transitions:null}}
	function pj(a,b,c){var d=b.pendingProps,e=M.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(M,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
	g):f=qj(g,d,0,null),a=Ah(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=oj(c),b.memoizedState=nj,a):rj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return sj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=wh(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=wh(h,f):(f=Ah(f,g,c,null),f.flags|=2);f.return=
	b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?oj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=nj;return d}f=a.child;a=f.sibling;d=wh(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
	function rj(a,b){b=qj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function tj(a,b,c,d){null!==d&&Jg(d);Bh(b,a.child,null,c);a=rj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
	function sj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Li(Error(p(422))),tj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=qj({mode:"visible",children:d.children},e,0,null);f=Ah(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Bh(b,a.child,null,g);b.child.memoizedState=oj(g);b.memoizedState=nj;return f}if(0===(b.mode&1))return tj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
	if(d)var h=d.dgst;d=h;f=Error(p(419));d=Li(f,d,void 0);return tj(a,b,g,d)}h=0!==(g&a.childLanes);if(Ug||h){d=R;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;
	0!==e&&e!==f.retryLane&&(f.retryLane=e,Zg(a,e),mh(d,a,e,-1))}uj();d=Li(Error(p(421)));return tj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=rj(b,d.children);b.flags|=4096;return b}function wj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);Sg(a.return,b,c)}
	function xj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
	function yj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Yi(a,b,d.children,c);d=M.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&wj(a,c,b);else if(19===a.tag)wj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}G(M,d);if(0===(b.mode&1))b.memoizedState=
	null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Mh(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);xj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Mh(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}xj(b,!0,c,null,f);break;case "together":xj(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
	function jj(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function $i(a,b,c){null!==a&&(b.dependencies=a.dependencies);hh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=wh(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=wh(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
	function zj(a,b,c){switch(b.tag){case 3:lj(b);Ig();break;case 5:Kh(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:Ih(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Mg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(M,M.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return pj(a,b,c);G(M,M.current&1);a=$i(a,b,c);return null!==a?a.sibling:null}G(M,M.current&1);break;case 19:d=0!==(c&
	b.childLanes);if(0!==(a.flags&128)){if(d)return yj(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(M,M.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,ej(a,b,c)}return $i(a,b,c)}var Aj,Bj,Cj,Dj;
	Aj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Bj=function(){};
	Cj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;Hh(Eh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf)}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
	(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,
	c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4}};Dj=function(a,b,c,d){c!==d&&(b.flags|=4)};
	function Ej(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
	function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
	function Fj(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;Jh();E(Wf);E(H);Oh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Gj(zg),zg=null));Bj(a,b);S(b);return null;case 5:Lh(b);var e=Hh(Gh.current);
	c=b.type;if(null!==a&&null!=b.stateNode)Cj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=Hh(Eh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
	d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d)}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
	h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d)}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
	"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;Aj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
	a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
	c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g))}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
	!0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}S(b);return null;case 6:if(a&&null!=b.stateNode)Dj(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=Hh(Gh.current);Hh(Eh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
	xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d}S(b);return null;case 13:E(M);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
	a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1}else null!==zg&&(Gj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(M.current&1)?0===T&&(T=3):uj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return Jh(),
	Bj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return Rg(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(M);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Ej(f,!1);else{if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Mh(a);if(null!==g){b.flags|=128;Ej(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
	g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(M,M.current&1|2);return b.child}a=
	a.sibling}null!==f.tail&&B()>Hj&&(b.flags|=128,d=!0,Ej(f,!1),b.lanes=4194304)}else{if(!d)if(a=Mh(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Ej(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Hj&&1073741824!==c&&(b.flags|=128,d=!0,Ej(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=
	b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=M.current,G(M,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Ij(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(gj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
	function Jj(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Jh(),E(Wf),E(H),Oh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Lh(b),null;case 13:E(M);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(M),null;case 4:return Jh(),null;case 10:return Rg(b.type._context),null;case 22:case 23:return Ij(),
	null;case 24:return null;default:return null}}var Kj=!1,U=!1,Lj="function"===typeof WeakSet?WeakSet:Set,V=null;function Mj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){W(a,b,d)}else c.current=null}function Nj(a,b,c){try{c()}catch(d){W(a,b,d)}}var Oj=!1;
	function Pj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
	q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode}q=y}c=-1===h||-1===k?null:{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
	case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Lg(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F)}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return}n=Oj;Oj=!1;return n}
	function Qj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Nj(b,c,f)}e=e.next}while(e!==d)}}function Rj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Sj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}
	function Tj(a){var b=a.alternate;null!==b&&(a.alternate=null,Tj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Uj(a){return 5===a.tag||3===a.tag||4===a.tag}
	function Vj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Uj(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
	function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling}
	function Xj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Xj(a,b,c),a=a.sibling;null!==a;)Xj(a,b,c),a=a.sibling}var X=null,Yj=!1;function Zj(a,b,c){for(c=c.child;null!==c;)ak(a,b,c),c=c.sibling}
	function ak(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c)}catch(h){}switch(c.tag){case 5:U||Mj(c,b);case 6:var d=X,e=Yj;X=null;Zj(a,b,c);X=d;Yj=e;null!==X&&(Yj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Yj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Yj;X=c.stateNode.containerInfo;Yj=!0;
	Zj(a,b,c);X=d;Yj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Nj(c,b,g):0!==(f&4)&&Nj(c,b,g));e=e.next}while(e!==d)}Zj(a,b,c);break;case 1:if(!U&&(Mj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){W(c,b,h)}Zj(a,b,c);break;case 21:Zj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
	c.memoizedState,Zj(a,b,c),U=d):Zj(a,b,c);break;default:Zj(a,b,c)}}function bk(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Lj);b.forEach(function(b){var d=ck.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
	function dk(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Yj=!1;break a;case 3:X=h.stateNode.containerInfo;Yj=!0;break a;case 4:X=h.stateNode.containerInfo;Yj=!0;break a}h=h.return}if(null===X)throw Error(p(160));ak(f,g,e);X=null;Yj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){W(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)ek(b,a),b=b.sibling}
	function ek(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:dk(b,a);fk(a);if(d&4){try{Qj(3,a,a.return),Rj(3,a)}catch(t){W(a,a.return,t)}try{Qj(5,a,a.return)}catch(t){W(a,a.return,t)}}break;case 1:dk(b,a);fk(a);d&512&&null!==c&&Mj(c,c.return);break;case 5:dk(b,a);fk(a);d&512&&null!==c&&Mj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"")}catch(t){W(a,a.return,t)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
	a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l)}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
	f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1))}e[Pf]=f}catch(t){W(a,a.return,t)}}break;case 6:dk(b,a);fk(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(t){W(a,a.return,t)}}break;case 3:dk(b,a);fk(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo)}catch(t){W(a,a.return,t)}break;case 4:dk(b,a);fk(a);break;case 13:dk(b,a);fk(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
	null!==e.alternate&&null!==e.alternate.memoizedState||(gk=B()));d&4&&bk(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,dk(b,a),U=l):dk(b,a);fk(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Qj(4,r,r.return);break;case 1:Mj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
	b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount()}catch(t){W(d,c,t)}}break;case 5:Mj(r,r.return);break;case 22:if(null!==r.memoizedState){hk(q);continue}}null!==y?(y.return=r,V=y):hk(q)}m=m.sibling}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
	rb("display",g))}catch(t){W(a,a.return,t)}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps}catch(t){W(a,a.return,t)}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling}}break;case 19:dk(b,a);fk(a);d&4&&bk(a);break;case 21:break;default:dk(b,
	a),fk(a)}}function fk(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Uj(c)){var d=c;break a}c=c.return}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Vj(a);Xj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Vj(a);Wj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function ik(a,b,c){V=a;jk(a,b,c)}
	function jk(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Kj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Kj;var l=U;Kj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?kk(e):null!==k?(k.return=g,V=k):kk(e);for(;null!==f;)V=f,jk(f,b,c),f=f.sibling;V=e;Kj=h;U=l}lk(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):lk(a,b,c)}}
	function lk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Rj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Lg(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&ih(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
	b.child.stateNode;break;case 1:c=b.child.stateNode}ih(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
	default:throw Error(p(163));}U||b.flags&512&&Sj(b)}catch(r){W(b,b.return,r)}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}function hk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}
	function kk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Rj(4,b)}catch(k){W(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){W(b,e,k)}}var f=b.return;try{Sj(b)}catch(k){W(b,f,k)}break;case 5:var g=b.return;try{Sj(b)}catch(k){W(b,g,k)}}}catch(k){W(b,b.return,k)}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return}}
	var mk=Math.ceil,nk=ua.ReactCurrentDispatcher,ok=ua.ReactCurrentOwner,pk=ua.ReactCurrentBatchConfig,K=0,R=null,Y=null,Z=0,gj=0,fj=Uf(0),T=0,qk=null,hh=0,rk=0,sk=0,tk=null,uk=null,gk=0,Hj=Infinity,vk=null,Pi=!1,Qi=null,Si=null,wk=!1,xk=null,yk=0,zk=0,Ak=null,Bk=-1,Ck=0;function L(){return 0!==(K&6)?B():-1!==Bk?Bk:Bk=B()}
	function lh(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Ck&&(Ck=yc()),Ck;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function mh(a,b,c,d){if(50<zk)throw zk=0,Ak=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==R)a===R&&(0===(K&2)&&(rk|=c),4===T&&Dk(a,Z)),Ek(a,d),1===c&&0===K&&0===(b.mode&1)&&(Hj=B()+500,fg&&jg())}
	function Ek(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===R?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Fk.bind(null,a)):hg(Fk.bind(null,a)),Jf(function(){0===(K&6)&&jg()}),c=null;else{switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc}c=Gk(c,Hk.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
	function Hk(a,b){Bk=-1;Ck=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Ik()&&a.callbackNode!==c)return null;var d=uc(a,a===R?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Jk(a,d);else{b=d;var e=K;K|=2;var f=Kk();if(R!==a||Z!==b)vk=null,Hj=B()+500,Lk(a,b);do try{Mk();break}catch(h){Nk(a,h)}while(1);Qg();nk.current=f;K=e;null!==Y?b=0:(R=null,Z=0,b=T)}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Ok(a,e)));if(1===b)throw c=qk,Lk(a,0),Dk(a,d),Ek(a,B()),c;if(6===b)Dk(a,d);
	else{e=a.current.alternate;if(0===(d&30)&&!Pk(e)&&(b=Jk(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Ok(a,f))),1===b))throw c=qk,Lk(a,0),Dk(a,d),Ek(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Qk(a,uk,vk);break;case 3:Dk(a,d);if((d&130023424)===d&&(b=gk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){L();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Qk.bind(null,a,uk,vk),b);break}Qk(a,uk,vk);break;case 4:Dk(a,d);if((d&4194240)===
	d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*mk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Qk.bind(null,a,uk,vk),d);break}Qk(a,uk,vk);break;case 5:Qk(a,uk,vk);break;default:throw Error(p(329));}}}Ek(a,B());return a.callbackNode===c?Hk.bind(null,a):null}
	function Ok(a,b){var c=tk;a.current.memoizedState.isDehydrated&&(Lk(a,b).flags|=256);a=Jk(a,b);2!==a&&(b=uk,uk=c,null!==b&&Gj(b));return a}function Gj(a){null===uk?uk=a:uk.push.apply(uk,a)}
	function Pk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
	function Dk(a,b){b&=~sk;b&=~rk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d}}function Fk(a){if(0!==(K&6))throw Error(p(327));Ik();var b=uc(a,0);if(0===(b&1))return Ek(a,B()),null;var c=Jk(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Ok(a,d))}if(1===c)throw c=qk,Lk(a,0),Dk(a,b),Ek(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Qk(a,uk,vk);Ek(a,B());return null}
	function Rk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Hj=B()+500,fg&&jg())}}function Sk(a){null!==xk&&0===xk.tag&&0===(K&6)&&Ik();var b=K;K|=1;var c=pk.transition,d=C;try{if(pk.transition=null,C=1,a)return a()}finally{C=d,pk.transition=c,K=b,0===(K&6)&&jg()}}function Ij(){gj=fj.current;E(fj)}
	function Lk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:Jh();E(Wf);E(H);Oh();break;case 5:Lh(d);break;case 4:Jh();break;case 13:E(M);break;case 19:E(M);break;case 10:Rg(d.type._context);break;case 22:case 23:Ij()}c=c.return}R=a;Y=a=wh(a.current,null);Z=gj=b;T=0;qk=null;sk=rk=hh=0;uk=tk=null;if(null!==Wg){for(b=
	0;b<Wg.length;b++)if(c=Wg[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}Wg=null}return a}
	function Nk(a,b){do{var c=Y;try{Qg();Ph.current=ai;if(Sh){for(var d=N.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Sh=!1}Rh=0;P=O=N=null;Th=!1;Uh=0;ok.current=null;if(null===c||null===c.return){T=1;qk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
	m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Vi(g);if(null!==y){y.flags&=-257;Wi(y,g,h,f,b);y.mode&1&&Ti(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t}else n.add(k);break a}else{if(0===(b&1)){Ti(f,l,b);uj();break a}k=Error(p(426))}}else if(I&&h.mode&1){var J=Vi(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Wi(J,g,h,f,b);Jg(Ki(k,h));break a}}f=k=Ki(k,h);4!==T&&(T=2);null===tk?tk=[f]:tk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
	b&=-b;f.lanes|=b;var x=Oi(f,k,b);fh(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Si||!Si.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Ri(f,h,b);fh(f,F);break a}}f=f.return}while(null!==f)}Tk(c)}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Kk(){var a=nk.current;nk.current=ai;return null===a?ai:a}
	function uj(){if(0===T||3===T||2===T)T=4;null===R||0===(hh&268435455)&&0===(rk&268435455)||Dk(R,Z)}function Jk(a,b){var c=K;K|=2;var d=Kk();if(R!==a||Z!==b)vk=null,Lk(a,b);do try{Uk();break}catch(e){Nk(a,e)}while(1);Qg();K=c;nk.current=d;if(null!==Y)throw Error(p(261));R=null;Z=0;return T}function Uk(){for(;null!==Y;)Vk(Y)}function Mk(){for(;null!==Y&&!cc();)Vk(Y)}function Vk(a){var b=Wk(a.alternate,a,gj);a.memoizedProps=a.pendingProps;null===b?Tk(a):Y=b;ok.current=null}
	function Tk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Fj(c,b,gj),null!==c){Y=c;return}}else{c=Jj(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===T&&(T=5)}function Qk(a,b,c){var d=C,e=pk.transition;try{pk.transition=null,C=1,Xk(a,b,c,d)}finally{pk.transition=e,C=d}return null}
	function Xk(a,b,c,d){do Ik();while(null!==xk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===R&&(Y=R=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||wk||(wk=!0,Gk(hc,function(){Ik();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=pk.transition;pk.transition=null;
	var g=C;C=1;var h=K;K|=4;ok.current=null;Pj(a,c);ek(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;ik(c,a,e);dc();K=h;C=g;pk.transition=f}else a.current=c;wk&&(wk=!1,xk=a,yk=e);f=a.pendingLanes;0===f&&(Si=null);mc(c.stateNode,d);Ek(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Pi)throw Pi=!1,a=Qi,Qi=null,a;0!==(yk&1)&&0!==a.tag&&Ik();f=a.pendingLanes;0!==(f&1)?a===Ak?zk++:(zk=0,Ak=a):zk=0;jg();return null}
	function Ik(){if(null!==xk){var a=Dc(yk),b=pk.transition,c=C;try{pk.transition=null;C=16>a?16:a;if(null===xk)var d=!1;else{a=xk;xk=null;yk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Qj(8,m,f)}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Tj(m);if(m===
	l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J}while(null!==t)}}V=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Qj(9,f,f.return)}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
	u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Rj(9,h)}}catch(na){W(h,h.return,na)}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a)}catch(na){}d=!0}return d}finally{C=c,pk.transition=b}}return!1}function Yk(a,b,c){b=Ki(c,b);b=Oi(a,b,1);a=dh(a,b,1);b=L();null!==a&&(Ac(a,1,b),Ek(a,b))}
	function W(a,b,c){if(3===a.tag)Yk(a,a,c);else for(;null!==b;){if(3===b.tag){Yk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Si||!Si.has(d))){a=Ki(c,a);a=Ri(b,a,1);b=dh(b,a,1);a=L();null!==b&&(Ac(b,1,a),Ek(b,a));break}}b=b.return}}
	function Ui(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=L();a.pingedLanes|=a.suspendedLanes&c;R===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-gk?Lk(a,0):sk|=c);Ek(a,b)}function Zk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=L();a=Zg(a,b);null!==a&&(Ac(a,b,c),Ek(a,c))}function vj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Zk(a,c)}
	function ck(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Zk(a,c)}var Wk;
	Wk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)Ug=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return Ug=!1,zj(a,b,c);Ug=0!==(a.flags&131072)?!0:!1}else Ug=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;jj(a,b);a=b.pendingProps;var e=Yf(b,H.current);Tg(b,c);e=Xh(null,b,d,a,e,c);var f=bi();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
	null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ah(b),e.updater=nh,b.stateNode=e,e._reactInternals=b,rh(b,d,a,c),b=kj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Yi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{jj(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=$k(d);a=Lg(d,a);switch(e){case 0:b=dj(null,b,d,a,c);break a;case 1:b=ij(null,b,d,a,c);break a;case 11:b=Zi(null,b,d,a,c);break a;case 14:b=aj(null,b,d,Lg(d.type,a),c);break a}throw Error(p(306,
	d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),dj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),ij(a,b,d,e,c);case 3:a:{lj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;bh(a,b);gh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
	f,b.memoizedState=f,b.flags&256){e=Ki(Error(p(423)),b);b=mj(a,b,d,c,e);break a}else if(d!==e){e=Ki(Error(p(424)),b);b=mj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Ch(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ig();if(d===e){b=$i(a,b,c);break a}Yi(a,b,d,c)}b=b.child}return b;case 5:return Kh(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
	hj(a,b),Yi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return pj(a,b,c);case 4:return Ih(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Bh(b,null,d,c):Yi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),Zi(a,b,d,e,c);case 7:return Yi(a,b,b.pendingProps,c),b.child;case 8:return Yi(a,b,b.pendingProps.children,c),b.child;case 12:return Yi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
	g=e.value;G(Mg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=$i(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=ch(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);Sg(f.return,
	c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);Sg(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}Yi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Tg(b,c),e=Vg(e),d=d(e),b.flags|=1,Yi(a,b,d,c),
	b.child;case 14:return d=b.type,e=Lg(d,b.pendingProps),e=Lg(d.type,e),aj(a,b,d,e,c);case 15:return cj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),jj(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,Tg(b,c),ph(b,d,e),rh(b,d,e,c),kj(null,b,d,!0,a,c);case 19:return yj(a,b,c);case 22:return ej(a,b,c)}throw Error(p(156,b.tag));};function Gk(a,b){return ac(a,b)}
	function al(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function Bg(a,b,c,d){return new al(a,b,c,d)}function bj(a){a=a.prototype;return!(!a||!a.isReactComponent)}
	function $k(a){if("function"===typeof a)return bj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
	function wh(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
	c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
	function yh(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)bj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Ah(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return qj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
	break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Ah(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function qj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function xh(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
	function zh(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
	function bl(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
	null}function cl(a,b,c,d,e,f,g,h,k){a=new bl(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};ah(f);return a}function dl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
	function el(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
	function fl(a,b,c,d,e,f,g,h,k){a=cl(c,d,!0,a,e,f,g,h,k);a.context=el(null);c=a.current;d=L();e=lh(c);f=ch(d,e);f.callback=void 0!==b&&null!==b?b:null;dh(c,f,e);a.current.lanes=e;Ac(a,e,d);Ek(a,d);return a}function gl(a,b,c,d){var e=b.current,f=L(),g=lh(e);c=el(c);null===b.context?b.context=c:b.pendingContext=c;b=ch(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=dh(e,b,g);null!==a&&(mh(a,e,g,f),eh(a,e,g));return g}
	function hl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function il(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function jl(a,b){il(a,b);(a=a.alternate)&&il(a,b)}function kl(){return null}var ll="function"===typeof reportError?reportError:function(a){console.error(a)};function ml(a){this._internalRoot=a}
	nl.prototype.render=ml.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));gl(a,b,null,null)};nl.prototype.unmount=ml.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Sk(function(){gl(null,a,null,null)});b[uf]=null}};function nl(a){this._internalRoot=a}
	nl.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a)}};function ol(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function pl(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function ql(){}
	function rl(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=hl(g);f.call(a)}}var g=fl(b,d,a,0,null,!1,!1,"",ql);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Sk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=hl(k);h.call(a)}}var k=cl(a,0,!1,null,null,!1,!1,"",ql);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Sk(function(){gl(b,k,c,d)});return k}
	function sl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=hl(g);h.call(a)}}gl(b,g,a,e)}else g=rl(c,b,a,e,d);return hl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Ek(b,B()),0===(K&6)&&(Hj=B()+500,jg()))}break;case 13:Sk(function(){var b=Zg(a,1);if(null!==b){var c=L();mh(b,a,1,c)}}),jl(a,1)}};
	Fc=function(a){if(13===a.tag){var b=Zg(a,134217728);if(null!==b){var c=L();mh(b,a,134217728,c)}jl(a,134217728)}};Gc=function(a){if(13===a.tag){var b=lh(a),c=Zg(a,b);if(null!==c){var d=L();mh(c,a,b,d)}jl(a,b)}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};
	yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Rk;Hb=Sk;
	var tl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Rk]},ul={findFiberByHostInstance:Wc,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"};
	var vl={bundleType:ul.bundleType,version:ul.version,rendererPackageName:ul.rendererPackageName,rendererConfig:ul.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:ul.findFiberByHostInstance||
	kl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var wl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wl.isDisabled&&wl.supportsFiber)try{kc=wl.inject(vl),lc=wl}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tl;
	exports.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!ol(b))throw Error(p(200));return dl(a,b,null,c)};exports.createRoot=function(a,b){if(!ol(a))throw Error(p(299));var c=!1,d="",e=ll;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=cl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ml(b)};
	exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a){return Sk(a)};exports.hydrate=function(a,b,c){if(!pl(b))throw Error(p(200));return sl(null,a,b,!0,c)};
	exports.hydrateRoot=function(a,b,c){if(!ol(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=ll;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=fl(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
	e);return new nl(b)};exports.render=function(a,b,c){if(!pl(b))throw Error(p(200));return sl(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!pl(a))throw Error(p(40));return a._reactRootContainer?(Sk(function(){sl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null})}),!0):!1};exports.unstable_batchedUpdates=Rk;
	exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!pl(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return sl(a,b,c,!1,d)};exports.version="18.2.0-next-9e3b772b8-20220608";


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// @remove-on-eject-begin
	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	// @remove-on-eject-end
	'use strict';
	
	if (typeof Promise === 'undefined') {
	  // Rejection tracking prevents a common issue where React gets into an
	  // inconsistent state due to an error, but it gets swallowed by a Promise,
	  // and the user has no idea what causes React's erratic future behavior.
	  __webpack_require__(27).enable();
	  window.Promise = __webpack_require__(26);
	}
	
	// fetch() polyfill for making API calls.
	__webpack_require__(38);
	
	// Object.assign() is commonly used with React.
	// It will use the native implementation if it's present and isn't buggy.
	Object.assign = __webpack_require__(24);


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	A function that returns a universally unique identifier (uuid).  
	example: 1b83fd69-abe7-468c-bea1-306a8aa1c81d
	@returns `string` : 32 character uuid (see example)
	*/
	function uuid() {
	  const hashTable = [
	    'a',
	    'b',
	    'c',
	    'd',
	    'e',
	    'f',
	    '0',
	    '1',
	    '2',
	    '3',
	    '4',
	    '5',
	    '6',
	    '7',
	    '8',
	    '9',
	  ];
	  let uuid = [];
	  for (let i = 0; i < 35; i++) {
	    if (i === 7 || i === 12 || i === 17 || i === 22) {
	      uuid[i] = '-';
	    } else {
	      uuid[i] = hashTable[Math.floor(Math.random() * hashTable.length - 1)];
	    }
	  }
	  return uuid.join('');
	}
	
	module.exports = uuid;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * @license React
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	'use strict';var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
	var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
	E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
	H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
	function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
	function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
	a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
	function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
	var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;
	exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;
	exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
	for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
	exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.");};
	exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};
	exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};
	exports.useTransition=function(){return U.current.useTransition()};exports.version="18.2.0";


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {/**
	 * @license React
	 * scheduler.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	'use strict';function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
	function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
	"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
	function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
	function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
	exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
	exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
	exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
	exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
	exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36).setImmediate))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	if (true) {
	  module.exports = __webpack_require__(33);
	} else {
	  module.exports = require('./cjs/scheduler.development.js');
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(25)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
	            (typeof self !== "undefined" && self) ||
	            window;
	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(scope, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(35);
	// On some exotic environments, it's not clear which object `setimmediate` was
	// able to install onto.  Search each possibility in the same order as the
	// `setimmediate` library.
	exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
	                       (typeof global !== "undefined" && global.setImmediate) ||
	                       (this && this.setImmediate);
	exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
	                         (typeof global !== "undefined" && global.clearImmediate) ||
	                         (this && this.clearImmediate);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=__webpack_require__(1);function t(){return t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},t.apply(this,arguments)}var n=function(t){var n=e.useRef(t);return n.current=t,n},o="💡 use-places-autocomplete: Please provide a place Id when using getDetails() either as a string or as part of an Autocomplete Prediction.";exports.default=function(o){var a,r,s,u=void 0===o?{}:o,c=u.requestOptions,i=u.debounce,l=void 0===i?200:i,d=u.cache,p=void 0===d?86400:d,g=u.cacheKey,f=void 0===g?"upa":g,v=u.googleMaps,m=u.callbackName,w=u.defaultValue,h=void 0===w?"":w,y=u.initOnMount,b=void 0===y||y,O=e.useState(!1),P=O[0],S=O[1],x=e.useState(h),k=x[0],C=x[1],A=e.useState({loading:!1,status:"",data:[]}),I=A[0],_=A[1],j=e.useRef(),D=n(c),K=n(v),G=e.useCallback((function(){var e;if(!j.current){var t=window.google,n=K.current,o=(null==n?void 0:n.places)||(null==t||null==(e=t.maps)?void 0:e.places);o?(j.current=new o.AutocompleteService,S(!0)):console.error("💡 use-places-autocomplete: Google Maps Places API library must be loaded. See: https://github.com/wellyshen/use-places-autocomplete#load-the-library")}}),[K]),M=e.useCallback((function(){_({loading:!1,status:"",data:[]})}),[]),R=e.useCallback((function(e){void 0===e&&(e=f);try{sessionStorage.removeItem(e)}catch(e){}}),[f]),N=e.useCallback((a=function(e){var n;if(e){_((function(e){return t({},e,{loading:!0})}));var o={};try{o=JSON.parse(sessionStorage.getItem(f)||"{}")}catch(e){}p&&(o=Object.keys(o).reduce((function(e,t){return o[t].maxAge-Date.now()>=0&&(e[t]=o[t]),e}),{}))[e]?_({loading:!1,status:"OK",data:o[e].data}):null==(n=j.current)||n.getPlacePredictions(t({},D.current,{input:e}),(function(t,n){if(_({loading:!1,status:n,data:t||[]}),p&&"OK"===n){o[e]={data:t,maxAge:Date.now()+1e3*p};try{sessionStorage.setItem(f,JSON.stringify(o))}catch(e){}}}))}else M()},r=l,function(){for(var e=this,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];null!==s&&(clearTimeout(s),s=null),s=setTimeout((function(){return a.apply(e,n)}),r)}),[p,f,M,D]),q=e.useCallback((function(e,t){void 0===t&&(t=!0),C(e),j.current&&t&&N(e)}),[N]);return e.useEffect((function(){if(!b)return function(){return null};var e=window.google;return K.current||null!=e&&e.maps||!m?G():window[m]=G,function(){window[m]&&delete window[m]}}),[m,K,G,b]),{ready:P,value:k,suggestions:I,setValue:q,clearSuggestions:M,clearCache:R,init:G}},exports.getDetails=function(e){var t=new window.google.maps.places.PlacesService(document.createElement("div"));return e.placeId?new Promise((function(n,o){t.getDetails(e,(function(e,t){"OK"!==t&&o(t),n(e)}))})):(console.error(o),Promise.reject(o))},exports.getGeocode=function(e){var t=new window.google.maps.Geocoder;return new Promise((function(n,o){t.geocode(e,(function(t,a){"OK"!==a&&o(a),!e.address&&e.componentRestrictions&&(console.error("💡 use-places-autocomplete: Please provide an address when using getGeocode() with the componentRestrictions."),n(t)),n(t)}))}))},exports.getLatLng=function(e){var t=e.geometry.location,n=t.lat,o=t.lng;return{lat:n(),lng:o()}},exports.getZipCode=function(e,t){var n=e.address_components.find((function(e){return e.types.includes("postal_code")}));if(n)return t?n.short_name:n.long_name};
	//# sourceMappingURL=index.js.map


/***/ },
/* 38 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]
	
	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }
	
	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }
	
	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)
	
	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }
	
	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }
	
	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }
	
	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	
	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = String(input)
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ])));
//# sourceMappingURL=main.52f1a9be.js.map
