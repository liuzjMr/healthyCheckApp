export default {
	namespaced: true,
	state() {
		return {
			availableDays: 8,
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
		id(state) {
			return state.info?.id;
		},
		availableDays(state) {
			return state.availableDays;
		},
	},
};
