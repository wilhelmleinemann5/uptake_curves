import { html } from 'lit';
import '../src';
import { McProgressIndicator } from '../src';

context('mc-progress-indicator', () => {
  it('mounts', () => {
    cy.mount<McProgressIndicator>(html`<mc-progress-indicator label="test"></mc-progress-indicator>`).as(
      'mc-progress-indicator',
    );
    cy.get('@mc-progress-indicator');
  });
});
