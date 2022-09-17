<template>
	<view class="collectionDeta">
		<image :src="cover" class="header_img"></image>
		<image src="@/static/aleft.svg" class="back_img" @click="backTo"></image>
		<view class="content">
			<view class="content_box">
				<view class="title">奇幻数藏</view>
				<view class="list">
					<view class="item">
						<view class="key">{{author}}</view>
						<view class="value">创作者</view>
					</view>
					<view class="item">
						<view class="key">用户xx</view>
						<view class="value">拥有者</view>
					</view>
					<view class="item">
						<view class="key">{{author}}</view>
						<view class="value">编号</view>
					</view>
				</view>
				<view class="copy">
					<text class="copy_title">Token</text>
					<view class="copy_text">0xsdfdsfgrg12239da30Jgrg12sdsfgrg12239</view>
					<image src="@/static/my3.svg" class="copy_img"></image>
				</view>
				<view class="sub_title">藏品介绍</view>
				<image :src="item" v-for="item in rotation" class="sub_img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: "",
				author: "",
				rotation: []
			}
		},
		async onLoad(option) {
			let {
				order
			} = await this.$u.api.orderInfo({
				id: option.id
			});
			let data = order.product;
			this.cover = data.cover;
			this.author = data.author;
			this.rotation = data.rotation;
		},
		methods: {
			backTo(url) {
				uni.navigateBack()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.collectionDeta {
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		background: #F7F8FA;
		position: relative;

		.header_img {
			width: 100%;
			height: 750rpx;
		}

		.back_img {
			width: 48rpx;
			height: 48rpx;
			position: absolute;
			left: 32rpx;
			top: 104rpx;
		}

		.content {
			width: 100%;
			border-radius: 32rpx;
			background: #F7F8FA;
			padding: 32rpx;
			box-sizing: border-box;
			overflow: hidden;
			position: absolute;
			left: 0;
			top: 680rpx;
			z-index: 2;

			.title {
				color: #000000;
				font-size: 40rpx;
				margin-bottom: 40rpx;
			}

			.list {
				display: flex;
				justify-content: space-between;

				.item {
					text-align: center;

					.key {
						color: #000000;
						font-size: 28rpx;
					}

					.value {
						color: #333333;
						font-size: 24rpx;
						font-weight: 400;
						margin-top: 8rpx;
					}
				}
			}

			.copy {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				margin: 32rpx 0;
				padding: 0 16rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.copy_title {
					color: #000000;
					font-size: 28rpx;
				}

				.copy_text {
					flex: 1;
					width: 0;
					color: #AAAAAA;
					font-size: 28rpx;
					font-weight: 400;
					padding: 0 32rpx;
					box-sizing: border-box;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.copy_img {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.sub_title {
				height: 108rpx;
				line-height: 108rpx;
				text-align: center;
				color: #000000;
				font-size: 28rpx;
				border-top: 1px solid #EEEEEE;
			}

			.sub_img {
				width: 100%;
				height: 750rpx;
			}
		}
	}
</style>
