import { isServer } from 'lit';
export const setHostCssClass = (hostClassList: DOMTokenList, cssClassNames: string[]): string => {
  // In SSR cases it's possible that the hostClassList will be undefined as it's not coming through in the Element shim
  // In this case, there's nothing to check against in the host list, so the answer will always be empty string
  if (!hostClassList || isServer) {
    return '';
  }
  return cssClassNames.reduce((prev, current) => `${prev} ${hostClassList.contains(current) ? current : ''}`, '');
};
