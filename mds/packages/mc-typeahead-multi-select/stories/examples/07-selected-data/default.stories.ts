import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { ports } from './ports';

const meta: Meta = {
  title: 'Components/Typeahead Multi Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const selectedPorts = [
      { label: 'Shanghai', value: 'CNSHA', country: 'China', region: 'Asia' },
      { label: 'Singapore', value: 'SGSIN', country: 'Singapore', region: 'Asia' },
    ];

    return html`${unsafeHTML(generateThemeSelector())}
     <div style="width: 400px;">
        <mc-typeahead-multi-select
          name="typeahead"
          .selecteddata="${selectedPorts}"
          clearbutton
          .data="${ports.map((harbor) => ({
            label: harbor.label,
            value: harbor.value,
            sublabel: `${harbor.country}, ${harbor.region}`,
          }))}"
          label="Ports"
        ></mc-typeahead-multi-select></div>
        ${renderCodePreview(preview, context)}</mc-drawer
      >`;
  },
};

export default meta;
export const PreselectedData: StoryObj = {};
