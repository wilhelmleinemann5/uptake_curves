import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SelectComponent implements OnInit {
  public selectedColumnId: string = '2';
  public form: FormGroup;
  public columns: { columnId: string; name: string }[] = [];
  public countries: { id: string; name: string }[] = [];
  public showMenu: boolean = false;

  constructor() {
    this.form = new FormGroup({
      columnId: new FormControl(this.selectedColumnId),
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.columns = [
        { columnId: '1', name: 'Column 1' },
        { columnId: '2', name: 'Column 2' },
        { columnId: '3', name: 'Column 3' },
      ];
    }, 1000);
    setTimeout(() => {
      this.countries = this.countryCodeFilterOptions();
      this.showMenu = true;
    }, 1000);
  }

  countryCodeFilterOptions(): { id: string; name: string }[] {
    return [
      { id: 'DK', name: 'Denmark' },
      { id: 'DE', name: 'Germany' },
      { id: 'PL', name: 'Poland' },
      { id: 'NO', name: 'Norway' },
      { id: 'SE', name: 'Sweden' },
    ];
  }
}
