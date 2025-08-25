import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import cities from './citiesRo';

const meta: Meta = {
  title: 'Components/Typeahead/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <mc-typeahead
        name="typeahead"
        .data="${cities.map((city) => ({
          label: city.cityName,
          value: city.cityName,
          icon: ['factory', 'house', 'office-1', 'office-2', 'store', 'warehouse', 'warehouse-reefer'][
            Math.floor(Math.random() * 7)
          ],
          sublabel: city.stateName,
        }))}"
        label="Cities in Romania"
        showlistonfocus
        maxoptions="3000"
        clearbutton
      ></mc-typeahead
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const BigStaticData: StoryObj = {};
