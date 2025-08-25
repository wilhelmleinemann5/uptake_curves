import { html } from 'lit';
import { McTypeahead } from '../src';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';
import '../src';
import icons from './metadata.json';

const fruits = [
  { label: 'apple', value: 'apple' },
  { label: 'apricot', value: 'apricot' },
  { label: 'banana', value: 'banana' },
  { label: 'blackberry', value: 'blackberry' },
  { label: 'blueberry', value: 'blueberry' },
  { label: 'cherry', value: 'cherry' },
  { label: 'coconut', value: 'coconut' },
  { label: 'cranberry', value: 'cranberry' },
  { label: 'grape', value: 'grape' },
  { label: 'grapefruit', value: 'grapefruit' },
  { label: 'kiwi', value: 'kiwi', disabled: true },
  { label: 'lemon', value: 'lemon' },
  { label: 'lime', value: 'lime' },
  { label: 'lychee', value: 'lychee' },
  { label: 'mandarin', value: 'mandarin' },
  { label: 'mango', value: 'mango' },
  { label: 'nectarine', value: 'nectarine' },
  { label: 'orange', value: 'orange' },
  { label: 'papaya', value: 'papaya' },
  { label: 'passionfruit', value: 'passionfruit' },
  { label: 'peach', value: 'peach' },
  { label: 'pear', value: 'pear' },
  { label: 'pineapple', value: 'pineapple' },
  { label: 'plum', value: 'plum' },
  { label: 'pomegranate', value: 'pomegranate' },
  { label: 'raspberry', value: 'raspberry' },
  { label: 'strawberry', value: 'strawberry' },
  { label: 'watermelon', value: 'watermelon' },
];
const fruitsWithCommas = [
  { label: 'apple', value: 'apple_value' },
  { label: 'apple (name), country', value: 'apple_value1' },
  { label: 'apple (test), cc', value: 'apple_value2' },
  ...fruits.slice(1),
];
const fruitsAndVegetables = [
  { label: 'apple', value: 'apple', group: 'fruits' },
  { label: 'apricot', value: 'apricot', group: 'fruits' },
  { label: 'banana', value: 'banana', group: 'fruits' },
  { label: 'blackberry', value: 'blackberry', group: 'fruits' },
  { label: 'blueberry', value: 'blueberry', group: 'fruits' },
  { label: 'cherry', value: 'cherry', group: 'fruits' },
  { label: 'coconut', value: 'coconut', group: 'fruits' },
  { label: 'cranberry', value: 'cranberry', group: 'fruits' },
  { label: 'grape', value: 'grape', group: 'fruits' },
  { label: 'grapefruit', value: 'grapefruit', group: 'fruits' },
  { label: 'kiwi', value: 'kiwi', group: 'fruits' },
  { label: 'lemon', value: 'lemon', group: 'fruits' },
  { label: 'lime', value: 'lime', group: 'fruits' },
  { label: 'lychee', value: 'lychee', group: 'fruits' },
  { label: 'mandarin', value: 'mandarin', group: 'fruits' },
  { label: 'mango', value: 'mango', group: 'fruits' },
  { label: 'nectarine', value: 'nectarine', group: 'fruits' },
  { label: 'orange', value: 'orange', group: 'fruits' },
  { label: 'papaya', value: 'papaya', group: 'fruits' },
  { label: 'passionfruit', value: 'passionfruit', group: 'fruits' },
  { label: 'peach', value: 'peach', group: 'fruits' },
  { label: 'pear', value: 'pear', group: 'fruits' },
  { label: 'pineapple', value: 'pineapple', group: 'fruits' },
  { label: 'plum', value: 'plum', group: 'fruits' },
  { label: 'pomegranate', value: 'pomegranate', group: 'fruits' },
  { label: 'raspberry', value: 'raspberry', group: 'fruits' },
  { label: 'strawberry', value: 'strawberry', group: 'fruits' },
  { label: 'watermelon', value: 'watermelon', group: 'fruits' },
  { label: 'artichoke', value: 'artichoke', group: 'vegetables' },
  { label: 'asparagus', value: 'asparagus', group: 'vegetables' },
  { label: 'aubergine', value: 'aubergine', group: 'vegetables' },
  { label: 'beetroot', value: 'beetroot', group: 'vegetables' },
  { label: 'broccoli', value: 'broccoli', group: 'vegetables' },
  { label: 'brussels sprout', value: 'brussels sprout', group: 'vegetables' },
  { label: 'cabbage', value: 'cabbage', group: 'vegetables' },
  { label: 'carrot', value: 'carrot', group: 'vegetables' },
  { label: 'cauliflower', value: 'cauliflower', group: 'vegetables' },
  { label: 'celery', value: 'celery', group: 'vegetables' },
  { label: 'chili pepper', value: 'chili pepper', group: 'vegetables' },
  { label: 'corn', value: 'corn', group: 'vegetables' },
  { label: 'cucumber', value: 'cucumber', group: 'vegetables' },
  { label: 'eggplant', value: 'eggplant', group: 'vegetables' },
  { label: 'garlic', value: 'garlic', group: 'vegetables' },
  { label: 'ginger', value: 'ginger', group: 'vegetables' },
  { label: 'green bean', value: 'green bean', group: 'vegetables' },
  { label: 'green pepper', value: 'green pepper', group: 'vegetables' },
  { label: 'kale', value: 'kale', group: 'vegetables' },
  { label: 'leek', value: 'leek', group: 'vegetables' },
  { label: 'lettuce', value: 'lettuce', group: 'vegetables' },
  { label: 'mushroom', value: 'mushroom', group: 'vegetables' },
  { label: 'onion', value: 'onion', group: 'vegetables' },
  { label: 'pea', value: 'pea', group: 'vegetables' },
  { label: 'potato', value: 'potato', group: 'vegetables' },
  { label: 'pumpkin', value: 'pumpkin', group: 'vegetables' },
  { label: 'radish', value: 'radish', group: 'vegetables' },
  { label: 'red pepper', value: 'red pepper', group: 'vegetables' },
  { label: 'spinach', value: 'spinach', group: 'vegetables' },
  { label: 'sweet potato', value: 'sweet potato', group: 'vegetables' },
  { label: 'tomato', value: 'tomato', group: 'vegetables' },
  { label: 'turnip', value: 'turnip', group: 'vegetables' },
  { label: 'zucchini', value: 'zucchini', group: 'vegetables' },
];

