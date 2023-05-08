export default {
	namespaced: true,
	state() {
		return {
			info: null,
		};
	},
	mutations: {
		SET_INFO(state, info) {
			state.info = info;
		},
	},
	actions: {
		setInfo({
			commit
		}, info) {
			commit("SET_INFO", info);
		},
	},
	getters: {
		info(state) {
			return state.info;
		},
	},
};