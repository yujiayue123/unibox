<template>
	<view class="uni_box marketDeta">
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
			<view class="number">
				<view>库存:{{stock}}份</view>
				<view>发行:{{issue}}份</view>
			</view>
			<view class="copy" v-if="avata">
				<text class="copy_title">Token</text>
				<view class="copy_text">{{avata.nft_id}}</view>
				<image src="@/static/my3.svg" class="copy_img" @click="setClipboardData(avata.nft_id)"></image>
			</view>
			<view class="record" v-if="list.length">
				<view class="header">
					<view>寄售记录</view>
					<view class="router" @click="routerTo(`/pages/market/record?id=${id}`)">查看寄售记录 ></view>
				</view>
				<view class="item" v-for="item in list">
					<view class="name" v-if="item.user">用户{{item.user.nickname}}</view>
					<view class="name" v-else>用户</view>
					<view class="desc">
						<view>{{item.type_name}}</view>
						<view class="item_number">{{name}}</view>
					</view>
					<view class="time">{{item.created_at}}</view>
				</view>
			</view>
			<view class="careful" v-html="content"></view>
			<view class="careful" v-html="notice"></view>
		</view>
		<view class="footer">
			<view class="footer_desc">一口价：{{price}}¥</view>
			<view class="footer_btn" @click="routerTo(`/pages/market/marketBuy?type=1&id=${id}`)">立即购买</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id: null,
				cover: "",
				name: "",
				code: "",
				nickname: "",
				
				stock: "",
				issue: "",
				
				date: "",
				price: "",
				content: "",
				notice: "",

				avata: null,
				list: []
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.orderInfo();
		},
		methods: {
			async orderInfo() {
				let {
					avata,
					order,
					sell_old
				} = await this.$u.api.orderInfo({
					id: this.id
				});
				const data = order.product;
				this.cover = data.cover;
				this.name = data.name;


				this.stock = data.stock;
				this.issue = data.issue_all;
				this.author = data.author;
				this.date = data.issuer_date;
				this.price = data.price;
				this.rotation = data.rotation;

				let content = data?.content?.replace(/<img/gi, '<img style="max-width:100%;height:auto"');
				this.content = content;
				let notice = data?.notice?.replace(/<img/gi, '<img style="max-width:100%;height:auto"');
				this.notice = notice;

				this.nickname = order.user.nickname;
				this.code = order.product_number.number;
				this.avata = avata;

				this.list = sell_old;
			},
			setClipboardData(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						console.log('success');
					}
				});
			},
			backTo(url) {
				uni.navigateBack();
			},
			routerTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.marketDeta {
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
			border-radius: 32rpx;
			padding: 32rpx;
			padding-bottom: $footHeight;
			box-sizing: border-box;
			background: $baseColor;
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

			.number {
				color: #333333;
				font-size: 24rpx;
				font-weight: 400;
				margin-top: 16rpx;
				display: flex;

				view {
					margin-right: 20rpx;
				}
			}

			.copy {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				margin: 32rpx 0;
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

			.record {
				padding: 40rpx 0;
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;

				.header {
					color: #000000;
					font-size: 28rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.router {
						color: #14EAF0;
						font-size: 24rpx;
						font-weight: 400;
					}
				}

				.item {
					margin-top: 40rpx;
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
