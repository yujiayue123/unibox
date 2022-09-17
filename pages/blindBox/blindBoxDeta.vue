<template>
	<view class="uni_box blind_box_deta">
		<image :src="cover" mode="widthFix" class="header_img"></image>
		<view class="back_img_box" @click="backTo">
			<image src="@/static/aleft.svg" class="back_img"></image>
		</view>
		<view class="content">
			<view class="title">《{{name}}》</view>
			<view class="number">
				<view>库存:{{stock}}份</view>
				<view>发行量:{{issue}}份</view>
			</view>
			<view class="list">
				<view class="list_title">您可能抽到以下作品中的一个</view>
				<view class="item" v-for="item in list">
					<view class="item_view">
						<view class="name">{{item.name}}</view>
						<view class="rate">概率：{{item.blind_box_chance}}%</view>
					</view>
					<view class="item_view item_right">
						<view class="price">原价：{{item.price}}¥</view>
						<view class="item_img">
							<image src="@/static/grade1.svg" class="grade_img"
								v-if="item.level&&item.level.name=='SSR'">
							</image>
							<image src="@/static/grade2.svg" class="grade_img" v-if="item.level&&item.level.name=='SR'">
							</image>
							<image src="@/static/grade3.svg" class="grade_img" v-if="item.level&&item.level.name=='R'">
							</image>
							<image src="@/static/grade4.svg" class="grade_img" v-if="item.level&&item.level.name=='N'">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="record">
				<view class="header">
					<view>抽取记录</view>
					<view class="router" @click="routerTo(`/pages/blindBox/extractRecords?id=${id}`)">更多抽取记录 ></view>
				</view>
				<view class="item" v-for="item in bList">
					<view class="name">用户{{item.user.nickname}}</view>
					<view class="desc">
						<text>抽到</text>
						<text class="item_number">{{item.product.name}}</text>
					</view>
					<view class="time">{{item.created_at}}</view>
				</view>
			</view>
			<u-parse :html="content" :tag-style="style"></u-parse>
			<u-parse :html="notice" :tag-style="style"></u-parse>
		</view>

		<view class="footer" v-if="status== 0">
			<image src="@/static/subtract.svg" class="footer_img"></image>
			<text class="footer_text">{{time}}</text>
		</view>
		<view class="footer footer_buy" v-else-if="status == 1">
			<view class="price">{{price}}¥/份</view>
			<view class="btn" @click="lockList">立即购买</view>
		</view>
		<!-- <view class="footer footer_buy" v-else-if="status == 1&&lock_time>0">
			<view class="lock_time">{{lock_time}}秒后可购买</view>
		</view>
		<view class="footer footer_buy" v-else-if="status == 1&&lock_time<=0">
			<view class="price">{{price}}/份</view>
			<view class="btn" @click="lockList">立即购买</view>
		</view> -->

		<view class="footer footer_buy" v-else-if="status == 2">
			<view class="price">{{price}}¥/份</view>
			<view class="btn">已结束</view>
		</view>
		<view class="footer footer_buy" v-else-if="status == 3">
			<view class="price">{{price}}¥/份</view>
			<view class="btn">已售罄</view>
		</view>
		<!-- <view class="footer footer_text" v-else-if="status == 2">已结束</view> -->
		<!-- <view class="footer footer_text" v-else-if="status == 3">已售罄</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				list: [],
				cover: '',
				name: '',
				stock: '',
				issue: '',
				price: '',

				content: "",
				notice: "",

				status: null,
				time: "",
				start_date: "",
				timer: null,

				lock_time: 0,
				lookTimer: null,

				bList: [],

				style: {
					img: 'width:max-width:100%;height:auto'
				}
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onUnload() {
			clearTimeout(this.timer)
			clearInterval(this.lookTimer)
		},
		onShow() {
			this.getDeta();
		},
		onHide() {
			clearTimeout(this.timer)
			clearInterval(this.lookTimer)
		},
		methods: {
			backTo(url) {
				uni.navigateBack()
			},
			async getDeta() {
				let {
					lock_time,
					blind_box,
					blind_box_product,
					extract_old,
					setting_buy
				} = await this.$u.api.blindDetails({
					id: this.id
				});

				const data = blind_box;

				this.cover = data.cover;
				this.name = data.name;
				this.stock = data.stock;
				this.issue = data.issue_all;

				this.price = data.price;

				this.content = data.content;
				this.notice = setting_buy?.content;

				this.status = data.status;
				this.start_date = data.start_date;
				this.lock_time = lock_time;

				this.list = blind_box_product;

				this.bList = extract_old;

				this.handerTime();
				this.lockTimeFn();
			},
			lockTimeFn() {
				let time = this.lock_time;
				if (time > 0) {
					this.lookTimer = setInterval(() => {
						this.lock_time--;
						if (this.lock_time < 0) {
							this.status = 1;
							clearInterval(this.lookTimer);
						};
					}, 1000);
				}
			},
			handerTime() {
				let status = this.status;
				if (status == 0) {
					let current = new Date().getTime();

					let date = this.start_date;
					date = new Date(date.replace(/-/g, '/'));
					let time = (new Date(date)).getTime();

					if (current >= time) {
						this.status = 1;
					} else {
						let surplus = time - current;

						let hour = parseInt(surplus / 1000 / 60 / 60);
						hour = hour < 10 ? '0' + hour : hour;

						let mm = parseInt(surplus / 1000 / 60 % 60);
						mm = mm < 10 ? '0' + mm : mm;

						let ss = parseInt(surplus / 1000 % 60);
						ss = ss < 10 ? '0' + ss : ss;
						this.time = `${hour}:${mm}:${ss}`;
					};
					this.timer = setTimeout(this.handerTime, 1000);
				} else {
					clearTimeout(this.timer);
				};
			},
			async lockList() {
				if (this.lock_time > 0) {
					this.$u.toast("上笔订单未支付");
					return
				}
				let {
					id
				} = await this.$u.api.orderPlace({
					id: this.id,
					from: "blindbox"
				});
				let url = `/pages/setting/lockList?type=2&id=${this.id}&orderId=${id}`;
				uni.redirectTo({
					url
				})
			},
			routerTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.blind_box_deta {
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
			border-radius: 32rpx;
			padding: 32rpx;
			padding-bottom: $footHeight;
			box-sizing: border-box;
			background: $baseColor;
			overflow: hidden;

			.title {
				height: 40rpx;
				line-height: 40rpx;
				color: #000000;
				font-size: 40rpx;
			}

			.number {
				color: #333333;
				font-size: 24rpx;
				font-weight: 400;
				margin-top: 16rpx;
				display: flex;

				view {
					margin-right: 20rpx;
				}
			}

			.list {
				margin-top: 40rpx;
				border-top: 1px solid #EEEEEE;
				border-bottom: 1px solid #EEEEEE;
				padding: 40rpx 0;
				box-sizing: border-box;

				.list_title {
					text-align: center;
					color: #000000;
					font-size: 28rpx;
					margin-bottom: 40rpx;
				}

				.item {
					width: 100%;
					height: 60rpx;
					margin-bottom: 24rpx;
					padding: 0 16rpx;
					box-sizing: border-box;
					background: #EEEEEE;
					border-radius: 16rpx;
					display: flex;
					justify-content: space-between;

					.item_view {
						flex: 1;
						padding: 0 10rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;

						&.item_right {
							justify-content: space-between;
						}

						.name {
							flex: 1;
							width: 0;
							color: #000000;
							font-size: 28rpx;
							margin-right: 5rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.rate {
							color: #000000;
							font-size: 24rpx;
							white-space: nowrap;
							// text-overflow: ellipsis;
							// overflow: hidden;
						}

						.price {
							color: #aaaaaa;
							font-size: 28rpx;
						}

						.item_img {
							width: 64rpx;
							height: 28rpx;

							.grade_img {
								width: 64rpx;
								height: 28rpx;
							}
						}
					}
				}
			}

			.record {
				padding: 40rpx 0;
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;

				.header {
					color: #000000;
					font-size: 28rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.router {
						color: #14EAF0;
						font-size: 24rpx;
						font-weight: 400;
					}
				}

				.item {
					margin-top: 40rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.name {
						flex: 3;
						color: #000000;
						font-size: 28rpx;

						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.desc {
						flex: 3;
						color: #000000;
						font-size: 24rpx;
						font-weight: 400;
						display: flex;
						justify-content: center;

						.item_number {
							flex: 1;
							width: 0;
							color: #14EAF0;
							margin-left: 16rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}

					.time {
						// width: 40%;
						flex: 4;
						text-align: center;
						color: #AAAAAA;
						font-size: 24rpx;
						font-weight: 400;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}


			.sub_title {
				height: 108rpx;
				line-height: 108rpx;
				text-align: center;
				color: #000000;
				font-size: 28rpx;
			}

			.sub_img {
				width: 100%;
				height: 750rpx;
			}
		}

		.footer {
			width: 100%;
			height: $footHeight;
			background: rgba(255, 255, 255, 0.9);
			display: flex;
			align-items: center;
			justify-content: center;

			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			&.footer_text {
				color: #333333;
				font-size: 40rpx;
			}

			&.footer_buy {
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					color: #000000;
					font-size: 40rpx;
					font-weight: bold;
				}

				.lock_time {
					width: 100%;
					text-align: center;
					color: #000000;
					font-size: 40rpx;
					font-weight: bold;
				}

				.btn {
					width: 190rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					color: #00CACE;
					font-size: 28rpx;
					border-radius: 16rpx;
					background: #000000;
				}
			}

			.footer_img {
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}

			.footer_text {
				color: #31D3D7;
				font-size: 40rpx;
			}
		}
	}
</style>
