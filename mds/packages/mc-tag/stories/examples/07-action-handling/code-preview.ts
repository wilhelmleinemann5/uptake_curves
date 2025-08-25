export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tag';
const tag = document.querySelector('mc-tag');
function dismissTag(){
  tag.remove();
}
tag.addEventListener('dismiss', dismissTag)

// HTML
<mc-tag label="remove" withaction></mc-tag>`,
    language: 'javascript',
    copy: true,
  },
];
