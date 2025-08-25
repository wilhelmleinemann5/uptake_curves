export const angular = (): string =>
  ` import "@maersk-global/mds-components-core/mc-table";
import data from 'data.json';
import columns from 'columns.js';

<mc-table 
  [data]="data"
  [columns]="columns"
>
  <ng-container *ngFor="let row of data; let i = index">
    <div slot="{{ row.id }}_status">
      <i>{{ row.status }}</i>
    </div>
  </ng-container>
</mc-table>`;
