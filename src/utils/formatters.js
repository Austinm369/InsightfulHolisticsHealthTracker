export function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export function formatUnit(value, unit) {
  return `${formatNumber(value)} ${unit}`;
}