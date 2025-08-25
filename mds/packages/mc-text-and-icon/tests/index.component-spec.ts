import { html } from 'lit';
import { McTextAndIcon } from '../src';
import '../src';

context('mc-text-and-icon', () => {
  /**
   * Here, you should test your component's event handlers, data calls, and logic for user interaction.
   * Find out more about writing component tests on Lit Elements: {@link https://github.com/simonireilly/cypress-lit/blob/HEAD/cypress/component/lit.cy.ts here}.
   */
  it('mounts', () => {
    cy.mount<McTextAndIcon>(html`<mc-text-and-icon><span class="slotted">Tag</span></mc-text-and-icon>`).as(
      'mc-text-and-icon'
    );
    cy.get('@mc-text-and-icon').get('.slotted').contains('Tag');
  });
});
