<template>
	<view class="uni_box address">
		<view class="title">收货人</view>
		<input type="text" placeholder="请输入收货人的名字" v-model="name" class="input">
		<view class="title">手机号码</view>
		<input type="text" placeholder="请输入收货人的手机号码" v-model="phone" class="input">
		<view class="title">所在地区</view>
		<input type="text" disabled placeholder="省、市、区、街道" v-model="collection" @click="show=true" class="input">
		<u-picker mode="region" v-model="show" :area-code="areaCode" @confirm="confirm"></u-picker>
		<view class="title">详细地址</view>
		<input type="text" placeholder="小区楼栋/乡村名称" v-model="address" class="input">
		<!-- <view class="checkbox">
			<view>设为默认收货地址</view>
			<image src="@/static/no_checked.svg" v-if="checked" @click="checked=!checked"></image>
			<image src="@/static/wancheng.svg" v-else @click="checked=!checked"></image>
		</view> -->
		<view class="footer">
			<view class="footer_btn" @click="addressPost">保存</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				name: "",
				phone: "",
				collection: "",
				address: "",
				areaCode: [],
				checked: false,
			}
		},
		async onLoad() {
			let {
				address
			} = await this.$u.api.address();
			if (address) {
				this.name = address.name;
				this.phone = address.phone;
				this.collection = address.collection;
				this.address = address.address;
				this.areaCode=[address.province_id,address.city_id,address.area_id];
			}
		},
		methods: {
			confirm(obj) {
				this.collection = `${obj.province.label}-${obj.city.label}-${obj.area.label}`;
				this.areaCode = [obj.province.value, obj.city.value, obj.area.value];
			},
			showTips(title) {
				this.$refs.uToast.show({
					title: title,
					type: 'error'
				})
			},
			async addressPost() {
				let name = this.name;
				let phone = this.phone;
				let collection = this.collection;
				let address = this.address;
				if (!name) {
					this.showTips('请输入收货人的名字');
					return
				}
				if (!phone) {
					this.showTips('请输入收货人的手机号码');
					return
				}
				if (!collection) {
					this.showTips('请选择省、市、区、街道');
					return
				}
				if (!address) {
					this.showTips('请输入小区楼栋/乡村名称');
					return
				};
				let [province_id, city_id, area_id] = [this.areaCode[0], this.areaCode[1], this.areaCode[2]];
				let res = await this.$u.api.addressPost({
					name,
					phone,
					province_id,
					city_id,
					area_id,
					collection: collection,
					address: address
				});
				this.$refs.uToast.show({
					title: '操作成功',
					type: 'success',
					callback: () => {
						uni.switchTab({
							url: '../tabbar/my'
						})
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	$titleHeight: 40rpx;
	$footHeight:120rpx;

	.address {
		padding: $titleHeight 40rpx $footHeight;
		box-sizing: border-box;

		.title {
			font-weight: 400;
			font-size: 28rpx;
			color: #000000;
			margin-bottom: 16rpx;
		}

		.input {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 25rpx;
			box-sizing: border-box;
			border: 1px solid #EEEEEE;
			border-radius: 16rpx;
			margin-bottom: 40rpx;
		}

		.checkbox {
			width: 100%;
			height: 48rpx;
			line-height: 48rpx;
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			display: flex;
			justify-content: space-between;

			image {
				width: 48rpx;
				height: 48rpx;
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
	}
</style>
