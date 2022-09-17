<template>
	<view class="uni_box mergeCore">
		<view class="title">
			<view @click="routerTo('/pages/my/mergeRecord')">合成记录</view>
			<view @click="routerTo(`/pages/my/mergeRule?id=${id}`)">活动规则</view>
			<view @click="routerTo('/pages/my/myCollection')">我的藏品</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in dataList">
				<view class="img_box" @click="choiceClick(item.id)">
					<image :src="item.cover" class="item_img" v-if="item.number>0"></image>
					<image src="@/static/more.svg" class="more_img" v-else></image>
					<view class="img_text" v-if="item.number>0">
						<view>{{item.number}}/{{item.total}}</view>
						<view @click="choiceClick(item.id)">选择</view>
					</view>
				</view>
				<view class="name" v-if="item.number>0">{{item.name}}</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer_btn" @click="composeOperate">点击合成</view>
		</view>
		<u-popup v-model="popupShow" mode="bottom" :border-radius="32">
			<view class="popup_box">
				<view class="popup_box_title">
					<view class="name">选择合成材料</view>
					<image src="@/static/x_circle.svg" class="title_img" @click="popupShow=false"></image>
				</view>
				<scroll-view scroll-x class="popup_list">
					<view class="item" v-for="(item,index) in popupList" @click="changePopupIndex(item.pid,item.id)">
						<image :src="item.cover" class="item_img"></image>
						<view class="choice">
							<image src="@/static/wancheng.svg" class="choice_img" v-if="popupIndex.includes(item.id)">
							</image>
							<image src="@/static/no_checked.svg" class="choice_img" v-else></image>
							<view class="choice_name">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="btn" @click="determine">确定</view>
			</view>
		</u-popup>

		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id: null,
				dataList: [],

				popupList: [],
				popupShow: false,
				popupIndex: []
			}
		},
		async onLoad(option) {
			this.id = option.id;
			let res = await this.$u.api.composeInfo({
				id: this.id
			});
			let need = res.data.need;
			let dataList = [];
			need.forEach(item => {
				dataList.push({
					cover: item.product.cover,
					id: item.product.id,
					name: item.product.name,
					total: item.number,
					number: 0,
					popupIndex: []
				})
			});
			this.dataList = dataList;
		},
		methods: {
			async choiceClick(id) {
				let {
					list
				} = await this.$u.api.order({
					page: 1,
					limit: 999999999,
					front_type: 1,
					status: 1
				});

				let data = list.list;

				let popupList = [];
				data.forEach(dataItem => {
					if (id == dataItem.product?.id) {
						popupList.push({
							pid: id,
							id: dataItem.id,
							name: dataItem.product.name,
							cover: dataItem.product.cover
						})
					}
				});
				this.popupList = popupList;
				this.popupShow = true;

				let dataList = this.dataList;
				let dataItem = dataList.find(item => item.id == id);
				this.popupIndex = dataItem.popupIndex;
				dataItem.number = dataItem.popupIndex.length;
			},
			changePopupIndex(pid, id) {
				let dataList = this.dataList;
				let dataItem = dataList.find(item => item.id == pid);

				let total = dataItem.total;
				let popupIndex = dataItem.popupIndex;

				let idx = popupIndex.indexOf(id);
				if (idx > -1) {
					popupIndex.splice(idx, 1);
				} else {
					popupIndex.push(id);
				};

				this.popupIndex = popupIndex;
				if (popupIndex.length > total) {
					popupIndex.splice(popupIndex.length - 1, 1);
					this.$refs.uToast.show({
						title: '选择上限',
						type: 'error'
					})
				};
				dataItem.number = popupIndex.length;
			},
			determine() {
				this.popupShow = false;
			},
			async composeOperate() {
				let dataList = this.dataList;
				let popupIndex = [];
				dataList.forEach(item => {
					popupIndex = [...popupIndex, ...item.popupIndex];
				});
				let res = await this.$u.api.composeOperate({
					id: this.id,
					order_ids: popupIndex
				});
				this.$u.toast("合成成功");
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/tabbar/my"
					});
				}, 1000);
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
	$titleHeight: 60rpx;
	$footHeight:120rpx;

	.mergeCore {
		padding: 92rpx 32rpx $footHeight;
		box-sizing: border-box;

		.title {
			width: 100%;
			height: $titleHeight;
			line-height: $titleHeight;
			text-align: center;
			color: #000000;
			font-size: 24rpx;
			font-weight: 400;
			padding: 0 32rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			position: fixed;
			left: 0;
			top: $navHeight;
			z-index: 999;
			background: $baseColor;

			view {
				text-decoration: underline;
			}
		}

		.list {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				width: 320rpx;
				margin-top: 20rpx;

				.img_box {
					width: 320rpx;
					height: 320rpx;
					position: relative;
					border-radius: 16px;
					background: #EEEEEE;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;

					.item_img {
						width: 100%;
						height: 100%;
					}

					.more_img {
						width: 48rpx;
						height: 48rpx;
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
						// background: linear-gradient(135.96deg, rgba(23, 23, 27, 0.5) 12.7%, rgba(23, 23, 27, 5e-05) 120.11%);
						// backdrop-filter: blur(21.7463px);
						display: flex;
						justify-content: space-between;
						position: absolute;
						left: 0;
						bottom: 0;
					}
				}

				.name {
					width: 100%;
					height: 80rpx;
					line-height: 60rpx;
					text-align: center;
					color: #000000;
					font-size: 32rpx;
				}
			}

			.add_item {
				width: 330rpx;
				height: 394rpx;

				.img_box {
					width: 330rpx;
					height: 330rpx;
					background: #EEEEEE;
					border-radius: 32rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.more_img {
						width: 48rpx;
						height: 48rpx;
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

		.popup_box {
			padding: 0 32rpx 40rpx;
			box-sizing: border-box;
			overflow: hidden;

			.popup_box_title {
				height: 112rpx;
				line-height: 112rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.name {
					font-size: 32rpx;
					color: #000000;
				}

				.title_img {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.popup_list {
				padding: 40rpx 0;
				box-sizing: border-box;
				white-space: nowrap;

				.item {
					display: inline-block;
					width: 240rpx;
					margin: 0 20rpx;

					.item_img {
						width: 240rpx;
						height: 240rpx;
						border-radius: 32rpx;
					}

					.choice {
						width: 100%;
						height: 48rpx;
						line-height: 48rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 16rpx;

						.choice_img {
							width: 40rpx;
							height: 40rpx;
						}

						.choice_name {
							color: #000000;
							font-size: 32rpx;
							margin-left: 20rpx;
						}
					}
				}
			}

			.btn {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #00CACE;
				font-size: 28rpx;
				border-radius: 8px;
				background: #000000;
			}

			// background: #F7F8FA;
		}
	}
</style>
