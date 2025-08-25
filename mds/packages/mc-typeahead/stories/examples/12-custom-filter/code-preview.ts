export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-typeahead";
import icons from '@maersk-global/icons/metadata/metadata.json';

const mcTypeahead = document.querySelector('mc-typeahead');
mcTypeahead.data = icons.map((icon) => ({
  label: icon.name, 
  value: icon.name, 
  icon: icon.name, 
  sublabel: icon.tags.join(', ')
}));
mcTypeahead.customfilter = (text, value) => (text.startsWith(value) ? text : null);

// HTML
<mc-typeahead
  label="Icon"
  matchlabelonly
>
</mc-typeahead>`,
    language: 'javascript',
    copy: true,
  },
];
