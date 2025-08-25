export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-badge";
import "@maersk-global/mds-components-core-segmented-control";
import "@maersk-global/mds-components-core-segmented-control-item";

<mc-segmented-control>
  <mc-segmented-control-item value="Apple" selected>
    Apple <mc-badge slot="badge" position="right" display="inline" label="4"></mc-badge
  ></mc-segmented-control-item>
  <mc-segmented-control-item value="Apricot"> Apricot </mc-segmented-control-item>
  <mc-segmented-control-item value="Artichoke"> Artichoke </mc-segmented-control-item>
</mc-segmented-control>`,
    language: 'html',
    copy: true,
  },
];
