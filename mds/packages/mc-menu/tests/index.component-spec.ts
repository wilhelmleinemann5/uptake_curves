import { html } from 'lit';
import { McMenu } from '../src';
import '@maersk-global/mds-components-core-list';
import '../src';

describe('mc-menu', () => {
  describe('role', () => {
    beforeEach(() => {
      cy.mount<McMenu>(
        html` <button id="focus">Focus</button>
          <br />
          <mc-menu>
            <mc-button
              slot="trigger"
              icon="bars-horizontal"
              hiddenlabel
              label="menu"
              variant="outlined"
              appearance="neutral"
            >
            </mc-button>
            <mc-list>
              <mc-list-item label="One"></mc-list-item>
              <mc-list-item label="Two"></mc-list-item>
              <mc-list-item label="Three"></mc-list-item>
              <mc-list-item label="Four"></mc-list-item>
              <mc-list-item label="Five"></mc-list-item>
            </mc-list>
          </mc-menu>`,
      );
      cy.get('mc-menu').as('mc-menu');
      cy.get('@mc-menu').find('mc-list-item').as('items');
      cy.get('#focus').as('focus');
    });
    it("sets all list items' aria role to 'menuitem' by default", () => {
      cy.get('@mc-menu').find('mc-list-item').find('button').should('have.attr', 'role', 'menuitem');
    });

    it('keyboard navigation - opens dropdown (SPACE), navigates through items, closes dropdown (TAB)', () => {
      // opens dropdown using SPACE, closes using TAB
      cy.get('@focus').focus();
      cy.realPress('Tab');
      cy.realPress('Space');
      cy.realPress('Tab');
      // navigates in menu
      cy.get('@items').eq(0).should('have.focus');
      cy.get('@items').eq(0).should('be.visible');
      cy.realPress('ArrowDown');
      cy.get('@items').eq(1).should('have.focus');
      cy.get('@items').eq(1).should('be.visible');
      cy.realPress('ArrowDown');
      cy.get('@items').eq(2).should('have.focus');
      cy.get('@items').eq(2).should('be.visible');
      // closes menu
      cy.realPress('Tab');
      cy.get('@items').eq(2).should('not.have.focus');
      cy.get('@items').eq(2).should('not.be.visible');
    });
    it('keyboard navigation - opens dropdown (ENTER), navigates through items, closes dropdown (ESC)', () => {
      cy.get('@focus').focus();
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.realPress('Tab');
      // navigates in menu
      cy.get('@items').eq(0).should('have.focus');
      cy.get('@items').eq(0).should('be.visible');
      // closes menu
      cy.realPress('Escape');
      cy.get('@items').eq(2).should('not.have.focus');
      cy.get('@items').eq(2).should('not.be.visible');
    });
    it('mouse navigation - opens dropdown on click, navigates through items, closes dropdown', () => {
      const hoverColor = 'rgb(240, 240, 240)';
      cy.get('@mc-menu').find('mc-button').eq(0).click();
      cy.get('@items').eq(0).should('be.visible');
      cy.get('@items').eq(0).realHover('mouse');
      cy.get('@items').eq(0).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@items').eq(1).realHover('mouse');
      cy.get('@items').eq(1).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@items').eq(1).should('be.visible');
      cy.get('@items').eq(2).realHover('mouse');
      cy.get('@items').eq(2).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@items').eq(2).should('be.visible');
      // closes menu
      cy.get('#focus').click();
      cy.get('@items').eq(2).should('not.have.focus');
      cy.get('@items').eq(2).should('not.be.visible');
    });
    it('closes popover on item select', () => {
      cy.get('@mc-menu').find('mc-button').eq(0).click();
      cy.get('@items').eq(0).click();
      cy.get('@items').eq(0).should('not.be.visible');
    });
  });
});
