<template>
	<view class="blind_box_open">
		<view class="open_img_box">
			<image src="@/static/ordercheck.svg" class="open_img"></image>
		</view>
		<view class="open_tips">盲盒获得</view>
		<view class="open_img_box">
			<image :src="cover" class="open_cover"></image>
		</view>
		<view class="open_deta">恭喜您获得 “{{name}}”,请到我的盲盒中查看。</view>
		<view class="open_btn">
			<view class="btn" @click="reload">我的盲盒</view>
			<view class="btn" @click="reload">知道了</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			cover: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			}
		},
		methods: {
			close() {
				this.$emit("close");
			},
			reload() {
				this.$emit("reload");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.blind_box_open{
		padding: 40rpx;
		box-sizing: border-box;
		
		.open_img_box {
			width: 100%;
			display: flex;
			justify-content: center;
		
			.open_img {
				width: 84rpx;
				height: 84rpx;
				margin: auto;
			}
		
			.open_cover {
				width: 360rpx;
				height: 360rpx;
				border-radius: 16rpx;
			}
		}
		
		.open_tips {
			text-align: center;
			color: #000000;
			font-size: 48rpx;
			font-weight: 700;
			margin: 40rpx 0;
		}
		
		.open_deta {
			line-height: 40rpx;
			text-align: center;
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			margin: 40rpx 0;
		}
		
		.open_btn {
			display: flex;
			justify-content: space-between;
		
			.btn {
				width: 220rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #00CACE;
				font-size: 28rpx;
				border-radius: 8px;
		
				&:first-child {
					border: 1px solid #00CACE;
				}
		
				&:last-child {
					background: #000000;
					border: 1px solid #000000;
				}
			}
		}
	}
</style>