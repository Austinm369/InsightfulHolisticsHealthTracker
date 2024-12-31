export function formatDate(date) {
  return date.getDate();
}

export function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getStartDateOfWeek(weekNumber, year) {
  const date = new Date(year, 0, 1);
  date.setDate(date.getDate() + (weekNumber - 1) * 7);
  return date;
}