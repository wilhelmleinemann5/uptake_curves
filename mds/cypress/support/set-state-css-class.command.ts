Cypress.Commands.add('setStateCssClass', (selector: string, classes = ['focus', 'hover', 'active']) => {
  if (classes.indexOf('focus') > -1) {
    cy.get('.focus')
      .find(selector)
      .then((element) => element.addClass('focus'));
  }
  if (classes.indexOf('hover') > -1) {
    cy.get('.hover')
      .find(selector)
      .then((element) => element.addClass('hover'));
  }
  if (classes.indexOf('active') > -1) {
    cy.get('.active')
      .find(selector)
      .then((element) => element.addClass('active'));
  }
});
