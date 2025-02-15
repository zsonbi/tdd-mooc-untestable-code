const millisPerDay = 1000 * 60 * 60 * 24;

export class DateWrapper extends Date {
  static fixedDate = null;

  constructor(...args) {
    if (args.length === 0 && DateWrapper.fixedDate) {
      super(DateWrapper.fixedDate);
    } else {
      super(...args);
    }
  }

  static setFixedDate(date) {
    DateWrapper.fixedDate = date.getTime();
  }

  static clearFixedDate() {
    DateWrapper.fixedDate = null;
  }
}

export function daysUntilChristmas() {
  const now = new DateWrapper();
  const today = new DateWrapper(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new DateWrapper(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new DateWrapper().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
