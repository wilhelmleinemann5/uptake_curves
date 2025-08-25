import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = (args: Record<string, string>): string =>
  `
<body class="mds">
  <div class="mds-table${args.fit !== 'medium' ? ` mds-table--${args.fit}` : ''}${
    args.scrollable ? ' mds-table--scrollable' : ''
  }${
    args.zebrastripes ? ' mds-table--zebra-stripes' : ''
  }${args.disablerowhighlightonhover ? ' mds-table--disable-row-highlight-on-hover' : ''}${
    args.horizontallinestyle !== 'solid' ? ` mds-table--horizontal-lines-${args.horizontallinestyle}` : ''
  }${args.verticallinestyle !== 'none' ? ` mds-table--vertical-lines-${args.verticallinestyle}` : ''}${
    args.outerbordertyle !== 'solid' ? ` mds-table--outer-border-${args.outerbordertyle}` : ''
  }${args.outerbordercornerstyle !== 'round' ? ` mds-table--outer-border-corners-${args.outerbordercornerstyle}` : ''}">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last port</th>
          <th class="mds-table__cell--number">Built (year)</th>
          <th class="mds-table__cell--number">Length (m)</th>
          <th class="mds-table__cell--number">Capacity (TEU)</th>
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
</body>
`;

export const preview = (args: Record<string, string>) => [
  {
    label: 'HTML',
    template: template(args),
    language: 'javascript',
  } as IMcCCode,
];
