export const argTypes = {
  fit: {
    name: 'Fit',
    type: { required: false },
    defaultValue: 'medium',
    description:
      "The table by default is a 'medium' fit. For 'small' or 'large', add the following CSS classes to the table's container:<br /><br />",
    table: {
      category: 'Style',
      type: { summary: 'mds-table--small | mds-table--large' },
    },
    control: {
      type: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  scrollable: {
    name: 'Scrollable',
    type: { required: false },
    defaultValue: true,
    description: "Prevents overflow and ensures table scrolls within it's container:<br /><br />",
    table: {
      category: 'Style',
      type: { summary: 'mds-table--scrollable' },
    },
    control: {
      type: 'boolean',
    },
  },
  zebrastripes: {
    name: 'Zebra stripes',
    type: { required: false },
    defaultValue: '',
    description:
      "To show zebra stripes, add one of the following CSS class to the table's container depending on whether you have expanded rows or not:<br /><br />",
    table: {
      category: 'Style',
      type: { summary: 'mds-table--zebra-stripes | mds-table--zebra-stripes-with-expand' },
    },
    control: {
      type: 'boolean',
    },
  },
  disablerowhighlightonhover: {
    name: 'Disable row highlight on hover',
    type: { required: false },
    defaultValue: '',
    description: "To disable row highlight on hover, add the following CSS class to the table's container:<br /><br />",
    table: {
      category: 'Style',
      type: { summary: 'mds-table--disable-row-highlight-on-hover' },
    },
    control: {
      type: 'boolean',
    },
  },
  horizontallinestyle: {
    name: 'Horizontal line style',
    type: { required: false },
    defaultValue: 'solid',
    description:
      "The table by default shows solid horizontal styles. For 'dashed', 'dotted' and 'none' styles, add the following CSS class to the table's container:<br /><br />",
    table: {
      category: 'Style',
      type: {
        summary:
          'mds-table--horizontal-lines-dashed | mds-table--horizontal-lines-dotted | mds-table--horizontal-lines-none',
      },
    },
    control: {
      type: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
    },
  },
  verticallinestyle: {
    name: 'Vertical line style',
    type: { required: false },
    defaultValue: 'none',
    description:
      "The table does not show vertical lines by default. For 'solid', 'dashed' and 'dotted', add the following CSS classes to the table's container:<br /><br />",
    table: {
      category: 'Style',
      type: {
        summary:
          'mds-table--vertical-lines-solid | mds-table--vertical-lines-dashed | mds-table--vertical-lines-dotted',
      },
    },
    control: {
      type: 'select',
      options: ['none', 'solid', 'dashed', 'dotted'],
    },
  },
  outerbordertyle: {
    name: 'Outer border style',
    type: { required: false },
    defaultValue: 'solid',
    description:
      "The table by default shows a solid outer border. For 'dashed', 'dotted' and 'none', add the following CSS classed to the table's container:<br /><br />",
    table: {
      category: 'Style',
      type: {
        summary: 'mds-table--outer-border-dashed | mds-table--outer-border-dotted | mds-table--outer-border-none',
      },
    },
    control: {
      type: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
    },
  },
  outerbordercornerstyle: {
    name: 'Outer border corner style',
    type: { required: false },
    defaultValue: 'round',
    description:
      "The table by default shows round corners on the outer border. For a 'square' style, add the following CSS class to the table's container:<br /><br />",
    table: {
      category: 'Style',
      type: {
        summary: 'mds-table--outer-border-square-corners',
      },
    },
    control: {
      type: 'select',
      options: ['round', 'square'],
    },
  },
  modifierclasses: {
    name: 'Additional modifier classes',
    type: { required: false },
    defaultValue: '',
    description:
      'The table supports a variety of additional modifier classes. Please look at the <a href="/?path=/story/css-foundations-table-examples" target="_top">examples</a><br /><br />',
    table: {
      category: 'Style',
      type: {
        summary:
          'mds-table--nowrap | mds-table--vertical-align-top | mds-table--vertical-align-baseline | mds-table--vertical-align-bottom | mds-table--header-sticky | mds-table--header-none | mds-table--footer | mds-table--footer-sticky | mds-table--scrollable ',
      },
    },
    control: false,
  },
  elementclasses: {
    name: 'Additional child element classes',
    type: { required: false },
    defaultValue: '',
    description:
      'The table supports a variety of child element classes. Please look at the <a href="/?path=/story/css-foundations-table-examples" target="_top">examples</a><br /><br />',
    table: {
      category: 'Style',
      type: {
        summary:
          'mds-table__cell--number | mds-table__cell--text-center | mds-table__cell--text-right | mds-table__cell--nowrap | mds-table__cell--tabular-figures | mds-table__header-cell--sortable | mds-table__column--sticky | mds-table__column--row-selector | mds_table__row--selected | mds-table__subtext | mds-table-and-caption | mds-table-caption',
      },
    },
    control: false,
  },
};
