export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-badge";
import "@maersk-global/mds-components-core-button";
import "@maersk-global/mds-components-core-menu";
import "@maersk-global/mds-components-core-list";
import "@maersk-global/mds-components-core-list-item";

<mc-menu trigger="click">
  <mc-button slot="trigger" icon="bell" variant="plain" appearance="neutral" label="Notifications" hiddenlabel
    ><mc-badge slot="badge" position="top" variant="dot" distance="small"></mc-badge
  ></mc-button>
  <mc-list>
    <mc-list-item label="One"></mc-list-item>
    <mc-list-item label="Two"></mc-list-item>
    <mc-list-item label="Three"
      ><mc-badge slot="badge" position="right" display="inline" label="3"></mc-badge
    ></mc-list-item>
    <mc-list-item label="Four"></mc-list-item>
    <mc-list-item label="Five"></mc-list-item>
  </mc-list>
</mc-menu>`,
    language: 'html',
    copy: true,
  },
];
