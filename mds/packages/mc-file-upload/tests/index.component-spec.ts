import { html } from 'lit';
import '../src';
import { McFileUpload } from '../src';
import { FileStatus } from '../src/lib/types';

const inputName = 'test';
const expectedValue = `C:\\fakepath\\maersk.svg`;

const selectFiles = (fileNames: string | string[]): void => {
  cy.get('@mc-file-upload-input').invoke('attr', 'style', 'display: block');
  cy.get('@mc-file-upload-input').selectFile(fileNames);
  cy.get('@mc-file-upload-input').invoke('attr', 'style', 'display: none');
};

const dragDropFiles = (multiple = false): void => {
  cy.get('mc-file-upload').find('[data-cy=drag-drop-area]').as('mc-file-upload-drag-drop-area');

  const files = [
    new File([''], 'maersk.svg', { type: 'image/svg+xml' }),
    ...(multiple ? [new File([''], 'avatar.png', { type: 'image/png' })] : []),
  ];
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));

  cy.get('@mc-file-upload-drag-drop-area').trigger('dragenter', { dataTransfer });
  cy.get('@mc-file-upload-drag-drop-area').trigger('dragover', { dataTransfer });
  cy.get('@mc-file-upload-drag-drop-area').trigger('drop', { dataTransfer });
};

