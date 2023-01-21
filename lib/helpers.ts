
export function asDay(date: string) {
  const day = new Date(date).getDate().toString();
  return day.padStart(2, "0");
}

export function asMonth(date: string) {
  return new Date(date).toLocaleString("en-us", { month: "short" }).toString();
}

export function asYear(date: string) {
  return new Date(date).getFullYear().toString();
}

export function isDateBeforeToday(date: Date) {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}
