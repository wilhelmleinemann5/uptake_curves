export const basePath = (() => {
  // Check if running in a browser environment
  if (typeof window !== 'undefined' && window.location) {
    return window.location.hostname === 'maerskdesignsystemprod.blob.core.windows.net'
      ? `/${window.location.pathname.split('/')[1]}/`
      : '/';
  }
  // Default value when running on server
  return '/';
})();

export default basePath;
