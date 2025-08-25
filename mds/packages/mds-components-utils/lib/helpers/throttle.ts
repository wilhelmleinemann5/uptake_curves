import { CallBackType } from './callback';

export const throttle = (context: unknown, callback: CallBackType, delay: number): CallBackType => {
  let timeoutId: number | null;
  return (...args) => {
    if (timeoutId == null) {
      timeoutId = setTimeout(() => {
        callback.apply(context, args);
        timeoutId = null;
      }, delay) as unknown as number;
    }
  };
};
