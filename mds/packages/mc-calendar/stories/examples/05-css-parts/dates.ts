import dayjs from 'dayjs/esm/index.js';
const styledDays = [
  dayjs().add(1, 'day').format('YYYY-MM-DD'),
  dayjs().add(2, 'day').format('YYYY-MM-DD'),
  dayjs().add(3, 'day').format('YYYY-MM-DD'),
  dayjs().add(4, 'day').format('YYYY-MM-DD'),
];
export const customstyles = styledDays.map((date) => `mc-button[data-date='${date}']::part(button)`);
