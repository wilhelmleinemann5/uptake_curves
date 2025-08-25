import { html } from 'lit';
import { McIcon } from '../src';
import '../src';

const icon = 'star';

describe('mc-icon', () => {
  beforeEach(() => {
    cy.mount<McIcon>(html`<mc-icon icon="${icon}"></mc-icon>`).as('mc-icon');
  });
  it('mounts', () => {
    cy.get('@mc-icon');
  });
  it('ensures icons are loaded as the correct size', () => {
    // For each icon, test that the loaded SVG internals match what is requested on the outer element
    cy.get('@mc-icon').each(($el) => {
      cy.wrap($el)
        .find('svg')
        .invoke('attr', 'width')
        .should('eq', $el.attr('size') || '20');
    });
  });
});
