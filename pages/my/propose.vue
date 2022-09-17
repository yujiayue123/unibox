<template>
	<view class="uni_box propose">
		<view class="header">当前余额：<text class="text">{{myBalance}}¥</text></view>
		<view class="header_input">
			<input type="number" placeholder="请输入要提现的金额" v-model="money" @input="inputChange">
			<view class="rmb">¥</view>
		</view>
		<view class="explain">
			<view class="item">
				<view>提现手续费{{service_charge}}%</view>
				<view>{{service_charge_number}} ¥</view>
			</view>
			<view class="item">
				<view>预计到账金额</view>
				<view>{{balance}} ¥</view>
			</view>
		</view>
		<view class="bank">银行信息</view>
		<view class="bank_input">{{name}}</view>
		<view class="bank_input">{{bank_name}}</view>
		<view class="bank_input">{{number}}</view>
		<!--
		<input type="text" placeholder="请输入开户行名称" class="bank_input">
		 <input type="text" placeholder="请输入户主姓名" class="bank_input">
		<input type="text" placeholder="请输入卡号" class="bank_input">
		-->
		
		 
		<view class="notice">
			<view class="title">提现须知</view>
			<view class="content">{{content}}</view>
			<!-- <view class="content">
				本站允许访问者查看其上的材料，但只能用于个人的、非商业用途，且不侵犯本站资料的任何著作权及其他合法权利。

				<br>免责声明与责任限制
				<br>您使用本站不构成您与本站所有者的合同，本站内容只作为邀约邀请，而不是对您的邀约；本站也没有任何担保（包括但不限于针对特定目的的适用性和不侵犯知识产权等方面）。
				<br>如果您不理解邀约邀请的含义和后果，请在请教他人后使用。
				<br>在任何情况下，无论是根据合同或侵权行为抑或其它任何法律理论，也无论本站是否被告知有此类损害的可能性，本站及其与本站有合作的任何其它第三方均不对由于本站、链接到本站点的任何其他站点或者包含在任何或所有此类站点中的信息或服务的使用、无法使用或使用结果而造成的任何损害负责，包括但不限于直接的和/或间接的利润损失、数据损毁、精神损害等。
				<br>本站力求给您提供安全、通畅的访问和其他服务，但由于Internet线路、垃圾邮件、黑客入侵或其他不可抗力等原因直接给您造成了损害，本站不负任何责任。
				<br>注册用户应在线提交问题后，应在此后登陆会员区查看问题的处理结果，因各个邮件服务器反垃圾策略不同可能导致您不能完全依赖电子邮件获得本站的信息反馈。
				<br>本站中指向其他第三方站点的链接
				<br>本站某些内容指向其他第三方站点的链接仅仅为访问者方便。如果您使用这些链接，您将离开此本站。您通过由本站而链接到的第三方站点，您应自行承担可能的风险，本站不保证第三方站点的安全性。
				<br>与本站进行链接
				<br>您可以创建从自己拥有的站点或其它站点到本站的链接，但您不得使用包括但不限于隐藏本站域名、URL地址、改变本文本结构等任何技术的、非技术的手段使访问本站的访问者误认为您是本站所搭载内容的所有人；不得用与本站的链接为自己进行增加访问量、丰富内容、搜索引擎排名等任何营利；不得复制本站的内容；不得断章取义地链接某一内容，不得对本站内容进行虚假的陈述；不得侵犯本站的商标或标识。
			</view> -->
		</view>
		<view class="footer">
			<view class="footer_btn" @click="withdrawalPost">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myBalance: 0.00,
				name: "户主姓名",
				number: "卡号",
				bank_name: "开户行名称",
				money: '',
				content: '',
				service_charge: 0,
				service_charge_number: 0.00,
				balance: 0.00
			}
		},
		async onLoad() {
			this.getInfo();
			this.setting();
			let {
				balance,
				realname,
				bank,
				setting
			} = await this.$u.api.withdrawal();
			this.myBalance = balance;
			this.name = realname ? realname.name : "户主姓名";
			this.number = bank ? bank.number : "卡号";
			this.bank_name = bank ? bank.bank_name : "开户行名称";
			this.content = setting.content;
			this.service_charge = setting.service_charge;
		},
		methods: {
			async getInfo() {
				let {
					realname
				} = await this.$u.api.realname();

				this.name = realname ? realname.name : "户主姓名";
				let {
					bank
				} = await this.$u.api.bank();

				this.number = bank ? bank.number : "卡号";
				this.bank_name = bank ? bank.bank_name : "开户行名称";
			},
			async setting() {
				let res = await this.$u.api.setting({
					key: "withdrawal"
				});
				this.content = res.setting.content;
				this.service_charge = res.setting.service_charge;
			},
			inputChange(e) {
				let val = Number(e.target.value);
				this.service_charge_number = (val * this.service_charge / 100).toFixed(4);
				this.balance = val - this.service_charge_number;
			},
			async withdrawalPost() {
				let res = await this.$u.api.withdrawalPost({
					money: this.money
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	$footHeight:120rpx;

	.propose {
		padding: 0 32rpx $footHeight;
		box-sizing: border-box;

		.header {
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;

			padding: 40rpx 0 16rpx 0;
			box-sizing: border-box;

			.text {
				color: #00CACE;
			}
		}

		.header_input {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 8px;
			border: 1px solid #EEEEEE;
			padding: 0 28rpx;
			box-sizing: border-box;
			display: flex;

			input {
				flex: 1;
				height: 100%;
			}

			.rmb {
				color: #AAAAAA;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.explain {
			padding: 40rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid #EEEEEE;

			.item {
				height: 80rpx;
				line-height: 80rpx;
				color: #000000;
				font-size: 28rpx;
				font-weight: 400;
				display: flex;
				justify-content: space-between;
				margin: 20rpx 0;
			}
		}

		.bank {
			color: #000000;
			font-size: 28rpx;
			font-weight: 400;
			padding-top: 40rpx;
			margin-bottom: 15rpx;
		}

		.bank_input {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 8px;
			border: 1px solid #EEEEEE;
			margin-bottom: 15rpx;
		}

		.notice {
			width: 100%;
			border-radius: 24px;
			padding: 0 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			.title {
				color: #000000;
				font-size: 28rpx;
				padding: 40rpx 0;
				text-align: center;
			}

			.content {
				line-height: 40rpx;
				color: #333333;
				font-size: 28rpx;
				font-weight: 400;
				padding-bottom: 40rpx;
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
