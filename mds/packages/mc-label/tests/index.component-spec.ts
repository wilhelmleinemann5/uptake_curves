import { html } from 'lit';
import '../src';
import { McCComponent } from '../src';

context('mc-label', () => {
  it('mounts', () => {
    cy.mount<McCComponent>(html`<mc-label></mc-label>`).as('mc-label');
    cy.get('@mc-label');
  });
});
