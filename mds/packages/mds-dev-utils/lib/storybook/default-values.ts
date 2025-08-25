export const getDefaultValues = (argTypes: any) =>
  Object.entries(argTypes)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]: [string, any]) => value.defaultValue !== undefined)
    .reduce((acc, [key, value]: [string, any]) => ({ ...acc, [key]: value.defaultValue }), {});

export const getDefaultValuesFromTable = (argTypes: Record<string, any>) =>
  Object.entries(argTypes)
    .filter(([, value]) => value.table?.defaultValue?.summary !== undefined)
    .reduce((acc, [key, value]) => {
      try {
        return { ...acc, [key]: JSON.parse(value.table?.defaultValue?.summary as string) };
      } catch (e) {
        return { ...acc, [key]: value.table?.defaultValue?.summary as string };
      }
    }, {});
