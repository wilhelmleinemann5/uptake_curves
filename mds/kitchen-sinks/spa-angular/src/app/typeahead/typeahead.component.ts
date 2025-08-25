import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import countryLivingRef from './countries';
import countryBornRef from './countries';
import { apiService } from './api-service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface UserForm {
  countryLiving: string;
  countryBorn: string;
  cityLiving: string;
  cityBorn: string;
}

interface Option {
  label: string;
  value: string;
}

const options: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class TypeaheadComponent implements OnInit {
  readonly optionsSubject = new BehaviorSubject<string[]>([]);
  readonly options$ = this.optionsSubject.asObservable();

  public userForm: UserForm = {
    countryLiving: 'Denmark',
    countryBorn: 'Poland',
    cityBorn: 'Warsaw',
    cityLiving: 'Copenhagen',
  };
  public citiesLiving: any = [];
  public citiesBorn: any = [];
  public countriesLiving: any = countryLivingRef.map((country) => ({ label: country.label, value: country.label }));
  public countriesBorn: any = countryBornRef.map((country) => ({ label: country.label, value: country.label }));
  public loadingLiving: boolean = false;
  public loadingBorn: boolean = false;
  public form: FormGroup;
  public numberOptions: Option[] = [
    { value: '1', label: 'one' },
    { value: '2', label: 'two' },
    { value: '3', label: 'three' },
    { value: '4', label: 'four' },
    { value: '5', label: 'five' },
    { value: '6', label: 'six' },
    { value: '7', label: 'seven' },
    { value: '8', label: 'eight' },
    { value: '9', label: 'nine' },
    { value: '10', label: 'ten' },
  ];

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      number: this.numberOptions[0].label,
    });
  }

  ngOnInit(): void {}

  public async onSearchCitiesBorn(event: Event): Promise<void> {
    this.citiesBorn = [];
    this.loadingBorn = true;
    const searchText = (event as CustomEvent).detail;
    await apiService.search(searchText);
    this.citiesBorn = apiService.options;
    this.loadingBorn = false;
  }

  public async onSearchCitiesLiving(event: Event): Promise<void> {
    this.citiesLiving = [];
    this.loadingLiving = true;
    const searchText = (event as CustomEvent).detail;
    await apiService.search(searchText);
    this.citiesLiving = apiService.options;
    this.loadingLiving = false;
  }

  public search(query: string) {
    this.optionsSubject.next(options.filter((option) => option.includes(query)));
    console.log('search', this.optionsSubject.value);
  }

  public submit(event: Event): void {
    event.preventDefault();
    alert(`From submitted: ${this.form.value.number}`);
  }

  public patchNumber(): void {
    this.form.patchValue({ number: this.numberOptions[3].label });
  }
}
