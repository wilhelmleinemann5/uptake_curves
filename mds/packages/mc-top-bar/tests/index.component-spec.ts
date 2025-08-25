import { html } from 'lit';
import '../src';
import { McTopBar } from '../src';

context('mc-top-bar', () => {
  beforeEach(() => {
    cy.viewport(1200, 800);
  });
  it('mounts', () => {
    cy.mount<McTopBar>(html`<mc-top-bar></mc-top-bar>`).as('mc-top-bar');
    cy.get('@mc-top-bar');
  });
  it('shows full maersk logo', () => {
    cy.mount<McTopBar>(html`<mc-top-bar></mc-top-bar>`).as('mc-top-bar');
    cy.get('@mc-top-bar').find('.logo').invoke('width').should('be.greaterThan', 120);
  });
  it('shows short maersk logo when product name is present', () => {
    cy.mount<McTopBar>(html`<mc-top-bar product="Maersk Design System"></mc-top-bar>`).as('mc-top-bar');
    cy.get('@mc-top-bar').find('.logo').invoke('width').should('be.lessThan', 30);
  });
  it('shows product name in different view ports', () => {
    // lg + (1441 - ...)
    cy.mount<McTopBar>(html`<mc-top-bar product="Maersk Design System"></mc-top-bar>`).as('mc-top-bar');
    cy.get('@mc-top-bar').find('.product').should('have.text', 'Maersk Design System');
    cy.get('@mc-top-bar').find('.product').should('have.css', 'display', 'flex');
    cy.get('@mc-top-bar').find('.product-mobile').should('have.css', 'display', 'none');
    // md (1025 - 1440)
    cy.viewport(1100, 800);
    cy.get('@mc-top-bar').find('.product-mobile').should('have.text', 'Maersk Des...');
    cy.get('@mc-top-bar').find('.product').should('have.css', 'display', 'flex');
    cy.get('@mc-top-bar').find('.product-mobile').should('have.css', 'display', 'none');
    // sm (641 - 1024)
    cy.viewport(650, 800);
    cy.get('@mc-top-bar').find('.product-mobile').should('have.text', 'Maersk Des...');
    cy.get('@mc-top-bar').find('.product').should('have.css', 'display', 'none');
    cy.get('@mc-top-bar').find('.product-mobile').should('have.css', 'display', 'flex');
    // xs (0 - 640)
    cy.viewport(550, 800);
    cy.get('@mc-top-bar').find('.product-mobile').should('have.text', 'Maersk Des...');
    cy.get('@mc-top-bar').find('.product').should('have.css', 'display', 'none');
    cy.get('@mc-top-bar').find('.product-mobile').should('have.css', 'display', 'flex');
  });
  it('shows product name in sm & xs', () => {
    // md (1025 - ...)
    cy.viewport(1100, 800);
    cy.mount<McTopBar>(html`<mc-top-bar product="Maersk Design System" productshort="MDS"></mc-top-bar>`).as(
      'mc-top-bar',
    );
    cy.get('@mc-top-bar').find('.product').should('have.text', 'Maersk Design System');
    cy.get('@mc-top-bar').find('.product').should('have.css', 'display', 'flex');
    cy.get('@mc-top-bar').find('.product-mobile').should('have.css', 'display', 'none');
    // sm (641 - 1024)
    cy.viewport(650, 800);
    cy.get('@mc-top-bar').find('.product-mobile').should('have.text', 'MDS');
    cy.get('@mc-top-bar').find('.product').should('have.css', 'display', 'none');
    cy.get('@mc-top-bar').find('.product-mobile').should('have.css', 'display', 'flex');
    // xs (0 - 640)
    cy.viewport(550, 800);
    cy.get('@mc-top-bar').find('.product-mobile').should('have.text', 'MDS');
    cy.get('@mc-top-bar').find('.product').should('have.css', 'display', 'none');
    cy.get('@mc-top-bar').find('.product-mobile').should('have.css', 'display', 'flex');
  });
});
