context('tree-nav', () => {
  describe('accessibility', () => {
    it(`should pass accessibility for theme: light`, () => {
      cy.visit(`/iframe.html?id=css-sass-foundations-components-tree-nav--maersk-light&viewMode=story`);
      cy.get('#story-content', { timeout: 20000 }).should('be.visible');
      cy.injectAxeCustom();
      cy.checkA11yCustom({
        include: ['#storybook-root'],
      });
    });
  });
});
context('tree-nav', () => {
  describe('accessibility', () => {
    it(`should pass accessibility for theme: dark`, () => {
      cy.visit(`/iframe.html?id=css-sass-foundations-components-tree-nav--maersk-dark&viewMode=story`);
      cy.get('#story-content', { timeout: 20000 }).should('be.visible');
      cy.injectAxeCustom();
      cy.checkA11yCustom({
        include: ['#storybook-root'],
      });
    });
  });
});
