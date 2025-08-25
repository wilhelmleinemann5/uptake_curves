const trigger = {
  name: 'trigger',
  content:
    '<mc-button style="margin-bottom: 200px" slot="trigger" icon="bars-horizontal" hiddenlabel label="menu" variant="outlined" appearance="neutral" ></mc-button>',
};
export const states = [
  {
    open: true,
    position: 'right-top',
    slots: [
      trigger,
      {
        name: 'default',
        content: `
          <mc-list>
            <mc-list-item label="Apples" sublabel="Fruits"></mc-list-item>
            <mc-list-item label="Apricots" sublabel="Fruits"></mc-list-item>
          </mc-list>`,
      },
    ],
    accessibility: true,
  },
  {
    open: true,
    position: 'right-top',
    slots: [
      trigger,
      {
        name: 'default',
        content: `
          <mc-list>
            <mc-list-item label="Computer" icon="computer"></mc-list-item>
            <mc-list-item label="Printer" icon="printer"></mc-list-item>
          </mc-list>`,
      },
    ],
    accessibility: true,
  },
  {
    open: true,
    position: 'right-top',
    slots: [
      trigger,
      {
        name: 'default',
        content: `
          <mc-list>
            <mc-list-item label="Computer" trailingicon="computer"></mc-list-item>
            <mc-list-item label="Printer" trailingicon="printer"></mc-list-item>
          </mc-list>`,
      },
    ],
    accessibility: false,
  },
  {
    open: true,
    position: 'right-top',
    slots: [
      trigger,
      {
        name: 'default',
        content: `
          <mc-list>
            <mc-list-item label="Computer" icon="computer"></mc-list-item>
            <mc-list-item label="Printer" icon="printer"></mc-list-item>
          </mc-list>`,
      },
    ],
    accessibility: true,
  },
  {
    open: true,
    position: 'right-top',
    slots: [
      trigger,
      {
        name: 'default',
        content: `
          <mc-list>
            <mc-list-item label="Computer" icon="computer"></mc-list-item>
            <mc-list-item label="Printer" icon="printer"></mc-list-item>
          </mc-list>`,
      },
    ],
    accessibility: false,
  },
  {
    open: true,
    position: 'right-top',
    slots: [
      trigger,
      {
        name: 'default',
        content: `
        <mc-list>
          <mc-list-item label="Smiling Face with Hearts"><span slot="icon">🥰</span></mc-list-item>
          <mc-list-item label="Fire"><span slot="icon">🔥</span></mc-list-item>
        </mc-list>`,
      },
    ],
    accessibility: false,
  },
  {
    open: true,
    position: 'right-top',
    slots: [
      trigger,
      {
        name: 'default',
        content: `
          <mc-list>
            <mc-list-item label="Zero"></mc-list-item>
            <mc-list-item disabled label="One"></mc-list-item>
          </mc-list>`,
      },
    ],
    accessibility: false,
  },
];
