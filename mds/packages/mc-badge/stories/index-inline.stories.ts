import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes_inline } from './argTypes';
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
  argTypes: { ...argTypes_inline },
  args: {
    ...getDefaultValues(argTypes_inline),
  },
};

export const Inline = {
  render: (args: Args, context: StoryContext) => {
    const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
    const updatedArgs = channel.data.updateStoryArgs ? channel.data.updateStoryArgs[0].updatedArgs : null;
    const code = generateCode('mc-badge', argTypes_inline, args);
    const modifiedCode = code.map((item) => {
      const modifiedTemplate = item.template
        ? item.template
            .replace(
              /<mc-badge/g,
              `<mc-list>\n  <mc-list-item label="Inbox">\n    <mc-badge\n  display="inline"\n  slot="badge"`,
            )
            .replace(
              /<\/mc-badge>/g,
              '    </mc-badge>\n  </mc-list-item>\n  <mc-list-item label="Calendar"></mc-list-item>\n  <mc-list-item label="Sent"></mc-list-item>\n</mc-list>',
            )
            .replace(
              /<McBadge/g,
              `<McList>\n  <McListItem label="Inbox">\n    <McBadge\n  display="inline"\n  slot="badge"`,
            )
            .replace(
              /<\/McBadge>/g,
              '    </McBadge>\n  </McListItem>\n    <McListItem label="Calendar"></McListItem>\n    <McListItem label="Sent"></McListItem>\n</McList>',
            )
        : '';

      return {
        ...item,
        template: modifiedTemplate,
      };
    });
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-list>
        <mc-list-item label="Inbox">${renderBadge(args, updatedArgs)}</mc-list-item>
        <mc-list-item label="Calendar"></mc-list-item>
        <mc-list-item label="Sent"></mc-list-item>
      </mc-list>
      ${renderCodePreview(modifiedCode, context)} `;
  },
};

function renderBadge(args: Args, updatedArgs: Args) {
  // after changing controls
  if (updatedArgs && updatedArgs.position && updatedArgs.position === 'right') {
    return html`<mc-badge
      display="inline"
      slot="badge"
      .label=${args.label}
      .max=${args.max}
      .variant=${args.variant}
      .fit=${args.fit}
      .appearance=${args.appearance}
      position="right"
    ></mc-badge>`;
  } else if (updatedArgs && updatedArgs.position && updatedArgs.position === 'left') {
    return html`<mc-badge
      display="inline"
      slot="badge"
      .label=${args.label}
      .max=${args.max}
      .variant=${args.variant}
      .fit=${args.fit}
      .appearance=${args.appearance}
      position="left"
    ></mc-badge>`;
  } else {
    return html`<mc-badge
      display="inline"
      slot="badge"
      .label=${args.label}
      .max=${args.max}
      .variant=${args.variant}
      .fit=${args.fit}
      .appearance=${args.appearance}
      .position=${args.position}
    ></mc-badge>`;
  }
}