context('mc-file-upload', () => {
  describe('form', () => {
    describe('using the selector button', () => {
      it('parent form gets the selected file, when multiple=false', () => {
        cy.mount<McFileUpload>(html`<form><mc-file-upload name="${inputName}"></mc-file-upload></form>`).as('form');
        cy.get('@form').find('input[data-cy="input"]').as('mc-file-upload-input');
        cy.get('@form').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');

        selectFiles('cypress/fixtures/maersk.svg');

        cy.get('@mc-file-upload-hidden').should('have.value', expectedValue);
        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(inputName)?.name).to.equal('maersk.svg');
        });
      });

      it('parent form gets the selected files, when multiple=true', () => {
        cy.mount<McFileUpload>(html`<form><mc-file-upload name="${inputName}" multiple></mc-file-upload></form>`).as(
          'form',
        );
        cy.get('@form').find('input[data-cy="input"]').as('mc-file-upload-input');
        cy.get('@form').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');

        selectFiles(['cypress/fixtures/maersk.svg', 'cypress/fixtures/avatar.png']);

        cy.get('@mc-file-upload-hidden').should('have.value', expectedValue);
        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(inputName)?.name).to.equal('maersk.svg');

          cy.get('@mc-file-upload-hidden').then(($hiddenInput) => {
            const hiddenInput = $hiddenInput.get(0);
            expect(hiddenInput.files[0].name).to.eq('maersk.svg');
            expect(hiddenInput.files[1].name).to.eq('avatar.png');
          });
        });
        selectFiles(['cypress/fixtures/example.json']);
        cy.get('@mc-file-upload-hidden').should('have.value', expectedValue);
        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(inputName)?.name).to.equal('maersk.svg');

          cy.get('@mc-file-upload-hidden').then(($hiddenInput) => {
            const hiddenInput = $hiddenInput.get(0);
            expect(hiddenInput.files[0].name).to.eq('maersk.svg');
            expect(hiddenInput.files[1].name).to.eq('avatar.png');
            expect(hiddenInput.files[2].name).to.eq('example.json');
          });
        });
      });
    });
    describe('using drag & drop', () => {
      it('parent form gets the selected file, when multiple=false', () => {
        cy.mount<McFileUpload>(
          html`<form><mc-file-upload variant="drag-drop" name="${inputName}"></mc-file-upload></form>`,
        ).as('form');
        cy.get('@form').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');

        dragDropFiles();

        cy.get('@mc-file-upload-hidden').should('have.value', expectedValue);
        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(inputName)?.name).to.equal('maersk.svg');
        });
      });

      it('parent form gets the selected files, when multiple=true', () => {
        cy.mount<McFileUpload>(
          html`<form><mc-file-upload variant="drag-drop" name="${inputName}" multiple></mc-file-upload></form>`,
        ).as('form');
        cy.get('@form').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');

        dragDropFiles(true);

        cy.get('@mc-file-upload-hidden').should('have.value', expectedValue);
        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(inputName)?.name).to.equal('maersk.svg');

          cy.get('@mc-file-upload-hidden').then(($hiddenInput) => {
            const hiddenInput = $hiddenInput.get(0);
            expect(hiddenInput.files[0].name).to.eq('maersk.svg');
            expect(hiddenInput.files[1].name).to.eq('avatar.png');
          });
        });
      });

      it('Adds "drag-over" class on file drag-over (to add hover effect), removes it on dragleave or drop.', () => {
        cy.mount<McFileUpload>(
          html`<mc-file-upload variant="drag-drop" name="${inputName}" multiple></mc-file-upload>`,
        ).as('mc-file-upload');
        cy.get('mc-file-upload').find('[data-cy=drag-drop-area]').as('mc-file-upload-drag-drop-area');

        const files = [new File([''], 'maersk.svg', { type: 'image/svg+xml' })];
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));

        cy.get('@mc-file-upload-drag-drop-area').trigger('dragover', { dataTransfer });
        cy.get('@mc-file-upload-drag-drop-area').should('have.class', 'drag-over');

        cy.get('@mc-file-upload-drag-drop-area').trigger('drop', { dataTransfer });
        cy.get('@mc-file-upload-drag-drop-area').should('not.have.class', 'drag-over');

        cy.get('@mc-file-upload-drag-drop-area').trigger('dragover', { dataTransfer });
        cy.get('@mc-file-upload-drag-drop-area').should('have.class', 'drag-over');

        cy.get('@mc-file-upload-drag-drop-area').trigger('dragleave', { dataTransfer });
        cy.get('@mc-file-upload-drag-drop-area').should('not.have.class', 'drag-over');
      });
    });
  });

  describe('file selection', () => {
    beforeEach(() => {
      const inputEventHandlerSpy = cy.spy().as('onInputEventHandlerSpy');
      const changeEventHandlerSpy = cy.spy().as('onChangeEventHandlerSpy');
      cy.mount<McFileUpload>(
        html`<mc-file-upload
          name="${inputName}"
          @input="${(e): void => inputEventHandlerSpy(e.detail)}"
          @change="${(e): void => changeEventHandlerSpy(e.detail)}"
        ></mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
    });

    it('files are added to the file list after selection using the selector button', () => {
      selectFiles(['cypress/fixtures/maersk.svg', 'cypress/fixtures/avatar.png']);
      cy.get('[data-cy="file-maersk.svg"]').contains('maersk.svg');
      cy.get('[data-cy="file-avatar.png"]').contains('avatar.png');
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(2);
        cy.get('@onInputEventHandlerSpy').its('callCount').should('eq', 1);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
        cy.get('@onChangeEventHandlerSpy').its('callCount').should('eq', 1);
        cy.get('@onChangeEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
    });

    it('files are added to the file list after selection using drag & drop', () => {
      cy.get('@mc-file-upload').invoke('attr', 'variant', 'drag-drop');
      dragDropFiles(true);
      cy.get('[data-cy="file-maersk.svg"]').contains('maersk.svg');
      cy.get('[data-cy="file-avatar.png"]').contains('avatar.png');
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(2);
        cy.get('@onInputEventHandlerSpy').its('callCount').should('eq', 1);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
    });

    it('only maersk.svg is added to the file list after drag-droping both maersk.svg and avatar.png, when only .svg is accepted', () => {
      cy.get('@mc-file-upload').invoke('attr', 'variant', 'drag-drop');
      cy.get('@mc-file-upload').invoke('attr', 'accept', '.svg');
      dragDropFiles(true);
      cy.get('[data-cy="file-maersk.svg"]').contains('maersk.svg');
      cy.get('[data-cy="file-avatar.png"]').should('not.exist');
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(1);
        cy.get('@onInputEventHandlerSpy').its('callCount').should('eq', 1);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
    });

    it('only maersk.svg is added to the file list after drag-droping both maersk.svg and avatar.png, when only image/svg+xml is accepted', () => {
      cy.get('@mc-file-upload').invoke('attr', 'variant', 'drag-drop');
      cy.get('@mc-file-upload').invoke('attr', 'accept', 'image/svg+xml');
      dragDropFiles(true);
      cy.get('[data-cy="file-maersk.svg"]').contains('maersk.svg');
      cy.get('[data-cy="file-avatar.png"]').should('not.exist');
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(1);
        cy.get('@onInputEventHandlerSpy').its('callCount').should('eq', 1);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
    });

    it('both maersk.svg and avatar.png are added to the file list after drag-droping both maersk.svg and avatar.png, when image/svg+xml,.png is accepted', () => {
      cy.get('@mc-file-upload').invoke('attr', 'variant', 'drag-drop');
      cy.get('@mc-file-upload').invoke('attr', 'accept', 'image/svg+xml,.png');
      dragDropFiles(true);
      cy.get('[data-cy="file-maersk.svg"]').contains('maersk.svg');
      cy.get('[data-cy="file-avatar.png"]').contains('avatar.png');
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(2);
        cy.get('@onInputEventHandlerSpy').its('callCount').should('eq', 1);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
    });

    it('both maersk.svg and avatar.png are added to the file list after drag-droping both maersk.svg and avatar.png, when image/* is accepted', () => {
      cy.get('@mc-file-upload').invoke('attr', 'variant', 'drag-drop');
      cy.get('@mc-file-upload').invoke('attr', 'accept', 'image/*');
      dragDropFiles(true);
      cy.get('[data-cy="file-maersk.svg"]').contains('maersk.svg');
      cy.get('[data-cy="file-avatar.png"]').contains('avatar.png');
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(2);
        cy.get('@onInputEventHandlerSpy').its('callCount').should('eq', 1);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
    });

    it('removing the maersk.svg file, will remove it from the file list', () => {
      selectFiles(['cypress/fixtures/maersk.svg', 'cypress/fixtures/avatar.png']);
      cy.get('@mc-file-upload').find('[data-cy="file-maersk.svg"]').contains('maersk.svg');
      cy.get('@mc-file-upload').find('[data-cy="file-avatar.png"]').contains('avatar.png');
      cy.get('@mc-file-upload').find('[data-cy=remove-button]:nth(0)').realClick();
      cy.get('@mc-file-upload').find('[data-cy="file-maersk.svg"]').should('not.exist');
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(1);
        cy.get('@onInputEventHandlerSpy').its('callCount').should('eq', 2);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
    });
  });

  describe('file selection on change event', function () {
    beforeEach(() => {
      const inputEventHandlerSpy = cy.spy().as('onInputEventHandlerSpy');
      const changeEventHandlerSpy = cy.spy().as('onChangeEventHandlerSpy');
      cy.mount<McFileUpload>(
        html`<mc-file-upload
          name="${inputName}"
          @input="${(e): void => inputEventHandlerSpy(e.detail)}"
          @change="${(e): void => changeEventHandlerSpy(e.detail)}"
          multiple
        ></mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
    });
    it('should emit change event with only updated files when a file is added', () => {
      selectFiles(['cypress/fixtures/maersk.svg', 'cypress/fixtures/avatar.png']);
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(2);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
        cy.get('@onChangeEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
      });
      selectFiles(['cypress/fixtures/example.json']);
      cy.get('@mc-file-upload').then(($inputFile) => {
        const inputFile = $inputFile.get(0);
        expect(inputFile.files.length).to.eq(3);
        cy.get('@onInputEventHandlerSpy').should('have.been.calledWithMatch', inputFile.files);
        cy.get('@onChangeEventHandlerSpy').should('have.been.calledWithMatch', {});
      });
    });
  });

  describe('files statuses', function () {
    it('should show file status loading and hint message when filesstatus is set', () => {
      const filesstatus: FileStatus[] = [
        { fileName: 'maersk.svg', status: 'loading', hint: 'Scanning for viruses ...', errorMessage: '' },
      ];
      cy.mount<McFileUpload>(
        html`<mc-file-upload name="${inputName}" .filesstatus=${filesstatus}></mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
      selectFiles(['cypress/fixtures/maersk.svg']);
      cy.get('[data-cy="hint-maersk.svg"]').contains('Scanning for viruses ...');
    });
    it('should show file status error and hint and error message when filesstatus is set', () => {
      const filesstatus: FileStatus[] = [{ fileName: 'maersk.svg', status: 'error', hint: '', errorMessage: 'Error' }];
      cy.mount<McFileUpload>(
        html`<mc-file-upload name="${inputName}" .filesstatus=${filesstatus}></mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
      selectFiles(['cypress/fixtures/maersk.svg']);
      cy.get('[data-cy="hint-maersk.svg"]').should('contain.text', '');
      cy.get('[data-cy="error-maersk.svg"]').contains('Error');
    });
    it('should not show error message if status is not error', () => {
      const filesstatus: FileStatus[] = [
        { fileName: 'maersk.svg', status: 'loading', hint: '', errorMessage: 'Error' },
      ];
      cy.mount<McFileUpload>(
        html`<mc-file-upload name="${inputName}" .filesstatus=${filesstatus}></mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
      selectFiles(['cypress/fixtures/maersk.svg']);
      cy.get('[data-cy="error-maersk.svg"]').should('contain.text', '');
    });
    it('should show status only on the file that has status when multiple files are selelected', () => {
      const filesstatus: FileStatus[] = [
        { fileName: 'maersk.svg', status: 'loading', hint: 'Scanning for viruses ...', errorMessage: '' },
      ];
      cy.mount<McFileUpload>(
        html`<mc-file-upload name="${inputName}" .filesstatus=${filesstatus} multiple></mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
      selectFiles(['cypress/fixtures/maersk.svg', 'cypress/fixtures/avatar.png']);
      cy.get('[data-cy="file-maersk.svg"]').find('[data-cy="file-loading-icon"]').should('exist');
      cy.get('[data-cy="hint-maersk.svg"]').contains('Scanning for viruses ...');
      cy.get('[data-cy="file-avatar.png"]').find('[data-cy="file-loading-icon"]').should('not.exist');
      cy.get('[data-cy="hint-avatar.svg"]').should('not.exist');
    });
    it('should show status on the file that has status when multiple files are selected through drag and drop', function () {
      const filesstatus: FileStatus[] = [
        { fileName: 'maersk.svg', status: 'loading', hint: 'Scanning for viruses ...', errorMessage: '' },
      ];
      cy.mount<McFileUpload>(
        html`<mc-file-upload
          name="${inputName}"
          .filesstatus=${filesstatus}
          variant="drag-drop"
          multiple
        ></mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
      dragDropFiles(true);
      cy.get('[data-cy="file-maersk.svg"]').find('[data-cy="file-loading-icon"]').should('exist');
      cy.get('[data-cy="hint-maersk.svg"]').contains('Scanning for viruses ...');
      cy.get('[data-cy="file-avatar.png"]').find('[data-cy="file-loading-icon"]').should('not.exist');
      cy.get('[data-cy="hint-avatar.svg"]').should('not.exist');
    });
    it('should show hint/error message with slots under each selected file name', function () {
      const filesstatus: FileStatus[] = [{ fileName: 'maersk.svg', status: 'error', hint: '', errorMessage: '' }];
      cy.mount<McFileUpload>(
        html`<mc-file-upload name="${inputName}" .filesstatus=${filesstatus} multiple>
          <span slot="hint-maersk.svg">hint slot</span>
          <span slot="error-maersk.svg">error slot</span>
        </mc-file-upload>`,
      ).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
      selectFiles(['cypress/fixtures/maersk.svg', 'cypress/fixtures/avatar.png']);
      cy.get('[slot="hint-maersk.svg"]').should('contain.text', 'hint slot');
      cy.get('[slot="error-maersk.svg"]').should('contain.text', 'error slot');
    });
  });

  describe('file renaming', () => {
    it('append _copy to filenames when duplicate detected', () => {
      cy.mount<McFileUpload>(html`<mc-file-upload name="${inputName}" multiple></mc-file-upload>`).as('mc-file-upload');
      cy.get('@mc-file-upload').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@mc-file-upload').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');
      selectFiles([
        'cypress/fixtures/maersk.svg',
        'cypress/fixtures/avatar.png',
        'cypress/fixtures/example.json',
        'cypress/fixtures/text-file-no-extension',
      ]);
      cy.get('@mc-file-upload-hidden').then(($hiddenInput) => {
        const hiddenInput = $hiddenInput.get(0);
        expect(hiddenInput.files.length).to.eq(4);
        expect(hiddenInput.files[0].name).to.eq('maersk.svg');
        expect(hiddenInput.files[1].name).to.eq('avatar.png');
        expect(hiddenInput.files[2].name).to.eq('example.json');
        expect(hiddenInput.files[3].name).to.eq('text-file-no-extension');
      });

      selectFiles([
        'cypress/fixtures/duplicate-filenames/maersk.svg',
        'cypress/fixtures/duplicate-filenames/avatar.png',
        'cypress/fixtures/duplicate-filenames/example.json',
        'cypress/fixtures/duplicate-filenames/text-file-no-extension',
        'cypress/fixtures/duplicate-filenames/avatar_copy.png',
        'cypress/fixtures/duplicate-filenames/avatar_copy_copy.png',
      ]);
      cy.get('@mc-file-upload-hidden').then(($hiddenInput) => {
        const hiddenInput = $hiddenInput.get(0);
        expect(hiddenInput.files.length).to.eq(10);
        expect(hiddenInput.files[0].name).to.eq('maersk.svg');
        expect(hiddenInput.files[1].name).to.eq('avatar.png');
        expect(hiddenInput.files[2].name).to.eq('example.json');
        expect(hiddenInput.files[3].name).to.eq('text-file-no-extension');
        expect(hiddenInput.files[4].name).to.eq('maersk_copy.svg');
        expect(hiddenInput.files[5].name).to.eq('avatar_copy.png');
        expect(hiddenInput.files[6].name).to.eq('example_copy.json');
        expect(hiddenInput.files[7].name).to.eq('text-file-no-extension_copy');
        expect(hiddenInput.files[8].name).to.eq('avatar_copy_copy.png');
        expect(hiddenInput.files[9].name).to.eq('avatar_copy_copy_copy.png');
      });

      cy.get('@mc-file-upload').find('[data-cy=remove-button]:nth(0)').realClick();
      selectFiles(['cypress/fixtures/maersk.svg']);
      cy.get('@mc-file-upload-hidden').then(($hiddenInput) => {
        const hiddenInput = $hiddenInput.get(0);
        expect(hiddenInput.files.length).to.eq(10);
        expect(hiddenInput.files[9].name).to.eq('maersk.svg');
      });

      cy.get('@mc-file-upload').find('[data-cy=remove-button]:nth(3)').realClick();
      selectFiles(['cypress/fixtures/duplicate-filenames/maersk.svg']);
      cy.get('@mc-file-upload-hidden').then(($hiddenInput) => {
        const hiddenInput = $hiddenInput.get(0);
        expect(hiddenInput.files.length).to.eq(10);
        expect(hiddenInput.files[9].name).to.eq('maersk_copy.svg');
      });
    });
  });
  describe('file-url slot rendering', () => {
    it('should verify that file-url-0 includes the provided link for the first uploaded file', () => {
      cy.mount<McFileUpload>(
        html`<form>
          <mc-file-upload name="${inputName}" multiple>
            <span slot="file-url-0">
              <a href="https://maersk.com" target="_blank">maersk.svg</a>
            </span>
          </mc-file-upload>
        </form>`,
      ).as('form');
      cy.get('@form').find('input[data-cy="input"]').as('mc-file-upload-input');
      cy.get('@form').find('input[aria-hidden="true"]').as('mc-file-upload-hidden');

      selectFiles(['cypress/fixtures/maersk.svg', 'cypress/fixtures/avatar.png']);

      cy.get('[slot="file-url-0"] a')
        .should('have.attr', 'href', 'https://maersk.com')
        .and('have.attr', 'target', '_blank')
        .and('contain.text', 'maersk.svg');
    });
  });
});