const fruitsAndVegetablesSublabels = [
  { label: 'apple', value: 'apple', sublabel: 'fruits' },
  { label: 'apricot', value: 'apricot', sublabel: 'fruits' },
  { label: 'banana', value: 'banana', sublabel: 'fruits' },
  { label: 'blackberry', value: 'blackberry', sublabel: 'fruits' },
  { label: 'blueberry', value: 'blueberry', sublabel: 'fruits' },
  { label: 'cherry', value: 'cherry', sublabel: 'fruits' },
  { label: 'coconut', value: 'coconut', sublabel: 'fruits' },
  { label: 'cranberry', value: 'cranberry', sublabel: 'fruits' },
  { label: 'grape', value: 'grape', sublabel: 'fruits' },
  { label: 'grapefruit', value: 'grapefruit', sublabel: 'fruits' },
  { label: 'kiwi', value: 'kiwi', sublabel: 'fruits' },
  { label: 'lemon', value: 'lemon', sublabel: 'fruits' },
  { label: 'lime', value: 'lime', sublabel: 'fruits' },
  { label: 'lychee', value: 'lychee', sublabel: 'fruits' },
  { label: 'mandarin', value: 'mandarin', sublabel: 'fruits' },
  { label: 'mango', value: 'mango', sublabel: 'fruits' },
  { label: 'nectarine', value: 'nectarine', sublabel: 'fruits' },
  { label: 'orange', value: 'orange', sublabel: 'fruits' },
  { label: 'papaya', value: 'papaya', sublabel: 'fruits' },
  { label: 'passionfruit', value: 'passionfruit', sublabel: 'fruits' },
  { label: 'peach', value: 'peach', sublabel: 'fruits' },
  { label: 'pear', value: 'pear', sublabel: 'fruits' },
  { label: 'pineapple', value: 'pineapple', sublabel: 'fruits' },
  { label: 'plum', value: 'plum', sublabel: 'fruits' },
  { label: 'pomegranate', value: 'pomegranate', sublabel: 'fruits' },
  { label: 'raspberry', value: 'raspberry', sublabel: 'fruits' },
  { label: 'strawberry', value: 'strawberry', sublabel: 'fruits' },
  { label: 'watermelon', value: 'watermelon', sublabel: 'fruits' },
  { label: 'artichoke', value: 'artichoke', sublabel: 'vegetables' },
  { label: 'asparagus', value: 'asparagus', sublabel: 'vegetables' },
  { label: 'aubergine', value: 'aubergine', sublabel: 'vegetables' },
  { label: 'beetroot', value: 'beetroot', sublabel: 'vegetables' },
  { label: 'broccoli', value: 'broccoli', sublabel: 'vegetables' },
  { label: 'brussels sprout', value: 'brussels sprout', sublabel: 'vegetables' },
  { label: 'cabbage', value: 'cabbage', sublabel: 'vegetables' },
  { label: 'carrot', value: 'carrot', sublabel: 'vegetables' },
  { label: 'cauliflower', value: 'cauliflower', sublabel: 'vegetables' },
  { label: 'celery', value: 'celery', sublabel: 'vegetables' },
  { label: 'chili pepper', value: 'chili pepper', sublabel: 'vegetables' },
  { label: 'corn', value: 'corn', sublabel: 'vegetables' },
  { label: 'cucumber', value: 'cucumber', sublabel: 'vegetables' },
  { label: 'eggplant', value: 'eggplant', sublabel: 'vegetables' },
  { label: 'garlic', value: 'garlic', sublabel: 'vegetables' },
  { label: 'ginger', value: 'ginger', sublabel: 'vegetables' },
  { label: 'green bean', value: 'green bean', sublabel: 'vegetables' },
  { label: 'green pepper', value: 'green pepper', sublabel: 'vegetables' },
  { label: 'kale', value: 'kale', sublabel: 'vegetables' },
  { label: 'leek', value: 'leek', sublabel: 'vegetables' },
  { label: 'lettuce', value: 'lettuce', sublabel: 'vegetables' },
  { label: 'mushroom', value: 'mushroom', sublabel: 'vegetables' },
  { label: 'onion', value: 'onion', sublabel: 'vegetables' },
  { label: 'pea', value: 'pea', sublabel: 'vegetables' },
  { label: 'potato', value: 'potato', sublabel: 'vegetables' },
  { label: 'pumpkin', value: 'pumpkin', sublabel: 'vegetables' },
  { label: 'radish', value: 'radish', sublabel: 'vegetables' },
  { label: 'red pepper', value: 'red pepper', sublabel: 'vegetables' },
  { label: 'spinach', value: 'spinach', sublabel: 'vegetables' },
  { label: 'sweet potato', value: 'sweet potato', sublabel: 'vegetables' },
  { label: 'tomato', value: 'tomato', sublabel: 'vegetables' },
  { label: 'turnip', value: 'turnip', sublabel: 'vegetables' },
  { label: 'zucchini', value: 'zucchini', sublabel: 'vegetables' },
];
const hoverColor = 'rgb(240, 240, 240)';
const transparent = 'rgba(0, 0, 0, 0)';

