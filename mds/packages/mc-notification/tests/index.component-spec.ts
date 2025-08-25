import { McNotification } from '../src';
import '../src';

const heading = 'Notification';

context('mc-notification', () => {
  beforeEach(() => {
    cy.mount<McNotification>(`<mc-notification heading="${heading}"></mc-notification>`).as('mc-notification');
  });

  it('mounts', () => {
    cy.get('@mc-notification').contains(heading);
  });

  describe('closable prop', () => {
    it('should not have "closable" attribute by default', () => {
      cy.get('mc-notification').should('exist');
      cy.log('Default: mc-notification should not have closable attribute');
      cy.get('mc-notification').should('not.have.attr', 'closable');
    });

    it('should show close icon when closable is true', () => {
      cy.log('Setting closable attribute to true');
      cy.get('mc-notification').invoke('attr', 'closable', true);
      cy.get('mc-notification').should('have.attr', 'closable');

      cy.get('mc-notification').get('[data-cy="close-button"]').as('mc-notification-close-button');
      cy.get('@mc-notification-close-button').should('have.attr', 'label', 'Close');
      cy.get('@mc-notification-close-button').should('have.attr', 'icon', 'times');
    });

    it('should dispatch "close" method and remove notification when clicked on close icon', () => {
      const handleClose = cy.stub().as('handleClose');

      cy.log('Setting closable attribute to true');
      cy.get('mc-notification').invoke('attr', 'closable', true);

      cy.get('mc-notification').then(($el) => {
        const mcNotification = $el.get(0);
        mcNotification.addEventListener('close', () => handleClose());
      });

      cy.get('mc-notification').get('[data-cy="close-button"]').as('mc-notification-close-button');
      cy.log('Click on the close icon');
      cy.get('@mc-notification-close-button').click();

      cy.get('@handleClose').its('callCount').should('eq', 1);
      cy.get('mc-notification').should('not.exist');
    });
  });
});
