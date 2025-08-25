export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-step-indicator";
import "@maersk-global/mds-components-core/mc-step-indicator-item";
    
// CSS
.completed::part(marker) {
  background-color: #40AB35;
  border-color: #40AB35;
}
.completed::part(step):after {
  background-color: #40AB35;
}
.current::part(marker) {
  border-color: #202020;
}
.current::part(icon) {
  fill: #202020;
}

// HTML
<mc-step-indicator>
  <mc-step-indicator-item
    class="completed"
    state="completed"
    icon="clock"
    label="ETD">
  </mc-step-indicator-item>
  <mc-step-indicator-item
    class="completed"
    state="completed"
    icon="envelope"
    label="Release Sent">
  </mc-step-indicator-item>
  <mc-step-indicator-item
    class="current"
    state="current"
    icon="vessel-front"
    label="Carrier Released">
  </mc-step-indicator-item>
  <mc-step-indicator-item 
    label="ETA"
    state="pending"
    icon="clock">
  </mc-step-indicator-item>
</mc-step-indicator>
  `,
    language: 'javascript',
    copy: true,
  },
];
