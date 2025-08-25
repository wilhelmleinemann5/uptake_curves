export const states = [
  {
    label: 'Button',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    accessibility: true,
  },
  {
    label: 'Button',
    trailingicon: 'star',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    hiddenlabel: true,
    accessibility: true,
  },
  {
    label: 'Link',
    href: 'http://desigsystem.maersk.com',
    accessibility: false,
  },
  {
    label: 'Link',
    icon: 'star',
    href: 'http://desigsystem.maersk.com',
    accessibility: true,
  },
  {
    label: 'Link',
    trailingicon: 'star',
    href: 'http://desigsystem.maersk.com',
    accessibility: false,
  },
  {
    label: 'Link',
    icon: 'star',
    hiddenlabel: true,
    href: 'http://desigsystem.maersk.com',
    accessibility: true,
  },
  // width: full-width
  {
    label: 'Button',
    width: 'full-width',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    width: 'full-width',
    accessibility: false,
  },
  {
    label: 'Button',
    trailingicon: 'star',
    width: 'full-width',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    width: 'full-width',
    hiddenlabel: true,
    accessibility: false,
  },
  // justifyitems: left
  {
    label: 'Button',
    width: 'full-width',
    justifyitems: 'left',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    width: 'full-width',
    justifyitems: 'left',
    accessibility: false,
  },
  {
    label: 'Button',
    trailingicon: 'star',
    width: 'full-width',
    justifyitems: 'left',
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    width: 'full-width',
    justifyitems: 'left',
    accessibility: false,
  },
  // justifyitems: right
  {
    label: 'Button',
    width: 'full-width',
    justifyitems: 'right',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    width: 'full-width',
    justifyitems: 'right',
    accessibility: false,
  },
  {
    label: 'Button',
    trailingicon: 'star',
    width: 'full-width',
    justifyitems: 'right',
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    width: 'full-width',
    justifyitems: 'right',
    accessibility: false,
  },
  // justifyitems: space-between
  {
    label: 'Button',
    width: 'full-width',
    justifyitems: 'space-between',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    width: 'full-width',
    justifyitems: 'space-between',
    accessibility: false,
  },
  {
    label: 'Button',
    trailingicon: 'star',
    width: 'full-width',
    justifyitems: 'space-between',
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    width: 'full-width',
    justifyitems: 'space-between',
    accessibility: false,
  },
  // hover
  {
    label: 'Button',
    hover: true,
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    hover: true,
    accessibility: false,
  },
  // focus
  {
    label: 'Button',
    focus: true,
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    focus: true,
    accessibility: false,
  },
  // active
  {
    label: 'Button',
    active: true,
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    active: true,
    accessibility: false,
  },
  // disabled
  {
    label: 'Button',
    disabled: true,
    accessibility: true,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    disabled: true,
    accessibility: true,
  },
  // other
  {
    label: 'Loading',
    loading: true,
    accessibility: true,
  },
  {
    icon: 'star-solid',
    hiddenlabel: true,
    accessibility: false,
  },
  {
    label: 'Button',
    padding: 'none',
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    padding: 'none',
    accessibility: false,
  },
  {
    label: 'Button',
    padding: 'compact',
    accessibility: false,
  },
  {
    icon: 'star',
    hiddenlabel: true,
    padding: 'compact',
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `<a href="#test">Link as slot</a>`,
      },
    ],
    accessibility: true,
  },
  {
    icon: 'bell',
    hiddenlabel: true,
    slots: [
      {
        name: 'badge',
        content: `<mc-badge slot="badge" label="9" variant="dot" distance="medium" position="top"></mc-badge>`,
      },
    ],
    accessibility: true,
  },
  {
    icon: 'bell',
    hiddenlabel: true,
    slots: [
      {
        name: 'badge',
        content: `<mc-badge slot="badge" label="9" variant="default" distance="medium" position="top"></mc-badge>`,
      },
    ],
    accessibility: true,
  },
  {
    icon: 'bell',
    hiddenlabel: true,
    slots: [
      {
        name: 'badge',
        content: `<mc-badge slot="badge" label="New" variant="default" distance="medium" position="top"></mc-badge>`,
      },
    ],
    accessibility: true,
  },
];
