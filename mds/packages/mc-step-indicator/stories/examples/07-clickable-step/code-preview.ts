export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-step-indicator";
import "@maersk-global/mds-components-core/mc-step-indicator-item";

// CSS
mc-step-indicator-item {
  cursor: pointer;
}

// HTML
<mc-step-indicator>
  <mc-step-indicator-item
  onclick="\${() => console.log('step 1')}"
  state="completed"
  icon="clock">
    <span class="mds-text--small-normal">ETD</span>
  </mc-step-indicator-item>
  <mc-step-indicator-item
  onclick="\${() => console.log('step 2')}"
  state="completed"
  icon="envelope">
    <span class="mds-text--small-normal">Release Sent</span>
  </mc-step-indicator-item>
  <mc-step-indicator-item
  onclick="\${() => console.log('step 3')}"
  state="current"
  icon="vessel-front">
    <span class="mds-text--small-bold">Carrier Released</span>
  </mc-step-indicator-item>
  <mc-step-indicator-item 
  onclick="\${() => console.log('step 4')}"
  state="pending"
  icon="clock">
    <span class="mds-text--small-normal">ETA</span>
  </mc-step-indicator-item>
</mc-step-indicator>
  `,
    language: 'javascript',
    copy: true,
  },
];
