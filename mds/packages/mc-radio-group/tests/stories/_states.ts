const slots = [
  {
    name: 'default',
    content: `
    <mc-radio name="fruits" value="Apple" label="Apple" checked></mc-radio>
    <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
    <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
    <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
    `,
  },
];

export const states = [
  //vertical
  {
    legend: 'Choose your favourite fruit',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruit',
    hint: 'Only one can be selected',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruit',
    invalid: true,
    errormessage: 'It is required',
    slots,
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruit',
    hint: 'Only one can be selected',
    invalid: true,
    errormessage: 'It is required',
    slots,
    accessibility: true,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruit',
    hiddenlegend: true,
    slots,
    accessibility: false,
    smallScreen: false,
  },
  //horizontal
  {
    legend: 'Choose your favourite fruit',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
  },
  {
    legend: 'Choose your favourite fruit',
    slots,
    autolayoutdisabled: true,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: true,
  },
  {
    legend: 'Choose your favourite fruit',
    hint: 'Only one can be selected',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruit',
    invalid: true,
    errormessage: 'It is required',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruit',
    hint: 'Only one can be selected',
    invalid: true,
    errormessage: 'It is required',
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  {
    legend: 'Choose your favourite fruit',
    hiddenlegend: true,
    slots,
    orientation: 'horizontal',
    accessibility: false,
    smallScreen: false,
  },
  // disabled
  {
    legend: 'Choose your favourite fruit',
    slots,
    disabled: true,
    accessibility: true,
    smallScreen: false,
  },
];
