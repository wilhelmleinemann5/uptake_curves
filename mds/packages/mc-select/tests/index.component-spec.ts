import { html } from 'lit';
import { until } from 'lit/directives/until.js';
import { McSelect } from '../src';
import '../src';

import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';

const numbers = Array.from(Array(20).keys());
let options: string[] = [];
const hoverColor = 'rgb(240, 240, 240)';

context('mc-select', () => {
  describe('mounting and getting value', () => {
    describe('when options value is a primitive type', () => {
      beforeEach(() => {
        cy.mount<McSelect>(
          html`<mc-select name="select" label="Select item" .value=${'1'}>
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>
            <mc-option .value=${false}>Four</mc-option>
          </mc-select>`,
        ).as('mc-select');
      });
      it('mounts', () => {
        cy.get('@mc-select');
      });
      it('it sets the value on input when value passed', () => {
        cy.get('@mc-select').find('input').should('have.value', '1');
        cy.get('@mc-select').find('mc-option').as('options');
        cy.get('@options').eq(0).should('have.attr', 'selected');
        cy.get('@options').eq(1).should('not.have.attr', 'selected');
        cy.get('@options').eq(2).should('not.have.attr', 'selected');
        cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'One');
      });

      it('it sets the value on input when value changed programmatically', () => {
        cy.get('@mc-select').invoke('prop', 'value', '2');
        cy.get('@mc-select').find('mc-option').as('options');
        cy.get('@mc-select').find('input').should('have.value', '2');
        cy.get('@options').eq(0).should('not.have.attr', 'selected');
        cy.get('@options').eq(1).should('have.attr', 'selected');
        cy.get('@options').eq(2).should('not.have.attr', 'selected');
        cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Two');
      });

      it('it re-sets the value on input to empty string programmatically', () => {
        cy.get('@mc-select').invoke('prop', 'value', '');
        cy.get('@mc-select').find('mc-option').as('options');
        cy.get('@mc-select').find('input').should('have.value', '');
        cy.get('@options').eq(0).should('not.have.attr', 'selected');
        cy.get('@options').eq(1).should('not.have.attr', 'selected');
        cy.get('@options').eq(2).should('not.have.attr', 'selected');
        cy.get('@mc-select').find('.selected-option-label').should('not.exist');
      });

      it('it sets the value on enter', () => {
        cy.get('@mc-select').find('input[data-cy="input"]').as('input').focus();
        cy.focused().realPress('Space');
        cy.focused().realPress('ArrowDown');
        cy.focused().realPress('Enter');
        cy.get('@mc-select').find('input[data-cy="input"]').as('input').focus();
        cy.get('@mc-select').find('input').should('have.value', '2');
        cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Two');
      });

      it('it sets the value on click', () => {
        cy.get('@mc-select').then(() => {
          cy.get('@mc-select').find('mc-option').eq(1).as('second-list-item');
          cy.get('@second-list-item').then(($el) => {
            $el.get(0).click();
            cy.get('@mc-select').find('input').should('have.value', '2');
            cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Two');
          });
        });
      });

      it('sets the selected Label correctly, when an option with a boolean value "false" was selected', () => {
        cy.get('@mc-select').find('input[data-cy="input"]').as('input').focus();
        cy.focused().realPress('Space');
        cy.focused().realPress('ArrowDown');
        cy.focused().realPress('ArrowDown');
        cy.focused().realPress('ArrowDown');
        cy.focused().realPress('Enter');
        cy.get('@mc-select').find('mc-option').as('options');
        cy.get('@options').eq(0).should('not.have.attr', 'selected');
        cy.get('@options').eq(1).should('not.have.attr', 'selected');
        cy.get('@options').eq(2).should('not.have.attr', 'selected');
        cy.get('@options').eq(3).should('have.attr', 'selected');
        cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Four');
      });
    });
    describe('when options value is an object', () => {
      it('selects the option with the matching object value', () => {
        const fruits = [
          { name: 'Apple', color: 'red' },
          { name: 'Banana', color: 'yellow' },
          { name: 'Orange', color: 'orange' },
        ];

        const selectedFruit = { name: 'Banana', color: 'yellow' };

        cy.mount<McSelect>(
          html`<mc-select name="select" label="Select item" .value=${selectedFruit}>
            ${fruits.map((fruit) => html`<mc-option .value=${fruit}>${fruit.name}</mc-option>`)}
          </mc-select>`,
        ).as('mc-select');
        cy.get('@mc-select').find('mc-option').as('options');
        cy.get('@mc-select').find('input').should('have.value', JSON.stringify(selectedFruit));
        cy.get('@options').eq(0).should('not.have.attr', 'selected');
        cy.get('@options').eq(1).should('have.attr', 'selected');
        cy.get('@options').eq(2).should('not.have.attr', 'selected');
        cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Banana');
      });
    });
  });

  describe('setting single value after getting options from setTimeout', () => {
    beforeEach(() => {
      type Column = {
        columnId: string;
        name: string;
      };
      const fetchColumnsWithTimeout = (): Promise<Column[]> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { columnId: '4', name: 'Column 4' },
              { columnId: '5', name: 'Column 5' },
              { columnId: '6', name: 'Column 6' },
            ]);
          }, 500);
        });
      };
      cy.mount<McSelect>(
        html`<mc-select name="select" label="Items" value="5"
          >${until(
            fetchColumnsWithTimeout().then((columns) =>
              columns.map((column) => html`<mc-option value="${column.columnId}">${column.name}</mc-option>`),
            ),
            html`<span>Loading...</span>`,
          )}</mc-select
        >`,
      );
      cy.get('mc-select').as('mc-select');
      cy.get('@mc-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-select').find('input.input').should('have.value', '5');
      cy.get('@options').eq(0).should('not.have.attr', 'selected');
      cy.get('@options').eq(1).should('have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Column 5');
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      const blurEventHandlerSpy = cy.spy().as('onBlurEventSpy');
      cy.mount<McSelect>(
        html`<button id="outer-element">outer element</button>
          <mc-select name="select" label="Select item" @blur="${(): void => blurEventHandlerSpy()}"
            >${numbers.map((number) => html`<mc-option value="${number}" label="${number}"></mc-option>`)}</mc-select
          >`,
      );
      cy.get('mc-select').as('mc-select');
      cy.get('@mc-select').find('mc-option').as('options');
      cy.get('@mc-select').find('input[data-cy="input"]').as('input').focus();
    });
    it('it navigates with keyboard to 15 option, selects it', () => {
      cy.realPress('Space');
      cy.get('@options').eq(0).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(1).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(2).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(3).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(4).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(5).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(6).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(7).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(8).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(9).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(10).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(11).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(12).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(13).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(14).should('have.focus');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(15).should('have.focus');
      cy.realPress('Enter');
      cy.get('@mc-select').find('input').should('have.value', '15');
      cy.get('@options').eq(15).should('have.selected');
      cy.realPress('Space');
      cy.get('@mc-select')
        .find('div[data-cy="content"]')
        .then(($el) => {
          expect($el[0].getClientRects()[0].bottom).lessThan(600);
        });
      // check focused
      cy.get('@options').eq(0).should('not.have.focus');
      cy.get('@options').eq(1).should('not.have.focus');
      cy.get('@options').eq(2).should('not.have.focus');
      cy.get('@options').eq(3).should('not.have.focus');
      cy.get('@options').eq(4).should('not.have.focus');
      cy.get('@options').eq(5).should('not.have.focus');
      cy.get('@options').eq(6).should('not.have.focus');
      cy.get('@options').eq(7).should('not.have.focus');
      cy.get('@options').eq(8).should('not.have.focus');
      cy.get('@options').eq(9).should('not.have.focus');
      cy.get('@options').eq(10).should('not.have.focus');
      cy.get('@options').eq(11).should('not.have.focus');
      cy.get('@options').eq(12).should('not.have.focus');
      cy.get('@options').eq(13).should('not.have.focus');
      cy.get('@options').eq(14).should('not.have.focus');
      cy.get('@options').eq(15).should('have.focus');
      cy.get('@options').eq(15).should('be.visible');
      cy.get('@options').eq(16).should('not.have.focus');
      cy.get('@options').eq(17).should('not.have.focus');
      cy.get('@options').eq(18).should('not.have.focus');
      cy.get('@options').eq(19).should('not.have.focus');
      // navigate with arrow up and select 14
      cy.realPress('ArrowUp');
      cy.realPress('Enter');
      cy.get('@mc-select').find('input').should('have.value', '14');
      cy.get('@options').eq(14).should('have.selected');
      cy.get('@options').eq(15).should('not.have.selected');
      cy.realPress('Space');
      cy.get('@options').eq(14).should('have.focus');
      cy.get('@options').eq(15).should('not.have.focus');
    });
    it('closes dropdown on blur (tab) and dispatches one single blur event', () => {
      cy.realPress('Space');
      cy.get('@options').eq(0).should('have.focus');
      cy.realPress('Tab');
      cy.get('@input').should('not.have.focus');
      cy.get('@options').eq(0).should('not.have.focus');
      cy.get('@options').eq(0).should('not.be.visible');
      cy.get('@onBlurEventSpy').its('callCount').should('eq', 1);
    });
  });

  describe('mouse navigation', () => {
    beforeEach(() => {
      const blurEventHandlerSpy = cy.spy().as('onBlurEventSpy');
      cy.mount<McSelect>(
        html`<button id="focus">Focus</button>
          <mc-select name="select" label="Select item" @blur="${(): void => blurEventHandlerSpy()}">
            ${numbers.map((number) => html`<mc-option value="${number}" label="${number}"></mc-option>`)}
          </mc-select>`,
      );
      cy.get('mc-select').as('mc-select');
      cy.get('@mc-select').find('mc-option').as('options');
      cy.get('@mc-select').find('input[data-cy="input"]').as('input').click();
    });

    it('it moves mouse over 0 option', () => {
      cy.get('@options').eq(0).realHover('mouse');
      cy.get('@options').eq(0).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(1).realHover('mouse');
      cy.get('@options').eq(1).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(2).realHover('mouse');
      cy.get('@options').eq(2).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(3).realHover('mouse');
      cy.get('@options').eq(3).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(4).realHover('mouse');
      cy.get('@options').eq(4).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(5).realHover('mouse');
      cy.get('@options').eq(5).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(6).realHover('mouse');
      cy.get('@options').eq(6).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(7).realHover('mouse');
      cy.get('@options').eq(7).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(8).realHover('mouse');
      cy.get('@options').eq(8).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(9).realHover('mouse');
      cy.get('@options').eq(9).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(10).realHover('mouse');
      cy.get('@options').eq(10).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(11).realHover('mouse');
      cy.get('@options').eq(11).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(12).realHover('mouse');
      cy.get('@options').eq(12).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(13).realHover('mouse');
      cy.get('@options').eq(13).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(14).realHover('mouse');
      cy.get('@options').eq(14).find('button').should('have.css', 'background-color', hoverColor);
    });

    it('it moves mouse over 15 option, selects it', () => {
      cy.get('@options').eq(15).realHover('mouse');
      cy.get('@options').eq(15).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(15).click();
      cy.get('@mc-select').find('input').should('have.value', '15');
      cy.get('@options').eq(15).should('have.selected');
    });
    it('closes dropdown on blur (click outside the component)', () => {
      cy.get('@options').eq(0).realHover('mouse');
      cy.get('@options').eq(0).should('have.focused');
      cy.get('#focus').click();
      cy.get('@input').should('not.have.focus');
      cy.get('@options').eq(0).should('not.be.visible');
      cy.get('@onBlurEventSpy').its('callCount').should('eq', 1);
    });
    it('focuses on the inner input when initially the first option is selected and the focus transitions from outside to the component', () => {
      cy.get('@mc-select').invoke('prop', 'value', '0');
      cy.get('#focus').click();
      cy.realPress('Tab');
      cy.get('@input').should('have.focus');
    });
  });

  describe('combined mouse & keyboard navigation', () => {
    beforeEach(() => {
      cy.mount<McSelect>(
        html`<mc-select name="select" label="Select item"
          >${numbers.map((number) => html`<mc-option value="${number}" label="${number}"></mc-option>`)}</mc-select
        >`,
      ).as('mc-select');
      cy.get('@mc-select').find('mc-option').as('options');
      cy.get('@mc-select').find('input[data-cy="input"]').as('input').click();
    });
    it('it moves mouse over 5 option, press arrow down, selects by enter item 6', () => {
      cy.get('@options').eq(5).realHover('mouse');
      cy.get('@options').eq(5).find('button').should('have.css', 'background-color', hoverColor);
      cy.realPress('ArrowDown');
      cy.realPress('Enter');
      cy.get('@mc-select').find('input').should('have.value', '6');
      cy.get('@options').eq(6).should('have.selected');
    });
    it('it navigates to 5 option, moves mouse over item 6 and selects it', () => {
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(5).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(6).realHover('mouse');
      cy.get('@options').eq(6).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(6).click();
      cy.get('@mc-select').find('input').should('have.value', '6');
      cy.get('@options').eq(6).should('have.selected');
    });
  });

  describe('with placeholder text', () => {
    beforeEach(() => {
      cy.mount<McSelect>(
        html`<mc-select name="select" label="Select item" placeholder="Select number of containers">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-select>`,
      ).as('mc-select');
    });
    it('it shows placeholder text on initial render', () => {
      cy.get('@mc-select').find('input').should('have.value', '');
      cy.get('@mc-select').find('.selected-option-label').should('not.exist');
      cy.get('@mc-select').find('mc-option').as('options');
      cy.get('@options').eq(-1).should('have.value', 'null');
      cy.get('@options').eq(-1).should('have.attr', 'label', 'Select number of containers');
    });
    it('it resets the value back to null on placeholder text select', () => {
      cy.get('@mc-select').invoke('prop', 'value', '2');
      cy.get('@mc-select').find('input').should('have.value', '2');
      cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Two');
      cy.get('@mc-select').then(() => {
        cy.get('@mc-select').find('mc-option').eq(-1).as('placeholder-item');
        cy.get('@placeholder-item').then(($el) => {
          $el.get(0).click();
          cy.get('@mc-select').invoke('prop', 'value').should('be.empty');
          cy.get('@mc-select').find('.selected-option-label').should('not.exist');
        });
      });
    });
  });

  describe('clear button', () => {
    beforeEach(() => {
      cy.mount<McSelect>(
        html`<button id="element-outside-of-select">Focus</button>
          <mc-select clearbutton name="select" label="Select item" placeholder="Select number of containers">
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>
          </mc-select>`,
      );
      cy.get('mc-select').as('mc-select');
      cy.get('@mc-select').invoke('prop', 'value', '2');
      cy.get('@mc-select').find('mc-option').as('options');
      cy.get('@mc-select').find('.selected-option-label').find('div').as('selected-option-label');
      cy.get('@mc-select').find('input[data-cy="input"]').as('input');
      cy.get('@mc-select').find('[data-cy=clearButton]').as('clear-button');
      cy.get('#element-outside-of-select').as('element-outside-of-select');
    });

    it('it resets the value back to null upon clear button press', () => {
      cy.get('@mc-select').invoke('prop', 'value', '2');
      cy.get('@input').should('have.value', '2');
      cy.get('@selected-option-label').should('contain.text', 'Two');
      cy.get('@clear-button').click({ force: true });
      cy.get('@mc-select').invoke('prop', 'value').should('be.empty');
      cy.get('@mc-select').find('.selected-option-label').should('not.exist');
    });

    it('options dropdown closes when the clear button is pressed', () => {
      cy.get('@input').click({ force: true });
      cy.get('@clear-button').click({ force: true });

      cy.get('@mc-select').invoke('prop', 'value').should('be.empty');
      cy.get('@mc-select').find('.selected-option-label').should('not.exist');
      cy.get('@options').should('not.be.visible');
    });

    it('clear button stays visible after blurring away from the select', () => {
      cy.get('@mc-select').realClick();
      cy.get('@options').eq(1).realClick();
      cy.get('@selected-option-label').should('contain.text', 'Two');
      cy.get('@clear-button').should('be.visible');
      cy.get('#element-outside-of-select').realClick();

      cy.get('@clear-button').should('be.visible');
    });

    it('backspace should clear the value when the clearbutton is enabled', () => {
      cy.get('@mc-select').realClick();
      cy.get('@options').eq(1).realClick();
      cy.get('@selected-option-label').should('contain.text', 'Two');
      cy.get('@clear-button').should('be.visible');
      cy.get('@mc-select').realType('{backspace}');
      cy.get('@mc-select').invoke('prop', 'value').should('be.empty');
      cy.get('@clear-button').should('not.exist');
    });

    it('backspace should not clear the value when the clearbutton is disabled', () => {
      cy.get('@mc-select').invoke('prop', 'clearbutton', false);
      cy.get('@mc-select').realClick();
      cy.get('@options').eq(1).realClick();
      cy.get('@selected-option-label').should('contain.text', 'Two');
      cy.get('@clear-button').should('not.exist');
      cy.get('@mc-select').realType('{backspace}');
      cy.get('@mc-select').invoke('prop', 'value').should('eq', '2');
    });
  });

  it('dispatches an "input" event when option is selected', () => {
    const eventHandlerSpy = cy.spy().as('onEventSpy');
    cy.mount<McSelect>(
      html`<mc-select label="Select item" @input="${(e): void => eventHandlerSpy(e.target.value)}">
        <mc-option value="1">One</mc-option>
        <mc-option value="2">Two</mc-option>
        <mc-option value="3">Three</mc-option>
      </mc-select>`,
    ).as('mc-select');
    cy.get('@mc-select').then(() => {
      cy.get('@mc-select').find('mc-option').eq(1).as('second-list-item');
      cy.get('@second-list-item').then(($el) => {
        $el.get(0).click();
        cy.get('@onEventSpy').its('callCount').should('eq', 1);
        cy.get('@onEventSpy').should('have.been.calledWithMatch', '2');
      });
    });
  });

  it('dispatches a "optionselected" event when option is selected', () => {
    const eventHandlerSpy = cy.spy().as('onEventSpy');
    const blurEventHandlerSpy = cy.spy().as('onBlurEventSpy');
    cy.mount<McSelect>(
      html`<mc-select
        label="Select item"
        @optionselected="${(e): void => eventHandlerSpy(e)}"
        @blur="${(e): void => blurEventHandlerSpy(e)}"
      >
        <mc-option value="1">One</mc-option>
        <mc-option value="2">Two</mc-option>
        <mc-option value="3">Three</mc-option>
      </mc-select>`,
    ).as('mc-select');
    cy.get('@mc-select').then(() => {
      cy.get('@mc-select').find('mc-option').eq(1).as('second-list-item');
      cy.get('@second-list-item').then(($el) => {
        $el.get(0).click();
        cy.get('@onBlurEventSpy').its('callCount').should('eq', 0);
        cy.get('@onEventSpy').its('callCount').should('eq', 1);
        cy.get('@onEventSpy').should('have.been.calledWithMatch', {
          detail: { label: 'Two', value: '2' },
        });
      });
    });
  });

  it('dispatches a "opened" and "closed" events when popover toggles', () => {
    const eventOpenedHandlerSpy = cy.spy().as('onOpenedEventSpy');
    const eventClosedHandlerSpy = cy.spy().as('onClosedEventSpy');
    cy.mount<McSelect>(
      html`<mc-select
        label="Select item"
        @opened="${(e): void => eventOpenedHandlerSpy(e)}"
        @closed="${(e): void => eventClosedHandlerSpy(e)}"
      >
        <mc-option value="1">One</mc-option>
        <mc-option value="2">Two</mc-option>
        <mc-option value="3">Three</mc-option>
      </mc-select>`,
    ).as('mc-select');
    cy.get('@mc-select').click();
    cy.get('@onOpenedEventSpy').its('callCount').should('eq', 1);
    cy.get('@onOpenedEventSpy').should('have.been.calledWithMatch', {
      detail: true,
    });
    cy.get('@mc-select').click();
    cy.get('@onClosedEventSpy').its('callCount').should('eq', 1);
    cy.get('@onClosedEventSpy').should('have.been.calledWithMatch', {
      detail: true,
    });
  });

  describe('dynamic options', () => {
    beforeEach(() => {
      cy.mount<McSelect>(
        html`<mc-select name="select" label="Select item">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-select>`,
      ).as('mc-select');
      cy.get('@mc-select').then(($el) => {
        const mcSelect = $el[0];
        options = [];
        for (let index = 0; index < [0, 1, 2, 3].length; index++) {
          const option = document.createElement('mc-option');
          const optionValue = Math.random().toString(36).slice(2);
          options.push(optionValue);
          option.value = optionValue;
          option.innerText = optionValue;
          mcSelect?.append(option);
        }
      });
      cy.get('@mc-select').find('mc-option').as('options');
    });
    it('adds options programmatically', () => {
      cy.get('@options').eq(3).should('have.value', options[0]);
      cy.get('@options').eq(3).contains(options[0]);
      cy.get('@options').eq(4).should('have.value', options[1]);
      cy.get('@options').eq(4).contains(options[1]);
      cy.get('@options').eq(5).should('have.value', options[2]);
      cy.get('@options').eq(5).contains(options[2]);
      cy.get('@options').eq(6).should('have.value', options[3]);
      cy.get('@options').eq(6).contains(options[3]);
    });
    it('can select added dynamic option', () => {
      cy.get('@mc-select').then(() => {
        cy.get('@mc-select').find('mc-option').eq(3).as('new-list-item');
        cy.get('@new-list-item').then(($el) => {
          $el.get(0).click();
          cy.get('@mc-select').find('input').should('have.value', options[0]);
          cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', options[0]);
        });
      });
    });
    it('removes options programmatically', () => {
      cy.get('@options').eq(6).invoke('remove');
      cy.get('@options').eq(5).invoke('remove');
      cy.get('@options').eq(4).invoke('remove');
      cy.get('@options').eq(3).invoke('remove');
      cy.get('@options').should('have.length', 3);
    });
  });

  describe('options as html', () => {
    beforeEach(() => {
      cy.mount<McSelect>(
        html`<mc-select name="select" label="Select item" .value=${'1'}>
          <mc-option value="1"><strong>1</strong>One<strong>1</strong></mc-option>
          <mc-option value="2"><strong>2</strong>Two<strong>2</strong></mc-option>
          <mc-option value="3"><strong>3</strong>Three<strong>3</strong></mc-option>
        </mc-select>`,
      ).as('mc-select');
    });
    it('it sets the value on input and display label without html on click', () => {
      cy.get('@mc-select').then(() => {
        cy.get('@mc-select').find('mc-option').eq(1).as('second-list-item');
        cy.get('@second-list-item').then(($el) => {
          $el.get(0).click();
          cy.get('@mc-select').find('input').should('have.value', '2');
          cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Two');
          cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', '2');
        });
      });
    });

    it('it sets the value on input when value changed programmatically', () => {
      cy.get('@mc-select').invoke('prop', 'value', '2');
      cy.get('@mc-select').find('mc-option').as('options');
      cy.get('@mc-select').find('input').should('have.value', '2');
      cy.get('@options').eq(0).should('not.have.attr', 'selected');
      cy.get('@options').eq(1).should('have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Two');
      cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', '2');
    });
  });

  it('no options', () => {
    cy.mount<McSelect>(html`<mc-select name="select" label="Select item"></mc-select>`).as('mc-select');
    cy.get('@mc-select').find('.options-empty').should('contain.text', 'No options available');
  });

  describe('focus on option when typing alphanumeric', () => {
    beforeEach(() => {
      const inputEventHandlerSpy = cy.spy().as('onInputEventSpy');
      const optionselectedEventHandlerSpy = cy.spy().as('onOptionselectedEventSpy');
      cy.mount<McSelect>(
        html`<mc-select
          name="select"
          label="Select item"
          @input="${(e): void => inputEventHandlerSpy(e.target.value)}"
          @optionselected="${(e): void => optionselectedEventHandlerSpy(e)}"
          ><mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <mc-option value="4">Four</mc-option>
          <mc-option value="5"><b>F</b>ive</mc-option>
        </mc-select>`,
      ).as('mc-select');
      cy.get('@mc-select').find('mc-option').as('options');
      cy.get('@mc-select').find('input[data-cy="input"]').as('input');
    });
    it('focus on specific option when popover open', () => {
      cy.get('@input').click();
      cy.realPress('KeyF');
      cy.get('@options').eq(3).should('have.focus');

      cy.wait(500);

      cy.realPress('KeyT').realPress('KeyH');
      cy.get('@options').eq(2).should('have.focus');

      cy.wait(500);

      cy.realPress('KeyO');
      cy.get('@options').eq(0).should('have.focus');
      cy.realPress('Enter');
      cy.get('@onInputEventSpy').its('callCount').should('eq', 1);
      cy.get('@onInputEventSpy').should('have.been.calledWithMatch', '1');
      cy.get('@onOptionselectedEventSpy').its('callCount').should('eq', 1);
      cy.get('@onOptionselectedEventSpy').should('have.been.calledWithMatch', {
        detail: { label: 'One', value: '1' },
      });
    });
    it('sets value of matched option & fires event when popover close', () => {
      cy.get('@input').focus();
      cy.realPress('KeyF');
      cy.get('@options').eq(3).should('have.attr', 'selected');
      cy.get('@mc-select').find('input').should('have.value', '4');
      cy.get('@mc-select').find('.selected-option-label').find('div').should('contain.text', 'Four');
      cy.get('@onInputEventSpy').its('callCount').should('eq', 1);
      cy.get('@onInputEventSpy').should('have.been.calledWithMatch', '4');
      cy.get('@onOptionselectedEventSpy').its('callCount').should('eq', 1);
      cy.get('@onOptionselectedEventSpy').should('have.been.calledWithMatch', {
        detail: { label: 'Four', value: '4' },
      });
    });
    it('matches options with html', () => {
      cy.get('@input').click();
      cy.realPress('KeyF').realPress('KeyI');
      cy.get('@options').eq(4).should('have.focus');
    });
  });
});
