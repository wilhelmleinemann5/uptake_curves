import { gapValues } from '../../../scripts/utils/gap.mjs';
type Row = {
  className: string;
  properties: string;
};
type RowBreakpoint = {
  className: string;
  properties: string;
  breakpoint: string;
};

export const cssClassNamesGenerator = (className: string, properties: string, firstRow?: Row) => {
  return `<div class="overflow-container mds-table mds-table--zebra-stripes mds-table--scrollable mds-table--header-sticky mds-table--outer-border-none mds-table--horizontal-lines-dashed">
        <table>
          <thead>
            <tr>
              <th>Css class</th>
              <th>Properties</th>
            </tr>
          </thead>
          <tbody>
          ${
            firstRow
              ? `<tr><td>${firstRow.className}</td>
                  <td><i class="mds-neutral--weak__text-color">${firstRow.properties}</i></td>
                  </tr>`
              : ''
          }
            ${Array.from({ length: 12 })
              .map((_, i) => {
                return `<tr>
                  <td>${className.replace('%i%', `${i + 1}`)}</td>
                  <td><i class="mds-neutral--weak__text-color">${properties.replace('%i%', `${i + 1}`).replace('%i+1%', `${i + 1 + 1}`)}</i></td>
                </tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>`;
};

export const cssClassNamesGeneratorBreakpoint = (
  className: string,
  properties: string,
  firstRows?: Array<RowBreakpoint>,
) => {
  return `<div class="overflow-container mds-table mds-table--zebra-stripes mds-table--scrollable mds-table--header-sticky mds-table--outer-border-none mds-table--horizontal-lines-dashed">
        <table>
          <thead>
            <tr>
              <th>Breakpoint</th>
              <th>Css class</th>
              <th>Properties</th>
            </tr>
          </thead>
          <tbody>
          ${
            firstRows
              ? firstRows
                  .map(
                    (firstRow) =>
                      `<tr>
                  <td>${firstRow.breakpoint}</td>
                  <td>${firstRow.className}</td>
                  <td><i class="mds-neutral--weak__text-color">${firstRow.properties}</i></td>
                  </tr>`,
                  )
                  .join('')
              : ''
          }
            ${['all breakpoints', 'xs', 'sm', 'md']
              .map((breakpoint) =>
                Array.from({ length: 12 })
                  .map((_, i) => {
                    return i === 0
                      ? `<tr>
                      <td class="mds-table__cell--content-top mds-text--medium-medium" rowspan="12">
                        <span class="mds-table__cell--content-top mds-text--medium-medium">${breakpoint}</span>
                      </td>
                      <td>${
                        breakpoint === 'all breakpoints'
                          ? className.replace('%breakpoint%-', '').replace('%i%', `${i + 1}`)
                          : className.replace('%breakpoint%', breakpoint).replace('%i%', `${i + 1}`)
                      }</td>
                      <td><i class="mds-neutral--weak__text-color">${properties.replace('%i%', `${i + 1}`).replace('%i+1%', `${i + 1 + 1}`)}</i></td>
                      </tr>`
                      : `<tr>
                      <td>${
                        breakpoint === 'all breakpoints'
                          ? className.replace('%breakpoint%-', '').replace('%i%', `${i + 1}`)
                          : className.replace('%breakpoint%', breakpoint).replace('%i%', `${i + 1}`)
                      }</td>
                      <td><i class="mds-neutral--weak__text-color">${properties.replace('%i%', `${i + 1}`).replace('%i+1%', `${i + 1 + 1}`)}</i></td>
                      </tr>`;
                  })
                  .join(''),
              )
              .join('')}
          </tbody>
        </table>
      </div>`;
};

export const cssClassNamesGeneratorDensityBreakpoint = (
  className: string,
  properties: string,
  firstRow?: RowBreakpoint,
) => {
  return `<div class="overflow-container mds-table mds-table--zebra-stripes mds-table--scrollable mds-table--header-sticky mds-table--outer-border-none mds-table--horizontal-lines-dashed">
        <table>
          <thead>
            <tr>
              <th>Breakpoint</th>
              <th>Css class</th>
              <th>Properties</th>
            </tr>
          </thead>
          <tbody>
          ${
            firstRow
              ? `<tr>
                  <td>${firstRow.breakpoint}</td>
                  <td>${firstRow.className}</td>
                  <td><i class="mds-neutral--weak__text-color">${firstRow.properties}</i></td>
                  </tr>`
              : ''
          }
            ${['all breakpoints', 'xs', 'sm', 'md']
              .map((breakpoint) =>
                gapValues
                  .map((item, i) => {
                    return i === 0
                      ? `<tr>
                      <td class="mds-table__cell--content-top mds-text--medium-medium" rowspan="${gapValues.length}">
                        <span class="mds-table__cell--content-top mds-text--medium-medium">${breakpoint}</span>
                      </td>
                      <td>${breakpoint === 'all breakpoints' ? className.replace('%breakpoint%-', '').replace('%i%', `${item.key}`) : className.replace('%breakpoint%', breakpoint).replace('%i%', `${item.key}`)}</td>
                      <td><i class="mds-neutral--weak__text-color">${properties.replace('%i%', `${item.value}px`)}</i></td>
                      </tr>`
                      : `<tr>
                      <td>${breakpoint === 'all breakpoints' ? className.replace('%breakpoint%-', '').replace('%i%', `${item.key}`) : className.replace('%breakpoint%', breakpoint).replace('%i%', `${item.key}`)}</td>
                      <td><i class="mds-neutral--weak__text-color">${properties.replace('%i%', `${item.value}px`)}</i></td>
                      </tr>`;
                  })
                  .join(''),
              )
              .join('')}
          </tbody>
        </table>
    </div>`;
};
