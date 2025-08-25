import { IComponentState } from '@maersk-global/mds-dev-utils';

export const getStatesByOrientation = (orientation: string): IComponentState[] => [
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-segmented-control-item value="Apple" selected label="Apple" sublabel="Fruit"></mc-segmented-control-item>
          <mc-segmented-control-item value="Apricot" label="Apricot" sublabel="Fruit"></mc-segmented-control-item>
          <mc-segmented-control-item value="Artichoke" label="Artichoke" sublabel="Vegetable"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item value="Computer" selected label="Computer" icon="computer"></mc-segmented-control-item>
          <mc-segmented-control-item value="Printer" label="Printer" icon="printer"></mc-segmented-control-item>
          <mc-segmented-control-item value="File" label="File" icon="file"></mc-segmented-control-item>
          <mc-segmented-control-item value="Folder" label="Folder" icon="folder-open"></mc-segmented-control-item>
          <mc-segmented-control-item value="Office" label="Office" icon="office-2"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item hiddenlabel value="Apples" label="Apples" icon="apple"></mc-segmented-control-item>
          <mc-segmented-control-item hiddenlabel value="Bananas" label="Bananas" icon="banana"></mc-segmented-control-item>
          <mc-segmented-control-item hiddenlabel value="Carrots" label="Carrots" icon="carrot"></mc-segmented-control-item>
          <mc-segmented-control-item hiddenlabel value="Lemons" label="Lemons" icon="lemon"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item value="Computer" selected trailingicon="computer" label="Computer"></mc-segmented-control-item>
          <mc-segmented-control-item value="Printer" trailingicon="printer" label="Printer"></mc-segmented-control-item>
          <mc-segmented-control-item value="File" trailingicon="file" label="File"></mc-segmented-control-item>
          <mc-segmented-control-item value="Folder" trailingicon="folder-open" label="Folder"></mc-segmented-control-item>
          <mc-segmented-control-item value="Office" trailingicon="office-2" label="Office"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item value="Apples" selected label="Apples" sublabel="Fruits"></mc-segmented-control-item>
          <mc-segmented-control-item value="Apricots" label="Apricots" sublabel="Fruits"></mc-segmented-control-item>
          <mc-segmented-control-item value="Artichokes" label="Artichokes" sublabel="Vegetables"></mc-segmented-control-item>
          <mc-segmented-control-item value="Carrots" label="Carrots" sublabel="Vegetables"></mc-segmented-control-item>
          <mc-segmented-control-item value="Cherries" label="Cherries" sublabel="Fruits"></mc-segmented-control-item>
          <mc-segmented-control-item value="Onions" label="Onions" sublabel="Vegetables"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item value="Apples" label="Apples" sublabel="Fruits"></mc-segmented-control-item>
          <mc-segmented-control-item value="Apricots" label="Apricots" sublabel="Fruits"></mc-segmented-control-item>
          <mc-segmented-control-item value="Artichokes" label="Artichokes" sublabel="Vegetables"></mc-segmented-control-item>
          <mc-segmented-control-item value="Carrots" label="Carrots" sublabel="Vegetables"></mc-segmented-control-item>
          <mc-segmented-control-item value="Cherries" selected label="Cherries" sublabel="Fruits"></mc-segmented-control-item>
          <mc-segmented-control-item value="Onions" label="Onions" sublabel="Vegetables"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item value="RedHeart" selected label="Red Heart"><span slot="icon">❤️</span></mc-segmented-control-item>
          <mc-segmented-control-item value="Sparkles" label="Sparkles"><span slot="icon">✨</span></mc-segmented-control-item>
          <mc-segmented-control-item value="PartyPopper" label="Party Popper"><span slot="icon">🎉</span></mc-segmented-control-item>`,
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
          <mc-segmented-control-item value="Zero" selected label="Zero"></mc-segmented-control-item>
          <mc-segmented-control-item value="One" disabled label="One"></mc-segmented-control-item>
          <mc-segmented-control-item value="Two" label="Two"></mc-segmented-control-item>
          <mc-segmented-control-item value="Three" label="Three"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item value="Apples" label="Apples" sublabel="Fruit" icon="apple"></mc-segmented-control-item>
          <mc-segmented-control-item value="Apricots" label="Apricots" sublabel="Fruit" icon="empty"></mc-segmented-control-item>
          <mc-segmented-control-item value="Oranges"  selected label="Oranges" sublabel="Fruit" icon="lemon-slice"></mc-segmented-control-item>          
          <mc-segmented-control-item value="Broccoli" label="Broccoli" sublabel="Vegetables"><span slot="icon">🥦</span></mc-segmented-control-item>
          <mc-segmented-control-item value="Carrots" label="Carrots" sublabel="Vegetables" icon="carrot"></mc-segmented-control-item>`,
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
          <mc-segmented-control-item><a href="#page1">Page 1</a></mc-segmented-control-item>
          <mc-segmented-control-item icon="computer"><a href="#page2">Page 2</a></mc-segmented-control-item>
          <mc-segmented-control-item trailingicon="file"><a href="#page3">Page 3</a></mc-segmented-control-item>`,
      },
    ],
    'aria-label': 'Fruits',
    type: 'none',
    orientation,
    accessibility: true,
  },
];
