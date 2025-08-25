import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import themeDesignTokens from '../../../../../../dist/packages/mds-design-tokens/maersk/light/json/design-tokens-flat.json';
import { preview } from './code-preview';

export default {
  title: 'Layout & navigation/Breakpoints/SASS',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

const breakpointsDesignTokens = Object.fromEntries(
  Object.entries(themeDesignTokens).filter(([key]) => key.startsWith('global_breakpoint')),
);

export const Variables = (args: Args, context: StoryContext) => {
  const breakpointsCSSVarsHTML = Object.keys(breakpointsDesignTokens).reduce(
    (html, key) =>
      `${html}<tr><td>$mds_${key.replace('global_', '')}</td><td><i class="mds-neutral--weak__text-color">${breakpointsDesignTokens[key] ? `${breakpointsDesignTokens[key]}px` : `${breakpointsDesignTokens[key]}`}</i></td></tr>`,
    '',
  );

  return html` <div
      class="overflow-container mds-table mds-table--zebra-stripes mds-table--scrollable mds-table--header-sticky mds-table--outer-border-none mds-table--horizontal-lines-dashed"
      style="width: 100%"
    >
      <table>
        <thead>
          <tr>
            <th>Sass variable property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${unsafeHTML(breakpointsCSSVarsHTML)}
        </tbody>
      </table>
    </div>
    ${renderCodePreview(preview, context)}`;
};
