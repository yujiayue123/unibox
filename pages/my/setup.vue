<template>
	<view class="uni_box setup">
		<view class="list">
			<!-- <view class="item" @click="routerTo('../setup/setupCollection')">
				<view>转赠</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('../setup/exchange')">
				<view>兑换码</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view> -->
			<view class="item" @click="routerTo('/pages/login/nickname')">
				<view>个人信息</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/setup/realName')">
				<view>实名认证</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/setup/ranking')">
				<view>排行榜</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/setup/address')">
				<view>添加收货地址</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/setup/security')">
				<view>安全中心</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/setup/help')">
				<view>帮助中心</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/setup/about')">
				<view>关于我们</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
		</view>
		<view class="outLogin" @click="signout">退出登录</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: 99
			}
		},
		methods: {
			async signout() {
				let res = await this.$u.api.signout();
				this.$u.toast("已退出登录");

				this.$store.commit('outLogin');

				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}, 1000);
			},
			routerTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.setup {
		padding: 0 40rpx;
		box-sizing: border-box;

		.list {
			.item {
				height: 110rpx;
				line-height: 110rpx;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: 400;
				font-size: 28rpx;
				color: #000516;

				.item_img {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.outLogin {
			text-align: center;
			font-weight: 400;
			font-size: 28rpx;
			color: #EA3953;
			margin-top: 200rpx;
		}
	}
</style>
