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
  mc-menu.menu-open mc-button::part(trailing-icon) {
    transform: rotate(-180deg);
  }
  
  // HTML
  <mc-menu trigger="click">
    <mc-button
      slot="trigger"
      variant="plain"
      trailingicon="chevron-down"
      @click=${(e: Event) => {
        const menu = (e.currentTarget as HTMLElement).closest('mc-menu');
        menu?.classList.toggle('menu-open');
      }}
    >
      User xyz
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
