import dayjs from 'dayjs/esm/index.js';

export const currentYear = dayjs().year();
export const currentMonthIndex = dayjs().month();
export const currentMonthFormat = currentMonthIndex < 9 ? `0${currentMonthIndex + 1}` : currentMonthIndex + 1;
