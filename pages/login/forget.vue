<template>
	<view class="uni_box forget">
		<view class="title">手机号码</view>
		<input placeholder="请输入您的手机号码" v-model="phone" class="input">
		<view class="title">验证码</view>
		<view class="send_box">
			<input placeholder="请输入您收到的验证码" v-model="code" class="code_input">
			<view class="code" v-if="isTimer">{{time}}s</view>
			<view class="code" v-else @click="getSms">发送验证码</view>
		</view>
		<view class="title">新密码</view>
		<input placeholder="请输入新密码" password v-model="password" class="input">
		<view class="title">再次输入</view>
		<input placeholder="请再次输入密码" password v-model="confirm_password" class="input">
		<view class="foot_btn" @click="findPassword">提交</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				password: '',
				confirm_password: '',

				timer: null,
				time: 60,
				isTimer: false
			}
		},
		onUnload() {
			clearTimeout(this.timer);
		},
		methods: {
			async getSms() {
				let phone = this.phone;
				if (!phone) {
					this.$refs.uToast.show({
						title: "请输入您的手机号码",
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
					scene: "find_password"
				});
			},
			async findPassword() {
				let res = await this.$u.api.findPassword({
					phone: this.phone,
					code: this.code,
					password: this.password,
					confirm_password: this.confirm_password
				});
				clearTimeout(this.timer);

				this.$u.toast("密码找回成功");

				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}, 1000);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.forget {
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
