import { Component, OnInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { apiService, Option } from './api-service';

interface SelectedCity {
  label: string;
  value: string;
  sublabel: string;
}

@Component({
  selector: 'app-typeahead-multiselect',
  templateUrl: './typeahead-multiselect.component.html',
  styleUrls: ['./typeahead-multiselect.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TypeaheadMultiselectComponent implements OnInit {
  @ViewChild('typeaheadRef', { static: false }) typeaheadRef!: ElementRef;

  public cities: Option[] = [];
  public loadingCities: boolean = false;
  public selectedCities: SelectedCity[] = [];
  public selectedFromDate: string = '';
  public selectedToDate: string = '';

  ngOnInit(): void {}

  public async onSearchCities(event: Event): Promise<void> {
    this.cities = [];
    this.loadingCities = true;
    const searchText = (event as CustomEvent).detail;
    await apiService.search(searchText);
    this.cities = apiService.options;
    this.loadingCities = false;
  }

  public onCitySelection(event: Event): void {
    const customEvent = event as CustomEvent;
    if (customEvent.detail) {
      this.selectedCities = (customEvent.detail as SelectedCity[]) || [];
    }
  }

  public onFromDateSelection(event: Event): void {
    const customEvent = event as CustomEvent;
    this.selectedFromDate = customEvent.detail || '';
  }

  public onToDateSelection(event: Event): void {
    const customEvent = event as CustomEvent;
    this.selectedToDate = customEvent.detail || '';
  }

  public removeCity(cityToRemove: SelectedCity): void {
    if (this.typeaheadRef?.nativeElement) {
      this.typeaheadRef.nativeElement.removeSelectedOption(cityToRemove);
    }
  }

  public removeFromDate(): void {
    this.selectedFromDate = '';
    const fromInput = document.querySelector('mc-input-date[name="fromDate"]') as any;
    if (fromInput) {
      fromInput.value = '';
    }
  }

  public removeToDate(): void {
    this.selectedToDate = '';
    const toInput = document.querySelector('mc-input-date[name="toDate"]') as any;
    if (toInput) {
      toInput.value = '';
    }
  }

  public get hasSelections(): boolean {
    return !!(this.selectedFromDate || this.selectedToDate || this.selectedCities.length > 0);
  }
}
