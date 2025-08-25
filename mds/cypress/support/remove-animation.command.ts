Cypress.Commands.add('removeButtonAnimation', () => {
  cy.get('mc-button')
    .find('mc-loading-indicator')
    .find('.container')
    .then((element) => element.addClass('no-animation'));
  cy.get('mc-button')
    .find('mc-loading-indicator')
    .find('.mc-loading-indicator__loader')
    .then((element) => element.addClass('no-animation'));
});
