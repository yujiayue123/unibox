(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-notice"],{"0763":function(t,e,i){var n=i("8cb4");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("669b3ad8",n,!0,{sourceMap:!1,shadowMode:!1})},"25a7":function(t,e,i){"use strict";i.r(e);var n=i("b9e0"),r=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},"2a56":function(t,e,i){"use strict";var n=i("bdbd"),r=i.n(n);r.a},"366e":function(t,e,i){"use strict";i.r(e);var n=i("502c"),r=i("8e84");for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);i("2a56");var o,s=i("f0c5"),l=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"86ce80e8",null,!1,n["a"],o);e["default"]=l.exports},"502c":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.nodes.length?t._e():t._t("default"),i("v-uni-view",{style:t.showAm+(t.selectable?";user-select:text;-webkit-user-select:text":""),attrs:{id:"_top"}},[i("div",{attrs:{id:"rtf"+t.uid}})])],2)},a=[]},5478:function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uParse:i("366e").default,uLoadmore:i("6c4f").default},r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni_box notice"},[t._l(t.list,(function(e,n){return i("v-uni-view",{staticClass:"system"},[i("v-uni-view",{staticClass:"messages"},[i("v-uni-text",[t._v(t._s(e.title))]),i("v-uni-text",[t._v(t._s(e.created_at))])],1),i("v-uni-view",{staticClass:"information"},[i("u-parse",{attrs:{html:e.synopsis,"tag-style":t.style}}),i("v-uni-view",{staticClass:"look_over",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.routerTo(e.id)}}},[t._v("查看详情 >>")])],1)],1)})),i("u-loadmore",{attrs:{status:t.status,loadText:t.$store.state.loadText},on:{loadmore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadmore.apply(void 0,arguments)}}})],2)},a=[]},"749b":function(t,e,i){i("ac1f"),i("1276");var n={errorImg:null,filter:null,highlight:null,onText:null,entities:{quot:'"',apos:"'",semi:";",nbsp:" ",ensp:" ",emsp:" ",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…"},blankChar:r(" , ,\t,\r,\n,\f"),boolAttrs:r("allowfullscreen,autoplay,autostart,controls,ignore,loop,muted"),blockTags:r("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),ignoreTags:r("area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr"),richOnlyTags:r("a,colgroup,fieldset,legend"),selfClosingTags:r("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),trustTags:r("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),userAgentStyles:{address:"font-style:italic",big:"display:inline;font-size:1.2em",blockquote:"background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre;overflow:scroll",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",u:"text-decoration:underline"}};function r(t){for(var e=Object.create(null),i=t.split(","),n=i.length;n--;)e[i[n]]=!0;return e}t.exports=n},"8cb4":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"*[data-v-a45287b0]{font-family:Source Han Sans CN-Medium,Source Han Sans CN}.uni_box[data-v-a45287b0]{width:100vw;min-height:100%;background:#f7f8fa}uni-image[data-v-a45287b0]{pointer-events:none}.test[data-v-a45287b0]{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.notice .system[data-v-a45287b0]{width:100%;padding:%?32?%;border-radius:%?0?% %?32?% %?32?%;opacity:1;box-sizing:border-box}.notice .system .messages[data-v-a45287b0]{width:100%;display:flex;justify-content:space-between;box-sizing:border-box}.notice .system .messages uni-text[data-v-a45287b0]{color:#aaa;font-weight:400;font-size:%?24?%;font-family:Source Han Sans CN-Regular,Source Han Sans CN}.notice .system .information[data-v-a45287b0]{width:100%;padding:%?20?%;margin-top:%?16?%;background:#fff;border-radius:%?0?% %?32?% %?32?% %?32?%;box-sizing:border-box}.notice .system .information uni-text[data-v-a45287b0]{color:#333;font-size:%?28?%;font-weight:400}.notice .system .information .look_over[data-v-a45287b0]{color:#18eaf0;font-size:%?24?%;font-weight:500;font-family:Source Han Sans CN-Medium,Source Han Sans CN;display:flex;justify-content:flex-end}",""]),t.exports=e},"8e84":function(t,e,i){"use strict";i.r(e);var n=i("de07"),r=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},"94c3":function(t,e,i){"use strict";i.r(e);var n=i("5478"),r=i("25a7");for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);i("ff48");var o,s=i("f0c5"),l=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"a45287b0",null,!1,n["a"],o);e["default"]=l.exports},b85c:function(t,e,i){"use strict";i("a4d3"),i("e01a"),i("d28b"),i("d3b7"),i("3ca3"),i("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=a;var n=r(i("06c5"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e){var i;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=(0,n.default)(t))||e&&t&&"number"===typeof t.length){i&&(t=i);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,l=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){l=!0,o=t},f:function(){try{s||null==i["return"]||i["return"]()}finally{if(l)throw o}}}}},b9e0:function(t,e,i){"use strict";var n=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(i("2909"));i("96cf");var a=n(i("1da1")),o={data:function(){return{list:[],page:1,last_page:1,limit:10,status:"loadmore",style:{img:"width:max-width:100%;height:auto"}}},onLoad:function(){this.getList()},onReachBottom:function(){this.triggerPage()},methods:{getList:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$u.api.news({type:2,page:t.page,limit:t.limit});case 2:i=e.sent,n=i.list,t.list=[].concat((0,r.default)(t.list),(0,r.default)(n.list)),t.last_page=n.last_page,t.last_page==t.page&&(t.status="nomore");case 7:case"end":return e.stop()}}),e)})))()},loadmore:function(){this.triggerPage()},triggerPage:function(){var t=this.page,e=this.last_page;t<e&&(this.page++,this.getList())},routerTo:function(t){var e="noticeDeta?id=".concat(t);uni.navigateTo({url:e})}}};e.default=o},bdbd:function(t,e,i){var n=i("e8ab");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("7cc30789",n,!0,{sourceMap:!1,shadowMode:!1})},de07:function(t,e,i){"use strict";var n=i("4ea4");i("99af"),i("caad"),i("c975"),i("acd8"),i("e25e"),i("ac1f"),i("2532"),i("466d"),i("5319"),i("841c"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,a=n(i("b85c")),o=uni.getSystemInfoSync(),s=o.windowWidth,l=(o.platform,i("749b")),c={name:"parser",data:function(){return{uid:this._uid,showAm:"",nodes:[]}},props:{html:String,autopause:{type:Boolean,default:!0},autoscroll:Boolean,autosetTitle:{type:Boolean,default:!0},domain:String,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean},watch:{html:function(t){this.setContent(t)}},created:function(){this.imgList=[],this.imgList.each=function(t){for(var e=0,i=this.length;e<i;e++)this.setItem(e,t(this[e],e,this))},this.imgList.setItem=function(t,e){if(void 0!=t&&e){if(0==e.indexOf("http")&&this.includes(e)){for(var i,n=e.split("://")[0],r=n.length;i=e[r];r++){if("/"==i&&"/"!=e[r-1]&&"/"!=e[r+1])break;n+=Math.random()>.5?i.toUpperCase():i}return n+=e.substr(r),this[t]=n}if(this[t]=e,e.includes("data:image")){var a=e.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!a)return}}}},mounted:function(){var t=this;this.document=document.getElementById("rtf"+this._uid),r&&(this.search=function(e){return r(t,e)}),this.html&&this.setContent(this.html)},beforeDestroy:function(){this._observer&&this._observer.disconnect(),this.imgList.each((function(t){})),clearInterval(this._timer)},methods:{setContent:function(t,e){var i=this;if(t){var n=document.createElement("div");e?this.rtf?this.rtf.appendChild(n):this.rtf=n:(this.rtf&&this.rtf.parentNode.removeChild(this.rtf),this.rtf=n),n.innerHTML=this._handleHtml(t,e);for(var r,o=this.rtf.getElementsByTagName("style"),c=0;r=o[c++];)r.innerHTML=r.innerHTML.replace(/body/g,"#rtf"+this._uid),r.setAttribute("scoped","true");!this._observer&&this.lazyLoad&&IntersectionObserver&&(this._observer=new IntersectionObserver((function(t){for(var e,n=0;e=t[n++];)e.isIntersecting&&(e.target.src=e.target.getAttribute("data-src"),e.target.removeAttribute("data-src"),i._observer.unobserve(e.target))}),{rootMargin:"500px 0px 500px 0px"}));var u=this,d=this.rtf.getElementsByTagName("title");d.length&&this.autosetTitle&&uni.setNavigationBarTitle({title:d[0].innerText});var f=function(t){var e=t.getAttribute("src");i.domain&&e&&("/"==e[0]?"/"==e[1]?t.src=(i.domain.includes("://")?i.domain.split("://")[0]:"")+":"+e:t.src=i.domain+e:e.includes("://")||0==e.indexOf("data:")||(t.src=i.domain+"/"+e))};this.imgList.length=0;for(var h,g=this.rtf.getElementsByTagName("img"),m=0,v=0;h=g[m];m++)parseInt(h.style.width||h.getAttribute("width"))>s&&(h.style.height="auto"),f(h),h.hasAttribute("ignore")||"A"==h.parentElement.nodeName||(h.i=v++,u.imgList.push(h.getAttribute("original-src")||h.src||h.getAttribute("data-src")),h.onclick=function(t){t.stopPropagation();var e=!0;this.ignore=function(){return e=!1},u.$emit("imgtap",this),e&&uni.previewImage({current:this.i,urls:u.imgList})}),h.onerror=function(){l.errorImg&&(u.imgList[this.i]=this.src=l.errorImg),u.$emit("error",{source:"img",target:this})},u.lazyLoad&&this._observer&&h.src&&0!=h.i&&(h.setAttribute("data-src",h.src),h.removeAttribute("src"),this._observer.observe(h));var p,b=this.rtf.getElementsByTagName("a"),y=(0,a.default)(b);try{for(y.s();!(p=y.n()).done;){var x=p.value;x.onclick=function(t){t.stopPropagation();var e=!0,i=this.getAttribute("href");if(u.$emit("linkpress",{href:i,ignore:function(){return e=!1}}),e&&i)if("#"==i[0])u.useAnchor&&u.navigateTo({id:i.substr(1)});else{if(0==i.indexOf("http")||0==i.indexOf("//"))return!0;uni.navigateTo({url:i})}return!1}}}catch(M){y.e(M)}finally{y.f()}var w=this.rtf.getElementsByTagName("video");u.videoContexts=w;for(var _,T=0;_=w[T++];)f(_),_.style.maxWidth="100%",_.onerror=function(){u.$emit("error",{source:"video",target:this})},_.onplay=function(){if(u.autopause)for(var t,e=0;t=u.videoContexts[e++];)t!=this&&t.pause()};var C,S,k=this.rtf.getElementsByTagName("audio"),A=(0,a.default)(k);try{for(A.s();!(C=A.n()).done;){var L=C.value;f(L),L.onerror=function(){u.$emit("error",{source:"audio",target:this})}}}catch(M){A.e(M)}finally{A.f()}if(this.autoscroll){var B,I=this.rtf.getElementsByTagName("table"),N=(0,a.default)(I);try{for(N.s();!(B=N.n()).done;){var E=B.value,O=document.createElement("div");O.style.overflow="scroll",E.parentNode.replaceChild(O,E),O.appendChild(E)}}catch(M){N.e(M)}finally{N.f()}}e||this.document.appendChild(this.rtf),this.$nextTick((function(){i.nodes=[1],i.$emit("load")})),setTimeout((function(){return i.showAm=""}),500),clearInterval(this._timer),this._timer=setInterval((function(){i.rect=i.rtf.getBoundingClientRect(),i.rect.height==S&&(i.$emit("ready",i.rect),clearInterval(i._timer)),S=i.rect.height}),350),this.showWithAnimation&&!e&&(this.showAm="animation:_show .5s")}else this.rtf&&!e&&this.rtf.parentNode.removeChild(this.rtf)},getText:function(){arguments.length>0&&void 0!==arguments[0]||this.nodes;var t="";return t=this.rtf.innerText,t},in:function(t){t.page&&t.selector&&t.scrollTop&&(this._in=t)},navigateTo:function(t){var e=this;if(!this.useAnchor)return t.fail&&t.fail("Anchor is disabled");var i=" ",n=uni.createSelectorQuery().in(this._in?this._in.page:this).select((this._in?this._in.selector:"#_top")+(t.id?"".concat(i,"#").concat(t.id,",").concat(this._in?this._in.selector:"#_top").concat(i,".").concat(t.id):"")).boundingClientRect();this._in?n.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect():n.selectViewport().scrollOffset(),n.exec((function(i){if(!i[0])return t.fail&&t.fail("Label not found");var n=i[1].scrollTop+i[0].top-(i[2]?i[2].top:0)+(t.offset||0);e._in?e._in.page[e._in.scrollTop]=n:uni.pageScrollTo({scrollTop:n,duration:300}),t.success&&t.success()}))},getVideoContext:function(t){if(!t)return this.videoContexts;for(var e=this.videoContexts.length;e--;)if(this.videoContexts[e].id==t)return this.videoContexts[e]},_handleHtml:function(t,e){if(!e){var i="<style scoped>@keyframes _show{0%{opacity:0}100%{opacity:1}}img{max-width:100%}";for(var n in l.userAgentStyles)i+="".concat(n,"{").concat(l.userAgentStyles[n],"}");for(n in this.tagStyle)i+="".concat(n,"{").concat(this.tagStyle[n],"}");i+="</style>",t=i+t}return t.includes("rpx")&&(t=t.replace(/[0-9.]+\s*rpx/g,(function(t){return parseFloat(t)*s/750+"px"}))),t}}};e.default=c},e8ab:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"@-webkit-keyframes _show-data-v-86ce80e8{0%{opacity:0}100%{opacity:1}}@keyframes _show-data-v-86ce80e8{0%{opacity:0}100%{opacity:1}}\n\n\n\n",""]),t.exports=e},ff48:function(t,e,i){"use strict";var n=i("0763"),r=i.n(n);r.a}}]);