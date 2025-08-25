const slots = [
  {
    name: 'default',
    content: `
  <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
  <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
  <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
  <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
  `,
  },
];

export const states = [
  //vertical
  {
    legend: 'Choose your favourite fruits',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruits',
    hint: 'Multiple can be selected',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruits',
    invalid: true,
    errormessage: 'It is required',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruits',
    hint: 'Multiple can be selected',
    invalid: true,
    errormessage: 'It is required',
    slots,
    accessibility: true,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruits',
    hiddenlegend: true,
    slots,
    accessibility: true,
    smallScreen: false,
  },
  //horizontal
  {
    legend: 'Choose your favourite fruits',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
  },
  {
    legend: 'Choose your favourite fruits',
    slots,
    autolayoutdisabled: true,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
  },
  {
    legend: 'Choose your favourite fruits',
    hint: 'Multiple can be selected',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruits',
    invalid: true,
    errormessage: 'It is required',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruits',
    hint: 'Multiple can be selected',
    invalid: true,
    errormessage: 'It is required',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruits',
    hiddenlegend: true,
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  // disabled
  {
    legend: 'Choose your favourite fruits',
    slots,
    disabled: true,
    accessibility: true,
    smallScreen: false,
  },
];
