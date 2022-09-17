<template>
	<view class="uni_box setPassword">
		<view class="title" v-if="!is">旧密码</view>
		<input placeholder="请输入旧密码,首次设置则无需输入" password v-model="old_password" v-if="!is" class="input">
		<view class="title">密码</view>
		<input placeholder="请输入密码" password v-model="password" class="input">
		<view class="title">再次输入</view>
		<input placeholder="请再次输入密码" password v-model="confirm_password" class="input">
		<view class="foot_btn" @click="setPassword">设置</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is: false,
				old_password: '',
				password: '',
				confirm_password: ''
			}
		},
		onLoad(option) {
			this.is = option.is;
		},
		methods: {
			async setPassword() {
				let res = await this.$u.api.setPassword({
					old_password: this.old_password,
					password: this.password,
					confirm_password: this.confirm_password
				});
				this.$u.toast("登录密码设置成功");

				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/setLock?is=1'
					})
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.setPassword {
		padding: 0 32rpx;
		box-sizing: border-box;
		overflow: hidden;

		.title {
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			margin-top: 40rpx;
			margin-bottom: 15rpx;
		}

		.input {
			width: 100%;
			height: 80rpx;
			text-indent: 28rpx;
			border-radius: 8px;
			border: 1px solid #EEEEEE;
		}

		.foot_btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #00CACE;
			font-size: 28rpx;
			background: #000000;
			border-radius: 16rpx;
			margin-top: 40rpx;
		}
	}
</style>
