export const isCdn = (): boolean => {
  const script = document.querySelector('script[src^="https://assets.maerskline.com/mds/"]') as HTMLScriptElement;
  if (script) {
    if ((script as HTMLScriptElement).src.startsWith('https://assets.maerskline.com/mds/')) {
      return true;
    }
    return false;
  }
  return false;
};
