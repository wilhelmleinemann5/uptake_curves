import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<body class="mds">
  <div class="mds-table mds-table--nowrap mds-table--footer mds-table--vertical-lines-solid mds-table--scrollable mds-table--header-sticky mds-table--footer-sticky mds-table--scrollable" style="width: 360px; height: 224px;">
    <table tabindex="0">
      <thead>
        <tr>
          <th class="mds-table__column--sticky">Name</th>
          <th>Last port</th>
          <th class="mds-table__cell--number">Built (year)</th>
          <th class="mds-table__cell--number">Length (m)</th>
          <th class="mds-table__cell--number">Capacity (TEU)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="mds-table__column--sticky">Madrid Maersk</th>
          <td>Shanghai</td>
          <td class="mds-table__cell--number">2017</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">19,630</td>
        </tr>
        <tr>
          <th class="mds-table__column--sticky">Mary Maersk</th>
          <td>Busan</td>
          <td class="mds-table__cell--number">2013</td>
          <td class="mds-table__cell--number">399</td>
          <td class="mds-table__cell--number">18,270</td>
        </tr>
        <tr>
          <th class="mds-table__column--sticky">Gerner Maersk</th>
          <td>Rotterdam</td>
          <td class="mds-table__cell--number">2008</td>
          <td class="mds-table__cell--number">367</td>
          <td class="mds-table__cell--number">9,038</td>
        </tr>
        <tr>
          <th class="mds-table__column--sticky">Emma Maersk</th>
          <td>Los Angeles</td>
          <td class="mds-table__cell--number">2006</td>
          <td class="mds-table__cell--number">398</td>
          <td class="mds-table__cell--number">15,550</td>
        </tr>
        <tr>
          <th class="mds-table__column--sticky">Johannes Maersk</th>
          <td>Yokohama</td>
          <td class="mds-table__cell--number">2001</td>
          <td class="mds-table__cell--number">216</td>
          <td class="mds-table__cell--number">283</td>
        </tr>
        <tr>
          <th class="mds-table__column--sticky">Svendborg Maersk</th>
          <td>Manila</td>
          <td class="mds-table__cell--number">1998</td>
          <td class="mds-table__cell--number">347</td>
          <td class="mds-table__cell--number">8,160</td>
        </tr>
        <tr>
          <th class="mds-table__column--sticky">Tove Maersk</th>
          <td>Santos</td>
          <td class="mds-table__cell--number">1992</td>
          <td class="mds-table__cell--number">162</td>
          <td class="mds-table__cell--number">1,446</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="mds-table__column--sticky">Average/Total:</td>
          <td></td>
          <td></td>
          <td class="mds-table__cell--number">327</td>
          <td class="mds-table__cell--number">72,377</td>
        </tr>
      </tfoot>
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
