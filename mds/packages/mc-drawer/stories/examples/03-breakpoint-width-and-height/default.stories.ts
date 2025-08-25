import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
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

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-drawer
        .customsize=${{
          xs: '100%',
          sm: '300px',
          md: '400px',
          lg: '500px',
          xl: '600px',
        }}
        position="left"
      >
        <span slot="heading">Responsive Drawer</span>
        <div>
          This drawer has responsive width based on breakpoints. To use responsive height, please change the position to
          top/bottom.
        </div>
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-drawer>
      <mc-button style="width: fit-content;" @click=${toggleDrawer}>Open drawer</mc-button>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const WidthAndHeightPerBreakpoint: StoryObj = {};