context('mc-typeahead', () => {
  beforeEach(() => {
    cy.viewport(1001, 1001);
  });

  describe('mounting and setting option', () => {
    it('static options passed as data', () => {
      cy.mount<McTypeahead>(html`<mc-typeahead name="select" label="Select item" .data=${fruits}></mc-typeahead>`).as(
        'mc-typeahead',
      );
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('have.length', 6);
      cy.get('@options').eq(0).should('have.attr', 'focused');
    });
    it('static options passed as slot', () => {
      cy.mount<McTypeahead>(
        html`<mc-typeahead name="select" label="Select item">
          ${fruits.map((fruit) => {
            return html`<mc-option value="${fruit.value}">
              <i>${fruit.label}</i>
            </mc-option>`;
          })}</mc-typeahead
        >`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@mc-typeahead').find('mc-option').should('not.be.visible');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('mc-option').should('not.be.visible');
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('have.length', 28);
      cy.get('@mc-typeahead').find('mc-option[visible]').as('visibleOptions');
      cy.get('@visibleOptions').should('have.length', 6);
    });
    it('dynamic options passed as data prop', () => {
      cy.mount<McTypeahead>(html`<mc-typeahead name="select" label="Select item"></mc-typeahead>`).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.realType('ap');
      cy.get('@mc-typeahead').invoke('prop', 'data', fruits);
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('have.length', 6);
      cy.get('@options').eq(0).should('have.attr', 'focused');
    });
    it('dynamic options passed as slot', () => {
      const onSearch = (): void => {
        const mcTypeahead = document.querySelector('mc-typeahead');
        mcTypeahead.loading = true;
        const results = fruits.slice(0, 6).map((item) => {
          const option = document.createElement('mc-option');
          option.value = item.value;
          option.sublabel = item.sublabel;
          option.innerHTML = `<i>${item.label}</i>`;
          return option;
        });
        mcTypeahead.loading = false;
        mcTypeahead.innerHTML = '';
        results.map((item) => mcTypeahead.appendChild(item));
      };
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          @search="${(): void => onSearch()}"
          disablefilter
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('have.length', 6);
      cy.get('@options').eq(0).should('have.attr', 'focused');
    });
  });
  it('filtering items from static data set', () => {
    cy.mount<McTypeahead>(html`<mc-typeahead name="select" label="Select item" .data=${fruits}></mc-typeahead>`).as(
      'mc-typeahead',
    );
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@mc-typeahead').find('mc-option').should('not.exist');
    cy.get('@input').click();
    cy.realType('ap');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').eq(0).contains('apple');
    cy.get('@options').eq(1).contains('apricot');
    cy.get('@options').eq(2).contains('grape');
    cy.get('@options').eq(3).contains('grapefruit');
    cy.get('@options').eq(4).contains('papaya');
    cy.get('@options').eq(5).contains('pineapple');
    cy.realType('{backspace}{backspace}bl');
    cy.get('@options').eq(0).contains('blackberry');
    cy.get('@options').eq(1).contains('blueberry');
  });
  it('filtering items from static data set and setting the value', () => {
    cy.mount<McTypeahead>(
      html`<button id="focus">Focus</button
        ><mc-typeahead
          name="select"
          showlistonfocus
          label="Select item"
          .data=${fruits}
          clearbutton
          keepclearbuttonvisible
        ></mc-typeahead>`,
    );
    cy.get('mc-typeahead').as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('ap');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').eq(0).contains('apple');
    cy.get('@options').eq(1).contains('apricot');
    cy.get('@mc-typeahead').find('mc-button[data-cy="clearButton"]').realClick();
    cy.get('@mc-typeahead').invoke('prop', 'value', 'apple');
    cy.get('#focus').click();
    cy.get('@input').click();
    cy.get('@options').eq(0).contains('apple');
    cy.get('@options').eq(1).contains('pineapple');
  });
  it('filters items correctly when some contain commas', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead name="select" label="Select item" .data=${fruitsWithCommas}></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@mc-typeahead').find('mc-option').should('not.exist');
    cy.get('@input').click();
    cy.realType('apple');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').eq(0).contains('apple');
    cy.get('@options').eq(1).contains('apple (name), country');
    cy.get('@options').eq(2).contains('apple (test), cc');
    cy.get('@options').eq(3).contains('pineapple');

    cy.realType(' (test), cc');
    cy.get('@options').should('have.length', 1);
    cy.get('@options').eq(0).contains('apple (test), cc');
  });
  it('does not show empty container when item selected and text deleted', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead name="select" label="Select item" disablefilter .data=${fruits}></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('ap');
    cy.get('mc-popover').should('have.class', 'visible');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').eq(1).click();
    cy.get('@input').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
    cy.get('mc-popover').should('have.class', 'hidden');
    cy.realType('ap');
    cy.realPress('ArrowDown');
    cy.realPress('Enter');
    cy.get('mc-popover').should('have.class', 'hidden');
  });
  it('debounce', () => {
    const eventHandlerSpy = cy.spy().as('onEventSpy');
    cy.mount<McTypeahead>(
      html`<mc-typeahead
        name="select"
        label="Select item"
        debounce="1000"
        @search="${(e): void => eventHandlerSpy(e.target.value)}"
      ></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('ap');

    cy.wait(1000);
    cy.get('@onEventSpy').its('callCount').should('eq', 1);
    cy.get('@onEventSpy').should('have.been.calledWithMatch', 'ap');
  });
  it('minchars', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead name="select" label="Select item" minchars="3" .data=${fruits}></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@mc-typeahead').find('mc-option').should('not.exist');
    cy.get('@input').click();
    cy.realType('ap');
    cy.get('@mc-typeahead').find('mc-option').should('not.exist');
    cy.realType('p');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 2);
  });
  it('highlight', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead name="select" label="Select item" highlight .data=${fruits}></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('app');
    cy.get('@mc-typeahead').find('mc-option').eq(0).find('mark').contains('app');
    cy.get('@mc-typeahead').find('mc-option').eq(1).find('mark').contains('app');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 2);
  });
  describe('keyboard navigation and selecting option', () => {
    it('data passed as prop', () => {
      cy.mount<McTypeahead>(html`<mc-typeahead name="select" label="Select item" .data=${fruits}></mc-typeahead>`).as(
        'mc-typeahead',
      );
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').eq(0).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(1).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(2).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(3).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(4).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(5).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(0).should('have.attr', 'focused');
      cy.realPress('Enter');
      cy.get('@input').should('have.value', 'apple');
    });
    it('data passed as slot', () => {
      cy.mount<McTypeahead>(
        html`<mc-typeahead name="select" label="Select item">
          ${fruits.map((fruit) => html`<mc-option value="${fruit.value}">${fruit.label}</mc-option>`)}
        </mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option[visible]').as('options');
      cy.get('@options').eq(0).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(1).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(2).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(3).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(4).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(5).should('have.attr', 'focused');
      cy.realPress('ArrowDown');
      cy.get('@options').eq(0).should('have.attr', 'focused');
      cy.realPress('Enter');
      cy.get('@input').should('have.value', 'apple');
    });
    it('typeahead within mds-layout', () => {
      cy.viewport(700, 400);
      cy.mount<McTypeahead>(
        html` <div style="container-type: inline-size; contain: layout;">
          <mc-typeahead name="select" label="Select item" .data=${fruits} maxoptions="20"></mc-typeahead>
          <p>
            Cras in sollicitudin odio. Cras porta, felis sit amet congue luctus, enim nibh condimentum arcu, at
            scelerisque risus metus ut tortor. Etiam finibus risus eget neque finibus elementum. Etiam accumsan quam ac
            tortor pharetra convallis. Donec rhoncus consequat volutpat. Etiam a rutrum ipsum. Donec sed fringilla
            ipsum. In cursus dolor non sapien lobortis auctor. Nunc tempus quis ipsum tristique fermentum. Phasellus at
            velit rhoncus, blandit ipsum ut, condimentum eros. Aliquam congue sit amet mauris a scelerisque. Nunc turpis
            ipsum, efficitur at sodales gravida, sagittis ut metus. Curabitur nec eros gravida, feugiat odio ac, gravida
            arcu.
          </p>

          <p>
            Donec rhoncus posuere lectus eu pretium. Aliquam varius faucibus massa, nec consequat libero facilisis ac.
            Pellentesque finibus lorem in posuere imperdiet. Praesent et turpis accumsan, mattis nibh quis, aliquam
            nunc. Phasellus facilisis ultrices massa sed bibendum. Curabitur porta eros diam, id bibendum ligula
            consectetur sed. Phasellus ultricies, justo vitae pellentesque viverra, nisl massa blandit libero, non
            rutrum justo urna in magna. Cras finibus vel orci quis tempor. Proin vel magna scelerisque, tristique sapien
            ac, blandit tortor. Nam tincidunt accumsan nisi vitae convallis. Maecenas quis est nibh. Fusce id velit eget
            nisi rhoncus pharetra a sed nulla. Etiam bibendum elementum ante, nec ultricies orci scelerisque at. Proin
            quis enim dui. Suspendisse ut pharetra odio, ut bibendum sapien. Sed tristique ligula id turpis pretium
            euismod.
          </p>

          <p>
            Ut pharetra lobortis mi id finibus. Cras laoreet convallis finibus. Curabitur id felis sagittis, finibus
            nulla eget, viverra neque. Curabitur pulvinar leo dui. Mauris commodo ac purus id pharetra. Duis nunc leo,
            rutrum ut suscipit vel, sodales nec metus. Vestibulum sodales eros dolor, ut pellentesque ipsum mollis sit
            amet. Ut porttitor eros at metus iaculis, et fringilla eros porttitor. Morbi varius tempor iaculis. Etiam
            dapibus porta leo, vitae tempor diam rhoncus ut. Donec enim tellus, pulvinar vitae ex quis, egestas sagittis
            libero. Sed nibh metus, vehicula et quam vel, imperdiet rutrum orci. Suspendisse sit amet erat feugiat,
            ultricies dolor tempor, ultrices eros. Morbi in enim dapibus, sagittis massa sed, commodo nibh. Aenean
            interdum, turpis sit amet pharetra sagittis, mauris tortor fringilla erat, nec pulvinar odio urna ut justo.
          </p>

          <p>
            Quisque pulvinar tristique tellus, nec pulvinar leo viverra ut. In ultricies blandit placerat. Mauris semper
            ornare porta. Vivamus eu magna ut nunc pretium mollis vel mollis ante. Vivamus a ultricies mi, quis semper
            urna. Vivamus sed elementum dui. Cras nec justo tempus, consectetur nisl sed, finibus ante.
          </p>
        </div>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('a');

      cy.get('mc-popover')
        .find('.container')
        .then(($container) => {
          expect($container[0].scrollTop).to.eq(0);
        });

      cy.get('@mc-typeahead')
        .find('mc-option')
        .should('be.visible')
        .then(($options) => {
          const totalOptions = $options.length;
          const lastIndex = totalOptions - 1;
          for (let i = 0; i < lastIndex; i++) {
            cy.realPress('ArrowDown');
          }
        });

      cy.wait(500);
      cy.get('mc-popover')
        .find('.container')
        .then(($container) => {
          expect($container[0].scrollTop).to.be.greaterThan(10);
        });
      cy.realPress('ArrowDown');

      cy.wait(500);
      cy.get('mc-popover')
        .find('.container')
        .then(($container) => {
          expect($container[0].scrollTop).to.be.lessThan(10);
        });
    });
  });
  describe('mouse interactions and selecting option ', () => {
    it('data passed as prop', () => {
      cy.mount<McTypeahead>(
        html`<button id="focus">Focus</button
          ><mc-typeahead name="select" label="Select item" .data=${fruits}></mc-typeahead>`,
      );
      cy.get('mc-typeahead').as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
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
      cy.get('#focus').realHover('mouse');
      cy.get('@options').eq(5).find('button').should('have.css', 'background-color', transparent);
      cy.get('@options').eq(1).click();
      cy.get('@input').should('have.value', 'apricot');
    });
    it('data passed as slot', () => {
      cy.mount<McTypeahead>(
        html`<button id="focus">Focus</button
          ><mc-typeahead name="select" label="Select item">
            ${fruits.map((fruit) => html`<mc-option value="${fruit.value}">${fruit.label}</mc-option>`)}
          </mc-typeahead>`,
      );
      cy.get('mc-typeahead').as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option[visible]').as('options');
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
      cy.get('#focus').realHover('mouse');
      cy.get('@options').eq(5).find('button').should('have.css', 'background-color', transparent);
      cy.get('@options').eq(1).click();
      cy.get('@input').should('have.value', 'apricot');
    });
  });
  it('on key press esc & tab hides the popover', () => {
    cy.mount<McTypeahead>(
      html`<button id="focus">Focus</button
        ><mc-typeahead name="select" label="Select item" .data=${fruits}></mc-typeahead>`,
    );
    cy.get('mc-typeahead').as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('ap');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').eq(0).should('have.attr', 'focused');
    cy.get('mc-list').should('be.visible');
    cy.realType('{esc}');
    cy.get('mc-list').should('not.be.visible');
    cy.realType('p');
    cy.get('mc-list').should('be.visible');
    cy.realPress('Tab');
    cy.get('mc-list').should('not.be.visible');
  });
  it('disabled items', () => {
    cy.mount<McTypeahead>(html`<mc-typeahead name="select" label="Select item" .data=${fruits}></mc-typeahead>`).as(
      'mc-typeahead',
    );
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('i');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').eq(0).should('have.attr', 'focused');
    cy.realPress('ArrowDown');
    cy.get('@options').eq(1).should('have.attr', 'focused');
    cy.realPress('ArrowDown');
    cy.get('@options').eq(2).should('not.have.attr', 'focused');
    cy.get('@options').eq(3).should('have.attr', 'focused');
  });
  it('grouping', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead name="select" label="Select item" .data=${fruitsAndVegetables}></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('co');
    cy.get('@mc-typeahead').find('small').eq(0).contains('fruits');
    cy.get('@mc-typeahead').find('small').eq(1).contains('vegetables');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').eq(0).should('have.attr', 'focused');
    cy.get('@options').should('have.length', 4);
    cy.get('@mc-typeahead').find('small').should('have.length', 2);
  });
  it('disable filter function', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead name="select" label="Select item" disablefilter .data=${fruits}></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('ap');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 28);
    cy.get('@mc-typeahead').find('mc-option[visible]').as('visibleOptions');
    cy.get('@visibleOptions').should('have.length', 28);
  });
  it('custom filter function', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead
        name="select"
        label="Select item"
        .data="${icons.map((icon) => ({
          label: icon.name,
          value: icon.name,
          icon: icon.name,
          sublabel: icon.tags.join(', '),
        }))}"
      ></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();
    cy.realType('star');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 5);
    cy.realType('{backspace}{backspace}{backspace}{backspace}');
    cy.get('@mc-typeahead').then(($el) => {
      // Set the customfilter property
      $el[0].customfilter = (text: string, value: string) => {
        return text.startsWith(value) ? text : null;
      };
    });
    cy.realType('star');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 3);
  });
  it('match label text only', () => {
    cy.mount<McTypeahead>(
      html`<mc-typeahead
        name="select"
        label="Select item"
        .data="${icons.map((icon) => ({
          label: icon.name,
          value: icon.name,
          icon: icon.name,
          sublabel: icon.tags.join(', '),
        }))}"
      ></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@input').click();

    // the default filter is to match the label, value and sublabel
    cy.realType('sta');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 10);
    cy.realType('{backspace}{backspace}{backspace}');

    // set the matchlabelonly property using internal filter function to match text
    cy.get('@mc-typeahead').then(($el) => {
      $el[0].matchlabelonly = true;
    });
    cy.realType('sta');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 9);
    cy.realType('{backspace}{backspace}{backspace}');

    // set the matchlabelonly property and custom filter function to match text
    cy.get('@mc-typeahead').then(($el) => {
      $el[0].customfilter = (text: string, value: string) => {
        return text.startsWith(value) ? text : null;
      };
    });
    cy.realType('sta');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 4);
  });
  it('infinite scroll data passed as prop', () => {
    const onSearch = (): void => {
      const mcTypeahead = document.querySelector('mc-typeahead');
      mcTypeahead.data = fruits.slice(0, 10);
    };
    const onListScroll = (): void => {
      const mcTypeahead = document.querySelector('mc-typeahead');
      mcTypeahead.data = [...mcTypeahead.data, ...fruits.slice(10, 20)];
    };
    cy.mount<McTypeahead>(
      html`<mc-typeahead
        name="select"
        label="Select item"
        disablefilter
        infinitescroll
        optionsheight="300px"
        .data=${fruits.slice(0, 10)}
        @search="${(): void => onSearch()}"
        @listscroll="${(): void => onListScroll()}"
      ></mc-typeahead>`,
    ).as('mc-typeahead');
    cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    cy.get('@mc-typeahead').find('mc-option').should('not.exist');
    cy.get('@input').click();
    cy.get('@mc-typeahead').find('mc-option').should('not.exist');
    cy.realType('a');
    cy.get('@mc-typeahead').find('mc-option').as('options');
    cy.get('@options').should('have.length', 10);
    cy.get('@mc-typeahead').find('[part=container]').scrollTo('bottom');
    cy.get('@options').should('have.length', 20);
    cy.realType('p');
    cy.get('@options').should('have.length', 10);
    cy.get('@options').eq(0).should('have.attr', 'focused');

    cy.realType('{backspace}{backspace}a');
    cy.get('mc-popover')
      .find('.container')
      .then(($container) => {
        expect($container[0].scrollTop).to.eq(0);
      });
    cy.get('@mc-typeahead')
      .find('mc-option')
      .should('be.visible')
      .then(($options) => {
        const totalOptions = $options.length;
        const lastIndex = totalOptions - 1;
        for (let i = 0; i < lastIndex; i++) {
          cy.realPress('ArrowDown');
        }
      });
    cy.get('@options').should('have.length', 20);
    cy.get('mc-popover')
      .find('.container')
      .then(($container) => {
        expect($container[0].scrollTop).to.be.greaterThan(10);
      });
  });
  describe('show list item on init and user focus', () => {
    it('shows only max number of items', () => {
      cy.mount<McTypeahead>(
        html`<mc-typeahead name="select" label="Select item" showlistonfocus .data=${fruits}></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('be.visible');
    });
    it('focuses on the first item when input focus', () => {
      cy.mount<McTypeahead>(
        html`<mc-typeahead name="select" label="Select item" showlistonfocus .data=${fruits}></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').eq(0).should('have.attr', 'focused');
    });
    it('shows the options on input focus when showlistonfocus is present', () => {
      cy.mount<McTypeahead>(
        html`<button id="outside-element">outside element</button
          ><mc-typeahead name="select" label="Select item" showlistonfocus .data=${fruits}></mc-typeahead>`,
      );
      cy.get('#outside-element').as('outside-element');
      cy.get('mc-typeahead').as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@outside-element').realClick();
      cy.realPress('Tab');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('be.visible');
    });
    it('shows the options when showlistonfocus and typing and deleting characters', () => {
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          showlistonfocus
          listlabel="Previously used"
          .data=${fruits}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      // should show initial list
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('be.visible');
      cy.get('@options').should('have.length', 10);
      cy.get('@mc-typeahead').find('small').as('label');
      cy.get('@label').contains('Previously used');
      // should show filtered list
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('be.visible');
      cy.get('@options').should('have.length', 6);
      cy.get('@mc-typeahead').find('small').should('not.exist');
      // should show initial list
      cy.realType('{backspace}{backspace}');
      cy.get('@options').should('have.length', 10);
      cy.get('@mc-typeahead').find('small').as('label');
      cy.get('@label').contains('Previously used');
    });
    it('displays init label when set', () => {
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          showlistonfocus
          listlabel="Recently searched"
          .data=${fruits}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('small').contains('Recently searched');
    });
  });
  describe('events', () => {
    it('dispatches search event', () => {
      const eventHandlerSpy = cy.spy().as('onEventSpy');
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          @search="${(e): void => eventHandlerSpy(e.target.value)}"
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@onEventSpy').its('callCount').should('eq', 1);
      cy.get('@onEventSpy').should('have.been.calledWithMatch', 'ap');
    });
    it('dispatches an "input" event when option is selected', () => {
      const eventHandlerSpy = cy.spy().as('onEventSpy');
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          @input="${(e): void => eventHandlerSpy(e.target.value)}"
          .data=${fruits}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@mc-typeahead').then(() => {
        cy.get('@mc-typeahead')
          .find('mc-option')
          .eq(1)
          .then(($el) => {
            $el.get(0).click();
            cy.get('@onEventSpy').its('callCount').should('eq', 3);
            cy.get('@onEventSpy').should('have.been.calledWithMatch', 'apricot');
          });
      });
    });
    it('dispatches listscroll event', () => {
      const eventHandlerSpy = cy.spy().as('onEventSpy');
      const onSearch = (): void => {
        const mcTypeahead = document.querySelector('mc-typeahead');
        mcTypeahead.data = fruits.slice(0, 10);
      };
      const onListScroll = (value): void => {
        const mcTypeahead = document.querySelector('mc-typeahead');
        mcTypeahead.data = [...mcTypeahead.data, ...fruits.slice(10, 20)];
        eventHandlerSpy(value);
      };
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          disablefilter
          infinitescroll
          optionsheight="300px"
          .data=${fruits.slice(0, 10)}
          @search="${(): void => onSearch()}"
          @listscroll="${(e): void => onListScroll(e.target.value)}"
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.get('@input').click();
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');
      cy.realType('a');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('have.length', 10);
      cy.get('@mc-typeahead').find('[part=container]').scrollTo('bottom');

      cy.get('@options').should('have.length', 20);
      cy.get('@onEventSpy').its('callCount').should('eq', 1);
    });
    it('dispatches a "optionselected" event when option is selected', () => {
      const eventHandlerSpy = cy.spy().as('onEventSpy');
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          @optionselected="${(e): void => eventHandlerSpy(e)}"
          .data=${fruits}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@mc-typeahead').then(() => {
        cy.get('@mc-typeahead')
          .find('mc-option')
          .eq(1)
          .then(($el) => {
            $el.get(0).click();
            cy.get('@onEventSpy').its('callCount').should('eq', 1);
            cy.get('@onEventSpy').should('have.been.calledWithMatch', {
              detail: {
                disabled: undefined,
                icon: undefined,
                label: 'apricot',
                mcOption: null,
                sublabel: undefined,
                value: 'apricot',
                visible: false,
              },
            });
          });
      });
    });
    it('dispatches clearbuttonclick event', () => {
      const eventHandlerSpy = cy.spy().as('onEventSpy');
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          clearbutton
          keepclearbuttonvisible
          @clearbuttonclick="${(e): void => eventHandlerSpy(e.target.value)}"
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-button[data-cy="clearButton"]').realClick();
      cy.get('@onEventSpy').its('callCount').should('eq', 1);
    });
    it('dispatches "optionselected" event when sublabel is clicked', () => {
      const eventHandlerSpy = cy.spy().as('onEventSpy');
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          @optionselected="${(e): void => eventHandlerSpy(e)}"
          .data=${fruitsAndVegetablesSublabels}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('co');
      cy.get('@mc-typeahead').find('mc-option').eq(1).find('span').eq(0).realClick();
      cy.get('@onEventSpy').its('callCount').should('eq', 1);
      cy.get('@onEventSpy').should('have.been.calledWithMatch', {
        detail: {
          disabled: undefined,
          icon: undefined,
          label: 'coconut',
          mcOption: null,
          sublabel: 'fruits',
          value: 'coconut',
          visible: false,
        },
      });
      cy.get('@input').should('have.value', 'coconut');
    });
    it('dispatches focus', () => {
      cy.mount<McTypeahead>(
        `<button id="focus">Focus</button><mc-typeahead
          name="select"
          label="Select item"
          .data=${fruitsAndVegetablesSublabels}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      const focusHandler = cy.stub().as('focusHandler');
      cy.get('mc-typeahead').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('focus', focusHandler);
      });
      cy.get('mc-typeahead').find('input[data-cy="input"]').focus();
      cy.get('@focusHandler').its('callCount').should('eq', 1);
    });
    it('dispatches blur', () => {
      cy.mount<McTypeahead>(
        `<button id="focus">Focus</button><mc-typeahead
          name="select"
          label="Select item"
          .data=${fruitsAndVegetablesSublabels}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      const blurHandler = cy.stub().as('blurHandler');
      cy.get('mc-typeahead').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.addEventListener('blur', blurHandler);
      });
      cy.get('mc-typeahead').find('input[data-cy="input"]').focus();
      cy.get('mc-typeahead').find('input[data-cy="input"]').realPress('Tab');
      cy.get('@blurHandler').its('callCount').should('eq', 1);
    });
    it('can set focus programmatically on mc-input', () => {
      cy.mount<McTypeahead>(
        `<button id="focus">Focus</button><mc-typeahead
          name="select"
          label="Select item"
          .data=${fruitsAndVegetablesSublabels}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('#focus').click();
      cy.get('mc-typeahead').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.focus();
      });
      cy.get('mc-typeahead').should('have.focus');
    });
    it('can set blur programmatically on mc-input', () => {
      cy.mount<McTypeahead>(
        `<button id="focus">Focus</button><mc-typeahead
          name="select"
          label="Select item"
          .data=${fruitsAndVegetablesSublabels}
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('mc-typeahead').find('label').click();
      cy.get('mc-typeahead').then(($el) => {
        const mcInput = $el.get(0);
        mcInput.blur();
      });
      cy.get('mc-typeahead').should('not.have.focus');
    });
  });
  describe('no suggestions', () => {
    it('static options as data prop', () => {
      cy.mount<McTypeahead>(html`<mc-typeahead name="select" label="Select item" .data=${fruits}></mc-typeahead>`).as(
        'mc-typeahead',
      );
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('apxx');
      cy.get('@mc-typeahead').find('div[data-cy="nosuggestions"]').contains('No suggestions found');
    });
    it('static options as slot', () => {
      cy.mount<McTypeahead>(
        html`<mc-typeahead name="select" label="Select item">
          ${fruits.map((fruit) => {
            return html`<mc-option value="${fruit.value}">
              <i>${fruit.label}</i>
            </mc-option>`;
          })}</mc-typeahead
        >`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('apxx');
      cy.get('@mc-typeahead').find('div[data-cy="nosuggestions"]').contains('No suggestions found');
    });
    it('dynamic options as data prop', () => {
      const onSearch = (): void => {
        const mcTypeahead = document.querySelector('mc-typeahead');
        mcTypeahead.loading = true;
        mcTypeahead.data = [];
        mcTypeahead.loading = false;
      };
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          @search="${(): void => onSearch()}"
          .data=${[]}
          disablefilter
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('apxx');
      cy.get('@mc-typeahead').find('div[data-cy="nosuggestions"]').contains('No suggestions found');
    });
    it('dynamic options as slot', () => {
      const onSearch = (): void => {
        const mcTypeahead = document.querySelector('mc-typeahead');
        mcTypeahead.loading = true;
        const results = [];
        mcTypeahead.loading = false;
        results.map((item) => mcTypeahead.appendChild(item));
      };
      cy.mount<McTypeahead>(
        html`<mc-typeahead
          name="select"
          label="Select item"
          @search="${(): void => onSearch()}"
          disablefilter
        ></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@input').click();
      cy.realType('apxx');
      cy.get('@mc-typeahead').find('div[data-cy="nosuggestions"]').contains('No suggestions found');
    });
  });
  describe('mobile view', () => {
    const createAlias = (): void => {
      cy.get('@mc-typeahead').find('[data-cy="modal-title"]').as('modal-title');
      cy.get('@mc-typeahead').find('[data-cy="modal-close-button"]').as('modal-close-button');
    };

    beforeEach(() => {
      cy.viewport(400, 400);
      cy.mount<McTypeahead>(
        html`<mc-typeahead clearbutton name="select" label="Select item" .data=${fruits}></mc-typeahead>`,
      ).as('mc-typeahead');
      cy.get('@mc-typeahead').find('input[data-cy="input"]').as('input');
    });

    it('clicking on the input should open the modal', () => {
      cy.get('@input').click();
      createAlias();
      cy.get('@modal-title').should('be.visible');
      cy.get('@modal-close-button').should('be.visible');
    });

    it('focusing on the input must only open the modal when the showlistonfocus is set to true', () => {
      cy.get('@mc-typeahead').invoke('prop', 'showlistonfocus', true);
      cy.get('@input').focus();
      createAlias();
      cy.get('@modal-title').should('be.visible');
      cy.get('@modal-close-button').should('be.visible');

      cy.get('[data-cy=modal-close-button]').realClick();
      cy.get('@mc-typeahead').invoke('prop', 'showlistonfocus', false);
      cy.get('@input').focus();
      cy.get('@modal-title').should('not.exist');
      cy.get('@modal-close-button').should('not.exist');
    });

    it('typing in the input should open the modal', () => {
      cy.get('@input').focus();
      cy.get('@input').realType('aarhus');
      createAlias();
      cy.get('@modal-title').should('be.visible');
      cy.get('@modal-close-button').should('be.visible');
    });

    it('pressing close button should close the modal', () => {
      cy.get('@input').click();
      createAlias();
      cy.get('@modal-close-button').click();
      cy.get('@modal-title').should('not.exist');
      cy.get('@modal-close-button').should('not.exist');
    });

    it('searching and then choosing an option should close the modal and set the value to the selected option', () => {
      cy.get('@input').click();
      createAlias();

      cy.get('@modal-title').should('be.visible');
      cy.get('@modal-close-button').should('be.visible');
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');

      cy.realType('ap');

      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').should('have.length', 6);

      cy.get('@options').eq(1).click();

      cy.get('@input').should('have.value', 'apricot');

      cy.get('@modal-title').should('not.exist');
      cy.get('@modal-close-button').should('not.exist');
      cy.get('@mc-typeahead').find('mc-button[data-cy="clearButton"]').should('be.visible');
    });

    it('clicking on the clear button should clear the input and keep the modal closed', () => {
      cy.get('@input').click();
      createAlias();

      cy.get('@modal-title').should('be.visible');
      cy.get('@modal-close-button').should('be.visible');
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');

      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').eq(1).click();
      cy.get('@input').should('have.value', 'apricot');

      cy.get('@mc-typeahead').find('mc-button[data-cy="clearButton"]').find('[part=button]').as('clear-button');
      cy.get('@clear-button').should('be.visible');

      cy.get('@clear-button').realClick();

      cy.wait(500);
      cy.get('@input').should('have.value', '');

      //TODO: Temporarily commented out the following code due to being flaky, uncomment and fix when possible
      // cy.get('@modal-title').should('not.exist');
      // cy.get('@modal-close-button').should('not.exist');
    });
    it('clicking on the first option sets value to apple', () => {
      cy.get('@input').click();
      createAlias();

      cy.get('@modal-title').should('be.visible');
      cy.get('@modal-close-button').should('be.visible');
      cy.get('@mc-typeahead').find('mc-option').should('not.exist');

      cy.realType('ap');
      cy.get('@mc-typeahead').find('mc-option').as('options');
      cy.get('@options').eq(0).click();
      cy.get('@input').should('have.value', 'apple');
    });
  });
});
