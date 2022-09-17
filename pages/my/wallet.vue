<template>
	<view class="uni_box wallet">
		<view class="header">
			<view class="head">可用余额</view>
			<view class="number">{{balance}}¥</view>
		</view>
		<view class="btn">
			<view class="propose" @click="routerTo('../my/propose')">提现</view>
			<view class="recharge" @click="routerTo('../my/recharge')">充值</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in list">
				<view class="title">{{item.type_name}}</view>
				<view class="deta">
					<view class="price add" v-if="item.value>0">{{item.value}}¥</view>
					<view class="price reduce" v-else>{{item.value}}¥</view>
					<view class="time">{{item.created_at}}</view>
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
				balance:0.00,
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
					balance,
					list
				} = await this.$u.api.log({
					page: this.page,
					limit: this.limit
				});
				this.balance=balance;
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
			routerTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wallet {
		padding: 0 32rpx;
		box-sizing: border-box;

		.header {
			padding: 60rpx 0;
			box-sizing: border-box;

			.head {
				text-align: center;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				margin-bottom: 15rpx;
			}

			.number {
				font-weight: 700;
				text-align: center;
				color: #000000;
				font-size: 40rpx;
			}
		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.propose {
				width: 328rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border: 1px solid #00CACE;
				border-radius: 8px;
			}

			.recharge {
				width: 328rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #00CACE;
				border: 1px solid #000000;
				border-radius: 8px;
				background: #000000;
			}
		}

		.list {
			width: 100%;
			margin-top: 70rpx;
			padding-top: 60rpx;
			border-top: 1px solid #EEEEEE;

			.item {
				width: 100%;
				padding-bottom: 60rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					color: #000000;
					font-size: 28rpx;
					margin-bottom: 15rpx;
				}

				.deta {
					display: flex;
					justify-content: space-between;

					.price {
						font-size: 28rpx;
						font-weight: 400;

						&.reduce {
							color: #FF6477;
						}

						&.add {
							color: #00CACE;
						}
					}

					.time {
						color: #AAAAAA;
						font-size: 28rpx;
						font-weight: 400;
					}
				}
			}
		}
	}
</style>
