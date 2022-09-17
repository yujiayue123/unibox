<template>
	<view class="uni_box lock_list">
		<image :src="cover" mode="widthFix" class="header_img"></image>
		<view class="money">
			<view>订单金额</view>
			<view>{{price}}¥</view>
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
			<view @click="cancelPayment" v-if="status==0">取消订单</view>
			<view @click="routerTo" v-else>前往个人中心</view>
		</view>
	</view>
</template>

<script>
	import {
		paymentCallback
	} from '@/utils/config.js';
	export default {
		data() {
			return {
				id: null,
				orderId: null,
				type: null,
				state: true,

				cover: '',
				name: '',
				price: '',

				payList: [],
				active: 1,
				pay_password: '',

				productShow: false,
				blindBoxShow: false,

				status: 0,
				statusText: '',

				end_pay_time: 0,
				time: '00:00:00',
				timer: null
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.orderId = option.orderId;
			this.id = option.id;
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		onShow() {
			this.getProductInfo();
		},
		onHide() {
			clearTimeout(this.timer)
		},
		methods: {
			backTo(url) {
				uni.navigateBack()
			},
			async getProductInfo() {
				let {
					order,
					order_pay
				} = await this.$u.api.orderInfo({
					id: this.orderId
				});
				const data = this.type == 1 ? order.product : order.blindbox;
				this.cover = data.cover;
				this.name = data.name;
				this.price = data.price;
				this.end_pay_time = order.end_pay_time;
				this.status = order.pay_status;
				this.statusText = order.pay_status_name;

				this.payList = order_pay;

				if (this.status == 0) { //0未支付 显示倒计时
					this.handerTime();
				}
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
					this.getProductInfo();
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
			changeActive(value) {
				this.active = value;
				this.pay_password = "";
			},
			async submitPayment() {
				let type = this.type;
				clearTimeout(this.timer);
				const front_url = paymentCallback;
				// const front_url =
				// `${paymentCallback}?type=${type}&id=${this.id}&orderId=${this.orderId}`; //支付成功要跳转的页面,由后台跳转
				if (this.active == 1) {
					let {
						pay_data
					} = await this.$u.api.orderPayment({
						id: this.orderId,
						pay_mode: this.active,
						front_url: front_url
					});
					const data = JSON.parse(pay_data);
					let from = data.form;
					from = from.replace('<form', '<form style="opacity:0"');
					document.querySelector('body').innerHTML = from;
					document.forms[0].submit();
				}
				if (this.active == 2) {
					let {
						pay_data
					} = await this.$u.api.orderPayment({
						id: this.orderId,
						pay_mode: this.active,
						front_url: front_url
					});
					let data = JSON.parse(pay_data);
					data = JSON.parse(data.json);
					let from = data.data.body.credential;
					from = from.replace('<form', '<form style="opacity:0"');
					document.querySelector('body').innerHTML = from;
					document.forms[0].submit();
				}
				if (this.active == 3) {
					await this.$u.api.orderPayment({
						id: this.orderId,
						pay_mode: this.active,
						pay_password: this.pay_password,
					});
					let url = `/pages/setting/orderDeta?type=${type}&id=${this.id}&orderId=${this.orderId}&isBack=1`
					uni.navigateTo({
						url
					})
				};
			},
			open() {
				let id = this.id;
				this.blindBoxShow = false;
				uni.switchTab({
					url: "/pages/tabbar/my"
				});
			},
			blindBoxClose() {
				this.blindBoxShow = false;
				uni.switchTab({
					url: "/pages/tabbar/home"
				});
			},
			async cancelPayment() {
				if (this.status != 0) {
					this.$u.toast("该订单已完成,无法取消");
					return;
				}
				let res = await this.$u.api.orderCancel({
					id: this.orderId
				});

				this.$u.toast("取消订单成功");
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			},
			routerTo() {
				uni.switchTab({
					url: '/pages/tabbar/my'
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	$footHeight:200rpx;

	.lock_list {
		padding-bottom: $footHeight;
		box-sizing: border-box;
		position: relative;

		.header_img {
			width: 100%;
		}

		.money {
			width: 100%;
			padding: 0 32rpx;
			display: flex;
			justify-content: space-between;

			view {
				height: 80rpx;
				line-height: 80rpx;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.payment {
			margin-bottom: 40rpx;
			border-radius: 24px;
			padding: 0 32rpx 40rpx 32rpx;
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
