<template>
	<view class="uni_box noticeDeta">
		<u-parse :html="content" :tag-style="style"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				style: {
					img: 'width:max-width:100%;height:auto'
				}
			};
		},
		async onLoad(option) {
			let {
				info
			} = await this.$u.api.newsInfo({
				id: option.id
			});
			const data = info;
			this.content = data?.content;
		},
	}
</script>

<style lang="scss" scoped>
	.noticeDeta {
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}
</style>
