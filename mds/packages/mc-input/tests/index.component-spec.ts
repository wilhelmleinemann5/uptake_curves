import { html } from 'lit';
import { McInput } from '../src';
import '../src';

const label = 'Input';
const inputName = 'test';
const expectedValue = 'test value';
const inputValue = 'Jane';

context('mc-input', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McInput>(`<mc-input label="${label}"></mc-input>`).as('mc-input');
    });
    it('mounts', () => {
      cy.get('@mc-input').contains(label);
    });
  });

  describe('form', () => {
    it('parent form should be able to get the value of the input, when value prop is set', () => {
      cy.mount(
        html`<form><mc-input label="${label}" name="${inputName}" value="${expectedValue}"></mc-input></form>`,
      ).as('form');
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(expectedValue);
      });
    });

    it('parent form gets empty value as the value of the input is not set', () => {
      cy.mount(html`<form><mc-input label="${label}" name="${inputName}"></mc-input></form>`).as('form');
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('');
      });
    });

    it('parent form gets updated when typing into the input', () => {
      cy.mount(html`<form><mc-input label="${label}" name="${inputName}"></mc-input></form>`).as('form');
      // aliases
      cy.get('@form').find('input[data-cy="input"]').as('mc-input-input');
      cy.get('@form').find('input[aria-hidden="true"]').as('mc-input-hidden');
      //form interactions
      cy.get('@mc-input-input').type(expectedValue);
      cy.get('@mc-input-hidden').should('have.value', expectedValue);
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(expectedValue);
      });
    });
  });

  describe('form with button', () => {
    beforeEach(() => {
      const submitFormHandlerSpy = cy.spy().as('onSubmitFormSpy');
      cy.mount(
        html`<form @submit="${(): void => submitFormHandlerSpy()}">
          <mc-input name="${inputName}" label="Name"></mc-input><mc-button label="Submit" type="submit"></mc-button>
        </form>`,
      ).as('form');
    });

    it('submits form on click', () => {
      cy.get('@form').find('mc-input').click();
      cy.get('@form').find('mc-input').realType(inputValue);
      cy.get('@form').find('mc-button').click();
      cy.get('@onSubmitFormSpy').its('callCount').should('eq', 1);
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(inputValue);
      });
    });

    it('submits form on enter', () => {
      cy.get('@form').find('mc-input').click();
      cy.get('@form').find('mc-input').realType(inputValue);
      cy.get('@form').find('mc-button').find('button').focus();
      cy.get('@form').find('mc-button').find('button').realPress('Enter');
      cy.get('@onSubmitFormSpy').its('callCount').should('eq', 1);
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(inputValue);
      });
    });
  });

  describe('input types', () => {
    beforeEach(() => {
      cy.mount<McInput>(`<mc-input label="${label}" name="${inputName}"></mc-input>`).as('mc-input');
    });

    it('input gets tel type', () => {
      cy.get('mc-input').invoke('attr', 'type', 'tel');
      cy.get('mc-input').find('input[type="tel"]');
    });
    it('input gets password type', () => {
      cy.get('mc-input').invoke('attr', 'type', 'password');
      cy.get('mc-input').find('input[type="password"]').should('have.length', 1);
    });
    describe('input type url', () => {
      beforeEach(() => {
        cy.get('mc-input').invoke('attr', 'type', 'url');
        cy.get('mc-input').find('input[type="url"]').as('mc-input-url');
      });
      it('input gets url type', () => {
        cy.get('mc-input').find('input[type="url"]').should('have.length', 1);
      });
      it('input is valid when url is entered', () => {
        cy.get('@mc-input-url').type('https://maersk.com');
        cy.get('mc-input').find('[data-cy=input]').blur();
        cy.get('mc-input').find('input[type="url"]:invalid').should('have.length', 0);
      });
      it('input is invalid when string is entered', () => {
        cy.get('@mc-input-url').type('maersk');
        cy.get('mc-input').find('[data-cy=input]').blur();
        cy.get('mc-input').find('input[type="url"]:invalid').should('have.length', 1);
      });
    });
    describe('input type email', () => {
      beforeEach(() => {
        cy.get('mc-input').invoke('attr', 'type', 'email');
        cy.get('mc-input').find('input[type="email"]').as('mc-input-email');
      });
      it('input gets email type', () => {
        cy.get('mc-input').find('input[type="email"]').should('have.length', 1);
      });
      it('input is valid when email is entered', () => {
        cy.get('@mc-input-email').type('test@maersk.com');
        cy.get('mc-input').find('[data-cy=input]').blur();
        cy.get('mc-input').find('input[type="email"]:invalid').should('have.length', 0);
      });
      it('input is invalid when string is entered', () => {
        cy.get('@mc-input-email').type('maersk');
        cy.get('mc-input').find('[data-cy=input]').blur();
        cy.get('mc-input').find('input[type="email"]:invalid').should('have.length', 1);
      });
    });
    describe('input type number', () => {
      beforeEach(() => {
        cy.get('mc-input').invoke('attr', 'type', 'number');
        cy.get('mc-input').find('input[type="number"]').as('mc-input-number');
      });
      it('gets type number', () => {
        cy.get('mc-input').find('input[data-cy="input"]').should('have.length', 1);
      });
      it('is valid when a number is entered', () => {
        cy.get('@mc-input-number').type('345');
        cy.get('mc-input').find('[data-cy=input]').blur();
        cy.get('mc-input').find('input[data-cy="input"]:invalid').should('have.length', 0);
      });
      it('value stays unchanged if non-digit chars are entered', () => {
        cy.get('@mc-input-number').type('maersk');
        cy.get('mc-input').find('[data-cy=input]').blur();
        cy.get('mc-input').find('input[data-cy="input"]').should('have.value', '');
      });
      it('input event only gets dispatched for digits', () => {
        const inputHandler = cy.stub().as('inputHandler');
        cy.get('mc-input').then(($el) => {
          const mcInput = $el.get(0);
          mcInput.addEventListener('input', inputHandler);
          cy.get('@mc-input-number').focus();
          cy.get('@mc-input-number').realType('34');
        });
        cy.get('@inputHandler').its('callCount').should('eq', 2);
      });
      it('input event does not get dispatched for non-digits', () => {
        const inputHandler = cy.stub().as('inputHandler');
        cy.get('mc-input').then(($el) => {
          const mcInput = $el.get(0);
          mcInput.addEventListener('input', inputHandler);
          cy.get('@mc-input-number').type('maersk');
        });
        cy.get('@inputHandler').its('callCount').should('eq', 0);
      });
      it('keydown event gets dispatched on every keydown', () => {
        const keydownHandler = cy.stub().as('keydownHandler');
        cy.get('mc-input').then(($el) => {
          const mcInput = $el.get(0);
          mcInput.addEventListener('keydown', () => keydownHandler());
          cy.get('@mc-input-number').focus();
          cy.get('@mc-input-number').realType('maersk2');
        });
        cy.get('@keydownHandler').its('callCount').should('eq', 7);
      });
      it('sets valueAsNumber to NaN if value is not set', () => {
        expect(Number.isNaN(+cy.get('mc-input').invoke('prop', 'valueAsNumber'))).to.eq(true);
      });
      it('sets valueAsNumber to 33 when 33 is typed in', () => {
        cy.get('@mc-input-number').focus();
        cy.get('@mc-input-number').realType('33');
        cy.get('mc-input').invoke('prop', 'valueAsNumber').should('eq', 33);
      });
    });
  });

  describe('event handlers', () => {
    beforeEach(() => {
      cy.mount<McInput>(
        `<button id="focus">Focus</button><mc-input label="${label}" name="${inputName}"></mc-input>`,
      ).as('mc-input');
    });

    it("input doesn't get focus per default", () => {
      cy.get('mc-input').should('not.have.focus');
    });

    it('input get focus on label click and blurs on body click', () => {
      cy.get('mc-input').find('label').click();
      cy.get('mc-input').should('have.focus');
      cy.get('#focus').click();
      cy.get('mc-input').should('not.have.focus');
    });

    it('dispatches only one singular "click" event once a click occur on the input', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('mc-input').find('.input').realClick();
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    it('dispatches only one singular "click" event once a click occur on the label', () => {
      const clickHandler = cy.stub().as('clickHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('click', () => clickHandler());
      });
      cy.get('mc-input').find('label').realClick();
      cy.get('@clickHandler').its('callCount').should('eq', 1);
    });

    // custom Event blur, focus
    it('sends custom focus event if focus function is invoked', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('focus', () => focusHandler());
        mcInput.focus();
      });
      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });
    it('sends custom blur event if blur function is invoked', () => {
      const blurHandler = cy.stub().as('blurHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.focus();
        mcInput.addEventListener('blur', () => blurHandler());
        mcInput.blur();
      });
      cy.get('@blurHandler').its('callCount').should('eq', 1);
    });
    it('can set focus programmatically on mc-input', () => {
      cy.get('#focus').click();
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.focus();
      });
      cy.get('mc-input').should('have.focus');
    });
    it('can set blur programmatically on mc-input', () => {
      cy.get('mc-input').find('label').click();
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.blur();
      });
      cy.get('mc-input').should('not.have.focus');
    });
    it('fires input event if typed', () => {
      const typedWord = 'a';
      const inputHandler = cy.stub().as('inputHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('input', inputHandler);
        cy.get('mc-input').find('input[data-cy="input"]').focus();
        cy.realType(typedWord);
      });
      cy.get('@inputHandler').its('callCount').should('eq', 1);
      cy.get('@inputHandler').should('have.been.calledWithMatch', {
        target: { value: typedWord },
      });
    });
    it('should dispatch a focus event when it is focused', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('focus', focusHandler);
        cy.get('mc-input').find('input[data-cy="input"]').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });
    it('should dispatch a blur event when it is blurred', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('blur', blurHander);
        cy.get('mc-input').find('input[data-cy="input"]').as('inner-input');
        cy.get('@inner-input').focus();
        cy.get('@inner-input').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });
  });

  describe('input id', () => {
    beforeEach(() => {
      cy.mount<McInput>(
        `<mc-input label="First input" name="first-input"></mc-input>
        <mc-input label="Second input" name="second-input"></mc-input>
        <mc-input label="Third input" name="third-input"></mc-input>
        <mc-input label="Forth input" name="forth-input"></mc-input>
        <mc-input label="Input with explicitly provided id" id="explicitly-provided-id"></mc-input>`,
      );
    });

    it('ids are unique across multiple inputs', () => {
      cy.get('[name=first-input]').find('[data-cy="input"]').invoke('attr', 'id').as('id1');
      cy.get('[name=second-input]').find('[data-cy="input"]').invoke('attr', 'id').as('id2');
      cy.get('[name=third-input]').find('[data-cy="input"]').invoke('attr', 'id').as('id3');
      cy.get('[name=forth-input]').find('[data-cy="input"]').invoke('attr', 'id').as('id4');

      cy.get('@id2').then((id2) => cy.get('@id1').should('not.equal', id2));
      cy.get('@id3').then((id3) => cy.get('@id1').should('not.equal', id3));
      cy.get('@id4').then((id4) => cy.get('@id1').should('not.equal', id4));
      cy.get('@id2').then((id2) => cy.get('@id3').should('not.equal', id2));
      cy.get('@id4').then((id4) => cy.get('@id3').should('not.equal', id4));
    });

    it('id prop supersedes auto-generated id and get postfixed with "mc-input", if explicitly provided in the usage context', () => {
      const expectedId = 'mc-input-explicitly-provided-id';
      cy.get(`#explicitly-provided-id`).find('[data-cy="input"]').invoke('attr', 'id').should('equal', expectedId);
    });
  });

  describe('input mask', () => {
    beforeEach(() => {
      cy.mount<McInput>(`<mc-input label="${label}" name="${inputName}" mask="0000 0000 0000 0000"></mc-input>`).as(
        'mc-input',
      );
      cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input-container');
      cy.get('mc-input').find('input[data-cy="input"]').as('mc-input-input');
    });
    it('input mask is applied to a visible input', () => {
      cy.get('@mc-input-input').type('1234567890123456');
      cy.get('@mc-input-input').should('have.value', '1234 5678 9012 3456');
    });
    it('input mask is not applied to the hidden input', () => {
      cy.get('@mc-input-input').type('1234567890123456');
      cy.get('mc-input').find('input[aria-hidden="true"]').should('have.value', '1234567890123456');
    });
    it('parent form can get the unmasked value from the input when mask is set', () => {
      const expectedValue = '12341234';
      cy.mount<McInput>(
        `<form><mc-input label="${label}" name="${inputName}" mask="0000 0000" value="${expectedValue}"></mc-input><form>`,
      ).as('mc-input-form');
      cy.get('@mc-input-form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(expectedValue);
      });
    });
    it('input mask is applied to value when input is set programmatically', () => {
      cy.get('mc-input').invoke('prop', 'value', '1234567890123456');
      cy.get('@mc-input-input').should('have.value', '1234 5678 9012 3456');
    });
    it('input mask options are updated when mask changes', () => {
      cy.get('mc-input').invoke('prop', 'mask', '0000 0000 0000 0000');
      cy.get('@mc-input-input').type('1234567890123456');
      cy.get('@mc-input-input').should('have.value', '1234 5678 9012 3456');

      cy.get('mc-input').invoke('prop', 'mask', '0000-0000-0000-0000');
      cy.get('@mc-input-input').type('1234567890123456');
      cy.get('@mc-input-input').should('have.value', '1234-5678-9012-3456');
    });
    it('mask is applied when passed as RegExp', () => {
      cy.get('mc-input').invoke('prop', 'mask', /^\d+$/);
      cy.get('@mc-input-input').type('1234abc');
      cy.get('@mc-input-input').should('have.value', '1234');
    });
    it('mask is applied when passed as Object', () => {
      cy.get('mc-input').invoke('prop', 'mask', { mask: '0000 0000 0000 0000' });
      cy.get('@mc-input-input').type('1234567890123456');
      cy.get('@mc-input-input').should('have.value', '1234 5678 9012 3456');
    });
    it('mask is removed when mask property is set to falsy', () => {
      cy.get('mc-input').invoke('prop', 'mask', '0000 0000 0000 0000');
      cy.get('@mc-input-input').type('1234567890123456');
      cy.get('@mc-input-input').should('have.value', '1234 5678 9012 3456');
      cy.get('mc-input').invoke('prop', 'mask', '');
      cy.get('@mc-input-input').should('have.value', '1234567890123456');
    });
  });

  describe('clear button', () => {
    it('clear button is not displayed per default (clearbutton prop is false)', () => {
      cy.mount<McInput>(`<mc-input label="${label}" name="${inputName}"></mc-input>`).as('mc-input');
      cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('have.length', 0);
    });
    it('clear button is not displayed when clearbutton prop is true, input focus and value is empty', () => {
      cy.mount<McInput>(`<mc-input label="${label}" name="${inputName}" clearbutton></mc-input>`).as('mc-input');
      cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('not.exist');
    });
    describe('clear button default interactions', () => {
      beforeEach(() => {
        cy.mount<McInput>(
          `<button id="outer-element-1">outer element 1</button>
          <mc-input label="${label}" name="${inputName}" clearbutton></mc-input>
          <button id="outer-element-2">outer element 2</button>`,
        ).as('mc-input');
        // aliases
        cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input');
        cy.get('mc-input').find('input[data-id="input"]').as('mc-input-input');
      });
      it('focus on input and type - show clear button', () => {
        cy.get('@mc-input-input').focus();
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').as('clear-button');
        cy.get('@clear-button').should('have.length', 1);
        cy.get('@clear-button').should('exist');
      });
      it('focus on input and type - show clear button, click on body - hide clear button, click on input - show clear button', () => {
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').as('clear-button');
        cy.get('@clear-button').should('have.length', 1);
        cy.get('@clear-button').should('exist');
        cy.get('#outer-element-1').click();
        cy.get('@clear-button').should('not.exist');
        cy.get('@mc-input-input').click();
        cy.get('@clear-button').should('exist');
      });
      it('focus on input and type - can click on clear button, event is emitted, focuses back on input', () => {
        const inputHandler = cy.stub().as('inputHandler');
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').then(($el) => {
          const mcInput = $el.get(0);
          mcInput.addEventListener('input', inputHandler);
        });
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').realClick();
        cy.get('@mc-input-input').should('have.value', '');
        cy.get('mc-input').find('input[aria-hidden="true"]').should('have.value', '');
        cy.get('@inputHandler').its('callCount').should('eq', 1);
        cy.get('@mc-input-input').should('have.focus');
      });
      it('focus on input and type - can tab to clear button and press enter, event is emitted, focuses back on input', () => {
        const inputHandler = cy.stub().as('inputHandler');
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').then(($el) => {
          const mcInput = $el.get(0);
          mcInput.addEventListener('input', inputHandler);
        });
        cy.realPress('Tab');
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('be.focused');
        cy.realPress('Enter');
        cy.get('@mc-input-input').should('have.value', '');
        cy.get('mc-input').find('input[aria-hidden="true"]').should('have.value', '');
        cy.get('@inputHandler').its('callCount').should('eq', 1);
        cy.get('@mc-input-input').should('have.focus');
      });
      it('focus on input and type - can tab to clear button and press space, event is emitted, focuses back on input', () => {
        const inputHandler = cy.stub().as('inputHandler');
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').then(($el) => {
          const mcInput = $el.get(0);
          mcInput.addEventListener('input', inputHandler);
        });
        cy.realPress('Tab');
        cy.realPress('Space');
        cy.get('@mc-input-input').should('have.value', '');
        cy.get('mc-input').find('input[aria-hidden="true"]').should('have.value', '');
        cy.get('@inputHandler').its('callCount').should('eq', 1);
        cy.get('@mc-input-input').should('have.focus');
      });
      it('focus on input and type - show clear button, tab out - hide clear button, tab back - show clear button', () => {
        cy.get('#outer-element-1').click();
        cy.realPress('Tab');
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').as('clear-button');
        cy.get('@clear-button').should('have.length', 1);
        cy.get('@clear-button').should('exist');
        cy.realPress('Tab');
        cy.realPress('Tab');
        cy.get('@clear-button').should('not.exist');
        cy.get('@mc-input-input').should('not.be.focused');
        cy.realPress(['Shift', 'Tab']);
        cy.get('@clear-button').should('exist');
        cy.get('@mc-input-input').should('be.focused');
        cy.realPress(['Shift', 'Tab']);
        cy.get('@clear-button').should('not.exist');
        cy.get('@mc-input-input').should('not.be.focused');
      });
      it('clearbutton is hidden on input blur and visible back on focus', () => {
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('#outer-element-1').click();
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('not.exist');
        cy.get('@mc-input-input').focus();
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('exist');
      });
      it('pass value, focus on input - clear button is visible', () => {
        cy.get('mc-input').invoke('attr', 'value', expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('not.exist');
        cy.get('@mc-input-input').focus();
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('exist');
      });
      it('pass value, click on input - clear button is visible', () => {
        cy.get('mc-input').invoke('attr', 'value', expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('not.exist');
        cy.get('@mc-input-input').click();
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('exist');
      });
    });
    describe('clear button with keepcleanbuttonvisible', () => {
      beforeEach(() => {
        cy.mount<McInput>(
          `<button id="outer-element-1">outer element 1</button><mc-input label="${label}" name="${inputName}" clearbutton keepclearbuttonvisible></mc-input><button id="outer-element-2">outer element 2</button>`,
        ).as('mc-input');
        // aliases
        cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input');
        cy.get('mc-input').find('input[data-cy="input"]').as('mc-input-input');
      });
      it('focus on input and type - show clear button, click on body - show clear button, click on input - show clear button', () => {
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').as('clear-button');
        cy.get('@clear-button').should('have.length', 1);
        cy.get('@clear-button').should('exist');
        cy.get('#outer-element-1').click();
        cy.get('@clear-button').should('exist');
        cy.get('@mc-input-input').click();
        cy.get('@clear-button').should('exist');
        cy.get('#outer-element-1').click();
        cy.get('@clear-button').click();
        cy.get('@mc-input-input').should('have.value', '');
      });
      it('focus on input and type - show clear button, tab out - show clear button, tab back - show clear button', () => {
        cy.get('#outer-element-1').click();
        cy.realPress('Tab');
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').as('clear-button');
        cy.get('@clear-button').should('have.length', 1);
        cy.get('@clear-button').should('exist');
        cy.realPress('Tab');
        cy.realPress('Tab');
        cy.get('@clear-button').should('exist');
        cy.get('@mc-input-input').should('not.be.focused');
        cy.realPress(['Shift', 'Tab']);
        cy.realPress(['Shift', 'Tab']);
        cy.get('@clear-button').should('exist');
        cy.get('@mc-input-input').should('be.focused');
        cy.realPress(['Shift', 'Tab']);
        cy.get('@clear-button').should('exist');
        cy.get('@mc-input-input').should('not.be.focused');
        cy.get('@clear-button').click();
        cy.get('@mc-input-input').should('have.value', '');
      });
      it('clearbutton is displayed on input blur when clearbutton is true and keepclearbuttonvisible is true', () => {
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('body').click({ force: true });
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('exist');
      });
      it('clearbutton disappears when the loading state is true', () => {
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').invoke('attr', 'loading', true);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('not.exist');
        cy.get('mc-input').invoke('removeAttr', 'loading');
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('exist');
      });
      it('clearbutton is displayed when the value is not null', () => {
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('body').click({ force: true });
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('exist');
      });
      it('clearbutton is not displayed when the value is null', () => {
        cy.get('@mc-input-input').type(expectedValue);
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('exist');
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').click({ force: true });
        cy.get('body').click({ force: true });
        cy.get('mc-input').find('mc-button[data-id="clearButton"]').should('not.exist');
      });
    });
  });

  describe('clickable trailing icon', () => {
    it('doesn\'t dispatch the "trailingiconclick" event when clickable props are not set', () => {
      cy.mount<McInput>(`<mc-input label="${label}" name="${inputName}" trailingicon="star"></mc-input>`).as(
        'mc-input',
      );
      cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input-container');
      cy.get('mc-input').find('input[data-cy="input"]').as('mc-input-input');
      const iconClickHandler = cy.stub().as('iconClickHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('trailingiconclick', iconClickHandler);
      });
      cy.get('mc-input').find('mc-icon').eq(0).realClick();
      cy.get('@iconClickHandler').its('callCount').should('eq', 0);
    });
    it('dispatches only one singular "trailingiconclick" event once a click occur on the trailingicon', () => {
      cy.mount<McInput>(
        `<mc-input label="${label}" name="${inputName}" trailingicon="star" clickabletrailingicon></mc-input>`,
      ).as('mc-input');
      cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input-container');
      cy.get('mc-input').find('input[data-cy="input"]').as('mc-input-input');
      const iconClickHandler = cy.stub().as('iconClickHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('trailingiconclick', iconClickHandler);
      });
      cy.get('mc-input').find('mc-icon').realClick();
      cy.get('@iconClickHandler').its('callCount').should('eq', 1);
    });

    it('dispatches only one singular "trailingiconclick" event once tab and enter occur on the trailingicon', () => {
      cy.mount<McInput>(
        `<mc-input label="${label}" name="${inputName}" trailingicon="star" clickabletrailingicon></mc-input>`,
      ).as('mc-input');
      cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input-container');
      cy.get('mc-input').find('input[data-cy="input"]').as('mc-input-input');
      const iconClickHandler = cy.stub().as('iconClickHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('trailingiconclick', iconClickHandler);
      });
      cy.get('@mc-input-input').focus();
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('@iconClickHandler').its('callCount').should('eq', 1);
    });

    it('dispatches only one singular "trailingiconclick" event once tab and space occur on the trailingicon', () => {
      cy.mount<McInput>(
        `<mc-input label="${label}" name="${inputName}" trailingicon="star" clickabletrailingicon></mc-input>`,
      ).as('mc-input');
      cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input-container');
      cy.get('mc-input').find('input[data-cy="input"]').as('mc-input-input');
      const iconClickHandler = cy.stub().as('iconClickHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('trailingiconclick', iconClickHandler);
      });
      cy.get('@mc-input-input').focus();
      cy.realPress('Tab');
      cy.realPress('Space');
      cy.get('@iconClickHandler').its('callCount').should('eq', 1);
    });
  });

  describe('clear button and clickable trailing icon', () => {
    beforeEach(() => {
      cy.mount<McInput>(
        `<button id="outer-element-1">outer element 1</button>
        <mc-input label="${label}" name="${inputName}" value="${expectedValue}" clearbutton trailingicon="star" clickabletrailingicon></mc-input>
        <button id="outer-element-2">outer element 2</button>`,
      ).as('mc-input');
      // aliases
      cy.get('mc-input').find('[data-cy="mc-input-container"]').as('mc-input');
      cy.get('mc-input').find('input[data-id="input"]').as('mc-input-input');
    });
    it('can click on clear button and trailing icon, events is emitted', () => {
      const inputHandler = cy.stub().as('inputHandler');
      const iconClickHandler = cy.stub().as('iconClickHandler');
      cy.get('@mc-input-input').type(expectedValue);
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('input', inputHandler);
        mcInput.addEventListener('trailingiconclick', iconClickHandler);
      });
      cy.get('mc-input').find('mc-button[data-id="clearButton"]').realClick();
      cy.get('@inputHandler').its('callCount').should('eq', 1);
      cy.get('mc-input').find('mc-button[data-id="trailingIconButton"]').realClick();
      cy.get('@iconClickHandler').its('callCount').should('eq', 1);
    });
    it('can tab and press enter on clear button and trailing icon, event is emitted', () => {
      const inputHandler = cy.stub().as('inputHandler');
      const iconClickHandler = cy.stub().as('iconClickHandler');
      cy.get('mc-input').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('input', inputHandler);
        mcInput.addEventListener('trailingiconclick', iconClickHandler);
      });
      cy.get('#outer-element-1').click();
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('@mc-input-input').should('have.value', '');
      cy.get('@inputHandler').its('callCount').should('eq', 1);
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('@iconClickHandler').its('callCount').should('eq', 1);
      cy.realPress('Tab');
      cy.realPress(['Shift', 'Tab']);
      cy.realPress('Enter');
      cy.get('@iconClickHandler').its('callCount').should('eq', 2);
      cy.realPress(['Shift', 'Tab']);
      cy.get('@mc-input-input').type(expectedValue);
      cy.realPress('Tab');
      cy.realPress('Enter');
      cy.get('@inputHandler').its('callCount').should('eq', 12);
    });
  });
});
