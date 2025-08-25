import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { preview } from './code-preview';
import { renderComponentBanner, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Components/Table HTML/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const row_selector = (args: Args, context: StoryContext) => {
  const handleChange = (e) => {
    const row = e.target.parentElement.parentElement;
    const selectedClassName = 'mds_table__row--selected';
    if (row.classList.contains(selectedClassName)) {
      row.classList.remove(selectedClassName);
    } else {
      row.classList.add(selectedClassName);
    }
  };
  return html`${unsafeHTML(generateThemeSelector())}
    ${renderComponentBanner(
      'Row selector',
      html`<p>
        It is recommended to use the table web component for row selectors. However, it is possible to wire sorting up
        manually and styles are provided when using mc-checkbox.
      </p>`,
    )}
    <body class="mds">
      <div class="mds-table">
        <table>
          <thead>
            <tr>
              <th class="mds-table__column--row-selector">Select</th>
              <th>Name</th>
              <th>Last port</th>
              <th class="mds-text-right">Built (year)</th>
              <th class="mds-text-right">Length (m)</th>
              <th class="mds-text-right">Capacity (TEU)</th>
            </tr>
          </thead>
          <tbody @change=${handleChange}>
            <tr class="mds_table__row--selected">
              <td class="mds-table__column--row-selector"><mc-checkbox label="De-Select row" hiddenlabel checked /></td>
              <td>Madrid Maersk</td>
              <td>Shanghai</td>
              <td class="mds-text-right">2017</td>
              <td class="mds-text-right">399</td>
              <td class="mds-text-right">19,630</td>
            </tr>
            <tr>
              <td class="mds-table__column--row-selector"><mc-checkbox label="Select row" hiddenlabel /></td>
              <td>Mary Maersk</td>
              <td>Busan</td>
              <td class="mds-text-right">2013</td>
              <td class="mds-text-right">399</td>
              <td class="mds-text-right">18,270</td>
            </tr>
            <tr class="mds_table__row--selected">
              <td class="mds-table__column--row-selector"><mc-checkbox label="De-Select row" hiddenlabel checked /></td>
              <td>Gerner Maersk</td>
              <td>Rotterdam</td>
              <td class="mds-text-right">2008</td>
              <td class="mds-text-right">367</td>
              <td class="mds-text-right">9,038</td>
            </tr>
            <tr>
              <td class="mds-table__column--row-selector"><mc-checkbox label="Select row" hiddenlabel /></td>
              <td>Emma Maersk</td>
              <td>Los Angeles</td>
              <td class="mds-text-right">2006</td>
              <td class="mds-text-right">398</td>
              <td class="mds-text-right">15,550</td>
            </tr>
            <tr>
              <td class="mds-table__column--row-selector"><mc-checkbox label="Select row" hiddenlabel /></td>
              <td>Johannes Maersk</td>
              <td>Yokohama</td>
              <td class="mds-text-right">2001</td>
              <td class="mds-text-right">216</td>
              <td class="mds-text-right">283</td>
            </tr>
            <tr>
              <td class="mds-table__column--row-selector"><mc-checkbox label="Select row" hiddenlabel /></td>
              <td>Svendborg Maersk</td>
              <td>Manila</td>
              <td class="mds-text-right">1998</td>
              <td class="mds-text-right">347</td>
              <td class="mds-text-right">8,160</td>
            </tr>
            <tr class="mds_table__row--selected">
              <td class="mds-table__column--row-selector"><mc-checkbox label="De-Select row" hiddenlabel checked /></td>
              <td>Tove Maersk</td>
              <td>Santos</td>
              <td class="mds-text-right">1992</td>
              <td class="mds-text-right">162</td>
              <td class="mds-text-right">1,446</td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
    ${renderCodePreview(preview, context)}`;
};
