export default {
	//开启了命名空间
	namespaced: true,

	state() {
		return {
			//当前选择的体检类型 健康体检 从业体检 职业体检
			currentCate: "健康体检",
			//当前选择医院id
			currentHospital: "",
			//当前选择的预约类型 0是个人预约 1是单位预约
			currentType: 0,
			//当前选择套餐id
			currentPakeage: "",
			//当前选择项目
			currentItem: "",
			//当前体检人信息
			personInfo: "",
			//当前填写单位名字
			groupUnitId: "",
			//当前填写单位信用代码
			groupUnitName: "",

			//多选套餐标记
			groupPakeageFlag: false,
			//多选套餐id
			groupPakeage: [],
		};
	},

	mutations: {
		SET_CURRENTCATE(state, currentCate) {
			state.currentCate = currentCate;
		},
		SET_CURRENTHOSPITAL(state, currentHospital) {
			state.currentHospital = currentHospital;
		},
		SET_CURRENTTYPE(state, currentType) {
			state.currentType = currentType;
		},
		SET_CURRENTPAKEAGE(state, currentPakeage) {
			state.currentPakeage = currentPakeage;
		},
		SET_CURRENTITEM(state, currentItem) {
			state.currentItem = currentItem;
		},
		SET_PERSONINFO(state, personInfo) {
			state.personInfo = personInfo;
		},
		SET_GROUPUNITID(state, groupUnitId) {
			state.groupUnitId = groupUnitId;
		},
		SET_GROUPUNITNAME(state, groupUnitName) {
			state.groupUnitName = groupUnitName;
		},
		SET_GROUPPAKEAGEFLAG(state, groupPakeageFlag) {
			state.groupPakeageFlag = groupPakeageFlag;
		},
		SET_GROUPPAKEAGE(state, groupPakeage) {
			state.groupPakeage = groupPakeage;
		},

	},

	actions: {
		setCurrentCate({
			commit
		}, info) {
			commit("SET_CURRENTCATE", info);
		},
		setCurrentHospital({
			commit
		}, info) {
			commit("SET_CURRENTHOSPITAL", info);
		},
		setCurrentType({
			commit
		}, info) {
			commit("SET_CURRENTTYPE", info);
		},
		setCurrentPakeage({
			commit
		}, info) {
			commit("SET_CURRENTPAKEAGE", info);
		},
		setCurrentItem({
			commit
		}, info) {
			commit("SET_CURRENTITEM", info);
		},
		setPersonInfo({
			commit
		}, info) {
			commit("SET_PERSONINFO", info);
		},
		setGroupUnitId({
			commit
		}, info) {
			commit("SET_GROUPUNITID", info);
		},
		setGroupUnitName({
			commit
		}, info) {
			commit("SET_GROUPUNITNAME", info);
		},
		setGroupPakeageFlag({
			commit
		}, info) {
			commit("SET_GROUPPAKEAGEFLAG", info);
		},
		setGroupPakeage({
			commit
		}, info) {
			commit("SET_GROUPPAKEAGE", info);
		},
	},

	getters: {
		currentCate(state) {
			return state.currentCate;
		},
		currentType(state) {
			return state.currentType;
		},
		currentPakeage(state) {
			return state.currentPakeage;
		},
		groupPakeage(state) {
			return state.groupPakeage;
		},
		groupPakeageFlag(state) {
			return state.groupPakeageFlag;
		}
	},
};