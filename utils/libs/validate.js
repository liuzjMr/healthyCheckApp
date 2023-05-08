import idcard from "idcard";

export default class Validate {
	tel(val) {
		return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(
			val
		);
	}

	idCard(val) {
		return idcard.verify(val);
	}

	deptCreditCode(val) {
		return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(val)
	}
}
