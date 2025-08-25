import { html } from 'lit';
import { McStepIndicator } from '../src';
import '../src';

const currentindex = '1';
const labels = ['One', 'Two', 'Three'];

describe('mc-step-indicator', () => {
  it('mounts', () => {
    cy.mount<McStepIndicator>(
      html`<mc-step-indicator currentindex="${currentindex}" .labels="${labels}"></mc-step-indicator>`
    ).as('mc-step-indicator');
  });
});
