export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-card";

// HTML
<div style="width: 400px;">
  <mc-card>
    <div style="min-width: 320px; display: flex; flex-direction: column; gap: 16px;">
      <div><mc-input label="Vessel name"></mc-input></div>
      <div><mc-input-date label="Date from"></mc-input-date></div>
    </div>
    <div slot="actions">
      <mc-button label="Search" appearance="primary" variant="filled" width="full-width"></mc-button>
    </div>
  </mc-card>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
