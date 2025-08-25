export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-card";

// HTML
<div style="display: flex; align-items: stretch;">
  <mc-card 
    image="image1.svg" 
    heading="First card" 
    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nibh praesent tristique magna. Nunc aliquet bibendum enim facilisis gravida neque convallis. Sed faucibus turpis in eu mi bibendum. Ut lectus arcu bibendum at." 
    footer="September 21" 
    style="width: 280px; margin-right: 24px;"
  >
    <mc-button label="Action button" appearance="neutral" variant="filled" slot="actions"></mc-button>
  </mc-card>

  <mc-card 
    image="image2.svg" 
    heading="Second card" 
    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui faucibus in ornare quam." 
    footer="September 21" 
    style="width: 280px; margin-right: 24px;"
  >
    <mc-button label="Action button" appearance="neutral" variant="filled" icon="heart" hiddenlabel slot="actions"></mc-button>
  </mc-card>

  <mc-card 
    image="image3.svg" 
    heading="Third card" 
    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
    footer="September 21" 
    style="width: 280px;" 
    href="https://www.google.com" 
    target="_blank">
  </mc-card>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
