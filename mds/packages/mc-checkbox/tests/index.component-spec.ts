import { html } from 'lit';
import { McCheckbox } from '../src';
import '../src';

const label = 'I agree to the terms';
const name = 'agreement';
const value = 'test value';

context('mc-checkbox', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McCheckbox>(`<mc-checkbox label="${label}"></mc-checkbox>`).as('mc-checkbox');
    });
    it('mounts', () => {
      cy.get('@mc-checkbox');
    });

    it('renders default label', () => {
      cy.get('@mc-checkbox').contains(label);
    });

    it('renders label with the value supplied by an attribute programmatically', () => {
      const labelNew = 'test label';
      cy.get('@mc-checkbox').invoke('attr', 'label', labelNew);
      cy.get('mc-label').contains(labelNew);
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.mount<McCheckbox>(`<mc-checkbox label="${label}"></mc-checkbox>`).as('mc-checkbox');
    });

    it('should dispatch a change event when a click action occurs, and end up checked if the initial status was unchecked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-checkbox').then(($el) => {
        const mcCheckbox = $el.get(0);
        mcCheckbox.addEventListener('change', changeHandler);

        cy.get('@mc-checkbox').realClick();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: true },
      });
    });

    it('should dispatch a change event when a click action occurs, and end up unchecked if the initial status was checked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-checkbox').invoke('prop', 'checked', true);
      cy.get('@mc-checkbox').then(($el) => {
        const mcCheckbox = $el.get(0);
        mcCheckbox.addEventListener('change', changeHandler);

        cy.get('@mc-checkbox').realClick();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: false },
      });
    });

    it('should dispatch a change event when Space is pressed whilst focused, and end up checked if the initial status was unchecked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-checkbox').then(($el) => {
        const mcCheckbox = $el.get(0);
        mcCheckbox.addEventListener('click', changeHandler);
        cy.get('@mc-checkbox').find('input[data-cy="checkbox"]').focus();
        cy.get('@mc-checkbox').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: true },
      });
    });

    it('should dispatch a change event when Space is pressed whilst focused, and end up unchecked if the initial status was checked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-checkbox').invoke('prop', 'checked', true);
      cy.get('@mc-checkbox').then(($el) => {
        const mcCheckbox = $el.get(0);
        mcCheckbox.addEventListener('click', changeHandler);
        cy.get('@mc-checkbox').find('input[data-cy="checkbox"]').focus();
        cy.get('@mc-checkbox').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: false },
      });
    });

    it('dispatches only one singular "click" event upon a click on the input', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-checkbox').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('mc-checkbox').find('[data-cy=checkbox]').realClick();
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('dispatches only one singular "click" event upon a click on the label', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-checkbox').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('mc-checkbox').find('label').realClick();
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a focus event when it is focused', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('@mc-checkbox').then(($el) => {
        const mcCheckbox = $el.get(0);
        mcCheckbox.addEventListener('focus', focusHandler);
        cy.get('@mc-checkbox').find('input[data-cy="checkbox"]').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('@mc-checkbox').then(($el) => {
        const mcCheckbox = $el.get(0);
        mcCheckbox.addEventListener('blur', blurHander);
        cy.get('@mc-checkbox').find('input[data-cy="checkbox"]').focus();
        cy.get('@mc-checkbox').find('input[data-cy="checkbox"]').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });

    it('should show the checkmark, when checked is changed programmatically and then changed by interaction (https://github.com/Maersk-Global/mds/issues/498)', () => {
      cy.get('@mc-checkbox').then(($el) => {
        const mcCheckbox = $el.get(0);
        mcCheckbox.checked = true;
        cy.get('@mc-checkbox').realClick().realClick();
        cy.get('@mc-checkbox').find('[data-cy="checkmark"]').should('be.visible');
      });
    });
  });

  describe('form', () => {
    beforeEach(() => {
      const submitFormHandlerSpy = cy.spy().as('onSubmitFormSpy');
      cy.mount(
        html`<form @submit="${(): void => submitFormHandlerSpy()}">
          <mc-checkbox label="${label}" name="${name}" value="${value}" checked></mc-checkbox>
        </form>`
      ).as('form');
      cy.get('@form').find('mc-checkbox').as('mc-checkbox');
    });
    it("parent form should be able to get the value of the checkbox, if it's checked", () => {
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(name)).to.equal(value);
      });
    });

    it("parent form gets 'null' as the value of the checkbox, if it's unchecked", () => {
      cy.get('@mc-checkbox').click();
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(name)).to.be.null;
      });
    });

    it("parent form gets the checkbox value, if it's unchecked and then checked again", () => {
      cy.get('@mc-checkbox').click();
      cy.get('@mc-checkbox').click();
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(name)).to.equal(value);
      });
    });

    it('toggling the checked status should toggle the value', () => {
      cy.get('@mc-checkbox').find('input').realClick();

      // Check initial value
      cy.get('@mc-checkbox').invoke('prop', 'value').should('equal', value);

      // Uncheck the checkbox
      cy.get('@mc-checkbox').realClick();

      // Check that the value is now null
      cy.get('@mc-checkbox').invoke('prop', 'value').should('equal', false);

      // Check the checkbox again
      cy.get('@mc-checkbox').realClick();

      // Check that the value is back to the initial value
      cy.get('@mc-checkbox').invoke('prop', 'value').should('equal', value);
    });
  });
});
