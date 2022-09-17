<template>
	<view class="uni_box myList">
		<view class="title">
			<view class="item" :class="[active==1?'active':'']" @click="changeActive(1)">已收藏</view>
			<view class="item" :class="[active==11?'active':'']" @click="changeActive(11)">出售中</view>
			<view class="item" :class="[active==10?'active':'']" @click="changeActive(10)">已交易</view>
		</view>
		<view class="list">
			<view class="item" @click="routerTo(`/pages/my/collectionDeta?type=2&id=${item.id}`)"
				v-for="(item,index) in list">
				<view class="item_box">
					<image :src="item.blindbox.cover" class="item_img"></image>
					<view class="deta">
						<view class="name">{{item.blindbox.name}}</view>
						<view class="code">
							<view v-if="item.product">创作者：{{item.product.author}}</view>
							<view v-if="item.product_number">编号：{{item.product_number.number}}/{{item.product.issue_all}}</view>
							<view v-else>编号：生成中</view>
						</view>
						<view class="btn">
							<view class="number">{{item.blindbox.price}}¥</view>
							<view class="btn_box" v-if="active==1">
								<view class="btn_view" v-if="item.product_id==0" @click.stop="blindboxOpen(item.id)">开启
								</view>
								<view class="btn_view" v-if="market_open==1"
									@click.stop="routerTo(`./sell?type=2&id=${item.id}`)">出售
								</view>
								<view class="btn_view" @click.stop="routerTo(`./give?type=2&id=${item.id}`)">转赠
								</view>
							</view>
							<view class="btn_cancel" v-else-if="active==11" @click.stop="sellCancel(item,index)">
								取消出售
							</view>
							<view class="btn_time" v-else-if="active==10">{{item.created_at}}</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :loadText="$store.state.loadText" @loadmore="loadmore" />

			<u-modal v-model="modalShow" :show-title="false" :show-confirm-button="false" :show-cancel-button="false">
				<view class="modal">
					<image :src="modal_cover" class="modal_img"></image>
					<view class="modal_tips">您确认要停止售卖并下架以下商品吗？</view>
					<view class="modal_btn">
						<view class="btn" @click="modalShow=false">我再想想</view>
						<view class="btn" @click="orderSellCancel">确定下架</view>
					</view>
				</view>
			</u-modal>

			<u-modal v-model="openShow" :show-title="false" :show-confirm-button="false" :show-cancel-button="false">
				<blindBoxOpen :cover="open_cover" :name="open_name" @reload="reload" />
			</u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				modalShow: false,
				modal_cover: "",
				blind_box_id: null,

				market_open: uni.getStorageSync('market_open'),

				list: [],
				page: 1,
				limit: 10,
				last_page: 1,
				status: "loadmore",

				id: null,
				index: 0,
				openShow: false,
				open_cover: "",
				open_name: ""
			}
		},
		onLoad: function(option) {
			this.blind_box_id = option.id;
		},
		onShow() {
			this.getList();
		},
		onHide() {
			this.list = [];
			this.page = 1;
			this.last_page = 1;
			this.status = "loadmore";
		},
		onReachBottom: function() {
			this.triggerPage();
		},
		methods: {
			async getList() {
				let data = {
					front_type: 2,
					blind_box_id: this.blind_box_id,
					status: this.active,
					page: this.page,
					limit: this.limit
				};
				let {
					list
				} = await this.$u.api.order(data);
				this.list = this.page == 1 ? list.list : [...this.list, ...list.list];

				this.last_page = list.last_page;
				if (this.last_page == this.page) {
					this.status = 'nomore';
				}
			},
			changeActive(value) {
				this.active = value;
				this.list = [];
				this.page = 1;
				this.status = "loadmore";
				this.getList();
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
			sellCancel(item, index) {
				this.id = item.id;
				this.index = index;

				if (this.pType == 1) {
					this.modal_cover = item.product.cover;
				}
				if (this.pType == 2) {
					this.modal_cover = item.blindbox.cover;
				}
				this.modalShow = true;
			},
			async orderSellCancel() {
				let res = await this.$u.api.orderSellCancel({
					id: this.id
				});

				this.$u.toast("操作成功");

				setTimeout(() => {
					this.modalShow = false;
					this.list.splice(this.index, 1);
				}, 1000);
			},
			async blindboxOpen(id) {
				let {
					product
				} = await this.$u.api.blindboxOpen({
					id
				});
				this.open_cover = product.cover;
				this.open_name = product.name;
				this.openShow = true;
			},
			reload() {
				this.openShow = false;
				this.list = [];
				this.page = 1;
				this.status = "loadmore";
				this.getList();
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
	$titleHeight:64rpx;

	.myList {
		padding: $titleHeight 0;

		.title {
			width: 100%;
			height: $titleHeight;
			line-height: $titleHeight;
			display: flex;
			justify-content: space-between;

			position: fixed;
			left: 0;
			top: $navHeight;
			z-index: 999;
			background: $baseColor;

			.item {
				flex: 1;
				text-align: center;
				color: #000000;
				font-size: 24rpx;
				font-weight: 400;

				&.active {
					color: #14EAF0;
				}
			}
		}

		.list {
			padding: 0 30rpx;
			box-sizing: border-box;
			overflow: hidden;

			.item {
				width: 100%;
				height: 690rpx;
				border-radius: 48rpx;
				overflow: hidden;
				margin-top: 30rpx;

				.item_box {
					width: 100%;
					height: 100%;
					border-radius: 24px;
					overflow: hidden;
					position: relative;

					.item_img {
						width: 100%;
						height: 100%;
					}

					.deta {
						width: 100%;
						height: 220rpx;
						padding: 30rpx;
						box-sizing: border-box;
						// background: linear-gradient(135.96deg, rgba(23, 23, 27, 0.5) 12.7%, rgba(23, 23, 27, 5e-05) 120.11%);
						// backdrop-filter: blur(21.7463px);
						background: linear-gradient(136deg, #17171B 0%, rgba(23, 23, 27, 0) 100%);
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						position: absolute;
						left: 0;
						bottom: 0;
						z-index: 2;

						.name {
							color: #FFFFFF;
							font-size: 40rpx;
						}

						.code {
							color: #FFFFFF;
							font-size: 24rpx;
							font-weight: 400;
							display: flex;

							view {
								margin-right: 24rpx;
							}
						}

						.btn {
							height: 64rpx;
							line-height: 64rpx;
							display: flex;
							justify-content: space-between;

							.number {
								color: #FFFFFF;
								font-size: 40rpx;
								font-weight: 700;
							}

							.btn_box {
								display: flex;

								.btn_view {
									width: 140rpx;
									text-align: center;
									color: #00CACE;
									font-size: 28rpx;
									background: #000000;
									border-radius: 16rpx;
									margin-left: 24rpx;
								}
							}

							.btn_cancel {
								width: 300rpx;
								height: 64rpx;
								line-height: 64rpx;
								text-align: center;
								color: #00CACE;
								font-size: 28rpx;
								background: #000000;
								border-radius: 16rpx;
							}

							.btn_time {
								color: #FFFFFF;
								font-size: 24rpx;
								font-weight: 400;
							}
						}
					}
				}
			}
		}

		.modal {
			padding: 80rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;


			.modal_img {
				width: 360rpx;
				height: 360rpx;
				margin: 0 auto;
			}

			.modal_tips {
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				text-align: center;
				margin: 40rpx 0;
			}

			.modal_btn {
				display: flex;
				justify-content: space-between;

				.btn {
					width: 220rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					color: #00CACE;
					font-size: 28rpx;
					border-radius: 8px;

					&:first-child {
						border: 1px solid #00CACE;
					}

					&:last-child {
						background: #000000;
						border: 1px solid #000000;
					}
				}
			}
		}
	}
</style>
