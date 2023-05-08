import Vue from "vue";
import App from "./App";
import store from "@/store/store.js";

Vue.config.productionTip = false;
App.mpType = "app";

//引入uView
import uView from "uview-ui";
Vue.use(uView);

import Api from "@/api/api.js";
const context = require.context("@/api/apis", true, /.js$/);

const endPoints = context
	.keys()
	.map((k) => context(k)?.default)
	.filter(Boolean);

const apiOptions = {
	baseUrl: "/scmt",
	endPoints,
};

//微信小程序代理图片地址 H5为空直接走代理
Vue.prototype.imageUrl = ""

// #ifdef H5
console.log("H5环境")
apiOptions.baseUrl = "/scmt";
// #endif

// #ifdef MP-WEIXIN
console.log("微信小程序环境")
apiOptions.baseUrl = "https://192.168.1.201:8888/scmt";
//标识微信环境
Vue.prototype.isMiniApps = true
Vue.prototype.imageUrl = "http://192.168.1.201:8807"
// #endif

Vue.use(Api, apiOptions);

import Utils from "@/utils/utils.js";
Vue.use(Utils);

import {
	$http
} from "@escook/request-miniprogram";

//覆盖掉uni的$http
uni.$http = $http;

//请求的根路径 https://192.168.1.201:8888
$http.baseUrl = "";

//封装数据请求失败弹框的方法
uni.$showMsg = function(title = "数据请求失败!", duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: "none",
	});
};

const app = new Vue({
	...App,
	//挂载Vuex
	store,
});
app.$mount();

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}