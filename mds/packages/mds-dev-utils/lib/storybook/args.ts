import { getIconList } from './icon-list';
import { fruits } from './sample-data';
// IMPORTANT - when adding new const in the file, make sure that the name is all lowercase and they are ordered alphabetically

// A
export const affix = (name: string, description: string, type = 'string'): unknown => ({
  name,
  type: { required: false },
  defaultValue: '',
  description,
  table: {
    category: 'Affix',
    type: { summary: type },
  },
  control: {
    type: 'text',
  },
});

export const appearance = (options: string[], defaultValue: string): unknown => ({
  name: 'appearance',
  type: { required: false },
  defaultValue,
  description: `If not specified, the default value is: <b>${defaultValue}</b>`,
  table: {
    category: 'Style',
    type: {
      summary: options.join('|'),
    },
  },
  options,
  control: {
    type: 'select',
  },
});

export const autocomplete = (defaultValue: string, extraDescription = ''): unknown => ({
  name: 'autocomplete',
  type: { required: false },
  defaultValue,
  description: `The HTML autocomplete attribute lets web developers specify what if any permission the user agent has to provide automated assistance in filling out form field values. The full list of possible values for this attribute are listed on MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete ${extraDescription}`,
  table: {
    category: 'Content',
    type: { summary: 'off | on | name | given-name | family-name | ...' },
    defaultValue: {
      summary: defaultValue,
    },
  },
  control: {
    type: 'text',
  },
});

export const autofocus = (componentName: string): unknown => ({
  name: 'autofocus',
  type: { required: false },
  defaultValue: '',
  description: `Add \`autofocus\` attiribute to an element inside of ${componentName} to set focus on it when ${componentName} is opened`,
  table: {
    category: 'Focus',
    type: { summary: 'attribute' },
  },
  control: {
    type: '',
  },
});

// B

// C
export const checked = {
  name: 'checked',
  type: { required: false },
  defaultValue: false,
  table: {
    category: 'State',
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
  },
  control: {
    type: 'boolean',
  },
};
export const currentindex = (defaultValue = 1, summary = 0): unknown => ({
  name: 'currentindex',
  type: { required: false },
  defaultValue,
  description: 'The index number of the current `active` item. Index starts from 0',
  table: {
    category: 'Content',
    type: { summary: 'number' },
    defaultValue: { summary },
  },
  control: {
    type: 'number',
  },
});
export const customfilter = (category = 'Typeahead'): unknown => ({
  name: 'customfilter',
  type: { required: false },
  defaultValue: null,
  description:
    'Specifies custom match function that should filter the results in the typeahead based on the typed text.',
  table: {
    category,
    type: { summary: 'function' },
  },
  control: {
    type: 'text',
    value: '',
  },
});

// D
export const data = {
  name: 'data',
  type: { required: false },
  defaultValue: fruits,
  description:
    'The data to be displayed as typeahead results. It can be an array of objects`<IMcTypeaheadData>` or as a slot of `<mc-select>` options. You pass pass static data or you can listen to a `search` event to get data from Rest API. If not provided, the typeahead will not display any results.',
  table: {
    category: 'Typeahead',
    type: { summary: 'array | slot' },
  },
  control: {
    type: 'array',
    value: fruits,
  },
};
export const debounce = {
  name: 'debounce',
  type: { required: false },
  defaultValue: '500',
  description:
    'The debounce time in milliseconds after which the `search` event is dispatched. If not provided, the default value of 500 milliseconds will be used.',
  table: {
    category: 'Typeahead',
    type: { summary: 'number' },
    defaultValue: { summary: '500' },
  },
  control: {
    type: 'text',
  },
};
export const disabled = {
  name: 'disabled',
  type: { name: 'boolean', required: false },
  defaultValue: false,
  table: {
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
    category: 'State',
  },
  control: {
    type: 'boolean',
  },
};
export const disablefilter = {
  name: 'disablefilter',
  type: { name: 'boolean', required: false },
  defaultValue: false,
  description:
    'Specifies whether the typeahead should use internal match function to filter the results based on the typed text.',
  table: {
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
    category: 'Typeahead',
  },
  control: {
    type: 'boolean',
  },
};

