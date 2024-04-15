import moment from "moment";

function elapsed(date: string): string {
  const now = moment(new Date());
  const end = moment(Number(date));
  const duration = moment.duration(now.diff(end));
  return duration.humanize()
};

function dateToString(time: number): string {
  return moment(time).toString();
};

export { elapsed, dateToString };
