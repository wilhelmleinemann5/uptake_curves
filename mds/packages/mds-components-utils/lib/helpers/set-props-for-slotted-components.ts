export const setPropsForSlottedComponents = (elements: HTMLElement[], prop: string, value: string | boolean): void => {
  if (prop && elements && elements.length !== 0) {
    for (const element of elements) {
      (element as any)[prop] = value;
    }
  }
};
