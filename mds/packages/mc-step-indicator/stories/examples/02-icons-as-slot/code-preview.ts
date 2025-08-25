export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-step-indicator";
import "@maersk-global/mds-components-core/mc-step-indicator-item";
import "@maersk-global/mds-components-core/mc-icon";

// CSS
.my-icon-completed::part(icon) {
  fill: white;
}
.my-icon-current::part(icon) {
  fill: #42b0d5;
}
.my-icon-pending::part(icon) {
  fill: #dbdbdb;
}

// HTML
<mc-step-indicator>
<mc-step-indicator-item
  state="completed"
  label="ETD">
    <span slot="icon"><mc-icon class="my-icon-completed" icon="clock"></mc-icon></span>
</mc-step-indicator-item>
<mc-step-indicator-item
  state="completed"
  label="Release Sent">
    <span slot="icon"><mc-icon class="my-icon-completed" icon="envelope"></mc-icon></span>
</mc-step-indicator-item>
<mc-step-indicator-item
  state="current"
  label="Carrier Released">
    <span slot="icon"><mc-icon class="my-icon-current" icon="vessel-front"></mc-icon></span>
</mc-step-indicator-item>
<mc-step-indicator-item 
  label="ETA"
  state="pending">
    <span slot="icon"><mc-icon class="my-icon-pending" icon="clock"></mc-icon></span>
</mc-step-indicator-item>
</mc-step-indicator>

  `,
    language: 'javascript',
    copy: true,
  },
];
