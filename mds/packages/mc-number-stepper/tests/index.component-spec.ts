import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { McNumberStepper } from '../src';
import '../src';

type inputTestData = {
  step: number;
  min?: number;
  max?: number;
  startValue: string | null;
  plusClick1: string;
  plusClick2: string;
  minusClick: string;
};

const label = 'Number stepper';
const inputName = 'test';
const expectedValue = '2';

context('mc-number-stepper', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McNumberStepper>(`<mc-number-stepper label="${label}"></mc-number-stepper>`).as('mc-number-stepper');
    });
    it('mounts', () => {
      cy.get('@mc-number-stepper').contains(label);
    });
    it('input gets text type', () => {
      cy.get('@mc-number-stepper').find('input[data-cy="input"]');
    });
  });

  describe('form', () => {
    it('parent form gets updated when typing date into the input', () => {
      cy.mount(
        html`<form>
          <mc-number-stepper label="${label}" name="${inputName}"></mc-number-stepper>
        </form>`
      ).as('form');
      // aliases
      cy.get('mc-number-stepper').find('input[data-cy="input"]').as('mc-number-stepper-input');
      cy.get('mc-number-stepper').find('input[aria-hidden="true"]').as('mc-number-stepper-hidden');
      cy.get('@mc-number-stepper-input').type('2');
      cy.get('@mc-number-stepper-hidden').should('have.value', expectedValue);
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(expectedValue);
      });
    });

    it('Increments the number when clicking on the plus button, up to a limit', () => {
      cy.mount(
        html`<form>
          <mc-number-stepper label="${label}" name="${inputName}" max="10"></mc-number-stepper>
        </form>`
      ).as('form');
      // aliases
      cy.get('mc-number-stepper').find('input[data-cy="input"]').as('mc-number-stepper-input');
      cy.get('mc-number-stepper').find('input[aria-hidden="true"]').as('mc-number-stepper-hidden');
      cy.get('@mc-number-stepper-input').type('8');
      cy.get('@mc-number-stepper-hidden').should('have.value', '8');
      cy.get('mc-number-stepper').find('[data-cy="plus"]').as('mc-input-number-plus');
      cy.get('@mc-input-number-plus').click();
      cy.get('@mc-number-stepper-hidden').should('have.value', '9');
      cy.get('@mc-input-number-plus').click();
      cy.get('@mc-number-stepper-hidden').should('have.value', '10');
      cy.get('@mc-input-number-plus').should('have.prop', 'disabled');
      cy.get('@mc-number-stepper-hidden').should('have.value', '10');
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('10');
      });
    });

    it('Decrements the number when clicking on the minus button, up to a limit', () => {
      cy.mount(
        html`<form>
          <mc-number-stepper label="${label}" name="${inputName}" min="5"></mc-number-stepper>
        </form>`
      ).as('form');
      // aliases
      cy.get('mc-number-stepper').find('input[data-cy="input"]').as('mc-number-stepper-input');
      cy.get('mc-number-stepper').find('input[aria-hidden="true"]').as('mc-number-stepper-hidden');
      cy.get('@mc-number-stepper-input').type('7');
      cy.get('@mc-number-stepper-hidden').should('have.value', '7');
      cy.get('mc-number-stepper').find('[data-cy="minus"]').as('mc-input-number-minus');
      cy.get('@mc-input-number-minus').click();
      cy.get('@mc-number-stepper-hidden').should('have.value', '6');
      cy.get('@mc-input-number-minus').click();
      cy.get('@mc-number-stepper-hidden').should('have.value', '5');
      cy.get('@mc-input-number-minus').should('have.prop', 'disabled');
      cy.get('@mc-number-stepper-hidden').should('have.value', '5');
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('5');
      });
    });

    it('If there is no value to start, and min is 0 the minus button is enabled and sets it to 0', () => {
      cy.mount(
        html`<form>
          <mc-number-stepper label="${label}" name="${inputName}" min="0"></mc-number-stepper>
        </form>`
      ).as('form');
      // aliases
      cy.get('mc-number-stepper').find('input[data-cy="input"]').as('mc-number-stepper-input');
      cy.get('mc-number-stepper').find('input[aria-hidden="true"]').as('mc-number-stepper-hidden');
      cy.get('mc-number-stepper').find('[data-cy="minus"]').as('mc-input-number-minus');
      cy.get('@mc-input-number-minus').should('not.be', 'disabled');
      cy.get('@mc-input-number-minus').click();
      cy.get('@mc-number-stepper-hidden').should('have.value', '0');
      cy.get('@mc-input-number-minus').should('have.prop', 'disabled');
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('0');
      });
    });

    [
      {
        step: 5,
        startValue: '5',
        plusClick1: '10',
        plusClick2: '15',
        minusClick: '10',
      },
      {
        step: 1,
        startValue: null,
        plusClick1: '0',
        plusClick2: '1',
        minusClick: '0',
      },
      {
        step: 1,
        min: 0,
        startValue: null,
        plusClick1: '0',
        plusClick2: '1',
        minusClick: '0',
      },
      {
        step: 5,
        min: 5,
        max: 15,
        startValue: null,
        plusClick1: '5',
        plusClick2: '10',
        minusClick: '5',
      },
      {
        step: 5,
        min: 5,
        max: 15,
        startValue: '5',
        plusClick1: '10',
        plusClick2: '15',
        minusClick: '10',
      },
      {
        step: 0.1,
        min: 5,
        max: 15,
        startValue: '5',
        plusClick1: '5.1',
        plusClick2: '5.2',
        minusClick: '5.1',
      },
      {
        step: 1,
        min: 5,
        max: 15,
        startValue: '1',
        plusClick1: '5',
        plusClick2: '6',
        minusClick: '5',
      },
      {
        step: 1,
        min: -40,
        max: 10,
        startValue: '-20',
        plusClick1: '-19',
        plusClick2: '-18',
        minusClick: '-19',
      },
      {
        step: 0.5,
        min: 0,
        max: 10,
        startValue: '9',
        plusClick1: '9.5',
        plusClick2: '10',
        minusClick: '9.5',
      },
      {
        step: 0.1,
        min: 0,
        max: 15,
        startValue: '10',
        plusClick1: '10.1',
        plusClick2: '10.2',
        minusClick: '10.1',
      },
    ].forEach((testData: inputTestData) => {
      it(`Changes the number correctly based on the step ${testData.step} min ${testData.min} max ${testData.max} and startValue ${testData.startValue} when clicking on the buttons`, () => {
        cy.mount(
          html`<form>
            <mc-number-stepper
              label="${label}"
              name="${inputName}"
              step="${testData.step}"
              min="${ifDefined(testData.min)}"
              max="${ifDefined(testData.max)}"
            ></mc-number-stepper>
          </form>`
        ).as('form');
        // cy.visit(
        //   `${baseUrl}&name=${inputName}&step=${testData.step}${testData.min ? `&min=${testData.min}` : ''}${
        //     testData.max ? `&max=${testData.max}` : ''
        //   }`
        // );
        // aliases
        cy.get('mc-number-stepper').find('input[data-cy="input"]').as('mc-number-stepper-input');
        cy.get('mc-number-stepper').find('input[aria-hidden="true"]').as('mc-number-stepper-hidden');
        if (testData.startValue) {
          cy.get('@mc-number-stepper-input').type(testData.startValue);
          cy.get('@mc-number-stepper-hidden').should('have.value', testData.startValue);
        }
        cy.get('mc-number-stepper').find('[data-cy="minus"]').as('mc-input-number-minus');
        cy.get('mc-number-stepper').find('[data-cy="plus"]').as('mc-input-number-plus');

        cy.get('@mc-input-number-plus').click();
        cy.log('FAILING:');
        cy.get('@mc-number-stepper-hidden').should('have.value', testData.plusClick1);
        // In one of our scenarios, we can hit the maxiumum and then the button disables - failing the click
        cy.get('@mc-input-number-plus').then(($el) => {
          const el = $el.get(0) as HTMLInputElement;
          if (!el.disabled) {
            el.click();
          }
        });

        cy.get('@mc-number-stepper-hidden').should('have.value', testData.plusClick2);
        cy.get('@mc-input-number-minus').click();
        cy.get('@mc-number-stepper-hidden').should('have.value', testData.minusClick);
        cy.get('@form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(inputName)).to.equal(testData.minusClick);
          cy.get('@mc-number-stepper-input').then(($el) => {
            const el = $el.get(0) as HTMLInputElement;
            expect(el.checkValidity()).to.be.true;
          });
        });
      });
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.mount<McNumberStepper>(
        `<button id="focus">Focus</button>
        <mc-number-stepper label="${label}" name="${inputName}" max="10"></mc-number-stepper>`
      ).as('mc-number-stepper');
    });

    it('fires input event when plus button is clicked and sets the value to 3 if the default value was 2', () => {
      cy.get('mc-number-stepper').invoke('attr', 'value', '2');
      const inputHandler = cy.stub().as('inputHandler');
      cy.get('mc-number-stepper').then(($el) => {
        const mcNumberStepper = $el.get(0);
        mcNumberStepper.addEventListener('input', inputHandler);
      });
      cy.get('mc-number-stepper').find('[data-cy="plus"]').realClick();
      cy.get('@inputHandler').its('callCount').should('eq', 1);
      cy.get('mc-number-stepper').invoke('val').should('eq', '3');
    });

    it('fires input event when minus button is clicked and sets the value to 1 if the default value was 2', () => {
      cy.get('mc-number-stepper').invoke('attr', 'value', '2');
      const inputHandler = cy.stub().as('inputHandler');
      cy.get('mc-number-stepper').then(($el) => {
        const mcNumberStepper = $el.get(0);
        mcNumberStepper.addEventListener('input', inputHandler);
      });
      cy.get('mc-number-stepper').find('[data-cy="minus"]').realClick();
      cy.get('@inputHandler').its('callCount').should('eq', 1);
      cy.get('mc-number-stepper').invoke('val').should('eq', '1');
    });

    it('fires input event if typed in', () => {
      const typedNumber = '2';
      const inputHandler = cy.stub().as('inputHandler');
      cy.get('mc-number-stepper').then(($el) => {
        const mcNumberStepper = $el.get(0);
        mcNumberStepper.addEventListener('input', inputHandler);
        cy.get('mc-number-stepper').find('input[data-cy="input"]').focus();
        cy.realType(typedNumber);
      });
      cy.get('@inputHandler').its('callCount').should('eq', 1);
      cy.get('mc-number-stepper').invoke('val').should('eq', typedNumber);
    });

    it('should dispatch a focus event when it is focused', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-number-stepper').then(($el) => {
        const mcNumberStepper = $el.get(0);
        mcNumberStepper.addEventListener('focus', focusHandler);
        cy.get('mc-number-stepper').find('input[data-cy="input"]').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('mc-number-stepper').then(($el) => {
        const mcNumberStepper = $el.get(0);
        mcNumberStepper.addEventListener('blur', blurHander);
        cy.get('mc-number-stepper').find('input[data-cy="input"]').focus();
        cy.get('#focus').click();
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });
  });
});
