import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/*#ifdef APP-PLUS*/
const h5NavHeight = 44;
/*#endif*/
/*#ifdef H5*/
const h5NavHeight = 0;
/*#endif*/

// let info = uni.getStorageSync('info');
// let token = uni.getStorageSync('token');

const store = new Vuex.Store({
	state: {
		// isLogin: false,
		// token: uni.getStorageSync('token') || null,
		token: uni.getStorageSync('token') || "",
		info: uni.getStorageSync('info') || {
			head_portrait: "",
			nickname: "",
			balance: 0.00,
			address: "",
			invitation_code: ""
		},
		loadText: {
			loadmore: '点击或上拉加载更多',
			loading: '努力加载中',
			nomore: '没有更多了'
		},
		h5NavHeight: h5NavHeight
	},
	mutations: {
		changeLogin(state, payload) {
			state.info = payload.data;
			console.log(payload.data);
			uni.setStorageSync('info', payload.data);
		},
		changeToken(state, payload) {
			state.token = payload.token;
			uni.setStorageSync('token', payload.token);
		},
		changeNickname(state, payload) {
			state.info.nickname = payload.nickname;
			state.info.head_portrait = payload.head_portrait ? payload.head_portrait : state.info.head_portrait;
			uni.setStorageSync('info', state.info);
		},
		outLogin(state, payload) {
			state.token = null;
			state.info = {
				head_portrait: "",
				nickname: "",
				balance: 0.00,
				address: "",
				invitation_code: ""
			};
			uni.removeStorageSync("info");
			uni.removeStorageSync("token");
		}
	}
})

export default store
