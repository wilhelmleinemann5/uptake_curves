import { eventtype, headingWithAttributeAndSlot, fitextended, zindex, autofocus } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  heading: headingWithAttributeAndSlot,
  body: {
    name: 'body',
    type: { required: false },
    defaultValue: 'A question prompting the user to make a decision?',
    description:
      'Body can be provided as the default slot i.e.:`<mc-dialog>rich text</mc-dialog>` or as a string attribute.',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
    },
    control: {
      type: 'text',
    },
  },
  actions: {
    name: 'actions',
    type: { required: false },
    defaultValue: '',
    description:
      'There are two named slots available: `primaryAction` & `secondaryAction`. You can pass into those i.e.: confirm or cancel action, like: ```<mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>``` or ```<mc-button slot="secondaryAction" dialogaction="cancel">Cancel</mc-button>``` For more details on usage, please look at code snippet in the example above',
    table: {
      category: 'Content',
      type: { summary: 'slot' },
    },
    control: { type: 'obejct' },
  },
  fit: fitextended(['small', 'medium']),
  dimension: {
    name: 'dimension',
    type: { required: false },
    defaultValue: 'medium',
    description: `On the small screens dialog will be shown in full-screen size, regardless of the dialog dimension.
      \nThe specifications of each size preset are as below:
      \n- small: \`width: 320px, height: auto\` 
      \n- medium: \`width: 480px, height: auto\` 
      \n- large: \`width: 800px, height: auto\``,
    table: {
      category: 'Style',
      type: { summary: 'small | medium | large' },
      defaultValue: { summary: 'medium' },
    },
    options: ['small', 'medium', 'large'],
    control: {
      type: 'select',
    },
  },
  width: {
    name: 'width',
    type: { required: false },
    defaultValue: '',
    description: `Sets the width of the component.
    You can also set the width for different breakpoints by passing an object with the breakpoint sizes i.e.

    { 
    xs: '100%',
    sm: '400px',
    md: '500px',
    lg: '600px',
    xl: '700px' 
    }

    
    Remember also to specify the measurement unit i.e. \`px\`, \`%\` or \`vw\`, etc.`,
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  zindex: zindex('Should only be set if two dialogs are supposed to be shown on top of each other'),
  open: {
    name: 'open',
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
  },
  escapecloseactiondisabled: {
    name: 'escapecloseactiondisabled',
    type: { required: false },
    defaultValue: false,
    description: 'Disables the `Escape` key from closing the dialog.',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  nonmodal: {
    name: 'nonmodal',
    type: { required: false },
    defaultValue: false,
    description: 'If true, the dialog will open as a non-modal dialog, allowing page interaction.',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  nopadding: {
    name: 'nopadding',
    type: { required: false },
    defaultValue: false,
    description: 'If true, the dialog content will have no padding.',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  disablestickyfooter: {
    name: 'disablestickyfooter',
    type: { required: false },
    defaultValue: false,
    description: 'If true, the dialog footer will not be sticky.',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  autofocus: autofocus('dialog'),
  closed: eventtype(
    'closed',
    'Fired when the dialog is closed. You can find the action that closed the dialog in the <code>event.detail.action</code>.',
  ),
  closing: eventtype(
    'closing',
    'Fired when the dialog is closing. Closing event can be useful if you want to run extra code before closing the dialog or prevent the dialog from being closed when the confirm/cancel buttons are pressed. You can find the action that is closing the dialog in the <code>event.detail.action</code>.',
  ),
  opened: eventtype('opened', 'Fired when the dialog is opened.'),
  opening: eventtype(
    'opening',
    'Fired when the dialog is opening. Opening event can be useful if you want to run extra code before opening the dialog or prevent the dialog from being opened.',
  ),
  click: eventtype('click', 'Fired when clicked on the primaryAction/secondaryAction button within a dialog.'),
};
