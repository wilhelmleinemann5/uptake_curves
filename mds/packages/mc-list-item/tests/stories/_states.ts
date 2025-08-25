const slots = [
  {
    name: 'default',
    content: `Apple`,
  },
  {
    name: 'sublabel',
    content: `<span slot="sublabel">The sweet variation</span>`,
  },
  {
    name: 'graphic',
    content: `<mc-icon slot="icon" icon="apple"></mc-icon>`,
  },
  {
    name: 'graphic',
    content: `<mc-icon slot="icon" trailingicon="apple"></mc-icon>`,
  },
  {
    name: 'badge',
    content: `<mc-badge display="inline" slot="badge" label="9" variant="default" position="right"></mc-badge>`,
  },
];

export const states = [
  {
    label: 'Apple',
    accessibility: true,
  },
  {
    label: 'Apple',
    sublabel: 'The sweet variation',
    accessibility: true,
  },
  {
    label: 'Apple',
    icon: 'apple',
    accessibility: true,
  },
  {
    label: 'Apple',
    sublabel: 'The sweet variation',
    icon: 'apple',
    accessibility: true,
  },
  {
    label: 'Apple',
    sublabel: 'The sweet variation',
    hiddenlabel: true,
    icon: 'apple',
    accessibility: false,
  },
  {
    label: 'Apple',
    sublabel: 'The sweet variation',
    trailingicon: 'apple',
    accessibility: true,
  },
  {
    slots: [slots[0]],
    accessibility: true,
  },
  {
    slots: [slots[0], slots[1]],
    accessibility: true,
  },
  {
    slots,
    accessibility: true,
  },
  {
    hiddenlabel: true,
    slots,
    accessibility: false,
  },
  {
    disabled: true,
    slots,
    accessibility: true,
  },
  {
    selected: true,
    slots,
    accessibility: false,
  },
];