// E
export const errormessage = (component: string): unknown => ({
  name: 'errormessage',
  type: { required: false },
  defaultValue: '',
  description: `Error message will be shown only if \`invalid\` attribute is set to \`true\`. Error message can be passed as simple argument like: \`errormessage="error"\` or as a named slot: \`\`\`<${component}><span slot="errormessage">error message as HTML</span></${component}>\`\`\` Use argument style for passing short messages, use named slot when you want to pass error message with HTML text`,
  table: {
    type: {
      summary: 'string | slot',
    },
    category: 'Validation',
  },
  control: {
    type: 'text',
  },
});
export const eventtype = (eventtype = 'input', description = '', category = 'Events'): unknown => ({
  name: eventtype,
  type: { required: false, name: 'function' },
  defaultValue: null,
  description: `${description} Check out the \`Code Preview\` panel to see how to use \`${eventtype}\` event within your framework. While interacting with a component in the Storybook, the event will be dispatched and logged in the \`Actions\` panel.`,
  table: {
    category,
    type: { summary: 'event' },
  },
  control: {
    type: 'event',
  },
});

// F
export const filtertype = (category = 'Search'): unknown => ({
  name: 'filtertype',
  type: { required: false },
  defaultValue: 'contains',
  description: `Filter type to be used for filtering the list items. The default value is: \`contains\`, which will filter the list items based on any matching text within the item. 
The other option is: \`startsWith\`, which will filter the items that starts with the matching text.`,
  table: {
    category,
    type: { summary: 'contains | startsWith' },
    defaultValue: { summary: 'contains' },
  },
  options: ['contains', 'startsWith'],
  control: {
    type: 'select',
  },
});

export const fit = {
  name: 'fit',
  type: { required: false },
  defaultValue: 'medium',
  table: {
    category: 'Style',
    type: { summary: 'small | medium | large' },
    defaultValue: { summary: 'medium' },
  },
  options: ['small', 'medium', 'large'],
  control: {
    type: 'select',
  },
};
export const fitextended = (fits: string[]): unknown => ({
  name: 'fit',
  type: { required: false },
  defaultValue: 'medium',
  table: {
    category: 'Style',
    type: { summary: `${fits.join(' | ')}` },
    defaultValue: { summary: 'medium' },
  },
  options: fits,
  control: {
    type: 'select',
  },
});

// G

// H
export const headingWithAttributeAndSlot = {
  name: 'heading',
  type: { required: false },
  defaultValue: 'Heading',
  description: 'No heading will be shown, if attribute, or heading slot is not supplied',
  table: {
    category: 'Content',
    type: { summary: 'string | slot' },
  },
  control: {
    type: 'text',
  },
};

export const heading = {
  name: 'heading',
  type: { required: false },
  defaultValue: 'Heading',
  description: 'No heading will be shown, if attribute is not supplied',
  table: {
    category: 'Content',
    type: { summary: 'string' },
  },
  control: {
    type: 'text',
  },
};
export const hiddenlabel = (category = 'Content'): unknown => ({
  name: 'hiddenlabel',
  type: { required: false },
  defaultValue: false,
  description:
    'If set to `true` or the attribute is just presented without any value, then the label will not appear, but will be used as `aria-label` only',
  table: {
    category,
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
  },
  control: {
    type: 'boolean',
  },
});
export const hiddenlegend = {
  name: 'hiddenlegend',
  type: { name: 'boolean', required: false },
  defaultValue: false,
  description: 'Hides the group legend. The legend text will still be used as aria-label',
  table: {
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
    category: 'Content',
  },
  control: {
    type: 'boolean',
  },
};
export const highlight = {
  name: 'highlight',
  type: { name: 'boolean', required: false },
  defaultValue: false,
  description: 'Specifies whether the matching text should be highlighted in the matched options.',
  table: {
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
    category: 'Typeahead',
  },
  control: {
    type: 'boolean',
  },
};
export const hint = (component: string): unknown => ({
  name: 'hint',
  type: { required: false },
  defaultValue: '',
  description: `Hint can be passed as simple argument like: \`hint="hint text"\` or as a named slot: \`\`\`<${component}><span slot="hint">hint text as HTML</span></${component}>\`\`\` Use argument style for passing short hints, use named slot when you want to pass hint with HTML text`,
  table: {
    category: 'Content',
    type: { summary: 'string | slot' },
  },
  control: {
    type: 'text',
  },
});

export const href = (component: string, initProp?: string): unknown => ({
  name: 'href',
  type: { required: false },
  defaultValue: initProp ? initProp : '',
  description: `Passing a href value will render the ${component} as a HTML anchor element.`,
  table: {
    category: 'Hyperlink',
    type: { summary: 'string' },
  },
  control: {
    type: 'text',
  },
});

