export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";

// CSS
mc-tag {
  margin-left: 8px;
}

// HTML
<mc-list>
  <mc-list-item>Hub <mc-tag label="New" appearance="info"></mc-tag></mc-list-item>
  <hr />
  <mc-list-item label="Shipment overview - Export"></mc-list-item>
  <mc-list-item label="Shipment overview - Import"></mc-list-item>
  <mc-list-item label="All inbound"></mc-list-item>
  <mc-list-item label="MyFinance"></mc-list-item>
  <hr />
  <mc-list-item>Maersk Flow <mc-tag label="New" appearance="info"></mc-tag></mc-list-item>
</mc-list>`,
    language: 'javascript',
    copy: true,
  },
];
