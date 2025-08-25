import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<body class="mds">
  <div class="mds-table mds-table--vertical-align-top mds-table--scrollable">
    <table>
      <thead>
        <tr>
          <th>
            <div>Name</div>
            <div class="mds-table__subtext">Vessel Type</div>
          </th>
          <th>Last port</th>
          <th class="mds-table__cell--number">Built (year)</th>
          <th class="mds-table__cell--number">Length (m)</th>
          <th class="mds-table__cell--number">Capacity (TEU)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div>Madrid Maersk</div>
            <div class="mds-table__subtext">Container Ship</div>
          </td>
          <td>Shanghai</td>
          <td class="mds-table__cell--number">2017</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">19,630</td>
        </tr>
        <tr>
          <td>
            <div>Mary Maersk</div>
            <div class="mds-table__subtext">Container Ship</div>
          </td>
          <td>Busan</td>
          <td class="mds-table__cell--number">2013</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">18,270</td>
        </tr>
        <tr>
          <td>
            <div>Gerner Maersk</div>
            <div class="mds-table__subtext">Container Ship</div>
          </td>
          <td>Rotterdam</td>
          <td class="mds-table__cell--number">2008</td>
          <td class="mds-table__cell--number">367</td>
          <td class="mds-table__cell--number">9,038</td>
        </tr>
        <tr>
          <td>
            <div>Emma Maersk</div>
            <div class="mds-table__subtext">Container Ship</div>
          </td>
          <td>Los Angeles</td>
          <td class="mds-table__cell--number">2006</td>
          <td class="mds-table__cell--number">398</td>
          <td class="mds-table__cell--number">15,550</td>
        </tr>
        <tr>
          <td>
            <div>Johannes Maersk</div>
            <div class="mds-table__subtext">Container Ship</div>
          </td>
          <td>Yokohama</td>
          <td class="mds-table__cell--number">2001</td>
          <td class="mds-table__cell--number">216</td>
          <td class="mds-table__cell--number">283</td>
        </tr>
        <tr>
          <td>
            <div>Svendborg Maersk</div>
            <div class="mds-table__subtext">Container Ship</div>
          </td>
          <td>Manila</td>
          <td class="mds-table__cell--number">1998</td>
          <td class="mds-table__cell--number">347</td>
          <td class="mds-table__cell--number">8,160</td>
        </tr>
        <tr>
          <td>
            <div>Tove Maersk</div>
            <div class="mds-table__subtext">Container Ship</div>
          </td>
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