// I
export const icon = (
  name = 'icon',
  defaultValue = '',
  initProp = '',
  type = 'string',
  description = 'Name of the icon',
  extraOptions: string[] = [],
): unknown => {
  const icons = getIconList();
  icons.splice(1, 0, ...extraOptions);
  return {
    name: `${name}`,
    type: { required: false },
    defaultValue: initProp ? initProp : defaultValue,
    description,
    table: {
      category: 'Icon',
      type: { summary: `${type}` },
      defaultValue: { summary: defaultValue ? defaultValue : '' },
    },
    options: [...icons],
    control: {
      type: 'select',
    },
  };
};
export const iconposition = {
  name: 'iconposition',
  type: { required: false },
  defaultValue: 'left',
  description: 'Sets the icon to the left or right of the text',
  table: {
    category: 'Icon',
    type: { summary: 'left | right' },
    defaultValue: { summary: 'left' },
  },
  options: ['left', 'right'],
  control: {
    type: 'select',
  },
};
export const id = {
  name: 'id',
  type: { required: false },
  defaultValue: 'field',
  description: 'Id passed to the field and used with label.',
  table: {
    category: 'Content',
    type: { summary: 'string' },
    defaultValue: { summary: 'field' },
  },
  control: {
    type: 'text',
  },
};
export const inputvariant = {
  name: 'variant',
  type: { required: false },
  defaultValue: 'default',
  table: {
    category: 'Style',
    type: { summary: 'default | vanity' },
    defaultValue: { summary: 'default' },
  },
  options: ['default', 'vanity'],
  control: {
    type: 'select',
  },
};
export const invalid = {
  name: 'invalid',
  type: { required: false },
  defaultValue: false,
  description: 'If `true`, the border is red and the `errormessage` can be displayed if provided.',
  table: {
    category: 'Validation',
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
  },
  control: {
    type: 'boolean',
  },
};

// J

// K

// L
export const label = (component: string, defaultValue = 'Label', summary = 'Label'): unknown => ({
  name: 'label',
  type: { required: true },
  defaultValue,
  description: `Label can be passed as a simple argument like: \`label="Label"\` or as a slot. Use argument style for passing short labels, use slot when you want to pass label with HTML text. Label is required attribute as it will be used as aria-label.`,
  table: {
    category: 'Content',
    type: { summary: 'string | slot' },
    defaultValue: { summary },
  },
  control: {
    type: 'text',
  },
});

export const labelposition = {
  name: 'labelposition',
  type: { required: false },
  defaultValue: 'top',
  description:
    'Position of the label. On small screens, label will always appear on top. See examples under input component on how to set label with and align text within the label. ',
  table: {
    category: 'Style',
    type: { summary: 'top | left' },
    defaultValue: {
      summary: 'top',
    },
  },
  options: ['top', 'left'],
  control: {
    type: 'select',
  },
};
export const legend = {
  name: 'legend',
  type: { required: true },
  defaultValue: 'Please select',
  description: 'Fieldset legend has to be passed as a property. Legend is required',
  table: {
    category: 'Content',
    type: { summary: 'string' },
    defaultValue: { summary: 'Legend' },
  },
  control: {
    type: 'text',
  },
};
export const listlabel = {
  name: 'listlabel',
  type: { name: 'string', required: false },
  defaultValue: '',
  description: 'The label text to be displayed above matching options. If not provided, the label will not be shown.',
  table: {
    type: { summary: 'string' },
    category: 'Typeahead',
  },
  control: {
    type: 'text',
  },
};

export const listsearch = {
  name: 'listsearch',
  type: { required: false },
  defaultValue: false,
  description:
    'If set to `true` or the attribute is just presented without any value, then the search box will be visible in the listbox, and user will be able to search and filter list items.',
  table: {
    category: 'Search',
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
  },
  control: {
    type: 'boolean',
  },
};

export const listsearchplaceholder = (category = 'Search'): unknown => ({
  name: 'listsearchplaceholder',
  type: { required: false },
  defaultValue: 'Search in the list',
  description: 'The placeholder text for the search input when listsearch is enabled.',
  table: {
    category,
    type: { summary: 'string' },
    defaultValue: { summary: 'Search in the list' },
  },
  control: {
    type: 'text',
  },
});

export const loading = (component: string, extraDesc: string, category = 'Content'): unknown => ({
  name: 'loading',
  type: { required: false },
  defaultValue: false,
  description: `If set to \`true\`, it'll set the ${component} state to loading and a loading spinner will be shown. ${extraDesc}`,
  table: {
    category: category,
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
  },
  control: {
    type: 'boolean',
  },
});

