parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"cxCy":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){r(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t,r,n,o,c,i){try{var u=e[c](i),a=u.value}catch(s){return void r(s)}u.done?t(a):Promise.resolve(a).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise(function(o,c){var i=e.apply(t,r);function u(e){n(i,o,c,u,a,"next",e)}function a(e){n(i,o,c,u,a,"throw",e)}u(void 0)})}}function c(){return i.apply(this,arguments)}function i(){return(i=o(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:"",(r=n.length>1&&void 0!==n[1]?n[1]:{}).method="GET",e.abrupt("return",p(t,r));case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function u(){return p(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",{method:"POST",body:arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}function a(){return p(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",{method:"PUT",body:arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}function s(){return p(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",{method:"DELETE",body:arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}})}function p(){return f.apply(this,arguments)}function f(){return(f=o(regeneratorRuntime.mark(function e(){var r,n,o,c,i,u,a=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=a.length>0&&void 0!==a[0]?a[0]:"",n=a.length>1&&void 0!==a[1]?a[1]:{},"function"==typeof fetch){e.next=5;break}return console.log("fetch is not a function :("),e.abrupt("return");case 5:return"GET"!==method&&(n.body?"string"!=typeof n.body&&(n.body=JSON.stringify(n.body)):n.body=""),o=t({method:method,mode:"cors",cache:!1===n.cache?"no-cache":"string"==typeof n.cache?n.cache:"default",credentials:"same-origin",redirect:"follow",referrer:"no-referrer",headers:{}},n),e.next=9,fetch(r,{method:o.method,mode:o.cors,cache:o.cache,credentials:o.credentials,headers:o.headers,redirect:o.redirect,referrer:o.referrer});case 9:if("function"!=typeof(c=e.sent).json){e.next=16;break}return e.next=13,c.json();case 13:i=e.sent,e.next=17;break;case 16:i=c;case 17:return u=i.data||i,e.abrupt("return",u);case 19:case"end":return e.stop()}},e)}))).apply(this,arguments)}var h=Object.freeze({__proto__:null,http_get:c,http_post:u,http_put:a,http_delete:s});exports.http_delete=s,exports.http_get=c,exports.http_post=u,exports.http_put=a,exports.requests=h;
},{}],"RWQU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./requests-1730b253.js");exports.http_delete=t.http_delete,exports.http_get=t.http_get,exports.http_post=t.http_post,exports.http_put=t.http_put;
},{"./requests-1730b253.js":"cxCy"}]},{},["RWQU"], null)
//# sourceMappingURL=/requests.map