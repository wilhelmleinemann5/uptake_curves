export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-card";

// HTML
<mc-card
  heading="Supply Chain and Logistics"
  subheading="Integrated logistics"
  footer="12 September 2022"
  image="/packages/mc-card/stories/images/supply-chain-logistics_illustration.svg"
  clickable
  @click="\${(event) => {
    console.log('Card clicked', event);
  }}"
>
  We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you.
</mc-card>`,
    language: 'javascript',
    copy: true,
  },
];
