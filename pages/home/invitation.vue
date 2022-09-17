<template>
	<view class="invitation" :style="style">
		<!-- <view class="invitation"> -->
		<view class="record" @click="routerTo">邀请记录</view>
		<view class="qrcode">
			<qrcode ref="qrcode" canvas-id="qrcode" :value="text" :size="size"
				:options="{ margin: 10, background: { color: '#fff' }, foreground: { color: '#333' } }"></qrcode>
		</view>
		<view class="footer">
			<view class="copy">
				<text class="copy_title">邀请链接</text>
				<view class="copy_text">{{text}}</view>
				<image src="@/static/my3.svg" class="copy_img" @click="setClipboardData"></image>
			</view>
		</view>
		<!-- <view class="save" @click="save">
			保存二维码
			<image src="@/static/download.svg" class="save_img"></image>
		</view> -->
	</view>
</template>

<script>
	import {
		qrCodeUrl
	} from '@/utils/config.js';
	export default {
		data() {
			return {
				text: '1',
				size: 130,
				style: {},
				background: ''
			};
		},
		async onLoad() {
			console.log(qrCodeUrl)
			let {
				setting
			} = await this.$u.api.setting({
				key: "default"
			});
			this.size = uni.upx2px(240);
			this.style = {
				'background': 'url(' + setting.invite_cover + ')',
				'background-repeat': 'no-repeat',
				'background-size': '100% 100%'
			};
			this.invitation_code = this.$store.state.info.invitation_code;
			this.text = `${qrCodeUrl}?code=${this.invitation_code}`;
		},
		methods: {
			setClipboardData() {
				uni.setClipboardData({
					data: this.text,
					success: function() {
						console.log('success');
					}
				});
			},
			save() {
				uni.showLoading({
					title: '保存中',
					mask: true
				});
				const ref = this.$refs['qrcode'];
				if (Array.isArray(ref)) {
					ref[0].save({
						success: res => {
							uni.hideLoading();
							uni.showToast({
								icon: 'success',
								title: '保存成功'
							});
						},
						fail: err => {
							uni.showToast({
								icon: 'none',
								title: JSON.stringify(err)
							});
						}
					});
				} else {
					ref.save({
						success: res => {
							uni.hideLoading();
							uni.showToast({
								icon: 'success',
								title: '保存成功'
							});
						},
						fail: err => {
							uni.showToast({
								icon: 'none',
								title: JSON.stringify(err)
							});
						}
					});
				}
			},
			routerTo() {
				uni.navigateTo({
					url: '/pages/home/invitationRecord'
				})
			}
		}
	}
</script>
！
<style lang="scss" scoped>
	.invitation {
		width: 100vw;
		min-height: 100%;
		// background: url('@/static/a_1.svg') no-repeat;
		background-size: 100% 100%;
		position: relative;

		.record {
			color: #000000;
			font-size: 14px;
			font-weight: 500;
			font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			position: absolute;
			right: 32rpx;
			top: 40rpx;
		}

		.qrcode {
			width: 260rpx;
			height: 260rpx;
			padding: 10rpx;
			box-sizing: border-box;
			background: #31D3D7;
			border-radius: 12rpx;
			position: absolute;
			right: 32rpx;
			bottom: 100rpx;
			// left: 50%;
			// top: 50%;
			// transform: translate(-50%, -50%);
		}

		.footer {
			width: 100%;
			padding: 0 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			position: absolute;
			left: 0rpx;
			bottom: 10rpx;
			z-index: 2;

			.copy {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 8rpx;
				padding: 0 16rpx;
				box-sizing: border-box;
				background: #EEEEEE;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.copy_title {
					color: #000000;
					font-size: 28rpx;
					font-weight: 500;
					font-family: Source Han Sans CN-Medium, Source Han Sans CN;
				}

				.copy_text {
					flex: 1;
					width: 0;
					padding: 0 32rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #AAAAAA;
					font-weight: 400;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.copy_img {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.save {
			width: 480rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #00CACE;
			font-size: 28rpx;
			font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			font-weight: 500;
			border-radius: 8rpx;
			border: 1px solid #00CACE;
			padding: 0 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;

			.save_img {
				width: 32rpx;
				height: 32rpx;
				margin-left: 10rpx;
			}
		}
	}
</style>
