import { html } from 'lit';
import '../src';
import { McBadge } from '../src';

describe('mc-badge', () => {
  it('renders with default properties', () => {
    cy.mount<McBadge>(html`<mc-badge></mc-badge>`);
    cy.get('mc-badge')

      .find('.mc-badge')
      .should('have.class', 'error')
      .should('have.class', 'medium')
      .should('have.class', 'default')
      .should('have.class', 'pinned');
  });

  it('renders with custom label', () => {
    cy.mount<McBadge>(html`<mc-badge label="5"></mc-badge>`);
    cy.get('mc-badge').find('.mc-badge').should('contain', '5');
  });

  it('handles max value correctly', () => {
    // Test max value less than default max (99)
    cy.mount<McBadge>(html`<mc-badge label="50" max="20"></mc-badge>`);
    cy.get('mc-badge').find('.mc-badge').should('contain', '20+');

    // Test value greater than default max
    cy.mount<McBadge>(html`<mc-badge label="150"></mc-badge>`);
    cy.get('mc-badge').find('.mc-badge').should('contain', '99+');

    // Test max value greater than default max
    cy.mount<McBadge>(html`<mc-badge label="150" max="200"></mc-badge>`);
    cy.get('mc-badge').find('.mc-badge').should('contain', '99+');
  });

  it('renders dot variant without label', () => {
    cy.mount<McBadge>(html`<mc-badge variant="dot"></mc-badge>`);
    cy.get('mc-badge')
      .find('.mc-badge')
      .should('have.class', 'dot')
      .should('have.class', 'medium')
      .should('have.class', 'error')
      .should('have.class', 'pinned')
      .should('have.class', 'distance_medium')
      .should('have.attr', 'role', 'status')
      .should('have.attr', 'aria-atomic', 'true');
  });
});
