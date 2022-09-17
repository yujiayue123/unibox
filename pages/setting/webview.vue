<template>
	<view>
		<web-view ref="webview" :src="src"></web-view>
	</view>
</template>

<script>
	import {
		formal,
		webview
	} from '@/utils/config.js';
	export default {
		data() {
			return {
				src: ""
			}
		},
		onLoad(option) {
			let token = uni.getStorageSync('token');
			this.src =
				`${webview}?id=${option.id}&pay_mode=${option.pay_mode}&token=${token}&formal=${formal}`;
		}
	}
</script>

<style>
</style>
