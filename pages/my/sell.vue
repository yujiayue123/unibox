<template>
	<view class="uni_box sell">
		<view class="title">
			<image :src="cover" class="header_img"></image>
			<view class="deta">
				<view class="name">{{name}}</view>
				<view v-if="number">编号:{{number}}</view>
			</view>
		</view>
		<view class="title">设置价格</view>
		<view class="header_input">
			<input type="number" placeholder="请输入要转售的单价" v-model="price" @input="inputChange">
			<view class="rmb">¥</view>
		</view>
		<view class="explain">
			<view class="item">
				<view>支付通道服务费{{payment_channel}}%</view>
				<view>{{payment_channel_number}} ¥</view>
			</view>
			<view class="item">
				<view>平台综合服务费{{platform_service}}%</view>
				<view>{{platform_service_number}} ¥</view>
			</view>
			<view class="item">
				<view>作者版权费{{author_copyright}}%</view>
				<view>{{author_copyright_number}} ¥</view>
			</view>
			<view class="item">
				<view>预计可获得</view>
				<view>{{balance_number}} ¥</view>
			</view>
		</view>
		<view class="password">请输入支付密码</view>
		<input type="text" password placeholder="------" v-model="pay_password" class="password_input">
		<view class="footer">
			<view class="footer_btn" @click="orderSell">确认转售</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				cover: '',
				name: '',
				number: '',

				payment_channel: 0,
				payment_channel_number: 0,

				platform_service: 0,
				platform_service_number: 0,

				author_copyright: 0,
				author_copyright_number: 0,

				balance_number: 0,

				price: '',
				pay_password: ''
			}
		},
		onLoad: async function(option) {
			this.id = option.id;
			// 获取商品详情
			let {
				order
			} = await this.$u.api.orderInfo({
				id: option.id
			});
			let data;
			if (option.type == 1) {
				data = order.product;
			}
			if (option.type == 2) {
				data = order.blindbox;
			}
			this.cover = data.cover;
			this.name = data.name;
			this.number = order.product_number?.number;
			// 获取此页面基础信息
			this.setting();
		},
		methods: {
			async setting() {
				let {
					setting
				} = await this.$u.api.setting({
					key: "order"
				});
				this.payment_channel = setting.payment_channel;
				this.platform_service = setting.platform_service;
				this.author_copyright = setting.author_copyright;
			},
			inputChange(e) {
				let val = Number(e.target.value);
				let payment = this.payment_channel_number = (val * this.payment_channel / 100).toFixed(4);
				let service = this.platform_service_number = (val * this.platform_service / 100).toFixed(4);
				let author = this.author_copyright_number = (val * this.author_copyright / 100).toFixed(4);
				this.balance_number = val - payment - service - author;
			},
			async orderSell() {
				let res = await this.$u.api.orderSell({
					id: this.id,
					price: this.price,
					pay_password: this.pay_password
				});

				this.$u.toast("操作成功");

				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.sell {
		width: 100vw;
		// min-height: 100vh;
		padding: 0 32rpx $footHeight;
		box-sizing: border-box;
		background: $baseColor;

		.title {
			display: flex;
			padding: 20rpx 8rpx;
			box-sizing: border-box;

			.header_img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 6px;
			}

			.deta {
				color: #14EAF0;
				font-size: 24rpx;
				font-weight: bold;
				margin-left: 32rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					color: #000000;
					font-size: 40rpx;
				}
			}
		}

		.title {
			color: #000000;
			font-size: 28rpx;
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

		.explain {
			padding: 20rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid #EEEEEE;

			.item {
				height: 80rpx;
				line-height: 80rpx;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				display: flex;
				justify-content: space-between;
				margin: 20rpx 0;
			}
		}

		.password {
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			margin-top: 40rpx;
			margin-bottom: 15rpx;
		}

		.password_input {
			width: 100%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: 16rpx;
			border: 1px solid #EEEEEE;
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
