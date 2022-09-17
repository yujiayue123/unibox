<template>
	<view class="uni_box my">
		<view class="header" v-if="$store.state.token">
			<view @click="routerTo('/pages/login/nickname')">
				
				<image :src="$store.state.info.head_portrait" class="photo"></image>
			</view>
			<view class="info">
				<view class="name" @click="routerTo('../login/nickname')">
					{{$store.state.info.nickname}}
				</view>
				<view class="copy">
					<text class="copy_title">区块地址</text>
					<view class="copy_text">{{$store.state.info.address}}</view>
					<view  @click="setClipboardData">
						<image src="@/static/my3.svg" class="copy_img"></image>	
					</view>
				</view>
			</view>
			<div @click="routerTo('../my/setup')">
				<image src="@/static/my2.svg" class="steup" ></image>
			</div>
		</view>
		<view class="header" v-else>
			<image src="@/static/avatar.png" class="photo"></image>
			<view class="info" @click="routerTo('/pages/login/login')">点击登录</view>
		</view>
		<view class="list">
			<view class="item" @click="routerTo('../my/wallet')">
				<image src="@/static/my4.svg" class="item_img"></image>
				<view class="item_text">我的钱包</view>
			</view> 
			<view class="item" @click="routerTo('../my/order')">
				<image src="@/static/my5.svg" class="item_img"></image>
				<view class="item_text">我的订单</view>
			</view>
			<view class="item" @click="routerTo('../my/merge')">
				<image src="@/static/my6.svg" class="item_img"></image>
				<view class="item_text">藏品合成</view>
			</view>
			<view class="item" @click="routerTo('/pages/home/invitation')">
				<image src="@/static/userPlus.svg" class="item_img"></image>
				<view class="item_text">邀请好友</view>
			</view>
		</view>

		<view class="my_list">
			<view class="title">
				<view class="item" :class="{ active: type == 1 }" @click="changeType(1)">
					<text>藏品</text>
					<text class="title_number">（{{product_number}}）</text>
				</view>
				<view class="item" :class="{ active: type == 2 }" @click="changeType(2)">
					<text>盲盒</text>
					<text class="title_number">（{{blind_box_number}}）</text>
				</view>
			</view>
			<view class="img_list">
				<u-grid :col="2" :border="false">
					<u-grid-item v-for="item in list">
						<view class="item" @click="jump(item)">
							<view class="img_box">
								<image :src="item.cover" class="item_img"></image>
								<view class="img_text">
									<view>{{item.issuer}}</view>
									<view>{{item.total}}份</view>
								</view>
							</view>
							<view class="name">{{item.name}}</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				list: [],
				product: [],
				product_number: 0,
				blind_box: [],
				blind_box_number: 0
			}
		},
		onLoad() {
			console.log(this.$store);
		},
		onShow() {
			this.getList();
		},
		onHide() {
			this.type = 1;
		},
		methods: {
			async getList() {
				let {
					blind_box,
					blind_box_number,
					product,
					product_number
				} = await this.$u.api.userInfo({
					front_type: this.type
				});
				this.list = this.product = product;
				this.product_number = product_number;
				this.blind_box = blind_box;
				this.blind_box_number = blind_box_number;
			},
			changeType(value) {
				this.type = value;
				if (value == 1) {
					this.list = this.product;
				}
				if (value == 2) {
					this.list = this.blind_box;
				}
			},
			setClipboardData() {
				
				uni.setClipboardData({
					data: this.$store.state.info.address,
					success: function() {
						console.log('success');
					}
				});
			},
			jump(item) {
				let type = this.type;
				let url;
				if (type == 1) {
					let id = item.product_id;
					url = `/pages/my/myCollection?type=${type}&id=${id}`;
				}
				if (type == 2) {
					let id = item.blind_box_id;
					url = `/pages/my/myBlindBox?type=${type}&id=${id}`;
				}
				uni.navigateTo({
					url: url
				})
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
	.my {
		.header {
			width: 100%;
			height: 120rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.photo {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.info {
				flex: 1;
				width: 0;

				.name {
					height: 50rpx;
					line-height: 60rpx;
					color: #000000;
					font-size: 32rpx;
					font-weight: 500;
					font-family: 'Source Han Sans CN';
					font-style: normal;
					margin-left: 20rpx;
				}

				.copy {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 8rpx;
					padding: 0 16rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.copy_title {
						font-family: 'Source Han Sans CN';
						font-size: 28rpx;
						color: #000000;
					}

					.copy_text {
						flex: 1;
						width: 0;
						color: #AAAAAA;
						font-size: 28rpx;
						font-weight: 400;
						padding: 0 32rpx;
						box-sizing: border-box;

						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.copy_img {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}

			.steup {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.list {
			padding: 40rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.item_img {
					width: 48rpx;
					height: 48rpx;
					margin-bottom: 16rpx;
				}

				.item_text {
					font-weight: 400;
					font-size: 28rpx;
					color: #000000;
				}
			}
		}

		.my_list {
			width: 100%;
			padding: 32rpx 32rpx $tabBarHeight;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 48rpx;

			/deep/.u-grid-item {
				padding: 0;
			}

			.title {
				display: flex;
				justify-content: center;
				align-items: center;

				.item {
					height: 60rpx;
					line-height: 60rpx;
					color: #000000;
					font-size: 28rpx;
					font-weight: 400;
					margin: 0 10rpx;

					&.active {
						position: relative;

						&::after {
							content: "";
							width: 80%;
							height: 4rpx;
							background-color: #14EAF0;
							position: absolute;
							left: 0;
							bottom: 0;
						}
					}
				}

				.title_number {
					color: #14EAF0;
				}
			}

			.img_list {
				display: flex;
				flex-wrap: wrap;

				.item {

					.img_box {
						width: 330rpx;
						height: 330rpx;
						position: relative;
						border-radius: 16px;
						overflow: hidden;

						.item_img {
							width: 100%;
							height: 100%;
						}

						.img_text {
							width: 100%;
							height: 60rpx;
							line-height: 60rpx;
							color: #FFFFFF;
							font-size: 24rpx;
							padding: 0 16rpx;
							box-sizing: border-box;
							background: linear-gradient(136deg, #17171B 0%, rgba(23, 23, 27, 0) 100%);
							display: flex;
							justify-content: space-between;
							// justify-content: flex-end;
							position: absolute;
							left: 0;
							bottom: 0;
						}
					}

					.name {
						height: 32rpx;
						width: 100%;
						line-height: 32rpx;
						text-align: center;
						font-size: 32rpx;
						text-align: center;
						color: #000000;
						margin-top: 16rpx;
					}
				}

			}
		}
	}
</style>
