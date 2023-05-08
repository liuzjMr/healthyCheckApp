export default class Combo {
	#api;

	constructor(api) {
		this.#api = api;
	}
	
	//根据套餐id返回套餐详细信息
	getTComboPriceById(params) {
		return this.#api.$get("/tCombo/getTComboPriceById", params);
	}
	
	//根据套餐id返回套餐项目信息
	getComboItemByComboId(params) {
		return this.#api.$get("/tCombo/getComboItemByComboId", params);
	}
	
	//查询所有套餐列表
	queryTComboList(params) {
		return this.#api.$paginate("/tCombo/queryTComboList", params);
	}
	
	
}