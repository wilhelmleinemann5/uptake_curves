import { McRadio } from '../src';
import '../src';

const label = 'I agree to the terms';
const name = 'agreement';
const value = 'test value';

context('mc-radio', () => {
  describe('form values and keyboard navigation', () => {
    beforeEach(() => {
      cy.mount<McRadio>(
        `<form><button id="focus">Focus</button><mc-radio name="${name}" label="${label}" value="${value}"></mc-radio></form>`,
      ).as('mc-radio');
      cy.get('#focus').as('focus');
    });

    it('mounts', () => {
      cy.get('@mc-radio');
    });

    it('sets the label', () => {
      cy.get('@mc-radio').contains(label);
    });

    it("parent form should be able to get the value of the radio, if it's checked", () => {
      cy.get('@mc-radio').click();
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(name)).to.equal(value);
      });
    });

    it("parent form gets 'null' as the value of the radio, if it's unchecked", () => {
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(name)).to.equal(null);
      });
    });

    it('should dispatch a change event when a click action occurs, and end up checked if the initial status was unchecked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-radio').then(($el) => {
        const mcRadio = $el.get(0);
        mcRadio.addEventListener('change', changeHandler);

        cy.get('mc-radio').realClick();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: true },
      });
    });

    it('should dispatch a change event when a click action occurs, and stays checked if the initial status was checked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-radio').invoke('prop', 'checked', 'true');
      cy.get('@mc-radio').then(($el) => {
        const mcRadio = $el.get(0) as McRadio;
        mcRadio.addEventListener('change', changeHandler);

        cy.get('mc-radio').realClick();

        cy.get('@changeHandler').its('callCount').should('eq', 1);
        expect(mcRadio.checked).to.equal('true');
      });
    });

    it('should dispatch a change event when Space is pressed whilst focused, and end up checked if the initial status was unchecked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-radio').then(($el) => {
        const mcRadio = $el.get(0);
        mcRadio.addEventListener('click', changeHandler);
        cy.get('@mc-radio').find('input[data-cy="radio"]').focus();
        cy.get('@mc-radio').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        target: { checked: true },
      });
    });

    it('should dispatch a change event when Space is pressed whilst focused, and stays checked if the initial status was checked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-radio').invoke('prop', 'checked', 'true');
      cy.get('@mc-radio').then(($el) => {
        const mcRadio = $el.get(0) as McRadio;
        mcRadio.addEventListener('click', changeHandler);
        cy.get('@mc-radio').find('input[data-cy="radio"]').focus();
        cy.get('@mc-radio').realPress('Space');

        cy.get('@changeHandler').its('callCount').should('eq', 1);
        expect(mcRadio.checked).to.equal('true');
      });
    });

    it('should not dispatch an input event when a click action occurs', () => {
      const inputHandler = cy.stub().as('inputHandler');
      cy.get('@mc-radio').then(($el) => {
        const mcRadio = $el.get(0);
        mcRadio.addEventListener('input', inputHandler);

        cy.get('mc-radio').realClick();
      });

      cy.get('@inputHandler').its('callCount').should('eq', 0);
    });

    it('dispatches only one singular "click" event upon a click on the input', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-radio').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('mc-radio').find('[data-cy=radio]').realClick();
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('dispatches only one singular "click" event upon a click on the label', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-radio').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('mc-radio').find('label').realClick();
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('mc-radio').then(($el) => {
        const mcRadio = $el.get(0);
        mcRadio.addEventListener('blur', blurHander);
        cy.get('mc-radio').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio').find('input[data-cy="radio"]').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });

    it('should dispatch a focus event when it is focused', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-radio').then(($el) => {
        const mcRadio = $el.get(0);
        mcRadio.addEventListener('focus', focusHandler);
        cy.get('mc-radio').find('input[data-cy="radio"]').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });
  });

  describe('slots', () => {
    beforeEach(() => {
      cy.mount<McRadio>(`<mc-radio><span slot="label">${label}</span></mc-radio>`).as('mc-radio');
    });
    it('sets HTML label as a slot', () => {
      cy.get('@mc-radio').then(($el) => {
        const slot = $el[0].shadowRoot.querySelector('slot').assignedElements({ flatten: true })[0];
        cy.get(slot).should('contain.text', label);
      });
    });
  });
});
