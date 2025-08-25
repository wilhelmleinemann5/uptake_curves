import { fit } from '@maersk-global/mds-dev-utils';

import imageFile from './images/supply-chain-logistics_illustration.svg';

export default {
  variant: {
    name: 'variant',
    type: { required: false },
    defaultValue: 'bordered',
    table: {
      disabled: true,
      category: 'Style',
      type: { summary: 'bordered | borderless' },
      defaultValue: { summary: 'bordered' },
    },
    options: ['bordered', 'borderless'],
    control: {
      type: 'select',
    },
  },
  orientation: {
    name: 'orientation',
    type: { required: false },
    defaultValue: 'vertical',
    table: {
      disabled: true,
      category: 'Style',
      type: { summary: 'vertical | horizontal' },
      defaultValue: { summary: 'vertical' },
    },
    options: ['vertical', 'horizontal'],
    control: {
      type: 'select',
    },
  },
  fit,
  heading: {
    name: 'heading',
    type: { required: false },
    defaultValue: 'Supply Chain and Logistics',
    description: 'Heading',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  subheading: {
    name: 'subheading',
    type: { required: false },
    defaultValue: 'Integrated logistics',
    description: 'Sub heading',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  body: {
    name: 'body',
    type: { summary: 'string', required: false },
    defaultValue:
      'We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you.',
    description:
      'Body can be passed as simple argument like:\n\n`body="simple text"`\n\nor as a default slot:\n\n`<div>body text as HTML</div>`',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
    },
    control: {
      type: 'text',
    },
  },
  footer: {
    name: 'footer',
    type: { required: false },
    defaultValue: '12 September 2022',
    description:
      'Footer can be passed as simple argument like:\n\n`footer="simple text"`\n\nor as a named slot:\n\n`<div slot="footer">footer text as HTML</div>`',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  contentalignment: {
    name: 'contentalignment',
    type: { required: false },
    defaultValue: 'top',
    description: 'How content (heading, subheading, body and footer) is aligned.',
    table: {
      disabled: true,
      category: 'Content',
      type: { summary: 'top | middle | bottom' },
      defaultValue: { summary: 'top' },
    },
    options: ['top', 'middle', 'bottom'],
    control: {
      type: 'select',
    },
  },
  padding: {
    name: 'padding',
    type: { required: false },
    defaultValue: '',
    description: "Padding around all of the card's content.",
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  image: {
    name: 'image',
    type: { required: false },
    defaultValue: imageFile,
    description: 'Image URL',
    table: {
      category: 'Image',
      type: { summary: 'string, slot' },
    },
    control: {
      type: 'text',
    },
  },
  imagepercent: {
    name: 'imagepercent',
    type: { required: false },
    defaultValue: '',
    description:
      'For vertical cards, this is the height of the image as a percentage of the card width, defaults to a 16:9 ratio (height = 56.25%)\n\n\n\nFor horizontal cards, this is the width of the image as a percentage of the card width, defaults to 33%.',
    table: {
      category: 'Image',
      type: { summary: 'number' },
      defaultValue: { summary: '56.25 (vertical)\n\n\n\n33 (horizontal)' },
    },
    control: {
      type: 'text',
    },
  },
  imagescalestrength: {
    name: 'imagescalestrength',
    type: { required: false },
    defaultValue: 'light',
    description: 'Strength of the scale effect on the image.',
    table: {
      disabled: true,
      category: 'Image',
      type: { summary: 'light | medium | prominent | none' },
      defaultValue: { summary: 'light' },
    },
    options: ['light', 'medium', 'prominent', 'none'],
    control: {
      type: 'select',
    },
  },
  imagebackgroundcolor: {
    name: 'imagebackgroundcolor',
    type: { required: false },
    defaultValue: '',
    description: 'The background colour to display "under" the image as a fallback',
    table: {
      category: 'Image',
      type: { summary: 'string' },
      defaultValue: { summary: 'rgba(247,247,247,1)' },
    },
    control: {
      type: 'text',
    },
  },
  href: {
    name: 'href',
    type: { required: false },
    defaultValue: '',
    description: 'Passing a href value will render the card as a HTML anchor element.',
    table: {
      category: 'Hyperlink',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  rel: {
    name: 'rel',
    type: { required: false },
    defaultValue: '',
    description:
      'The relationship of the linked URL as space-separated <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types" target="_blank">link types</a>.',
    table: {
      category: 'Hyperlink',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  target: {
    name: 'target',
    type: { required: false },
    defaultValue: '',
    description:
      'Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).',
    table: {
      category: 'Hyperlink',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  clickable: {
    name: 'clickable',
    type: { required: false },
    defaultValue: false,
    description:
      'If set, the card will get mouseover effects and a pointer cursor. You can then listen to the `click` event to handle the click event, optionally handle you application router and redirects.',
    table: {
      category: 'Actions',
      type: { summary: 'boolean' },
    },
    control: {
      type: 'boolean',
    },
  },
  actions: {
    name: 'actions',
    type: { required: false },
    defaultValue: '',
    description:
      'There is one slot available called`actions`. This can be used for adding links / buttons etc.\n\n\n\nThe `actions` slot will not be rendered if the Card component has a `href`.\n\n\n\n\nFor more details on usage, please look at the Code Preview above.',
    table: {
      category: 'Actions',
      type: { summary: 'slot' },
    },
    control: {
      type: 'text',
    },
  },
};
