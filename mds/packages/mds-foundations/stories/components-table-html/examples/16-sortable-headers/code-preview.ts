import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<body class="mds">
  <div class="mds-table mds-table--scrollable">
    <table>
      <thead>
        <tr>
          <th class="mds-table__header-cell--sortable"><mc-button label="Name" trailingicon="arrows-down-up" appearance="neutral" variant="plain" width="full-width" justifyitems="left" /></th>
          <th class="mds-table__header-cell--sortable"><mc-button label="Last port" trailingicon="arrows-down-up" appearance="neutral" variant="plain" width="full-width" justifyitems="left" /></th>
          <th class="mds-table__header-cell--sortable"><mc-button label="Built (year)" trailingicon="arrow-down" appearance="neutral" variant="plain" width="full-width" justifyitems="right" /></th>
          <th class="mds-table__header-cell--sortable"><mc-button label="Length (m)" trailingicon="arrows-down-up" appearance="neutral" variant="plain" width="full-width" justifyitems="right" /></th>
          <th class="mds-table__header-cell--sortable"><mc-button label="Capacity (TEU)" trailingicon="arrows-down-up" appearance="neutral" variant="plain" width="full-width" justifyitems="right" /></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Madrid Maersk</td>
          <td>Shanghai</td>
          <td class="mds-table__cell--number">2017</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">19,630</td>
        </tr>
        <tr>
          <td>Mary Maersk</td>
          <td>Busan</td>
          <td class="mds-table__cell--number">2013</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">18,270</td>
        </tr>
        <tr>
          <td>Gerner Maersk</td>
          <td>Rotterdam</td>
          <td class="mds-table__cell--number">2008</td>
          <td class="mds-table__cell--number">367</td>
          <td class="mds-table__cell--number">9,038</td>
        </tr>
        <tr>
          <td>Emma Maersk</td>
          <td>Los Angeles</td>
          <td class="mds-table__cell--number">2006</td>
          <td class="mds-table__cell--number">398</td>
          <td class="mds-table__cell--number">15,550</td>
        </tr>
        <tr>
          <td>Johannes Maersk</td>
          <td>Yokohama</td>
          <td class="mds-table__cell--number">2001</td>
          <td class="mds-table__cell--number">216</td>
          <td class="mds-table__cell--number">283</td>
        </tr>
        <tr>
          <td>Svendborg Maersk</td>
          <td>Manila</td>
          <td class="mds-table__cell--number">1998</td>
          <td class="mds-table__cell--number">347</td>
          <td class="mds-table__cell--number">8,160</td>
        </tr>
        <tr>
          <td>Tove Maersk</td>
          <td>Santos</td>
          <td class="mds-table__cell--number">1992</td>
          <td class="mds-table__cell--number">162</td>
          <td class="mds-table__cell--number">1,446</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>`;

export const preview = [
  {
    label: 'HTML',
    template: template,
    language: 'javascript',
  } as IMcCCode,
];
