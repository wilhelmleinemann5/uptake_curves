const slots = [
  {
    name: 'default',
    content: `<mc-picker-item value="1" label="1"></mc-picker-item>
      <mc-picker-item value="2" label="2"></mc-picker-item>
      <mc-picker-item value="3" label="3"></mc-picker-item>
      <mc-picker-item value="4" label="4"></mc-picker-item>
      <mc-picker-item value="5" label="5"></mc-picker-item>
      <mc-picker-item value="6" label="6"></mc-picker-item>
      <mc-picker-item value="7" label="7"></mc-picker-item>
      <mc-picker-item value="8" label="8"></mc-picker-item>
      <mc-picker-item value="9" label="9"></mc-picker-item>
      <mc-picker-item value="10" label="10"></mc-picker-item>`,
  },
];

export const states = [
  {
    value: '1',
    slots,
    'aria-label': 'Fruits',
    accessibility: true,
  },
  {
    value: '5',
    slots,
    'aria-label': 'Fruits',
    accessibility: true,
  },
  {
    value: '10',
    slots,
    'aria-label': 'Fruits',
    accessibility: true,
  },
];
