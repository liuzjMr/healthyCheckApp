import lodash from 'lodash';
import dayjs from 'dayjs';
import idCard from 'idcard';
import { Validate, Format } from './libs';

export default class Utils {
  lodash = lodash;
  dayjs = dayjs;
  idCard = idCard;

  validate;
  format;

  constructor() {
    this.validate = new Validate();
    this.format = new Format();
  }

  static installed = false;
  static install = (app) => {
    if (this.installed) return;
    const utils = new Utils();

    app.prototype.$utils = utils;

    this.installed = true;
  };

  date(date) {
    return this.dayjs(date);
  }

  formatDate(value, format = 'YYYY-MM-DD') {
    return this.date(value).format(format);
  }

  isSomeDay(d1, d2) {
    return this.formatDate(d1) === this.formatDate(d2);
  }

  formatIDCard(value) {
    return `${value}`.replace(/(?<=\d{6})(.*)(?=\w{4})/, (s) =>
      '*'.repeat(s.length)
    );
  }

  parseWeek(num) {
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    return weeks[num] ? '星期' + weeks[num] : null;
  }
}
