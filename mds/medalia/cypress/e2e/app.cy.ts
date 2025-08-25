/// <reference types="cypress-visual-regression" />

describe('medalia', () => {
  it('renders form - 0 to 10 rating', () => {
    cy.visit(
      'https://maersk.digital-cloud.medallia.eu/dig-preview/build/index.html?formUuid=15476186-275a-2a3d-f01b-542788967ef9',
    );

    cy.get('#kampyleForm5858')
      .should('be.visible')
      .then(() => {
        cy.wait(1000);
        cy.compareSnapshot('medalia-form-0-10-rating');
      });
  });
  it('renders form - left pop-up', () => {
    cy.visit(
      'https://maersk.digital-cloud.medallia.eu/dig-preview/build/index.html?formUuid=ab6ec518-f166-249c-b611-157e99c76942',
    );
    cy.get('#kampyleForm25858')
      .should('be.visible')
      .then(() => {
        cy.wait(2000);
        cy.compareSnapshot('medalia-form-left-pop-up');
      });
  });
  it('renders form - left inline', () => {
    cy.visit(
      'https://maersk.digital-cloud.medallia.eu/dig-preview/build/index.html?formUuid=9deb6f90-f1e6-6880-7bcb-4aeea0d3a672',
    );
    cy.get('#embeddedIframe25853')
      .should('be.visible')
      .then(() => {
        cy.wait(1000);
        cy.compareSnapshot('medalia-form-left-inline');
      });
  });
});
