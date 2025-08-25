import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { renderComponentBanner, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import { preview, template } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { componentBanner } from '../../story-utils';

export default {
  title: 'Layout & navigation/Grid/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const ContainerGrid = (args: Args, context: StoryContext) => {
  return html`${renderComponentBanner('MDS grid system', componentBanner)}
    <style>
      .xs {
        width: 360px;
      }

      .xs .mds-grid :first-child {
        height: 150px;
      }

      .sm {
        width: var(--mds_global_breakpoint_sm_min-width);
      }

      .md {
        width: var(--mds_global_breakpoint_md_min-width);
      }

      .mds-grid > * {
        min-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .mds-grid > :first-child {
        background-color: var(--mds_brand_appearance_warning_weak_background-color);
        color: var(--mds_foundations_body_text-color);
      }

      .mds-grid > :nth-child(2) {
        background-color: var(--mds_brand_appearance_success_weak_background-color);
      }

      .mds-grid > :nth-child(3) {
        background-color: var(--mds_brand_appearance_neutral_strong_background-color);
        color: var(--mds_foundations_body_text-color);
      }

      .mds-grid > :nth-child(4) {
        background-color: var(--mds_brand_appearance_error_weak_background-color);
      }

      .mds-grid > :nth-child(5) {
        background-color: var(--mds_brand_appearance_secondary_weak_background-color);
      }
    </style>
    <div class="mds-content">
      <h1>MDS container grid</h1>
      <p>
        A container grid dynamically adjusts its columns based on the width of its ascendant container that has class
        <code>mds-container</code>
      </p>
      <p>
        The examples below shows the same HTML markup (see the code-preview at the bottom of this page) placed in
        different parent sizes. Depending on the parent container width, the grid can have different number of columns,
        column spans, etc.:
      </p>
      <h2>X-small container (360px)</h2>
      ${unsafeHTML(template('xs'))}

      <h2>Small container (600px)</h2>
      ${unsafeHTML(template('sm'))}

      <h2>Medium container (900px)</h2>
      ${unsafeHTML(template('md'))}
    </div>
    ${renderCodePreview(preview, context)}`;
};
