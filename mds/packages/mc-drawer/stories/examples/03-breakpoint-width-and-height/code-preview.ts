export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-drawer';
import '@maersk-global/mds-components-core/mc-button';

const mcDrawer = document.querySelector('mc-drawer');

drawer.customsize = {
  xs: '100%',
  sm: '300px',
  md: '400px',
  lg: '500px',
  xl: '600px',
}
const toggleDrawer = () => {
  const drawer = document.querySelector('mc-drawer');
  if (drawer) {
    drawer.open = !drawer.open;
  }
};

// HTML
<mc-drawer position="left">
  <span slot="heading">Responsive Drawer</span>
  <div>This drawer has responsive width based on breakpoints. To use responsive height, please change the position to top/bottom.</div>
  <mc-button slot="footer" dialogaction="close">Close</mc-drawer>
</mc-drawer>
<mc-button onclick="toggleDrawer()">Open drawer</mc-button>
`,
    language: 'javascript',
    copy: true,
  },
];
