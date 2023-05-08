export default class Order {
	#api;
	constructor(api) {
		this.#api = api;
	}

	/**
	 * 获取套餐预约信息
	 * @param {*} params
	 * @returns
	 */
	getAppointmentInfo(params) {
		return this.#api.$get(
			"/orderSetting/getOrderSettingInfoByOrderDate",
			params
		);
	}

	/**
	 * 新增健康预约体检人员信息和体检项目信息
	 * @param {*} model
	 * @returns
	 */
	saveOrUpdatePersonInfo(model) {
		return this.#api.$post("/tCheckOrg/saveOrUpdatePersonInfo", model);
	}

	/**
	 * 新增从业体检预约订单数据
	 * @param {*} model
	 * @returns
	 */
	addPracticeTGroupOrder(model) {
		return this.#api.$post("/tCheckOrg/addPracticeTGroupOrder", model);
	}

	/**
	 * 新增职业体检预约体检人员信息和体检项目信息
	 * @param {*} model
	 * @returns
	 */
	saveOrUpdateCareerPersonInfo(model) {
		return this.#api.$post("/tCheckOrg/saveOrUpdateCareerPersonInfo", model);
	}
}