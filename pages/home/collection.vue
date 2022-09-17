<template>
	<view class="uni_box collection">
		<view class="item" v-for="item in list" @click="routerTo(item.id)">
			<image :src="item.cover" class="item_img"></image>
			<view class="item_banner">
				<view class="banner_top">
					<view class="banner_left">{{item.name}}</view>
					<text class="banner_right">奇幻星球</text>
				</view>
				<view class="banner_bottom">
					<view class="item_top">
						<image :src="item.author_head" class="item_top_img"></image>
						<view class="item_top_text">
							<view class="key">奇幻星球制造</view>
							<view class="value">{{item.author}}</view>
						</view>
					</view>
					<view class="item_bottom">
						<view class="item_number">
							<view class="item_price">{{item.price}}¥/份</view>
							<view class="item_limit">限量{{item.issue_all}}份</view>
						</view>
						<view class="item_status_time" v-if="item.status == 0">
							<image src="@/static/h1.svg" class="status_img"></image>
							{{item.timer}}
						</view>
						<text class="item_status_end" v-else-if="item.status == 1">剩余{{item.stock}}份 · 进行中</text>
						<text class="item_status_end" v-else-if="item.status == 2">剩余{{item.stock}}份 · 已结束</text>
						<text class="item_status_end" v-else-if="item.status == 3">已售罄</text>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" :loadText="$store.state.loadText" @loadmore="loadmore" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				last_page: 1,
				limit: 10,
				status: "loadmore",
				timer: null,
			}
		},
		onLoad() {
			this.getList();
		},
		onUnload() {
			clearTimeout(this.timer)
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
						let time = (new Date(date)).getTime();
						if (current >= time) {
							item.status = 1;
						} else {
							let surplus = time - current;
							let hour = parseInt(surplus / 1000 / 60 / 60 % 24);
							hour = hour < 10 ? '0' + hour : hour;

							let mm = parseInt(surplus / 1000 / 60 % 60);
							mm = mm < 10 ? '0' + mm : mm;

							let ss = parseInt(surplus / 1000 % 60);
							ss = ss < 10 ? '0' + ss : ss;
							item.timer = `${hour}:${mm}:${ss}`;
						};
					}
				});
				this.timer = setTimeout(this.handerTime, 1000);
			},
			async getList() {
				let {
					list
				} = await this.$u.api.productList({
					page: this.page,
					limit: this.limit
				});
				this.last_page = list.last_page;

				list = list.list;
				list.forEach(item => {
					item.timer = '';
				})
				this.list = [...this.list, ...list];
				if (this.last_page == this.page) {
					this.status = 'nomore';
				}
				clearTimeout(this.timer);
				this.handerTime();
			},
			loadmore() {
				this.getList();
			},
			triggerPage() {
				let page = this.page;
				let last_page = this.last_page;
				if (page < last_page) {
					this.page++;
					this.getList();
				}
			},
			routerTo(id) {
				let url = `/pages/home/collectionDeta?id=${id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collection {
		padding: 32rpx;
		box-sizing: border-box;

		.item {
			width: 100%;
			height: 690rpx;
			margin-bottom: 30rpx;
			border-radius: 48rpx;
			background: #C4C4C4;
			overflow: hidden;
			position: relative;

			.item_img {
				width: 100%;
				height: 100%;
			}

			.item_banner {
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;

				.banner_top {
					width: 100%;
					margin-bottom: 32rpx;
					padding: 0 32rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;

					.banner_left {
						color: #FFFFFF;
						font-size: 40rpx;
					}

					.banner_right {
						color: #333333;
						font-size: 24rpx;
						border-radius: 8rpx;
						padding: 8rpx 12rpx;
						background: linear-gradient(90deg, #02CACE 0%, #8FFDFF 100%);
					}
				}

				.banner_bottom {
					width: 100%;
					border-bottom-left-radius: 48rpx;
					border-bottom-right-radius: 48rpx;
					padding: 32rpx;
					box-sizing: border-box;
					background: linear-gradient(136deg, #17171B 0%, rgba(23, 23, 27, 0) 100%);
					// background: linear-gradient(135.96deg, rgba(23, 23, 27, 0.5) 12.7%, rgba(23, 23, 27, 5e-05) 120.11%);
					// backdrop-filter: blur(21.7463px);

					.item_top {
						height: 60rpx;
						margin-bottom: 36rpx;
						display: flex;
						align-items: center;

						.item_top_img {
							width: 56rpx;
							height: 56rpx;
							margin-right: 16rpx;
						}

						.item_top_text {
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							.key {
								color: #FFFFFF;
								font-size: 28rpx;
							}

							.value {
								color: #FFFFFF;
								font-size: 24rpx;
								font-weight: 400;
							}
						}
					}

					.item_bottom {
						display: flex;
						justify-content: space-between;

						.item_number {
							height: 60rpx;
							line-height: 60rpx;
							display: flex;

							.item_price {
								color: #FFFFFF;
								font-size: 40rpx;
								font-weight: bold;
								margin-right: 20rpx;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}

							.item_limit {
								// width: 120rpx;
								color: #FFFFFF;
								font-size: 24rpx;
								font-weight: 400;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
						}

						.item_status_time {
							height: 64rpx;
							// width: 220rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 28rpx;
							border-radius: 16rpx;
							padding: 0 20rpx;
							background: #000000;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							display: flex;
							align-items: center;
							

							.status_img {
								width: 28rpx;
								height: 28rpx;
								margin-right: 10rpx;
							}
						}

						.item_status_end {
							// width: 220rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 28rpx;
							border-radius: 16rpx;
							padding: 16rpx 20rpx;
							
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							background: #333333;
						}
					}
				}
			}
		}
	}
</style>
