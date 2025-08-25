import { IComponentState } from '@maersk-global/mds-dev-utils';

export const states: IComponentState[] = [
  { info: 'Jane Doe', accessibility: true },
  { initials: 'JAD', info: 'Jane Doe', accessibility: true },
  { imagesrc: 'https://avatars.githubusercontent.com/u/70194550?v=4', info: 'Jane Doe', accessibility: true },
  {
    info: 'Jane Doe',
    slots: [
      {
        name: 'info',
        content: `<span slot="info"><b>Jane Doe</b><br /><i>Senior Software Engineer</i></span>`,
      },
    ],
    accessibility: false,
  },
  {
    initials: 'JAD',
    accessibility: false,
    info: 'Jane Doe',
    slots: [
      {
        name: 'badge',
        content: `<mc-badge slot="badge" label="New" variant="dot" distance="medium" position="bottom"></mc-badge>`,
      },
    ],
  },
  {
    initials: 'JAD',
    accessibility: false,
    hiddentooltip: true,
    slots: [
      {
        name: 'badge',
        content: `<mc-badge slot="badge" label="9" variant="default" distance="medium" position="bottom"></mc-badge>`,
      },
    ],
  },
  {
    initials: 'JAD',
    accessibility: false,
    hiddentooltip: true,
    slots: [
      {
        name: 'badge',
        content: `<mc-badge slot="badge" label="New" variant="default" distance="large" position="bottom"></mc-badge>`,
      },
    ],
  },
];
