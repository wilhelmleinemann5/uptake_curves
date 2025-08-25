import type { IMcListFilterType } from '@maersk-global/mds-shared-types';
export const matchText = (
  text: string,
  value: string,
  type: IMcListFilterType,
  customfilter?: (text: string, value: string) => string[],
): string[] => {
  if (!text) return [];
  const tempValue = normalizeText(value);
  if (customfilter) {
    return customfilter(text, tempValue);
  }
  if (type === 'startsWith') {
    return Array.from(new Set(text.match(new RegExp(`^${escapeForRegex(tempValue)}`, 'gi'))));
  }
  return Array.from(new Set(text.match(new RegExp(escapeForRegex(tempValue), 'gi'))));
};

export const escapeForRegex = (text: string | undefined): string => {
  return text?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') || '';
};

export const normalizeText = (text: string): string => {
  return text?.toLowerCase() || '';
};
