 //const base = "https://clevernet.top"; //测试地址
// const base="https://h5.lingmao.art";//正式地址

export const formal = false;  //true?正式地址:测试地址

const base = formal ? "https://clevernet.top" : "https://clevernet.top";
const pathName = "web"; //打包后的目录名字,需要在打包前定义好,打包后手动更改
export const baseUrl = `${base}/api`; //接口地址

// export formal;


export const qrCodeUrl = `${base}/${pathName}/#/pages/login/register`; //注册地址,邀请好友生成二维码时用到
// export const paymentCallback = `${base}/web/#/pages/setting/orderDeta`; //H5支付成功后的跳转页面,需要传给后台
export const paymentCallback = `${base}/web`;

export const webview = "https://clevernet.top/hybrid/payment_h5.html";
// #ifdef APP-PLUS
export const env = "app";
// #endif
// #ifdef H5
export const env = "h5";
// #endif
