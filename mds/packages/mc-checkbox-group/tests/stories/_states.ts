const slots = [
  {
    name: 'default',
    content: `
  <mc-checkbox name="fruits" value="Apple" label="Apple" checked></mc-checkbox>
  <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
  <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
  <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
  `,
  },
];

export const states = [
  //vertical
  {
    legend: 'Choose your favorite fruits',
    slots,
    accessibility: true,
    smallScreen: false,
  },
  {
    legend: 'Choose your favorite fruits',
    accessibility: true,
    smallScreen: false,
    slots: [
      {
        name: 'default',
        content: `
      <mc-checkbox name="fruits" value="Apple" label="Apple"></mc-checkbox>
      <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
      <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
      <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
      `,
      },
    ],
    value: 'Apple,Orange',
  },
  {
    legend: 'Choose your favorite fruits',
    hint: 'Multiple can be selected',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favorite fruits',
    invalid: true,
    errormessage: 'It is required',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favorite fruits',
    hint: 'Multiple can be selected',
    invalid: true,
    errormessage: 'It is required',
    slots,
    accessibility: true,
    smallScreen: false,
  },
  {
    legend: 'Choose your favorite fruits',
    hiddenlegend: true,
    slots,
    accessibility: false,
    smallScreen: false,
  },
  //horizontal
  {
    legend: 'Choose your favorite fruits',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
  },
  {
    legend: 'Choose your favorite fruits',
    slots,
    autolayoutdisabled: true,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
  },
  {
    legend: 'Choose your favorite fruits',
    hint: 'Multiple can be selected',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favorite fruits',
    invalid: true,
    errormessage: 'It is required',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favorite fruits',
    hint: 'Multiple can be selected',
    invalid: true,
    errormessage: 'It is required',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favorite fruits',
    hiddenlegend: true,
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  // disabled
  {
    legend: 'Choose your favorite fruits',
    slots,
    disabled: true,
    accessibility: true,
    smallScreen: false,
  },
];
