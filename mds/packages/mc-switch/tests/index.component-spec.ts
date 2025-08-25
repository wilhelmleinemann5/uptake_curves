import { McSwitch } from '../src';
import '../src';

const label = 'I agree to the terms';
const name = 'agreement';
const value = 'test value';

context('mc-switch', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McSwitch>(`<mc-switch label="${label}" name="${name}" value="${value}"></mc-switch>`).as('mc-switch');
    });

    it('mounts', () => {
      cy.get('@mc-switch');
    });

    it('sets the label', () => {
      cy.get('@mc-switch').contains(label);
    });
  });

  describe('form', () => {
    beforeEach(() => {
      cy.mount<McSwitch>(`<form><mc-switch label="${label}" name="${name}" value="${value}"></mc-switch></form>`).as(
        'mc-switch'
      );

      cy.get('form').find('mc-switch').as('mc-switch');
    });
    it("parent form should be able to get the value of the switch, if it's checked", () => {
      cy.get('@mc-switch').click();
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(name)).to.equal(value);
      });
    });

    it("parent form gets 'null' as the value of the switch, if it's unchecked", () => {
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(name)).to.be.null;
      });
    });

    it('toggling the checked status should toggle the value', () => {
      cy.get('@mc-switch').find('button').realClick();

      // Check initial value
      cy.get('@mc-switch').invoke('prop', 'value').should('equal', value);

      // Uncheck the switch
      cy.get('@mc-switch').realClick();

      // Check that the value is now null
      cy.get('@mc-switch').invoke('prop', 'value').should('equal', false);

      // Check the switch again
      cy.get('@mc-switch').realClick();

      // Check that the value is back to the initial value
      cy.get('@mc-switch').invoke('prop', 'value').should('equal', value);
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.mount<McSwitch>(`<mc-switch label="${label}" name="${name}" value="${value}"></mc-switch>`).as('mc-switch');
    });

    it('should dispatch a change event when a click action occurs, and end up checked if the initial status was unchecked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('change', changeHandler);

        cy.get('@mc-switch').realClick();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: true },
      });
    });

    it('should dispatch a change event when a click action occurs, and end up unchecked if the initial status was checked', () => {
      cy.get('@mc-switch').invoke('prop', 'checked', 'true');
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('change', changeHandler);

        cy.get('@mc-switch').realClick();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: false },
      });
    });

    it('should dispatch a change event when Space is pressed whilst focused, and end up checked if the initial status was unchecked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('click', changeHandler);
        cy.get('@mc-switch').find('button').focus();
        cy.get('@mc-switch').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: true },
      });
    });

    it('should dispatch a change event when Space is pressed whilst focused, and end up unchecked if the initial status was checked', () => {
      cy.get('@mc-switch').invoke('prop', 'checked', 'true');
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('click', changeHandler);
        cy.get('@mc-switch').find('button').focus();
        cy.get('@mc-switch').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: false },
      });
    });

    it('should dispatch a change event when Enter is pressed whilst focused, and end up checked if the initial status was unchecked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('click', changeHandler);
        cy.get('@mc-switch').find('button').focus();
        cy.get('@mc-switch').realPress('Enter');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: true },
      });
    });

    it('should dispatch a change event when Enter is pressed whilst focused, and end up unchecked if the initial status was checked', () => {
      cy.get('@mc-switch').invoke('prop', 'checked', 'true');
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('click', changeHandler);
        cy.get('@mc-switch').find('button').focus();
        cy.get('@mc-switch').realPress('Enter');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: false },
      });
    });

    it('dispatches only one singular "click" event upon a click on the button', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('@mc-switch').find('button').click({ force: true });
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('dispatches only one singular "click" event upon a click on the label', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-switch').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('mc-switch').find('label').realClick();
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a focus event when it is focused', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('focus', focusHandler);
        cy.get('@mc-switch').find('button').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('@mc-switch').then(($el) => {
        const mcSwitch = $el.get(0);
        mcSwitch.addEventListener('blur', blurHander);
        cy.get('@mc-switch').find('button').focus();
        cy.get('@mc-switch').find('button').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });
  });
});
