export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-badge";
import "@maersk-global/mds-components-core-button";

// HTML - dot badge
<mc-button label="You have notifications" icon="bell" hiddenlabel>
  <mc-badge slot="badge" position="top" display="pinned" variant="dot" distance="large"></mc-badge>
</mc-button>

// HTML - number badge
<mc-button label="You have 9 notifications" icon="bell" hiddenlabel>
  <mc-badge slot="badge" position="top" display="pinned" label="9" distance="large"></mc-badge>
</mc-button>

// HTML - text badge
<mc-button arialabel="You have new notifications">
  Notifications
  <mc-badge slot="badge" position="top" display="pinned" label="New" distance="large"></mc-badge>
</mc-button>

// HTML - dot badge
<mc-button appearance="neutral" variant="plain" icon="bell" label="You have notifications" hiddenlabel>
  <mc-badge slot="badge" position="top" display="pinned" variant="dot" distance="small"></mc-badge>
</mc-button>

// HTML - number badge
<mc-button appearance="neutral" variant="plain" label="You have 9 notifications" icon="bell" hiddenlabel>
  <mc-badge slot="badge" position="top" display="pinned" label="9" distance="small"></mc-badge>
</mc-button>

// HTML - text badge
<mc-button appearance="neutral" variant="plain" arialabel="You have new notifications">
  Notifications
  <mc-badge slot="badge" position="top" display="pinned" label="New" distance="medium"></mc-badge>
</mc-button>`,
    language: 'javascript',
    copy: true,
  },
];
