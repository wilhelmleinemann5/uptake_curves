import {
  disabled,
  hiddenlegend,
  hint,
  errormessage,
  invalid,
  fit,
  loading,
  name,
  eventtype,
  icon,
} from '@maersk-global/mds-dev-utils';

export default {
  // content
  label: {
    name: 'label',
    type: { required: true },
    defaultValue: 'Choose a file',
    description:
      'Label can be passed as a simple argument like: `label="Label"`. Label is a required attribute as it will be used as aria-label.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
      defaultValue: { summary: 'Choose a file' },
    },
    control: {
      type: 'text',
    },
  },
  legend: {
    name: 'legend',
    type: { required: false },
    defaultValue: '',
    description: 'Fieldset legend can be passed as a property or slot.',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
      defaultValue: { summary: 'Legend' },
    },
    control: {
      type: 'text',
    },
  },
  hiddenlegend,
  hiddenfilelist: {
    name: 'hiddenfilelist',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description: 'Hide the uploaded file list. It can be used when you want to show the file list in a custom way.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Content',
    },
    control: {
      type: 'boolean',
    },
  },
  accept: {
    name: 'accept',
    type: { required: false },
    defaultValue: '*',
    description:
      'The accept attribute takes as its value a comma-separated list of one or more <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers">unique file type specifiers</a>, describing which file types to allow.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
      defaultValue: { summary: '*' },
    },
    control: {
      type: 'text',
    },
  },
  multiple: {
    name: 'multiple',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description: 'Specifies if multiple files can be chosen at once.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Content',
    },
    control: {
      type: 'boolean',
    },
  },
  files: {
    name: 'files',
    description:
      'Files property can be used to prepopulate the file upload component. Please look at the `Prepopulate files` example for more details.',
    table: {
      category: 'Content',
    },
    control: {
      type: 'array',
    },
  },
  filesstatus: {
    name: 'filesstatus',
    description:
      'An array list containing file status details, that can be used to show the status, hint message or error message of each file uploaded. `example: [{fileName: "example.txt",status: "success", hint: "File uploaded successfully",errorMessage: "" }]` Check under slots tab to see how HTML content is passed in the hint and error message. Please look at the `Files statuses` under examples for more details.',
    table: {
      category: 'Content',
      type: {
        required: false,
        summary:
          "[{ fileName: string; hint?: string; status: 'success' | 'error' | 'loading'; errorMessage?: string; }]",
      },
    },
    control: {
      type: 'array',
      value: [],
    },
  },
  loading: loading(
    'file-upload',
    'This state also prevents the user from clicking and activating or submitting something more than one time.',
  ),
  hint: hint('mc-file-upload'),
  // style
  fit,
  variant: {
    name: 'variant',
    type: { required: false },
    defaultValue: 'default',
    description: 'Variant should be set to `drag-drop` when drag and drop is required.',
    table: {
      category: 'Style',
      type: { summary: 'default | drag-drop' },
      defaultValue: { summary: 'default' },
    },
    options: ['default', 'drag-drop'],
    control: {
      type: 'select',
    },
  },
  icon: icon('icon', '', '', 'string | slot'),
  trailingicon: icon('trailingicon', '', '', 'string | slot'),
  disabled,
  invalid,
  errormessage: errormessage('mc-file-upload'),
  name: name('files'),
  eventInput: eventtype('input', 'Fires on selection of files, providing the FileList of all the files selected.'),
  eventChange: eventtype('change', 'Fires on selection of files, providing the FileList of the newly selected files.'),
  allowduplicatefilenames: {
    name: 'allowduplicatefilenames',
    type: { name: 'boolean', required: false },
    defaultValue: false,
    description:
      'If set to `true`, allows duplicate file names by replacing the old file with the new one and emitting the event again.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
      category: 'Content',
    },
    control: {
      type: 'boolean',
    },
  },
};
