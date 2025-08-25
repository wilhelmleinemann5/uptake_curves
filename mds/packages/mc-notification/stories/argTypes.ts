import { icon, heading, fit, appearance, eventtype } from '@maersk-global/mds-dev-utils';

export default {
  heading,
  body: {
    name: 'body',
    type: { required: false },
    defaultValue: 'Body text',
    description:
      'Body can be passed as simple argument like: `body="simple text"` or as a default slot: `<mc-notification>body text as HTML</mc-notification>` Use argument style for passing short body text, use named slot when you want to pass body with HTML text',
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
    defaultValue: [
      {
        url: 'https://designsystem.maersk.com',
        label: 'Design System website',
        target: '_blank',
        rel: 'noreferrer noopener',
      },
      {
        url: 'https://www.figma.com/design/uh3Q1w2MFAQNt8g01LN2Om/MDS--UI',
        label: 'Figma library',
        target: '_blank',
        rel: 'noreferrer noopener',
      },
    ],
    description:
      'Actions can be passed as a named slot: `<mc-notification><span slot="actions"><a href="http://designsystem.maersk.com">Action</a></span></mc-notification>` or as an array of link objects: `[{url: "https://designsystem.maersk.com", label: "Design System"}]`. If you want an action link te be opened in a new tab, you can extend just pass extend action link object like: `[{url: "https://designsystem.maersk.com", label: "Design System", target: "_blank", rel: "noreferrer"}]`',
    table: {
      category: 'Content',
      type: { summary: 'array | slot' },
      defaultValue: {
        summary: '[]',
      },
    },
    control: {
      type: 'object',
      value: [
        { url: 'https://designsystem.maersk.com', label: 'Design System' },
        {
          url: 'https://designsystem.maersk.com/more/roadmap',
          label: 'OKRs & Roadmap(opens in a new tab)',
          target: '_blank',
          rel: 'noreferrer noopener',
        },
      ],
    },
  },
  appearance: appearance(['neutral-weak', 'info', 'success', 'warning', 'error'], 'neutral-weak'),
  width: {
    name: 'width',
    type: { required: false },
    defaultValue: '',
    description:
      'Sets the width of the component, otherwise the width of the currently chosen size preset will be used. Remember also to specify the measurement unit i.e. `px`, `%`, `vw`, `fit-content` etc.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  fit,
  icon: icon('icon', '', '', 'string | slot'),
  verticalalign: {
    name: 'verticalalign',
    type: { required: false },
    defaultValue: 'top',
    description: 'Vertical alignment of content within notification',
    table: {
      category: 'Style',
      type: { summary: 'top | middle ' },
      defaultValue: { summary: 'top' },
    },
    options: ['top', 'middle'],
    control: {
      type: 'select',
    },
  },
  actionsposition: {
    name: 'actionsposition',
    type: { required: false },
    defaultValue: 'bottom',
    description: "Position of the actions relative to the notification's content.",
    table: {
      category: 'Style',
      type: { summary: 'bottom | right ' },
      defaultValue: { summary: 'bottom' },
    },
    options: ['bottom', 'right'],
    control: {
      type: 'select',
    },
  },
  closable: {
    name: 'closable',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Actions',
    },
    control: {
      type: 'boolean',
    },
  },
  event: eventtype('close'),
};
