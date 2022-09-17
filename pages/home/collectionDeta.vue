<template>
	<view class="uni_box collectionDeta">
		<image :src="cover" mode="widthFix" class="header_img"></image>
		<view class="back_img_box" @click="backTo">
			<image src="@/static/aleft.svg" class="back_img"></image>
		</view>
		<view class="content">
			<view class="title">
				<view class="name">《{{name}}》</view>
			</view>
			<view class="author">
				<image :src="author_head" class="author_img"></image>
				<view class="author_text">
					<view class="key">{{issuer}}</view>
					<view class="value">{{author}}</view>
				</view>
			</view>
			<view class="number">
				<view class="left">
					<view class="price">{{price}}¥/份</view>
					<view class="limit">发行量{{issue_all}}份</view>
				</view>
				<view class="right">剩余{{stock}}份</view>
			</view>
			<view class="list" v-if="hash||address">
				<view class="item" v-if="hash">
					<text class="copy_title">链上HASH</text>
					<view class="copy_text">{{hash}}</view>
					<image src="@/static/my3.svg" class="copy_img" @click="setClipboardData(hash)"></image>
				</view>
				<view class="item" v-if="address">
					<text class="copy_title">合约地址</text>
					<view class="copy_text">{{address}}</view>
					<image src="@/static/my3.svg" class="copy_img" @click="setClipboardData(address)"></image>
				</view>
			</view>
			<u-parse :html="content" :tag-style="style"></u-parse>
			<u-parse :html="notice" :tag-style="style"></u-parse>
		</view>

		<view v-if="equityStatus==0">
			<view class="footer" v-if="status== 0">
				<image src="@/static/subtract.svg" class="footer_img"></image>
				<text class="footer_text">{{time}}</text>
			</view>
			<view class="footer footer_buy" v-else-if="status == 1">
				<view class="price">{{price}}¥/份</view>
				<view class="btn" @click="lockList">立即购买</view>
			</view>
			<!-- <view class="footer footer_buy" v-else-if="status == 1&&lock_time>0">
				<view class="lock_time">{{lock_time}}秒后可购买</view>
			</view>
			<view class="footer footer_buy" v-else-if="status == 1&&lock_time<=0">
				<view class="price">{{price}}/份</view>
				<view class="btn" @click="lockList">立即购买</view>
			</view> -->
			<view class="footer footer_buy" v-else-if="status == 2">
				<view class="price">{{price}}¥/份</view>
				<view class="btn">已结束</view>
			</view>
			<view class="footer footer_buy" v-else-if="status == 3">
				<view class="price">{{price}}¥/份</view>
				<view class="btn">已售罄</view>
			</view>
			<!-- <view class="footer footer_text" v-else-if="status == 2">已结束</view>
			<view class="footer footer_text" v-else-if="status == 3">已售罄</view> -->
		</view>

		<view v-if="equityStatus==1">
			<view class="footer lock_name" v-if="equityPower==0">无{{type_name}}权限</view>
			<view class="footer footer_buy" v-else>
				<view class="price">{{price}}¥/份</view>
				<view class="btn" @click="lockList">立即购买</view>
			</view>
		</view>

		<view v-if="equityStatus==2">
			<view class="footer lock_name">
				{{type_name}}
				<image src="@/static/subtract.svg" class="footer_img"></image>
				<text class="footer_text">{{equityTime}}</text>
			</view>
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
				author_head: "",
				issuer: "",
				author: "",
				price: "",
				issue_all: "",
				stock: "",

				hash: "",
				address: "",

				content: "",
				notice: "",

				status: null,
				time: "",
				start_date: "",
				timer: null,

				lock_time: 0,
				lookTimer: null,

				equityStatus: 0,
				equityPower: false,
				type_name: "",
				equity_time: 0,
				equityTime: "",
				equityTimer: null,

				style: {
					img: 'width:max-width:100%;height:auto'
				}
			}
		},

		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.getDeta();
		},
		onUnload() {
			clearTimeout(this.timer)
			clearInterval(this.lookTimer)
			clearTimeout(this.equityTimer)
		},
		onHide() {
			clearTimeout(this.timer)
			clearInterval(this.lookTimer)
			clearTimeout(this.equityTimer)
		},
		methods: {
			backTo(url) {
				uni.navigateBack()
			},
			async getDeta() {
				let {
					avata_class_id,
					avata_tx_hash,
					lock_time,
					product,
					setting_buy,
					equity
				} = await this.$u.api.productInfo({
					id: this.id
				});
				this.hash = avata_class_id;
				this.address = avata_tx_hash;
				this.lock_time = lock_time;

				const data = product;
				this.cover = data.cover;
				this.name = data.name;
				this.issuer = data.issuer;
				this.author = data.author;
				this.author_head = data.author_head;
				this.price = data.price;
				this.issue_all = data.issue_all;
				this.stock = data.stock;

				this.status = data.status;
				this.start_date = data.start_date;

				this.content = data.content;
				this.notice = setting_buy?.content;

				if (equity) {
					this.type_name = equity.type_name;
					this.equityPower = equity.power;
					this.equity_time = equity.time;
					this.equityStatus = equity.status;
				}
				let equityStatus = this.equityStatus;

				if (equityStatus == 0) {
					this.handerTime();
					this.lockTimeFn();
				} else if (equityStatus == 1) {

				} else if (equityStatus == 2) {
					this.equityTimeFn();
				}
			},
			equityTimeFn() {
				let time = this.equity_time;
				if (time == 0) {
					return
				} else {
					this.equityTimer = setTimeout(this.equityTimeFn, 1000);
				};
				let current = parseInt(new Date().getTime() / 1000);
				if (current >= time) {
					clearTimeout(this.equityTimer);
					this.getDeta();
				} else {
					let surplus = time - current;
					let hour = parseInt(surplus / 60 / 60);
					hour = hour < 10 ? '0' + hour : hour;

					let mm = parseInt(surplus / 60 % 60);
					mm = mm < 10 ? '0' + mm : mm;

					let ss = parseInt(surplus % 60);
					ss = ss < 10 ? '0' + ss : ss;
					this.equityTime = `${hour}:${mm}:${ss}`;
				};
			},
			lockTimeFn() {
				let time = this.lock_time;
				if (time > 0) {
					this.lookTimer = setInterval(() => {
						this.lock_time--;
						if (this.lock_time < 0) {
							this.status = 1;
							clearInterval(this.lookTimer);
						};
					}, 1000);
				}
			},
			handerTime() {
				let status = this.status;
				if (status == 0) {
					let current = new Date().getTime();

					let date = this.start_date;
					date = new Date(date.replace(/-/g, '/'));
					let time = (new Date(date)).getTime();

					if (current >= time) {
						this.status = 1;
					} else {
						let surplus = time - current;

						// let day = parseInt(surplus / 1000 / 60 / 60 / 24);
						// let hour = parseInt(surplus / 1000 / 60 / 60 % 24);
						
						let hour = parseInt(surplus / 1000 / 60 / 60);
						hour = hour < 10 ? '0' + hour : hour;

						let mm = parseInt(surplus / 1000 / 60 % 60);
						mm = mm < 10 ? '0' + mm : mm;

						let ss = parseInt(surplus / 1000 % 60);
						ss = ss < 10 ? '0' + ss : ss;
						this.time = `${hour}:${mm}:${ss}`;
						// this.time = `${day}:${hour}:${mm}:${ss}`;
					};
					this.timer = setTimeout(this.handerTime, 1000);
				} else {
					clearTimeout(this.timer);
				};
			},
			setClipboardData(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						console.log('success');
					}
				});
			},
			async lockList() {
				if (this.lock_time > 0) {
					this.$u.toast("上笔订单未支付");
					return
				}
				let {
					id
				} = await this.$u.api.orderPlace({
					id: this.id,
					from: "product"
				});
				let url = `/pages/setting/lockList?type=1&id=${this.id}&orderId=${id}`;
				uni.redirectTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.collectionDeta {
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
			border-radius: 32rpx;
			padding: 32rpx;
			padding-bottom: $footHeight;
			box-sizing: border-box;
			background: $baseColor;
			overflow: hidden;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.name {
					color: #000000;
					font-size: 40rpx;
				}

				.btn {
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					color: #333333;
					font-size: 24rpx;
					background: linear-gradient(90deg, #02CACE 0%, #8FFDFF 100%);
					border-radius: 8rpx;
					border: 1px solid #04CBCF;
					padding: 0 12rpx;
				}
			}

			.author {
				height: 60rpx;
				margin: 40rpx 0;
				display: flex;
				align-items: center;

				.author_img {
					width: 56rpx;
					height: 56rpx;
					margin-right: 16rpx;
				}

				.author_text {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.key {
						color: #000000;
						font-size: 24rpx;
					}

					.value {
						color: #333333;
						font-size: 24rpx;
						font-weight: 400;
					}
				}
			}

			.number {
				height: 60rpx;
				line-height: 60rpx;
				display: flex;
				justify-content: space-between;

				.left {
					display: flex;

					.price {
						color: #000000;
						font-size: 40rpx;
						font-weight: bold;
						margin-right: 20rpx;
					}

					.limit {
						color: #333333;
						font-size: 24rpx;
						font-weight: 400;
					}
				}

				.right {
					color: #00CACE;
					font-size: 24rpx;
					font-weight: 400;
				}
			}

			.list {
				margin-top: 40rpx;
				padding: 40rpx 0 0;
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
				box-sizing: border-box;

				.item {
					width: 100%;
					height: 80rpx;
					border-radius: 16rpx;
					margin-bottom: 40rpx;
					padding: 0 16rpx;
					box-sizing: border-box;
					background: #EEEEEE;

					display: flex;
					justify-content: space-between;
					align-items: center;

					.copy_title {
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
			background: rgba(255, 255, 255, 0.9);
			display: flex;
			align-items: center;
			justify-content: center;

			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			&.footer_text {
				color: #333333;
				font-size: 40rpx;
			}

			&.footer_buy {
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					color: #000000;
					font-size: 40rpx;
					font-weight: bold;
				}

				.lock_time {
					width: 100%;
					text-align: center;
					color: #000000;
					font-size: 40rpx;
					font-weight: bold;
				}

				.btn {
					width: 190rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					color: #00CACE;
					font-size: 28rpx;
					border-radius: 16rpx;
					background: #000000;
				}
			}

			&.lock_name {
				text-align: center;
				color: #000000;
				font-size: 40rpx;
				font-weight: bold;
			}

			.footer_img {
				width: 32rpx;
				height: 32rpx;
				margin: 0 20rpx;
			}

			.footer_text {
				color: #31D3D7;
				font-size: 40rpx;
			}
		}
	}
</style>
