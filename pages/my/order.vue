<template>
	<view class="uni_box order">
		<view class="title">
			<view class="item" :class="[active==2?'active':'']" @click="changeActive(2)">全部</view>
			<view class="item" :class="[active==0?'active':'']" @click="changeActive(0)">进行中</view>
			<view class="item" :class="[active==1?'active':'']" @click="changeActive(1)">已完成</view>
		</view>
		<view class="list">
			<view class="item" @click="purchase(item)" v-for="(item,index) in list">
				<image class="item_img" v-if="item.product" :src="item.product.cover"></image>
				<image class="item_img" v-else :src="item.blindbox.cover"></image>
				<view class="desc">
					<view class="name">
						<view>
							{{item.type_name}}
							<text v-if="item.product">{{item.product.name}}</text>
							<text v-else>{{item.blindbox.name}}</text>
							<text v-if="item.product_number">#{{item.product_number.number}}</text>
						</view>
						<image class="item_img" src="@/static/right.svg"
							v-if="item.pay_status==1&&showList.includes(item.type)">
						</image>
					</view>
					<view class="status" v-if="item.pay_status==1&&showList.includes(item.type)">已支付</view>
					<view class="status cancel" v-if="item.pay_status==2&&showList.includes(item.type)">已取消</view>
					<view class="status_text" v-if="item.type==3||item.type==10">
						{{item.remarks}}<text v-if="item.product_number">#{{item.product_number.number}}</text>
					</view>
					<view class="time">
						<view class="text">{{item.created_at}}</view>
						<view class="btn">
							<view class="payment_btn" v-if="item.status==0&&item.pay_status==0"
								@click.stop="lockList(item)">
								立即支付
							</view>
							<view class="cancel_btn" v-if="item.status==0" @click.stop="cancelPayment(item)">取消订单</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :loadText="$store.state.loadText" @loadmore="loadmore" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 2,

				list: [],
				showList: [1, 2],

				type: 1,
				title: "",
				typeList: [],
				typeObj: {},
				page: 1,
				limit: 10,
				last_page: 1,
				status: "loadmore"
			}
		},
		onShow() {
			this.getList();
		},
		onHide() {
			this.list = [];
			this.page = 1;
			this.last_page = 1;
			this.status = 'loadmore';
		},
		onReachBottom: function() {
			this.triggerPage();
		},
		methods: {
			async getList() {
				let data = {
					page: this.page,
					limit: this.limit
				};
				data.pay_status = this.active != 2 ? this.active : "";
				let {
					list
				} = await this.$u.api.order(data);
				this.last_page = list.last_page;

				list = list.list;
				this.list = this.page == 1 ? list : [...this.list, ...list];

				if (this.last_page == this.page) {
					this.status = 'nomore';
				}
			},
			loadmore() {
				this.triggerPage();
			},
			triggerPage() {
				let page = this.page;
				let last_page = this.last_page;
				if (page < last_page) {
					this.page++;
					this.getList();
				}
			},
			changeActive(value) {
				this.active = value;
				this.list = [];
				this.page = 1;
				this.last_page = 1;
				this.status = "loadmore";
				this.getList();
			},
			purchase(item) {
				// if (item.type != 1 && item.type != 2) return
				if (item.type != 1 && item.type != 2 || (item.status != 1 && item.pay_status != 1)) return
				let type = 2;
				let id = item.blind_box_id;
				let orderId = item.id;
				if (item.product) {
					id = item.product_id;
					type = 1;
				};
				let url = `/pages/setting/orderDeta?type=${type}&id=${id}&orderId=${orderId}&isBack=1`;
				uni.navigateTo({
					url
				})
			},
			lockList(item) {
				if (item.status == 0 && item.pay_status == 0) {
					let orderId = item.id;
					let type = item.product ? 1 : 2;
					let data = item.product ? item.product : item.blindbox;
					let id = data.id;
					let url = `/pages/setting/lockList?type=${type}&id=${id}&orderId=${orderId}`;
					uni.navigateTo({
						url
					})
				}
			},
			async cancelPayment(item) {
				let orderId = item.id;
				let res = await this.$u.api.orderCancel({
					id: orderId
				});
				this.$u.toast("取消订单成功");
				setTimeout(() => {
					this.list = [];
					this.page = 1;
					this.last_page = 1;
					this.status = 'loadmore';
					this.getList();
				}, 1000);
			},
		}
	};
</script>
<style lang="scss" scoped>
	$titleHeight:64rpx;

	.order {
		padding: $titleHeight 0;

		.title {
			width: 100%;
			height: $titleHeight;
			line-height: $titleHeight;
			display: flex;
			justify-content: space-between;

			position: fixed;
			left: 0;
			top: $navHeight;
			z-index: 999;
			background: $baseColor;

			.item {
				flex: 1;
				text-align: center;
				color: #000000;
				font-size: 24rpx;
				font-weight: 400;

				&.active {
					color: #14EAF0;
				}
			}
		}

		.list {
			padding: 30rpx 30rpx 0;
			box-sizing: border-box;
			overflow: hidden;

			.item {
				display: flex;
				height: 120rpx;
				margin-bottom: 40rpx;

				.item_img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 12rpx;
				}

				.desc {
					flex: 1;
					width: 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30rpx;
					box-sizing: border-box;

					.name {
						height: 40rpx;
						line-height: 40rpx;
						font-size: 30rpx;
						color: #000000;
						display: flex;
						justify-content: space-between;
						align-items: center;

						image {
							width: 48rpx;
							height: 48rpx;
						}
					}

					.status {
						width: 120rpx;
						// width: auto;
						height: 40rpx;
						border-radius: 10rpx;
						color: #00CACE;
						font-size: 20rpx;
						border: 1px solid #00CACE;
						display: flex;
						justify-content: center;
						align-items: center;

						&.cancel {
							color: #f00;
							border: 1px solid #f00;
						}
					}

					.status_text {
						width: 100%;
						height: 40rpx;
						color: #00CACE;
						font-size: 20rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.time {
						height: 40rpx;
						line-height: 40rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.text {
							color: #333333;
							font-size: 24rpx;
							font-weight: 400;
						}

						.btn {
							display: flex;
							justify-content: flex-end;

							view {
								width: 120rpx;
								height: 40rpx;
								color: #00CACE;
								font-size: 20rpx;
								font-weight: 500;
								border-radius: 10rpx;
								margin-right: 5rpx;
								box-sizing: content-box;
								display: flex;
								justify-content: center;
								align-items: center;
							}

							.payment_btn {
								border: 1px solid #00CACE;
							}

							.cancel_btn {
								background: #000000;
								border: 1px solid #000000;
							}
						}
					}
				}
			}
		}
	}
</style>
