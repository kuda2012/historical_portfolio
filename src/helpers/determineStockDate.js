import moment from "moment";

export function determineStockDate(weekDayNumber) {
  // Always use the previous day's date for the stock data
  // If today is Monday, use Friday's date
  // If today is Sunday, use Friday's date
  // If today is Saturday, use Friday's date
  // If today is Tuesday, use Monday's date
  if (weekDayNumber === 0) {
    return 2;
  } else if (weekDayNumber === 1) {
    return 3;
  } else {
    return 1;
  }
}
