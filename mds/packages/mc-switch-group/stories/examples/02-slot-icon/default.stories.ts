import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Switch Group/Examples',
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
      <div style="width: 300px; display:flex; flex-direction: column; gap: 24px">
        <mc-switch-group>
          <div slot="legend">
            Label as HTML, i.e.
            <mc-tooltip>
              <mc-icon slot="trigger" icon="info-circle"></mc-icon>
              <span>The HTML content of the tooltip</span>
            </mc-tooltip>
          </div>
          <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
          <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
          <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
          <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
        </mc-switch-group>
        <mc-switch-group disabled>
          <div slot="legend">
            Label as HTML, i.e.
            <mc-tooltip>
              <mc-icon slot="trigger" icon="info-circle"></mc-icon>
              <span>The HTML content of the tooltip</span>
            </mc-tooltip>
          </div>
          <mc-switch name="fruits" value="Apple" checked>
            <div slot="label">
              Apple
              <mc-tooltip>
                <mc-icon slot="trigger" icon="info-circle"></mc-icon>
                <span>The HTML content of the tooltip</span>
              </mc-tooltip>
            </div>
          </mc-switch>
          <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
          <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
          <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
        </mc-switch-group>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const LegendWithTooltip: StoryObj = {};
