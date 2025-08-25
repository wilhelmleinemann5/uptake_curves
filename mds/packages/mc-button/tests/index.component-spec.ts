import { html } from 'lit';
import { McButton } from '../src';
import '../src';

context('mc-button', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McButton>(`<mc-button label="Button"></mc-button>`).as('mc-button');
      cy.get('@mc-button').find('button').as('mc-button-button');
    });
    it('mounts', () => {
      cy.get('@mc-button');
    });
    it('default props', () => {
      cy.get('@mc-button-button').should('have.attr', 'aria-label', 'Button');
      cy.get('@mc-button-button').find('[data-cy="label"]').contains('Button');
    });

    it('label and aria-label changed', () => {
      cy.get('mc-button').invoke('attr', 'label', 'My button');
      cy.get('@mc-button-button').should('have.attr', 'aria-label', 'My button');
      cy.get('@mc-button-button').find('[data-cy="label"]').contains('My button');
    });

    it("should contain a hidden submit button, if its type is 'submit' in order to be abe to submit a parent form", () => {
      cy.get('mc-button').invoke('attr', 'type', 'submit');
      cy.get('mc-button').get('button[type="submit"]');
    });

    it('should remove hidden submit button when transitioning away from submti type state', () => {
      cy.get('mc-button').invoke('attr', 'type', 'submit');
      cy.get('mc-button').get('button[type="submit"]').should('exist');
      cy.get('mc-button').invoke('attr', 'type', 'button');
      cy.get('mc-button').get('button[type="submit"]').should('not.exist');
    });

    it('should set the aria-label attribute on the inner button using arialabel property if specified on the host element', () => {
      const ariaLabel = 'go to the first page';
      cy.get('mc-button').invoke('attr', 'label', '1');
      cy.get('mc-button').invoke('attr', 'arialabel', ariaLabel);
      cy.get('mc-button').find('button').should('have.attr', 'aria-label', ariaLabel);
    });

    it('should set the aria-current attribute on the inner button using ariacurrent property if specified on the host element', () => {
      const ariaCurrent = 'true';
      cy.get('mc-button').invoke('attr', 'ariacurrent', ariaCurrent);
      cy.get('mc-button').find('button').should('have.attr', 'aria-current', ariaCurrent);
    });

    it("should set the aria-current attribute on the inner button to 'false' if it is not specified on the host element", () => {
      cy.get('mc-button').find('button').should('not.have.attr', 'aria-label', 'false');
    });
  });

  describe('events', () => {
    beforeEach(() => {
      const clickHandlerSpy = cy.spy().as('onClickSpy');
      cy.mount<McButton>(html`<mc-button label="hi" @click="${(): void => clickHandlerSpy()}"></mc-button>`).as(
        'mc-button'
      );
    });

    it('dispatches click', () => {
      cy.get('@mc-button').find('button').click();
      cy.get('@onClickSpy').its('callCount').should('eq', 1);
    });

    it('should dispatch a click event when a click action occurs on the host element', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('@mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', clickHandler);

        cy.get('@mc-button').realClick();
      });
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it(`should not dispatch a click event when disabled`, () => {
      cy.get('mc-button').invoke('attr', 'disabled', '');
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', clickHandler);

        cy.get('mc-button').realClick();
      });

      cy.get('@clickHandler').its('callCount').should('eq', 0);
    });

    it('should dispatch a click event when it is focused and then Enter is pressed', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', clickHandler);
        cy.get('mc-button').find('button').focus();
        cy.get('mc-button').realPress('Enter');
      });

      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a focus event when it is focused', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('focus', focusHandler);
        cy.get('mc-button').find('button').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('blur', blurHander);
        cy.get('mc-button').find('button').as('mc-button-button');
        cy.get('@mc-button-button').focus();
        cy.get('@mc-button-button').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });
  });

  describe('hyperlink as prop', () => {
    beforeEach(() => {
      cy.mount<McButton>(`<mc-button label="Button"></mc-button>`).as('mc-button');
      cy.get('@mc-button').find('button').as('mc-button-button');
    });
    it('should render as hyperlink', () => {
      const href = 'https://www.maersk.com';
      const rel = 'something';
      const target = '_blank';
      cy.get('@mc-button-button').should('exist');
      cy.get('mc-button').invoke('attr', 'href', href);
      cy.get('mc-button').find('a').as('mc-button-a');
      cy.get('@mc-button-button').should('not.exist');
      cy.get('@mc-button-a')
        .should('have.attr', 'href', href)
        .should('not.have.attr', 'rel', 'false')
        .should('not.have.attr', 'target', 'false');
      cy.get('mc-button').invoke('attr', 'rel', rel);
      cy.get('@mc-button-a').should('have.attr', 'rel', rel);
      cy.get('mc-button').invoke('attr', 'target', target);
      cy.get('@mc-button-a').should('have.attr', 'target', target);
    });

    it('should dispatch a click event when a click action occurs on the host element (hyperlink)', () => {
      const eventHandlers = {
        click: (e: Event): void => {
          e.preventDefault();
        },
      };
      cy.spy(eventHandlers, 'click').as('clickHandler');
      cy.get('mc-button').invoke('attr', 'href', '#');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', eventHandlers.click);

        cy.get('mc-button').realClick();
      });

      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it(`should not dispatch a click event when disabled (hyperlink)`, () => {
      const eventHandlers = {
        click: (e: Event): void => {
          e.preventDefault();
        },
      };
      cy.spy(eventHandlers, 'click').as('clickHandler');
      cy.get('mc-button').invoke('attr', 'disabled', '');
      cy.get('mc-button').invoke('attr', 'href', '#');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', eventHandlers.click);

        cy.get('mc-button').realClick();
      });

      cy.get('@clickHandler').its('callCount').should('eq', 0);
    });

    it('should dispatch a click event when it is focused and then Enter is pressed (hyperlink)', () => {
      const eventHandlers = {
        click: (e: Event): void => {
          e.preventDefault();
        },
      };
      cy.spy(eventHandlers, 'click').as('clickHandler');
      cy.get('mc-button').invoke('attr', 'href', '#');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', eventHandlers.click);
        cy.get('mc-button').find('a').focus();
        cy.get('mc-button').realPress('Enter');
      });

      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a focus event when it is focused (hyperlink)', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-button').invoke('attr', 'href', '#');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('focus', focusHandler);
        cy.get('mc-button').find('a').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred (hyperlink)', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('mc-button').invoke('attr', 'href', '#');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('blur', blurHander);
        cy.get('mc-button').find('a').as('mc-button-a');
        cy.get('@mc-button-a').focus();
        cy.get('@mc-button-a').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });
  });
  describe('hyperlink as slot', () => {
    beforeEach(() => {
      cy.mount<McButton>(`<mc-button><a href="#test">Test</a></mc-button>`).as('mc-button');
      cy.get('@mc-button').find('span').as('mc-button-span');
    });
    it('should render as hyperlink', () => {
      cy.get('mc-button').find('a').as('mc-button-a');
      cy.get('@mc-button-span').should('exist');
      cy.get('@mc-button').get('button').should('not.exist');
    });

    it('should dispatch a click event when a click action occurs on the host element (hyperlink)', () => {
      const eventHandlers = {
        click: (e: Event): void => {
          e.preventDefault();
        },
      };
      cy.spy(eventHandlers, 'click').as('clickHandler');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', eventHandlers.click);

        cy.get('mc-button').realClick();
      });

      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it(`should not dispatch a click event when disabled (hyperlink)`, () => {
      const eventHandlers = {
        click: (e: Event): void => {
          e.preventDefault();
        },
      };
      cy.spy(eventHandlers, 'click').as('clickHandler');
      cy.get('mc-button').invoke('attr', 'disabled', '');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', eventHandlers.click);

        cy.get('mc-button').realClick();
      });

      cy.get('@clickHandler').its('callCount').should('eq', 0);
    });

    it('should dispatch a click event when it is focused and then Enter is pressed (hyperlink)', () => {
      const eventHandlers = {
        click: (e: Event): void => {
          e.preventDefault();
        },
      };
      cy.spy(eventHandlers, 'click').as('clickHandler');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('click', eventHandlers.click);
        cy.get('mc-button').find('a').focus();
        cy.get('mc-button').realPress('Enter');
      });

      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a focus event when it is focused (hyperlink)', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('focus', focusHandler);
        cy.get('mc-button').find('a').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred (hyperlink)', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('mc-button').then(($el) => {
        const mcButton = $el.get(0);
        mcButton.addEventListener('blur', blurHander);
        cy.get('mc-button').find('a').as('mc-button-a');
        cy.get('@mc-button-a').focus();
        cy.get('@mc-button-a').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });
  });
});
