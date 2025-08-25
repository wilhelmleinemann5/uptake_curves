export const uxGeneralGuidelinesMapping = {
  // Interactive components with color states
  button: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'high',
      applicableSections: ['primary', 'secondary', 'error', 'success', 'warning'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['actions', 'placement', 'hierarchy'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'colour contrast'],
    },
  ],

  // Input components
  input: [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state', 'readonly state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['input labels', 'field width', 'validation', 'help'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['components'],
    },
  ],

  'input-date': [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state', 'readonly state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['input labels', 'field width', 'validation'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'input-masks',
      relevance: 'high',
      applicableSections: ['date formats'],
    },
  ],

  'input-time': [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state', 'readonly state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['input labels', 'field width', 'validation'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'input-masks',
      relevance: 'high',
      applicableSections: ['time formats'],
    },
  ],

  textarea: [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['input labels', 'field width', 'validation'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation'],
    },
  ],

  // Selection components
  checkbox: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'high',
      applicableSections: ['primary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'medium',
      applicableSections: ['grouping'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  radio: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'high',
      applicableSections: ['primary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['grouping', 'selection dependent inputs'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  switch: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'high',
      applicableSections: ['primary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation'],
    },
  ],

  select: [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['input labels', 'selection dependent inputs'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  'multi-select': [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'high',
      applicableSections: ['input labels'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  'number-stepper': [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'disabled-and-readonly-states',
      relevance: 'high',
      applicableSections: ['disabled state', 'readonly state'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'medium',
      applicableSections: ['field width'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation'],
    },
  ],

  // Navigation components
  pagination: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['components', 'patterns'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  'step-indicator': [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['primary', 'success'],
    },
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['patterns'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['screen readers'],
    },
  ],

  'segmented-control': [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['primary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation'],
    },
  ],

  // Feedback components
  notification: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'high',
      applicableSections: ['error', 'success', 'warning', 'info'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'system-feedback',
      relevance: 'high',
      applicableSections: ['notifications', 'messaging'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['screen readers', 'colour contrast'],
    },
  ],

  toast: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'high',
      applicableSections: ['error', 'success', 'warning', 'info'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'system-feedback',
      relevance: 'high',
      applicableSections: ['notifications', 'temporary messages'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['screen readers'],
    },
  ],

  'progress-indicator': [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['primary', 'success'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'system-feedback',
      relevance: 'high',
      applicableSections: ['progress indication'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['screen readers'],
    },
  ],

  'loading-indicator': [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'system-feedback',
      relevance: 'high',
      applicableSections: ['loading states'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['screen readers'],
    },
  ],

  // Container components
  modal: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['layouts'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'focus management'],
    },
  ],

  dialog: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['layouts'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'focus management'],
    },
  ],

  drawer: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['layouts'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation'],
    },
  ],

  popover: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['components'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation'],
    },
  ],

  tooltip: [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  card: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'high',
      applicableSections: ['components', 'patterns'],
    },
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'corner-radius',
      relevance: 'medium',
      applicableSections: ['consistency'],
    },
  ],

  // Content components
  table: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'high',
      applicableSections: ['patterns', 'information density'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'search-filter-and-sort',
      relevance: 'medium',
      applicableSections: ['sort patterns'],
    },
  ],

  list: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'high',
      applicableSections: ['patterns'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  menu: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['components'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
  ],

  // Visual components
  icon: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'iconography',
      relevance: 'high',
      applicableSections: ['usage', 'sizing', 'accessibility'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['screen readers', 'alternative text'],
    },
  ],

  avatar: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'corner-radius',
      relevance: 'medium',
      applicableSections: ['consistency'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'medium',
      applicableSections: ['alternative text'],
    },
  ],

  badge: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'high',
      applicableSections: ['error', 'success', 'warning', 'info'],
    },
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['components'],
    },
  ],

  tag: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['neutral', 'primary'],
    },
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['components'],
    },
  ],

  // Complex components
  calendar: [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['primary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'input-masks',
      relevance: 'medium',
      applicableSections: ['date formats'],
    },
  ],

  'date-range': [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['primary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'input-masks',
      relevance: 'high',
      applicableSections: ['date formats'],
    },
  ],

  typeahead: [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'medium',
      applicableSections: ['input labels'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'search-filter-and-sort',
      relevance: 'high',
      applicableSections: ['search patterns'],
    },
  ],

  'typeahead-multi-select': [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'medium',
      applicableSections: ['input labels'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'search-filter-and-sort',
      relevance: 'high',
      applicableSections: ['search patterns', 'filter patterns'],
    },
  ],

  'file-upload': [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'medium',
      applicableSections: ['validation'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'system-feedback',
      relevance: 'medium',
      applicableSections: ['progress indication'],
    },
  ],

  // Utility components
  'link-button': [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['primary', 'secondary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'colour contrast'],
    },
  ],

  'theme-switch': [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'colour-roles',
      relevance: 'medium',
      applicableSections: ['primary'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'colour contrast'],
    },
  ],

  picker: [
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'accessibility',
      relevance: 'high',
      applicableSections: ['keyboard navigation', 'screen readers'],
    },
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'medium',
      applicableSections: ['components'],
    },
  ],

  // Group components
  'button-group': [
    {
      docCategory: 'designPrinciples',
      docType: 'design-language',
      docName: 'spacing',
      relevance: 'high',
      applicableSections: ['components', 'patterns'],
    },
    {
      docCategory: 'relatedGuidelines',
      docType: 'guidelines',
      docName: 'forms',
      relevance: 'medium',
      applicableSections: ['actions', 'hierarchy'],
    },
  ],

  // Note: Some components may not need specific mappings if they're purely presentational
  // or have very limited interaction patterns
};
