(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabbar-blindBox"],{"0ae5":function(t,e,i){t.exports=i.p+"static/img/h1.d079d4d7.svg"},1218:function(t,e,i){"use strict";i.r(e);var a=i("f234"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},3399:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var a={uSwiper:i("8bb4").default,uLoadmore:i("6c4f").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni_box blindBox"},[a("v-uni-view",{staticClass:"heade_swiper"},[a("u-swiper",{attrs:{list:t.swiperList,height:"280"}})],1),a("v-uni-view",{staticClass:"list"},[t._l(t.list,(function(e,n){return a("v-uni-view",{staticClass:"item",on:{click:function(i){i.preventDefault(),arguments[0]=i=t.$handleEvent(i),t.routerTo(e.id)}}},[a("v-uni-image",{staticClass:"item_img",attrs:{src:e.cover}}),a("v-uni-view",{staticClass:"item_banner"},[a("v-uni-view",{staticClass:"item_top"},[a("v-uni-view",{staticClass:"item_top_name"},[t._v("《"+t._s(e.name)+"》")]),a("v-uni-view",{staticClass:"item_top_number"},[t._v("每人限购"+t._s(e.quota)+"份")])],1),a("v-uni-view",{staticClass:"item_bottom"},[a("v-uni-view",{staticClass:"item_number"},[a("v-uni-view",{staticClass:"item_price"},[t._v(t._s(e.price)+"¥")]),a("v-uni-view",{staticClass:"item_limit"},[t._v("发行量"+t._s(e.issue_all)+"份")])],1),0==e.status?a("v-uni-view",{staticClass:"item_status item_status_time"},[a("v-uni-image",{staticClass:"status_img",attrs:{src:i("0ae5")}}),t._v(t._s(e.timer))],1):1==e.status?a("v-uni-text",{staticClass:"item_status conduct"},[t._v("剩余"+t._s(e.stock)+"份 · 进行中")]):2==e.status?a("v-uni-text",{staticClass:"item_status conduct"},[t._v("剩余"+t._s(e.stock)+"份 · 已结束")]):3==e.status?a("v-uni-text",{staticClass:"item_status conduct"},[t._v("剩余"+t._s(e.stock)+"份 · 已售罄")]):t._e()],1)],1)],1)})),a("u-loadmore",{attrs:{status:t.status,loadText:t.$store.state.loadText},on:{loadmore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadmore.apply(void 0,arguments)}}})],2)],1)},r=[]},"3b18":function(t,e,i){"use strict";i.r(e);var a=i("3399"),n=i("54f3");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("3b57");var o,s=i("f0c5"),u=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"be0c1764",null,!1,a["a"],o);e["default"]=u.exports},"3b57":function(t,e,i){"use strict";var a=i("7d69"),n=i.n(a);n.a},4845:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"*[data-v-be0c1764]{font-family:Source Han Sans CN-Medium,Source Han Sans CN}.uni_box[data-v-be0c1764]{width:100vw;min-height:100%;background:#f7f8fa}uni-image[data-v-be0c1764]{pointer-events:none}.test[data-v-be0c1764]{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.blindBox .heade_swiper[data-v-be0c1764]{width:100%;height:%?280?%;padding:0 %?32?%;box-sizing:border-box}.blindBox .list[data-v-be0c1764]{padding:%?30?% %?30?% var(--window-bottom);box-sizing:border-box}.blindBox .list .item[data-v-be0c1764]{width:100%;height:%?690?%;border-radius:%?48?%;margin-bottom:%?30?%;background:#c4c4c4;overflow:hidden;position:relative}.blindBox .list .item .item_img[data-v-be0c1764]{width:100%;height:100%}.blindBox .list .item .item_banner[data-v-be0c1764]{width:100%;border-bottom-left-radius:%?48?%;border-bottom-right-radius:%?48?%;padding:%?32?%;box-sizing:border-box;background:linear-gradient(136deg,#17171b,rgba(23,23,27,0));position:absolute;left:0;bottom:0}.blindBox .list .item .item_banner .item_top[data-v-be0c1764]{display:flex;justify-content:space-between}.blindBox .list .item .item_banner .item_top .item_top_name[data-v-be0c1764]{color:#fff;font-size:%?40?%}.blindBox .list .item .item_banner .item_top .item_top_number[data-v-be0c1764]{color:#fff;font-size:%?24?%;font-weight:400}.blindBox .list .item .item_banner .item_bottom[data-v-be0c1764]{display:flex;justify-content:space-between}.blindBox .list .item .item_banner .item_bottom .item_number[data-v-be0c1764]{display:flex;align-items:center}.blindBox .list .item .item_banner .item_bottom .item_number .item_price[data-v-be0c1764]{color:#fff;font-size:%?40?%;font-weight:700;margin-right:%?20?%}.blindBox .list .item .item_banner .item_bottom .item_number .item_limit[data-v-be0c1764]{color:#fff;font-size:%?24?%;font-weight:400}.blindBox .list .item .item_banner .item_bottom .item_status[data-v-be0c1764]{height:%?64?%;text-align:center;color:#fff;font-size:%?28?%;border-radius:%?16?%;padding:%?0?% %?20?%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:flex;align-items:center}.blindBox .list .item .item_banner .item_bottom .item_status.item_status_time[data-v-be0c1764]{background:#000}.blindBox .list .item .item_banner .item_bottom .item_status.item_status_time .status_img[data-v-be0c1764]{width:%?28?%;height:%?28?%;margin-right:%?10?%}.blindBox .list .item .item_banner .item_bottom .item_status.conduct[data-v-be0c1764]{background:#000}.blindBox .list .item .item_banner .item_bottom .item_status.end[data-v-be0c1764]{background:#333}",""]),t.exports=e},"54f3":function(t,e,i){"use strict";i.r(e);var a=i("c803"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},7865:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"*[data-v-66599be9]{font-family:Source Han Sans CN-Medium,Source Han Sans CN}.uni_box[data-v-66599be9]{width:100vw;min-height:100%;background:#f7f8fa}uni-image[data-v-66599be9]{pointer-events:none}.test[data-v-66599be9]{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.u-swiper-wrap[data-v-66599be9]{position:relative;overflow:hidden;-webkit-transform:translateY(0);transform:translateY(0)}.u-swiper-image[data-v-66599be9]{width:100%;will-change:transform;height:100%;display:block;pointer-events:none}.u-swiper-indicator[data-v-66599be9]{padding:0 %?24?%;position:absolute;display:flex;flex-direction:row;width:100%;z-index:1}.u-indicator-item-rect[data-v-66599be9]{width:%?26?%;height:%?8?%;margin:0 %?6?%;transition:all .5s;background-color:rgba(0,0,0,.3)}.u-indicator-item-rect-active[data-v-66599be9]{background-color:hsla(0,0%,100%,.8)}.u-indicator-item-dot[data-v-66599be9]{width:%?14?%;height:%?14?%;margin:0 %?6?%;border-radius:%?20?%;transition:all .5s;background-color:rgba(0,0,0,.3)}.u-indicator-item-dot-active[data-v-66599be9]{background-color:hsla(0,0%,100%,.8)}.u-indicator-item-round[data-v-66599be9]{width:%?14?%;height:%?14?%;margin:0 %?6?%;border-radius:%?20?%;transition:all .5s;background-color:rgba(0,0,0,.3)}.u-indicator-item-round-active[data-v-66599be9]{width:%?34?%;background-color:hsla(0,0%,100%,.8)}.u-indicator-item-number[data-v-66599be9]{padding:%?6?% %?16?%;line-height:1;background-color:rgba(0,0,0,.3);border-radius:%?100?%;font-size:%?26?%;color:hsla(0,0%,100%,.8)}.u-list-scale[data-v-66599be9]{-webkit-transform-origin:center center;transform-origin:center center}.u-list-image-wrap[data-v-66599be9]{width:100%;height:100%;flex:1;transition:all .5s;overflow:hidden;box-sizing:initial;position:relative}.u-swiper-title[data-v-66599be9]{position:absolute;background-color:rgba(0,0,0,.3);bottom:0;left:0;width:100%;font-size:%?28?%;padding:%?12?% %?24?%;color:hsla(0,0%,100%,.9)}.u-swiper-item[data-v-66599be9]{display:flex;flex-direction:row;overflow:hidden;align-items:center}",""]),t.exports=e},"79f2":function(t,e,i){var a=i("7865");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("baeba5f2",a,!0,{sourceMap:!1,shadowMode:!1})},"7d69":function(t,e,i){var a=i("4845");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2a0d3d14",a,!0,{sourceMap:!1,shadowMode:!1})},"8bb4":function(t,e,i){"use strict";i.r(e);var a=i("d806"),n=i("1218");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("f8a6");var o,s=i("f0c5"),u=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"66599be9",null,!1,a["a"],o);e["default"]=u.exports},c803:function(t,e,i){"use strict";var a=i("4ea4");i("99af"),i("4160"),i("e25e"),i("ac1f"),i("5319"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("2909"));i("96cf");var r=a(i("1da1")),o={data:function(){return{swiperList:[],list:[],page:1,last_page:1,limit:10,status:"loadmore",timer:null}},onShow:function(){this.getList()},onHide:function(){this.list=[],this.page=1,this.last_page=1,this.status="loadmore",clearInterval(this.timer)},onUnload:function(){clearInterval(this.timer)},onReachBottom:function(){this.triggerPage()},methods:{handerTime:function(){var t=this.list,e=(new Date).getTime();t.forEach((function(t){if(0==t.status){var i=t.start_date;i=new Date(i.replace(/-/g,"/"));var a=new Date(i).getTime();if(e>=a)t.status=1;else{var n=a-e,r=parseInt(n/1e3/60/60);r=r<10?"0"+r:r;var o=parseInt(n/1e3/60%60);o=o<10?"0"+o:o;var s=parseInt(n/1e3%60);s=s<10?"0"+s:s,t.timer="".concat(r,":").concat(o,":").concat(s)}}}))},getList:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){var i,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$u.api.blindboxList({page:t.page,limit:t.limit});case 2:i=e.sent,a=i.list,r=i.position,t.last_page=a.last_page,a=a.list,a.forEach((function(t){t.timer=""})),t.list=1==t.page?a:[].concat((0,n.default)(t.list),(0,n.default)(a)),t.last_page==t.page&&(t.status="nomore"),clearInterval(t.timer),t.handerTime(),t.timer=setInterval(t.handerTime,1e3),r.forEach((function(t){t.image=t.img})),t.swiperList=r;case 15:case"end":return e.stop()}}),e)})))()},loadmore:function(){this.triggerPage()},triggerPage:function(){var t=this.page,e=this.last_page;t<e&&(this.page++,this.getList())},routerTo:function(t){var e="/pages/blindBox/blindBoxDeta?id=".concat(t);uni.navigateTo({url:e})}}};e.default=o},d806:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-swiper-wrap",style:{borderRadius:t.borderRadius+"rpx"}},[i("v-uni-swiper",{style:{height:t.height+"rpx",backgroundColor:t.bgColor},attrs:{current:t.elCurrent,interval:t.interval,circular:t.circular,duration:t.duration,autoplay:t.autoplay,"previous-margin":t.effect3d?t.effect3dPreviousMargin+"rpx":"0","next-margin":t.effect3d?t.effect3dPreviousMargin+"rpx":"0"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)},animationfinish:function(e){arguments[0]=e=t.$handleEvent(e),t.animationfinish.apply(void 0,arguments)}}},t._l(t.list,(function(e,a){return i("v-uni-swiper-item",{key:a,staticClass:"u-swiper-item"},[i("v-uni-view",{staticClass:"u-list-image-wrap",class:[t.uCurrent!=a?"u-list-scale":""],style:{borderRadius:t.borderRadius+"rpx",transform:t.effect3d&&t.uCurrent!=a?"scaleY(0.9)":"scaleY(1)",margin:t.effect3d&&t.uCurrent!=a?"0 20rpx":0},on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.listClick(a)}}},[i("v-uni-image",{staticClass:"u-swiper-image",attrs:{src:e[t.name]||e,mode:t.imgMode}}),t.title&&e.title?i("v-uni-view",{staticClass:"u-swiper-title u-line-1",style:[{"padding-bottom":t.titlePaddingBottom},t.titleStyle]},[t._v(t._s(e.title))]):t._e()],1)],1)})),1),i("v-uni-view",{staticClass:"u-swiper-indicator",style:{top:"topLeft"==t.indicatorPos||"topCenter"==t.indicatorPos||"topRight"==t.indicatorPos?"12rpx":"auto",bottom:"bottomLeft"==t.indicatorPos||"bottomCenter"==t.indicatorPos||"bottomRight"==t.indicatorPos?"12rpx":"auto",justifyContent:t.justifyContent,padding:"0 "+(t.effect3d?"74rpx":"24rpx")}},["rect"==t.mode?t._l(t.list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"u-indicator-item-rect",class:{"u-indicator-item-rect-active":a==t.uCurrent}})})):t._e(),"dot"==t.mode?t._l(t.list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"u-indicator-item-dot",class:{"u-indicator-item-dot-active":a==t.uCurrent}})})):t._e(),"round"==t.mode?t._l(t.list,(function(e,a){return i("v-uni-view",{key:a,staticClass:"u-indicator-item-round",class:{"u-indicator-item-round-active":a==t.uCurrent}})})):t._e(),"number"==t.mode?[i("v-uni-view",{staticClass:"u-indicator-item-number"},[t._v(t._s(t.uCurrent+1)+"/"+t._s(t.list.length))])]:t._e()],2)],1)},r=[]},f234:function(t,e,i){"use strict";i("c975"),i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-swiper",props:{list:{type:Array,default:function(){return[]}},title:{type:Boolean,default:!1},indicator:{type:Object,default:function(){return{}}},borderRadius:{type:[Number,String],default:8},interval:{type:[String,Number],default:3e3},mode:{type:String,default:"round"},height:{type:[Number,String],default:250},indicatorPos:{type:String,default:"bottomCenter"},effect3d:{type:Boolean,default:!1},effect3dPreviousMargin:{type:[Number,String],default:50},autoplay:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},circular:{type:Boolean,default:!0},imgMode:{type:String,default:"aspectFill"},name:{type:String,default:"image"},bgColor:{type:String,default:"#f3f4f6"},current:{type:[Number,String],default:0},titleStyle:{type:Object,default:function(){return{}}}},watch:{list:function(t,e){t.length!==e.length&&(this.uCurrent=0)},current:function(t){this.uCurrent=t}},data:function(){return{uCurrent:this.current}},computed:{justifyContent:function(){return"topLeft"==this.indicatorPos||"bottomLeft"==this.indicatorPos?"flex-start":"topCenter"==this.indicatorPos||"bottomCenter"==this.indicatorPos?"center":"topRight"==this.indicatorPos||"bottomRight"==this.indicatorPos?"flex-end":void 0},titlePaddingBottom:function(){var t=0;return"none"==this.mode?"12rpx":(t=["bottomLeft","bottomCenter","bottomRight"].indexOf(this.indicatorPos)>=0&&"number"==this.mode?"60rpx":["bottomLeft","bottomCenter","bottomRight"].indexOf(this.indicatorPos)>=0&&"number"!=this.mode?"40rpx":"12rpx",t)},elCurrent:function(){return Number(this.current)}},methods:{listClick:function(t){this.$emit("click",t)},change:function(t){var e=t.detail.current;this.uCurrent=e,this.$emit("change",e)},animationfinish:function(t){}}};e.default=a},f8a6:function(t,e,i){"use strict";var a=i("79f2"),n=i.n(a);n.a}}]);