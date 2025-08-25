import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Checkbox Group/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <mc-checkbox-group>
        <div class="legend" slot="legend">
          Label as HTML, i.e.
          <mc-tooltip>
            <mc-icon slot="trigger" icon="info-circle"></mc-icon>
            <span>The HTML content of the tooltip</span>
          </mc-tooltip>
        </div>
        <mc-checkbox name="fruits" value="Apple" label="Apple" checked></mc-checkbox>
        <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
        <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
        <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
      </mc-checkbox-group>
      <mc-checkbox-group disabled>
        <div class="legend" slot="legend">
          Label as HTML, i.e.
          <mc-tooltip>
            <mc-icon slot="trigger" icon="info-circle"></mc-icon>
            <span>The HTML content of the tooltip</span>
          </mc-tooltip>
        </div>
        <mc-checkbox name="fruits" value="Apple" checked>
          <div slot="label">
            Apple
            <mc-tooltip>
              <mc-icon slot="trigger" icon="info-circle"></mc-icon>
              <span>The HTML content of the tooltip</span>
            </mc-tooltip>
          </div>
        </mc-checkbox>
        <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
        <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
        <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
      </mc-checkbox-group>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const LegendWithTooltip: StoryObj = {};
