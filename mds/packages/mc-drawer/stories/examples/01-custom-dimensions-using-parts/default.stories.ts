import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcDrawer } from '../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Drawer/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const toggleDrawer = () => {
      const drawer = document.querySelector('mc-drawer') as IMcDrawer;
      if (!drawer) return;
      drawer.open = !drawer.open;
    };
    const styles = css`
      mc-drawer::part(dialog) {
        width: 75%;
      }
      @media only screen and (min-width: 900px) {
        mc-drawer::part(dialog) {
          width: 50%;
        }
      }
    `;
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        ${styles}
      </style>
      <mc-drawer>
        <span slot="heading">Heading</span>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </div>
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-drawer>
      <mc-button style="width: fit-content;" @click=${toggleDrawer}>Open drawer</mc-button>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const CustomDimentsionsUsingParts: StoryObj = {};
