<template>
	<view class="uni_box help">
		<view class="list">
			<view class="item" v-for="(item,index) in list" @click="routerTo(item.id)">
				<view>{{item.title}}</view>
				<image src="@/static/right.svg" class="item_img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page:1,
				limit:99999999
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			async getList() {
				let {
					list
				} = await this.$u.api.news({
					type:1,
					page: this.page,
					limit: this.limit
				});
				this.list = list.list;
			},
			routerTo(id) {
				let url = `./noticeDeta?id=${id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.help {
		padding: 0 40rpx;
		box-sizing: border-box;

		.list {
			.item {
				height: 110rpx;
				line-height: 110rpx;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: 400;
				font-size: 28rpx;
				color: #000516;

				.item_img {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>
