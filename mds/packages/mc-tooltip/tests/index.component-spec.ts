import { McTooltip } from '../src';
import { html } from 'lit';
import '../src';
import '@maersk-global/mds-components-core-button';

describe('mc-tooltip', () => {
  describe('static content', () => {
    beforeEach(() => {
      cy.mount<McTooltip>(
        html` <button id="focus">Focus</button>
          <mc-tooltip position="top-left">
            <mc-button label="First target element" slot="trigger"></mc-button>
            <span>I was first!</span>
          </mc-tooltip>
          <mc-tooltip position="top-left">
            <mc-button label="Second target element" slot="trigger"></mc-button>
            <div>
              <span>Content focusable using keyboard</span>
              <input type="checkbox" class="content-checkbox" />
              <input type="checkbox" class="content-checkbox" />
            </div>
          </mc-tooltip>`,
      );
      // aliases
      cy.get('mc-tooltip:first').as('first-tooltip');
      cy.get('mc-tooltip:last').as('second-tooltip');
      cy.get('mc-button:first').as('first-target-element');
      cy.get('mc-button:last').as('second-target-element');
    });

    it('focus on the first target element only shows the tooltip on top of that', () => {
      cy.get('@first-target-element').trigger('focusin', { force: true });

      cy.get('@first-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });

    it('focusing on the second target element whilst the tooltip is still open, must show the tooltip on the second target element only', () => {
      cy.get('@first-target-element').trigger('focusin', { force: true });
      cy.get('@first-target-element').trigger('blur', { force: true });

      cy.get('@second-target-element').trigger('focusin', { force: true });

      cy.get('@first-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });

    it('clicking on the document should close the tooltip', () => {
      cy.get('@first-target-element').realClick();
      cy.get('#focus').realClick();

      cy.get('@first-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });

    it('hovering a target element should show its tooltip', () => {
      cy.get('#focus').realClick();
      cy.get('@first-target-element').trigger('mouseover', { force: true });

      cy.get('@first-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });

    it('hovering out of a target element should hide its tooltip', () => {
      cy.get('@first-target-element').trigger('mouseover', { force: true });
      cy.get('@first-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      cy.get('@first-target-element').trigger('mouseout', { force: true });
      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });

    it('moving mouse from target element to tooltip overlay should keep the tooltip open', () => {
      cy.get('@first-target-element').trigger('mouseover', 'topLeft', { force: true });
      cy.get('@first-target-element').trigger('mouseup', 20, -25, { force: true });

      cy.get('@first-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });

    it('touching a target element should show its tooltip', () => {
      cy.get('@first-target-element').click();

      cy.get('@first-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });

    it('touching a target element again should hide its tooltip', () => {
      cy.get('@first-target-element').click({ force: true });
      cy.get('@first-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@first-target-element').click({ force: true });

      cy.wait(150);

      cy.get('@first-tooltip')
        .find('[data-cy="content"]', { timeout: 2000 })
        .should('not.have.css', 'display', 'block');
      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });
  });

  describe('interactive content', () => {
    beforeEach(() => {
      cy.mount<McTooltip>(
        html` <button id="focus">Focus</button>
          <mc-tooltip position="top-left">
            <mc-button label="First target element" slot="trigger"></mc-button>
            <span>I was first!</span>
          </mc-tooltip>
          <mc-tooltip position="top-left">
            <mc-button label="Second target element" slot="trigger"></mc-button>
            <div>
              <span>Content focusable using keyboard</span>
              <input type="checkbox" class="content-checkbox" />
              <input type="checkbox" class="content-checkbox" />
            </div>
          </mc-tooltip>`,
      );
      // aliases
      cy.get('mc-tooltip:first').as('first-tooltip');
      cy.get('mc-tooltip:last').as('second-tooltip');
      cy.get('mc-button:first').as('first-target-element');
      cy.get('mc-button:last').as('second-target-element');
      cy.get('@second-target-element').trigger('focusin', { force: true });
      cy.get('@second-tooltip').find('input.content-checkbox:first').as('first-interactive-checkbox');
      cy.get('@second-tooltip').find('input.content-checkbox:last').as('second-interactive-checkbox');
    });
    it('should stay open if the focus is moved to the content', () => {
      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@first-interactive-checkbox').focus();

      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });

    it('should stay open if the focus is moved between elements in the content', () => {
      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@first-interactive-checkbox').focus();

      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@second-interactive-checkbox').focus();

      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });

    it('should close when Tab is pressed and last content element is currently focused', () => {
      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@second-interactive-checkbox').focus();

      cy.realPress('Tab');

      cy.get('@second-tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });

    it('should focus target when Shift + Tab is pressed and first content element is currently focused', () => {
      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@first-interactive-checkbox').focus();

      cy.realPress(['Shift', 'Tab']);

      cy.get('@second-target-element').should('have.focus');
    });
    it('should stay open when the content is clicked', () => {
      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@first-interactive-checkbox').click({ force: true });

      cy.get('@second-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
  });

  describe('no content', () => {
    beforeEach(() => {
      cy.mount<McTooltip>(
        html` <mc-tooltip>
          <mc-button label="First target element" slot="trigger"></mc-button>
        </mc-tooltip>`,
      ).as('mc-tooltip');
      cy.get('mc-button').as('target-element');
    });
    it('should not show content', () => {
      cy.get('@mc-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'none');
      cy.get('@target-element').trigger('focusin', { force: true });
      cy.get('@mc-tooltip').find('[data-cy="content"]').should('have.css', 'display', 'none');
    });
  });

  describe('show and hide events', () => {
    beforeEach(() => {
      cy.mount<McTooltip>(
        html` <mc-tooltip position="top-left">
            <mc-button label="Target element" slot="trigger"></mc-button>
            <span>Tooltip content</span>
          </mc-tooltip>
          <button id="focus">Focus</button>`,
      );

      cy.get('mc-tooltip').as('tooltip');
      cy.get('mc-button').as('target-element');
    });

    it('should emit show event when tooltip becomes visible on hover', () => {
      const showSpy = cy.spy().as('showSpy');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('show', showSpy);
      });

      cy.get('@target-element').trigger('mouseover', { force: true });
      cy.get('@tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      cy.get('@showSpy').should('have.been.called');
    });

    it('should emit hide event when tooltip becomes hidden on mouseout', () => {
      const hideSpy = cy.spy().as('hideSpy');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('hide', hideSpy);
      });

      // Show tooltip first
      cy.get('@target-element').trigger('mouseover', { force: true });
      cy.get('@tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      // Hide tooltip
      cy.get('@target-element').trigger('mouseout', { force: true });
      cy.get('@tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');

      cy.get('@hideSpy').should('have.been.called');
    });

    it('should emit show event when tooltip becomes visible on focus', () => {
      const showSpy = cy.spy().as('showSpy');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('show', showSpy);
      });

      cy.get('@target-element').trigger('focusin', { force: true });
      cy.get('@tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      cy.get('@showSpy').should('have.been.called');
    });

    it('should emit hide event when tooltip becomes hidden on blur', () => {
      const hideSpy = cy.spy().as('hideSpy');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('hide', hideSpy);
      });

      // Show tooltip first
      cy.get('@target-element').trigger('focusin', { force: true });
      cy.get('@tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      // Hide tooltip
      cy.get('@target-element').trigger('blur', { force: true });
      cy.get('#focus').focus();
      cy.get('@tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');

      cy.get('@hideSpy').should('have.been.called');
    });

    it('should emit show event when tooltip becomes visible on click', () => {
      const showSpy = cy.spy().as('showSpy');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('show', showSpy);
      });

      cy.get('@target-element').realClick();
      cy.get('@tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      cy.get('@showSpy').should('have.been.called');
    });

    it('should emit hide event when tooltip becomes hidden on second click', () => {
      const hideSpy = cy.spy().as('hideSpy');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('hide', hideSpy);
      });

      // Show tooltip first
      cy.get('@target-element').realClick();
      cy.get('@tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      // Hide tooltip
      cy.get('@target-element').realClick();
      cy.get('@tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');

      cy.get('@hideSpy').should('have.been.called');
    });
  });

  describe('delay functionality', () => {
    it('should show tooltip after default delay on hover', () => {
      cy.mount<McTooltip>(
        html` <mc-tooltip position="top-left">
          <mc-button label="Target element" slot="trigger"></mc-button>
          <span>Tooltip content</span>
        </mc-tooltip>`,
      );

      cy.get('mc-tooltip').as('tooltip');
      cy.get('mc-button').as('target-element');
      cy.get('@target-element').trigger('mouseover', { force: true });

      // Should not be visible immediately
      cy.get('@tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');

      // Should be visible after default delay (50ms) - wait for it to appear
      cy.get('@tooltip').find('[data-cy="content"]', { timeout: 200 }).should('have.css', 'display', 'block');
    });

    it('should show tooltip after custom delay when opendelay is set', () => {
      cy.mount<McTooltip>(
        html` <mc-tooltip position="top-left" opendelay="200">
          <mc-button label="Target element" slot="trigger"></mc-button>
          <span>Tooltip content</span>
        </mc-tooltip>`,
      );

      cy.get('mc-tooltip').as('tooltip');
      cy.get('mc-button').as('target-element');
      cy.get('@target-element').trigger('mouseover', { force: true });

      // Should not be visible immediately
      cy.get('@tooltip').find('[data-cy="content"]').should('not.have.css', 'display', 'block');

      // Should still not be visible after a short wait (less than custom delay)
      cy.get('@tooltip').find('[data-cy="content"]', { timeout: 150 }).should('not.have.css', 'display', 'block');

      // Should be visible after custom delay (200ms)
      cy.get('@tooltip').find('[data-cy="content"]', { timeout: 300 }).should('have.css', 'display', 'block');
    });

    it('should emit show event after delay when using opendelay', () => {
      const showSpy = cy.spy().as('showSpy');

      cy.mount<McTooltip>(
        html` <mc-tooltip position="top-left" opendelay="150">
          <mc-button label="Target element" slot="trigger"></mc-button>
          <span>Tooltip content</span>
        </mc-tooltip>`,
      );

      cy.get('mc-tooltip').as('tooltip');
      cy.get('mc-button').as('target-element');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('show', showSpy);
      });
      cy.get('@target-element').trigger('mouseover', { force: true });

      // Event should not be fired immediately
      cy.get('@showSpy').should('not.have.been.called');

      // Event should be fired after delay - wait for the spy to be called
      cy.get('@showSpy', { timeout: 1000 }).should('have.been.called');
    });

    it('should cancel delayed show when mouse leaves before delay completes', () => {
      const showSpy = cy.spy().as('showSpy');

      cy.mount<McTooltip>(
        html` <mc-tooltip position="top-left" opendelay="200">
          <mc-button label="Target element" slot="trigger"></mc-button>
          <span>Tooltip content</span>
        </mc-tooltip>`,
      );

      cy.get('mc-tooltip').as('tooltip');
      cy.get('mc-button').as('target-element');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('show', showSpy);
      }); // Start hover
      cy.get('@target-element').trigger('mouseover', { force: true });

      // Leave before delay completes (after 100ms, but delay is 200ms)
      cy.get('@target-element').trigger('mouseout', { force: true });

      // Tooltip should never have shown - check after a reasonable timeout
      cy.get('@tooltip').find('[data-cy="content"]', { timeout: 1000 }).should('not.have.css', 'display', 'block');
      cy.get('@showSpy').should('not.have.been.called');
    });

    it('should hide tooltip after close delay when mouse leaves', () => {
      cy.mount<McTooltip>(
        html` <mc-tooltip position="top-left" opendelay="50">
          <mc-button label="Target element" slot="trigger"></mc-button>
          <span>Tooltip content</span>
        </mc-tooltip>`,
      );

      cy.get('mc-tooltip').as('tooltip');
      cy.get('mc-button').as('target-element'); // Show tooltip
      cy.get('@target-element').trigger('mouseover', { force: true });
      cy.get('@tooltip').find('[data-cy="content"]', { timeout: 1000 }).should('have.css', 'display', 'block');

      // Start hiding
      cy.get('@target-element').trigger('mouseout', { force: true });

      // Should still be visible for a moment (close delay)
      cy.get('@tooltip').find('[data-cy="content"]').should('have.css', 'display', 'block');

      // Should be hidden after close delay
      cy.get('@tooltip').find('[data-cy="content"]', { timeout: 1000 }).should('not.have.css', 'display', 'block');
    });

    it('should emit hide event after close delay', () => {
      const hideSpy = cy.spy().as('hideSpy');

      cy.mount<McTooltip>(
        html` <mc-tooltip position="top-left" opendelay="50">
          <mc-button label="Target element" slot="trigger"></mc-button>
          <span>Tooltip content</span>
        </mc-tooltip>`,
      );

      cy.get('mc-tooltip').as('tooltip');
      cy.get('mc-button').as('target-element');

      cy.get('@tooltip').then(($tooltip) => {
        $tooltip[0].addEventListener('hide', hideSpy);
      }); // Show tooltip
      cy.get('@target-element').trigger('mouseover', { force: true });
      cy.get('@tooltip').find('[data-cy="content"]', { timeout: 1000 }).should('have.css', 'display', 'block');

      // Start hiding
      cy.get('@target-element').trigger('mouseout', { force: true });

      // Event should not be fired immediately
      cy.get('@hideSpy').should('not.have.been.called');

      // Event should be fired after close delay
      cy.get('@hideSpy', { timeout: 1000 }).should('have.been.called');
    });
  });
});
