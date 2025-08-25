import { IComponentState } from '@maersk-global/mds-dev-utils';

export const states = (): IComponentState[] => {
  const positions = [
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
  return [
    {
      dontflip: true,
      dontshift: true,
      appearance: 'default',
      open: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button slot="trigger" fit="small" hiddenlabel icon="anchor"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: true,
    },
    {
      dontflip: true,
      dontshift: true,
      appearance: 'inverse',
      open: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button slot="trigger" fit="small" hiddenlabel icon="anchor"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: true,
    },
    {
      dontflip: true,
      dontshift: true,
      width: '80',
      open: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button slot="trigger" fit="small" hiddenlabel icon="anchor"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: false,
    },
    ...positions.map((position) => ({
      position,
      dontflip: true,
      dontshift: true,
      open: true,
      slots: [
        {
          name: 'default',
          content: `<mc-button slot="trigger" fit="small" hiddenlabel icon="anchor"></mc-button>
          <span>The HTML content</span>`,
        },
      ],
      accessibility: false,
    })),
  ];
};
