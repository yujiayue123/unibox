<template>
	<view class="uni_box nickname">
		<view class="avatar">
			<view>选择头像</view>
			<view @click="upload">
			<image :src="head_portrait" class="photo"></image>
			</view>
		</view>
		<view class="title">请输入您的昵称</view>
		<input v-model="nickname" placeholder="请输入您要修改的昵称" class="input">
		<view class="footer">
			<view class="footer_btn" @click="onSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '@/utils/config.js';

	export default {
		data() {
			return {
				action: baseUrl + '/upload',
				nickname: '',
				head_portrait: '',
				isClick: false
			}
		},
		onLoad() {
			this.nickname = this.$store.state.info.nickname;
			this.head_portrait = this.$store.state.info.head_portrait;
		},
		methods: {
			upload() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.head_portrait = tempFilePaths[0];
						this.isClick = true;
						console.log(chooseImageRes);
						console.log(this.head_portrait);
						
					},
				});
			},
			async userEdit(head_portrait) {
				let data = {
					nickname: this.nickname
				};
				if (head_portrait) {
					data.head_portrait = head_portrait;
				}
				let res = await this.$u.api.userEdit(data);
				this.$store.commit('changeNickname', data);

				this.$u.toast("修改成功");
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/tabbar/my'
					})
				}, 1000);
			},
			uploadImage() {
				uni.uploadFile({
					url: baseUrl + '/upload',
					filePath: this.head_portrait,
					name: 'file',
					header: {
						'ApiToken': uni.getStorageSync('token')
					},
					success: async (res) => {
						let {
							code,
							data,
							msg
						} = JSON.parse(res.data);
						console.log(data);
						if (code == 0) {
							let head_portrait = data.src;
							this.userEdit(head_portrait);
						} else {
							vm.$u.toast(msg);
						}
					},
					
					fail: (err) => {
						console.log('err', err);
					}
					
				});
			},
			onSubmit() {
				if (this.isClick) {
					this.uploadImage();
				} else {
					this.userEdit();
				};
			},
		}
	};
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.nickname {
		padding: 0 32rpx $footHeight 32rpx;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;

		.avatar {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.photo {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}

		.title {
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			margin-top: 40rpx;
			margin-bottom: 15rpx;
		}

		.input {
			width: 100%;
			height: 80rpx;
			text-indent: 28rpx;
			border-radius: 8px;
			border: 1px solid #EEEEEE;
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
			position: absolute;
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
