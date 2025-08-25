import { html } from 'lit';
import { McLoadingIndicator } from '../src';
import '../src';

const label = 'Loading';

describe('mc-loading-indicator', () => {
  it('mounts', () => {
    cy.mount<McLoadingIndicator>(html`<mc-loading-indicator label="${label}"></mc-loading-indicator>`).as(
      'mc-loading-indicator'
    );
    cy.get('@mc-loading-indicator').contains(label);
  });
});
