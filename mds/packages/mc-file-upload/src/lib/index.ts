// lit-elements
import { CSSResultArray, PropertyValues, TemplateResult, html } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// utils
import { FormField, DisabledState } from '@maersk-global/mds-components-utils';

// styles
import { styles } from './styles/index.styles';

// types
import { Fit } from '@maersk-global/mds-shared-types';
import { McTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon';
import { FileUploadVariant, INPUT_FILE_DEFAULTS, McFileUploadInputDetail, FileStatus, IMcFileUpload } from './types';

// other components
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-error';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-icon';

export type { IMcFileUpload } from './types';

/**
 * @element` mc-file-upload`
 *
 * @event {CustomEvent<McFileUploadInputDetail>} input - Fired when single/multiple files are selected, or removed.
 * @event {CustomEvent<McFileUploadInputDetail>} change - Fired when single/multiple files are selected.
 *
 * @slot `icon` - The icon HTML
 * @slot `trailingicon` - The trailing icon HTML
 * @slot `intermediate` - The intermediate icon HTML
 * @slot `file-url-0`, `file-url-1`, ... - The file URL HTML, which is displayed in the file list.
 *
 * @csspart `button` - for changing visuals of button.
 * @csspart `drag-drop-area` - for changing visuals of drag-drop area, when drag-drop variant is selected.
 */
export class McFileUpload extends DisabledState(FormField(McTextAndIcon)) implements IMcFileUpload {
  protected controlType = 'file';

  @property({ type: String })
  public icon = '';

  @property({ type: String })
  public trailingicon = '';

  @query('input[type=file]')
  private fileInput?: HTMLInputElement;

  @queryAssignedElements({ slot: 'legend', flatten: true })
  private legendElements!: Array<HTMLElement>;

  @state()
  private hasSlotLegend = false;

  @state()
  private draggedOver = false;

  @state()
  private get legendVisible(): boolean {
    return !!(this.hasSlotLegend || this.legend);
  }

  @queryAssignedElements({ slot: 'hint', flatten: true })
  private hintElements!: Array<HTMLElement>;

  @state()
  private hasSlotHint = false;

  @state()
  private get hintVisible(): boolean {
    return !!(this.hasSlotHint || this.hint);
  }

  @queryAssignedElements({ slot: 'error', flatten: true })
  private errorElements!: Array<HTMLElement>;

  @state()
  private hasSlotError = false;

  @state()
  private get errorVisible(): boolean {
    return !!((this.hasSlotError || this.errormessage) && this.invalid);
  }

  @property({ type: String })
  public accept = '*';

  /**
   * @deprecated Use `label` instead.
   */
  @property({ type: String })
  public dragdroplabel = INPUT_FILE_DEFAULTS.dragDropLabel;

  @property({ type: String })
  public errormessage?: string;

  @property({ type: Object })
  public files?: FileList;

  @property({ type: Array })
  public filesstatus?: FileStatus[];

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlegend = false;

  @property({ type: String })
  public hint?: string;

  @property({ type: Boolean })
  public allowduplicatefilenames?: boolean;

  @property({ type: Boolean, reflect: true })
  public invalid = false;

  @property({ type: String })
  public legend?: string | null = null;

  @property({ type: Boolean, reflect: true })
  public loading = false;

  @property({ type: Boolean })
  public multiple = false;

  @property({ type: Number })
  public tabindex?: number;

  @property({ type: String })
  public value?: string;

  @property({ type: String })
  public variant?: FileUploadVariant = 'default';

  @property({ type: Boolean })
  public hiddenfilelist?: boolean = false;

  public static get styles(): CSSResultArray {
    return [...styles];
  }

  public constructor() {
    super();
    this.type = 'file';
  }

  public async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(changedProperties);
    await this.updateComplete;

    if (this.variant === 'drag-drop' && this.dragdroplabel !== INPUT_FILE_DEFAULTS.dragDropLabel) {
      // Only due to backwards compatibility
      this.label = this.dragdroplabel;
    } else {
      this.label =
        this.label || (this.variant === 'default' ? INPUT_FILE_DEFAULTS.label : INPUT_FILE_DEFAULTS.dragDropLabel);
    }
  }

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('dragdroplabel') && this.dragdroplabel !== INPUT_FILE_DEFAULTS.dragDropLabel) {
      // Only due to backwards compatibility
      this.label = this.dragdroplabel;
    }
  }

  protected renderHint(id: string, hint?: string): TemplateResult {
    return html`<mc-hint .id=${id} .hint=${hint} .fit=${this.fit} data-cy=${id}
      ><slot @slotchange=${this.onHintSlotChange} .name=${id}>${hint}</slot></mc-hint
    >`;
  }

  protected renderErrorMessage(id: string, error?: string, invalid?: boolean): TemplateResult {
    return html` <mc-error .id=${id} .errormessage=${error} .fit=${this.fit} ?invalid=${invalid} data-cy=${id}>
      <slot @slotchange=${this.onErrorSlotChange} .name=${id}>${error}</slot>
    </mc-error>`;
  }

  protected renderFileStatusIcon(fileName: string, index: number, fileStatus?: FileStatus): TemplateResult {
    if (fileStatus && fileStatus.status === 'loading') {
      return html`<mc-loading-indicator
        class="file-status-loading"
        data-cy="file-loading-icon"
        .fit="${this.fit}"
        label="loading in progress"
        hiddenlabel
      ></mc-loading-indicator>`;
    } else {
      return html`<mc-button
        class="file-status-remove"
        data-cy="remove-button"
        label="Remove ${fileName}"
        appearance="neutral"
        variant="plain"
        icon="times"
        hiddenlabel
        disabledlabelslot
        fit="${this.fit}"
        padding="none"
        @click="${(): void => this.onFileRemove(index)}"
      ></mc-button>`;
    }
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      'hidden-legend': !this.legendVisible || this.hiddenlegend,
      'drag-drop': this.variant === 'drag-drop',
    };

    const dragDropAreaClasses = {
      'drag-over': this.draggedOver,
    };

    return html`<fieldset class="mc-file-upload ${classMap(classes)}">
      <div
        class=${(this.legendVisible || this.hintVisible || this.errorVisible) && !this.hiddenlegend
          ? ''
          : 'no-feedback'}
      >
        <legend aria-label="${ifDefined(this.hiddenlegend && this.legend ? this.legend : undefined)}">
          <mc-label
            id="label"
            label="${ifDefined(this.legend ? this.legend : undefined)}"
            .fit=${this.fit}
            ?hiddenlabel=${this.hiddenlegend}
            ><slot name="legend" @slotchange=${this.onLegendSlotChange}>${this.legend}</slot></mc-label
          >
        </legend>
        ${this.renderErrorMessage('errormessage', this.errormessage, this.invalid)}
        ${this.renderHint('hint', this.hint)}
      </div>
      <div>
        ${this.variant === 'drag-drop'
          ? html`<div
              aria-dropeffect="copy"
              aria-label="${this.label}"
              role="button"
              part="drag-drop-area"
              class="drag-drop-area ${classMap(dragDropAreaClasses)}"
              data-cy="drag-drop-area"
              @drop="${this.handleDrop}"
              @dragover="${this.handleDragOver}"
              @dragleave="${() => (this.draggedOver = false)}"
              @click=${this.onSelectorClick}
            >
              ${this.loading
                ? html`<mc-loading-indicator
                    .fit="${this.fit}"
                    .label="${this.label} in progress"
                    hiddenlabel
                  ></mc-loading-indicator>`
                : html`<mc-icon size="24" icon="tray-arrow-up"></mc-icon>`}
              <span>${this.label}</span>
            </div>`
          : html`<mc-button
              exportparts="button"
              appearance="neutral"
              ?disabled="${this.disabled}"
              ?loading=${this.loading}
              .fit="${this.fit}"
              disabledlabelslot
              tabindex="${ifDefined(this.tabindex)}"
              .label="${this.label}"
              .icon="${this.icon}"
              .trailingicon="${this.trailingicon}"
              @click=${this.onSelectorClick}
            >
              <slot slot="icon" name="icon">${this.renderIcon(this.icon)}</slot>
              <slot slot="trailingicon" name="trailingicon">${this.renderIcon(this.trailingicon)}</slot>
            </mc-button>`}
      </div>
      <slot name="intermediate"></slot>
      <input
        data-cy="input"
        ?multiple=${this.multiple}
        type="file"
        id="fileupload"
        accept=${this.accept}
        aria-hidden="true"
        tabindex="-1"
        @change=${this.handleFileChange}
        @input=${this.handleInput}
      />
      ${this.files && this.files.length !== 0 && !this.hiddenfilelist
        ? html`<div role="list" class="files" aria-labelledby="label">
            ${repeat(this.files, (file, index) => {
              const fileStatus: FileStatus | undefined = this.filesstatus?.find(
                (fileStatus) => fileStatus.fileName === file.name,
              );
              const classNames = fileStatus?.status === 'error' ? 'file error' : 'file';
              const fileNameSplit = file.name.split('.');
              const fileExtension = fileNameSplit.length > 1 ? fileNameSplit[fileNameSplit.length - 1] : '';
              const fileNameWithoutExtension =
                fileNameSplit.length > 1 ? fileNameSplit.slice(0, -1).join('.') : fileNameSplit[0];
              return html`<div
                role="listitem"
                id="file-${index}"
                data-cy="file-${file.name}"
                aria-labelledby="file-${index}"
                .className=${classNames}
              >
                <div class="file-name" .title=${file.name}>
                  <slot name="file-url-${index}">
                    <span class="name">${fileNameWithoutExtension}</span>
                    ${fileExtension ? html`<span class="extension">.${fileExtension}</span>` : ''}
                  </slot>
                </div>
                <div class="file-status-icon">${this.renderFileStatusIcon(file.name, index, fileStatus)}</div>
                <div class="file-status-text">
                  ${this.renderErrorMessage(
                    `error-${fileStatus?.fileName || index}`,
                    fileStatus?.errorMessage,
                    !!(fileStatus?.status === 'error'),
                  )}
                  ${this.renderHint(`hint-${fileStatus?.fileName || index}`, fileStatus?.hint)}
                </div>
              </div>`;
            })}
          </div>`
        : null}
    </fieldset>`;
  }

  private onSelectorClick(): void {
    this.fileInput?.click();
  }

  private onFileRemove(index: number): void {
    if (this.files) {
      const files = Array.from(this.files);
      files?.splice(index, 1);
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));

      if (this.fileInput) {
        this.files = dataTransfer.files;
        this.value = this.fileInput.value;
        this.fileInput.files = dataTransfer.files;
      }

      this.dispatchInputEvent();
    }
  }

  private handleInput(event: InputEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private handleDragOver(event: DragEvent): void {
    this.draggedOver = true;
    event.preventDefault();
  }

  private handleFileChange(): void {
    if (this.fileInput && this.fileInput.files && this.fileInput.files.length !== 0) {
      this.dispatchChangeEvent(this.fileInput.files);
      this.updateFiles(Array.from(this.fileInput.files));
    }
  }

  private isFileAccepted(file: File, acceptedExtensionsOrMIMETypes: Array<string>): boolean {
    const extension = file.name ? `.${file.name.split('.').pop()?.toLowerCase()}` : '';

    // Check for file extension matches
    if (acceptedExtensionsOrMIMETypes.includes(extension)) {
      return true;
    }

    // Check for exact MIME types matches
    const mimeType = file.type.toLowerCase();
    if (acceptedExtensionsOrMIMETypes.includes(mimeType)) {
      return true;
    }

    // Check for wildcard MIME types (e.g., image/*, video/*, audio/*)
    const [type /*, subtype*/] = mimeType.split('/');
    return acceptedExtensionsOrMIMETypes.some((accepted) => {
      const [acceptedType, acceptedSubtype] = accepted.split('/');
      return acceptedSubtype === '*' && acceptedType === type;
    });
  }

  private handleDrop(event: DragEvent): void {
    this.draggedOver = false;
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const files = Array.from(event.dataTransfer.files);
      const acceptedExtensionsOrMIMETypes = this.accept?.split(',').map((ext) => ext.trim().toLowerCase()) || [];
      const acceptedFiles =
        this.accept === '*' ? files : files.filter((file) => this.isFileAccepted(file, acceptedExtensionsOrMIMETypes));

      if (acceptedFiles?.length) {
        const acceptedFileList = this.convertArrayToFileList(acceptedFiles);
        this.dispatchChangeEvent(acceptedFileList);
      }
      this.updateFiles(acceptedFiles);
    }
  }

  private convertArrayToFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  }

  private updateFiles(files: File[]): void {
    const currentlySelectedFiles = this.files && this.multiple ? Array.from(this.files) : [];

    files.forEach((file) => {
      const filename = this.allowduplicatefilenames
        ? file.name
        : this.ensureFilenameIsUnique(file.name, currentlySelectedFiles);

      const existingFileIndex = currentlySelectedFiles.findIndex((f) => f.name === filename);
      if (existingFileIndex !== -1 && this.allowduplicatefilenames) {
        currentlySelectedFiles[existingFileIndex] = file;
      } else if (filename === file.name) {
        currentlySelectedFiles.push(file);
      } else {
        currentlySelectedFiles.push(new File([file], filename, { type: file.type }));
      }
    });

    const dataTransfer = new DataTransfer();
    currentlySelectedFiles.forEach((file) => dataTransfer.items.add(file));

    this.files = dataTransfer.files;

    if (this.fileInput) {
      this.fileInput.files = dataTransfer.files;
      this.value = this.fileInput.value;
    }

    this.dispatchInputEvent();
  }

  private ensureFilenameIsUnique(filename: string, files: File[]): string {
    const exists = files.find((file) => file.name === filename);
    if (exists) {
      if (this.allowduplicatefilenames) {
        return filename;
      }
      const lastDotIndex = filename.lastIndexOf('.');
      if (lastDotIndex === -1) {
        // No extension
        return this.ensureFilenameIsUnique(`${filename}_copy`, files);
      }
      // Has extension
      const name = filename.substring(0, lastDotIndex);
      const extension = filename.substring(lastDotIndex);
      return this.ensureFilenameIsUnique(`${name}_copy${extension}`, files);
    }
    return filename;
  }

  private dispatchInputEvent(): void {
    this.dispatchEvent(new CustomEvent<McFileUploadInputDetail>('input', { detail: this.files, bubbles: true }));
  }

  private dispatchChangeEvent(filesUpdated: FileList): void {
    this.dispatchEvent(new CustomEvent<McFileUploadInputDetail>('change', { detail: filesUpdated, bubbles: true }));
  }

  private onLegendSlotChange(): void {
    this.hasSlotLegend = this.legendElements.length > 0;
  }

  private onHintSlotChange(): void {
    this.hasSlotHint = this.hintElements.length > 0;
  }

  private onErrorSlotChange(): void {
    this.hasSlotError = this.errorElements.length > 0;
  }
}

customElements.get('mc-file-upload') || customElements.define('mc-file-upload', McFileUpload);
