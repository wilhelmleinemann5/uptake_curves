import { html } from 'lit';
import '../src';
import { McListItem } from '../src';

describe('mc-list-item', () => {
  describe('disabled', () => {
    it('sets disabled on button when list item disabled', () => {
      cy.mount<McListItem>(html`<mc-list-item disabled label="One"></mc-list-item>`).as('mc-list-item');
      cy.get('@mc-list-item').find('button').should('have.attr', 'disabled');
    });
    it('does not set disabled on button when list item not disabled', () => {
      cy.mount<McListItem>(html`<mc-list-item label="One"></mc-list-item>`).as('mc-list-item');
      cy.get('@mc-list-item').find('button').should('not.have.attr', 'disabled');
    });
  });
  describe('target', () => {
    it('sets target on button when list item has target prop', () => {
      cy.mount<McListItem>(html`<mc-list-item href="https://maersk.com" target="_blank" label="One"></mc-list-item>`).as('mc-list-item');
      cy.get('@mc-list-item').find('a').should('have.attr', 'target');
    });
    it('does not set target on button when list item does not have target prop', () => {
      cy.mount<McListItem>(html`<mc-list-item href="https://maersk.com" label="One"></mc-list-item>`).as('mc-list-item');
      cy.get('@mc-list-item').find('a').should('not.have.attr', 'target');
    });
  });
  describe('checkbox', () => {
    it('renders checkbox', () => {
      cy.mount<McListItem>(html`<mc-list-item type="checkbox" value="One" label="One"></mc-list-item>`).as(
        'mc-list-item',
      );
      cy.get('@mc-list-item').find('mc-checkbox').should('exist');
    });
    it('can check and uncheck using keyboard navigation', () => {
      cy.mount<McListItem>(
        html`<button>Focus</button><mc-list-item role="option" type="checkbox" value="One" label="One"></mc-list-item>`,
      );
      cy.get('mc-list-item').as('mc-list-item');
      cy.get('button').focus();
      cy.realPress('Tab');
      cy.get('@mc-list-item').should('have.focus');
      cy.realPress('Space');
      cy.get('@mc-list-item').find('mc-checkbox').should('have.attr', 'checked');
      cy.get('@mc-list-item').find('input[data-cy="checkbox"]').should('have.checked');
      cy.realPress('Space');
      cy.get('@mc-list-item').find('mc-checkbox').should('not.have.attr', 'checked');
      cy.get('@mc-list-item').find('input[data-cy="checkbox"]').should('not.have.checked');
    });
    it('can check and uncheck using mouse', () => {
      cy.mount<McListItem>(
        html`<mc-list-item role="option" type="checkbox" value="One" label="One"></mc-list-item>`,
      ).as('mc-list-item');
      cy.get('@mc-list-item').click();
      cy.get('@mc-list-item').find('mc-checkbox').should('have.attr', 'checked');
      cy.get('@mc-list-item').find('input[data-cy="checkbox"]').should('have.checked');
      cy.get('@mc-list-item').click();
      cy.get('@mc-list-item').find('mc-checkbox').should('not.have.attr', 'checked');
      cy.get('@mc-list-item').find('input[data-cy="checkbox"]').should('not.have.checked');
    });
  });
  describe('router links', () => {
    it('renders router link', () => {
      cy.mount<McListItem>(html`<mc-list-item><a href="#one">One</a></mc-list-item>`).as('mc-list-item');
      cy.get('@mc-list-item').find('a').should('exist');
    });
    it('navigates to router link when clicked', () => {
      cy.mount<McListItem>(html`<mc-list-item><a href="#one">One</a></mc-list-item>`).as('mc-list-item');
      cy.get('@mc-list-item').find('a').click();
      cy.url().should('contain', '#one');
    });
  });
});
