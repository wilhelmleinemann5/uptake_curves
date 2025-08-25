export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-top-bar";
import "@maersk-global/mds-components-core-menu";
import "@maersk-global/mds-components-core-button";
import "@maersk-global/mds-components-core-list";
import "@maersk-global/mds-components-core-list-item";
import "@maersk-global/mds-components-core-avatar";

// CSS
mc-avatar {
  margin-left: 8px;
}
  
// HTML
<mc-top-bar product="Maersk Design System" productshort="MDS" href="https://designsystem.maersk.com" target="_blank">
  <div slot="actions">
    <mc-menu trigger="click">
      <mc-button 
        slot="trigger" 
        icon="cog" 
        variant="plain" 
        appearance="neutral" 
        fit="small"
        hiddenlabel>Menu</mc-button>
      <mc-list>
        <mc-list-item label="One"></mc-list-item>
        <mc-list-item label="Two"></mc-list-item>
        <mc-list-item label="Three"></mc-list-item>
        <mc-list-item label="Four"></mc-list-item>
        <mc-list-item label="Five"></mc-list-item>
      </mc-list>
    </mc-menu>
    <mc-avatar
      info="info"
      initials="JD"
      hiddentooltip
      fit="small"
      appearance="color-3">
    </mc-avatar>
  </div>
</mc-top-bar>`,
    language: 'javascript',
    copy: true,
  },
];
