import { html } from 'lit';
import '../src';
import { McStepIndicatorItem } from '../src';

context('mc-step-indicator-item', () => {
  it('mounts', () => {
    cy.mount<McStepIndicatorItem>(html`<mc-step-indicator-item label="Test"></mc-step-indicator-item>`).as(
      'mc-step-indicator-item'
    );
    cy.get('@mc-step-indicator-item');
  });
});
