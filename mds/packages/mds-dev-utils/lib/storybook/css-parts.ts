export interface ICssPart {
  name: string;
  example: string;
  description: string;
  backgroundColor?: string;
  color?: string;
  customCode?: string | undefined;
}

const renderExample = (backgroundColor: string, color: string, customCode: string | undefined): string => {
  if (customCode) {
    return `${customCode}`;
  }
  if (backgroundColor && color) {
    return `background-color: ${backgroundColor};
  color: ${color};`;
  }
  if (color && !backgroundColor) {
    return `color: ${color};`;
  }
  if (!color && backgroundColor) {
    return `background-color: ${backgroundColor};`;
  }
  return '';
};

export const cssPart = (
  cssPartName: string,
  componentName: string,
  affectedComponentPart: string,
  backgroundColor = '#00897A',
  color = '#AAEAE0',
  customCode = undefined
): ICssPart => ({
  name: cssPartName,
  example: `${componentName}::part(${cssPartName}) {
  ${renderExample(backgroundColor, color, customCode)}
}`,
  description: `Using this CSS part you can change the look of the ${affectedComponentPart}. Check <b>Examples -> Customised appearance</b> story to see live example.`,
});
