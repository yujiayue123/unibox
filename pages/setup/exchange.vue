<template>
	<view class="uni_box exchange">
		<view class="title">
			<view class="text">兑换码</view>
			<input type="text" placeholder="请输入兑换码" v-model="code" class="code_input">
		</view>
		<view class="list">
			<view class="item" v-for="item in list">
				<view class="item_text">通过兑换获得{{item.product.name}}#{{item.product_number.number}}</view>
				<view class="item_time">{{item.created_at}}</view>
			</view>
			<u-loadmore :status="status" :loadText="$store.state.loadText" @loadmore="loadmore" />
		</view>
		<view class="footer">
			<view class="footer_btn" @click="exchange">兑换</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				list: [],
				page: 1,
				limit: 10,
				last_page: 1,
				status: "loadmore"
			}
		},
		onLoad: function() {
			this.getList();
		},
		onReachBottom: function() {
			this.triggerPage();
		},
		methods: {
			async getList() {
				let {
					list
				} = await this.$u.api.order({
					type: 4,
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
			async exchange() {
				let res = await this.$u.api.exchange({
					code: this.code
				});
				this.$u.toast("操作成功");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$titleHeight: 204rpx;
	$footHeight:190rpx;

	.exchange {
		.title {
			width: 100%;
			height: $titleHeight;
			border-bottom: 1px solid #EEEEEE;
			padding: 40rpx;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top: $navHeight;
			z-index: 999;
			background: $baseColor;

			.text {
				height: 44rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #000000;
			}

			.code_input {
				width: 100%;
				height: 80rpx;
				padding: 0 25rpx;
				box-sizing: border-box;
				border: 1px solid #EEEEEE;
				border-radius: 16rpx;
			}
		}

		.list {
			min-height: 100vh;
			padding: $titleHeight 40rpx $footHeight;
			box-sizing: border-box;

			.item {
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;

				.item_text {
					font-size: 28rpx;
					color: #000000;
				}

				.item_time {
					font-weight: 400;
					font-size: 28rpx;
					color: #AAAAAA;
				}
			}
		}

		.footer {
			width: 100%;
			height: $footHeight;
			padding: 20rpx 32rpx 0 0;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(24rpx);
			display: flex;
			justify-content: flex-end;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			.footer_btn {
				width: 184rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #00CACE;
				font-size: 28rpx;
				border-radius: 16rpx;
				background: #000000;
			}
		}
	}
</style>
