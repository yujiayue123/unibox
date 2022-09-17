<template>
	<view class="uni_box buyCollection">
		<image :src="cover" mode="widthFix" class="header_img"></image>
		<view class="explain">
			<view class="item">
				<view>{{nameKey}}</view>
				<view>{{name}}</view>
			</view>
			<view class="item">
				<view>转让价</view>
				<view>{{price}} ¥</view>
			</view>

			<view class="item">
				<view>购买技术服务费</view>
				<view>0.00 ¥</view>
			</view>
			<view class="item">
				<view>应付金额</view>
				<view>0.00 ¥</view>
			</view>
			<view class="item_desc">
				<image src="@/static/wancheng.svg" class="item_img" v-if="checked" @click="checked=!checked"></image>
				<image src="@/static/no_checked.svg" class="item_img" v-else @click="checked=!checked"></image>
				<view>我已同意并遵守平台</view>
				<view class="desc" @click="routerTo('/pages/setting/article?key=buy')">《商品购买和转售须知》</view>
			</view>
		</view>
		<view class="payment">
			<view class="title">支付方式</view>
			<view class="item" v-for="(item,index) in payList" :class="[active==index?'active':'']"
				@click="changeActive(index)">
				<view>{{item}}</view>
				<image src="@/static/checked.svg" class="item_img" v-if="active==index"></image>
				<image src="@/static/no_checked.svg" class="item_img" v-else></image>
			</view>
			<view v-if="active==3">
				<view class="password">请输入支付密码</view>
				<input type="text" password placeholder="------" v-model="pay_password" class="password_input">
			</view>
		</view>

		<view class="footer">
			<view @click="submitPayment" v-if="status==0">确认支付({{time}})</view>
			<view v-else>{{statusText}}</view>
			<view @click="cancelPayment">取消订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: null,

				checked: false,
				nameKey: '',
				number: 1,
				cover: '',
				name: '',
				price: '',

				id: null,
				payList: [],
				active: 1,
				pay_password: '',

				status: 0,
				statusText: '',

				end_pay_time: 0,
				time: '00:00:00',
				timer: null
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.id = option.id;

			let title = option.type == 1 ? "购买藏品" : "购买盲盒";
			this.nameKey = option.type == 1 ? "藏品名称" : "盲盒名称";
			uni.setNavigationBarTitle({
				title
			})
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		onShow() {
			this.orderInfo();
		},
		onHide() {
			clearTimeout(this.timer)
		},
		methods: {
			backTo(url) {
				uni.navigateBack()
			},
			handerTime() {
				let date = this.end_pay_time;
				if (date == 0) {
					return
				} else {
					this.timer = setTimeout(this.handerTime, 1000);
				};
				let status = this.status;
				let current = parseInt(new Date().getTime() / 1000);
				if (current >= date) {
					clearTimeout(this.timer);
					this.orderInfo();
				} else {
					let surplus = date - current;
					let hour = parseInt(surplus / 60 / 60 % 24);
					hour = hour < 10 ? '0' + hour : hour;

					let mm = parseInt(surplus / 60 % 60);
					mm = mm < 10 ? '0' + mm : mm;

					let ss = parseInt(surplus % 60);
					ss = ss < 10 ? '0' + ss : ss;
					this.time = `${hour}:${mm}:${ss}`;
				};
			},
			async orderInfo() {
				let {
					order,
					order_pay
				} = await this.$u.api.orderInfo({
					id: this.id
				});
				const data = this.type == 1 ? order.product : order.blindbox;
				this.cover = data.cover;
				this.name = data.name;
				this.price = data.price;
				this.status = order.pay_status;
				this.statusText = order.pay_status_name;

				this.payList = order_pay;

				if (this.status == 0) { //0未支付 显示倒计时
					this.handerTime();
				}
			},
			changeActive(val) {
				this.active = val;
				this.pay_password = "";
			},
			async submitPayment() {
				if (!this.checked) {
					this.$u.toast("请先阅读《商品购买和转售须知》");
					return false;
				}
				let res = await this.$u.api.orderSellBuy({
					id: this.id,
					pay_mode: this.active,
					pay_password: this.pay_password
				});
				clearTimeout(this.timer);
				this.getProductInfo();
			},
			async cancelPayment() {
				if (this.status != 0) {
					this.$u.toast("该订单已完成,无法取消");
					return;
				}
				let res = await this.$u.api.orderSellCancel({
					id: this.id
				});

				this.$u.toast("取消订单成功");
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
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
	$footHeight:200rpx;

	.buyCollection {
		padding-bottom: $footHeight;
		box-sizing: border-box;
		position: relative;

		.header_img {
			width: 100%;
		}

		// .header {
		// 	display: flex;
		// 	padding: 40rpx 8rpx;
		// 	box-sizing: border-box;

		// 	.header_img {
		// 		width: 120rpx;
		// 		height: 120rpx;
		// 		border-radius: 6px;
		// 	}

		// 	.deta {
		// 		margin-left: 32rpx;
		// 		color: #14EAF0;
		// 		font-size: 24rpx;
		// 		font-weight: bold;
		// 		display: flex;
		// 		flex-direction: column;
		// 		justify-content: space-between;

		// 		.name {
		// 			color: #000000;
		// 			font-size: 40rpx;
		// 		}
		// 	}
		// }

		.number_box {
			width: 100%;
			height: 80rpx;
			text-align: center;
			border-radius: 16rpx;
			border: 1px solid #EEEEEE;
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.number_img {
				width: 48rpx;
				height: 48rpx;
			}

			.number_input {
				flex: 1;
				text-align: center;
			}
		}

		.explain {
			padding: 40rpx 32rpx;
			box-sizing: border-box;

			.item {
				height: 80rpx;
				line-height: 80rpx;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 0;
			}

			.item_desc {
				height: 80rpx;
				line-height: 80rpx;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				display: flex;
				align-items: center;
				margin: 20rpx 0;

				.item_img {
					width: 48rpx;
					height: 48rpx;
					margin-right: 24rpx;
				}

				.desc {
					color: #14EAF0;
				}
			}
		}

		.payment {
			margin-bottom: 40rpx;
			border-radius: 24px;
			padding: 0 32rpx 40rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			.title {
				height: 80rpx;
				line-height: 80rpx;
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
			padding: 10rpx 32rpx;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(24rpx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			view {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #00CACE;
				font-size: 14px;
				border-radius: 8px;
				background: #000000;
			}
		}
	}
</style>
