<template>
	<view class="uni_box give">
		<view class="header">
			<image :src="cover" class="header_img"></image>
			<view class="deta">
				<view class="name">{{name}}</view>
				<view v-if="number">编号:{{number}}</view>
			</view>
		</view>
		<view class="title">转赠好友</view>
		<input type="number" placeholder="请输入好友手机号" v-model="phone" class="phone">
		<view class="title">交易密码</view>
		<input type="number" password placeholder="------" v-model="pay_password" class="phone">
		<view class="estimate">
			<view>预计消耗GAS费</view>
			<view>{{gas}} ¥</view>
		</view>
		<view class="notice">
			<view class="title">转赠须知</view>
			<u-parse :html="content" :tag-style="style"></u-parse>
		</view>
		<view class="footer">
			<view class="footer_btn" @click="orderTurn">确认转赠</view>
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
				phone: '',
				pay_password: '',
				gas: 0.00,
				content: "",
				style: {
					img: 'width:max-width:100%;height:auto'
				}
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
					key: "turn"
				});
				const data = setting;
				this.gas = data.gas;
				this.content = data?.content;
			},
			async orderTurn() {
				let res = await this.$u.api.orderTurn({
					id: this.id,
					phone: this.phone,
					pay_password: this.pay_password
				});
				this.$u.toast("操作成功");
				// setTimeout(() => {
				// 	uni.navigateBack();
				// }, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	$titleHeight: 60rpx;
	$footHeight:120rpx;

	.give {
		width: 100vw;
		padding: 0 32rpx $footHeight;
		box-sizing: border-box;
		background: $baseColor;
		position: relative;

		.header {
			display: flex;
			padding: 40rpx 8rpx;
			box-sizing: border-box;

			.header_img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 6px;
			}

			.deta {
				margin-left: 32rpx;
				color: #14EAF0;
				font-size: 24rpx;
				font-weight: bold;
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

		.phone {
			width: 100%;
			height: 80rpx;
			text-indent: 28rpx;
			border-radius: 8px;
			margin-bottom: 15rpx;
			border: 1px solid #EEEEEE;
		}

		.estimate {
			height: 160rpx;
			line-height: 160rpx;
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			display: flex;
			justify-content: space-between;
		}

		.notice {
			width: 100%;
			border-radius: 24px;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			.title {
				color: #000000;
				font-size: 28rpx;
				padding: 40rpx 0;
				text-align: center;
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
			position: absolute;
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
