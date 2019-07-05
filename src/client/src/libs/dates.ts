
export function isDateToday(date: Date) {
  const today = new Date();
  if(
    today.getDay() === date.getDay() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return true;
  }

  return false;
}
