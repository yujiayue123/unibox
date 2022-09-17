<template>
	<view class="uni_box home">
		<view class="logo_img">
			<image src="@/static/logo.png"></image>
		</view>
		<view class="heade_swiper">
			<u-swiper :list="swiperList" height="280" @click="swiperClick"></u-swiper>
		</view>
		<!-- 选项卡 -->
		<view class="option">
			<view class="item" :class="{ active: active == 0 }" @click="changActive(0)">数字藏品</view>
			<view class="item" :class="{ active: active == 1 }" @click="changActive(1)">发售日历</view>
			<view class="item notice" :class="{ active: active == 2 }" @click="goNotice(2)">
				<text>公告中心</text>
				<!-- <view class="number">11</view> -->
			</view>
		</view>
		<!-- 发售日历 -->
		<view class="list">
			<view class="sale_list" v-if="active == 1">
				<view class="item" v-for="(item,index) in list"
					@click="routerTo(`/pages/home/collectionDeta?id=${item.id}`)">
					<view class="sale_equity">
						<image :src="item.cover" class="sale_img"></image>
						<view class="sale_text" v-if="item.equity_name">{{item.equity_name}}</view>
					</view>
					<view class="sale_right">
						<view class="sale_date">预售日期：{{item.start_date}}</view>
						<view class="sale_make">
							《{{item.name}}》
							<text class="sale_make_number">发行量{{item.issue_all}}份</text>
						</view>
						<view class="sale_price">
							<text class="sale_price_text">¥{{item.price}}/份</text>
							<view class="active" v-if="item.status == 1">立即购买</view>
							<view class="sale_buy" v-else-if="item.status == 2">已结束</view>
							<view class="sale_buy" v-else-if="item.status == 3">已售罄</view>
						</view>
					</view>
				</view>
			</view>

			<view class="collection" v-if="active == 0">
				<view class="item" v-for="(item,index) in list"
					@click.prevent="routerTo(`/pages/home/collectionDeta?id=${item.id}`)">
					<image :src="item.cover" class="item_img"></image>
					<view class="item_banner">
						<view class="item_top">
							<view class="item_top_name">《{{item.name}}》</view>
							<view class="item_top_number">每人限购{{item.quota}}份</view>
						</view>
						<view class="item_series">{{item.series.name}}</view>
						<view class="item_bottom">
							<view class="item_number">
								<view class="item_price">{{item.price}}¥</view>
								<view class="item_limit">发行量{{item.issue_all}}份</view>
							</view>
							<view class="item_status item_status_time" v-if="item.status == 0">
								<image src="@/static/h1.svg" class="status_img"></image>
								{{item.timer}}
							</view>
							<text class="item_status conduct" v-else-if="item.status == 1">
								剩余{{item.stock}}份 ·进行中
							</text>
							<text class="item_status conduct" v-else-if="item.status == 2">
								剩余{{item.stock}}份 ·已结束
							</text>
							<text class="item_status conduct" v-else-if="item.status == 3">
								剩余{{item.stock}}份 ·已售罄
							</text>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" :loadText="$store.state.loadText" @loadmore="loadmore" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				active: 0,
				list: [],
				page: 1,
				limit: 10,
				last_page: 1,
				status: 'loadmore',
				timer: null
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
			clearInterval(this.timer);
		},
		onUnload() {
			clearInterval(this.timer)
		},
		onReachBottom: function() {
			this.triggerPage();
		},
		methods: {
			handerTime() {
				let list = this.list;
				let current = new Date().getTime();
				list.forEach(item => {
					if (item.status == 0) {
						let date = item.start_date;
						date = new Date(date.replace(/-/g, '/'));
						let time = (new Date(date)).getTime();
						if (current >= time) {
							item.status = 1;
						} else {
							let surplus = time - current;
							let hour = parseInt(surplus / 1000 / 60 / 60);
							hour = hour < 10 ? '0' + hour : hour;

							let mm = parseInt(surplus / 1000 / 60 % 60);
							mm = mm < 10 ? '0' + mm : mm;

							let ss = parseInt(surplus / 1000 % 60);
							ss = ss < 10 ? '0' + ss : ss;
							item.timer = `${hour}:${mm}:${ss}`;
						};
					}
				});
			},
			async getList() {
				let {
					list,
					position
				} = await this.$u.api.productList({
					calendar: this.active,
					page: this.page,
					limit: this.limit
				});
				this.last_page = list.last_page;
				list = list.list;
				list.forEach(item => {
					item.timer = '';
				})
				this.list = this.page == 1 ? list : [...this.list, ...list];
				if (this.last_page == this.page) {
					this.status = 'nomore';
				}
				clearInterval(this.timer);
				this.handerTime();
				this.timer = setInterval(this.handerTime, 1000);

				position.forEach(item => {
					item.image = item.img;
				});
				this.swiperList = position;
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
			changActive(value) {
				this.active = value;
				this.list = [];
				this.page = 1;
				this.last_page = 1;
				this.status = "loadmore";
				this.getList();
			},
			goNotice() {
				uni.navigateTo({
					url: '/pages/home/notice'
				})
			},
			swiperClick(index) {
				let dataItem = this.swiperList[index];
				let jump = dataItem.jump;
				if (jump == 1) {
					let url = '/pages/home/noticeDeta?id=' + dataItem.news_id;
					this.routerTo(url);
				}
				if (jump == 2) {
					let url = '/pages/home/invitation';
					this.routerTo(url);
				}
			},
			routerTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.logo_img {
			width: 100%;
			height: 90rpx;
			padding-left: 250rpx;
			box-sizing: border-box;

			image {
				width: 250rpx;
				height: 80rpx;
			}
		}

		.heade_swiper {
			width: 100%;
			height: 280rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
		}

		.notice {
			padding: 45rpx 0;
			background: $baseColor;
			display: flex;

			.estoppel {
				width: 100%;
				display: flex;
				align-items: center;
				flex-direction: column;

				image {
					width: 86rpx;
					height: 86rpx;
					margin-bottom: 25rpx;
				}

				text {
					height: 42rpx;
					line-height: 42rpx;
					color: #333333;
					font-size: 28rpx;
				}
			}
		}

		.option {
			margin: 20rpx 0;
			display: flex;
			justify-content: center;

			.item {
				color: #333333;
				font-size: 32rpx;
				font-weight: 400;
				margin: 0 20rpx;
				padding: 8rpx 0;
			}

			.notice {
				position: relative;

				.number {
					min-width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					color: #fff;
					font-size: 14rpx;
					border-radius: 50%;
					background-color: #f00;
					position: absolute;
					right: 0;
					top: 0;
					transform: translate(50%, -50%);
				}
			}

			.active {
				font-weight: 500;
				border-bottom: 2px solid #14EAF0;
			}
		}

		.list {
			width: 100%;
			padding: 0 32rpx $tabBarHeight;
			box-sizing: border-box;
		}

		.sale_list {
			.item {
				width: 100%;
				border-radius: 32rpx;
				margin-bottom: 32rpx;
				border: 1px solid #EEEEEE;
				padding: 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				display: flex;
				align-items: center;

				.sale_equity {
					width: 144rpx;
					height: 144rpx;
					border-radius: 16rpx;
					overflow: hidden;
					position: relative;

					.sale_img {
						width: 100%;
						height: 100%;
					}

					.sale_text {
						width: 100%;
						height: 48rpx;
						line-height: 48rpx;
						text-align: center;
						color: #000000;
						font-size: 20rpx;
						background: rgba(255, 255, 255, 0.5);
						position: absolute;
						left: 0;
						bottom: 0;
					}
				}

				.sale_right {
					flex: 1;
					width: 0;
					height: 144rpx;
					margin-left: 24rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.sale_date {
						color: #333333;
						font-size: 28rpx;
						font-weight: 400;
					}

					.sale_make {
						color: #666666;
						font-size: 24rpx;
						font-weight: 400;

						.sale_make_number {
							margin-left: 24rpx;
						}
					}

					.sale_price {
						display: flex;
						justify-content: space-between;

						.sale_price_text {
							color: #333333;
							font-size: 40rpx;
							font-weight: 800;
						}

						.sale_buy {
							width: 144rpx;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							color: #999999;
							font-size: 28rpx;
							background: #EEEEEE;
							border-radius: 16rpx;
						}

						.active {
							width: 144rpx;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							color: #00CACE;
							font-size: 28rpx;
							background: #000000;
							border-radius: 16rpx;
						}
					}
				}
			}
		}

		.collection {
			.item {
				width: 100%;
				height: 690rpx;
				border-radius: 48rpx;
				margin-bottom: 30rpx;
				background: #C4C4C4;
				overflow: hidden;
				position: relative;

				.item_img {
					width: 100%;
					height: 100%;
				}

				.item_banner {
					width: 100%;
					border-bottom-left-radius: 48rpx;
					border-bottom-right-radius: 48rpx;
					padding: 32rpx;
					box-sizing: border-box;
					background: linear-gradient(136deg, #17171B 0%, rgba(23, 23, 27, 0) 100%);
					position: absolute;
					left: 0;
					bottom: 0;

					.item_top {
						display: flex;
						justify-content: space-between;

						.item_top_name {
							color: #FFFFFF;
							font-size: 40rpx;
						}

						.item_top_number {
							color: #FFFFFF;
							font-size: 24rpx;
							font-weight: 400;
						}
					}

					.item_series {
						color: #FFFFFF;
						font-size: 24rpx;
						font-weight: 400;
						margin: 10rpx 0;
					}

					.item_bottom {
						display: flex;
						justify-content: space-between;

						.item_number {
							display: flex;
							align-items: center;

							.item_price {
								color: #FFFFFF;
								font-size: 40rpx;
								font-weight: bold;
								margin-right: 20rpx;
							}

							.item_limit {
								color: #FFFFFF;
								font-size: 24rpx;
								font-weight: 400;
							}
						}

						.item_status {
							height: 64rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 28rpx;
							border-radius: 16rpx;
							padding: 0rpx 20rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							display: flex;
							align-items: center;

							&.item_status_time {
								background: #000000;

								.status_img {
									width: 28rpx;
									height: 28rpx;
									margin-right: 10rpx;
								}
							}

							&.conduct {
								background: #000000;
							}

							&.end {
								background: #333333;
							}
						}
					}
				}
			}
		}
	}
</style>
