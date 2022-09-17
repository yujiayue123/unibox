<template>
	<view class="uni_box invitation_record">
		<image src="@/static/title.svg" class="title_img" @click="routerTo"></image>
		<view class="content">
			<view class="number_persons">当前共成功邀请{{count}}人,已实名{{realname_number}}人</view>
			<view class="title">
				<view class="code">排名</view>
				<view class="avatar">头像</view>
				<view class="nickname">昵称</view>
				<view class="realname">是否实名</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in list">
					<view class="code">{{index+1}}</view>
					<view class="avatar">
						<image :src="item.head_portrait" class="avatar_img"></image>
					</view>
					<view class="nickname">{{item.nickname}}</view>
					<view class="realname" v-if="item.is_realname==1">已实名</view>
					<view class="realname realnames" v-else>未实名</view>
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
				list: [],
				page: 1,
				limit: 10,
				last_page: 1,
				status: "loadmore",
				count: 0,
				realname_number: 0
			};
		},
		onShow() {
			this.getList();
		},
		onHide() {
			this.list = [];
			this.page = 1;
			this.last_page = 1;
			this.status = 'loadmore';
		},
		onReachBottom: function() {
			this.triggerPage();
		},
		methods: {
			async getList() {
				let {
					list,
					realname_number
				} = await this.$u.api.sonsList({
					page: this.page,
					limit: this.limit
				});
				this.last_page = list.last_page;
				this.count = list.count;
				list = list.list;
				this.list = this.page == 1 ? list : [...this.list, ...list];
				this.realname_number = realname_number;
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
			routerTo() {
				uni.navigateTo({
					url: '../setup/ranking'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.invitation_record {
		.title_img {
			width: 100%;
			height: 360rpx;
		}

		.content {
			width: 100%;
			border-radius: 48rpx 48rpx 0px 0px;
			padding: 40rpx 32rpx;

			.number_persons {
				width: 100%;
				height: 68rpx;
				line-height: 68rpx;
				text-indent: 20rpx;
				margin-bottom: 60rpx;
				color: #fff;
				font-size: 28rpx;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				font-weight: 400;
				border-radius: 8rpx;
				background: #31D3D7;
			}

			.title,
			.list .item {
				height: 80rpx;
				line-height: 80rpx;
				display: flex;

				view {
					color: #000000;
					font-size: 28rpx;
					font-weight: 400;
					font-family: Source Han Sans CN-Regular, Source Han Sans CN;

					&.code {
						flex: 0 0 80rpx;
						text-align: center;
					}

					&.avatar {
						flex: 0 0 200rpx;
						text-align: center;
					}

					&.nickname {
						flex: 1;
						text-align: center;
					}

					&.realname {
						flex: 0 0 150rpx;
						color: #31D3D7;
						font-weight: 700;
						text-align: center;
					}

					&.realnames {
						color: #f00;
					}
				}
			}

			.title {
				border-bottom: 1px solid #E0E0E0;
			}

			.list {
				.item {
					margin-top: 40rpx;

					.avatar {
						display: flex;
						justify-content: center;

						.avatar_img {
							width: 72rpx;
							height: 72rpx;
							border-radius: 50%;
						}
					}
				}

				.item:last-child {
					margin-bottom: 40rpx;
				}
			}
		}
	}
</style>
