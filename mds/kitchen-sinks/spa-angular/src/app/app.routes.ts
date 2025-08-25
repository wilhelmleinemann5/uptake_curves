import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { TypeaheadMultiselectComponent } from './typeahead-multiselect/typeahead-multiselect.component';
import { SelectComponent } from './select/select.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TabBarRouterComponent } from './tab-bar-router/tab-bar-router.component';
import { PaginationRouterComponent } from './pagination-router/pagination-router.component';
import { MenuRouterComponent } from './menu-router/menu-router.component';
import { ButtonGroupRouterComponent } from './button-group-router/button-group-router.component';
import { SegmentedControlRouterComponent } from './segmented-control-router/segmented-control-router.component';
import { ValidationComponent } from './validation/validation.component';

export const appRoutes: Route[] = [
  { path: 'form', component: FormComponent },
  { path: 'content', component: ContentComponent },
  { path: 'table', component: TableComponent },
  { path: 'typeahead', component: TypeaheadComponent },
  { path: 'typeahead-multiselect', component: TypeaheadMultiselectComponent },
  { path: 'validation', component: ValidationComponent },
  { path: 'select', component: SelectComponent },
  { path: 'tabbar', component: TabBarComponent },
  { path: 'tabbarrouter/:id', component: TabBarRouterComponent },
  { path: 'paginationrouter/:id', component: PaginationRouterComponent },
  { path: 'menurouter/:id', component: MenuRouterComponent },
  { path: 'buttongrouprouter/:id', component: ButtonGroupRouterComponent },
  { path: 'segmentedcontrolrouter/:id', component: SegmentedControlRouterComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
