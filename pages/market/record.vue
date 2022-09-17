<template>
	<view class="uni_box marketRecord">
		<view class="list">
			<view class="item" v-for="item in list">
				<view class="name">用户{{item.user.nickname}}</view>
				<view class="desc">
					<view>{{item.type_name}}</view>
					<view class="item_number">{{item.product.name}}</view>
				</view>
				<view class="time">{{item.created_at}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		async onLoad(option) {
			let {
				data
			} = await this.$u.api.orderSellOld({
				id: option.id
			});
			this.list = data;
		},
		methods: {}
	};
</script>

<style lang="scss" scoped>
	.marketRecord {
		.list {
			padding: 40rpx;
			box-sizing: border-box;

			.item {
				margin-bottom: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.name {
					width: 30%;
					color: #000000;
					font-size: 24rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.desc {
					width: 30%;
					color: #000000;
					font-size: 24rpx;
					font-weight: 400;
					display: flex;
					justify-content: center;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;

					.item_number {
						color: #14EAF0;
						margin-left: 16rpx;
					}
				}

				.time {
					width: 40%;
					text-align: right;
					color: #AAAAAA;
					font-size: 24rpx;
					font-weight: 400;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
</style>
