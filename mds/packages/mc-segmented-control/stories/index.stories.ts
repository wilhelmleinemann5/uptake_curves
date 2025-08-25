import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../src/index';

export default {
  title: 'Components/Segmented Control/Group/Documentation',
  component: 'mc-segmented-control',
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
  const mdsDocsButtonConfig = urlParams.get('mdsdocsbuttonconfig');
  const mdsDocsWithBadge = urlParams.get('mdsdocswithbadge');
  const badge =
    mdsDocsWithBadge == 'true' ? `<mc-badge slot="badge" position="left" display="inline" label="4"></mc-badge>` : '';
  let slot;
  switch (mdsDocsButtonConfig) {
    case 'text-only':
      slot = `
    <mc-segmented-control-item selected value="Line">Line</mc-segmented-control-item>
    <mc-segmented-control-item value="Bar">Bar</mc-segmented-control-item>
    <mc-segmented-control-item value="Stacked">Stacked${badge}</mc-segmented-control-item>
    <mc-segmented-control-item value="Pie">Pie</mc-segmented-control-item>`;
      break;
    case 'icon-only':
      slot = `
    <mc-segmented-control-item selected value="Line" icon="chart-line-up" hiddenlabel>Line</mc-segmented-control-item>
    <mc-segmented-control-item value="Bar" icon="chart-bars-vertical" hiddenlabel>Bar</mc-segmented-control-item>
    <mc-segmented-control-item value="Stacked" icon="chart-bars-vertical-stacked" hiddenlabel>Stacked${badge}</mc-segmented-control-item>
    <mc-segmented-control-item value="Pie" icon="chart-pie" hiddenlabel>Pie</mc-segmented-control-item>`;
      break;
    default:
      slot = `
    <mc-segmented-control-item selected value="Line" icon="chart-line-up">Line</mc-segmented-control-item>
    <mc-segmented-control-item value="Bar" icon="chart-bars-vertical">Bar</mc-segmented-control-item>
    <mc-segmented-control-item value="Stacked" icon="chart-bars-vertical-stacked">Stacked${badge}</mc-segmented-control-item>
    <mc-segmented-control-item value="Pie" icon="chart-pie">Pie</mc-segmented-control-item>`;
  }
  const code = generateCode('mc-segmented-control', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-segmented-control
      fit="${args.fit}"
      aria-label="Office"
      .value="${args.value}"
      .width="${args.width}"
      @listchange="${(event) => action('listchange')(event.detail)}"
    >
      ${unsafeHTML(slot)}
    </mc-segmented-control>
    ${renderCodePreview(code, context)}`;
};
