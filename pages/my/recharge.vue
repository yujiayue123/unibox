<template>
	<view class="uni_box recharge">
		<view class="header">充值金额</view>
		<view class="header_input">
			<input type="number" v-model="money" placeholder="请输入要充值的金额">
			<view class="rmb">¥</view>
		</view>
		<view class="list">
			<view class="item" :class="[listIndex==index?'active':'']" v-for="(item,index) in list"
				@click="changeList(index)">
				{{item}}
			</view>
		</view>
		<view class="payment">
			<view class="title">支付方式</view>
			<!-- <view @click="payType=index" v-for="(item,index) in payList" class="item"
				:class="[payType==index?'active':'']">
				<view>{{item}}</view>
				<image src="@/static/checked.svg" class="item_img" v-if="payType==index"></image>
				<image src="@/static/no_checked.svg" class="item_img" v-else></image>
			</view> -->
			<view class="item" :class="[payType==1?'active':'']" @click="payType=1">
				<view>微信支付</view>
				<image src="@/static/checked.svg" class="item_img" v-if="payType==1"></image>
				<image src="@/static/no_checked.svg" class="item_img" v-else></image>
			</view>
			<view class="item" :class="[payType==2?'active':'']" @click="payType=2">
				<view>支付宝支付</view>
				<image src="@/static/checked.svg" class="item_img" v-if="payType==2"></image>
				<image src="@/static/no_checked.svg" class="item_img" v-else></image>
			</view>
		</view>
		<view class="notice">
			<view class="title">充值须知</view>
			<view class="content">{{content}}</view>
		</view>
		<view class="footer">
			<view class="footer_btn" @click="rechargePost">确认充值</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: "",
				list: [],
				listIndex: -1,
				payList: {},
				payType: 1,
				content: "",
				content_three: ""
			}
		},
		onLoad() {
			this.setting();
		},
		methods: {
			async setting() {
				let res = await this.$u.api.setting({
					key: "recharge"
				});
				let data = res.setting;
				this.content = data.content;
				this.content_three = data.content_three;
				this.list = data.recharge_amount;
				this.payList = data.recharge_pay;
			},
			changeList(index) {
				this.listIndex = index;
				this.money = this.list[index];
			},
			async rechargePost() {
				let orderInfo = await this.$u.api.rechargePost({
					money: this.money,
					pay_mode: this.payType
				});
				uni.getProvider({
					service: "payment",
					success: (res) => {
						uni.showModal({
							content: JSON.stringify(res),
							showCancel: false
						})
						if (res.provider.indexOf('alipay') != -1) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: orderInfo,
								success(res) {
									uni.showModal({
										content: "支付成功,原因为: " + res,
										showCancel: false
									})
								},
								fail(err) {
									uni.showModal({
										content: "支付失败,原因为: " + err.errMsg,
										showCancel: false
									})
								}
							})
						}
					}
				})

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
	$footHeight:190rpx;

	.recharge {
		padding: 0 32rpx $footHeight;
		box-sizing: border-box;

		.header {
			padding-top: 40rpx;
			color: #000000;
			font-size: 28rx;
			font-weight: 400;
			margin-bottom: 15rpx;
		}

		.header_input {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 8px;
			border: 1px solid #EEEEEE;
			padding: 0 28rpx;
			box-sizing: border-box;
			display: flex;

			input {
				flex: 1;
				height: 100%;
			}

			.rmb {
				color: #AAAAAA;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.list {
			padding: 40rpx 0;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				width: 210rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 6px;
				border: 1px solid #EEEEEE;
				margin: 10rpx 0;

				&.active {
					color: #00CACE;
					background: #000000;
					border: 1px solid #000000;
				}
			}
		}

		.payment {
			margin-bottom: 40rpx;
			border-radius: 24px;
			padding: 0 32rpx 40rpx 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			.title {
				height: 108rpx;
				line-height: 108rpx;
				text-align: center;
				color: #000000;
				font-size: 28rpx;
			}

			.item {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&.active {
					color: #31D3D7;
				}

				.item_img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.notice {
			width: 100%;
			border-radius: 24px;
			padding: 0 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			.title {
				color: #000000;
				font-size: 28rpx;
				padding: 40rpx 0;
				text-align: center;
			}

			.content {
				line-height: 40rpx;
				color: #333333;
				font-size: 28rpx;
				font-weight: 400;
				padding-bottom: 40rpx;
			}
		}

		.footer {
			width: 100%;
			height: $footHeight;
			padding: 20rpx 32rpx 0 0;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(24rpx);
			display: flex;
			justify-content: flex-end;
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
