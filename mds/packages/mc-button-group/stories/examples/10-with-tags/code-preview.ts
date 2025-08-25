export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-button-group";

// CSS
mc-tag {
  margin-left: 8px;
}

// HTML
<mc-button-group selectiontype="single">
  <mc-button-group-item value="New">Hub <mc-tag label="New" appearance="info"></mc-tag></mc-button-group-item>
  <mc-button-group-item value="Export" label="Shipment overview - Export"></mc-button-group-item>
  <mc-button-group-item value="Import" label="Shipment overview - Import"></mc-button-group-item>
  <mc-button-group-item value="Inbound" label="All inbound"></mc-button-group-item>
  <mc-button-group-item value="MyFinance" label="MyFinance"></mc-button-group-item>
  <mc-button-group-item value="MaerskFlow">Maersk Flow <mc-tag label="New" appearance="info"></mc-tag></mc-button-group-item>
</mc-button-group>`,
    language: 'javascript',
    copy: true,
  },
];
