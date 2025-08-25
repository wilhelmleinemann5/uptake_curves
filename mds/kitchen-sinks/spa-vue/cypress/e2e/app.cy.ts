describe('spa-vue', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('renders dialog', () => {
    cy.get('#open-dialog')
      .click()
      .then(() => {
        cy.get('mc-dialog').should('be.visible');
      });
    cy.get('mc-dialog').find('[dialogaction=cancel]').click();
  });
  it('renders drawer', () => {
    cy.get('#open-drawer')
      .click()
      .then(() => {
        cy.get('mc-drawer').should('be.visible');
      });
    cy.get('mc-drawer').find('[dialogaction=ok]').click();
  });
  it('renders modal', () => {
    cy.get('#open-modal').click();
    cy.get('mc-modal').should('be.visible');
    cy.get('mc-modal').within(() => {
      cy.get('mc-button.close').click();
    });
  });
  it('renders other components', () => {
    cy.get('mc-top-bar').find('.product').should('contain.text', 'SPA Vue');
    cy.get('mc-side-bar').should('contain.text', 'Form');
    cy.get('mc-date-range').as('mc-date-range');
    cy.get('@mc-date-range').find('[data-cy="from-input"]').find('[data-cy="input"]').click();
    cy.get('@mc-date-range').find('mc-calendar').find('mc-button').eq(5).click({ force: true });
    cy.get('@mc-date-range').find('[data-cy="to-input"]').find('[data-cy="input"]').click();
    cy.get('@mc-date-range').find('mc-calendar').find('mc-button').eq(5).click({ force: true });
    cy.get('mc-icon').eq(0).find('svg').should('exist');
    cy.get('mc-loading-indicator').find('.label').should('contain.text', 'Loading');
    cy.get('mc-text-and-icon').should('contain.text', 'Test');
    cy.get('mc-button').find('.label').should('contain.text', 'Test');
    cy.get('mc-label').should('contain.text', 'Test');
    cy.get('mc-hint').find('.mc-hint').should('contain.text', 'Test');
    cy.get('mc-error').find('.mc-error').should('contain.text', 'Test');
    cy.get('mc-card').find('.heading').should('contain.text', 'Test');
    cy.get('mc-file-upload').find('mc-button').find('.mc-text-and-icon').should('contain.text', 'Choose a file');
    cy.get('mc-tag').should('contain.text', 'Test');
    cy.get('mc-avatar').find('#avatar-info').should('contain.text', 'info');
    cy.get('mc-tooltip').find('span').should('contain.text', 'The HTML content of the tooltip');
    cy.get('mc-checkbox').find('.mc-label').should('contain.text', 'Test');
    cy.get('mc-radio').find('.mc-label').should('contain.text', 'Test');
    cy.get('mc-switch').find('.mc-label').should('contain.text', 'Test');
    cy.get('mc-input').find('.mc-label').should('contain.text', 'Test');
    cy.get('mc-input-time').find('.mc-label').should('contain.text', 'Test');
    cy.get('mc-checkbox-group').find('legend').find('.mc-label').should('contain.text', 'Please select options');
    cy.get('mc-radio-group').find('legend').find('.mc-label').should('contain.text', 'Please select options');
    cy.get('mc-switch-group').find('legend').find('.mc-label').should('contain.text', 'Please select options');
    cy.get('mc-select-native').find('select').should('contain.text', 'Zero');
    cy.get('mc-list-item').find('.label').should('contain.text', 'Test');
    cy.get('mc-notification').find('.heading').should('contain.text', 'Heading');
    cy.get('mc-notification').find('.body').should('contain.text', 'Body text');
    cy.get('mc-toast').find('.mc-toast').children().should('have.length', 2);
    cy.get('mc-pagination').find('ul').children().should('have.length', 7);
    cy.get('mc-tab-bar').find('div[slot=panel]').eq(0).should('have.attr', 'selected');
    cy.get('mc-tab').eq(0).find('mc-button').should('contain.text', 'Info');
    cy.get('mc-option').find('.label').should('contain.text', 'Test');
    cy.get('mc-list').find('.mc-list-item').should('contain.text', 'One');
    cy.get('[data-cy="mc-picker-item"]').find('mc-button').find('button').should('contain.text', 'Test');
    cy.get('mc-number-stepper').find('.mc-label').should('contain.text', 'Test');
    cy.get('mc-textarea').find('.mc-label').should('contain.text', 'Test');
    cy.get('mc-popover').should('contain.text', 'Available capacity');
    cy.get('mc-step-indicator').children().should('have.length', 4);
    cy.get('mc-step-indicator-item').eq(0).find('.label').should('contain.text', 'ETD');
    cy.get('mc-button-group').children().should('have.length', 3);
    cy.get('mc-button-group-item').eq(0).find('.label').eq(0).should('contain.text', 'Apple');
    cy.get('mc-segmented-control').children().should('have.length', 3);
    cy.get('mc-segmented-control-item').eq(0).find('.label').eq(0).should('contain.text', 'Apple');
    cy.get('mc-menu').children().should('have.length', 2);
    cy.get('mc-menu').find('mc-list-item').eq(0).find('.label').eq(0).should('contain.text', 'One');
    cy.get('[data-cy="mc-picker"]')
      .find('mc-picker-item')
      .first()
      .find('mc-button')
      .find('button')
      .should('contain.text', 'Apple');
    cy.get('mc-select').find('mc-option').eq(0).should('contain.text', 'One');
    cy.get('mc-select').find('mc-option').eq(4).should('contain.text', 'Five');
    cy.get('mc-multi-select').find('mc-option').eq(0).should('contain.text', 'One');
    cy.get('mc-multi-select').find('mc-option').eq(4).should('contain.text', 'Five');
    cy.get('mc-typeahead').find('mc-option').eq(0).should('contain.text', 'One');
    cy.get('mc-typeahead').find('mc-option').eq(4).should('contain.text', 'Five');
    cy.get('mc-month-year-picker')
      .find('mc-picker')
      .eq(0)
      .find('mc-picker-item')
      .first()
      .find('mc-button')
      .find('button')
      .should('contain.text', 'January');
    cy.get('[data-cy="mc-time-picker"]')
      .find('mc-picker')
      .eq(0)
      .find('mc-picker-item')
      .first()
      .find('mc-button')
      .find('button')
      .should('contain.text', '00');
    cy.get('mc-calendar').find('[data-cy="month-name"]').eq(0).click();
    cy.get('mc-input-date').find('[data-cy="input"]');
    cy.get('mc-table').find('tbody').find('tr').should('have.length', 2);
    cy.get('mc-link-button').should('contain.text', 'Test');
    cy.get('mc-theme-switch').should('have.prop', 'theme', 'auto');
    cy.get('mc-progress-indicator').find('.label').should('contain.text', 'progress indicator');
    cy.get('mc-badge').find('.mc-badge').should('contain.text', 'Test');
    cy.get('mc-typeahead-multi-select').find('mc-option').eq(0).should('contain.text', 'One');
    cy.get('mc-typeahead-multi-select').find('mc-option').eq(4).should('contain.text', 'Five');
    cy.get('mc-input-group').find('[data-cy="mc-input-group-container"]');
//%%INTEGRATION_TEST%%
  });
});
