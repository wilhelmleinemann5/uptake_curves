import { autofocus, eventtype, fitextended } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  position: {
    name: 'position',
    type: { required: false },
    defaultValue: 'right',
    description: 'The position of the drawer.',
    table: {
      category: 'Style',
      type: { summary: 'select' },
      defaultValue: { summary: 'right' },
    },
    options: ['left', 'right', 'top', 'bottom'],
    control: {
      type: 'select',
    },
  },
  customsize: {
    name: 'customsize',
    type: { required: false },
    defaultValue: '',
    description: `Sets the custom size of the drawer.
    If the position is set to <b>left</b> or <b>right</b>, the width will be adjusted.
    If the position is set to <b>top</b> or <b>bottom</b>, the height will be adjusted.
    You can also set the custom size for different breakpoints by passing an object with the breakpoint sizes i.e.


    {
    xs: '100%',
    sm: '400px',
    md: '500px',
    lg: '600px',
    xl: '50%'
    }

    `,
    table: {
      category: 'Style',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    control: {
      type: 'text',
    },
  },
  dimension: {
    name: 'dimension',
    type: { required: false },
    defaultValue: 'medium',
    description: `The dimension of the drawer.
    The dimension depends on the position of the drawer and are as follows:
    \nsmall:
    \n- left: \`width: 320px, height: 100dvh\`
    \n- right: \`width: 320px, height: 100dvh\`
    \n- top: \`height: 320px, width: 100dvw\`
    \n- bottom: \`height: 320px, width: 100dvw\`

\nmedium:
    \n- left: \`width: 480px, height: 100dvh\`
    \n- right: \`width: 480px, height: 100dvh\`
    \n- top: \`height: 480px, width: 100dvw\`
    \n- bottom: \`height: 480px, width: 100dvw\`

\nlarge:
    \n- left: \`width: 800px, height: 100dvh\`
    \n- right: \`width: 800px, height: 100dvh\`
    \n- top: \`height: 800px, width: 100dvw\`
    \n- bottom: \`height: 800px, width: 100dvw\``,
    table: {
      category: 'Style',
      type: { summary: 'select' },
      defaultValue: { summary: 'medium' },
    },
    options: ['small', 'medium', 'large'],
    control: {
      type: 'select',
    },
  },
  fit: fitextended(['small', 'medium']),
  nonmodal: {
    name: 'nonmodal',
    type: { required: false },
    defaultValue: false,
    description: 'If true, the drawer will open as a non-modal drawer, allowing page interaction.',
    table: {
      category: 'Style',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  nopadding: {
    name: 'nopadding',
    type: { required: false },
    defaultValue: false,
    description: 'If true, the drawer content will have no padding.',
    table: {
      category: 'Style',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  disablestickyfooter: {
    name: 'disablestickyfooter',
    type: { required: false },
    defaultValue: false,
    description: 'Disables the sticky footer when scrolling content.',
    table: {
      category: 'Content',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  open: {
    name: 'open',
    type: { required: false },
    defaultValue: false,
    description: 'Opens the drawer.',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  backdropcloseactiondisabled: {
    name: 'backdropcloseactiondisabled',
    type: { required: false },
    defaultValue: false,
    description: 'Disables closing the drawer when clicking outside of it.',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  autofocus: autofocus('drawer'),
  closed: eventtype(
    'closed',
    'Fired when the dialog is closed. You can find the action that closed the drawer in the <code>event.detail.action</code>.',
  ),
  closing: eventtype(
    'closing',
    'Fired when the drawer is closing. Closing event can be useful if you want to run extra code before closing the drawer or prevent the drawer from being closed when the confirm/cancel buttons are pressed. You can find the action that is closing the drawer in the <code>event.detail.action</code>.',
  ),
  opened: eventtype('opened', 'Fired when the drawer is opened.'),
  opening: eventtype(
    'opening',
    'Fired when the drawer is opening. Opening event can be useful if you want to run extra code before opening the drawer or prevent the drawer from being opened.',
  ),
  click: eventtype('click', 'Fired when clicked on the dialogaction button within a drawer.'),
};
