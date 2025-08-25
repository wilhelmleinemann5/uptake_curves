import { html } from 'lit';
import { until } from 'lit/directives/until.js';
import { McMultiSelect } from '../src';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';
import '@maersk-global/mds-components-core-option';
import '../src';

const numbers = Array.from(Array(20).keys());
let options: string[] = [];
const hoverColor = 'rgb(240, 240, 240)';

context('mc-multi-select', () => {
  describe('getting and setting single value as array', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<button id="focus">Focus</button
          ><mc-multi-select name="select" label="Items" .value="${['1']}">
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>
          </mc-multi-select>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '1');
      cy.get('@options').eq(0).should('have.attr', 'selected');
      cy.get('@options').eq(1).should('not.have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '1 out of 3 selected');
    });

    it('it sets the value on input when value changed programmatically', () => {
      cy.get('@mc-multi-select').invoke('prop', 'value', ['2']);
      cy.get('@mc-multi-select').find('input').should('have.value', '["2"]');
      cy.get('@options').eq(0).should('not.have.attr', 'selected');
      cy.get('@options').eq(1).should('have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '1 out of 3 selected');
    });

    it('it selects all items when select all button clicked', () => {
      cy.get('@mc-multi-select').then(() => {
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(-1)
          .then(($el) => {
            $el.get(0).click();
            cy.get('@mc-multi-select').find('input').should('have.value', '["1","2","3"]');
            cy.get('@mc-multi-select')
              .find('.selected-option-label')
              .find('div')
              .should('have.text', '3 out of 3 selected');
          });
      });
    });

    it('it deselects all items when deselect all button clicked', () => {
      cy.get('@mc-multi-select').then(() => {
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(-1)
          .then(($el) => {
            $el.get(0).click();
            $el.get(0).click();
            cy.get('@mc-multi-select').find('input').should('have.value', '[]');
            cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '');
          });
      });
    });

    it('it sets the value on space or enter key', () => {
      cy.get('#focus').focus();
      // get to the select field
      cy.focused().realPress('Tab');
      // open dropdown
      cy.focused().realPress('Space');
      // is on item 0 and deselect it
      cy.focused().realPress('Space');
      cy.get('@options').eq(0).should('not.have.selected');
      // is on item 0 and selects it
      cy.focused().realPress('Enter');
      cy.get('@options').eq(0).should('have.selected');
      // navigates to item 1 and select it
      cy.focused().realPress('ArrowDown');
      cy.focused().realPress('Space');
      cy.get('@options').eq(1).should('have.selected');
      // navigates to item 2 and select it
      cy.focused().realPress('ArrowDown');
      cy.focused().realPress('Enter');
      cy.get('@options').eq(2).should('have.selected');
      cy.get('@mc-multi-select').find('input').should('have.value', '["1","2","3"]');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '3 out of 3 selected');
    });

    it('it sets the value on click', () => {
      cy.get('@mc-multi-select').find('input[data-cy="input"]').as('inner-input').click();
      cy.get('@options').eq(1).click();
      cy.get('@options').eq(1).should('have.selected');
      cy.get('@options').eq(2).click();
      cy.get('@options').eq(2).should('have.selected');
      cy.get('@mc-multi-select').find('input').should('have.value', '["1","2","3"]');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '3 out of 3 selected');
    });
  });

  describe('setting single value as string', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" value="1">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '1');
      cy.get('@options').eq(0).should('have.attr', 'selected');
      cy.get('@options').eq(1).should('not.have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '1 out of 3 selected');
    });
  });

  describe('setting value as comma separated string', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" value="1,2">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '1,2');
      cy.get('@options').eq(0).should('have.attr', 'selected');
      cy.get('@options').eq(1).should('have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '2 out of 3 selected');
    });
  });

  describe('setting single value as number', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" .value=${1}>
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '1');
      cy.get('@options').eq(0).should('have.attr', 'selected');
      cy.get('@options').eq(1).should('not.have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '1 out of 3 selected');
    });
  });

  describe('setting multiple values as array of objects', () => {
    beforeEach(() => {
      const fruits = [
        { name: 'Apple', color: 'red' },
        { name: 'Banana', color: 'yellow' },
        { name: 'Orange', color: 'orange' },
      ];

      const selectedFruits = [
        { name: 'Banana', color: 'yellow' },
        { name: 'Orange', color: 'orange' },
      ];

      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Select item" .value=${selectedFruits}>
          ${fruits.map((fruit) => html`<mc-option .value=${fruit}>${fruit.name}</mc-option>`)}
        </mc-multi-select>`,
      ).as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });

    it('it sets the state of the component to the selected values', () => {
      cy.get('@options').eq(0).should('not.have.attr', 'selected');
      cy.get('@options').eq(1).should('have.attr', 'selected');
      cy.get('@options').eq(2).should('have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '2 out of 3 selected');
    });
  });

  describe('setting single value that is disabled option', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" value="1">
          <mc-option value="1" disabled>One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '1');
      cy.get('@options').eq(0).should('have.attr', 'selected');
      cy.get('@options').eq(1).should('not.have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '1 out of 3 selected');
    });
    it('it does not select or deselect the disabled option, when select/deselect button clicked', () => {
      cy.get('@mc-multi-select').then(() => {
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(-1)
          .then(($el) => {
            $el.get(0).click();
            cy.get('@mc-multi-select').find('input').should('have.value', '["1","2","3"]');
            cy.get('@mc-multi-select')
              .find('.selected-option-label')
              .find('div')
              .should('have.text', '3 out of 3 selected');
          });
      });
      cy.get('@mc-multi-select').then(() => {
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(-1)
          .then(($el) => {
            $el.get(0).click();
            cy.get('@mc-multi-select').find('input').should('have.value', '["1"]');
            cy.get('@mc-multi-select')
              .find('.selected-option-label')
              .find('div')
              .should('have.text', '1 out of 3 selected');
          });
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
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" value="5"
          >${until(
            fetchColumnsWithTimeout().then((columns) =>
              columns.map((column) => html`<mc-option value="${column.columnId}">${column.name}</mc-option>`),
            ),
            html`<span>Loading...</span>`,
          )}</mc-multi-select
        >`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '5');
      cy.get('@options').eq(0).should('not.have.attr', 'selected');
      cy.get('@options').eq(1).should('have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '1 out of 3 selected');
    });
  });

  describe('getting and setting multiple values as array', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" .value="${['1', '2']}">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      ).as('mc-multi-select');
    });
    it('it sets the multiple values on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '1,2');
      cy.get('@mc-multi-select').find('mc-option').as('option-items');
      cy.get('@option-items').eq(0).should('have.attr', 'selected');
      cy.get('@option-items').eq(1).should('have.attr', 'selected');
      cy.get('@option-items').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '2 out of 3 selected');
    });

    it('it sets the value on input when value changed programmatically', () => {
      cy.get('@mc-multi-select').invoke('prop', 'value', ['2', '3']);
      cy.get('@mc-multi-select').find('mc-option').as('option-items');
      cy.get('@mc-multi-select').find('input').should('have.value', '["2","3"]');
      cy.get('@option-items').eq(0).should('not.have.attr', 'selected');
      cy.get('@option-items').eq(1).should('have.attr', 'selected');
      cy.get('@option-items').eq(2).should('have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '2 out of 3 selected');
    });

    it('it sets the value on click select', () => {
      cy.get('@mc-multi-select').then(() => {
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(2)
          .then(($el) => {
            $el.get(0).click();
            cy.get('@mc-multi-select').find('input').should('have.value', '["1","2","3"]');
            cy.get('@mc-multi-select')
              .find('.selected-option-label')
              .find('div')
              .should('have.text', '3 out of 3 selected');
          });
      });
    });
    it('it sets the value on click deselect', () => {
      cy.get('@mc-multi-select').then(() => {
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(2)
          .find('mc-checkbox')
          .then(($el) => {
            $el.get(0).click();
            cy.get('@mc-multi-select').find('input').should('have.value', '["1","2"]');
            cy.get('@mc-multi-select')
              .find('.selected-option-label')
              .find('div')
              .should('have.text', '2 out of 3 selected');
          });
      });
    });
  });

  describe('setting multiple value as string', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" value="1,2">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
    });
    it('it sets the single value on input when value passed', () => {
      cy.get('@mc-multi-select').find('input.input').should('have.value', '1,2');
      cy.get('@options').eq(0).should('have.attr', 'selected');
      cy.get('@options').eq(1).should('have.attr', 'selected');
      cy.get('@options').eq(2).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('.selected-option-label').find('div').should('have.text', '2 out of 3 selected');
    });
  });

  describe('with placeholder text', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Items" placeholder="Select number of containers">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      ).as('mc-multi-select');
    });
    it('it shows placeholder text on initial render', () => {
      cy.get('@mc-multi-select').find('input').should('have.value', '');
      cy.get('@mc-multi-select').find('.selected-option-label').should('not.exist');
      cy.get('@mc-multi-select').find('mc-option').as('option-items');
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Select item"
            >${numbers.map(
              (number) => html`<mc-option value="${number}" label="${number}"></mc-option>`,
            )}</mc-multi-select
          >
          <button id="outside-element">outside element</button>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
      cy.get('@mc-multi-select').find('input[data-cy="input"]').as('inner-input').focus();
    });
    it('it navigates with keyboard to 15 and 14 option, selects it', () => {
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
      // navigates to item 14 and selects it
      cy.realPress('ArrowDown');
      cy.get('@options').eq(14).should('have.focus');
      cy.realPress('Enter');
      cy.get('@options').eq(14).should('have.selected');
      cy.get('@mc-multi-select').find('input').should('have.value', '["14"]');
      // navigates to item 15 and selects it
      cy.realPress('ArrowDown');
      cy.get('@options').eq(15).should('have.focus');
      cy.realPress('Enter');
      cy.get('@options').eq(15).should('have.selected');
      cy.get('@mc-multi-select').find('input').should('have.value', '["14","15"]');
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
    });
    it('it sets list in the middle when values selected and popover open', () => {
      cy.get('@mc-multi-select').invoke('prop', 'value', ['14', '15']);
      cy.realPress('Space');
      cy.get('@options').eq(14).should('have.focus');
      cy.get('@options').eq(14).should('have.selected');
      cy.get('@options').eq(14).should('be.visible');
      cy.get('@options').eq(15).should('have.selected');
      cy.get('@options').eq(15).should('be.visible');
      // check bounding rectangle and see if selected elements are in focus
      cy.get('@mc-multi-select')
        .find('div[data-cy="content"]')
        .then(($el) => {
          expect($el[0].getClientRects()[0].bottom).lessThan(600);
        });
    });
    it('closes dropdown on blur (tab)', () => {
      cy.get('@mc-multi-select').invoke('prop', 'value', ['15']);
      cy.get('@inner-input').focus();
      cy.realPress('Space');
      cy.realPress('ArrowDown');
      cy.get('@options')
        .eq(16)
        .then(($el) => {
          cy.wrap($el[0]).should('have.focus');
        });
      cy.get('@options')
        .eq(16)
        .then(($el) => {
          cy.wrap($el[0]).should('be.visible');
        });
      cy.realPress('Tab');
      cy.get('@inner-input').then(($el) => {
        cy.wrap($el[0]).should('not.have.focus');
      });
      cy.get('@options')
        .eq(16)
        .then(($el) => {
          cy.wrap($el[0]).should('not.have.focus');
        });
      cy.get('@options')
        .eq(16)
        .then(($el) => {
          cy.wrap($el[0]).should('not.have.focus');
        });
    });
  });

  describe('mouse navigation', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<button id="focus">Focus</button
          ><mc-multi-select name="select" label="Select item"
            >${numbers.map(
              (number) => html`<mc-option value="${number}" label="${number}"></mc-option>`,
            )}</mc-multi-select
          >`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
      cy.get('@mc-multi-select').find('input[data-cy="input"]').as('inner-input').click();
    });
    it('it moves mouse over 0 option', () => {
      cy.get('@options').eq(0).realHover('mouse');
      cy.get('@options').eq(0).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(1).realHover('mouse');
      cy.get('@options').eq(1).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(2).realHover('mouse');
      cy.get('@options').eq(2).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(3).realHover('mouse');
      cy.get('@options').eq(3).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(4).realHover('mouse');
      cy.get('@options').eq(4).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(5).realHover('mouse');
      cy.get('@options').eq(5).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(6).realHover('mouse');
      cy.get('@options').eq(6).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(7).realHover('mouse');
      cy.get('@options').eq(7).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(8).realHover('mouse');
      cy.get('@options').eq(8).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(9).realHover('mouse');
      cy.get('@options').eq(9).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(10).realHover('mouse');
      cy.get('@options').eq(10).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(11).realHover('mouse');
      cy.get('@options').eq(11).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(12).realHover('mouse');
      cy.get('@options').eq(12).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(13).realHover('mouse');
      cy.get('@options').eq(13).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(14).realHover('mouse');
      cy.get('@options').eq(14).find('label').should('have.css', 'background-color', hoverColor);
    });
    it('it moves mouse over 15 option, selects it', () => {
      cy.get('@options').eq(15).realHover('mouse');
      cy.get('@options').eq(15).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(15).click();
      cy.get('@mc-multi-select').find('input').should('have.value', '["15"]');
      cy.get('@options').eq(15).should('have.selected');
    });
    it('closes dropdown on blur (click outside the component)', () => {
      cy.get('@options').eq(1).realHover('mouse');
      cy.get('@options').eq(1).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('#focus').click();
      cy.get('@inner-input').should('not.have.focus');
      cy.get('@options').eq(1).should('not.be.visible');
    });
  });

  describe('combined mouse & keyboard navigation', () => {
    beforeEach(() => {
      cy.mount<McSelect>(
        html`<mc-multi-select name="select" label="Select item"
          >${numbers.map(
            (number) => html`<mc-option value="${number}" label="${number}"></mc-option>`,
          )}</mc-multi-select
        >`,
      ).as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
      cy.get('@mc-multi-select').find('input[data-cy="input"]').as('inner-input').click();
    });
    it('it moves mouse over 5 option, press arrow down, selects by enter item 6', () => {
      cy.get('@options').eq(5).realHover('mouse');
      cy.get('@options').eq(5).find('label').should('have.css', 'background-color', hoverColor);
      cy.realPress('ArrowDown');
      cy.realPress('Enter');
      cy.get('@mc-multi-select').find('input').should('have.value', '["6"]');
      cy.get('@options').eq(6).should('have.selected');
    });
    it('it navigates to 5 option, moves mouse over item 6 and selects it', () => {
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(5).should('have.focus');
      cy.get('@options').eq(6).realHover('mouse');
      cy.get('@options').eq(6).find('label').should('have.css', 'background-color', hoverColor);
      cy.get('@options').eq(6).click();
      cy.get('@mc-multi-select').find('input').should('have.value', '["6"]');
      cy.get('@options').eq(6).should('have.selected');
    });
  });

  it('dispatches an "input" event when option is selected', () => {
    const eventHandlerSpy = cy.spy().as('onEventSpy');
    cy.mount<McMultiSelect>(
      html`<mc-multi-select label="Items" @input="${(e): void => eventHandlerSpy(e.target.value)}">
        <mc-option value="1">One</mc-option>
        <mc-option value="2">Two</mc-option>
        <mc-option value="3">Three</mc-option>
      </mc-multi-select>`,
    ).as('mc-multi-select');
    cy.get('@mc-multi-select').then(() => {
      cy.get('@mc-multi-select')
        .find('mc-option')
        .eq(1)
        .then(($el) => {
          $el.get(0).click();
          cy.get('@onEventSpy').its('callCount').should('eq', 1);
          cy.get('@onEventSpy').should('have.been.calledWithMatch', ['2']);
        });
    });
  });

  it('dispatches a "optionselected" event when option is selected', () => {
    const eventHandlerSpy = cy.spy().as('onEventSpy');
    cy.mount<McMultiSelect>(
      html`<mc-multi-select label="Items" @optionselected="${(e): void => eventHandlerSpy(e)}">
        <mc-option value="1">One</mc-option>
        <mc-option value="2">Two</mc-option>
        <mc-option value="3">Three</mc-option>
      </mc-multi-select>`,
    ).as('mc-multi-select');
    cy.get('@mc-multi-select').then(() => {
      cy.get('@mc-multi-select').click();
      cy.get('@mc-multi-select').find('mc-option').eq(1).click();
      cy.get('@mc-multi-select').find('mc-option').eq(2).click();
      cy.get('@onEventSpy').its('callCount').should('eq', 2);
      cy.get('@onEventSpy').should('have.been.calledWithMatch', {
        detail: [
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
        ],
      });
    });
  });

  it('dispatches a "opened" and "closed" events when popover toggles', () => {
    const eventOpenedHandlerSpy = cy.spy().as('onOpenedEventSpy');
    const eventClosedHandlerSpy = cy.spy().as('onClosedEventSpy');
    cy.mount<McMultiSelect>(
      html`<mc-multi-select
        label="Select item"
        @opened="${(e): void => eventOpenedHandlerSpy(e)}"
        @closed="${(e): void => eventClosedHandlerSpy(e)}"
      >
        <mc-option value="1">One</mc-option>
        <mc-option value="2">Two</mc-option>
        <mc-option value="3">Three</mc-option>
      </mc-multi-select>`,
    ).as('mc-multi-select');
    cy.get('@mc-multi-select').click();
    cy.get('@onOpenedEventSpy').its('callCount').should('eq', 1);
    cy.get('@onOpenedEventSpy').should('have.been.calledWithMatch', {
      detail: true,
    });
    cy.get('@mc-multi-select').click();
    cy.get('@onClosedEventSpy').its('callCount').should('eq', 1);
    cy.get('@onClosedEventSpy').should('have.been.calledWithMatch', {
      detail: true,
    });
  });

  describe('dynamic options', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<mc-multi-select name="select" label="Select item">
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-multi-select>`,
      ).as('mc-multi-select');
      cy.get('@mc-multi-select').then(($el) => {
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
      cy.get('@mc-multi-select').find('mc-option').as('options');
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
      cy.get('@mc-multi-select').then(() => {
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(3)
          .then(($el) => {
            $el.get(0).click();
          });
        cy.get('@mc-multi-select')
          .find('mc-option')
          .eq(4)
          .then(($el) => {
            $el.get(0).click();
          });
        cy.get('@mc-multi-select').find('input.input').should('have.value', `${options[0]},${options[1]}`);
        cy.get('@mc-multi-select')
          .find('.selected-option-label')
          .find('div')
          .should('have.text', '2 out of 7 selected');
      });
    });
    it('removes options programmatically', () => {
      cy.get('@options').eq(6).invoke('remove');
      cy.get('@options').eq(5).invoke('remove');
      cy.get('@options').eq(4).invoke('remove');
      cy.get('@options').eq(3).invoke('remove');
      cy.get('@options').should('have.length', 4);
    });
  });

  describe('focus on option when typing alphanumeric', () => {
    beforeEach(() => {
      const inputEventHandlerSpy = cy.spy().as('onInputEventSpy');
      const optionselectedEventHandlerSpy = cy.spy().as('onOptionselectedEventSpy');
      cy.mount<McMultiSelect>(
        html`<mc-multi-select
          name="select"
          label="Select item"
          @input="${(e): void => inputEventHandlerSpy(e.target.value)}"
          @optionselected="${(e): void => optionselectedEventHandlerSpy(e)}"
          ><mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
          <mc-option value="4">Four</mc-option>
          <mc-option value="5"><b>F</b>ive</mc-option>
        </mc-multi-select>`,
      ).as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
      cy.get('@mc-multi-select').find('input[data-cy="input"]').as('input');
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
      cy.get('@onInputEventSpy').should('have.been.calledWithMatch', ['1']);
      cy.get('@onOptionselectedEventSpy').its('callCount').should('eq', 1);
      cy.get('@onOptionselectedEventSpy').should('have.been.calledWithMatch', {
        detail: [{ label: 'One', value: '1' }],
      });
    });
    it('does not set value of matched option & fires event when popover close', () => {
      cy.get('@input').focus();
      cy.realPress('KeyF');
      cy.get('@options').eq(3).should('not.have.attr', 'selected');
      cy.get('@mc-multi-select').find('input').should('have.value', '');
      cy.get('@onInputEventSpy').its('callCount').should('eq', 0);
      cy.get('@onOptionselectedEventSpy').its('callCount').should('eq', 0);
    });
    it('matches options with html', () => {
      cy.get('@input').click();
      cy.realPress('KeyF').realPress('KeyI');
      cy.get('@options').eq(4).should('have.focus');
    });
  });

  describe('clear button', () => {
    beforeEach(() => {
      cy.mount<McMultiSelect>(
        html`<button id="element-outside-of-select">Focus</button>
          <mc-multi-select clearbutton name="select" label="Select item"
            ><mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>
            <mc-option value="4">Four</mc-option>
            <mc-option value="5"><b>F</b>ive</mc-option>
          </mc-multi-select>`,
      );
      cy.get('mc-multi-select').as('mc-multi-select');
      cy.get('@mc-multi-select').find('mc-option').as('options');
      cy.get('@mc-multi-select').find('input[data-cy="input"]').as('input');
      cy.get('#element-outside-of-select').as('element-outside-of-select');
    });

    it('it resets the value back to null upon clear button press', () => {
      cy.get('@mc-multi-select').invoke('prop', 'value', '2');
      cy.get('@input').should('have.value', '2');
      cy.get('@mc-multi-select').find('.selected-option-label').should('contain.text', '1 out of 5 selected');
      cy.get('@mc-multi-select').find('[data-cy=clearButton]').click({ force: true });

      cy.get('@mc-multi-select').invoke('prop', 'value').should('be.empty');
      cy.get('@mc-multi-select').find('.selected-option-label').should('not.exist');
    });

    it('options dropdown closes when the clear button is pressed', () => {
      cy.get('@mc-multi-select').invoke('prop', 'value', '2');
      cy.get('@input').click();
      cy.get('@mc-multi-select').find('[data-id="clearButton"]').realClick();

      cy.get('@mc-multi-select').invoke('prop', 'value').should('be.empty');
      cy.get('@mc-multi-select').find('.selected-option-label').should('not.exist');
      cy.get('@options').should('not.be.visible');
    });

    it('"Clear all" switches to "Select all" when the clear button is pressed', () => {
      cy.get('@mc-multi-select').invoke('prop', 'value', '2');
      cy.get('@input').click();
      cy.get('@mc-multi-select').find('[data-cy=clearButton]').click({ force: true });

      cy.get('@mc-multi-select').invoke('prop', 'value').should('be.empty');
      cy.get('@mc-multi-select').find('.selected-option-label').should('not.exist');
      cy.get('@options').should('not.be.visible');

      cy.get('@input').click();
      cy.get('@mc-multi-select').find('mc-option').eq(-1).should('contain.text', 'Select all');
    });

    it('clear button stays visible after blurring away from the select', () => {
      cy.get('@mc-multi-select').realClick();
      cy.get('@options').eq(1).realClick();
      cy.get('@mc-multi-select').find('.selected-option-label').should('contain.text', '1 out of 5 selected');
      cy.get('@mc-multi-select').find('[data-cy=clearButton]').should('be.visible');
      cy.get('#element-outside-of-select').click();

      cy.get('@mc-multi-select').find('[data-cy=clearButton]').should('be.visible');
    });

    it('backspace should clear the value', () => {
      cy.get('@mc-multi-select').realClick();
      cy.get('@options').eq(1).realClick();
      cy.get('@mc-multi-select').find('.selected-option-label').should('contain.text', '1 out of 5 selected');
      cy.get('@mc-multi-select').find('[data-cy=clearButton]').should('be.visible');
      cy.get('@mc-multi-select').realType('{backspace}');
      cy.get('@mc-multi-select').invoke('prop', 'value').should('be.empty');
      cy.get('@mc-multi-select').find('[data-cy=clearButton]').should('not.exist');
    });

    it('backspace should not clear the value, if the clear button is disabled', () => {
      cy.get('@mc-multi-select').invoke('prop', 'clearbutton', false);
      cy.get('@mc-multi-select').realClick();
      cy.get('@options').eq(1).realClick();
      cy.get('@mc-multi-select').find('.selected-option-label').should('contain.text', '1 out of 5 selected');
      cy.get('@mc-multi-select').find('[data-cy=clearButton]').should('not.exist');
      cy.get('@mc-multi-select').realType('{backspace}');
      cy.get('@mc-multi-select').invoke('prop', 'value').should('contain', '2');
    });
  });
});
