import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//引入vuex持久化插件
import createPersistedState from "vuex-persistedstate";

const modulesFiles = require.context("./modules", true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = "m_" + modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

//创建vuex实例
const store = new Vuex.Store({
	//使用vuex持久化插件
	plugins: [
		createPersistedState({
			// 传入参数
			storage: {
				getItem: (key) => uni.getStorageSync(key),
				setItem: (key, val) => uni.setStorageSync(key, val),
				removeItem: (key) => uni.removeStorageSync(key)
			}

		}),
	],
	modules,
});

export default store;