// M
export const matchlabelonly = (category = 'Typeahead'): unknown => ({
  name: 'matchlabelonly',
  type: { required: false },
  defaultValue: false,
  description:
    'Specifies if internal or custom filter function should match and filter the results in the label text only based on the typed text. Match will not apply to sublabel or value of the data item',
  table: {
    category,
    type: { summary: 'boolean' },
  },
  control: {
    type: 'boolean',
  },
});
export const maxoptions = {
  name: 'maxoptions',
  type: { required: false },
  defaultValue: '10',
  description:
    'The maximum number of options to be displayed in the popover. If not provided, max. 10 options will be displayed. It is recommended not to show more than 10-15 options at a time.',
  table: {
    category: 'Typeahead',
    type: { summary: 'number' },
    defaultValue: { summary: '10' },
  },
  control: {
    type: 'text',
  },
};
export const minchars = {
  name: 'minchars',
  type: { required: false },
  defaultValue: '1',
  description:
    'The minimum number of characters to be typed before the popover is displayed. If not provided, the popover will be displayed after typing 1 character.',
  table: {
    category: 'Typeahead',
    type: { summary: 'number' },
    defaultValue: { summary: '1' },
  },
  control: {
    type: 'text',
  },
};
// N
export const name = (
  defaultValue: string,
  description = 'Name is required if the component is used inside a `form` element',
  required = false,
): unknown => ({
  name: 'name',
  type: { required },
  defaultValue,
  description,
  table: {
    category: 'Form',
    type: { summary: 'string' },
  },
  control: {
    type: 'text',
  },
});
export const nosuggestions = {
  name: 'nosuggestions',
  type: { required: false },
  defaultValue: 'No suggestions found',
  description:
    'The text to be displayed when no results are found. If not provided, the default text "No suggestions found" will be displayed.',
  table: {
    category: 'Typeahead',
    type: { summary: 'string' },
    defaultValue: { summary: 'No suggestions found' },
  },
  control: {
    type: 'text',
  },
};

// O
export const optionswidth = {
  name: 'optionswidth',
  type: { required: false },
  defaultValue: 'trigger',
  description:
    'Specifies the width of the popover. If set to trigger, the width will be set to the width of the select. If set to auto, the popover width will depend on the width of the items inside select. It can be also passed as specific value in CSS units i.e. 200px.',
  table: {
    category: 'Typeahead',
    type: { summary: 'trigger | auto | string' },
    defaultValue: { summary: 'trigger' },
  },
  control: {
    type: 'text',
  },
};
export const optionsheight = {
  name: 'optionsheight',
  type: { required: false },
  defaultValue: '',
  description:
    'Specifies the maximum height of the popover in CSS units i.e. 200px. If not provided, the height will be automatically calculated based on the space available.',
  table: {
    category: 'Typeahead',
    type: { summary: 'string' },
  },
  control: {
    type: 'text',
  },
};
export const orientation = (defaultValue = 'vertical', summary = 'vertical'): unknown => ({
  name: 'orientation',
  type: { required: false },
  defaultValue,
  table: {
    disabled: true,
    category: 'Style',
    type: { summary: 'vertical | horizontal' },
    defaultValue: { summary },
  },
  options: ['vertical', 'horizontal'],
  control: {
    type: 'select',
  },
});

// P
export const padding = {
  name: 'padding',
  type: { required: false },
  defaultValue: 'default',
  description: 'Adjust padding size. For compact look, use `padding="none"`',
  table: {
    category: 'Style',
    type: { summary: 'default | none' },
    defaultValue: { summary: 'default' },
  },
  options: ['default', 'none'],
  control: {
    type: 'select',
  },
};
export const position = (
  positionedComponentName: string,
  defaultValue = 'top-left',
  name = 'position',
  category = 'style',
): unknown => ({
  name: name,
  type: { required: false },
  defaultValue: defaultValue,
  description: `Specifies the position of the ${positionedComponentName} in regards to the target element`,
  table: {
    category,
    type: {
      summary:
        'top-left | top-center | top-right | bottom-left | bottom-center | bottom-right | top-center | top-right | left-top | left-center | left-bottom | right-top | right-center | right-bottom',
    },
    defaultValue: { summary: defaultValue },
  },
  options: [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
  ],
  control: {
    type: 'select',
  },
});
export const placeholder = (
  defaultValue: string,
  description = 'The `placeholder` attribute specifies a short hint that describes the expected value of a field (e.g. a sample value or a short description of the expected format)',
  disableControl = false,
): unknown => ({
  name: 'placeholder',
  type: disableControl ? undefined : { required: false, name: 'string' },
  defaultValue,
  description,
  table: {
    category: 'Content',
    type: { summary: 'string' },
  },
  control: {
    type: 'text',
  },
});

