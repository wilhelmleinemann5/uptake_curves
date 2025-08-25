import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes_pinned } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src';

export default {
  title: 'Components/Badge/Documentation',
  component: 'mc-badge',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes_pinned },
  args: {
    ...getDefaultValues(argTypes_pinned),
  },
};

export const Pinned = {
  render: (args: Args, context: StoryContext) => {
    const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
    const updatedArgs = channel.data.updateStoryArgs ? channel.data.updateStoryArgs[0].updatedArgs : null;
    const code = generateCode('mc-badge', argTypes_pinned, args);
    const modifiedCode = code.map((item) => {
      const modifiedTemplate = item.template
        ? item.template
            .replace(
              /<mc-badge/g,
              `<mc-button variant="plain" appearance="neutral" label="Inbox">\n  <mc-badge\n  display="pinned"\n  slot="badge"`,
            )
            .replace(/<\/mc-badge>/g, '  </mc-badge>\n</mc-button>')
            .replace(
              /<McBadge/g,
              `<McButton variant="plain" appearance="neutral" label="Inbox">\n  <McBadge\n  display="pinned"\n  slot="badge"`,
            )
            .replace(/<\/McBadge>/g, '  </McBadge>\n</McButton>')
        : '';

      return {
        ...item,
        template: modifiedTemplate,
      };
    });
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-button appearance="neutral"> Inbox ${renderBadge(args, updatedArgs)} </mc-button>
      ${renderCodePreview(modifiedCode, context)} `;
  },
};

function renderBadge(args: Args, updatedArgs: Args) {
  // after changing controls
  if (updatedArgs && updatedArgs.position && updatedArgs.position === 'top') {
    return html`<mc-badge
      display="pinned"
      slot="badge"
      .label=${args.label}
      .max=${args.max}
      .variant=${args.variant}
      .fit=${args.fit}
      .appearance=${args.appearance}
      position="top"
      .distance=${args.distance}
    ></mc-badge>`;
  } else if (updatedArgs && updatedArgs.position && updatedArgs.position === 'bottom') {
    return html`<mc-badge
      display="pinned"
      slot="badge"
      .label=${args.label}
      .max=${args.max}
      .variant=${args.variant}
      .fit=${args.fit}
      .appearance=${args.appearance}
      position="bottom"
      .distance=${args.distance}
    ></mc-badge>`;
  } else {
    return html`<mc-badge
      display="pinned"
      slot="badge"
      .label=${args.label}
      .max=${args.max}
      .variant=${args.variant}
      .fit=${args.fit}
      .appearance=${args.appearance}
      .position=${args.position}
      .distance=${args.distance}
    ></mc-badge>`;
  }
}
