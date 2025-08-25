type SlotType = 'default' | 'named';
export interface ISlot {
  name: string;
  type: SlotType;
  example: string;
  description: string;
}

const renderExample = (name: string, type: SlotType, example: string, customHtmlTag = false): string => {
  if (type === 'named') {
    if (customHtmlTag) {
      return example;
    }
    return `<span slot="${name}">
    ${example}
  </span>`;
  }
  return `${example}`;
};

export const getSlot = (
  name: string,
  type: SlotType,
  componentName: string,
  example: string,
  description: string,
  examples = 'Examples',
  customHtmlTag = false,
): ISlot => ({
  name,
  type,
  example: `<${componentName}>
  ${renderExample(name, type, example, customHtmlTag)}
</${componentName}>`,
  description: `Use the ${name}${
    type === 'named' ? ' named' : ''
  } slot, ${description}. Check stories under <b>${examples}</b> folder to see live example.`,
});

export const labelSlot = (componentName: string, type: SlotType = 'default'): ISlot =>
  getSlot(
    type === 'default' ? 'default' : 'label',
    type === 'default' ? 'default' : 'named',
    componentName,
    'Label as HTML',
    'when you want to pass the label as HTML',
  );

export const subLabelSlot = (componentName: string): ISlot =>
  getSlot('sublabel', 'named', componentName, 'Sub-label as HTML', 'when you want to pass the legend as HTML');

export const legendSlot = (componentName: string): ISlot =>
  getSlot('legend', 'named', componentName, 'Legend as HTML', 'when you want to pass the legend as HTML');

export const hintSlot = (componentName: string): ISlot =>
  getSlot('hint', 'named', componentName, 'Hint as HTML', 'when you want to pass the hint as HTML');

export const errorMessageSlot = (componentName: string): ISlot =>
  getSlot(
    'errormessage',
    'named',
    componentName,
    'Error message as HTML',
    'when in invalid state, you want to pass the error message as HTML',
  );

export const iconSlot = (componentName: string): ISlot =>
  getSlot(
    'icon',
    'named',
    componentName,
    `<img src="your-img-src" width="20" height="20" />`,
    'if  a custom graphic, pictogram, etc. should be used, instead of using MDS icons',
  );

export const trailingIconSlot = (componentName: string): ISlot =>
  getSlot(
    'trailingicon',
    'named',
    componentName,
    `<img src="your-img-src" width="20" height="20" />`,
    'if  a custom graphic, pictogram, etc. should be used, instead of using MDS icons',
  );

export const popoverTriggerSlot = (componentName: string): ISlot =>
  getSlot(
    'default',
    'default',
    componentName,
    `<span>
    Content as HTML
  </span>`,
    'to supply the HTML content',
  );

export const popoverDefaultSlot = (componentName: string): ISlot =>
  getSlot(
    'trigger',
    'named',
    componentName,
    `<mc-button slot="trigger">Click here!</mc-button>`,
    'to specify the element which toggles the popover',
  );

export const getModalActionSlot = (
  name: string,
  type: SlotType,
  componentName: string,
  example: string,
  description: string,
): ISlot => ({
  name,
  type,
  example: `<${componentName}>
  ${renderExample(name, type, example, true)}
</${componentName}>`,
  description: `Use the ${name}${
    type === 'named' ? ' named' : ''
  } slot, ${description}. Check stories under <b>Examples</b> folder to see live example.`,
});

export const fileStatusHint = (componentName: string): ISlot =>
  getSlot(
    'hint-{fileName}.{extension}',
    'named',
    componentName,
    'Hint as HTML',
    'when you want to pass the hint as HTML under a specific file name',
  );

export const fileStatusErrorMessage = (componentName: string): ISlot =>
  getSlot(
    'error-{fileName}.{extension}',
    'named',
    componentName,
    'Error as HTML',
    'when you want to pass the error as HTML under a specific file name',
  );

export const badgeSlot = (componentName: string, description: string): ISlot => ({
  name: 'badge',
  type: 'named',
  example: `<${componentName}>
  <mc-badge 
    slot="badge" 
    label="99" 
    variant="error">
  </mc-badge>
</${componentName}>`,
  description: `Use the badge slot, ${description}. Check stories under badge <b>Examples</b> folder to see live example.`,
});
