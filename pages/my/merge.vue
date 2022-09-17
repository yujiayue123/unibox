<template>
	<view class="uni_box merge">
		<view class="heade_swiper">
			<u-swiper :list="swiperList" height="280"></u-swiper>
		</view>
		<view class="list">
			<view class="item" v-for="item in list">
				<image :src="item.cover" class="item_img"></image>
				<view class="desc">
					<view class="title">
						<view>{{item.name}}</view>
						<view class="state noStart" v-if="item.status==0">未开始</view>
						<view class="state conduct" v-else-if="item.status==1" @click="routerTo(item.id)">进行中</view>
						<view class="state end" v-else>已结束</view>
					</view>
					<view class="time">
						<view>{{item.start_date}}</view>
						<image src="@/static/next.svg" class="time_img"></image>
						<view>{{item.end_date}}</view>
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
				status: "loadmore"
			}
		},
		onLoad() {
			this.getList();
		},
		onReachBottom: function() {
			this.triggerPage();
		},
		methods: {
			async getList() {
				let {
					list,
					position
				} = await this.$u.api.compose({
					page: this.page,
					limit: this.limit
				});
				this.list = [...this.list, ...list.list];
				this.last_page = list.last_page;
				if (this.last_page == this.page) {
					this.status = 'nomore';
				}
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
			routerTo(id) {
				let url = `../my/mergeCore?id=${id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$titleHeight: 312rpx;
	.merge {
		.head_img {
			width: 100%;
			height: 280rpx;
		}

		.heade_swiper {
			width: 100%;
			height: $titleHeight;
			padding: 32rpx;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top: $navHeight;
			z-index: 999;
			background: $baseColor;
		}

		.list {
			padding: $titleHeight 32rpx 60rpx;
			box-sizing: border-box;
			background: $baseColor;

			.item {
				display: flex;
				height: 120rpx;
				// margin-bottom: 60rpx;
				margin: 60rpx 0;

				.item_img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 12rpx;
				}

				.desc {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30rpx;
					// padding: 12rpx 0;
					box-sizing: border-box;

					.title {
						height: 72rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 40rpx;
						color: #000000;

						.state {
							width: 124rpx;
							height: 64rpx;
							line-height: 64rpx;
							text-align: center;
							font-size: 28rpx;
							border-radius: 16rpx;

							&.noStart {
								color: #00CACE;
								background: #000000;
							}

							&.conduct {
								color: #fff;
								background: #000000;
							}

							&.end {
								color: #fff;
								background: #333333;
							}
						}
					}

					.time {
						height: 48rpx;
						display: flex;
						align-items: center;
						font-weight: 400;
						font-size: 24rpx;
						color: #333333;

						.time_img {
							width: 48rpx;
							height: 48rpx;
						}
					}
				}
			}
		}
	}
</style>
