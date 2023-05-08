export default class User {
	name = "user";
	#api;
	constructor(api) {
		this.#api = api;
	}

	sendMsm(phone) {
		this.#api.$get(`/user/sendMsm`, {
			phone
		});
	}

	//登录
	login(params) {
		return this.#api.$post("/user/appLogin", params, {
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
	}
}