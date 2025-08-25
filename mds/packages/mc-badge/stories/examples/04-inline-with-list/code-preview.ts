export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-badge";
import "@maersk-global/mds-components-core-list";
import "@maersk-global/mds-components-core-list-item";

<mc-list>
  <mc-list-item label="One"></mc-list-item>
  <mc-list-item> Two </mc-list-item>
  <mc-list-item label="Three"></mc-list-item>
  <mc-list-item label="Four"
    ><mc-badge slot="badge" position="right" display="inline" label="4"></mc-badge
  ></mc-list-item>
  <mc-list-item label="Five"></mc-list-item>
</mc-list>
<mc-list>
  <mc-list-item sublabel="You have new messages">
    Inbox
    <mc-badge variant="default" slot="badge" position="right" display="inline" label="6"></mc-badge
  ></mc-list-item> </mc-list
><mc-list>
  <mc-list-item label="One"></mc-list-item>
  <mc-list-item>
    Two
    <mc-badge variant="dot" slot="badge" position="right" display="inline"></mc-badge
  ></mc-list-item>
  <mc-list-item label="Three"></mc-list-item>
  <mc-list-item label="Four"></mc-list-item>
  <mc-list-item label="Five"></mc-list-item>
</mc-list>`,
    language: 'html',
    copy: true,
  },
];
