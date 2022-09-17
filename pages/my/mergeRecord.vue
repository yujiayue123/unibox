<template>
	<view class="uni_box mergeRecord">
		<view class="item" v-for="item in list">
			<image :src="item.product.cover" class="item_img"></image>
			<view class="deta">
				<view class="title">
					<view class="name">《{{item.product.name}}》</view>
					<view class="time">{{item.created_at}}</view>
				</view>
				<view class="list">
					<view v-for="subItem in item.composeneed">{{subItem.product.name}}</view>
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
				limit: 10,
				last_page: 1,
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
					list
				} = await this.$u.api.composeMy({
					page: this.page,
					limit: this.limit
				});
				this.list = [...this.list, ...list.list];
				this.last_page = list.last_page;
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
		}
	};
</script>
<style lang="scss" scoped>
	.mergeRecord {
		padding: 0 40rpx;
		box-sizing: border-box;

		.item {
			padding: 40rpx 0;
			border-bottom: 1px solid #EEEEEE;
			display: flex;


			.item_img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12px;
			}

			.deta {
				flex: 1;
				margin-left: 32rpx;

				.title {
					height: 40rpx;
					line-height: 40rpx;
					display: flex;
					justify-content: space-between;

					.name {
						font-size: 40rpx;
						color: #000000;
					}

					.time {
						color: #AAAAAA;
						font-size: 28rpx;
					}
				}

				.list {
					view {
						text-indent: 40rpx;
						color: #AAAAAA;
						font-size: 28rpx;
						font-weight: 400;
						margin-top: 30rpx;
						position: relative;

						&::after {
							content: "";
							width: 8rpx;
							height: 8rpx;
							line-height: 8rpx;
							border-radius: 50%;
							background-color: #ccc;
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);

						}

					}
				}
			}
		}

	}
</style>
