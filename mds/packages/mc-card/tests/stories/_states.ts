import { IComponentState } from '@maersk-global/mds-utils-storybook-shared';

export const getStates = (imageFile1: string, imageFile2: string, orientation): IComponentState[] => {
  const heading = 'Supply Chain and Logistics';
  const subheading = 'Integrated logistics';
  const body =
    'We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you.';

  return [
    {
      image: imageFile1,
      heading,
      subheading,
      body,
      footer: '12 September 2022',
      orientation,
      slots: [
        {
          name: 'actions',
          content: `<div slot="actions" style="display:flex; justify-content: space-between;">
                    <mc-button label="Action button" variant="filled" appearance="neutral" fit="small"></mc-button>
                    <mc-button icon="heart" variant="filled" appearance="neutral" hiddenlabel fit="small"></mc-button>
                  </div>`,
        },
      ],
      accessibility: true,
    },
    {
      image: imageFile1,
      heading,
      subheading,
      body,
      footer: '12 September 2022',
      padding: '24px 16px',
      orientation,
      accessibility: false,
    },
    {
      image: imageFile1,
      heading,
      body,
      href: 'https://www.google.com',
      orientation,
      accessibility: false,
    },
    {
      image: imageFile2,
      heading,
      imagepercent: '70',
      orientation,
      accessibility: false,
    },
    {
      slots: [
        {
          name: 'default',
          content: `<b>${body}</b>`,
        },
      ],
      accessibility: false,
    },
    {
      image: imageFile2,
      heading,
      imagepercent: '70',
      orientation,
      hover: true,
      accessibility: false,
    },
    {
      heading,
      subheading,
      body,
      footer: '12 September 2025',
      padding: '0px',
      orientation,
      accessibility: false,
    },
    {
      heading,
      subheading,
      body,
      footer: '12 September 2025',
      padding: '16px 24px',
      orientation,
      accessibility: false,
    },
  ];
};
