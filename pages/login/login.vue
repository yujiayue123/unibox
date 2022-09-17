<template>
	<view class="uni_box login">
		<view class="title">账号</view>
		<input placeholder="请输入注册时的手机号码" v-model="phone" class="input">
		<view class="title">密码</view>
		<input placeholder="请输入密码" password v-model="password" class="input">
		<view class="more">
			<view @click="routerTo('/pages/login/forget')">忘记密码</view>
			<view @click="routerTo('/pages/login/register')">没有账号？去注册</view>
		</view>
		<view class="foot_btn" @click="loginPassword">登录</view>
		<view class="item_desc">
			<div style="padding-top: 1rem;" @click="checkedChange()">
				<image src="@/static/wancheng.svg" class="item_img" v-if="checked"></image>
				
				<image src="@/static/no_checked.svg" class="item_img" v-else></image>
			</div>
			
			<view>
				我已阅读并同意
				<text @click="routerTo('/pages/setting/article?key=register')">《用户协议》</text>和
				<text @click="routerTo('/pages/setting/article?key=clause')">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				phone: '',
				password: ''
			}
		},
		onShow() {
			// 能进入这个页面就证明未登录,清除登录信息
			// this.$store.commit('outLogin');
		},
		methods: {
			checkedChange(){
				this.checked = !this.checked;
				console.log(this.checked);
			},
			async loginPassword() {
				if (!this.checked) {
					this.$u.toast("请先阅读《用户协议》和《隐私政策》");
					return false;
				}
				let res = await this.$u.api.loginPassword({
					phone: this.phone,
					password: this.password
				});
				this.$store.commit('changeLogin', res);
				this.$store.commit('changeToken', res);

				this.$u.toast("登录成功");
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/tabbar/my"
					});
				}, 1000);
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
	.login {
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

		.more {
			height: 80rpx;
			line-height: 80rpx;
			color: #2B4F61;
			font-size: 28rpx;
			font-weight: 400;
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
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
