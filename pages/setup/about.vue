<template>
	<view class="uni_box about">
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
				setting
			} = await this.$u.api.setting({
				key: "about"
			});
			const data = setting;
			this.content = data?.content;
		},
	}
</script>

<style lang="scss" scoped>
	.about {
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}
</style>
