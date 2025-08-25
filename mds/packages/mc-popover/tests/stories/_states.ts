import { IComponentState } from '@maersk-global/mds-dev-utils';
const positions: string[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'left-top',
  'left-center',
  'left-bottom',
  'right-top',
  'right-center',
  'right-bottom',
];
export const states = (): IComponentState[] => {
  return [
    {
      dontflip: true,
      dontshift: true,
      open: true,
      arrow: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: true,
    },
    {
      width: '10vw',
      dontflip: true,
      dontshift: true,
      open: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: false,
    },
    {
      width: 'trigger',
      dontflip: true,
      dontshift: true,
      open: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: false,
    },
    {
      maxwidth: '60px',
      dontflip: true,
      dontshift: true,
      open: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: true,
    },
    {
      maxheight: '50px',
      maxwidth: '60px',
      open: true,
      dontflip: true,
      dontshift: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: false,
    },
    {
      open: true,
      dontflip: true,
      dontshift: true,
      contextmenuonside: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: false,
    },
  ];
};

export const positionStates: IComponentState[] = [
  ...positions.map((position) => ({
    position,
    open: true,
    arrow: true,
    dontflip: true,
    dontshift: true,
    slots: [
      {
        name: 'default',
        content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
        <span>The HTML content</span>`,
      },
    ],
    accessibility: false,
  })),
];

export const smallScreenStates: IComponentState[] = [
  {
    open: true,
    dontflip: true,
    position: 'bottom-center',
    slots: [
      {
        name: 'default',
        content: `<mc-button fit="small" hiddenlabel icon="anchor" slot="trigger"></mc-button>
          <span>The HTML long content The HTML long content The HTML long content The HTML long content The HTML long content The HTML long content The HTML long content The HTML long content The HTML long content </span>`,
      },
    ],
    accessibility: false,
  },
];
