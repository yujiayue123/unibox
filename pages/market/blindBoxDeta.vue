<template>
	<view class="uni_box blindBoxDeta">
		<image :src="cover" mode="widthFix" class="header_img"></image>
		<view class="back_img_box" @click="backTo">
			<image src="@/static/aleft.svg" class="back_img"></image>
		</view>
		<view class="content">
			<view class="deta">
				<view class="title">《{{name}}》</view>
				<view class="code">{{code}}</view>
				<view class="name">拥有者<text>用户{{nickname}}</text></view>
			</view>
			<view class="copy" v-if="avata">
				<text class="copy_title">Token</text>
				<view class="copy_text">{{avata.nft_id}}</view>
				<image src="@/static/my3.svg" class="copy_img" @click="setClipboardData(avata.nft_id)"></image>
			</view>
			<view class="list" v-if="list">
				<view class="sub_title">您可能抽到以下作品中的一个</view>
				<view class="item" v-for="item in list">
					<view class="item_view">
						<view class="name">{{item.name}}</view>
						<view class="rate">概率：{{item.blind_box_chance}}%</view>
					</view>
					<view class="item_view item_right">
						<view class="price">原价：{{item.price}}¥</view>
						<view class="item_img">
							<image src="@/static/grade1.svg" class="grade_img"
								v-if="item.level&&item.level.name=='SSR'">
							</image>
							<image src="@/static/grade1.svg" class="grade_img" v-if="item.level&&item.level.name=='SR'">
							</image>
							<image src="@/static/grade3.svg" class="grade_img" v-if="item.level&&item.level.name=='R'">
							</image>
							<image src="@/static/grade4.svg" class="grade_img" v-if="item.level&&item.level.name=='N'">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="careful" v-html="content"></view>
			<view class="careful" v-html="notice"></view>
		</view>
		<view class="footer">
			<view class="footer_desc">一口价：{{price}}¥</view>
			<view class="footer_btn" @click="routerTo">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				id: null,
				cover: '',
				name: '',
				code: "",
				nickname: "",

				avata: null,

				price: '',
				content: '',
				notice: ''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.orderInfo();
		},
		methods: {
			backTo(url) {
				uni.navigateBack()
			},
			async orderInfo() {
				let {
					order,
					blind_box_product,
					avata
				} = await this.$u.api.orderInfo({
					id: this.id
				});
				const data = order.blindbox;

				this.cover = data.cover;
				this.name = data.name;
				this.price = data.price;
				this.content = data.content;

				let content = data?.content?.replace(/<img/gi, '<img style="max-width:100%;height:auto"');
				this.content = content;
				let notice = data?.notice?.replace(/<img/gi, '<img style="max-width:100%;height:auto"');
				this.notice = notice;

				this.nickname = order.user.nickname;
				this.code = order.product_number.number;

				// this.avata = avata;

				this.list = blind_box_product;
			},
			routerTo() {
				let url = `/pages/market/marketBuy?type=2&id=${this.id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.blindBoxDeta {
		position: relative;

		.header_img {
			width: 100%;
		}

		.back_img_box {
			width: 100rpx;
			height: 100rpx;
			padding-left: 32rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: absolute;
			left: 0rpx;
			top: 78rpx;

			.back_img {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.content {
			width: 100%;
			background: #F7F8FA;
			padding: 32rpx;
			padding-bottom: $footHeight;
			box-sizing: border-box;
			overflow: hidden;

			.deta {
				width: 100%;
				box-sizing: border-box;
				overflow: hidden;

				.title,
				.code {
					color: #000000;
					font-size: 40rpx;
					font-weight: 500;
					font-style: normal;
					font-family: 'Source Han Sans CN';
				}

				.code {
					margin-top: 16rpx;
				}

				.name {
					height: 80rpx;
					line-height: 80rpx;
					color: #333333;
					font-size: 24rpx;
					font-weight: 400;
					font-style: normal;
					font-family: 'Source Han Sans CN';

					text {
						color: #000000;
						font-size: 28rpx;
						font-weight: 500;
						margin-left: 24rpx;
					}
				}
			}

			.copy {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				margin: 20rpx 0;
				padding: 0 16rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.copy_title {
					color: #000000;
					font-size: 28rpx;
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

			.list {
				margin-top: 40rpx;
				border-top: 1px solid #EEEEEE;
				border-bottom: 1px solid #EEEEEE;
				padding: 40rpx 0;
				box-sizing: border-box;

				.sub_title {
					text-align: center;
					color: #000000;
					font-size: 28rpx;
					margin-bottom: 40rpx;
				}

				.item {
					width: 100%;
					height: 60rpx;
					margin-bottom: 24rpx;
					padding: 0 16rpx;
					box-sizing: border-box;
					background: #EEEEEE;
					border-radius: 16rpx;
					display: flex;
					justify-content: space-between;

					.item_view {
						flex: 1;
						display: flex;
						align-items: center;

						&.item_right {
							justify-content: space-between;
						}

						.name {
							color: #000000;
							font-size: 28rpx;
							margin-right: 24rpx;
						}

						.rate {
							color: #000000;
							font-size: 24rpx;
						}

						.price {
							color: #aaaaaa;
							font-size: 28rpx;
						}

						.item_img {
							width: 64rpx;
							height: 28rpx;

							.grade_img {
								width: 64rpx;
								height: 28rpx;
							}
						}
					}
				}
			}

			.sub_title {
				height: 108rpx;
				line-height: 108rpx;
				text-align: center;
				color: #000000;
				font-size: 28rpx;
			}

			.sub_img {
				width: 100%;
				height: 750rpx;
			}

			.careful {
				width: 100%;
			}
		}

		.footer {
			width: 100%;
			height: $footHeight;
			padding: 0rpx 32rpx;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(24rpx);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			.footer_desc {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #000000;
				font-size: 28rpx;
				font-weight: bold;
				border-radius: 16rpx;
				border: 1px solid #EEEEEE;
				margin-right: 32rpx;
			}

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
