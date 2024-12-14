export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
