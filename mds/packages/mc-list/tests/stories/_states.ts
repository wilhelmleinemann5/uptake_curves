import { IComponentState } from '@maersk-global/mds-dev-utils';

export const getStatesByOrientation = (orientation: string): IComponentState[] => [
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Apple" sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Apricot" sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Artichoke" sublabel="Vegetable"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Computer" icon="computer"></mc-list-item>
          <mc-list-item label="Printer" icon="printer"></mc-list-item>
          <mc-list-item label="File" icon="file"></mc-list-item>
          <mc-list-item label="Folder" icon="folder-open"></mc-list-item>
          <mc-list-item label="Office" icon="office-2"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item trailingicon="computer" label="Computer"></mc-list-item>
          <mc-list-item trailingicon="printer" label="Printer"></mc-list-item>
          <mc-list-item trailingicon="file" label="File"></mc-list-item>
          <mc-list-item trailingicon="folder-open" label="Folder"></mc-list-item>
          <mc-list-item trailingicon="office-2" label="Office"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item icon="computer" trailingicon="computer" label="Computer"></mc-list-item>
          <mc-list-item icon="printer" trailingicon="printer" label="Printer"></mc-list-item>
          <mc-list-item icon="file" trailingicon="file" label="File"></mc-list-item>
          <mc-list-item icon="folder-open" trailingicon="folder-open" label="Folder"></mc-list-item>
          <mc-list-item icon="office-2" trailingicon="office-2" label="Office"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Apples" sublabel="Fruits"></mc-list-item>
          <mc-list-item label="Apricots" sublabel="Fruits"></mc-list-item>
          <mc-list-item label="Artichokes" sublabel="Vegetables"></mc-list-item>
          <hr />
          <mc-list-item label="Carrots" sublabel="Vegetables"></mc-list-item>
          <hr />
          <mc-list-item label="Cherries" sublabel="Fruits"></mc-list-item>
          <mc-list-item label="Onions" sublabel="Vegetables"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <small>Fruits</small>
          <mc-list-item label="Apple" sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Apricot" sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Artichoke" sublabel="Vegetable"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    noborder: true,
    slots: [
      {
        name: 'default',
        content: `
        <mc-list-item>
          Apple
          <span slot="sublabel">Fruit</span>
        </mc-list-item>
        <mc-list-item>
          Apricot
          <span slot="sublabel">Fruit</span>
        </mc-list-item>
        <mc-list-item>
          Artichoke
          <span slot="sublabel">Vegetable</span>
        </mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Red Heart"><span slot="icon">❤️</span></mc-list-item>
          <mc-list-item label="Sparkles"><span slot="icon">✨</span></mc-list-item>
          <mc-list-item label="Party Popper"><span slot="icon">🎉</span></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Zero"></mc-list-item>
          <mc-list-item disabled label="One"></mc-list-item>
          <mc-list-item label="Two"></mc-list-item>
          <mc-list-item label="Three"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Apples" sublabel="Fruit" icon="apple"></mc-list-item>
          <mc-list-item label="Apricots" sublabel="Fruit" icon="empty"></mc-list-item>
          <mc-list-item label="Oranges" sublabel="Fruit" icon="lemon-slice"></mc-list-item>
          <hr />
          <mc-list-item label="Broccoli" sublabel="Vegetables"><span slot="icon">🥦</span></mc-list-item>
          <mc-list-item label="Carrots" sublabel="Vegetables" icon="carrot"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    role: 'menu',
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Apple" sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Apricot" sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Artichoke" sublabel="Vegetable"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
  {
    type: 'single',
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Apple" sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Apricot" selected sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Artichoke" sublabel="Vegetable"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
  {
    type: 'multiple',
    slots: [
      {
        name: 'default',
        content: `
          <mc-list-item label="Apple" selected sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Apricot" selected sublabel="Fruit"></mc-list-item>
          <mc-list-item label="Artichoke" sublabel="Vegetable"></mc-list-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
            <mc-list-item><a href="#page1">Page 1</a></mc-list-item>
            <mc-list-item icon="computer"><a href="#page2">Page 2</a></mc-list-item>
            <mc-list-item trailingicon="file"><a href="#page3">Page 3</a></mc-list-item>
            <mc-list-item sublabel="Subpage 4"><a href="#page4">Page 4</a></mc-list-item>
            <mc-list-item sublabel="Subpage 5" icon="computer"><a href="#page5">Page 5</a></mc-list-item>
            <mc-list-item sublabel="Subpage 6" trailingicon="file"><a href="#page6">Page 6</a></mc-list-item>
            <mc-list-item label="List Item"></mc-list-item>
`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
];
