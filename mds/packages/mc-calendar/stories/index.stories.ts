import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Calendar/Documentation',
  component: 'mc-calendar',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};
export const Documentation = (args: Args, context: StoryContext) => {
  const urlParams = new URLSearchParams(window.location.search);
  const mdsDocsShowFooter = urlParams.get('mdsdocsshowfooter');
  const footerSlot =
    mdsDocsShowFooter == 'true'
      ? `
  <span class="mds-text--x-small-normal" slot="footer">
    Use arrow keys to navigate between days
  </span>`
      : '';
  ('');
  const code = generateCode('mc-calendar', argTypes, args, footerSlot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div>
      <mc-calendar
        noshadow="${ifDefined(args.noshadow === false ? undefined : 'noshadow')}"
        noborder="${ifDefined(args.noborder === false ? undefined : 'noborder')}"
        ?showweeknumbers=${args.showweeknumbers}
        ?showadjacentmonthdays=${args.showadjacentmonthdays}
        .activedate="${args.activedate}"
        .value="${args.value}"
        .min="${args.min}"
        .max="${args.max}"
        .startofweek="${args.startofweek}"
        .locale="${args.locale}"
        .dayperiod="${args.dayperiod}"
        .nextlabel="${args.nextlabel}"
        .previouslabel="${args.previouslabel}"
        .customize="${args.customize}"
        .customstyles="${args.customstyles}"
        .yearcap="${args.yearcap}"
        @dateselected="${(event) => action('dateselected')(event.detail)}"
      >
        ${unsafeHTML(footerSlot)}
      </mc-calendar>
    </div>
    ${renderCodePreview(code, context)} `;
};
