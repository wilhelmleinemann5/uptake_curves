import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Form from '../views/Form.vue';
import Typeahead from '../views/Typeahead.vue';
import TypeaheadMultiselect from '../views/TypeaheadMultiselect.vue';
import Select from '../views/Select.vue';
import Content from '../views/Content.vue';
import Table from '../views/Table.vue';
import TableNested from '../views/TableNested.vue';
import TableDynamicCellRenderer from '../views/TableDynamicCellRenderer.vue';
import Validation from '../views/Validation.vue';
import TabBarRouter from '../views/TabBarRouter.vue';
import PaginationRouter from '../views/PaginationRouter.vue';
import MenuRouter from '../views/MenuRouter.vue';
import ButtonGroupRouter from '../views/ButtonGroupRouter.vue';
import ModalOpenInputOnFocus from '../views/ModalOpenInputOnFocus.vue';
import SegmentedControlRouter from '../views/SegmentedControlRouter.vue';
import Grid from '../views/Grid.vue';
import Memory from '../views/Memory.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Frontpage',
    component: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
  },
  {
    path: '/memory',
    name: 'Memory',
    component: Memory,
  },
  {
    path: '/typeahead',
    name: 'Typeahead',
    component: Typeahead,
  },
  {
    path: '/typeahead-multiselect',
    name: 'TypeaheadMultiselect',
    component: TypeaheadMultiselect,
  },
  {
    path: '/select',
    name: 'Select',
    component: Select,
  },
  {
    path: '/content',
    name: 'Content',
    component: Content,
  },
  {
    path: '/grid',
    name: 'Grid',
    component: Grid,
  },
  {
    path: '/table',
    name: 'Table',
    component: Table,
  },
  {
    path: '/table-nested',
    name: 'TableNested',
    component: TableNested,
  },
  {
    path: '/table-dynamic-cell-renderer',
    name: 'TableDynamicCellRenderer',
    component: TableDynamicCellRenderer,
  },
  {
    path: '/validation',
    name: 'Validation',
    component: Validation,
  },
  {
    path: '/tab-bar-router/:id',
    name: 'TabBarRouter',
    component: TabBarRouter,
  },
  {
    path: '/pagination-router/:id',
    name: 'PaginationRouter',
    component: PaginationRouter,
  },
  {
    path: '/menu-router/:id',
    name: 'MenuRouter',
    component: MenuRouter,
  },
  {
    path: '/button-group-router/:id',
    name: 'ButtonGroupRouter',
    component: ButtonGroupRouter,
  },
  {
    path: '/modal-open-input-on-focus',
    name: 'ModalOpenInputOnFocus',
    component: ModalOpenInputOnFocus,
  },
  {
    path: '/segmented-control-router/:id',
    name: 'SegmentedControlRouter',
    component: SegmentedControlRouter,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
