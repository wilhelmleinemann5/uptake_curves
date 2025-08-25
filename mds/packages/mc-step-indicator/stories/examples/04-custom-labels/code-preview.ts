export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-step-indicator";
import "@maersk-global/mds-components-core/mc-step-indicator-item";

// HTML
<mc-step-indicator>
  <mc-step-indicator-item
    state="completed"
    icon="clock">
    <span>
      <span class="mds-font--small">ETD</span>
      <span class="mds-font--x-small">30-08-2022<br />Rotterdam</span>
    </span>
  </mc-step-indicator-item>
  <mc-step-indicator-item
    state="completed"
    icon="envelope">
    <span>
      <span class="mds-font--small">Release Sent</span>
      <span class="mds-font--x-small">02-03-2022<br />San Diego</span>
    </span>
  </mc-step-indicator-item>
  <mc-step-indicator-item
    state="current"
    icon="vessel-front">
    <span>
      <span class="mds-font--small">Carrier Released</span>
      <span class="mds-font--x-small">10-03-2022<br />San Diego</span>
    </span>
  </mc-step-indicator-item>
  <mc-step-indicator-item 
    state="pending"
    icon="clock">
    <span>
      <span class="mds-font--small">ETA</span>
      <span class="mds-font--x-small">28-07-2022<br />San Diego</span>
    </span>
  </mc-step-indicator-item>
</mc-step-indicator>
  `,
    language: 'javascript',
    copy: true,
  },
];
