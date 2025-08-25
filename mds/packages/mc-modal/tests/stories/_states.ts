export const states = (fit: string, dimension: string, heading: string, headingAsSlot: boolean, closable: boolean) => [
  {
    open: true,
    heading,
    ...(closable ? {} : { hiddenclose: true }),
    slots: [
      {
        name: 'default',
        content: `
    ${headingAsSlot ? '<span slot="heading">Heading as slot</span>' : ''}
    <p>Body text</p>
    <mc-button slot="primaryAction" appearance="primary" variant="filled" appearance="alt" fit="${fit}">Save</mc-button>
    <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel" fit="${fit}">Cancel</mc-button>`,
      },
    ],
    dimension,
    accessibility: true,
  },
];
