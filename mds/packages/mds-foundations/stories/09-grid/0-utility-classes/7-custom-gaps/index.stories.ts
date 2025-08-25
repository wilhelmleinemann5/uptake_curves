import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getDefaultValues } from '@maersk-global/mds-dev-utils';
import { argTypes } from '../../examples-arg-types';
import '@maersk-global/community-ui-code-preview';
import { hologramStyles } from '../../grid-hologram';
import { preview, example, gridCssClasses } from './code-preview';
import { templateStory } from '../../story-utils';
import { cssClassNamesGeneratorDensityBreakpoint } from '../css-class-names-generator';

export default {
  title: 'Layout & navigation/Grid/Css Utility Classes',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};

export const CustomGaps = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(hologramStyles(args))}
    <div class="wrapper">
      ${unsafeHTML(cssClassNamesGeneratorDensityBreakpoint('mds-%breakpoint%-gap-%i%', 'gap: %i%;'))}
      ${unsafeHTML(templateStory(args, example, gridCssClasses))} ${renderCodePreview(preview, context)}
    </div>`;
};
