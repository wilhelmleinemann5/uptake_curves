export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-menu";
import "@maersk-global/mds-components-core/mc-list";
import '@maersk-global/mds-components-core/mc-list-item';
import "@maersk-global/mds-components-core/mc-button";

// CSS
mc-button::part(trailing-icon) {
  transform: rotate(0deg);
  transition: transform 350ms ease-in-out;
}
mc-menu[open] mc-button::part(trailing-icon) {
  transform: rotate(-180deg);
}

// HTML
<mc-menu>
  <mc-button 
    slot="trigger" 
    variant="plain"
    trailingicon="chevron-down">
    Options
  </mc-button>
  <mc-list>
    <mc-list-item label="Settings"></mc-list-item>
    <mc-list-item label="My Account"></mc-list-item>
  </mc-list>      
</mc-menu>`,
    language: 'javascript',
    copy: true,
  },
];
