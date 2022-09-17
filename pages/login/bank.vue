<template>
	<view class="uni_box bank">
		<input type="text" placeholder="未进行实名认证" disabled v-model="name" class="bank_input">
		<input type="text" placeholder="请输入开户行名称" v-model="bank_name" class="bank_input">
		<input type="number" placeholder="请输入卡号" v-model="number" class="bank_input">
		<view class="footer">
			<view class="footer_btn" @click="bankPost">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				bank_name: "",
				number: ""
			}
		},
		onLoad() {
			this.realname();
		},
		methods: {
			async realname() {
				let {
					realname
				} = await this.$u.api.realname();
				this.name = realname?.name;
				let {
					bank
				} = await this.$u.api.bank();
				this.number = bank?.number;
				this.bank_name = bank?.bank_name;
			},
			async bankPost() {
				let res = await this.$u.api.bankPost({
					number: this.number,
					bank_name: this.bank_name
				});
				this.$u.toast("绑定银行卡成功");

				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.bank {
		padding: 0 32rpx $footHeight;
		box-sizing: border-box;
		overflow: hidden;

		.bank_title {
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			padding-top: 40rpx;
			margin-bottom: 15rpx;
		}

		.bank_input {
			width: 100%;
			height: 80rpx;
			text-align: center;
			border-radius: 8px;
			border: 1px solid #EEEEEE;
			margin-top: 20rpx;
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
