import { html } from 'lit';
import '../src';
import { McDialog } from '../src';

const heading = 'Dialog heading';
const body = 'Dialog body';
context('mc-dialog-base', () => {
  beforeEach(() => {
    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body} id="defaultDialog">
        <mc-button slot="secondaryAction" appearance="neutral" dialogaction="cancel" id="button-dialog-cancel"
          >Cancel</mc-button
        >
        <mc-button slot="primaryAction" dialogaction="ok" id="button-dialog-ok">Confirm</mc-button>
      </mc-dialog>
    `).as('mc-dialog');
  });
  it('mounts', () => {
    cy.get('@mc-dialog');
  });
  it('toggles the dialog with the "open" prop', () => {
    cy.get('@mc-dialog').find('dialog').should('not.be.visible');
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').find('dialog').should('be.visible');
    cy.get('@mc-dialog').invoke('removeAttr', 'open');
    cy.get('@mc-dialog').find('dialog').should('not.be.visible');
  });
  it('closes the dialog when ESC is pressed', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').find('dialog').trigger('keydown', { key: 'Escape' });
    cy.get('@mc-dialog').find('dialog').should('not.be.visible');
  });
  it('does not close the dialog when ESC is pressed and escapecloseactiondisabled is true', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').invoke('attr', 'escapecloseactiondisabled', '');
    cy.get('@mc-dialog').find('dialog').trigger('keydown', { key: 'Escape' });
    cy.get('@mc-dialog').find('dialog').should('be.visible');
  });
  it('brings focus to the dialog when opened', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').find('h1').should('have.focus');
  });
  it(`dispatches "closing" event along with 'cancel' in detail, when dialog is closed using ESC`, () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    const closingHandler = cy.stub().as('closingHandler');
    cy.get('mc-dialog').then(($el) => {
      const mcDialog = $el.get(0);
      mcDialog.addEventListener('closing', closingHandler);

      cy.get('@mc-dialog').find('dialog').trigger('keydown', { key: 'Escape' });
    });

    cy.get('@closingHandler').its('callCount').should('eq', 1);
    cy.get('@closingHandler').should('have.been.calledWithMatch', {
      detail: { action: 'cancel' },
    });
  });
  it(`dispatches 'closing' event along with 'cancel' in detail, when the button with 'dialogaction="cancel"' is clicked`, () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    const closingHandler = cy.stub().as('closingHandler');
    cy.get('mc-dialog').then(($el) => {
      const mcDialog = $el.get(0);
      mcDialog.addEventListener('closing', closingHandler);

      cy.get('#button-dialog-cancel').click();
    });

    cy.get('@closingHandler').its('callCount').should('eq', 1);
    cy.get('@closingHandler').should('have.been.calledWithMatch', {
      detail: { action: 'cancel' },
    });
  });
  it(`dispatches 'closed' event along with 'cancel' in detail, when the button with 'dialogaction="cancel"' is clicked`, () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    const closedHandler = cy.stub().as('closedHandler');
    cy.get('mc-dialog').then(($el) => {
      const mcDialog = $el.get(0);
      mcDialog.addEventListener('closed', closedHandler);

      cy.get('#button-dialog-cancel').click();
    });

    cy.get('@closedHandler').its('callCount').should('eq', 1);
    cy.get('@closedHandler').should('have.been.calledWithMatch', {
      detail: { action: 'cancel' },
    });
  });
  it(`dispatches "opening" event when dialog is opened`, () => {
    const openingHandler = cy.stub().as('openingHandler');
    cy.get('mc-dialog').then(($el) => {
      const mcDialog = $el.get(0);
      mcDialog.addEventListener('opening', openingHandler);

      cy.get('@mc-dialog').invoke('attr', 'open', '');
    });

    cy.get('@openingHandler').its('callCount').should('eq', 1);
  });

  it(`dispatches "opened" event when dialog is opened`, () => {
    const openedHandler = cy.stub().as('openedHandler');
    cy.get('mc-dialog').then(($el) => {
      const mcDialog = $el.get(0);
      mcDialog.addEventListener('opened', openedHandler);

      cy.get('@mc-dialog').invoke('attr', 'open', '');
    });

    cy.get('@openedHandler').its('callCount').should('eq', 1);
  });
  it('sets the required zindex on the dialog', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').invoke('attr', 'zindex', 500);
    cy.get('@mc-dialog').find('dialog').should('have.css', 'z-index', '500');
  });
  it('does not render close button by default', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').find('[data-cy="close"]').should('not.exist');
  });
  it('renders close button when showclosebutton is true', () => {
    cy.get('@mc-dialog').invoke('attr', 'showclosebutton', '');
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').find('[data-cy="close"]').should('exist');
  });
  it('closes the dialog when close button is clicked', () => {
    cy.get('@mc-dialog').invoke('attr', 'showclosebutton', '');
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').find('[data-cy="close"]').click();
    cy.get('@mc-dialog').find('dialog').should('not.be.visible');
  });
  it('disables page scroll when dialog is open', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('html').should('have.css', 'overflow', 'hidden');
  });
  it('enables page scroll when dialog is closed', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').invoke('removeAttr', 'open');
    cy.get('html').should('have.css', 'overflow', 'visible');
  });
  it('does not disable page scroll when disablepagescroll is false', () => {
    cy.get('@mc-dialog').then(($el) => {
      ($el.get(0) as McDialog).disablepagescroll = false;
    });
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('html').should('have.css', 'overflow', 'visible');
  });
  it('does not close the dialog when clicking outside of dialog', () => {
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('body').click(0, 0);
    cy.get('@mc-dialog').find('dialog').should('be.visible');
  });
  it('closes the dialog when clicking outside of dialog and closeonclickoutside is true', () => {
    cy.get('@mc-dialog').invoke('attr', 'closeonclickoutside', '');
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('body').click(0, 0);
    cy.get('@mc-dialog').find('dialog').should('not.be.visible');
  });
  it('opens as non-modal dialog when nonmodal is true', () => {
    cy.viewport(800, 1200);
    cy.mount(html`<button>Interaction test</button>`).as('interaction-button');
    cy.get('@mc-dialog').invoke('attr', 'nonmodal', '');
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    //check that the page can be interacted with and dialog does not close when clicking outside
    cy.get('@interaction-button').click();
    cy.get('@mc-dialog').find('dialog').should('be.visible');
  });
  it('applies width as objects with breakpoint values', () => {
    cy.get('#defaultDialog').invoke('remove');

    const widthObj = { xs: '100%', sm: '400px', md: '600px', lg: '800px', xl: '1000px' };

    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body}>
        <mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>
      </mc-dialog>
    `).as('mc-dialog');

    cy.get('@mc-dialog').then(($el) => {
      const dialog = $el.get(0) as McDialog;
      dialog.width = { ...widthObj };
    });

    cy.get('@mc-dialog').invoke('attr', 'open', '');

    const checkWidthAndProperties = (viewportWidth: number, expectedWidth: string) => {
      cy.viewport(viewportWidth, 600);

      cy.get('@mc-dialog')
        .find('dialog')
        .should(($dialog) => {
          const computedStyle = window.getComputedStyle($dialog[0]);
          const computedWidth = parseFloat(computedStyle.width).toFixed(0) + 'px';
          expect(computedWidth).to.equal(expectedWidth);

          // Check if CSS custom properties are set
          Object.entries(widthObj).forEach(([breakpoint, value]) => {
            const propertyValue = computedStyle.getPropertyValue(`--dialog-width-${breakpoint}`);
            expect(propertyValue.trim()).to.equal(value);
          });
        });
    };

    // Test for different breakpoints
    checkWidthAndProperties(640, '640px'); // xs breakpoint
    checkWidthAndProperties(1024, '400px'); // sm breakpoint
    checkWidthAndProperties(1440, '600px'); // md breakpoint
    checkWidthAndProperties(1920, '800px'); // lg breakpoint
    checkWidthAndProperties(2000, '1000px'); // xl breakpoint
  });
  it('applies width as strings', () => {
    cy.get('#defaultDialog').invoke('remove');
    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body} width="300px">
        <mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>
      </mc-dialog>
    `).as('mc-dialog');
    cy.viewport(1000, 1000);
    cy.get('@mc-dialog').invoke('attr', 'open', '');

    cy.get('@mc-dialog')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(300);
      });
  });
  it('string values override object values for width', () => {
    cy.get('#defaultDialog').invoke('remove');
    const widthObj = { xs: '100%', sm: '400px', md: '600px', lg: '800px', xl: '1000px' };

    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body} .width=${widthObj}>
        <mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>
      </mc-dialog>
    `).as('mc-dialog');

    cy.get('@mc-dialog').invoke('attr', 'open', '');

    // First, check that object values are applied
    cy.viewport(1920, 1024); // lg breakpoint
    cy.get('@mc-dialog')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(800);
      });

    // Now, override with string values
    cy.get('@mc-dialog').then(($el) => {
      const dialog = $el.get(0) as McDialog;
      dialog.width = '300px';
    });

    // Check that string values are applied and override object values
    cy.get('@mc-dialog')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(300);
      });
  });

  it('applies customsize as objects with breakpoint values', () => {
    cy.get('#defaultDialog').invoke('remove');

    const customSizeObj = { xs: '100%', sm: '400px', md: '600px', lg: '800px', xl: '1000px' };

    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body}>
        <mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>
      </mc-dialog>
    `).as('mc-dialog');

    cy.get('@mc-dialog').then(($el) => {
      const dialog = $el.get(0) as McDialog;
      dialog.customsize = { ...customSizeObj };
    });

    cy.get('@mc-dialog').invoke('attr', 'open', '');

    const checkCustomSizeAndProperties = (viewportWidth: number, expectedSize: string) => {
      cy.viewport(viewportWidth, 600);

      cy.get('@mc-dialog')
        .find('dialog')
        .should(($dialog) => {
          const computedStyle = window.getComputedStyle($dialog[0]);
          const computedSize = parseFloat(computedStyle.width).toFixed(0) + 'px';
          expect(computedSize).to.equal(expectedSize);

          // Check if CSS custom properties are set
          Object.entries(customSizeObj).forEach(([breakpoint, value]) => {
            const propertyValue = computedStyle.getPropertyValue(`--dialog-width-${breakpoint}`);
            expect(propertyValue.trim()).to.equal(value);
          });
        });
    };

    // Test for different breakpoints
    checkCustomSizeAndProperties(640, '640px'); // xs breakpoint
    checkCustomSizeAndProperties(1024, '400px'); // sm breakpoint
    checkCustomSizeAndProperties(1440, '600px'); // md breakpoint
    checkCustomSizeAndProperties(1920, '800px'); // lg breakpoint
    checkCustomSizeAndProperties(2000, '1000px'); // xl breakpoint
  });

  it('applies customsize as strings', () => {
    cy.get('#defaultDialog').invoke('remove');
    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body} customsize="300px">
        <mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>
      </mc-dialog>
    `).as('mc-dialog');
    cy.viewport(1000, 1000);
    cy.get('@mc-dialog').invoke('attr', 'open', '');

    cy.get('@mc-dialog')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(300);
      });
  });

  it('string values override object values for customsize', () => {
    cy.get('#defaultDialog').invoke('remove');
    const customSizeObj = { xs: '100%', sm: '400px', md: '600px', lg: '800px', xl: '1000px' };

    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body} .customsize=${customSizeObj}>
        <mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>
      </mc-dialog>
    `).as('mc-dialog');

    cy.get('@mc-dialog').invoke('attr', 'open', '');

    // First, check that object values are applied
    cy.viewport(1200, 1024); // lg breakpoint
    cy.get('@mc-dialog')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(600);
      });

    // Now, override with string values
    cy.get('@mc-dialog').then(($el) => {
      const dialog = $el.get(0) as McDialog;
      dialog.customsize = '300px';
    });

    // Check that string values are applied and override object values
    cy.get('@mc-dialog')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(300);
      });
  });

  it('focuses the input with autofocus attribute when dialog is opened', () => {
    document.getElementById('defaultDialog')?.remove();
    cy.mount<McDialog>(html`
      <mc-dialog .heading=${heading} .body=${body} id="autofocusDialog">
        <input autofocus />
        <mc-button slot="primaryAction" dialogaction="ok">OK</mc-button>
      </mc-dialog>
    `).as('mc-dialog');
    cy.get('@mc-dialog').invoke('attr', 'open', '');
    cy.get('@mc-dialog').find('input[autofocus]').should('have.focus');
  });

  describe('mc-dialog-specific-tests', () => {
    // So far all the base tests cover the requirements for mc-dialog
    it('mounts', () => {
      cy.get('@mc-dialog');
    });

    it('is fullscreen on below xs breakpoint', () => {
      cy.viewport(320, 480); // Set viewport to below xs breakpoint
      cy.get('@mc-dialog').invoke('attr', 'open', '');
      cy.get('@mc-dialog')
        .find('dialog')
        .should(($dialog) => {
          const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
          expect(width).to.equal(320);
        });
      cy.get('@mc-dialog')
        .find('dialog')
        .should(($dialog) => {
          const height = Math.round(parseFloat(window.getComputedStyle($dialog[0]).height));
          expect(height).to.equal(480);
        });
    });
  });
});
