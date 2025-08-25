export const states = (
  fit: string,
  dimension: string,
  heading: string,
  body: string,
  headingAsSlot: boolean,
  bodyAsSlot: boolean,
  nonmodal: boolean,
  nopadding: boolean,
  bodyAsPureText: boolean,
  width?: string,
  height?: string,
) => [
  {
    open: true,
    heading,
    body,
    ...(nonmodal && { nonmodal }),
    ...(nopadding && { nopadding }),
    slots: [
      {
        name: 'default',
        content: `
        ${headingAsSlot ? '<span slot="heading">Heading as slot</span>' : ''}
        ${bodyAsSlot ? '<span>Body as slot</span>' : ''}
        ${bodyAsPureText ? 'Body as pure text' : ''}
        <mc-button slot="primaryAction" appearance="primary" variant="filled" appearance="alt" fit="${fit}">Save</mc-button>
        <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" fit="${fit}">Cancel</mc-button>`,
      },
    ],
    dimension,
    width,
    height,
    accessibility: true,
  },
];
