export default class Record {
	#api;

	constructor(api) {
		this.#api = api;
	}

	//查询该手机号下的预约记录
	getOrderRecordInfoListByMobile(params) {
		return this.#api.$get("/tOrderRecord/getOrderRecordInfoListByMobile", params);
	}

	//根据订单id查询预约记录
	getOrderRecordInfoByOrderId(params) {
		return this.#api.$get("/tOrderRecord/getOrderRecordInfoByOrderId", params);
	}

}