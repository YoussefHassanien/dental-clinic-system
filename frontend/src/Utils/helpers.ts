export const combineCountryCodeWithPhoneNumber = (
  countryCode: string,
  phoneNumber: string
): string => {
  return countryCode + phoneNumber;
};

export const combineDate = (
  day: string,
  month: string,
  year: string
): string => {
  const monthNumber = parseInt(month, 10);
  const stringMonthNumber =
    monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
  const stringDay = parseInt(day, 10) < 10 ? `0${day}` : day;
  return `${year}-${stringMonthNumber}-${stringDay}`;
};
