(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-invitationRecord"],{"072a":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uLoadmore:i("6c4f").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni_box invitation_record"},[a("v-uni-image",{staticClass:"title_img",attrs:{src:i("b5be")},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.routerTo.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"number_persons"},[t._v("当前共成功邀请"+t._s(t.count)+"人,已实名"+t._s(t.realname_number)+"人")]),a("v-uni-view",{staticClass:"title"},[a("v-uni-view",{staticClass:"code"},[t._v("排名")]),a("v-uni-view",{staticClass:"avatar"},[t._v("头像")]),a("v-uni-view",{staticClass:"nickname"},[t._v("昵称")]),a("v-uni-view",{staticClass:"realname"},[t._v("是否实名")])],1),a("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,i){return a("v-uni-view",{staticClass:"item"},[a("v-uni-view",{staticClass:"code"},[t._v(t._s(i+1))]),a("v-uni-view",{staticClass:"avatar"},[a("v-uni-image",{staticClass:"avatar_img",attrs:{src:e.head_portrait}})],1),a("v-uni-view",{staticClass:"nickname"},[t._v(t._s(e.nickname))]),1==e.is_realname?a("v-uni-view",{staticClass:"realname"},[t._v("已实名")]):a("v-uni-view",{staticClass:"realname realnames"},[t._v("未实名")])],1)})),1),a("u-loadmore",{attrs:{status:t.status,loadText:t.$store.state.loadText},on:{loadmore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadmore.apply(void 0,arguments)}}})],1)],1)},o=[]},"64f1":function(t,e,i){"use strict";var a=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("2909"));i("96cf");var o=a(i("1da1")),c={data:function(){return{list:[],page:1,limit:10,last_page:1,status:"loadmore",count:0,realname_number:0}},onShow:function(){this.getList()},onHide:function(){this.list=[],this.page=1,this.last_page=1,this.status="loadmore"},onReachBottom:function(){this.triggerPage()},methods:{getList:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var i,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$u.api.sonsList({page:t.page,limit:t.limit});case 2:i=e.sent,a=i.list,o=i.realname_number,t.last_page=a.last_page,t.count=a.count,a=a.list,t.list=1==t.page?a:[].concat((0,n.default)(t.list),(0,n.default)(a)),t.realname_number=o,t.last_page==t.page&&(t.status="nomore");case 11:case"end":return e.stop()}}),e)})))()},loadmore:function(){this.triggerPage()},triggerPage:function(){var t=this.page,e=this.last_page;t<e&&(this.page++,this.getList())},routerTo:function(){uni.navigateTo({url:"../setup/ranking"})}}};e.default=c},"8be8":function(t,e,i){"use strict";var a=i("ed69"),n=i.n(a);n.a},"95c4":function(t,e,i){"use strict";i.r(e);var a=i("072a"),n=i("aae4");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("8be8");var c,r=i("f0c5"),s=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"cf740e5c",null,!1,a["a"],c);e["default"]=s.exports},a9ad:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"*[data-v-cf740e5c]{font-family:Source Han Sans CN-Medium,Source Han Sans CN}.uni_box[data-v-cf740e5c]{width:100vw;min-height:100%;background:#f7f8fa}uni-image[data-v-cf740e5c]{pointer-events:none}.test[data-v-cf740e5c]{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.invitation_record .title_img[data-v-cf740e5c]{width:100%;height:%?360?%}.invitation_record .content[data-v-cf740e5c]{width:100%;border-radius:%?48?% %?48?% 0 0;padding:%?40?% %?32?%}.invitation_record .content .number_persons[data-v-cf740e5c]{width:100%;height:%?68?%;line-height:%?68?%;text-indent:%?20?%;margin-bottom:%?60?%;color:#fff;font-size:%?28?%;font-family:Source Han Sans CN-Regular,Source Han Sans CN;font-weight:400;border-radius:%?8?%;background:#31d3d7}.invitation_record .content .title[data-v-cf740e5c],\n.invitation_record .content .list .item[data-v-cf740e5c]{height:%?80?%;line-height:%?80?%;display:flex}.invitation_record .content .title uni-view[data-v-cf740e5c],\n.invitation_record .content .list .item uni-view[data-v-cf740e5c]{color:#000;font-size:%?28?%;font-weight:400;font-family:Source Han Sans CN-Regular,Source Han Sans CN}.invitation_record .content .title uni-view.code[data-v-cf740e5c],\n.invitation_record .content .list .item uni-view.code[data-v-cf740e5c]{flex:0 0 %?80?%;text-align:center}.invitation_record .content .title uni-view.avatar[data-v-cf740e5c],\n.invitation_record .content .list .item uni-view.avatar[data-v-cf740e5c]{flex:0 0 %?200?%;text-align:center}.invitation_record .content .title uni-view.nickname[data-v-cf740e5c],\n.invitation_record .content .list .item uni-view.nickname[data-v-cf740e5c]{flex:1;text-align:center}.invitation_record .content .title uni-view.realname[data-v-cf740e5c],\n.invitation_record .content .list .item uni-view.realname[data-v-cf740e5c]{flex:0 0 %?150?%;color:#31d3d7;font-weight:700;text-align:center}.invitation_record .content .title uni-view.realnames[data-v-cf740e5c],\n.invitation_record .content .list .item uni-view.realnames[data-v-cf740e5c]{color:red}.invitation_record .content .title[data-v-cf740e5c]{border-bottom:1px solid #e0e0e0}.invitation_record .content .list .item[data-v-cf740e5c]{margin-top:%?40?%}.invitation_record .content .list .item .avatar[data-v-cf740e5c]{display:flex;justify-content:center}.invitation_record .content .list .item .avatar .avatar_img[data-v-cf740e5c]{width:%?72?%;height:%?72?%;border-radius:50%}.invitation_record .content .list .item[data-v-cf740e5c]:last-child{margin-bottom:%?40?%}",""]),t.exports=e},aae4:function(t,e,i){"use strict";i.r(e);var a=i("64f1"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},b5be:function(t,e,i){t.exports=i.p+"static/img/title.34f4bab2.svg"},ed69:function(t,e,i){var a=i("a9ad");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("faeb7004",a,!0,{sourceMap:!1,shadowMode:!1})}}]);