// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"dpoly.js":[function(require,module,exports) {
var DragDropTouch;

(function (DragDropTouch_1) {
  'use strict';
  /**
   * Object used to hold the data that is being dragged during drag and drop operations.
   *
   * It may hold one or more data items of different types. For more information about
   * drag and drop operations and data transfer objects, see
   * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer">HTML Drag and Drop API</a>.
   *
   * This object is created automatically by the @see:DragDropTouch singleton and is
   * accessible through the @see:dataTransfer property of all drag events.
   */

  var DataTransfer = function () {
    function DataTransfer() {
      this._dropEffect = 'move';
      this._effectAllowed = 'all';
      this._data = {};
    }

    Object.defineProperty(DataTransfer.prototype, "dropEffect", {
      /**
       * Gets or sets the type of drag-and-drop operation currently selected.
       * The value must be 'none',  'copy',  'link', or 'move'.
       */
      get: function get() {
        return this._dropEffect;
      },
      set: function set(value) {
        this._dropEffect = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DataTransfer.prototype, "effectAllowed", {
      /**
       * Gets or sets the types of operations that are possible.
       * Must be one of 'none', 'copy', 'copyLink', 'copyMove', 'link',
       * 'linkMove', 'move', 'all' or 'uninitialized'.
       */
      get: function get() {
        return this._effectAllowed;
      },
      set: function set(value) {
        this._effectAllowed = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DataTransfer.prototype, "types", {
      /**
       * Gets an array of strings giving the formats that were set in the @see:dragstart event.
       */
      get: function get() {
        return Object.keys(this._data);
      },
      enumerable: true,
      configurable: true
    });
    /**
     * Removes the data associated with a given type.
     *
     * The type argument is optional. If the type is empty or not specified, the data
     * associated with all types is removed. If data for the specified type does not exist,
     * or the data transfer contains no data, this method will have no effect.
     *
     * @param type Type of data to remove.
     */

    DataTransfer.prototype.clearData = function (type) {
      if (type != null) {
        delete this._data[type];
      } else {
        this._data = null;
      }
    };
    /**
     * Retrieves the data for a given type, or an empty string if data for that type does
     * not exist or the data transfer contains no data.
     *
     * @param type Type of data to retrieve.
     */


    DataTransfer.prototype.getData = function (type) {
      return this._data[type] || '';
    };
    /**
     * Set the data for a given type.
     *
     * For a list of recommended drag types, please see
     * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Recommended_Drag_Types.
     *
     * @param type Type of data to add.
     * @param value Data to add.
     */


    DataTransfer.prototype.setData = function (type, value) {
      this._data[type] = value;
    };
    /**
     * Set the image to be used for dragging if a custom one is desired.
     *
     * @param img An image element to use as the drag feedback image.
     * @param offsetX The horizontal offset within the image.
     * @param offsetY The vertical offset within the image.
     */


    DataTransfer.prototype.setDragImage = function (img, offsetX, offsetY) {
      var ddt = DragDropTouch._instance;
      ddt._imgCustom = img;
      ddt._imgOffset = {
        x: offsetX,
        y: offsetY
      };
    };

    return DataTransfer;
  }();

  DragDropTouch_1.DataTransfer = DataTransfer;
  /**
   * Defines a class that adds support for touch-based HTML5 drag/drop operations.
   *
   * The @see:DragDropTouch class listens to touch events and raises the
   * appropriate HTML5 drag/drop events as if the events had been caused
   * by mouse actions.
   *
   * The purpose of this class is to enable using existing, standard HTML5
   * drag/drop code on mobile devices running IOS or Android.
   *
   * To use, include the DragDropTouch.js file on the page. The class will
   * automatically start monitoring touch events and will raise the HTML5
   * drag drop events (dragstart, dragenter, dragleave, drop, dragend) which
   * should be handled by the application.
   *
   * For details and examples on HTML drag and drop, see
   * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations.
   */

  var DragDropTouch = function () {
    /**
     * Initializes the single instance of the @see:DragDropTouch class.
     */
    function DragDropTouch() {
      this._lastClick = 0; // enforce singleton pattern

      if (DragDropTouch._instance) {
        throw 'DragDropTouch instance already created.';
      } // detect passive event support
      // https://github.com/Modernizr/Modernizr/issues/1894


      var supportsPassive = false;
      document.addEventListener('test', function () {}, {
        get passive() {
          supportsPassive = true;
          return true;
        }

      }); // listen to touch events

      if ('ontouchstart' in document) {
        var d = document,
            ts = this._touchstart.bind(this),
            tm = this._touchmove.bind(this),
            te = this._touchend.bind(this),
            opt = supportsPassive ? {
          passive: false,
          capture: false
        } : false;

        d.addEventListener('touchstart', ts, opt);
        d.addEventListener('touchmove', tm, opt);
        d.addEventListener('touchend', te);
        d.addEventListener('touchcancel', te);
      }
    }
    /**
     * Gets a reference to the @see:DragDropTouch singleton.
     */


    DragDropTouch.getInstance = function () {
      return DragDropTouch._instance;
    }; // ** event handlers


    DragDropTouch.prototype._touchstart = function (e) {
      var _this = this;

      if (this._shouldHandle(e)) {
        // raise double-click and prevent zooming
        if (Date.now() - this._lastClick < DragDropTouch._DBLCLICK) {
          if (this._dispatchEvent(e, 'dblclick', e.target)) {
            e.preventDefault();

            this._reset();

            return;
          }
        } // clear all variables


        this._reset(); // get nearest draggable element


        var src = this._closestDraggable(e.target);

        if (src) {
          // give caller a chance to handle the hover/move events
          if (!this._dispatchEvent(e, 'mousemove', e.target) && !this._dispatchEvent(e, 'mousedown', e.target)) {
            // get ready to start dragging
            this._dragSource = src;
            this._ptDown = this._getPoint(e);
            this._lastTouch = e;
            e.preventDefault(); // show context menu if the user hasn't started dragging after a while

            setTimeout(function () {
              if (_this._dragSource == src && _this._img == null) {
                if (_this._dispatchEvent(e, 'contextmenu', src)) {
                  _this._reset();
                }
              }
            }, DragDropTouch._CTXMENU);
          }
        }
      }
    };

    DragDropTouch.prototype._touchmove = function (e) {
      if (this._shouldHandle(e)) {
        // see if target wants to handle move
        var target = this._getTarget(e);

        if (this._dispatchEvent(e, 'mousemove', target)) {
          this._lastTouch = e;
          e.preventDefault();
          return;
        } // start dragging


        if (this._dragSource && !this._img) {
          var delta = this._getDelta(e);

          if (delta > DragDropTouch._THRESHOLD) {
            this._dispatchEvent(e, 'dragstart', this._dragSource);

            this._createImage(e);

            this._dispatchEvent(e, 'dragenter', target);
          }
        } // continue dragging


        if (this._img) {
          this._lastTouch = e;
          e.preventDefault(); // prevent scrolling

          if (target != this._lastTarget) {
            this._dispatchEvent(this._lastTouch, 'dragleave', this._lastTarget);

            this._dispatchEvent(e, 'dragenter', target);

            this._lastTarget = target;
          }

          this._moveImage(e);

          this._dispatchEvent(e, 'dragover', target);
        }
      }
    };

    DragDropTouch.prototype._touchend = function (e) {
      if (this._shouldHandle(e)) {
        // see if target wants to handle up
        if (this._dispatchEvent(this._lastTouch, 'mouseup', e.target)) {
          e.preventDefault();
          return;
        } // user clicked the element but didn't drag, so clear the source and simulate a click


        if (!this._img) {
          this._dragSource = null;

          this._dispatchEvent(this._lastTouch, 'click', e.target);

          this._lastClick = Date.now();
        } // finish dragging


        this._destroyImage();

        if (this._dragSource) {
          if (e.type.indexOf('cancel') < 0) {
            this._dispatchEvent(this._lastTouch, 'drop', this._lastTarget);
          }

          this._dispatchEvent(this._lastTouch, 'dragend', this._dragSource);

          this._reset();
        }
      }
    }; // ** utilities
    // ignore events that have been handled or that involve more than one touch


    DragDropTouch.prototype._shouldHandle = function (e) {
      return e && !e.defaultPrevented && e.touches && e.touches.length < 2;
    }; // clear all members


    DragDropTouch.prototype._reset = function () {
      this._destroyImage();

      this._dragSource = null;
      this._lastTouch = null;
      this._lastTarget = null;
      this._ptDown = null;
      this._dataTransfer = new DataTransfer();
    }; // get point for a touch event


    DragDropTouch.prototype._getPoint = function (e, page) {
      if (e && e.touches) {
        e = e.touches[0];
      }

      return {
        x: page ? e.pageX : e.clientX,
        y: page ? e.pageY : e.clientY
      };
    }; // get distance between the current touch event and the first one


    DragDropTouch.prototype._getDelta = function (e) {
      var p = this._getPoint(e);

      return Math.abs(p.x - this._ptDown.x) + Math.abs(p.y - this._ptDown.y);
    }; // get the element at a given touch event


    DragDropTouch.prototype._getTarget = function (e) {
      var pt = this._getPoint(e),
          el = document.elementFromPoint(pt.x, pt.y);

      while (el && getComputedStyle(el).pointerEvents == 'none') {
        el = el.parentElement;
      }

      return el;
    }; // create drag image from source element


    DragDropTouch.prototype._createImage = function (e) {
      // just in case...
      if (this._img) {
        this._destroyImage();
      } // create drag image from custom element or drag source


      var src = this._imgCustom || this._dragSource;
      this._img = src.cloneNode(true);

      this._copyStyle(src, this._img);

      this._img.style.top = this._img.style.left = '-9999px'; // if creating from drag source, apply offset and opacity

      if (!this._imgCustom) {
        var rc = src.getBoundingClientRect(),
            pt = this._getPoint(e);

        this._imgOffset = {
          x: pt.x - rc.left,
          y: pt.y - rc.top
        };
        this._img.style.opacity = DragDropTouch._OPACITY.toString();
      } // add image to document


      this._moveImage(e);

      document.body.appendChild(this._img);
    }; // dispose of drag image element


    DragDropTouch.prototype._destroyImage = function () {
      if (this._img && this._img.parentElement) {
        this._img.parentElement.removeChild(this._img);
      }

      this._img = null;
      this._imgCustom = null;
    }; // move the drag image element


    DragDropTouch.prototype._moveImage = function (e) {
      var _this = this;

      requestAnimationFrame(function () {
        if (_this._img) {
          var pt = _this._getPoint(e, true),
              s = _this._img.style;

          s.position = 'absolute';
          s.pointerEvents = 'none';
          s.zIndex = '999999';
          s.left = Math.round(pt.x - _this._imgOffset.x) + 'px';
          s.top = Math.round(pt.y - _this._imgOffset.y) + 'px';
        }
      });
    }; // copy properties from an object to another


    DragDropTouch.prototype._copyProps = function (dst, src, props) {
      for (var i = 0; i < props.length; i++) {
        var p = props[i];
        dst[p] = src[p];
      }
    };

    DragDropTouch.prototype._copyStyle = function (src, dst) {
      // remove potentially troublesome attributes
      DragDropTouch._rmvAtts.forEach(function (att) {
        dst.removeAttribute(att);
      }); // copy canvas content


      if (src instanceof HTMLCanvasElement) {
        var cSrc = src,
            cDst = dst;
        cDst.width = cSrc.width;
        cDst.height = cSrc.height;
        cDst.getContext('2d').drawImage(cSrc, 0, 0);
      } // copy style (without transitions)


      var cs = getComputedStyle(src);

      for (var i = 0; i < cs.length; i++) {
        var key = cs[i];

        if (key.indexOf('transition') < 0) {
          dst.style[key] = cs[key];
        }
      }

      dst.style.pointerEvents = 'none'; // and repeat for all children

      for (var i = 0; i < src.children.length; i++) {
        this._copyStyle(src.children[i], dst.children[i]);
      }
    };

    DragDropTouch.prototype._dispatchEvent = function (e, type, target) {
      if (e && target) {
        var evt = document.createEvent('Event'),
            t = e.touches ? e.touches[0] : e;
        evt.initEvent(type, true, true);
        evt.button = 0;
        evt.which = evt.buttons = 1;

        this._copyProps(evt, e, DragDropTouch._kbdProps);

        this._copyProps(evt, t, DragDropTouch._ptProps);

        evt.dataTransfer = this._dataTransfer;
        target.dispatchEvent(evt);
        return evt.defaultPrevented;
      }

      return false;
    }; // gets an element's closest draggable ancestor


    DragDropTouch.prototype._closestDraggable = function (e) {
      for (; e; e = e.parentElement) {
        if (e.hasAttribute('draggable') && e.draggable) {
          return e;
        }
      }

      return null;
    };

    return DragDropTouch;
  }();
  /*private*/


  DragDropTouch._instance = new DragDropTouch(); // singleton
  // constants

  DragDropTouch._THRESHOLD = 5; // pixels to move before drag starts

  DragDropTouch._OPACITY = 0.5; // drag image opacity

  DragDropTouch._DBLCLICK = 500; // max ms between clicks in a double click

  DragDropTouch._CTXMENU = 900; // ms to hold before raising 'contextmenu' event
  // copy styles/attributes from drag source to drag image element

  DragDropTouch._rmvAtts = 'id,class,style,draggable'.split(','); // synthesize and dispatch an event
  // returns true if the event has been handled (e.preventDefault == true)

  DragDropTouch._kbdProps = 'altKey,ctrlKey,metaKey,shiftKey'.split(',');
  DragDropTouch._ptProps = 'pageX,pageY,clientX,clientY,screenX,screenY'.split(',');
  DragDropTouch_1.DragDropTouch = DragDropTouch;
})(DragDropTouch || (DragDropTouch = {}));
},{}],"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34409" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dpoly.js"], null)
//# sourceMappingURL=/dpoly.56fb0c7d.map