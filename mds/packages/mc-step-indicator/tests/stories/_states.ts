export const states = [
  // orientation: horizontal
  {
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
    slots: [
      {
        name: 'default',
        content: `
          <mc-step-indicator-item
            state="completed"
            label="Release Sent">
          </mc-step-indicator-item>
          <mc-step-indicator-item
            state="current"
            label="Carrier Released">
          </mc-step-indicator-item>
          <mc-step-indicator-item 
            label="ETA"
            state="pending">
          </mc-step-indicator-item>`,
      },
    ],
  },
  {
    labels: ['First', 'Second', 'Third'],
    autolayoutdisabled: true,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
  },
  {
    labels: ['First', 'Second', 'Third'],
    currentindex: 0,
    orientation: 'horizontal',
    accessibility: true,
    smallScreen: false,
  },
  {
    labels: ['First', 'Second', 'Third'],
    currentindex: 1,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    labels: ['First', 'Second', 'Third'],
    currentindex: 2,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    labels: ['First', 'Second', 'Third'],
    alignitemsdisabled: true,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  // orientation: vertical
  {
    labels: ['First', 'Second', 'Third'],
    orientation: 'vertical',
    accessibility: false,
    smallScreen: true,
  },
  {
    labels: ['First', 'Second', 'Third'],
    currentindex: 0,
    orientation: 'vertical',
    accessibility: false,
    smallScreen: false,
  },
  {
    labels: ['First', 'Second', 'Third'],
    currentindex: 1,
    orientation: 'vertical',
    accessibility: false,
    smallScreen: false,
  },
  {
    labels: ['First', 'Second', 'Third'],
    currentindex: 2,
    orientation: 'vertical',
    accessibility: false,
    smallScreen: false,
  },
  {
    accessibility: true,
    slots: [
      {
        name: 'default',
        content: `
          <mc-step-indicator-item
            state="completed"
            label="Release Sent">
          </mc-step-indicator-item>
          <mc-step-indicator-item
            state="current"
            appearance="error"
            label="Carrier Released">
          </mc-step-indicator-item>
          <mc-step-indicator-item 
            label="ETA"
            state="pending">
          </mc-step-indicator-item>`,
      },
    ],
  },
];
