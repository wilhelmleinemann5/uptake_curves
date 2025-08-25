import { IMcTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon/types';

export const INPUT_FILE_DEFAULTS = {
  label: 'Choose a file',
  dragDropLabel: 'Drag and drop or browse file(s)',
};

export type McFileUploadInputDetail = FileList | undefined;
export type FileUploadVariant = 'default' | 'drag-drop';
export type FileUploadState = 'success' | 'error' | 'loading';

export interface IMcFileUpload extends IMcTextAndIcon {
  /**
   * The accept attribute takes as its value a comma-separated list of
   * one or more file types, or <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers">unique file type specifiers</a>, describing which file types to allow.
   */
  accept?: string;

  /**
   * True if disabled.
   */
  disabled?: boolean;

  /**
   * The label of the drag and drop section.
   * @deprecated Use `label` instead.
   */
  dragdroplabel?: string;

  /**
   * Error message will be shown only if `invalid` attribute is set to `true`.
   * Error message can be passed as simple argument like: `errormessage="error"`
   * or as a named slot: `<mc-inpu-file><span slot="errormessage">error message as HTML</span></mc-file-upload>`.
   * Use argument style for passing short messages, use named slot when you want to pass error message with HTML text.
   */
  errormessage?: string;

  /**
   * Gets the currently selected files (readonly).
   */
  files?: FileList;

  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the label (of the selector button) will not appear, but will be used as `aria-label` only.
   */
  hiddenlegend?: boolean;

  /**
   * Hint can be passed as simple argument like: `hint="hint text"`
   * or as a named slot: `<mc-file-upload><span slot="hint">hint text as HTML</span></mc-file-upload>`.
   * Use argument style for passing short hints, use named slot when you want to pass hint with HTML text.
   */
  hint?: string;

  /**
   * Sets the file-upload in the invalid state.
   */
  invalid?: boolean;

  /**
   * 'Fieldset legend can be passed as a property or slot.
   */
  legend?: string | null;

  /**
   * Icon to be displayed alongside the label.
   */
  icon?: string;

  /**
   * Trailing icon to be displayed at the end of the label.
   */
  trailingicon?: string;

  /**
   * Sets file-upload in the `loading` state.
   */
  loading: boolean;

  /**
   * Specifies if multiple files can be chosen at once.
   */
  multiple?: boolean;

  /**
   * The vairant, which can be either `default` or `drag-drop`,
   * should be set to `drag-drop` only when drag and drop is required.
   */
  variant?: FileUploadVariant;

  filesstatus?: FileStatus[];

  /**
   * Hides the file list.
   * @default false
   */
  hiddenfilelist?: boolean;

  /**
   * Fires on change of selected files.
   */
  input?: (e: CustomEvent<McFileUploadInputDetail>) => void;

  /**
   * If set to `true`, allows duplicate file names by replacing the old file with the new one
   * and emitting the event again.
   */
  allowduplicatefilenames?: boolean;
}

export interface FileStatus {
  fileName: string;
  hint?: string;
  status: FileUploadState;
  errorMessage?: string;
}
