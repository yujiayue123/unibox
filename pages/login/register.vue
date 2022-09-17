<template>
	<view class="uni_box register">
		<view class="title">手机号码</view>
		<input placeholder="请输入您的手机号码" v-model="phone" class="input">
		<view class="title">验证码</view>
		<view class="send_box">
			<input placeholder="请输入您收到的验证码" v-model="code" class="code_input">
			<view class="code" v-if="isTimer">{{time}}s</view>
			<view class="code" v-else @click="getSms">发送验证码</view>
		</view>
		<view class="title">邀请码</view>
		<input placeholder="请输入您的邀请码" v-model="invitation_code" class="input">
		<view class="foot_btn" @click="register">注册</view>
		<view class="item_desc">
			<div style="padding-top:1rem ;" @click="checked=!checked">
				<image src="@/static/wancheng.svg" class="item_img" v-if="checked"></image>
				<image src="@/static/no_checked.svg" class="item_img" v-else></image>
			</div>
			<view>
				我已阅读并同意
				<text @click="routerTo('/pages/setting/article?key=register')">《用户协议》</text>和
				<text @click="routerTo('/pages/setting/article?key=clause')">《隐私政策》</text>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				phone: '',
				code: '',
				invitation_code: '',
				timer: null,
				time: 60,
				isTimer: false
			}
		},
		onLoad(option) {
			this.invitation_code = option.code ? option.code : "";
		},
		onUnload() {
			clearTimeout(this.timer);
		},
		methods: {
			async getSms() {
				if (!this.checked) {
					this.$u.toast("请先阅读《用户协议》和《隐私政策》");
					return false;
				}
				let phone = this.phone;
				if (!phone) {
					this.$refs.uToast.show({
						title: "请输入手机号码",
						type: "error"
					})
					return
				};
				this.isTimer = true;
				this.timer = setInterval(() => {
					this.time--
					if (this.time < 0) {
						this.isTimer = false;
						this.time = 60;
						clearInterval(this.timer);
					};
				}, 1000);
				let res = await this.$u.api.smsSend({
					phone: this.phone,
					scene: "register"
				});
			},
			async register() {
				if (!this.checked) {
					this.$u.toast("请先阅读《用户协议》和《隐私政策》");
					return false;
				}
				let res = await this.$u.api.loginCode({
					phone: this.phone,
					code: this.code,
					invitation_code: this.invitation_code
				});
				this.$u.toast("注册成功");
				let step = res.data.register_step;
				if (step == 0) {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/my'
						})
					}, 1000);
				}
				if (step == 1) {
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/login/setPassword?is=1'
						})
					}, 1000);
				}
				if (step == 2) {
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/login/setLock?is=1'
						})
					}, 1000);
				}

				clearTimeout(this.timer);
				this.$store.commit('changeLogin', res);
				this.$store.commit('changeToken', res);
			},
			routerTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.register {
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

		.send_box {
			height: 80rpx;
			border: 1px solid #EEEEEE;
			padding: 0 28rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.code_input {
				flex: 1;
			}

			.code {
				width: 140rpx;
				text-align: center;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				border-bottom: 1px solid #000;
			}
		}

		.input {
			width: 100%;
			height: 80rpx;
			text-indent: 28rpx;
			border-radius: 8px;
			border: 1px solid #EEEEEE;
		}

		.item_desc {
			height: 80rpx;
			line-height: 80rpx;
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			display: flex;
			align-items: center;
			margin: 20rpx 0;

			.item_img {
				width: 48rpx;
				height: 48rpx;
				margin-right: 24rpx;
			}

			text {
				color: #14EAF0;
			}
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
