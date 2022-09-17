<template>
	<view class="uni_box blindBox">
		<view class="heade_swiper">
			<u-swiper :list="swiperList" height="280"></u-swiper>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" @click.prevent="routerTo(item.id)">
				<image :src="item.cover" class="item_img"></image>
				<view class="item_banner">
					<view class="item_top">
						<view class="item_top_name">《{{item.name}}》</view>
						<view class="item_top_number">每人限购{{item.quota}}份</view>
					</view>
					<view class="item_bottom">
						<view class="item_number">
							<view class="item_price">{{item.price}}¥</view>
							<view class="item_limit">发行量{{item.issue_all}}份</view>
						</view>
						<view class="item_status item_status_time" v-if="item.status == 0">
							<image src="@/static/h1.svg" class="status_img"></image>
							{{item.timer}}
						</view>
						<text class="item_status conduct" v-else-if="item.status == 1">剩余{{item.stock}}份 · 进行中</text>
						<text class="item_status conduct" v-else-if="item.status == 2">剩余{{item.stock}}份 · 已结束</text>
						<text class="item_status conduct" v-else-if="item.status == 3">剩余{{item.stock}}份 · 已售罄</text>
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
				swiperList: [],
				list: [],
				page: 1,
				last_page: 1,
				limit: 10,
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
				} = await this.$u.api.blindboxList({
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
			// 跳转
			routerTo(id) {
				let url = `/pages/blindBox/blindBoxDeta?id=${id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.blindBox {
		.heade_swiper {
			width: 100%;
			height: 280rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
		}

		.list {
			padding: 30rpx 30rpx $tabBarHeight;
			box-sizing: border-box;

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
