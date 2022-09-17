<template>
	<view class="uni_box market">
		<u-sticky zIndex='999' :h5NavHeight=$store.state.h5NavHeight>
			<u-dropdown>
				<u-dropdown-item v-model="price_sort" title="最新上架" :options="sortList" @change="sortChange">
				</u-dropdown-item>
				<u-dropdown-item v-model="type" :title="typeTitle" :options="typeList" @change="typeChange">
				</u-dropdown-item>
				<u-dropdown-item v-model="series_id" :title="seriesTitle" :options="series" @change="seriesChange"
					v-if="type==1">
				</u-dropdown-item>
			</u-dropdown>
		</u-sticky>

		<view class="list">
			<u-grid :col="2" :border="false">
				<u-grid-item v-for="item in list">
					<view class="item" @click="routerTo(item.id)">
						<view class="img_box">
							<image :src="type==1?item.cover:item.blind_box_cover" class="item_img"></image>
							<view class="img_text">
								{{item.price}}¥
							</view>
						</view>
						<view class="name">{{type==1?item.product_name:item.blind_box_name}}</view>
					</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-loadmore :status="status" :loadText="$store.state.loadText" @loadmore="loadmore" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				type: 1,
				typeList: [{
					label: '藏品',
					value: 1,
				}, {
					label: '盲盒',
					value: 2,
				}],
				typeTitle: '藏品',

				series_id: '',
				series: [],
				seriesTitle: '',

				sortList: [{
					label: '升序',
					value: "asc",
				}, {
					label: '降序',
					value: "desc",
				}],
				price_sort: "asc",

				list: [],
				page: 1,
				last_page: 1,
				limit: 10,
				status: 'loadmore', //加载字段
			}
		},
		onShow() {
			this.getType();
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
			async getType() {
				let {
					series
				} = await this.$u.api.orderSellList();

				let seriesList = [];
				series.forEach(item => {
					seriesList.push({
						label: item.name,
						value: item.id,
					});
				});
				this.seriesTitle = seriesList[0].label;
				this.series_id = seriesList[0].value;
				this.series = seriesList;
				this.getList();
			},
			async getList() {
				let data = {
					front_type: this.type,
					series_id: this.series_id,
					price_sort: this.price_sort,
					page: this.page,
					limit: this.limit
				};
				if (this.type == 1) {
					data.series_id = this.series_id
				} else {
					delete data.series_id
				};
				let {
					list
				} = await this.$u.api.orderSellList(data);
				this.list = this.page == 1 ? list.list : [...this.list, ...list.list];
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
			typeChange(index) {
				let dataItem = this.typeList.filter(item => item.value == index);
				dataItem = dataItem[0];
				this.type = dataItem.value;
				this.typeTitle = dataItem.label;
				this.list = [];
				this.page = 1;
				this.last_page = 1;
				this.status = "loadmore";
				this.getList();
			},
			seriesChange(index) {
				let dataItem = this.series.filter(item => item.value == index);
				dataItem = dataItem[0];
				this.series_id = dataItem.value;
				this.seriesTitle = dataItem.label;
				this.list = [];
				this.page = 1;
				this.last_page = 1;
				this.status = "loadmore";
				this.getList();
			},
			sortChange(index) {
				this.price_sort = index;
				this.list = [];
				this.page = 1;
				this.last_page = 1;
				this.status = "loadmore";
				this.getList();
			},
			routerTo(id) {
				const url = this.type == 1 ? `/pages/market/collectionDeta?id=${id}` :
					`/pages/market/blindBoxDeta?id=${id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.market {
		/deep/ .u-sticky {
			background-color: $baseColor;
		}

		.list {
			margin-bottom: 20rpx;
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
						text-align: center;
						color: #FFFFFF;
						font-size: 24rpx;
						padding: 0 16rpx;
						box-sizing: border-box;
						background: linear-gradient(136deg, #17171B 0%, rgba(23, 23, 27, 0) 100%);
						// background: linear-gradient(135.96deg, rgba(23, 23, 27, 0.5) 12.7%, rgba(23, 23, 27, 5e-05) 120.11%);
						// backdrop-filter: blur(21.7463px);
						// display: flex;
						// justify-content: space-between;
						position: absolute;
						left: 0;
						bottom: 0;
					}

					.img_text_price {
						width: 100%;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						color: #FFFFFF;
						font-size: 24rpx;
						background: linear-gradient(136deg, #17171B 0%, rgba(23, 23, 27, 0) 100%);
						// background: linear-gradient(135.96deg, rgba(23, 23, 27, 0.5) 12.7%, rgba(23, 23, 27, 5e-05) 120.11%);
						// backdrop-filter: blur(21.7463px);
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
</style>
