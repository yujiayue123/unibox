<template>
	<view class="uni_box notice">
		<view class="system" v-for="(item,index) in list">
			<view class="messages">
				<text>{{item.title}}</text>
				<text>{{item.created_at}}</text>
			</view>
			<view class="information">
				<u-parse :html="item.synopsis" :tag-style="style"></u-parse>
				<view class="look_over" @click="routerTo(item.id)">查看详情 >></view>
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
				style: {
					img: 'width:max-width:100%;height:auto'
				}
			};
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
				} = await this.$u.api.news({
					type: 2,
					page: this.page,
					limit: this.limit
				})
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
			routerTo(id) {
				let url = `noticeDeta?id=${id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice {
		.system {
			width: 100%;
			padding: 32rpx;
			border-radius: 0rpx 32rpx 32rpx;
			opacity: 1;
			box-sizing: border-box;

			.messages {
				width: 100%;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;

				text {
					color: #AAAAAA;
					font-weight: 400;
					font-size: 24rpx;
					font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				}
			}

			.information {
				width: 100%;
				padding: 20rpx;
				margin-top: 16rpx;
				background: #FFFFFF;
				border-radius: 0rpx 32rpx 32rpx 32rpx;
				box-sizing: border-box;

				text {
					color: #333333;
					font-size: 28rpx;
					font-weight: 400;
				}

				.look_over {
					color: #18EAF0;
					font-size: 24rpx;
					font-weight: 500;
					font-family: Source Han Sans CN-Medium, Source Han Sans CN;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
</style>