// Q

// R
export const readonly = {
  name: 'readonly',
  type: { name: 'boolean', required: false },
  defaultValue: false,
  table: {
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
    category: 'State',
  },
  control: {
    type: 'boolean',
  },
};
export const rel = {
  name: 'rel',
  type: { required: false },
  defaultValue: '',
  description:
    'The relationship of the linked URL as space-separated <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types" target="_blank">link types</a>.',
  table: {
    category: 'Hyperlink',
    type: { summary: 'string' },
  },
  control: {
    type: 'text',
  },
};
export const required = {
  name: 'required',
  type: { name: 'boolean', required: false },
  defaultValue: false,
  table: {
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
    category: 'Validation',
  },
  control: {
    type: 'boolean',
  },
};

// S
export const sublabel = {
  name: 'sublabel',
  type: { required: false },
  defaultValue: '',
  description:
    'Sublabel can be passed as a simple argument like: `sublabel="Apple"` or as a slot. Use argument style for passing short sublabels, use slot when you want to pass sublabel with HTML text.',
  table: {
    category: 'Content',
    type: { summary: 'string | slot' },
    defaultValue: { summary: false },
  },
  control: {
    type: 'text',
  },
};
// T
export const target = {
  name: 'target',
  type: { required: false },
  defaultValue: '',
  description:
    'Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).',
  table: {
    category: 'Hyperlink',
    type: { summary: 'string' },
  },
  control: {
    type: 'text',
  },
};

// U

// V
export const value = (
  description = 'Pass the value for the input if it is used inside a `form` element',
  type = 'string',
  defaultValue: string | (string | any)[] = '',
): unknown => ({
  name: 'value',
  type: { required: false, name: 'string' },
  defaultValue,
  description,
  table: {
    category: 'Form',
    type: { summary: type },
  },
  control: {
    type: 'text',
  },
});

// W
export const width = (description: string): unknown => ({
  name: 'width',
  type: { required: false },
  defaultValue: 'auto',
  description,
  table: {
    category: 'Style',
    type: { summary: 'auto | number' },
    defaultValue: { summary: 'auto' },
  },
  control: {
    type: 'text',
  },
});
export const widthbutton = (defaultValue = 'auto'): unknown => ({
  name: 'width',
  type: { required: false },
  defaultValue,
  description:
    'Auto width style depends on the text length, full-width style will adjust to the parent container width',
  table: {
    category: 'Style',
    type: { summary: 'auto | full-width' },
    defaultValue: { summary: defaultValue },
  },
  options: ['auto', 'full-width'],
  control: {
    type: 'select',
  },
});

// X

// Y

// Z
export const zindex = (description: string): unknown => ({
  name: 'zindex',
  type: { required: false },
  defaultValue: '99999',
  description,
  table: {
    category: 'Style',
    type: { summary: 'number' },
    defaultValue: { summary: 99999 },
  },
  control: {
    type: 'number',
  },
});

export const autolayoutdisabled = {
  name: 'autolayoutdisabled',
  type: { name: 'boolean', required: false },
  defaultValue: false,
  description:
    "By default, on `small` screens (max-width: 640px), the component's `orientation` is switched to vertical, regardless of the set orientation. However, setting `disabledautolayout` to `true` prevents this and preserves the current `orientation` setting.",
  table: {
    type: { summary: 'boolean' },
    defaultValue: { summary: false },
    category: 'Style',
  },
  control: {
    type: 'boolean',
  },
};

export const locationsAPIConsumerkey = {
  name: 'consumerkey',
  type: { required: true },
  defaultValue: 'TXTj33BjclitXnddaR2L7vryX7EuhMjw',
  description:
    'Adds consumerKey to the location service request. This is required since 2.9.0. To get your own consumer key, please use Stargate for the `synergy-reference-data-locations-proxy` API',
  table: {
    category: 'Content',
    type: { summary: 'string' },
    defaultValue: { summary: '' },
  },
  control: {
    type: 'text',
  },
};

// validation
export const validationState = (name: string, description: string, example = '') => ({
  name,
  type: { required: false },
  defaultValue: false,
  description: `\`True\` if ${description}. Check via \`document.querySelector('mc-input-date').validity.${name}\` or the \`invalid\` event's \`event.target.validity.${name}\`${example}`,
  table: {
    category: 'Validation',
    type: { summary: 'validation state' },
  },
  control: {
    type: '',
  },
});
