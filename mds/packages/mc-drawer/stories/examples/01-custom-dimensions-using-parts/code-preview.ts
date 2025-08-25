export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-drawer';
import '@maersk-global/mds-components-core/mc-button';

const toggleDrawer = () => {
  const drawer = document.querySelector('mc-drawer');
  if (!drawer) return;
  drawer.open = !drawer.open;
};

// SCSS
/* Simple width adjustment */
mc-drawer::part(dialog) {
  width: 75%;
}

/* You can use our SCSS mixins for media queries if you want to create custom dimensions based on the screen size. */
@import '@maersk-global/mds-foundations/scss/mixins/_media.scss';
@include mds-container-above('md') {
  mc-drawer::part(dialog) {
    width: 50%;
  }
}
// HTML
<mc-drawer>
  <span slot="heading">Heading</span>
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <mc-button slot="footer" dialogaction="close">Close</mc-button>
</mc-drawer>
<mc-button style="width: fit-content;" @click=\${toggleDrawer}>Open drawer</mc-button>`,
    language: 'javascript',
    copy: true,
  },
];
