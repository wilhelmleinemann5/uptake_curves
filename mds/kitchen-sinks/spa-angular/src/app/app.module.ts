import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import '@maersk-global/mds-components-core/mc-step-indicator';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-input';
import '@maersk-global/mds-components-core/mc-date-range';
import '@maersk-global/mds-components-core/mc-input-date';
import '@maersk-global/mds-components-core/mc-select-native';
import '@maersk-global/mds-components-core/mc-checkbox';
import '@maersk-global/mds-components-core/mc-checkbox-group';
import '@maersk-global/mds-components-core/mc-textarea';
import '@maersk-global/mds-components-core/mc-tooltip';
import '@maersk-global/mds-components-core/mc-radio-group';
import '@maersk-global/mds-components-core/mc-radio';
import '@maersk-global/mds-components-core/mc-switch-group';
import '@maersk-global/mds-components-core/mc-switch';
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-loading-indicator';
import '@maersk-global/mds-components-core/mc-typeahead';
import '@maersk-global/mds-components-core/mc-typeahead-multi-select';
import '@maersk-global/mds-components-core/mc-select';
import '@maersk-global/mds-components-core/mc-option';

import '@maersk-global/mds-components-core/mc-tab-bar';
import '@maersk-global/mds-components-core/mc-tab';
import '@maersk-global/mds-components-core/mc-notification';
import '@maersk-global/mds-components-core/mc-tag';
import '@maersk-global/mds-components-core/mc-pagination';

import { FormComponent } from './form/form.component';
import { ContentComponent } from './content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { TypeaheadMultiselectComponent } from './typeahead-multiselect/typeahead-multiselect.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { SelectComponent } from './select/select.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TabBarRouterComponent } from './tab-bar-router/tab-bar-router.component';
import { PaginationRouterComponent } from './pagination-router/pagination-router.component';
import { MenuRouterComponent } from './menu-router/menu-router.component';
import { ButtonGroupRouterComponent } from './button-group-router/button-group-router.component';
import { SegmentedControlRouterComponent } from './segmented-control-router/segmented-control-router.component';
import { ValidationComponent } from './validation/validation.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppComponent,
    FormComponent,
    ContentComponent,
    TableComponent,
    TypeaheadComponent,
    TypeaheadMultiselectComponent,
    ValidationComponent,
    SelectComponent,
    TabBarComponent,
    TabBarRouterComponent,
    PaginationRouterComponent,
    MenuRouterComponent,
    ButtonGroupRouterComponent,
    SegmentedControlRouterComponent,
  ],
  providers: [FormBuilder],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
