!function(e){var t={};function r(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,r),l.l=!0,l.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)r.d(n,l,function(t){return e[t]}.bind(null,l));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=64)}({1:function(e,t){!function(){e.exports=this.wp.i18n}()},64:function(e,t,r){"use strict";r.r(t);var n=r(8);function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var o,i,a=[{level:"h1",label:"h1",description:"本文内の見出しデザイン設定"},{level:"h2",label:"h2",description:"本文内の見出しデザイン設定"},{level:"h3",label:"h3",description:"本文内の見出しデザイン設定"},{level:"h4",label:"h4",description:"本文内の見出しデザイン設定"},{level:"h5",label:"h5",description:"本文内の見出しデザイン設定"},{level:"h6",label:"h6",description:"本文内の見出しデザイン設定"},{level:"sidebar",label:"サイドバー",description:"サイドバーのウィジェットタイトル デザイン設定"},{level:"footer",label:"フッター",description:"フッターのウィジェットタイトル デザイン設定"},{level:"post-title",label:"投稿タイトル",description:"投稿詳細ページのタイトル デザイン設定"},{level:"page-title",label:"固定ページタイトル",description:"固定ページのタイトル デザイン設定"},{level:"archive-title",label:"一覧ページタイトル",description:"投稿一覧ページタイトル デザイン設定"}],c=window.ystdtbBlockEditorHeading,u=function(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}(a);try{for(u.s();!(o=u.n()).done;){var b=o.value;if(c[b.level]&&(!0===(i=c[b.level].useCustomStyle)||"true"===i||1===i||"1"===i)){var s={name:"ystdtb-".concat(b.level),label:b.label};Object(n.registerBlockStyle)("core/heading",s),Object(n.registerBlockStyle)("ystdb/heading",s)}}}catch(e){u.e(e)}finally{u.f()}var d=r(1);Object(n.registerBlockStyle)("core/column",{name:"ystdtb-col-auto",label:Object(d.__)("幅:auto","ystandard-toolbox")}),Object(n.registerBlockStyle)("core/column",{name:"ystdtb-no-shrink",label:Object(d.__)("幅:auto(折返しなし)","ystandard-toolbox")}),Object(n.registerBlockStyle)("core/table",{name:"ystdtb-table-2col",label:Object(d.__)("2列用","ystandard-toolbox")}),Object(n.registerBlockStyle)("core/table",{name:"ystdtb-table-2col-m",label:Object(d.__)("2列用(モバイルで1列)","ystandard-toolbox")}),Object(n.registerBlockStyle)("core/table",{name:"ystdtb-table-scroll",label:Object(d.__)("モバイルでスクロール","ystandard-toolbox")})},8:function(e,t){!function(){e.exports=this.wp.blocks}()}});