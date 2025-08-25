import { html } from 'lit';
import { McModal } from '../src';
import '../src';
import { IMcModal } from '../src/lib/types';

const heading = 'Modal';

const toggleModal = (): void => {
  const mcModal: IMcModal = document.body.querySelector('mc-modal') as IMcModal;
  mcModal.open = !mcModal.open;
};

context('mc-modal', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.mount<McModal>(
      html`<mc-button id="button-modal-open" @click="${toggleModal}">Open</mc-button
        ><mc-modal heading="${heading}"
          ><mc-button id="button-modal-ok" slot="primaryAction" appearance="primary" dialogaction="ok">OK</mc-button>
          <mc-button
            id="button-modal-cancel"
            slot="secondaryAction"
            appearance="neutral"
            variant="outlined"
            dialogaction="cancel"
            >Cancel</mc-button
          ></mc-modal
        >`,
    );
    cy.get('#button-modal-open').find('button').as('mc-button-open-modal');
  });

  it('mounts', () => {
    cy.get('mc-modal').contains(heading);
  });

  it('opens modal', () => {
    cy.get('mc-modal').should('not.have.attr', 'open');
    cy.get('mc-modal').find('[data-cy="dialog"]').should('not.be.visible');
    cy.get('@mc-button-open-modal').click({ force: true });
    cy.get('mc-modal').should('have.attr', 'open');
    cy.get('mc-modal').find('[data-cy="dialog"]').should('be.visible');
  });

  it('closes modal on button ok click', () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    cy.get('#button-modal-ok').find('button').click({ force: true });
    cy.get('mc-modal').should('not.have.attr', 'open');
    cy.get('mc-modal').find('[data-cy="dialog"]').should('not.be.visible');
  });

  it(`dispatches 'closed' event along with 'ok' in detail, when the button with 'dialogaction="ok"' is clicked`, () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    const closedHandler = cy.stub().as('closedHandler');
    cy.get('mc-modal').then(($el) => {
      const mcModal = $el.get(0);
      mcModal.addEventListener('closed', closedHandler);

      cy.get('#button-modal-ok').realClick();
    });

    cy.get('@closedHandler').its('callCount').should('eq', 1);
    cy.get('@closedHandler').should('have.been.calledWithMatch', {
      detail: { action: 'ok' },
    });
  });

  it(`dispatches 'closing' event along with 'ok' in detail, when the button with 'dialogaction="ok"' is clicked`, () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    const closingHandler = cy.stub().as('closingHandler');
    cy.get('mc-modal').then(($el) => {
      const mcModal = $el.get(0);
      mcModal.addEventListener('closing', closingHandler);

      cy.get('#button-modal-ok').realClick();
    });

    cy.get('@closingHandler').its('callCount').should('eq', 1);
    cy.get('@closingHandler').should('have.been.calledWithMatch', {
      detail: { action: 'ok' },
    });
  });

  it('closes modal on button cancel click', () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    cy.get('#button-modal-cancel').find('button').click({ force: true });
    cy.get('mc-modal').should('not.have.attr', 'open');
    cy.get('mc-modal').find('[data-cy="dialog"]').should('not.be.visible');
  });

  it('closes modal on button close click', () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    cy.get('mc-modal').find('mc-button[data-cy="close"]').click({ force: true });
    cy.get('mc-modal').should('not.have.attr', 'open');
    cy.get('mc-modal').find('[data-cy="dialog"]').should('not.be.visible');
  });

  it(`dispatches 'closed' event along with 'cancel' in detail, when the button with 'dialogaction="cancel"' is clicked`, () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    const closedHandler = cy.stub().as('closedHandler');
    cy.get('mc-modal').then(($el) => {
      const mcModal = $el.get(0);
      mcModal.addEventListener('closed', closedHandler);

      cy.get('#button-modal-cancel').realClick();
    });

    cy.get('@closedHandler').its('callCount').should('eq', 1);
    cy.get('@closedHandler').should('have.been.calledWithMatch', {
      detail: { action: 'cancel' },
    });
  });

  it(`dispatches 'closing' event along with 'cancel' in detail, when the button with 'dialogaction="cancel"' is clicked`, () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    const closingHandler = cy.stub().as('closingHandler');
    cy.get('mc-modal').then(($el) => {
      const mcModal = $el.get(0);
      mcModal.addEventListener('closing', closingHandler);

      cy.get('#button-modal-cancel').realClick();
    });

    cy.get('@closingHandler').its('callCount').should('eq', 1);
    cy.get('@closingHandler').should('have.been.calledWithMatch', {
      detail: { action: 'cancel' },
    });
  });

  it('closes modal on click outside the modal', () => {
    cy.get('@mc-button-open-modal').click({ force: true });
    cy.get('body').click(0, 0);
    cy.get('mc-modal').find('h1').should('not.be.visible');
  });

  it('should not close the modal if backdropcloseactiondisabled attribute is set', () => {
    cy.get('mc-modal').invoke('attr', 'backdropcloseactiondisabled', true);
    cy.get('@mc-button-open-modal').click({ force: true });
    cy.get('mc-modal').find('h1').should('be.visible');
    cy.get('mc-modal').should('have.attr', 'backdropcloseactiondisabled');
    cy.get('body').click(0, 0);
    cy.get('mc-modal').find('h1').should('be.visible');
  });

  describe('focus and interaction', () => {
    it('allows interaction with modal contents when open', () => {
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('#button-modal-ok').should('be.visible').and('be.enabled');
      cy.get('mc-modal').find('#button-modal-cancel').should('be.visible').and('be.enabled');
    });

    it('prevents interaction when closed', () => {
      cy.get('mc-modal').should('have.css', 'pointer-events', 'none');
      cy.get('mc-modal').find('#button-modal-ok').should('not.be.visible');
      cy.get('mc-modal').find('#button-modal-cancel').should('not.be.visible');
    });
  });

  describe('pressing Escape', () => {
    it('should close the modal', () => {
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('h1').should('be.visible');
      cy.get('mc-modal').realPress('Escape');
      cy.get('mc-modal').find('h1').should('not.be.visible');
    });

    it('should not close the modal when the escapecloseactiondisabled attribute is set', () => {
      cy.get('mc-modal').invoke('attr', 'escapecloseactiondisabled', true);
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('h1').should('be.visible');
      cy.get('mc-modal').should('have.attr', 'escapecloseactiondisabled');
      cy.get('mc-modal').realPress('Escape');

      cy.get('mc-modal').find('h1').should('be.visible');
    });
  });

  describe('pressing Enter', () => {
    it('should close the modal when the focus is on the closable elements', () => {
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('h1').should('be.visible');
      //focus the close button
      cy.realPress('Tab');
      cy.realPress('Enter');

      cy.get('mc-modal').find('h1').should('not.be.visible');
    });

    it('should not close the modal when the `entercloseactiondisabled` attribute is set', () => {
      cy.get('mc-modal').invoke('attr', 'entercloseactiondisabled', true);
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('h1').should('be.visible');
      cy.get('mc-modal').should('have.attr', 'entercloseactiondisabled');
      cy.get('mc-modal').then(($el) => $el.append('<input />'));
      cy.get('mc-modal').find('input').focus();
      cy.get('mc-modal').find('input').realPress('Enter');
      cy.get('mc-modal').find('h1').should('be.visible');
    });
  });

  describe('modal sizes', () => {
    it('has medium size as default', () => {
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('[data-cy="dialog"]').should('have.class', 'dimension--medium');
    });
    it('small dimension', () => {
      cy.get('mc-modal').invoke('attr', 'dimension', 'small');
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('[data-cy="dialog"]').should('have.class', 'dimension--small');
    });
    it('large dimension', () => {
      cy.get('mc-modal').invoke('attr', 'dimension', 'large');
      cy.get('@mc-button-open-modal').click({ force: true });
      cy.get('mc-modal').find('[data-cy="dialog"]').should('have.class', 'dimension--large');
    });
  });
});
