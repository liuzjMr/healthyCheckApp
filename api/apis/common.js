export default class Common {
	name = "common"
	#api;
	constructor(api) {
		this.#api = api;
	}

	//获取字典
	getDictByType(type) {
		return this.#api.$get(`/dictData/getByType/${type}`);
	}

	//获取字典类型作为选择数据
	async getDictAsOptions(type) {
		const res = await this.getDictByType(type);

		return res.map((i) => ({
			label: i.title,
			value: i.value,
		}));
	}
}