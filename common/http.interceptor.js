import {
	baseUrl
} from '@/utils/config.js';

let config = {
	header: {
		'content-type': 'application/json;charset=UTF-8',
	},
	// url: 'http://39.103.190.235/api',
	url: baseUrl,
}
import store from '@/store/index.js'

const install = (Vue, vm) => {

	Vue.prototype.$u.http.setConfig({
		baseUrl: config.url,
		header: {
			'content-type': 'application/json;charset=UTF-8',
			'ApiToken': uni.getStorageSync('token')
		},
	});
	Vue.prototype.$u.http.interceptor.request = (config) => {
		let token = store.state.token;
		config.header.ApiToken = token;
	}
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.code == 0) {
			return res.data;
		} else if (res.code == -999 || res.code == -10) {
			uni.clearStorageSync();
			store.commit('outLogin');
			const msg = res.code == -999 ? "登录过期,请重新登录" : "未登录,请先登录";
			vm.$u.toast(msg);
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}, 1000);
			return false;
		}
		if (res.code == -20) {
			vm.$u.toast(res.msg);
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/setup/realName'
				})
			}, 1000);
			return false;
		} else {
			vm.$u.toast(res.msg);
			return false;
		}
	}
}
export default {
	install
}
