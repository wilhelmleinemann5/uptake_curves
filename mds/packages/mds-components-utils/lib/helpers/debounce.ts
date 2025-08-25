import { CallBackType } from './callback';

export const debounce = (context: unknown, callback: CallBackType, delay = 0): CallBackType => {
  let timeoutId: number | null;
  return (...args) => {
    clearTimeout(timeoutId as unknown as number);
    timeoutId = setTimeout(() => {
      callback.apply(context, args);
    }, delay) as unknown as number;
  };
};
