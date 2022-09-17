import App from './App'

import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/index.js'
Vue.config.productionTip = false
App.mpType = 'app'

import uView from 'uview'
Vue.use(uView);

const app = new Vue({
	store,
	...App
})
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)
Vue.use(Vuex, app);
app.$mount()
