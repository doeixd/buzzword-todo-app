parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"8PUx":[function(require,module,exports) {
var t;!function(t){"use strict";var e=function(){function t(){this._dropEffect="move",this._effectAllowed="all",this._data={}}return Object.defineProperty(t.prototype,"dropEffect",{get:function(){return this._dropEffect},set:function(t){this._dropEffect=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"effectAllowed",{get:function(){return this._effectAllowed},set:function(t){this._effectAllowed=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"types",{get:function(){return Object.keys(this._data)},enumerable:!0,configurable:!0}),t.prototype.clearData=function(t){null!=t?delete this._data[t]:this._data=null},t.prototype.getData=function(t){return this._data[t]||""},t.prototype.setData=function(t,e){this._data[t]=e},t.prototype.setDragImage=function(t,e,n){var s=i._instance;s._imgCustom=t,s._imgOffset={x:e,y:n}},t}();t.DataTransfer=e;var i=function(){function t(){if(this._lastClick=0,t._instance)throw"DragDropTouch instance already created.";var e=!1;if(document.addEventListener("test",function(){},{get passive(){return e=!0,!0}}),"ontouchstart"in document){var i=document,n=this._touchstart.bind(this),s=this._touchmove.bind(this),o=this._touchend.bind(this),r=!!e&&{passive:!1,capture:!1};i.addEventListener("touchstart",n,r),i.addEventListener("touchmove",s,r),i.addEventListener("touchend",o),i.addEventListener("touchcancel",o)}}return t.getInstance=function(){return t._instance},t.prototype._touchstart=function(e){var i=this;if(this._shouldHandle(e)){if(Date.now()-this._lastClick<t._DBLCLICK&&this._dispatchEvent(e,"dblclick",e.target))return e.preventDefault(),void this._reset();this._reset();var n=this._closestDraggable(e.target);n&&(this._dispatchEvent(e,"mousemove",e.target)||this._dispatchEvent(e,"mousedown",e.target)||(this._dragSource=n,this._ptDown=this._getPoint(e),this._lastTouch=e,e.preventDefault(),setTimeout(function(){i._dragSource==n&&null==i._img&&i._dispatchEvent(e,"contextmenu",n)&&i._reset()},t._CTXMENU)))}},t.prototype._touchmove=function(e){if(this._shouldHandle(e)){var i=this._getTarget(e);if(this._dispatchEvent(e,"mousemove",i))return this._lastTouch=e,void e.preventDefault();if(this._dragSource&&!this._img)this._getDelta(e)>t._THRESHOLD&&(this._dispatchEvent(e,"dragstart",this._dragSource),this._createImage(e),this._dispatchEvent(e,"dragenter",i));this._img&&(this._lastTouch=e,e.preventDefault(),i!=this._lastTarget&&(this._dispatchEvent(this._lastTouch,"dragleave",this._lastTarget),this._dispatchEvent(e,"dragenter",i),this._lastTarget=i),this._moveImage(e),this._dispatchEvent(e,"dragover",i))}},t.prototype._touchend=function(t){if(this._shouldHandle(t)){if(this._dispatchEvent(this._lastTouch,"mouseup",t.target))return void t.preventDefault();this._img||(this._dragSource=null,this._dispatchEvent(this._lastTouch,"click",t.target),this._lastClick=Date.now()),this._destroyImage(),this._dragSource&&(t.type.indexOf("cancel")<0&&this._dispatchEvent(this._lastTouch,"drop",this._lastTarget),this._dispatchEvent(this._lastTouch,"dragend",this._dragSource),this._reset())}},t.prototype._shouldHandle=function(t){return t&&!t.defaultPrevented&&t.touches&&t.touches.length<2},t.prototype._reset=function(){this._destroyImage(),this._dragSource=null,this._lastTouch=null,this._lastTarget=null,this._ptDown=null,this._dataTransfer=new e},t.prototype._getPoint=function(t,e){return t&&t.touches&&(t=t.touches[0]),{x:e?t.pageX:t.clientX,y:e?t.pageY:t.clientY}},t.prototype._getDelta=function(t){var e=this._getPoint(t);return Math.abs(e.x-this._ptDown.x)+Math.abs(e.y-this._ptDown.y)},t.prototype._getTarget=function(t){for(var e=this._getPoint(t),i=document.elementFromPoint(e.x,e.y);i&&"none"==getComputedStyle(i).pointerEvents;)i=i.parentElement;return i},t.prototype._createImage=function(e){this._img&&this._destroyImage();var i=this._imgCustom||this._dragSource;if(this._img=i.cloneNode(!0),this._copyStyle(i,this._img),this._img.style.top=this._img.style.left="-9999px",!this._imgCustom){var n=i.getBoundingClientRect(),s=this._getPoint(e);this._imgOffset={x:s.x-n.left,y:s.y-n.top},this._img.style.opacity=t._OPACITY.toString()}this._moveImage(e),document.body.appendChild(this._img)},t.prototype._destroyImage=function(){this._img&&this._img.parentElement&&this._img.parentElement.removeChild(this._img),this._img=null,this._imgCustom=null},t.prototype._moveImage=function(t){var e=this;requestAnimationFrame(function(){if(e._img){var i=e._getPoint(t,!0),n=e._img.style;n.position="absolute",n.pointerEvents="none",n.zIndex="999999",n.left=Math.round(i.x-e._imgOffset.x)+"px",n.top=Math.round(i.y-e._imgOffset.y)+"px"}})},t.prototype._copyProps=function(t,e,i){for(var n=0;n<i.length;n++){var s=i[n];t[s]=e[s]}},t.prototype._copyStyle=function(e,i){if(t._rmvAtts.forEach(function(t){i.removeAttribute(t)}),e instanceof HTMLCanvasElement){var n=e,s=i;s.width=n.width,s.height=n.height,s.getContext("2d").drawImage(n,0,0)}for(var o=getComputedStyle(e),r=0;r<o.length;r++){var a=o[r];a.indexOf("transition")<0&&(i.style[a]=o[a])}i.style.pointerEvents="none";for(r=0;r<e.children.length;r++)this._copyStyle(e.children[r],i.children[r])},t.prototype._dispatchEvent=function(e,i,n){if(e&&n){var s=document.createEvent("Event"),o=e.touches?e.touches[0]:e;return s.initEvent(i,!0,!0),s.button=0,s.which=s.buttons=1,this._copyProps(s,e,t._kbdProps),this._copyProps(s,o,t._ptProps),s.dataTransfer=this._dataTransfer,n.dispatchEvent(s),s.defaultPrevented}return!1},t.prototype._closestDraggable=function(t){for(;t;t=t.parentElement)if(t.hasAttribute("draggable")&&t.draggable)return t;return null},t}();i._instance=new i,i._THRESHOLD=5,i._OPACITY=.5,i._DBLCLICK=500,i._CTXMENU=900,i._rmvAtts="id,class,style,draggable".split(","),i._kbdProps="altKey,ctrlKey,metaKey,shiftKey".split(","),i._ptProps="pageX,pageY,clientX,clientY,screenX,screenY".split(","),t.DragDropTouch=i}(t||(t={}));
},{}]},{},["8PUx"], null)
//# sourceMappingURL=/dpoly.17bea0dc.map