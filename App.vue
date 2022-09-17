<script>
	export default {
		onLaunch: async function() {
			let {
				setting
			} = await this.$u.api.setting({
				key: "default"
			});
			const market_open = setting.market_open;
			
			uni.setStorageSync('market_open', market_open);
			// market_open==1?'开':'关';
			if (market_open == 1) {
				uni.setTabBarItem({
					index: 2,
					visible: true
				})
			}
			if (market_open == 2) {
				uni.setTabBarItem({
					index: 2,
					visible: false
				})
			}
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	uni-page-body,
	html,
	body {
		height: 100%;
	}

	@import "uview/index.scss";
</style>
