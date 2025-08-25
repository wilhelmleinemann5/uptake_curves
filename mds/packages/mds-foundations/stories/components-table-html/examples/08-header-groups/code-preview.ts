import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<body class="mds">
  <div class="mds-table mds-table--nowrap mds-table--vertical-lines-solid mds-table--scrollable">
    <table>
      <thead>
        <tr>
          <th rowspan="2" style="width: 100%;">Name</th>
          <th class="mds-table__cell--text-center" colspan="2">Updates</th>
          <th class="mds-table__cell--text-center" colspan="2">Statistics</th>
        </tr>
        <tr>
          <th>Status</th>
          <th>Last port</th>
          <th class="mds-table__cell--number">Length (m)</th>
          <th class="mds-table__cell--number">Capacity (TEU)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Madrid Maersk</td>
          <td><mc-tag appearance="success" label="On schedule"></mc-tag></td>
          <td>Shanghai</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">19,630</td>
        </tr>
        <tr>
          <td>Mary Maersk</td>
          <td><mc-tag appearance="success" label="On schedule"></mc-tag></td>
          <td>Busan</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">18,270</td>
        </tr>
        <tr>
          <td>Gerner Maersk</td>
          <td><mc-tag appearance="error" label="Stalled"></mc-tag></td>
          <td>Rotterdam</td>
          <td class="mds-table__cell--number">367</td>
          <td class="mds-table__cell--number">9,038</td>
        </tr>
        <tr>
          <td>Emma Maersk</td>
          <td><mc-tag appearance="success" label="On schedule"></mc-tag></td>
          <td>Los Angeles</td>
          <td class="mds-table__cell--number">398</td>
          <td class="mds-table__cell--number">15,550</td>
        </tr>
        <tr>
          <td>Johannes Maersk</td>
          <td><mc-tag appearance="warning" label="Delayed"></mc-tag></td>
          <td>Yokohama</td>
          <td class="mds-table__cell--number">216</td>
          <td class="mds-table__cell--number">283</td>
        </tr>
        <tr>
          <td>Svendborg Maersk</td>
          <td><mc-tag appearance="success" label="On schedule"></mc-tag></td>
          <td>Manila</td>
          <td class="mds-table__cell--number">347</td>
          <td class="mds-table__cell--number">8,160</td>
        </tr>
        <tr>
          <td>Tove Maersk</td>
          <td><mc-tag label="Unknown"></mc-tag></td>
          <td>Santos</td>
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
