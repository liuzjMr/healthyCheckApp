export default {
	namespaced: true,
	state() {
		return {
			userInfo: null,
			userMobile: '',
			token: '',
		};
	},
	mutations: {
		SET_USERINFO(state, userInfo) {
			state.userInfo = userInfo;
		},
		SET_USERMOBILE(state, userMobile) {
			state.userMobile = userMobile;
		},
		SET_TOKEN(state, token) {
			state.token = token;
		}
	},
	actions: {
		setUserInfo({
			commit
		}, userInfo) {
			commit("SET_USERINFO", userInfo);
		},
		setUserMobile({
			commit
		}, userMobile) {
			commit("SET_USERMOBILE", userMobile);
		},
		setToken({
			commit
		}, token) {
			commit("SET_USERINFO", token);
		},
	},
	getters: {
		userInfo(state) {
			return state.userInfo;
		},
		userMobile(state) {
			return state.userMobile;
		},
		token(state) {
			return state.token;
		}
	},
};