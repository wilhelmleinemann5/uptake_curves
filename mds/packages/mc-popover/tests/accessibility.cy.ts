context('mc-popover', () => {
  describe('accessibility', () => {
    it(`should pass accessibility for theme: light`, () => {
      cy.visit(`/iframe.html?id=mc-popover-accessibility--maersk-light&viewMode=story`);
      cy.get('#story-content', { timeout: 20000 }).should('be.visible');
      cy.injectAxeCustom();
      cy.checkA11yCustom({
        include: ['#storybook-root'],
      });
    });
  });
  describe('accessibility', () => {
    it(`should pass accessibility for theme: dark`, () => {
      cy.visit(`/iframe.html?id=mc-popover-accessibility--maersk-dark&viewMode=story`);
      cy.get('#story-content', { timeout: 20000 }).should('be.visible');
      cy.injectAxeCustom();
      cy.checkA11yCustom({
        include: ['#storybook-root'],
      });
    });
  });
});
