import { html } from 'lit';
import '../src';
import '@maersk-global/mds-components-core-input';
import '@maersk-global/mds-components-core-button';
import { McInputGroup } from '../src';

describe('Input Group Component', () => {
  beforeEach(() => {
    cy.mount<McInputGroup>(html`
      <mc-input-group legend="User Registration Form">
        <mc-input label="Username" hiddenlabel placeholder="Enter username"></mc-input>
        <mc-input label="Email" hiddenlabel placeholder="Enter email"></mc-input>
        <mc-button label="Submit"></mc-button>
      </mc-input-group>
    `);
  });

  it('should mount successfully and render correct structure', () => {
    cy.get('mc-input-group').should('exist');
    cy.get('mc-input-group').find('[data-cy="mc-input-group-container"]').should('exist');

    cy.get('mc-input-group').find('mc-input').should('have.length', 2);
    cy.get('mc-input-group').find('mc-button').should('exist');

    cy.get('mc-input-group').find('[data-cy="mc-input-group-container"]').should('not.have.class', 'no-borders');

    cy.get('mc-input-group').find('mc-label').should('contain', 'User Registration Form');
  });

  it('should handle input and button events correctly', () => {
    const buttonClickHandler = cy.stub().as('buttonClick');
    const usernameInputHandler = cy.stub().as('usernameInput');
    const emailInputHandler = cy.stub().as('emailInput');

    cy.get('mc-input-group')
      .find('mc-button')
      .then(($el) => {
        const button = $el.get(0);
        button.addEventListener('click', buttonClickHandler);
      });

    cy.get('mc-input-group')
      .find('mc-input')
      .first()
      .then(($el) => {
        const input = $el.get(0);
        input.addEventListener('input', usernameInputHandler);
      });

    cy.get('mc-input-group')
      .find('mc-input')
      .last()
      .then(($el) => {
        const input = $el.get(0);
        input.addEventListener('input', emailInputHandler);
      });

    cy.get('mc-input-group').find('mc-input').first().find('input[data-cy="input"]').as('usernameField');
    cy.get('@usernameField').type('testuser123');
    cy.get('@usernameInput').should('have.been.called');
    cy.get('@usernameField').should('have.value', 'testuser123');

    cy.get('mc-input-group').find('mc-input').last().find('input[data-cy="input"]').as('emailField');
    cy.get('@emailField').type('test@example.com');
    cy.get('@emailInput').should('have.been.called');
    cy.get('@emailField').should('have.value', 'test@example.com');

    cy.get('mc-input-group').find('mc-button').click();
    cy.get('@buttonClick').should('have.been.called');

    cy.get('@usernameField').should('have.value', 'testuser123');
    cy.get('@emailField').should('have.value', 'test@example.com');
  });
});
