import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-switch';

export default {
  title: 'Components/Switch Group/Examples',
  parameters: {
    docs: {
      source: {
        code: preview,
      },
    },
  },
};

export const TwoColumnLayout = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
    <style>
      mc-switch-group::part(fieldset-container) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
      }
    </style>

    <mc-switch-group legend="Select features to enable" hint="Choose one or more">
      <mc-switch name="features" value="Notifications" label="Notifications"></mc-switch>
      <mc-switch name="features" value="DarkMode" label="Dark Mode"></mc-switch>
      <mc-switch name="features" value="AutoSave" label="Auto Save"></mc-switch>
      <mc-switch name="features" value="Analytics" label="Analytics"></mc-switch>
      <mc-switch name="features" value="Sync" label="Cloud Sync"></mc-switch>
      <mc-switch name="features" value="Backups" label="Auto Backups"></mc-switch>
    </mc-switch-group>
    ${renderCodePreview(preview, context)} `;
};
