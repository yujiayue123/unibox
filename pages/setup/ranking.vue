<template>
	<view class="uni_box ranking">
		<view class="title">
			<view class="code">排名</view>
			<view class="phone">手机号</view>
			<view class="number">邀请人数</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list">
				<view class="code">
					<view class="radio"></view>
					<view>{{index+1}}</view>
				</view>
				<view class="phone" v-if="item.user">{{item.user.show_phone}}</view>
				<view class="number">{{item.number}}</view>
			</view>
			<u-loadmore :status="status" :loadText="$store.state.loadText" @loadmore="loadmore" />
		</view>
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
				} = await this.$u.api.ranking({
					page: this.page,
					limit: this.limit
				});
				this.last_page = list.last_page;
				this.list = [...this.list, ...list.list];
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
			routerTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$titleHeight: 100rpx;

	.ranking {
		padding: $titleHeight 40rpx 0;
		box-sizing: border-box;

		.title {
			width: 100%;
			height: $titleHeight;
			line-height: $titleHeight;
			color: #000000;
			font-size: 28rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			position: fixed;
			left: 0;
			top: $navHeight;
			z-index: 999;
			background: $baseColor;

			.code,
			.number {
				flex: 0 0 160rpx;
				text-align: center;
			}

			.phone {
				flex: 1;
				text-align: center;
			}
		}

		.list {
			.item {
				height: 70rpx;
				line-height: 70rpx;
				display: flex;
				justify-content: space-between;

				.code {
					flex: 0 0 160rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.radio {
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						background-color: #000;
						margin-right: 10rpx;
					}
				}

				.phone {
					flex: 1;
					text-align: center;
					font-weight: 400;
					font-size: 24rpx;
					color: #000000;
				}

				.number {
					flex: 0 0 160rpx;
					text-align: center;
					font-weight: 400;
					font-size: 28rpx;
					color: #AAAAAA;
				}
			}
		}
	}
</style>
