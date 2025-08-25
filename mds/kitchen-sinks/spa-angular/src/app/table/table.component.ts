import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@maersk-global/mds-components-core/mc-table';
import '@maersk-global/mds-components-core/mc-button';
import { getDataForColumn } from '@maersk-global/mds-components-core-table/utils';
import { format } from '@maersk-global/mds-components-utils/index.js';

// columns definition
import {
  customColumnsWithAggregatedFooter,
  customColumnsSimple,
  customColumnsWithGrouping,
  customColumnsWithNumberFormatting,
} from './columns';
import { dataForNumberFormattingExample, dataStatic } from './data';

// data

interface Player extends Record<string, any> {
  id: number;
  name: string;
  position: string;
  composure: number;
  foot: string;
  height: number;
  weight: number;
  age: number;
}

interface ApiResult {
  page: number;
  totalPages: number;
  items: Player[];
  error: string;
}

@Component({
  selector: 'app-Table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableComponent {
  public selectedRows?: any[];
  public totalPages: number = 0;
  public fit = 'medium';

  public getDataForColumn = getDataForColumn;
  public format = format;

  customColumnsSimple = customColumnsSimple;
  customColumnsWithNumberFormatting = customColumnsWithNumberFormatting;
  customColumnsWithGrouping = customColumnsWithGrouping;
  customColumnsWithAggregatedFooter = customColumnsWithAggregatedFooter;

  public dataForNumberFormattingExample = dataForNumberFormattingExample;
  public dataStatic = dataStatic;
  public apiData: Player[] | undefined;

  constructor(private readonly http: HttpClient) {}

  public onFitChanged(fit: string): void {
    this.fit = fit;
    this.onPageChanged({ detail: 1 } as CustomEvent);
  }

  public onPageChanged(event: Event): void {
    this.fetchPlayers((event as CustomEvent).detail);
  }

  public fetchPlayers(page: number): void {
    this.http
      .get<ApiResult>(`/api/clubs`, {
        params: { page },
        headers: { 'X-AUTH-TOKEN': 'af39e862-51d3-4f5f-a987-4117a6f56d05' },
      })
      .subscribe((response: any) => {
        const result = response as {
          items: any[];
          pagination: {
            countCurrent: number;
            countTotal: number;
            itemsPerPage: number;
            pageCurrent: number;
            pageTotal: number;
          };
        };
        this.apiData = result.items;
        this.selectedRows = [result.items[0], result.items[1]];
        this.totalPages = result.pagination.pageTotal;
      });
  }

  public onSortChanged(event: CustomEvent<{ column: string; direction: 'ascending' | 'descending' }>) {
    console.log('sort changed', event.detail);
  }

  public onRowSelected(event: CustomEvent<any>) {
    console.log('row selected', event.detail);
  }

  public onRowClicked(event: CustomEvent<{ currentTarget: HTMLElement; rowData: any }>) {
    console.log('row click', event.detail);
  }

  public sum(numbers: number[]) {
    return numbers.reduce((total, num) => total + num, 0);
  }

  public average(numbers: number[]) {
    if (numbers.length === 0) {
      return 0;
    }
    const total = this.sum(numbers);
    return total / numbers.length;
  }
}
