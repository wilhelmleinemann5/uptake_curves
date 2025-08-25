export const padStart = (value: number | string, maxlength = 2): string => {
  value = value ? value : 0;
  return String(value).padStart(maxlength, '0');
};
