import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabBarComponent implements OnInit {
  public showFirstTab: boolean;
  public currentIndex?: number;
  public open: boolean;

  constructor() {
    this.showFirstTab = true;
    this.open = false;
  }

  ngOnInit(): void {}

  toggleFirstTabVisibility() {
    this.showFirstTab = !this.showFirstTab;
  }

  openModal() {
    this.currentIndex = 0;
    this.open = true;
  }

  closeModal() {
    this.currentIndex = undefined;
    this.open = false;
  }
}
