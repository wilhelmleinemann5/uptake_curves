export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-select";
import '@maersk-global/mds-components-core/mc-option';
import icons from '@maersk-global/icons/metadata/metadata.json';

const getIconList = () => {
  const iconList = icons.slice(0).map((icon) => {
    return icon.name;
  });
  return iconList;
};

// HTML
<mc-select name="select" label="Select item" hiddenlabel placeholder="Pick an icon">
  \${options.map(icon => html\`<mc-option value="\${icon}" label="\${icon}"></mc-option>\`)}
</mc-select>`,
    language: 'javascript',
    copy: true,
  },
];
