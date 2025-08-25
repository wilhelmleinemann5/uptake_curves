export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input-group";
import "@maersk-global/mds-components-core/mc-button";
import "@maersk-global/mds-components-core/mc-menu";
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";

// HTML
<mc-input-group legend="Split button with dropdown" hiddenlegend>
  <mc-button appearance="neutral" label="Book shipment"></mc-button>
  <mc-menu trigger="click">
    <mc-button slot="trigger" icon="chevron-down" appearance="neutral" label="More options" hiddenlabel></mc-button>
    <mc-list>
      <mc-list-item label="Request quote first"></mc-list-item>
      <mc-list-item label="Book with special requirements"></mc-list-item>
      <mc-list-item label="Schedule pickup"></mc-list-item>
    </mc-list>
  </mc-menu>
</mc-input-group>`,
    language: 'javascript',
    copy: true,
  },
];
