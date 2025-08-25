import { html } from 'lit';
import { McToast } from '../src';
import '../src';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-notification';
import '@maersk-global/mds-components-core-card';
import { IMcToast } from '../src/lib/types';

context('mc-toast', () => {
  describe('basic interaction and pros setting', () => {
    it('mounts', () => {
      cy.mount<McToast>(html`<mc-toast></mc-toast>`).as('mc-toast');
      cy.get('@mc-toast');
    });
    it('opens with trigger click', () => {
      cy.mount<McToast>(
        html`<mc-toast duration="500">
          <mc-button label="Toast" slot="trigger"></mc-button>
          <mc-notification appearance="info" body="Basic interaction and pros setting 1"></mc-notification>
        </mc-toast>`,
      ).as('mc-toast');
      cy.get('@mc-toast').find('mc-button').find('button').click();

      cy.wait(300);
      cy.get('.mc-toast-container').should('be.visible');
      cy.get('.mc-toast-container').find('mc-notification').should('be.visible');
      cy.get('.mc-toast-container').find('mc-notification').find('mc-button').click();
    });
    it('sets duration to 0.5 s. and closes automatically after duration has passed', () => {
      cy.mount<McToast>(
        html`<mc-toast duration="100">
          <mc-button label="Toast" slot="trigger"></mc-button>
          <mc-notification appearance="info" body="Basic interaction and pros setting 2"></mc-notification>
        </mc-toast>`,
      ).as('mc-toast');
      cy.get('@mc-toast').find('mc-button').click();

      cy.wait(200);
      expect(Cypress.$('.mc-toast-container')).not.to.exist;
    });
    it('pauses toast on hover', () => {
      cy.mount<McToast>(
        html`<mc-toast duration="500">
          <mc-button label="Toast" slot="trigger"></mc-button>
          <mc-notification appearance="info" body="Basic interaction and pros setting 3"></mc-notification>
        </mc-toast>`,
      ).as('mc-toast');
      cy.get('@mc-toast').find('mc-button').find('button').click();

      cy.wait(300);
      cy.get('.mc-toast-container').find('mc-notification').realHover('mouse');

      cy.wait(1000);
      cy.get('.mc-toast-container').should('be.visible');
      cy.get('.mc-toast-container').find('mc-notification').should('be.visible');
      cy.get('mc-button').eq(1).find('button').focus();
      cy.get('.mc-toast-container').find('mc-notification').find('mc-button').click();
    });
  });
  describe('opens and closes programmatically', () => {
    beforeEach(() => {
      cy.mount<McToast>(
        html`<mc-toast duration="5000">
          <mc-notification appearance="success" body="Opens and closes programmatically"></mc-notification>
        </mc-toast>`,
      ).as('mc-toast');
    });
    it('on page load using open prop', () => {
      cy.get('@mc-toast').invoke('prop', 'open', true);
      cy.get('.mc-toast-container').should('be.visible');
      cy.get('.mc-toast-container').find('mc-notification').should('be.visible');
      cy.get('@mc-toast').invoke('prop', 'open', false);
      expect(Cypress.$('.mc-toast-container')).not.to.exist;
    });
    it('on page load using show method', () => {
      cy.get('@mc-toast').then(($toast) => {
        ($toast[0] as IMcToast)?.show();
      });
      cy.document().then((doc) => {
        expect(doc.querySelector('.mc-toast-container')).to.exist;
      });
      cy.get('.mc-toast-container', { includeShadowDom: true }).should('be.visible');
      cy.get('.mc-toast-container').find('mc-notification').should('be.visible');
      cy.get('@mc-toast').then(($toast) => {
        ($toast[0] as IMcToast)?.hide();
      });
      cy.document().then((doc) => {
        expect(doc.querySelector('.mc-toast-container')).not.to.exist;
      });
    });
  });
  describe('can be closed with close button in closable components', () => {
    it('notification', () => {
      cy.mount<McToast>(
        html`<mc-toast duration="5000" position="top-center">
          <mc-button label="Toast" slot="trigger"></mc-button>
          <mc-notification
            appearance="warning"
            body="Can be closed with close button in closable component"
          ></mc-notification>
        </mc-toast>`,
      ).as('mc-toast');

      cy.get('@mc-toast').find('mc-button').click();
      cy.get('.mc-toast-container').find('mc-notification').find('mc-button').click();
      expect(Cypress.$('.mc-toast-container')).not.to.exist;
    });
  });
  it('can pass attached events inside body slot', () => {
    const eventHandlerSpy = cy.spy().as('onEventSpy');
    cy.mount<McToast>(
      html`<mc-toast position="top-left" duration="5000">
          <mc-button data-cy="trigger" label="Toast" slot="trigger"></mc-button></mc-button>
          <mc-notification appearance="error">Tost <mc-button data-cy="undo" @click="${(e): void =>
            eventHandlerSpy(e)}">Undo</mc-button></mc-notification>
        </mc-toast>`,
    ).as('mc-toast');
    cy.get('@mc-toast').find('mc-button[data-cy="trigger"]').click();
    cy.get('.mc-toast-container').find('mc-notification').find('mc-button[data-cy="undo"]').click();
    cy.get('@onEventSpy').its('callCount').should('eq', 1);
  });
});
