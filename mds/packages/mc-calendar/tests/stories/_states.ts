export const states = [
  { value: undefined, accessibility: true },
  { value: '2022-08-14', accessibility: true },
  { value: '2022-08-14', accessibility: true, showweeknumbers: true },
  {
    value: '2022-08-14',
    accessibility: false,
    slots: [
      {
        name: 'footer',
        content: `<span class="mds-text--x-small-normal" slot="footer">Use arrow keys to navigate between days</span>`,
      },
    ],
  },
  { value: '2022-09-01', showadjacentmonthdays: true, accessibility: false },
  { value: '2022-08-14', minDate: '2022-08-10', accessibility: false },
  { value: '2022-08-14', maxDate: '2022-08-31', accessibility: false },
  { value: '2022-08-14', minDate: '2022-08-10', maxDate: '2022-08-31', accessibility: false },
  { value: '2022-08-14', noshadow: true, noborder: true, accessibility: false },
  { value: '2022-08-14', noshadow: true, noborder: true, showweeknumbers: true, accessibility: true },
  { value: '2022-08-14', noshadow: true, noborder: true, dayperiod: 'narrow', accessibility: false },
  { value: '2022-08-14', noshadow: true, noborder: true, dayperiod: 'short', accessibility: false },
  { value: '2022-08-14', noshadow: true, noborder: true, dayperiod: 'long', accessibility: false },
];
