<template>
	<view class="uni_box security">
		<view class="list">
			<view class="item" @click="routerTo('/pages/login/setPassword')">
				<view>修改登录密码</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/login/setLock')">
				<view>修改交易密码</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
			<view class="item" @click="routerTo('/pages/login/bank')">
				<view>绑定银行卡</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			routerTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.security {
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
	}
</style>
