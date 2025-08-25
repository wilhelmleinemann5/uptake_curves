export interface ComponentMetadata {
  type: 'web-component' | 'css';
  componentName: string;
  alternativeNames?: string[];
}
export interface ComponentDocumentationToolInput {
  component: ComponentName;
}
export const COMPONENTS: Record<string, ComponentMetadata> = {
  // CSS Components
  breadcrumb: {
    componentName: 'mds-breadcrumb',
    type: 'css',
    alternativeNames: ['breadcrumb-bar', 'breadcrumb-navigation', 'breadcrumbs'],
  },
  link: {
    componentName: 'mds-link',
    type: 'css',
    alternativeNames: ['link', 'link-text', 'text-link', 'hyperlink'],
  },
  'list-basic': {
    componentName: 'mds-list',
    type: 'css',
    alternativeNames: ['list', 'ol', 'ul'],
  },
  'table-basic': {
    componentName: 'mds-table',
    type: 'css',
    alternativeNames: ['html-table'],
  },
  'tree-nav': {
    componentName: 'mds-tree-nav',
    type: 'css',
    alternativeNames: ['tree-navigation', 'tree-nav', 'tree-menu', 'tree-view', 'tree-list', 'tree-structure'],
  },

  // Web Components
  avatar: {
    componentName: 'mc-avatar',
    type: 'web-component',
    alternativeNames: ['avatar-image', 'user-avatar', 'profile-picture', 'user-profile'],
  },
  badge: {
    componentName: 'mc-badge',
    type: 'web-component',
    alternativeNames: ['badge', 'notification-badge', 'status-indicator'],
  },
  button: {
    componentName: 'mc-button',
    type: 'web-component',
    alternativeNames: ['button', 'action-button', 'primary-button', 'secondary-button', 'submit-button'],
  },
  'button-group': {
    componentName: 'mc-button-group',
    type: 'web-component',
    alternativeNames: ['button-group', 'button-toolbar', 'button-bar', 'button-set'],
  },
  'button-group-item': {
    componentName: 'mc-button-group-item',
    type: 'web-component',
  },
  calendar: {
    componentName: 'mc-calendar',
    type: 'web-component',
    alternativeNames: ['date-picker', 'calendar-picker', 'date-selector'],
  },
  card: {
    componentName: 'mc-card',
    type: 'web-component',
    alternativeNames: ['info-card', 'content-card', 'profile-card', 'product-card'],
  },
  checkbox: {
    componentName: 'mc-checkbox',
    type: 'web-component',
    alternativeNames: ['checkbox', 'check-box', 'tick-box', 'selection-box'],
  },
  'checkbox-group': {
    componentName: 'mc-checkbox-group',
    type: 'web-component',
    alternativeNames: ['checkbox-group', 'check-box-group', 'tick-box-group', 'selection-box-group'],
  },
  'date-range': {
    componentName: 'mc-date-range',
    type: 'web-component',
    alternativeNames: ['date-range-picker', 'date-range-selector', 'date-range-input'],
  },
  dialog: {
    componentName: 'mc-dialog',
    type: 'web-component',
    alternativeNames: ['modal-dialog', 'popup-dialog', 'alert-dialog', 'confirmation-dialog'],
  },
  drawer: {
    componentName: 'mc-drawer',
    type: 'web-component',
    alternativeNames: ['side-drawer', 'side-panel', 'slide-out-panel', 'off-canvas'],
  },
  error: {
    componentName: 'mc-error',
    type: 'web-component',
  },
  'file-upload': {
    componentName: 'mc-file-upload',
    type: 'web-component',
    alternativeNames: ['file-upload', 'file-input', 'file-selector'],
  },
  hint: {
    componentName: 'mc-hint',
    type: 'web-component',
  },
  icon: {
    componentName: 'mc-icon',
    type: 'web-component',
    alternativeNames: ['symbol', 'glyph'],
  },
  input: {
    componentName: 'mc-input',
    type: 'web-component',
    alternativeNames: ['text-input', 'form-input', 'text-field', 'input-field'],
  },
  'input-date': {
    componentName: 'mc-input-date',
    type: 'web-component',
    alternativeNames: ['date-input', 'date-picker-input', 'date-field'],
  },
  'input-group': {
    componentName: 'mc-input-group',
    type: 'web-component',
    alternativeNames: ['input-group', 'form-group', 'field-group', 'input-set', 'input-toolbar'],
  },
  'input-time': {
    componentName: 'mc-input-time',
    type: 'web-component',
    alternativeNames: ['time-input', 'time-picker-input', 'time-field'],
  },
  label: {
    componentName: 'mc-label',
    type: 'web-component',
    alternativeNames: ['form-label', 'input-label', 'field-label'],
  },
  'link-button': {
    componentName: 'mc-link-button',
    type: 'web-component',
    alternativeNames: ['text-button', 'link-action', 'text-link-button', 'hyperlink-button'],
  },
  list: {
    componentName: 'mc-list',
    type: 'web-component',
    alternativeNames: ['ul', 'ol', 'list-view'],
  },
  'list-item': { componentName: 'mc-list-item', type: 'web-component' },
  'loading-indicator': {
    componentName: 'mc-loading-indicator',
    type: 'web-component',
    alternativeNames: ['spinner', 'loader', 'loading-spinner'],
  },
  menu: {
    componentName: 'mc-menu',
    type: 'web-component',
    alternativeNames: ['dropdown-menu', 'context-menu', 'action-menu', 'action-list'],
  },
  modal: {
    componentName: 'mc-modal',
    type: 'web-component',
    alternativeNames: ['lightbox', 'overlay'],
  },
  'month-year-picker': {
    componentName: 'mc-month-year-picker',
    type: 'web-component',
    alternativeNames: ['month-year-selector'],
  },
  'multi-choice-fieldset': {
    componentName: 'mc-multi-choice-fieldset',
    type: 'web-component',
  },
  'multi-select': {
    componentName: 'mc-multi-select',
    type: 'web-component',
    alternativeNames: [
      'multi-select',
      'multiple-select',
      'multi-choice',
      'multi-option',
      'multi-choice-select',
      'combo-box',
    ],
  },
  notification: {
    componentName: 'mc-notification',
    type: 'web-component',
    alternativeNames: ['alert', 'notification-banner', 'notification-message'],
  },
  'number-stepper': {
    componentName: 'mc-number-stepper',
    type: 'web-component',
    alternativeNames: ['number-input', 'numeric-stepper', 'quantity-selector'],
  },
  option: { componentName: 'mc-option', type: 'web-component' },
  pagination: {
    componentName: 'mc-pagination',
    type: 'web-component',
    alternativeNames: ['pagination-controls', 'page-navigation'],
  },
  picker: { componentName: 'mc-picker', type: 'web-component' },
  'picker-item': { componentName: 'mc-picker-item', type: 'web-component' },
  popover: { componentName: 'mc-popover', type: 'web-component' },
  'progress-indicator': {
    componentName: 'mc-progress-indicator',
    type: 'web-component',
    alternativeNames: ['progress-bar', 'loading-bar', 'progress-tracker'],
  },
  radio: { componentName: 'mc-radio', type: 'web-component', alternativeNames: ['radio-button', 'radio-input'] },
  'radio-group': {
    componentName: 'mc-radio-group',
    type: 'web-component',
    alternativeNames: ['radio-button-group', 'radio-input-group'],
  },
  'segmented-control': {
    componentName: 'mc-segmented-control',
    type: 'web-component',
    alternativeNames: ['segmented-button-group', 'segmented-control-group'],
  },
  'segmented-control-item': {
    componentName: 'mc-segmented-control-item',
    type: 'web-component',
  },
  select: {
    componentName: 'mc-select',
    type: 'web-component',
    alternativeNames: ['dropdown', 'select-menu', 'select-box'],
  },
  'select-native': {
    componentName: 'mc-select-native',
    type: 'web-component',
    alternativeNames: ['native-select', 'html-select', 'native-dropdown'],
  },
  'side-bar': { componentName: 'mc-side-bar', type: 'web-component', alternativeNames: ['sidebar', 'side-navigation'] },
  'step-indicator': {
    componentName: 'mc-step-indicator',
    type: 'web-component',
    alternativeNames: ['stepper', 'progress-stepper', 'step-navigation'],
  },
  'step-indicator-item': {
    componentName: 'mc-step-indicator-item',
    type: 'web-component',
  },
  switch: { componentName: 'mc-switch', type: 'web-component', alternativeNames: ['toggle-switch', 'on-off-switch'] },
  'switch-group': {
    componentName: 'mc-switch-group',
    type: 'web-component',
    alternativeNames: ['toggle-group', 'switch-set', 'on-off-switch-set'],
  },
  tab: { componentName: 'mc-tab', type: 'web-component' },
  'tab-bar': { componentName: 'mc-tab-bar', type: 'web-component', alternativeNames: ['tab-navigation', 'tab-menu'] },
  table: {
    componentName: 'mc-table',
    type: 'web-component',
    alternativeNames: ['data-table', 'grid-table', 'table-view', 'data-grid'],
  },
  tag: { componentName: 'mc-tag', type: 'web-component', alternativeNames: ['chip'] },
  'text-and-icon': { componentName: 'mc-text-and-icon', type: 'web-component' },
  textarea: {
    componentName: 'mc-textarea',
    type: 'web-component',
    alternativeNames: ['text-area', 'textarea-input', 'multi-line-input'],
  },
  'theme-switch': {
    componentName: 'mc-theme-switch',
    type: 'web-component',
    alternativeNames: ['theme-toggle', 'dark-mode-switch'],
  },
  'time-picker': { componentName: 'mc-time-picker', type: 'web-component' },
  toast: {
    componentName: 'mc-toast',
    type: 'web-component',
    alternativeNames: ['notification-toast', 'toast-message', 'toast-notification'],
  },
  tooltip: {
    componentName: 'mc-tooltip',
    type: 'web-component',
    alternativeNames: ['hover-tooltip', 'info-tooltip', 'help-tooltip'],
  },
  'top-bar': {
    componentName: 'mc-top-bar',
    type: 'web-component',
    alternativeNames: ['header', 'navigation-bar', 'top-navigation'],
  },
  typeahead: {
    componentName: 'mc-typeahead',
    type: 'web-component',
    alternativeNames: ['autocomplete', 'suggestion-input', 'search-typeahead'],
  },
  'typeahead-multi-select': {
    componentName: 'mc-typeahead-multi-select',
    type: 'web-component',
    alternativeNames: ['multi-select-autocomplete', 'multi-select-suggestion'],
  },
};
export type ComponentName = keyof typeof COMPONENTS;

export type jsFrameworks = 'react' | 'vue' | 'angular' | 'nextjs' | 'nuxt' | 'svelte' | 'vanilla-js';
