export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-card";

// CSS
mc-card::part(container) {
  border-color: #0073AB;
}
mc-card::part(image-container) {
  opacity: 0.5;
}
mc-card::part(content-container) {
  margin: 0;
  padding: 16px;
  background-color: #F7F7F7;
  border-radius: var(--mds_brand_border_x-large_radius);
}
mc-card::part(header-container) {
  color: #0073AB;
}
mc-card::part(body-container) {
  color: #00243D;
}
mc-card::part(footer-container) {
  color: #141414;
}
mc-card::part(actions-container) {
  margin-bottom: 0;
}

// HTML
<mc-card 
  image="static/media/packages/components-core/src/mc-card/stories/images/supply-chain-logistics_illustration.svg"
  heading="Supply Chain and Logistics"
  subheading="Integrated logistics"
  body="We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you."
  footer="12 September 2022"
  variant="bordered"
  orientation="vertical"
  fit="medium"
>
  <div slot="actions" style="display:flex; justify-content: space-between;">
    <mc-button label="Action button" appearance="neutral" variant="filled" fit="medium"></mc-button>
    <mc-button icon="heart" appearance="neutral" variant="filled" hiddenlabel fit="medium"></mc-button>
  </div>
</mc-card>`,
    language: 'javascript',
    copy: true,
  },
];
