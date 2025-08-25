export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-select';
import '@maersk-global/mds-components-core-option';

// HTML
<mc-popover>
  <mc-button slot="trigger" label="Click me"></mc-button>
  <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px;">
    <mc-select label="Select a port">
      <mc-option value="CNSHA">Shanghai, China</mc-option>
      <mc-option value="SGSIN">Singapore</mc-option>
      <mc-option value="CNNBO">Ningbo-Zhoushan, China</mc-option>
      <mc-option value="CNSZX">Shenzhen, China</mc-option>
      <mc-option value="CNGZH">Guangzhou, China</mc-option>
      <mc-option value="KRPUS">Busan, South Korea</mc-option>
      <mc-option value="CNTAO">Qingdao, China</mc-option>
      <mc-option value="HKHKG">Hong Kong</mc-option>
    </mc-select>
    <mc-button label="Book"></mc-button>
  </div>
</mc-popover>`,
    language: 'javascript',
    copy: true,
  },
];
