<template>
	<view class="uni_box collectionDeta">
		<image :src="cover" mode="widthFix" class="header_img"></image>
		<view class="back_img_box" @click="backTo">
			<image src="@/static/aleft.svg" class="back_img"></image>
		</view>
		<view class="content">
			<view class="deta">
				<view class="title">《{{name}}》</view>
				<!-- <view class="code">编号:{{code}}/{{issue_all}}</view> -->
				<view class="name">
					<text class="key">编号</text>
					<text>{{code}}/{{issue_all}}</text>
				</view>
				<view class="name">
					<text class="key">拥有者</text>
					<text>{{nickname}}</text>
				</view>
			</view>
			<view class="copy" v-if="avata">
				<text class="copy_title">Token</text>
				<view class="copy_text">{{avata.class_id}}</view>
				<image src="@/static/my3.svg" class="copy_img" @click="setClipboardData(avata.class_id)"></image>
			</view>
			<u-parse :html="content" :tag-style="style"></u-parse>
			<u-parse :html="notice" :tag-style="style"></u-parse>
		</view>
		<!-- 	<view class="footer">
			<view class="footer_btn" v-if="active==1" @click="routerTo(`/pages/my/sell?type=1&id=${id}`)">出售</view>
			<view class="footer_btn" v-if="active==1" @click="routerTo(`/pages/my/give?type=1&id=${id}`)">转赠</view>
			<view class="footer_btn" v-if="active==11" @click="modalShow=true">取消出售</view>
		</view> -->

		<u-modal v-model="modalShow" :show-title="false" :show-confirm-button="false" :show-cancel-button="false">
			<view class="modal">
				<image :src="cover" class="modal_img"></image>
				<view class="modal_tips">您确认要停止售卖并下架以下商品吗？</view>
				<view class="modal_btn">
					<view class="btn" @click="modalShow=false">我再想想</view>
					<view class="btn" @click="orderSellCancel">确定下架</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				type: null,
				cover: "",
				name: "",
				code: "",
				issue_all: "",
				nickname: "",
				avata: null,
				content: "",
				notice: "",
				modalShow: false,
				style: {
					img: 'width:max-width:100%;height:auto'
				}
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.type = option.type;
		},
		onShow() {
			this.getDeta();
		},
		methods: {
			backTo(url) {
				uni.navigateBack()
			},
			async getDeta() {
				let {
					order,
					avata,
					setting_buy
				} = await this.$u.api.orderInfo({
					id: this.id
				});
				this.avata = avata;
				const data = this.type == 1 ? order.product : order.blindbox;
				this.cover = data.cover;
				this.name = data.name;
				this.code = order.product_number?.number;
				this.issue_all = data.issue_all;
				this.nickname = order.user.nickname;

				this.content = data?.content;
				this.notice = setting_buy?.content;
			},
			setClipboardData(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						console.log('success');
					}
				});
			},
			async orderSellCancel() {
				let res = await this.$u.api.orderSellCancel({
					id: this.id
				});
				this.$u.toast("操作成功");
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
	$footHeight:120rpx;

	.collectionDeta {
		position: relative;

		.header_img {
			width: 100%;
		}

		.back_img_box {
			width: 100rpx;
			height: 100rpx;
			padding-left: 32rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: absolute;
			left: 0rpx;
			top: 78rpx;

			.back_img {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.content {
			width: 100%;
			padding: 32rpx;
			padding-bottom: $footHeight;
			box-sizing: border-box;
			background: $baseColor;
			overflow: hidden;

			.deta {
				width: 100%;
				box-sizing: border-box;
				overflow: hidden;

				.title {
					color: #000000;
					font-size: 40rpx;
					font-weight: 500;
					font-style: normal;
					font-family: 'Source Han Sans CN';
				}

				.name {
					height: 80rpx;
					line-height: 80rpx;
					color: #333333;
					font-size: 24rpx;
					font-weight: 400;
					font-style: normal;
					font-family: 'Source Han Sans CN';
					display: flex;

					text {
						color: #000000;
						font-size: 28rpx;
						font-weight: 500;
						margin-left: 24rpx;
					}

					.key {
						width: 90rpx;
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
				margin: 0 20rpx;
				background: #000000;
			}
		}

		.modal {
			padding: 80rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;


			.modal_img {
				width: 360rpx;
				height: 360rpx;
				margin: 0 auto;
			}

			.modal_tips {
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				text-align: center;
				margin: 40rpx 0;
			}

			.modal_btn {
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
	}
</style>
