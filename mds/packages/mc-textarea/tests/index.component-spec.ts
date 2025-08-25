import { html } from 'lit';
import { McTextarea } from '../src';
import '../src';

const label = 'Textarea';
const inputName = 'test';
const expectedValue = 'test value';

context('mc-textarea', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McTextarea>(`<mc-textarea label="${label}"></mc-textarea>`).as('mc-textarea');
    });

    it('mounts', () => {
      cy.get('@mc-textarea').contains(label);
    });

    it('counts down characters when maxlength is set', () => {
      cy.get('@mc-textarea').invoke('attr', 'maxlength', '100');
      // aliases
      cy.get('@mc-textarea').find('[data-cy="character-counter"]').as('counter');
      //form interactions
      cy.get('@counter').contains('0 / 100');
      cy.get('@mc-textarea').find('textarea').type(expectedValue);
      cy.get('@counter').contains('10 / 100');
    });
  });

  describe('form', () => {
    it('parent form should be able to get the value of the input, when value prop is set', () => {
      cy.mount(
        html`<form><mc-textarea label="${label}" name="${inputName}" value="${expectedValue}"></mc-textarea></form>`
      ).as('form');
      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(expectedValue);
      });
    });

    it('parent form gets undefined value as the value of the input is not set', () => {
      cy.mount(html`<form><mc-textarea label="${label}" name="${inputName}"></mc-textarea></form>`).as('form');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(`${formData.get(inputName)}`).to.equal('undefined');
      });
    });

    it('parent form gets updated when typing into the input', () => {
      cy.mount(html`<form><mc-textarea label="${label}" name="${inputName}"></mc-textarea></form>`).as('form');
      // aliases
      cy.get('mc-textarea').find('textarea').as('mc-textarea-textarea');
      cy.get('mc-textarea').find('input[aria-hidden="true"]').as('mc-textarea-hidden');
      //form interactions
      cy.get('@mc-textarea-textarea').type('test value');
      cy.get('@mc-textarea-hidden').should('have.value', expectedValue);
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(expectedValue);
      });
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.mount<McTextarea>(`<mc-textarea label="${label}"></mc-textarea>`).as('mc-textarea');
    });

    it('should dispatch 4 input event along with the latest value in the detail, when typing-in "test"', () => {
      const typedWord = 'test';
      const inputHandler = cy.stub().as('inputHandler');
      cy.get('@mc-textarea').then(($el) => {
        const mcTextarea = $el.get(0);
        mcTextarea.addEventListener('input', inputHandler);
        cy.get('@mc-textarea').find('textarea').focus();
        cy.realType(typedWord);
      });

      cy.get('@inputHandler').its('callCount').should('eq', 4);
      cy.get('@inputHandler').should('have.been.calledWithMatch', {
        target: { value: typedWord },
      });
    });

    it('should dispatch a focus event when it is focused', () => {
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-textarea').then(($el) => {
        const mcTextarea = $el.get(0);
        mcTextarea.addEventListener('focus', focusHandler);
        cy.get('mc-textarea').find('textarea').focus();
      });

      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });

    it('should dispatch a blur event when it is blurred', () => {
      const blurHander = cy.stub().as('blurHander');
      cy.get('mc-textarea').then(($el) => {
        const mcTextarea = $el.get(0);
        mcTextarea.addEventListener('blur', blurHander);
        cy.get('mc-textarea').find('textarea').focus();
        cy.get('mc-textarea').find('textarea').realPress('Tab');
      });

      cy.get('@blurHander').its('callCount').should('eq', 1);
    });
  });

  describe('autofocus functionality', () => {
    it('should focus the textarea when autofocus is true', () => {
      cy.mount<McTextarea>(`<mc-textarea label="${label}" autofocus></mc-textarea>`).as('mc-textarea');
      
      // Check that the textarea has the autofocus attribute
      cy.get('@mc-textarea').find('textarea').should('have.attr', 'autofocus');
    });

    it('should not have autofocus attribute when autofocus is false', () => {
      cy.mount<McTextarea>(`<mc-textarea label="${label}"></mc-textarea>`).as('mc-textarea');
      
      // Check that the textarea does not have the autofocus attribute
      cy.get('@mc-textarea').find('textarea').should('not.have.attr', 'autofocus');
    });
  });

  describe('CSS parts exposure', () => {
    beforeEach(() => {
      cy.mount<McTextarea>(`<mc-textarea label="${label}"></mc-textarea>`).as('mc-textarea');
    });

    it('should expose the textarea part for CSS styling', () => {
      cy.get('@mc-textarea').find('textarea').should('have.attr', 'part', 'textarea');
    });

    it('should expose the field part for CSS styling', () => {
      cy.get('@mc-textarea').find('.field').should('have.attr', 'part', 'field');
    });
  });
});
