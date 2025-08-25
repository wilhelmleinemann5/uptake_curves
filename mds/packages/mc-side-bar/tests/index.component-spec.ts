import { html } from 'lit';
import '../src';
import { McSideBar } from '../src';
import '@maersk-global/mds-components-core-icon';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-drawer';
import '@maersk-global/mds-foundations/scss/_layout.scss';

context('mc-side-bar', () => {
  it('mounts', () => {
    cy.mount<McSideBar>(html`<mc-side-bar></mc-side-bar>`).as('mc-side-bar');
    cy.get('@mc-side-bar');
  });
  describe('desktop', () => {
    beforeEach(() => {
      cy.viewport(1200, 800);
      cy.window().then((win) => {
        win.localStorage.clear();
      });
      cy.document().then((doc) => {
        const style = doc.createElement('style');
        style.innerHTML = `
          body {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
          }
        `;
        doc.head.appendChild(style);
      });
      cy.mount<McSideBar>(
        html`<div class="mds-layout">
          <mc-side-bar
            ><nav role="navigation" aria-label="side navigation">
              <ol>
                <li>
                  <a href="#">Apple</a>
                </li>
                <li>
                  <a href="#">Orange</a>
                </li>
                <li>
                  <a href="#">Lemon</a>
                </li>
              </ol>
            </nav></mc-side-bar
          >
        </div>`,
      ).as('mc-side-bar');
    });

    it('shows full side bar on initial load', () => {
      cy.get('@mc-side-bar').find('.mc-side-bar').invoke('width').should('be.greaterThan', 200);
      cy.get('@mc-side-bar').find('.mc-side-bar').should('have.css', 'display', 'flex');
    });

    it('toggles sidebar on mc-button click', () => {
      // Initially open
      cy.get('@mc-side-bar').find('.mc-side-bar').should('have.class', 'open');

      // Collapse
      cy.get('@mc-side-bar').find('mc-button').click();
      cy.get('@mc-side-bar').find('.mc-side-bar').should('not.have.class', 'open');

      // Expand
      cy.get('@mc-side-bar').find('mc-button').click();
      cy.get('@mc-side-bar').find('.mc-side-bar').should('have.class', 'open');
    });

    it('allows interaction when not collapsed, prevents interaction when collapsed', () => {
      // Check initial visibility and interaction
      cy.get('@mc-side-bar').find('mc-button').should('be.visible');
      cy.get('@mc-side-bar').find('.mc-side-bar').should('not.have.attr', 'inert', '');
      cy.get('@mc-side-bar').find('.mc-side-bar').should('not.have.attr', 'aria-hidden', 'true');

      // Collapse sidebar
      cy.get('@mc-side-bar').find('mc-button').click();

      // Check visibility and interaction
      cy.get('@mc-side-bar').find('mc-button').should('be.visible');
      cy.get('@mc-side-bar').find('.mc-side-bar').should('have.attr', 'inert', '');
      cy.get('@mc-side-bar').find('.mc-side-bar').should('have.attr', 'aria-hidden', 'true');
      cy.get('@mc-side-bar').find('a').first().should('not.be.focused');
    });

    it('persists sidebar state in local storage', () => {
      const category = 'mds-sidebar';
      const key = 'open';
      // Check initial state
      cy.window().then((win) => {
        const initialValue = win.localStorage.getItem(`[${category}]${key}`);
        expect(initialValue).to.equal(null); // Should be null as local storage has not been set by default
      });

      // Collapse sidebar
      cy.get('@mc-side-bar').find('mc-button').click();

      // Check local storage after collapse
      cy.window().then((win) => {
        const storedValue = win.localStorage.getItem(`[${category}]${key}`);
        expect(storedValue).to.equal('false');
      });

      // Expand sidebar
      cy.get('@mc-side-bar').find('mc-button').click();

      // Check local storage after expand
      cy.window().then((win) => {
        const storedValue = win.localStorage.getItem(`[${category}]${key}`);
        expect(storedValue).to.equal('true');
      });
    });
  });
  describe('mobile', () => {
    beforeEach(() => {
      cy.viewport(850, 800);
      cy.mount<McSideBar>(
        html`<div class="mds-layout"></div><mc-side-bar
          ><nav role="navigation" aria-label="side navigation">
            <ol>
              <li>
                <a href="#">Apple</a>
              </li>
              <li>
                <a href="#">Orange</a>
              </li>
              <li>
                <a href="#">Lemon</a>
              </li>
            </ol>
          </nav></mc-side-bar
        ></div>`,
      ).as('mc-side-bar');
    });

    it('shows burger menu on mobile and tablet, triggers, drawer', () => {
      cy.get('@mc-side-bar').find('.mc-side-bar').invoke('width').should('eq', 0);
      cy.get('@mc-side-bar').find('mc-button').should('have.attr', 'label', 'Show Navigation');
      cy.get('@mc-side-bar').find('mc-drawer').should('have.attr', 'position', 'left');
    });

    it('toggles drawer visibility on button clicks', () => {
      // Check initial state
      cy.get('mc-drawer').should('exist');

      // Open drawer with mc-button click
      cy.get('@mc-side-bar').find('mc-button[data-cy="toggle-nav"]').click();
      cy.get('mc-drawer').should('have.attr', 'open');

      // Close drawer with drawer's close button
      cy.get('mc-drawer').find('mc-button[data-cy="close"]').click();
      cy.get('mc-drawer').should('not.have.attr', 'open');
    });
  });
});
