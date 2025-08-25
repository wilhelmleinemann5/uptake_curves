import { html } from 'lit';
import '../src';
import { McComponent } from '../src';

context('mc-component', () => {
  it('mounts', () => {
    cy.mount<McComponent>(html`<mc-component></mc-component>`).as('mc-component');
    cy.get('@mc-component');
  });
});
