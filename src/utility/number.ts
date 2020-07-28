export function isNumeric(value: any) {
  return !isNaN(value);
}

export function toNumber(value: any) {
  if (Number.isSafeInteger(value)) {
    return Number.parseInt(value, 10);
  } else {
    return Number.parseFloat(value);
  }
}
