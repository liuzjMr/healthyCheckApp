export default class Hospital {
	#api;
	constructor(api) {
		this.#api = api;
	}
	//根据机构id分页查询套餐列表
	list(params) {
		return this.#api.$paginate("/tCheckOrg/findOrgAndCombo", params);
	}
	//根据机构id获取机构和套餐
	getOrgAndCombo(params) {
		return this.#api.$get("/tCheckOrg/findOrgAndCombo", params);
	}
	//根据机构id获得套餐
	getCombo(params) {
		return this.#api.$get("/tCheckOrg/findOrgAndComboById", params);
	}
	//根据机构id查询机构对应体检类型类型的套餐信息
	getOrgAndComboData(params) {
		return this.#api.$get("/tCheckOrg/getOrgAndComboData", params);
	}
	//搜索页面查询机构
	getAllCheckOrg(params) {
		return this.#api.$get("/tCheckOrg/getAllCheckOrg", params);
	}
}