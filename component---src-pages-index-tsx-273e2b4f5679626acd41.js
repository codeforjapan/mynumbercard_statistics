(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{166:function(e,t,n){"use strict";n.r(t);var r=n(12),o=n(0),a=n.n(o),i=n(169);function c(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}var s=n(181),u=n(182),l=n(183),f=n(191),d=n(193),p=n.n(d);function m(e,t){if(!e){var n=new Error("loadable: "+t);throw n.framesToPop=1,n.name="Invariant Violation",n}}var b=a.a.createContext();var y={initialChunks:{}};var h=function(e){return function(t){return a.a.createElement(b.Consumer,null,function(n){return a.a.createElement(e,Object.assign({__chunkExtractor:n},t))})}},g=function(e){return e};function v(e){var t=e.defaultResolveComponent,n=void 0===t?g:t,r=e.render,o=e.onLoad;function i(e,t){void 0===t&&(t={});var i=function(e){return"function"==typeof e?{requireAsync:e}:e}(e),d={};function b(e){return t.cacheKey?t.cacheKey(e):i.resolve?i.resolve(e):null}function g(e,r,o){var a=t.resolveComponent?t.resolveComponent(e,r):n(e);if(t.resolveComponent&&!Object(f.isValidElementType)(a))throw new Error("resolveComponent returned something that is not a React component!");return p()(o,a,{preload:!0}),a}var v=function(e){function n(n){var r;return(r=e.call(this,n)||this).state={result:null,error:null,loading:!0,cacheKey:b(n)},r.promise=null,m(!n.__chunkExtractor||i.requireSync,"SSR requires `@loadable/babel-plugin`, please install it"),n.__chunkExtractor?!1===t.ssr?Object(u.a)(r):(i.requireAsync(n).catch(function(){}),r.loadSync(),n.__chunkExtractor.addChunk(i.chunkName(n)),Object(u.a)(r)):(!1!==t.ssr&&(i.isReady&&i.isReady(n)||i.chunkName&&y.initialChunks[i.chunkName(n)])&&r.loadSync(),r)}Object(l.a)(n,e),n.getDerivedStateFromProps=function(e,t){var n=b(e);return Object(s.a)({},t,{cacheKey:n,loading:t.loading||t.cacheKey!==n})};var a=n.prototype;return a.componentDidMount=function(){this.mounted=!0,this.state.loading?this.loadAsync():this.state.error||this.triggerOnLoad()},a.componentDidUpdate=function(e,t){t.cacheKey!==this.state.cacheKey&&(this.promise=null,this.loadAsync())},a.componentWillUnmount=function(){this.mounted=!1},a.safeSetState=function(e,t){this.mounted&&this.setState(e,t)},a.triggerOnLoad=function(){var e=this;o&&setTimeout(function(){o(e.state.result,e.props)})},a.loadSync=function(){if(this.state.loading)try{var e=g(i.requireSync(this.props),this.props,j);this.state.result=e,this.state.loading=!1}catch(t){this.state.error=t}},a.getCacheKey=function(){return b(this.props)||JSON.stringify(this.props)},a.getCache=function(){return d[this.getCacheKey()]},a.setCache=function(e){d[this.getCacheKey()]=e},a.loadAsync=function(){var e=this;if(!this.promise){var n=this.props,r=(n.__chunkExtractor,n.forwardedRef,c(n,["__chunkExtractor","forwardedRef"]));this.promise=i.requireAsync(r).then(function(n){var r=g(n,e.props,j);t.suspense&&e.setCache(r),e.safeSetState({result:g(n,e.props,j),loading:!1},function(){return e.triggerOnLoad()})}).catch(function(t){e.safeSetState({error:t,loading:!1})})}return this.promise},a.render=function(){var e=this.props,n=e.forwardedRef,o=e.fallback,a=(e.__chunkExtractor,c(e,["forwardedRef","fallback","__chunkExtractor"])),i=this.state,u=i.error,l=i.loading,f=i.result;if(t.suspense){var d=this.getCache();if(!d)throw this.loadAsync();return r({loading:!1,fallback:null,result:d,options:t,props:Object(s.a)({},a,{ref:n})})}if(u)throw u;var p=o||t.fallback||null;return l?p:r({loading:l,fallback:p,result:f,options:t,props:Object(s.a)({},a,{ref:n})})},n}(a.a.Component),S=h(v),j=a.a.forwardRef(function(e,t){return a.a.createElement(S,Object.assign({forwardedRef:t},e))});return j.preload=function(e){i.requireAsync(e)},j.load=function(e){return i.requireAsync(e)},j}return{loadable:i,lazy:function(e,t){return i(e,Object(s.a)({},t,{suspense:!0}))}}}var S=v({defaultResolveComponent:function(e){return e.__esModule?e.default:e.default||e},render:function(e){var t=e.result,n=e.props;return a.a.createElement(t,n)}}),j=S.loadable,O=S.lazy,w=v({onLoad:function(e,t){e&&t.forwardedRef&&("function"==typeof t.forwardedRef?t.forwardedRef(e):t.forwardedRef.current=e)},render:function(e){var t=e.result,n=e.loading,r=e.props;return!n&&r.children?r.children(t):null}}),x=w.loadable,$=w.lazy;var C=j;C.lib=x,O.lib=$;var k=C,z=n(174),_=n(171),M=n(176),P=k(function(){return Promise.all([n.e(8),n.e(9)]).then(n.bind(null,213))});t.default=function(){return Object(r.d)(M.a,null,Object(r.d)(z.a,null,Object(r.d)(_.a,null,Object(r.d)("h1",null,"マイナンバーカード普及状況ダッシュボード"),Object(r.d)("p",null,"マイナンバーカードの交付率のダッシュボードです。"," ",Object(r.d)("a",{href:"https://www.soumu.go.jp/kojinbango_card/",target:"_blank"},"総務省にあるPDF"),"「マイナンバーカード交付状況について」からCSVデータを抜き出し、CSVとして保存しています。"),Object(r.d)(P,null),Object(r.d)(i.a,{to:"/data"},"CSVデータ一覧へ"))))}},167:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"d",function(){return o}),n.d(t,"a",function(){return a}),n.d(t,"f",function(){return i}),n.d(t,"c",function(){return c}),n.d(t,"e",function(){return s});var r={brand:"#663399",lilac:"#9d7cbf",accent:"#ffb238",success:"#37b635",warning:"#ec1818",ui:{bright:"#e0d6eb",light:"#f5f3f7",whisper:"#fbfafc"},code:"#fcf6f0",gray:{dark:"hsla(270, 17.119554496%, 0%, 0.92)",copy:"hsla(270, 15.797828016000002%, 0%, 0.88)",calm:"rgba(0, 0, 0, 0.54)"},white:"#fff",black:"#000"},o={sansSerif:'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',serif:'Georgia, "Times New Roman", Times, serif',monospace:'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace'},a={xs:0,sm:576,md:768,lg:992,xl:1200},i={md:720,lg:960,xl:1140},c={fontSize:{regular:16,large:18},headingSizes:{h1:2.441,h2:1.953,h3:1.563,h4:1.25},lineHeight:{regular:1.45,heading:1.2},containerPadding:1.5},s={header:60}},169:function(e,t,n){"use strict";n.d(t,"b",function(){return d});var r=n(12),o=n(0),a=n.n(o),i=n(5),c=n.n(i),s=n(43),u=n.n(s);n.d(t,"a",function(){return u.a});n(170);var l=a.a.createContext({});function f(e){var t=e.staticQueryData,n=e.data,o=e.query,i=e.render,c=n?n.data:t[o]&&t[o].data;return Object(r.d)(a.a.Fragment,null,c&&i(c),!c&&Object(r.d)("div",null,"Loading (StaticQuery)"))}var d=function(e){var t=e.data,n=e.query,o=e.render,a=e.children;return Object(r.d)(l.Consumer,null,function(e){return Object(r.d)(f,{data:t,query:n,render:o||a,staticQueryData:e})})};d.propTypes={data:c.a.object,query:c.a.string.isRequired,render:c.a.func,children:c.a.func}},170:function(e,t,n){var r;e.exports=(r=n(173))&&r.default||r},171:function(e,t,n){"use strict";var r=n(168),o=n(12),a=(n(0),n(167)),i=n(172),c=Object(r.a)("div",{target:"e1c6zxln0"})("position:relative;margin-left:auto;margin-right:auto;width:auto;max-width:",Object(i.a)(a.f.lg),"em;");t.a=function(e){var t=e.children,n=e.className;return Object(o.d)(c,{className:n},t)}},172:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n(167),o=function(e){return e/r.c.fontSize.regular}},173:function(e,t,n){"use strict";n.r(t);n(67);var r=n(0),o=n.n(r),a=n(5),i=n.n(a),c=n(68),s=function(e){var t=e.location,n=e.pageResources;return n?o.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json)):null};s.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=s},174:function(e,t,n){"use strict";var r=n(168),o=n(12),a=(n(0),n(167)),i=Object(r.a)("div",{target:"e20rco30"})("display:block;flex:1;position:relative;padding:",a.c.containerPadding,"rem;margin-bottom:3rem;");t.a=function(e){var t=e.children,n=e.className;return Object(o.d)(i,{className:n},t)}},175:function(e){e.exports={data:{site:{siteMetadata:{title:"マイナンバーカード普及率ダッシュボード",description:"マイナンバーカードノ普及率をダッシュボード形式で表示するサイトです。"}}}}},176:function(e,t,n){"use strict";var r=n(12),o=n(175),a=n(0),i=n(177),c=n.n(i),s=n(169),u=(n(178),n(167)),l=n(172),f="\n  html {\n    box-sizing: border-box;\n  }\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: inherit;\n  }\n\n  html {\n    font-size: "+u.c.fontSize.regular+"px !important;\n    line-height: "+u.c.lineHeight.regular+" !important;\n  }\n\n  body {\n    width: 100%;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    font-family: "+u.d.sansSerif+";\n    color: "+u.b.black+";\n    background-color: "+u.b.white+";\n    -webkit-text-size-adjust: 100%;\n    -ms-text-size-adjust: 100%;\n  }\n\n  a {\n    color: "+u.b.brand+";\n    text-decoration: none;\n\n    &:hover,\n    &:focus {\n      text-decoration: underline;\n    }\n  }\n\n  img {\n    max-width: 100%;\n    object-fit: contain;\n    position: relative;\n  }\n\n  figure {\n    margin: 2rem 0;\n  }\n\n  figcaption {\n    font-size: 80%;\n  }\n\n  table {\n    width: 100%;\n    margin-bottom: 1rem;\n    border: 1px solid "+u.b.ui.light+";\n    font-size: 85%;\n    border-collapse: collapse;\n  }\n\n  td,\n  th {\n    padding: .25rem .5rem;\n    border: 1px solid "+u.b.ui.light+";\n  }\n\n  th {\n    text-align: left;\n  }\n\n  tbody {\n    tr {\n      &:nth-of-type(odd) {\n        td {\n          background-color: "+u.b.ui.whisper+";\n        }\n        tr {\n          background-color: "+u.b.ui.whisper+";\n        }\n      }\n    }\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    margin-top: 1.414rem;\n    margin-bottom: .5rem;\n    color: "+u.b.black+";\n    font-weight: 600;\n    line-height: "+u.c.lineHeight.heading+";\n    text-rendering: optimizeLegibility;\n  }\n\n  h1 {\n    margin-top: 0;\n    font-size: "+u.c.headingSizes.h1+"rem;\n  }\n\n  h2 {\n    font-size: "+u.c.headingSizes.h2+"rem;\n  }\n\n  h3 {\n    font-size: "+u.c.headingSizes.h3+"rem;\n  }\n\n  h4, h5, h6 {\n    font-size: "+u.c.headingSizes.h4+"rem;\n  }\n\n  p {\n    margin-top: 0;\n    margin-bottom: 1rem;\n  }\n\n  strong {\n    color: "+u.b.black+";\n  }\n\n  ul,\n  ol,\n  dl {\n    margin-top: 0;\n    margin-bottom: 1rem;\n  }\n\n  dt {\n    font-weight: bold;\n  }\n\n  dd {\n    margin-bottom: .5rem;\n  }\n\n  hr {\n    position: relative;\n    margin: 1.5rem 0;\n    border: 0;\n    border-top: 1px solid "+u.b.ui.light+";\n  }\n\n  blockquote {\n    margin: .8rem 0;\n    padding: .5rem 1rem;\n    border-left: .25rem solid "+u.b.ui.light+";\n    color: "+u.b.gray.calm+";\n\n    p {\n      &:last-child {\n        margin-bottom: 0;\n      }\n    }\n\n    @media (min-width: "+Object(l.a)(u.a.md)+"em) {\n      padding-right: 5rem;\n      padding-left: 1.25rem;\n    }\n  }\n",d=n(168),p=n(179),m=n(171),b=Object(d.a)("header",{target:"e14yya1q0"})("height:",u.e.header,"px;padding:0 ",u.c.containerPadding,"rem;background-color:",u.b.brand,";color:",Object(p.a)(.5,u.b.white),";"),y=Object(d.a)(m.a,{target:"e14yya1q1"})({name:"voneje",styles:"display:flex;flex-direction:row;align-items:center;height:100%;"}),h=Object(d.a)(s.a,{target:"e14yya1q2"})("color:",u.b.white,";font-size:1.5rem;font-weight:600;&:hover,&:focus{text-decoration:none;}"),g=function(e){var t=e.title;return Object(r.d)(b,null,Object(r.d)(y,null,Object(r.d)(h,{to:"/"},t)))},v=Object(d.a)("div",{target:"e17su9850"})({name:"zf0iqh",styles:"display:flex;flex-direction:column;min-height:100vh;"}),S=function(e){var t=e.children,n=e.className;return Object(r.d)(a.Fragment,null,Object(r.d)(r.a,{styles:function(){return Object(r.c)(f)}}),Object(r.d)(v,{className:n},t))},j=Object(d.a)("main",{target:"e1qy7fsr0"})({name:"b95f0i",styles:"display:flex;flex-direction:column;flex:1;"}),O=function(e){var t=e.children,n=e.className;return Object(r.d)(j,{className:n},t)};t.a=function(e){var t=e.children;return Object(r.d)(s.b,{query:"991718019",render:function(e){return Object(r.d)(S,null,Object(r.d)(c.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:e.site.siteMetadata.description},{name:"keywords",content:e.site.siteMetadata.keywords}]}),Object(r.d)(g,{title:e.site.siteMetadata.title}),Object(r.d)(O,null,t))},data:o})}},191:function(e,t,n){"use strict";e.exports=n(192)},192:function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.for,o=r?Symbol.for("react.element"):60103,a=r?Symbol.for("react.portal"):60106,i=r?Symbol.for("react.fragment"):60107,c=r?Symbol.for("react.strict_mode"):60108,s=r?Symbol.for("react.profiler"):60114,u=r?Symbol.for("react.provider"):60109,l=r?Symbol.for("react.context"):60110,f=r?Symbol.for("react.async_mode"):60111,d=r?Symbol.for("react.concurrent_mode"):60111,p=r?Symbol.for("react.forward_ref"):60112,m=r?Symbol.for("react.suspense"):60113,b=r?Symbol.for("react.suspense_list"):60120,y=r?Symbol.for("react.memo"):60115,h=r?Symbol.for("react.lazy"):60116,g=r?Symbol.for("react.block"):60121,v=r?Symbol.for("react.fundamental"):60117,S=r?Symbol.for("react.responder"):60118,j=r?Symbol.for("react.scope"):60119;function O(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case f:case d:case i:case s:case c:case m:return e;default:switch(e=e&&e.$$typeof){case l:case p:case h:case y:case u:return e;default:return t}}case a:return t}}}function w(e){return O(e)===d}t.AsyncMode=f,t.ConcurrentMode=d,t.ContextConsumer=l,t.ContextProvider=u,t.Element=o,t.ForwardRef=p,t.Fragment=i,t.Lazy=h,t.Memo=y,t.Portal=a,t.Profiler=s,t.StrictMode=c,t.Suspense=m,t.isAsyncMode=function(e){return w(e)||O(e)===f},t.isConcurrentMode=w,t.isContextConsumer=function(e){return O(e)===l},t.isContextProvider=function(e){return O(e)===u},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return O(e)===p},t.isFragment=function(e){return O(e)===i},t.isLazy=function(e){return O(e)===h},t.isMemo=function(e){return O(e)===y},t.isPortal=function(e){return O(e)===a},t.isProfiler=function(e){return O(e)===s},t.isStrictMode=function(e){return O(e)===c},t.isSuspense=function(e){return O(e)===m},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===d||e===s||e===c||e===m||e===b||"object"==typeof e&&null!==e&&(e.$$typeof===h||e.$$typeof===y||e.$$typeof===u||e.$$typeof===l||e.$$typeof===p||e.$$typeof===v||e.$$typeof===S||e.$$typeof===j||e.$$typeof===g)},t.typeOf=O},193:function(e,t,n){"use strict";var r=n(194),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},c={};function s(e){return r.isMemo(e)?i:c[e.$$typeof]||o}c[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},c[r.Memo]=i;var u=Object.defineProperty,l=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,d=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,m=Object.prototype;e.exports=function e(t,n,r){if("string"!=typeof n){if(m){var o=p(n);o&&o!==m&&e(t,o,r)}var i=l(n);f&&(i=i.concat(f(n)));for(var c=s(t),b=s(n),y=0;y<i.length;++y){var h=i[y];if(!(a[h]||r&&r[h]||b&&b[h]||c&&c[h])){var g=d(n,h);try{u(t,h,g)}catch(v){}}}}return t}},194:function(e,t,n){"use strict";e.exports=n(195)},195:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&Symbol.for,o=r?Symbol.for("react.element"):60103,a=r?Symbol.for("react.portal"):60106,i=r?Symbol.for("react.fragment"):60107,c=r?Symbol.for("react.strict_mode"):60108,s=r?Symbol.for("react.profiler"):60114,u=r?Symbol.for("react.provider"):60109,l=r?Symbol.for("react.context"):60110,f=r?Symbol.for("react.async_mode"):60111,d=r?Symbol.for("react.concurrent_mode"):60111,p=r?Symbol.for("react.forward_ref"):60112,m=r?Symbol.for("react.suspense"):60113,b=r?Symbol.for("react.memo"):60115,y=r?Symbol.for("react.lazy"):60116;function h(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case f:case d:case i:case s:case c:case m:return e;default:switch(e=e&&e.$$typeof){case l:case p:case u:return e;default:return t}}case y:case b:case a:return t}}}function g(e){return h(e)===d}t.typeOf=h,t.AsyncMode=f,t.ConcurrentMode=d,t.ContextConsumer=l,t.ContextProvider=u,t.Element=o,t.ForwardRef=p,t.Fragment=i,t.Lazy=y,t.Memo=b,t.Portal=a,t.Profiler=s,t.StrictMode=c,t.Suspense=m,t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===d||e===s||e===c||e===m||"object"==typeof e&&null!==e&&(e.$$typeof===y||e.$$typeof===b||e.$$typeof===u||e.$$typeof===l||e.$$typeof===p)},t.isAsyncMode=function(e){return g(e)||h(e)===f},t.isConcurrentMode=g,t.isContextConsumer=function(e){return h(e)===l},t.isContextProvider=function(e){return h(e)===u},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return h(e)===p},t.isFragment=function(e){return h(e)===i},t.isLazy=function(e){return h(e)===y},t.isMemo=function(e){return h(e)===b},t.isPortal=function(e){return h(e)===a},t.isProfiler=function(e){return h(e)===s},t.isStrictMode=function(e){return h(e)===c},t.isSuspense=function(e){return h(e)===m}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-273e2b4f5679626acd41.js.map