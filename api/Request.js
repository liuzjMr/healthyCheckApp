export default class Request {
	baseUrl = "";
	beforeRequest;
	afterRequest;
	constructor(options) {
		const {
			baseUrl,
			beforeRequest,
			afterRequest
		} = options;

		Object.assign(this, {
			baseUrl,
			beforeRequest,
			afterRequest,
		});
	}

	request(config) {
		const {
			beforeRequest,
			afterRequest,
			baseUrl
		} = this;

		return this._request(
			Object.assign(config, {
				url: baseUrl + config.url,
				beforeRequest,
				afterRequest,
			})
		);
	}

	get(url, data, config) {
		return this.request(
			Object.assign({
				...config,
				url,
				data,
				method: "GET",
			})
		);
	}

	post(url, data, config) {
		return this.request(
			Object.assign({
				...config,
				url,
				data,
				method: "POST",
			})
		);
	}

	put(url, data, config) {
		return this.request(
			Object.assign({
				...config,
				url,
				data,
				method: "PUT",
			})
		);
	}

	delete(url, data, config) {
		return this.request(
			Object.assign({
				...config,
				url,
				data,
				method: "DELETE",
			})
		);
	}

	_request(params) {
		const {
			beforeRequest,
			method,
			url,
			data,
			afterRequest,
			...config
		} =
		params;

		typeof beforeRequest === "function" && beforeRequest(this);
		return new Promise((resovle, reject) => {
			let weixin = wx;

			if (uni !== void 0) {
				weixin = uni;
			}

			weixin.request(
				Object.assign(config, {
					url,
					method: method ?? "GET",
					data,
					success: (res) => {
						resovle(res);
					},
					fail: (err) => reject(err),
					complete: (res) => {
						typeof afterRequest && afterRequest(res);
					},
				})
			);
		});
	}
}