!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.createPoster=e():t.createPoster=e()}(window,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n=class{constructor(t){this.params=Object.assign({container:document.body,width:250,height:150,fontSize:16,font:"microsoft yahei",color:"#cccccc",content:"watermark",rotate:-30,zIndex:1e3,opacity:.5},t),this.params.x=this.isNullOrUndefined(t.x)?this.params.width/2:t.x,this.params.y=this.isNullOrUndefined(t.y)?this.params.height/2:t.y,this.watermarkHost=null,this.styleContent="",this.shadowObserver=null,this.checkInterval=null}isNullOrUndefined(t){return null==t}isDom(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName}toDataURL(){const{width:t,height:e,fontSize:r,font:n,color:o,rotate:s,content:a,opacity:i,x:l,y:c}=this.params,h=document.createElement("canvas");h.setAttribute("width",t+"px"),h.setAttribute("height",e+"px");const u=h.getContext("2d");return u&&(u.clearRect(0,0,t,e),u.textBaseline="top",u.textAlign="left",u.fillStyle=o,u.globalAlpha=i,u.font=`${r}px ${n}`,u.translate(l,c),u.rotate(Math.PI/180*s),u.translate(-l,-c-r),u.fillText(a,l,c+r)),h.toDataURL()}createWatermarkDom(){const{container:t}=this.params;if(!this.isDom(t))return;this.watermarkHost&&this.watermarkHost.remove(),this.watermarkHost=document.createElement("div"),this.watermarkHost.setAttribute("class","open-watermark"),this.watermarkHost.style.position="absolute",this.watermarkHost.style.top="0",this.watermarkHost.style.left="0",this.watermarkHost.style.width="100%",this.watermarkHost.style.height="100%",this.watermarkHost.style.zIndex=this.params.zIndex,this.watermarkHost.style.pointerEvents="none";const e=this.watermarkHost.attachShadow({mode:"closed"}),r=document.createElement("style");this.styleContent=`\n      :host {\n        display: block;\n        width: 100%;\n        height: 100%;\n        background-repeat: repeat;\n        background-image: url('${this.toDataURL()}');\n      }\n    `,r.textContent=this.styleContent,e.appendChild(r),t.style.position="relative",t.insertBefore(this.watermarkHost,t.firstChild),this.startShadowObserver(e,r)}startShadowObserver(t,e){this.shadowObserver=new MutationObserver(()=>{e.textContent!==this.styleContent&&(e.textContent=this.styleContent)}),this.shadowObserver.observe(t,{characterData:!0,childList:!0,subtree:!0}),this.startIntervalCheck()}startIntervalCheck(){this.checkInterval=setInterval(()=>{this.watermarkHost&&document.body.contains(this.watermarkHost)||this.output()},1e3)}output(){this.createWatermarkDom()}destroy(){this.watermarkHost&&(this.watermarkHost.remove(),this.watermarkHost=null),this.shadowObserver&&(this.shadowObserver.disconnect(),this.shadowObserver=null),this.checkInterval&&(clearInterval(this.checkInterval),this.checkInterval=null)}};function o(t){return new n(t)}window.TWaterMark=o;e.default=o}]).default}));