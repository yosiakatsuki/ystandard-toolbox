!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=19)}([function(t,e){!function(){t.exports=this.wp.i18n}()},function(t,e){!function(){t.exports=this.wp.element}()},function(t,e){!function(){t.exports=this.wp.components}()},function(t,e){!function(){t.exports=this.wp.blocks}()},function(t,e){!function(){t.exports=this.React}()},function(t,e,n){t.exports=n(17)()},function(t,e,n){var o=n(13),r=n(14),a=n(15),l=n(16);t.exports=function(t){return o(t)||r(t)||a(t)||l()}},function(t,e){!function(){t.exports=this.wp.data}()},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}},function(t,e){!function(){t.exports=this.wp.blockEditor}()},function(t,e){!function(){t.exports=this.wp.serverSideRender}()},,,function(t,e,n){var o=n(8);t.exports=function(t){if(Array.isArray(t))return o(t)}},function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,e,n){var o=n(8);t.exports=function(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e,n){"use strict";var o=n(18);function r(){}function a(){}a.resetWarningCache=r,t.exports=function(){function t(t,e,n,r,a,l){if(l!==o){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:a,resetWarningCache:r};return n.PropTypes=n,n}},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,n){"use strict";n.r(e);var o=n(1),r={common:"ystdtb",beta:"ystdtb_beta",deprecated:"ystdtb_deprecated"},a={iconForeground:"#4190be",iconDeprecatedForeground:"#be4141"},l=n(3),c=n(0),i=[{label:Object(c.__)("公開日 / 新しい順","ystandard-toolbox"),value:"date/DESC"},{label:Object(c.__)("公開日 / 古い順","ystandard-toolbox"),value:"date/ASC"},{label:Object(c.__)("タイトル / A→Z","ystandard-toolbox"),value:"title/ASC"},{label:Object(c.__)("タイトル / Z→A","ystandard-toolbox"),value:"title/DESC"},{label:Object(c.__)("ランダム","ystandard-toolbox"),value:"rand/DESC"}],u=[{label:Object(c.__)("カード","ystandard-toolbox"),value:"card"},{label:Object(c.__)("リスト","ystandard-toolbox"),value:"list"}],s=[{label:Object(c.__)("16-9","ystandard-toolbox"),value:"16-9"},{label:Object(c.__)("4-3","ystandard-toolbox"),value:"4-3"},{label:Object(c.__)("1-1","ystandard-toolbox"),value:"1-1"}],b=n(6),f=n.n(b),p=n(7),d=n(9),y=n(2),m=n(10),g=n.n(m);function O(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t=Number(t),(isNaN(t)||t<e)&&(t=null!==o?o:e),null!==n&&t>n&&(t=n),t}function h(){return{value:"",label:Object(c.__)("--選択--","ystandard-toolbox")}}function v(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return j(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,r=function(){};return{s:r,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,c=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return l=t.done,t},e:function(t){c=!0,a=t},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw a}}}}function j(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function _(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return x(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,r=function(){};return{s:r,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,c=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return l=t.done,t},e:function(t){c=!0,a=t},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw a}}}}function x(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var C=function(t){var e,n=t.attributes,r=t.setAttributes,a=n.count,l=n.orderby,b=n.order,m=n.listType,j=n.colMobile,x=n.colTablet,C=n.colPc,S=n.taxonomy,E=n.termSlug,w=n.showImg,I=n.showDate,T=n.showCategory,P=n.showExcerpt,A=n.thumbnailSize,k=n.thumbnailRatio,N=n.postType,R=n.postIn,B=n.postNameIn,D=n.postParent,M=Object(p.useSelect)((function(t){var e=t("core/block-editor").getSettings,n=t("core"),o=n.getPostTypes,r=n.getTaxonomy,a=n.getEntityRecords,l=o()?o():[],c=r()?r():[],i=[];return l.filter((function(t){return t.hierarchical})).map((function(t){return t.slug})).includes(N)&&0<(i=function t(e,n,o){var r=[];if(null==e||!e)return r;var a,l=_(e.filter((function(t){return n===t.parent})));try{var c=function(){var n=a.value,l="　".repeat(o)+n.title.rendered;0<e.filter((function(t){return n.id===t.parent})).length&&(r.push({value:n.id,label:l}),r=r.concat(t(e,n.id,o+1)))};for(l.s();!(a=l.n()).done;)c()}catch(t){l.e(t)}finally{l.f()}return r}(a("postType",N,{per_page:-1}),0,0)).length&&(i=[h()].concat(f()(i))),{imageSizes:e().imageSizes,postTypes:l.filter((function(t){return!(!t.viewable||"ys-parts"===t.slug||"attachment"===t.slug)})),taxonomyList:c,hierarchicalPosts:i}})),z=M.imageSizes,L=M.postTypes,F=M.taxonomyList,U=M.hierarchicalPosts,W=z.map((function(t){var e=t.name;return{value:t.slug,label:e}})),$=L.map((function(t){var e=t.name;return{value:t.slug,label:e}})),Z=L.filter((function(t){return t.slug===N})),q=Object(p.useSelect)((function(t){var e=(0,t("core").getEntityRecords)("taxonomy",S,{per_page:-1});e||(e=[]);var n=function t(e,n,o){var r=[];if(null==e||!e)return r;var a,l=v(e.filter((function(t){return n===t.parent})));try{for(l.s();!(a=l.n()).done;){var c=a.value,i="　".repeat(o)+c.name;r.push({value:c.slug,label:i}),r=r.concat(t(e,c.id,o+1))}}catch(t){l.e(t)}finally{l.f()}return r}(e,0,0);return{termOptions:[h()].concat(f()(n))}})).termOptions,H="".concat(l,"/").concat(b);return Object(o.createElement)("div",{className:"ystdtb-posts"},Object(o.createElement)(o.Fragment,null,Object(o.createElement)(d.InspectorControls,null,Object(o.createElement)(y.PanelBody,{title:Object(c.__)("基本設定","ystandard-toolbox")},Object(o.createElement)(y.RangeControl,{label:Object(c.__)("表示件数","ystandard-toolbox"),value:a,onChange:function(t){r({count:O(t,1,20,3)})},min:1,max:20}),Object(o.createElement)(y.SelectControl,{label:Object(c.__)("並び順","ystandard-toolbox"),value:H,options:i,onChange:function(t){var e=t.split("/");r({orderby:e[0],order:e[1]})}})),Object(o.createElement)(y.PanelBody,{title:Object(c.__)("表示設定","ystandard-toolbox")},Object(o.createElement)(y.SelectControl,{label:Object(c.__)("デザイン","ystandard-toolbox"),value:m,options:u,onChange:function(t){r({listType:t})}}),Object(o.createElement)("div",{className:"ystdtb-block-label"},Object(c.__)("表示列数","ystandard-toolbox")),Object(o.createElement)(y.RangeControl,{label:Object(c.__)("デスクトップ","ystandard-toolbox"),beforeIcon:"desktop",value:C,onChange:function(t){r({colPc:O(t,1,6,3)})},min:1,max:6}),Object(o.createElement)(y.RangeControl,{label:Object(c.__)("タブレット","ystandard-toolbox"),beforeIcon:"tablet",value:x,onChange:function(t){r({colTablet:O(t,1,6,3)})},min:1,max:6}),Object(o.createElement)(y.RangeControl,{label:Object(c.__)("モバイル","ystandard-toolbox"),beforeIcon:"smartphone",value:j,onChange:function(t){r({colMobile:O(t,1,6,1)})},min:1,max:6})),Object(o.createElement)(y.PanelBody,{title:Object(c.__)("画像設定","ystandard-toolbox")},Object(o.createElement)(y.ToggleControl,{label:Object(c.__)("画像を表示する","ystandard-toolbox"),onChange:function(){r({showImg:!w})},checked:w}),Object(o.createElement)(y.SelectControl,{label:Object(c.__)("画像サイズ","ystandard-toolbox"),value:A,options:W,onChange:function(t){r({thumbnailSize:t})}}),Object(o.createElement)(y.SelectControl,{label:Object(c.__)("画像縦横比","ystandard-toolbox"),value:k,options:s,onChange:function(t){r({thumbnailRatio:t})}})),Object(o.createElement)(y.PanelBody,{initialOpen:!1,title:Object(c.__)("日付・カテゴリー・概要の表示","ystandard-toolbox")},Object(o.createElement)(y.ToggleControl,{label:Object(c.__)("日付を表示する","ystandard-toolbox"),onChange:function(){r({showDate:!I})},checked:I}),Object(o.createElement)(y.ToggleControl,{label:Object(c.__)("カテゴリーを表示する","ystandard-toolbox"),onChange:function(){r({showCategory:!T})},checked:T}),Object(o.createElement)(y.ToggleControl,{label:Object(c.__)("概要を表示する","ystandard-toolbox"),onChange:function(){r({showExcerpt:!P})},checked:P})),Object(o.createElement)(y.PanelBody,{initialOpen:!1,title:Object(c.__)("絞り込み設定","ystandard-toolbox")},Object(o.createElement)(y.SelectControl,{label:Object(c.__)("投稿タイプ","ystandard-toolbox"),value:N,options:$,onChange:function(t){r({postType:t,postIn:"",postNameIn:"",postParent:""})}}),Object(o.createElement)(y.SelectControl,{label:Object(c.__)("分類","ystandard-toolbox"),value:S,options:(e=Z.length?Z[0].taxonomies:[],[h()].concat(f()(e.map((function(t){return F.hasOwnProperty(t)?{value:F[t].slug,label:F[t].name}:{}}))))),onChange:function(t){r({taxonomy:t,postIn:"",postNameIn:"",postParent:""})}}),!!S&&Object(o.createElement)(y.SelectControl,{label:Object(c.__)("カテゴリー・タグ","ystandard-toolbox"),value:E,options:q,onChange:function(t){r({termSlug:t,postIn:"",postNameIn:"",postParent:""})}})),Object(o.createElement)(y.PanelBody,{initialOpen:!1,title:Object(c.__)("高度な絞り込み","ystandard-toolbox")},Object(o.createElement)(y.BaseControl,null,Object(o.createElement)(y.TextControl,{label:Object(c.__)("投稿ID指定","ystandard-toolbox"),value:R,onChange:function(t){r({taxonomy:"",termSlug:"",postIn:t,postNameIn:"",postParent:""})}})),Object(o.createElement)(y.BaseControl,null,Object(o.createElement)(y.TextControl,{label:Object(c.__)("投稿名指定","ystandard-toolbox"),value:B,onChange:function(t){r({taxonomy:"",termSlug:"",postIn:"",postNameIn:t,postParent:""})}})),0<U.length&&Object(o.createElement)(y.BaseControl,null,Object(o.createElement)(y.SelectControl,{label:Object(c.__)("親ページ指定","ystandard-toolbox"),value:D,options:U,onChange:function(t){r({taxonomy:"",termSlug:"",postIn:"",postNameIn:"",postParent:t})}}))))),Object(o.createElement)(y.Disabled,null,Object(o.createElement)(g.a,{block:"ystdtb/posts",attributes:n})))},S=n(4),E=n.n(S),w=n(5),I=n.n(w);function T(){return(T=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function P(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},a=Object.keys(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var A=Object(S.forwardRef)((function(t,e){var n=t.color,o=void 0===n?"currentColor":n,r=t.size,a=void 0===r?24:r,l=P(t,["color","size"]);return E.a.createElement("svg",T({ref:e,xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:o,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),E.a.createElement("polyline",{points:"21 8 21 21 3 21 3 8"}),E.a.createElement("rect",{x:"1",y:"3",width:"22",height:"5"}),E.a.createElement("line",{x1:"10",y1:"12",x2:"14",y2:"12"}))}));A.propTypes={color:I.a.string,size:I.a.oneOfType([I.a.string,I.a.number])},A.displayName="Archive";var k=A;Object(l.registerBlockType)("ystdtb/posts",{title:Object(c.__)("記事一覧","ystandard-toolbox"),description:Object(c.__)("投稿一覧を表示するブロック","ystandard-toolbox"),icon:Object(o.createElement)(k,{stroke:a.iconForeground,style:{fill:"none"}}),keywords:[Object(c.__)("posts"),Object(c.__)("post"),Object(c.__)("記事一覧"),"posts"],category:r.common,attributes:{count:{type:"number",default:3},orderby:{type:"string",default:"date"},order:{type:"string",default:"DESC"},listType:{type:"string",default:"card"},colMobile:{type:"number",default:1},colTablet:{type:"number",default:3},colPc:{type:"number",default:3},taxonomy:{type:"string"},termSlug:{type:"string"},showImg:{type:"bool",default:!0},showDate:{type:"bool",default:!0},showCategory:{type:"bool",default:!0},showExcerpt:{type:"bool",default:!1},thumbnailSize:{type:"string",default:"full"},thumbnailRatio:{type:"string",default:"16-9"},postType:{type:"string",default:"post"},postIn:{type:"string"},postNameIn:{type:"string"},postParent:{type:"string"},align:{type:"string",default:""}},supports:{customClassName:!1,className:!1,html:!1,align:["full"]},edit:C,save:function(){return null}})}]);