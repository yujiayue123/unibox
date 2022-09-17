<template>
	<view class="uni_box realName">
		<view class="already" v-if="isShow">
			<view class="content">
				<image src="@/static/realName.svg" class="already_img"></image>
				<view class="already_text">已认证</view>
			</view>
		</view>
		<view class="title">姓名</view>
		<input type="text" placeholder="请输入您的姓名" v-model="name" class="input">
		<view class="title">身份证</view>
		<input type="text" placeholder="请输入您的身份证" v-model="id_card" class="input">
		<view class="title">手机号</view>
		<input type="text" placeholder="请输入您的手机号" v-model="phone" class="input">
		<view class="desc">购买前请完成实名认证,实名认证完成后,您的提现账户</view>
		<view class="desc">将与此实名信息进行绑定,请知晓!</view>
		<view class="footer" v-if="!isShow">
			<view class="footer_btn" @click="realnamePost">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				id_card: "",
				phone: "",
				isShow: false
			}
		},
		onLoad() {
			this.realname();
		},
		methods: {
			async realname() {
				let {
					realname
				} = await this.$u.api.realname();
				console.log(realname)
				this.name = realname?.name;
				this.id_card = realname?.id_card;
				this.phone = realname?.phone;
				this.isShow = realname ? true : false;
			},
			async realnamePost() {
				let res = await this.$u.api.realnamePost({
					name: this.name,
					id_card: this.id_card,
					phone: this.phone
				});

				this.$u.toast("实名认证成功");
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/tabbar/my'
					})
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	$titleHeight: 40rpx;
	$footHeight:120rpx;

	.realName {
		padding: $titleHeight 40rpx $footHeight;
		box-sizing: border-box;

		.already {
			display: flex;
			justify-content: center;

			.content {
				height: 80rpx;
				border-radius: 16rpx;
				padding: 0 24rpx;
				background: #13E9EF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.already_img {
				width: 48rpx;
				height: 48rpx;
				margin-right: 8rpx;
			}

			.already_text {
				color: #FFFFFF;
				font-size: 28rpx;
				font-weight: 400;
				font-style: normal;
				font-family: 'Source Han Sans CN';
			}
		}

		.title {
			font-weight: 400;
			font-size: 28rpx;
			color: #000000;
			margin-bottom: 16rpx;
		}

		.input {
			width: 100%;
			height: 80rpx;
			padding: 0 25rpx;
			box-sizing: border-box;
			border: 1px solid #EEEEEE;
			border-radius: 16rpx;
			margin-bottom: 40rpx;
		}

		.desc {
			color: #000000;
			font-size: 24rpx;
			line-height: 32rpx;
			text-align: center;
		}

		.footer {
			width: 100%;
			height: $footHeight;
			padding: 0rpx 32rpx;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(24rpx);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			.footer_btn {
				width: 184rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #00CACE;
				font-size: 28rpx;
				border-radius: 16rpx;
				background: #000000;
			}
		}
	}
</style>
