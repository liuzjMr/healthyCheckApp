import { Dayjs } from "dayjs";

export default class Format {
  idcard(val) {
    return `${val}`.replace(/(?<=\d{6})(.*)(?=\w{4})/, (s) =>
      "*".repeat(s.length)
    );
  }

  date(val, format = "YYYY-MM-DD") {
    return Dayjs(val).format(format);
  }
}
