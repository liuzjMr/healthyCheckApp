//由于平台的限制，小程序项目中不支持 axios，而且原生的 wx.request() API 功能较为简单，不支持拦截器等全局定制的功能。
//因此，建议在 uni-app 项目中使用 @escook/request-miniprogram 第三方包发起网络数据请求。

//导入网络请求包
import {
	assign
} from "lodash";
import Request from "./Request";

export default class Api {
	static installed = false;

	#options;
	#http;

	#authed = true;
	#accessToken =
		"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjoibnVsbCIsImV4cCI6MTY4MTk1Njk5Nn0.KPRLG1UxdWYH2yNK_opSDuXJ7B5hTxFbYBp_vU0DelytqDhD1H1Ou5aI1T2-9cYqseiCGWsTcr-g07BiacCyfg";

	static install = (app, options) => {
		if (Api.installed) return;

		const api = new Api(options);

		app.prototype.$api = api;

		Api.installed = true;
	};

	constructor(options) {
		this.#options = options;

		this.#http = new Request({
			baseUrl: options.baseUrl,
			beforeRequest: this._beforeRequest.bind(this),
			afterRequest: this._afterRequest.bind(this),
		});

		this.$request = this.$request.bind(this);
		this.$get = this.$get.bind(this);
		this.$post = this.$post.bind(this);
		this.$put = this.$put.bind(this);
		this.$delete = this.$delete.bind(this);
		this.$paginate = this.$paginate.bind(this);

		if (options.endPoints) {
			this.useEndPoints(options.endPoints);
		}
	}

	async $request(config) {
		try {
			const {
				statusCode,
				data: {
					success,
					msg,
					data
				}
			} = await this.#http.request(config);
			if (statusCode === 200) {
				if (success) {
					return Promise.resolve(data);
				} else {
					return Promise.reject(new Error(msg));
				}
			} else {
				return Promise.reject(new Error(msg));
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	$get(url, data, config) {
		return this.$request(Object.assign({
			...config,
			url,
			data,
			method: "GET"
		}));
	}

	$post(url, data, config) {
		return this.$request(Object.assign({
			...config,
			url,
			data,
			method: "POST"
		}));
	}

	$put(url, data, config) {
		return this.$request(Object.assign({
			...config,
			url,
			data,
			method: "PUT"
		}));
	}

	$delete(url, data, config) {
		return this.$request(Object.assign({
			...config,
			url,
			data,
		}));
	}

	async $paginate(...args) {
		try {
			const {
				records,
				total,
				size: pageSize,
				current: pageNumber,
			} = await this.$get.apply(this, args);

			return Promise.resolve({
				records,
				pagination: {
					total,
					pageSize,
					pageNumber,
				},
			});
		} catch (error) {
			return Promise.reject(error);
		}
	}

	_beforeRequest() {
		uni.showLoading({
			title: "数据加载中...",
		});
	}

	_afterRequest() {
		uni.hideLoading();
	}

	useEndPoints(endPoints) {
		if (Array.isArray(endPoints)) {
			endPoints.forEach((i) => this.useEndPoints(i));
			return this;
		}

		this.addEndPoint(endPoints);
	}

	addEndPoint(EndPoint) {
		const endPoint = new EndPoint(this);

		const name = endPoint.name || EndPoint.name;

		if (Object.prototype.hasOwnProperty.call(this, name)) {
			console.warn(`Api ${name} has been registered`);

			return;
		}

		Object.defineProperty(this, name, {
			value: endPoint,
			enumerable: true,
			configurable: false,
			writable: false,
		});
	}
}