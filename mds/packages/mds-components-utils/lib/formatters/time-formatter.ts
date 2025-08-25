import { padStart } from '../index';

export const timeFormatter = (value: string, step?: number): [string, string, string] => {
  if (!value.includes(':') || value[2] !== ':') {
    value = value.replace(/[^0-9]/g, '');
    value = [value.slice(0, 2), ':', value.slice(2)].join('');
  }

  const times = value.split(':');
  let hour = +times[0];
  let minute = +times[1];

  if (hour > 23) {
    hour = 23;
  }

  if (hour < 0) {
    hour = 0;
  }

  if (minute > 59) {
    minute = 59;
  }

  if (minute < 0) {
    minute = 0;
  }

  // Round minutes according to step value if provided
  if (step && step > 1) {
    const lowerStep = Math.floor(minute / step) * step;
    const upperStep = Math.ceil(minute / step) * step;
    const midPoint = lowerStep + step / 2;

    if (minute >= midPoint) {
      if (upperStep === 60) {
        hour = (hour + 1) % 24;
        minute = 0;
      } else {
        minute = upperStep;
      }
    } else {
      minute = lowerStep;
    }
  }

  const formattedHour = padStart(hour);
  const formattedMinute = padStart(minute);

  return [`${formattedHour}:${formattedMinute}`, formattedHour, formattedMinute];
};

export const setCurrentTime = (minutestep: number): string | null => {
  const now = new Date();
  const hours = padStart(now.getHours());
  const minutes = padStart(now.getMinutes());
  const [time] = timeFormatter(`${hours}:${minutes}`, minutestep);
  return time;
};
