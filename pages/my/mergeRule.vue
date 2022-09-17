<template>
	<view class="uni_box mergeRule">
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
				data
			} = await this.$u.api.composeInfo({
				id: option.id
			});
			this.content = data?.content;
		},
	}
</script>

<style lang="scss" scoped>
	.mergeRule {
		width: 100%;
		line-height: 40px;
		color: #333333;
		font-size: 28rpx;
		font-weight: 400;
		padding: 40rpx;
		box-sizing: border-box;
	}
</style>
