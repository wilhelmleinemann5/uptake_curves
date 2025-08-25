export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-%%PACKAGE_NAME%%";
// CSS
<style>
  mc-component::part(hypothetical-csspart-name) {
    font-weight: bold;
    padding-left: 16px;
  }
</style>
// HTML
<mc-component></mc-component>`,
    language: 'javascript',
    copy: true,
  },
];
