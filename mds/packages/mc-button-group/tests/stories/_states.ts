import { IComponentState } from '@maersk-global/mds-dev-utils';

export const getStatesByOrientation = (orientation: string): IComponentState[] => [
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-button-group-item label="Apple" sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item label="Apricot" sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item label="Artichoke" sublabel="Vegetable"></mc-button-group-item>`,
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
          <mc-button-group-item label="Apple" sublabel="Fruit"></mc-button-group-item>`,
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
          <mc-button-group-item label="Computer" icon="computer"></mc-button-group-item>
          <mc-button-group-item label="Printer" icon="printer"></mc-button-group-item>
          <mc-button-group-item label="File" icon="file"></mc-button-group-item>
          <mc-button-group-item label="Folder" icon="folder-open"></mc-button-group-item>
          <mc-button-group-item label="Office" icon="office-2"></mc-button-group-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
  {
    width: 'full-width',
    slots: [
      {
        name: 'default',
        content: `
          <mc-button-group-item label="Computer" icon="computer"></mc-button-group-item>
          <mc-button-group-item label="Printer" icon="printer"></mc-button-group-item>
          <mc-button-group-item label="File" icon="file"></mc-button-group-item>
          <mc-button-group-item label="Folder" icon="folder-open"></mc-button-group-item>
          <mc-button-group-item label="Office" icon="office-2"></mc-button-group-item>`,
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
          <mc-button-group-item trailingicon="computer" label="Computer"></mc-button-group-item>
          <mc-button-group-item trailingicon="printer" label="Printer"></mc-button-group-item>
          <mc-button-group-item trailingicon="file" label="File"></mc-button-group-item>
          <mc-button-group-item trailingicon="folder-open" label="Folder"></mc-button-group-item>
          <mc-button-group-item trailingicon="office-2" label="Office"></mc-button-group-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    width: 'full-width',
    slots: [
      {
        name: 'default',
        content: `
          <mc-button-group-item trailingicon="computer" label="Computer"></mc-button-group-item>
          <mc-button-group-item trailingicon="printer" label="Printer"></mc-button-group-item>
          <mc-button-group-item trailingicon="file" label="File"></mc-button-group-item>
          <mc-button-group-item trailingicon="folder-open" label="Folder"></mc-button-group-item>
          <mc-button-group-item trailingicon="office-2" label="Office"></mc-button-group-item>`,
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
          <mc-button-group-item hiddenlabel value="Apples" label="Apples" icon="apple"></mc-button-group-item>
          <mc-button-group-item hiddenlabel value="Bananas" label="Bananas" icon="banana"></mc-button-group-item>
          <mc-button-group-item hiddenlabel value="Carrots" label="Carrots" icon="carrot"></mc-button-group-item>
          <mc-button-group-item hiddenlabel value="Lemons" label="Lemons" icon="lemon"></mc-button-group-item>`,
      },
    ],
    'aria-label': 'fruits',
    orientation,
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-button-group-item label="Apples" sublabel="Fruits"></mc-button-group-item>
          <mc-button-group-item label="Apricots" sublabel="Fruits"></mc-button-group-item>
          <mc-button-group-item label="Artichokes" sublabel="Vegetables"></mc-button-group-item>
          <mc-button-group-item label="Carrots" sublabel="Vegetables"></mc-button-group-item>
          <mc-button-group-item label="Cherries" sublabel="Fruits"></mc-button-group-item>
          <mc-button-group-item label="Onions" sublabel="Vegetables"></mc-button-group-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: false,
  },
  {
    type: 'single',
    slots: [
      {
        name: 'default',
        content: `
          <mc-button-group-item value="Apples" label="Apples" sublabel="Fruits"></mc-button-group-item>
          <mc-button-group-item value="Apricots" label="Apricots" sublabel="Fruits"></mc-button-group-item>
          <mc-button-group-item value="Artichokes" label="Artichokes" sublabel="Vegetables"></mc-button-group-item>
          <mc-button-group-item value="Carrots" label="Carrots" sublabel="Vegetables"></mc-button-group-item>
          <mc-button-group-item value="Cherries" selected label="Cherries" sublabel="Fruits"></mc-button-group-item>
          <mc-button-group-item value="Onions" label="Onions" sublabel="Vegetables"></mc-button-group-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    containerStyles: orientation === 'horizontal' ? { width: '400px' } : { display: 'flex', height: '230px' },
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-button-group-item label="Red Heart"><span slot="icon">❤️</span></mc-button-group-item>
          <mc-button-group-item label="Sparkles"><span slot="icon">✨</span></mc-button-group-item>
          <mc-button-group-item label="Party Popper"><span slot="icon">🎉</span></mc-button-group-item>`,
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
          <mc-button-group-item label="Zero"></mc-button-group-item>
          <mc-button-group-item disabled label="One"></mc-button-group-item>
          <mc-button-group-item label="Two"></mc-button-group-item>
          <mc-button-group-item label="Three"></mc-button-group-item>`,
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
          <mc-button-group-item label="Apples" sublabel="Fruit" icon="apple"></mc-button-group-item>
          <mc-button-group-item label="Apricots" sublabel="Fruit" icon="empty"></mc-button-group-item>
          <mc-button-group-item label="Oranges" sublabel="Fruit" icon="lemon-slice"></mc-button-group-item>          
          <mc-button-group-item label="Broccoli" sublabel="Vegetables"><span slot="icon">🥦</span></mc-button-group-item>
          <mc-button-group-item label="Carrots" sublabel="Vegetables" icon="carrot"></mc-button-group-item>`,
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
          <mc-button-group-item label="Apple" sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item label="Apricot" sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item label="Artichoke" sublabel="Vegetable"></mc-button-group-item>`,
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
          <mc-button-group-item value="Apple" label="Apple" sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item value="Apricot" label="Apricot" selected sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item value="Artichoke" label="Artichoke" sublabel="Vegetable"></mc-button-group-item>`,
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
          <mc-button-group-item value="Apple" label="Apple" selected sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item value="Apricot" label="Apricot" selected sublabel="Fruit"></mc-button-group-item>
          <mc-button-group-item value="Artichoke" label="Artichoke" sublabel="Vegetable"></mc-button-group-item>`,
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
          <mc-button-group-item><a href="#page1">Page 1</a></mc-button-group-item>
          <mc-button-group-item icon="computer"><a href="#page2">Page 2</a></mc-button-group-item>
          <mc-button-group-item trailingicon="file"><a href="#page3">Page 3</a></mc-button-group-item>`,
      },
    ],
    'aria-label': 'Fruits',
    orientation,
    accessibility: true,
  },
];
