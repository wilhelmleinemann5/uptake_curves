export const supportsDynamicImport = (): boolean => {
  try {
    new Function('import("")');
    return true;
  } catch (err) {
    return false;
  }
};

export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isIOS = (): boolean => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};
