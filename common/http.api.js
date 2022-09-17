const install = (Vue, vm) => {
	// 公共部分
	let setting = (params) => vm.$u.post('setting', params);
	let upload = (params) => vm.$u.post('upload', params);

	//////////////////////////////////////////分割////////////////////////////////////
	let productList = (params) => vm.$u.post('product', params); // 首页列表
	let productInfo = (params) => vm.$u.post('product/info', params); //首页详情
	let productBuy = (params) => vm.$u.post('product/buy', params); //首页购买
	
	let blindboxList = (params) => vm.$u.post('blindbox', params); //盲盒
	let blindDetails = (params) => vm.$u.post('blindbox/info', params); //盲盒详情
	let blindboxBuy = (params) => vm.$u.post('blindbox/buy', params); //盲盒详情
	
	let orderPlace= (params) => vm.$u.post('order/place', params); //锁单接口
	let orderPayment= (params) => vm.$u.post('order/payment', params); //支付接口
	let orderCancel= (params) => vm.$u.post('order/cancel', params); //取消订单接口
	
	
	let sonsList = (params) => vm.$u.post('user/sons', params); //邀请记录
	let news = (params) => vm.$u.post('news', params); //公告
	let newsInfo = (params) => vm.$u.post('news/info', params); //公告详情
	// 市场
	let orderSellList = (params) => vm.$u.post('order/sell/list', params); //市场列表
	let orderSellBuy = (params) => vm.$u.post('order/sell/buy', params); //市场购买
	let orderSellCancel = (params) => vm.$u.post('order/sell/cancel', params); //取消订单
	
	let loginCode = (params) => vm.$u.post('login/code', params); //验证码注册
	let smsSend = (params) => vm.$u.post('sms/send', params); //发送验证码
	let setPassword = (params) => vm.$u.post('set/password', params); //设置密码
	let setPaypassword = (params) => vm.$u.post('set/paypassword', params); //设置交易密码
	let findPassword = (params) => vm.$u.post('find/password', params); //忘记密码
	let loginPassword = (params) => vm.$u.post('login/password', params); //密码登录

	let realname = (params) => vm.$u.post('realname', params); //获取实名认证
	let realnamePost = (params) => vm.$u.post('realname/post', params); //实名认证提交
	let ranking = (params) => vm.$u.post('ranking', params); //排行榜
	
	let signout = (params) => vm.$u.post('signout', params); //退出登录
	let log = (params) => vm.$u.post('log', params); //用户日志
	
	let withdrawal= (params) => vm.$u.post('withdrawal', params); //提现信息
	let withdrawalPost = (params) => vm.$u.post('withdrawal/post', params); //提现
	let rechargePost = (params) => vm.$u.post('recharge/post', params); //充值

	let bank = (params) => vm.$u.post('bank', params); //获取绑定的银行卡
	let bankPost = (params) => vm.$u.post('bank/post', params); //绑定银行卡
	let order = (params) => vm.$u.post('order', params); //我的订单
	let orderInfo = (params) => vm.$u.post('order/info', params); //我的订单详情
	let orderSell = (params) => vm.$u.post('order/sell', params); //出售
	let orderSellOld = (params) => vm.$u.post('order/sell/old', params); //出售


	let orderTurn = (params) => vm.$u.post('order/turn', params); //转增
	let exchange = (params) => vm.$u.post('exchange', params); //兑换提交

	let product = (params) => vm.$u.post('product', params); //我的订单
	let userInfo = (params) => vm.$u.post('user/info', params); //个人信息
	let addressPost = (params) => vm.$u.post('address/post', params); //添加地址
	let address = (params) => vm.$u.post('address', params); //获取地址





	let userEdit = (params) => vm.$u.post('user/edit', params); //我的订单

	let blindboxOpen = (params) => vm.$u.post('blindbox/open', params); //开启盲盒
	let blindboxExtractOld = (params) => vm.$u.post('blindbox/extract/old', params); //抽取列表





	let compose = (params) => vm.$u.post('compose', params); //合成
	let composeInfo = (params) => vm.$u.post('compose/info', params); //合成详情
	let composeOperate = (params) => vm.$u.post('compose/operate', params); //合成提交
	let composeMy = (params) => vm.$u.post('compose/my', params); //合成记录


	vm.$u.api = {
		setting,
		upload,
		
		productList,
		productInfo,
		productBuy,
		
		blindboxList,
		blindDetails,
		blindboxBuy,
		
		sonsList,
		news,
		newsInfo,

		orderSellList,
		orderSellBuy,
		orderPlace,
		orderPayment,
		orderCancel,
		
		loginCode,
		smsSend,
		setPassword,
		setPaypassword,
		findPassword,
		loginPassword,
		realname,
		realnamePost,
		signout,
		log,
		withdrawal,
		withdrawalPost,
		rechargePost,
		ranking,
		bank,
		bankPost,
		order,
		orderInfo,
		orderSell,
		orderSellOld,
		orderSellCancel,
		orderTurn,
		exchange,
		product,
		userInfo,
		addressPost,
		address,
		userEdit,
		blindboxOpen,
		blindboxExtractOld,
		compose,
		composeInfo,
		composeOperate,
		composeMy
	};
}
export default {
	install
}
