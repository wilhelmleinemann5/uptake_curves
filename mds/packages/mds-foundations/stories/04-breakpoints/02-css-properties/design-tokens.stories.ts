import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview } from '@maersk-global/mds-dev-utils';
import themeDesignTokens from '../../../../../dist/packages/mds-design-tokens/maersk/light/json/design-tokens-flat.json';
import '@maersk-global/community-ui-code-preview';
import { preview } from './code-preview';

export default {
  title: 'Layout & navigation/Breakpoints',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const CssProperties = (args: Args, context: StoryContext) => {
  const breakpointsDesignTokens = Object.fromEntries(
    Object.entries(themeDesignTokens).filter(([key]) => key.startsWith('global_breakpoint')),
  );
  const breakpointsCSSVarsHTML = Object.keys(breakpointsDesignTokens).reduce(
    (html, key) =>
      `${html}<tr><td>--mds_${key}</td><td><i class="mds-neutral--weak__text-color">${breakpointsDesignTokens[key] ? `${breakpointsDesignTokens[key]}px` : `${breakpointsDesignTokens[key]}`}</i></td></tr>`,
    '',
  );

  return html`${renderComponentBanner(
      'MDS breakpoint specific CSS properties',
      html`<a
          title="CSS variables can't be used in media or container queries"
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
          >CSS variables (design tokens) can't be used in media or container queries </a
        >, please use our
        <a title="MDS's SASS breakpoint variables" href="/?path=/story/layout-navigation-breakpoints-sass--variables"
          >SASS variables</a
        >
        for that purpose instead, since the var() function works only for property values, not for property names or
        selectors.`,
    )}
    <div
      class="overflow-container mds-table mds-table--zebra-stripes mds-table--scrollable mds-table--header-sticky mds-table--outer-border-none mds-table--horizontal-lines-dashed"
      style="width: 100%"
    >
      <table>
        <thead>
          <tr>
            <th>Css property</th>
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
