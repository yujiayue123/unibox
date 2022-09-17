<template>
	<view class="uni_box order_deta">
		<u-navbar back-icon-name="arrow-left" :is-back="isBack" title-color="#142E50" :border-bottom="false"
			title="订单详情"></u-navbar>
		<view class="header">
			<view class="title">{{title}}转入成功</view>
			<view class="desc">{{title}}已转入您的个人中心，请查看。</view>
		</view>
		<view class="data">
			<image :src="cover" class="data_img"></image>
			<view class="content">
				<view class="name">{{name}}</view>
				<view class="value" v-if="product_number">
					编号:#{{product_number.number}}<text>/{{issue_all}}</text>
				</view>
				<view v-else>编号：生成中</view>
			</view>
		</view>
		<view class="deta_order">
			<view class="title">订单详情</view>
			<view class="money">订单金额：¥{{price}}</view>
			<view class="copy">
				<text class="copy_title">订单编号：</text>
				<view class="copy_text">{{order_no}}</view>
				<image src="@/static/my3.svg" class="copy_img" @click="setClipboardData"></image>
			</view>
		</view>
		<view class="time_line">
			<view class="title">订单详情</view>
			<u-time-line>
				<u-time-line-item>
					<template v-slot:content>
						<view class="success">支付成功，{{title}}转入中</view>
					</template>
				</u-time-line-item>
				<u-time-line-item>
					<template v-slot:content>
						<view class="time">{{title}}转入成功（{{time}}）</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		<view class="btn">
			<view @click="purchase">继续购买</view>
			<view @click="routerTo">个人中心</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBack: false,

				title: "",
				type: "",
				orderId: null,
				id: null,

				cover: "",
				name: "",
				price: "",
				order_no: "",
				product_number: null,
				issue_all: "",
				time: ""
			}
		},
		onLoad(option) {
			console.log(option)
			this.type = option.type;
			this.title = option.type == 1 ? "藏品" : "盲盒";
			this.orderId = option.orderId;
			this.id = option.id;
			this.isBack = option.isBack ? true : false;
			this.getDeta();
		},
		methods: {
			async getDeta() {
				let {
					order
				} = await this.$u.api.orderInfo({
					id: this.orderId
				});
				const data = this.type == 1 ? order.product : order.blindbox;
				this.cover = data.cover;
				this.name = data.name;
				this.price = data.price;
				this.order_no = order.order_no;
				this.issue_all = data.issue_all;
				this.product_number = order.product_number;
				this.time = order.created_at;
			},
			purchase() {
				let id = this.id;
				let url = `/pages/blindBox/blindBoxDeta?id=${id}`;
				let type = this.type;
				if (type == 1) {
					url = `/pages/home/collectionDeta?id=${id}`;
				}
				uni.redirectTo({
					url
				})
			},
			routerTo() {
				uni.switchTab({
					url: "/pages/tabbar/my"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.order_deta {
		.header {
			width: 100%;
			padding: 40rpx 32rpx;
			box-sizing: border-box;
			background: #000000;

			.title {
				color: #FFFFFF;
				font-size: 40rpx;
				margin-bottom: 16rpx;
			}

			.desc {
				color: #FFFFFF;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.data {
			width: 100%;
			margin: 40rpx 0;
			padding: 0 32rpx;
			box-sizing: border-box;
			display: flex;

			.data_img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
				margin-right: 12rpx;
			}

			.content {
				flex: 1;
				width: 0;
				height: 120rpx;
				line-height: 60rpx;

				.name {

					color: #000000;
					font-size: 40rpx;
				}

				.value {
					color: #000000;
					font-size: 24rpx;

					text {
						color: #AAAAAA;
					}
				}
			}
		}

		.deta_order {
			padding: 0 32rpx;
			box-sizing: border-box;

			.title {
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				margin: 20rpx 0;
			}

			.money {
				color: #AAAAAA;
				font-size: 24rpx;
				font-weight: 400;
				margin: 20rpx 0;
			}

			.copy {
				width: 100%;
				height: 48rpx;
				line-height: 48rpx;
				margin: 20rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.copy_title {
					color: #AAAAAA;
					font-size: 24rpx;
				}

				.copy_text {
					flex: 1;
					width: 0;
					color: #AAAAAA;
					font-size: 24rpx;
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

		.time_line {
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;

			.title {
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				margin: 20rpx 0;
			}

			.success {
				color: #AAAAAA;
				font-size: 24rpx;
				font-weight: 400;
			}

			.time {
				color: #000000;
				font-size: 24rpx;
				font-weight: 400;
			}
		}

		.btn {
			width: 100%;
			margin-top: 20rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;

			view {
				width: 210rpx;
				height: 80rpx;
				color: #00CACE;
				font-size: 28rpx;
				border-radius: 16rpx;
				margin: 0 20rpx;
				border: 1px solid #00CACE;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;

				&:first-child {
					background: #000000;
					border: 1px solid #000000;
				}
			}
		}
	}
</style>
