import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import icons from '@maersk-global/icons/metadata/metadata.json';

const meta: Meta = {
  title: 'Components/Typeahead/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const toggleDialog = () => {
      const mcDialog = document.body.querySelector('mc-dialog');
      mcDialog.open = true;
    };
    return html`${unsafeHTML(generateThemeSelector())} <style></style>
      <mc-button @click="${toggleDialog}">Pick an icon</mc-button>
      <mc-dialog height="300px" width="50%" heading="Pick an icon">
        <p>Please select the icon you want to use</p>
        <mc-typeahead
          name="typeahead"
          .data="${icons.map((icon) => ({
            label: icon.name,
            value: icon.name,
            icon: icon.name,
            sublabel: icon.tags.join(', '),
          }))}"
          label="Icon"
          clearbutton
          placeholder="Start typing icon name or category"
        ></mc-typeahead>
        <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel"
          >Cancel</mc-button
        >
        <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">Save</mc-button>
      </mc-dialog>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const InDialog: StoryObj = {};
