export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-segmented-control";

// CSS
mc-tag {
  margin-left: 8px;
}

// HTML
<mc-segmented-control type="single">
  <mc-segmented-control-item selected value="New">Hub <mc-tag label="New" appearance="info"></mc-tag></mc-segmented-control-item>
  <mc-segmented-control-item value="Export" label="Shipment overview - Export"></mc-segmented-control-item>
  <mc-segmented-control-item value="Import" label="Shipment overview - Import"></mc-segmented-control-item>
  <mc-segmented-control-item value="Inbound" label="All inbound"></mc-segmented-control-item>
  <mc-segmented-control-item value="MyFinance" label="MyFinance"></mc-segmented-control-item>
  <mc-segmented-control-item value="MaerskFlow">Maersk Flow <mc-tag label="New" appearance="info"></mc-tag></mc-segmented-control-item>
</mc-segmented-control>`,
    language: 'javascript',
    copy: true,
  },
];
