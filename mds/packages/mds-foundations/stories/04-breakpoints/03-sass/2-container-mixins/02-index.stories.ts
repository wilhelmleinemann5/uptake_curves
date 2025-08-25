import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview } from '@maersk-global/mds-dev-utils';
import { markup, preview } from './code-preview';
import themeDesignTokens from '../../../../../../dist/packages/mds-design-tokens/maersk/light/json/design-tokens-flat.json';
import '@maersk-global/community-ui-code-preview';

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

const css = `<style>
  .box {
    border-radius: var(--mds_brand_border_medium_radius);
    min-width: var(--mds_global_breakpoint_xs_min-width);
    padding: 10px 16px;
  }

  @container (min-width: ${breakpointsDesignTokens['global_breakpoint_xs_min-width']}px) {
    .box {
      background-color: var(--mds_brand_appearance_neutral_weak_background-color);
      color: var(--mds_brand_appearance_neutral_weak_on-background-color);
    }
  }

  @container (min-width: ${breakpointsDesignTokens['global_breakpoint_sm_min-width']}px) {
    .box {
      background-color: var(--mds_brand_appearance_info_weak_background-color);  
      color: var(--mds_brand_appearance_info_weak_on-background-color);
    }
  }

  @container (min-width: ${breakpointsDesignTokens['global_breakpoint_md_min-width']}px) {
    .box {
      background-color: var(--mds_brand_appearance_success_weak_background-color);
      color: var(--mds_brand_appearance_success_weak_on-background-color);
    }
  }
</style>`;

export const ContainerQueryMixins = (args: Args, context: StoryContext) => {
  return html`${renderComponentBanner(
    'MDS container (@container) SASS mixins',
    html`As shown in the code example, use any of the following @container query mixins to apply styles based on the
      container size. <br />To use MDS container mixins, ensure that at least one of your container elements has the
      <strong>container-type: inline-size;</strong> property.`,
    'info',
  )}
    <div
      class="overflow-container mds-table mds-table--zebra-stripes mds-table--scrollable mds-table--header-sticky mds-table--outer-border-none mds-table--horizontal-lines-dashed"
      style="width: 100%"
    >
      <table>
        <thead>
          <tr>
            <th>Mixin</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>mds-container-above('xs')</td>
            <td><i class="mds-neutral--weak__text-color">641px - ...</i></td>
          </tr>
          <tr>
            <td>mds-container-above('sm')</td>
            <td><i class="mds-neutral--weak__text-color">1025px - ...</i></td>
          </tr>
          <tr>
            <td>mds-container-above('md')</td>
            <td><i class="mds-neutral--weak__text-color">1441px - ...</i></td>
          </tr>
          <tr>
            <td>mds-container-above('lg')</td>
            <td><i class="mds-neutral--weak__text-color">1921px - ...</i></td>
          </tr>
          <tr>
            <td>mds-container-below('sm')</td>
            <td><i class="mds-neutral--weak__text-color">0 - 640px</i></td>
          </tr>
          <tr>
            <td>mds-container-below('md')</td>
            <td><i class="mds-neutral--weak__text-color">0 - 1024px</i></td>
          </tr>
          <tr>
            <td>mds-container-below('lg')</td>
            <td><i class="mds-neutral--weak__text-color">0 - 1440px</i></td>
          </tr>
          <tr>
            <td>mds-container-below('xl')</td>
            <td><i class="mds-neutral--weak__text-color">0 - 1920px</i></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="width: 100%">${unsafeHTML(css)} ${unsafeHTML(markup)}</div> ${renderCodePreview(preview, context)}</div>`;
};
