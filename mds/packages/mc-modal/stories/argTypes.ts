import {
  eventtype,
  headingWithAttributeAndSlot,
  zindex,
  fitextended,
  padding,
  autofocus,
} from '@maersk-global/mds-dev-utils';

export default {
  heading: headingWithAttributeAndSlot,
  body: {
    name: 'body',
    type: { required: false },
    defaultValue:
      '<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p>',
    description: 'Body should be provided as the default slot i.e.:`<mc-modal>rich text</mc-modal>`',
    table: {
      category: 'Content',
      type: { summary: 'slot' },
    },
    control: {
      type: 'text',
    },
  },
  hiddenclose: {
    name: 'hiddenclose',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description: 'Hides the close button.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Content',
    },
    control: {
      type: 'boolean',
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
    control: { type: null },
  },
  footer: {
    name: 'footer',
    type: { required: false },
    defaultValue: '',
    description:
      'There is a slot for additional content to be included in the footer. You can pass into this slot i.e.: instructions or disclaimer, like: ```<div slot="footer">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>```',
    table: {
      category: 'Content',
      type: { summary: 'slot' },
    },
    control: { type: null },
  },
  fit: fitextended(['small', 'medium']),
  dimension: {
    name: 'dimension',
    type: { required: false },
    defaultValue: 'medium',
    description: `On the small screens modal will be shown in full-screen size, regardless of the modal dimension (for small dimension the break point is below \`700px\`, for medium and large dimension - it is  below \`800px\`).
      \nThe specifications of each size preset are as below:
      \n- small: \`width: 400px\`, \`height: 225px\` 
      \n- medium: \`width: 800px\`, \`height: 400px\` 
      \n- large: \`width: 1200px\`, \`height: 600px\``,
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
  padding,
  width: {
    name: 'width',
    type: { required: false },
    defaultValue: '',
    description:
      'Sets the width of the component, otherwise the width of the currently chosen size preset will be used. Remember also to specify the measurement unit i.e. `px`, `%` or `vw`, etc.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  height: {
    name: 'height',
    type: { required: false },
    defaultValue: '',
    description:
      'Sets the height of the component, otherwise the height of the currently chosen size preset will be used. Remember also to specify the measurement unit i.e. `px`, `%` or `vh`, etc.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  zindex: zindex('Should only be set if two modal are supposed to be shown on top of each other'),
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
  backdropcloseactiondisabled: {
    name: 'backdropcloseactiondisabled',
    type: { required: false },
    defaultValue: false,
    description: 'This attribute should be added only if clicking on the backdrop (scrim) must not close the modal',
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
    description: 'This attribute should be added only if pressing the `Escape` must not close the modal',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  entercloseactiondisabled: {
    name: 'entercloseactiondisabled',
    type: { required: false },
    defaultValue: false,
    description: 'This attribute should be added only if pressing the `Enter` must not close the modal',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  autofocus: autofocus('modal'),
  closed: eventtype(
    'closed',
    'Fired when the modal is closed. You can find the action that closed the modal in the <code>event.detail.action</code>.',
  ),
  closing: eventtype(
    'closing',
    'Fired when the modal is closing. Closing event can be useful if you want to run extra code before closing the modal or prevent the modal from being closed when the confirm/cancel buttons are pressed. You can find the action that is closing the modal in the <code>event.detail.action</code>.',
  ),
  opened: eventtype('opened', 'Fired when the modal is opened.'),
  opening: eventtype(
    'opening',
    'Fired when the modal is opening. Opening event can be useful if you want to run extra code before opening the modal or prevent the modal from being opened.',
  ),
  click: eventtype('click', 'Fired when clicked on the primaryAction/secondaryAction button within a modal.'),
};
