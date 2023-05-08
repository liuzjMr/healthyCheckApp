import {
	Order,
	Hospital,
	Combo,
	Record
} from "./appointment/index";

export default class Appointment {
	name = "appointment";

	#api;

	order;
	hospital;
	combo;
	record;

	constructor(api) {
		this.#api = api;

		this.order = new Order(api);
		this.hospital = new Hospital(api);
		this.combo = new Combo(api);
		this.record = new Record(api);

	}
}