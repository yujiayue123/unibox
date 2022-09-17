<template>
	<view class="box">
		<form action="https://cashier.sandpay.com.cn/gateway/api/order/pay" method="post">
			charset
			<p>
				<input type='text' name='charset' value='utf-8'>
			</p>
			signType
			<p>
				<input type='text' name='signType' value='01'>
			</p>
			data
			<p>
				<input type='text' name='data' value='{
					"head":{"version":"1.0",
					"method":"sandpay.trade.pay",
					"productId":"00000008",
					"accessType":"1",
					"mid":"6888800045451",
					"plMid":"",
					"channelType":"07",
					"reqTime":"20220710173402"},
					
					"body":{"
					orderCode":"B710456423456413",
					"orderTime":"20220710132114",
					"totalAmount":"000000000003",
					"subject":"\u8bdd\u8d39\u5145\u503c",
					
					"body":"\u7528\u6237\u8d2d\u4e70\u8bdd\u8d39",
					"payMode":"sand_h5","clientIp":"58.100.1.249",
					"currencyCode":"156",
					"notifyUrl":"156",
					"frontUrl":"156",
					"txnTimeOut":"20220711132114"}}'>
			</p>
			sign
			<p>
				<input type='text' name='sign'
					value='dfdtdeebJPcnVcE622UuW/Yp2AKSNzAJOL26lB3cekU+F+sBseoiGabpqihdbGZNwkRH/uCQmtGUqgcufkWP8niV2Voq+3Ael9jcZYoVsXNYExgIpMcWHwiQhpjnqj7osrutItyw1Eq0gOw2VodthBxMbWqQie48daghL9jbYuNFKIwL8Hp4sj1+kcYfpFJWcFZbL8NtdnXr0VeHPUlzvQAXxmP8Mg9J7/Vv/3KmH6PDGZDmlolZ3qhFsNT/qn5BtKXfz6/EwVhvOKvcWW+7ikWPLyBdZr/yoiVnroHSHgIrujZFpUva4tMguGjw/pQXAUMwqXkl8sUcliHCvaYc/g=='>
			</p>
			<input type="submit" value="提交">
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true
			}
		},
		onLoad() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.popup_list_box {
		width: 100vw;
		position: fixed;
		left: 0;
		bottom: 0;
		transform: translate3D(0px, 0px, 0px) !important;
	}

	.popup_list {
		padding: 40rpx 0;
		box-sizing: border-box;
		background-color: #fff;
		white-space: nowrap;

		.item {
			display: inline-block;
			width: 240rpx;
			margin-right: 40rpx;

			.item_img {
				width: 240rpx;
				height: 240rpx;
				border-radius: 32rpx;
			}

			.choice {
				width: 100%;
				height: 48rpx;
				line-height: 48rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 16rpx;

				.choice_img {
					width: 40rpx;
					height: 40rpx;
				}

				.choice_name {
					color: #000000;
					font-size: 32rpx;
					margin-left: 20rpx;
				}
			}
		}
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
</style>
