import { html } from 'lit';
import { McList } from '../src';
import '../src';
import '@maersk-global/mds-components-core-list-item';
import '@maersk-global/mds-components-core-input';
import { McListItem } from '@maersk-global/mds-components-core-list-item';

describe('mc-list', () => {
  describe('initialization', () => {
    it("generates value according to the item's index + 1 when no value is supplied", () => {
      cy.mount(html`
        <mc-list type="multiple">
          <mc-list-item>One</mc-list-item>
          <mc-list-item>Two</mc-list-item>
          <mc-list-item>Third</mc-list-item>
        </mc-list>
      `).as('mc-list');

      cy.get('@mc-list')
        .find('mc-list-item')
        .each(($item, index) => expect($item[0].value).to.equal(index));
    });
  });

  describe('role', () => {
    it("sets all buttons in the list items aria role to 'listitem' by default", () => {
      cy.mount<McList>(
        html` <mc-list>
          <mc-list-item label="One"></mc-list-item>
          <mc-list-item label="Two"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list')
        .find('mc-list-item')
        .find('mc-button')
        .find('.mc-button')
        .should('have.attr', 'role', 'listitem');
    });

    it("changes the aria role of every button in the list item to 'menuitem', if list role is set to 'menu'", () => {
      cy.mount<McList>(
        html` <mc-list role="menu">
          <mc-list-item label="One"></mc-list-item>
          <mc-list-item label="Two"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').find('mc-list-item').find('button').should('have.attr', 'role', 'menuitem');
    });
  });

  describe('fit', () => {
    it("sets all list items' fit to 'small' when the list's fit is 'small'", () => {
      cy.mount<McList>(
        html` <mc-list fit="small">
          <mc-list-item label="One"></mc-list-item>
          <mc-list-item label="Two"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').find('mc-list-item').should('have.attr', 'fit', 'small');
    });
  });

  describe('listchangeevent', () => {
    it('dispatches a "listchange" event with the clicked list item included in the payload', () => {
      const eventHandlerSpy = cy.spy().as('onEventSpy');
      cy.mount<McList>(
        html`<mc-list @listchange="${(e): void => eventHandlerSpy(e)}">
          <mc-list-item label="One"></mc-list-item>
          <mc-list-item label="Two"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').find('mc-list-item').eq(1).as('second-list-item');

      cy.get('@second-list-item').then(($el) => {
        const secondItemHtmlElement = $el.get(0);
        cy.get('@second-list-item').find('button').click();

        cy.get('@onEventSpy').its('callCount').should('eq', 1);
        cy.get('@onEventSpy').should('have.been.calledWithMatch', {
          detail: { item: secondItemHtmlElement },
        });
      });
    });
  });

  describe('arrow navigation', () => {
    describe('in vertical orientation', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html` <mc-list>
              <mc-list-item label="One"></mc-list-item>
              <mc-list-item label="Two"></mc-list-item>
              <mc-list-item label="Three"></mc-list-item>
            </mc-list>
            <button id="outside-element">outside element</button>`,
        );
        cy.get('mc-list').as('mc-list');
        cy.get('#outside-element').as('outside-element');
      });
      it('focuses on first item once tab is pressed', () => {
        cy.realPress('Tab');
        cy.get('@mc-list').find('mc-list-item').eq(0).should('have.focus');
      });

      it('removes the focus from the list once tab is pressed while a list item is already focused', () => {
        cy.realPress('Tab');
        cy.realPress('Tab');

        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@list-items').eq(0).should('not.have.focus');
        cy.get('@list-items').eq(1).should('not.have.focus');
        cy.get('@list-items').eq(2).should('not.have.focus');
        cy.get('@outside-element').should('have.focus');
      });

      it('moves the focus to the second item once the ArrowDown is pressed while the first item is focused', () => {
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@list-items').eq(0).find('button').focus();
        cy.realPress('ArrowDown');

        cy.get('@list-items').eq(0).should('not.have.focus');
        cy.get('@list-items').eq(1).should('have.focus');
        cy.get('@list-items').eq(2).should('not.have.focus');
      });

      it('moves the focus back to the first item once key navigation reaches the bottom', () => {
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@list-items').eq(0).find('button').focus();
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');

        cy.get('@list-items').eq(0).should('have.focus');
        cy.get('@list-items').eq(1).should('not.have.focus');
        cy.get('@list-items').eq(2).should('not.have.focus');
      });

      it('moves the focus to the last item once key navigation reaches the top', () => {
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@list-items').eq(0).find('button').focus();
        cy.realPress('ArrowUp');

        cy.get('@list-items').eq(0).should('not.have.focus');
        cy.get('@list-items').eq(1).should('not.have.focus');
        cy.get('@list-items').eq(2).should('have.focus');
      });
    });

    describe('tab navigation', () => {
      beforeEach(() => {
        cy.mount(html`
          <mc-list keynavigationtype="tab">
            <mc-list-item value="One">One</mc-list-item>
            <mc-list-item value="Two">Two</mc-list-item>
            <mc-list-item value="Three">Three</mc-list-item>
          </mc-list>
          <button id="outside-element">outside element</button>
        `).as('mc-list');
        cy.get('mc-list').as('mc-list');
        cy.get('#outside-element').as('outside-element');
        cy.get('@mc-list').find('mc-list-item').as('list-items');
      });

      it('should not focused any item initially', () => {
        cy.get('@list-items').should('not.have.focus');
      });

      it('should select single item on tab navigation and with pressing enter', () => {
        cy.get('@mc-list').invoke('prop', 'type', 'single');
        cy.get('@list-items').eq(0).find('button').as('button');
        cy.get('@button').focus();
        cy.get('@button').realPress('Tab');
        cy.get('@list-items').eq(1).should('have.focus');
        cy.focused().realPress('Enter');
        cy.get('@list-items').eq(1).should('have.attr', 'selected');

        cy.focused().realPress('Tab');

        cy.get('@list-items').eq(2).should('have.focus');
        cy.focused().realPress('Enter');
        cy.get('@list-items').eq(2).should('have.attr', 'selected');

        cy.focused().realPress('Tab');

        cy.get('@list-items').eq(0).should('not.have.attr', 'selected');
        cy.get('@list-items').eq(1).should('not.have.attr', 'selected');
        cy.get('@list-items').eq(2).should('have.attr', 'selected');

        cy.get('@list-items').should('not.have.focus');
        cy.get('@outside-element').should('have.focus');
      });

      it('should navigate and select multiple items on tab navigation and with pressing enter', () => {
        cy.get('@mc-list').invoke('prop', 'type', 'multiple');
        cy.get('@list-items').eq(0).find('input[type="checkbox"]').as('checkbox');
        cy.get('@checkbox').focus();
        cy.get('@checkbox').realPress('Tab');
        cy.get('@list-items').eq(1).should('have.focus');
        cy.focused().realPress('Enter');
        cy.get('@list-items').eq(1).should('have.attr', 'selected');

        cy.focused().realPress('Tab');

        cy.get('@list-items').eq(2).should('have.focus');
        cy.focused().realPress('Enter');
        cy.get('@list-items').eq(2).should('have.attr', 'selected');

        cy.focused().realPress(['Shift', 'Tab']);
        cy.get('@list-items').eq(1).should('have.focus');
        cy.focused().realPress('Enter');
        cy.get('@list-items').eq(1).should('not.have.attr', 'selected');

        cy.focused().realPress('Tab');
        cy.focused().realPress('Tab');

        cy.get('@list-items').eq(0).should('not.have.attr', 'selected');
        cy.get('@list-items').eq(1).should('not.have.attr', 'selected');
        cy.get('@list-items').eq(2).should('have.attr', 'selected');

        cy.get('@list-items').should('not.have.focus');
        cy.get('@outside-element').should('have.focus');
      });
    });

    describe('in horizontal orientation', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html` <mc-list orientation="horizontal">
            <mc-list-item label="One"></mc-list-item>
            <mc-list-item label="Two"></mc-list-item>
            <mc-list-item label="Three"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
      });

      it('moves the focus to the second item once the ArrowRight is pressed while the first item is focused', () => {
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@list-items').eq(0).find('button').focus();
        cy.realPress('ArrowRight');

        cy.get('@list-items').eq(0).should('not.have.focus');
        cy.get('@list-items').eq(1).should('have.focus');
        cy.get('@list-items').eq(2).should('not.have.focus');
      });

      it('moves the focus back to the first item once key navigation reaches the last item', () => {
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@list-items').eq(0).find('button').focus();
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowLeft');

        cy.get('@list-items').eq(0).should('have.focus');
        cy.get('@list-items').eq(1).should('not.have.focus');
        cy.get('@list-items').eq(2).should('not.have.focus');
      });

      it('moves the focus to the last item once key navigation reaches the first item', () => {
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@list-items').eq(0).find('button').focus();
        cy.realPress('ArrowLeft');

        cy.get('@list-items').eq(0).should('not.have.focus');
        cy.get('@list-items').eq(1).should('not.have.focus');
        cy.get('@list-items').eq(2).should('have.focus');
      });
    });
  });

  describe('mouse navigation', () => {
    const hoverColor = 'rgb(240, 240, 240)';
    const transparent = 'rgba(0, 0, 0, 0)';
    beforeEach(() => {
      cy.mount<McList>(
        html`<mc-list>
          <mc-list-item label="One"></mc-list-item>
          <mc-list-item label="Two"></mc-list-item>
          <mc-list-item label="Three"></mc-list-item>
        </mc-list>`,
      );
      cy.get('mc-list').find('mc-list-item').as('items');
    });
    it('focuses on first item when mouse over', () => {
      cy.get('@items').eq(0).realHover('mouse');
      cy.get('@items').eq(0).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('body').click();
      cy.get('@items').eq(0).realHover('mouse');
      cy.get('@items').eq(0).find('button').should('have.css', 'background-color', hoverColor);
    });
    it('focuses on last item when mouse over', () => {
      cy.get('@items').eq(2).realHover('mouse');
      cy.get('@items').eq(2).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('body').click();
      cy.get('@items').eq(2).realHover('mouse');
      cy.get('@items').eq(2).find('button').should('have.css', 'background-color', hoverColor);
    });
    it('focuses on items when mouse over', () => {
      cy.get('@items').eq(0).realHover('mouse');
      cy.get('@items').eq(0).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@items').eq(1).find('button').should('have.css', 'background-color', transparent);
      cy.get('@items').eq(2).find('button').should('have.css', 'background-color', transparent);
      cy.get('@items').eq(1).realHover('mouse');
      cy.get('@items').eq(0).find('button').should('have.css', 'background-color', transparent);
      cy.get('@items').eq(1).find('button').should('have.css', 'background-color', hoverColor);
      cy.get('@items').eq(2).find('button').should('have.css', 'background-color', transparent);
      cy.get('@items').eq(2).realHover('mouse');
      cy.get('@items').eq(0).find('button').should('have.css', 'background-color', transparent);
      cy.get('@items').eq(1).find('button').should('have.css', 'background-color', transparent);
      cy.get('@items').eq(2).find('button').should('have.css', 'background-color', hoverColor);
    });
  });

  describe('single selection', () => {
    it('preselcts the item with the supplied value and selected item should get the initial focus on tab', () => {
      cy.mount<McList>(
        html`<mc-list type="single">
          <mc-list-item value="one" selected label="One"></mc-list-item>
          <mc-list-item value="two" label="Two"></mc-list-item>
          <mc-list-item value="three" label="Three"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').invoke('prop', 'value', 'two');
      cy.get('@mc-list').find('mc-list-item').as('list-items');

      cy.realPress('Tab');
      cy.get('@list-items').eq(0).should('not.have.attr', 'selected');
      cy.get('@list-items').eq(0).find('mc-button').find('button').should('have.attr', 'tabindex', -1);
      cy.get('@list-items').eq(1).should('have.attr', 'selected');
      cy.get('@list-items').eq(1).find('mc-button').find('button').should('have.attr', 'tabindex', 0);
      cy.get('@list-items').eq(2).should('not.have.attr', 'selected');
      cy.get('@list-items').eq(2).find('mc-button').find('button').should('have.attr', 'tabindex', -1);
    });

    it('checks second item when resetting the value from outside to "two"', () => {
      cy.mount<McList>(
        html`<mc-list type="single" .value="${'two'}">
          <mc-list-item value="one" selected label="One"></mc-list-item>
          <mc-list-item value="two" label="Two"></mc-list-item>
          <mc-list-item value="three" label="Three"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').then(($el) => {
        ($el[0] as McListItem).value = 'three';
        cy.get('@mc-list').find('mc-list-item').as('list-items');

        cy.get('@list-items').eq(0).should('not.have.attr', 'selected');
        cy.get('@list-items').eq(1).should('not.have.attr', 'selected');
        cy.get('@list-items').eq(2).should('have.attr', 'selected');
      });
    });

    it('checks only the second item upon a click on the second item and deselects all others', () => {
      cy.mount<McList>(
        html`<mc-list type="single" .value="${'two'}">
          <mc-list-item value="one" selected label="One"></mc-list-item>
          <mc-list-item value="two" label="Two"></mc-list-item>
          <mc-list-item value="three" label="Three"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').find('mc-list-item').as('list-items');
      cy.get('@list-items').eq(1).click();

      cy.get('@list-items').eq(0).should('not.have.attr', 'selected');
      cy.get('@list-items').eq(1).should('have.attr', 'selected');
      cy.get('@list-items').eq(2).should('not.have.attr', 'selected');
    });
  });

  describe('multiple selection', () => {
    it('preselcts the items with the supplied value and the first selected item should get the initial focus on tab', () => {
      cy.mount<McList>(
        html`<mc-list type="multiple">
          <mc-list-item value="one" label="One"></mc-list-item>
          <mc-list-item value="two" label="Two"></mc-list-item>
          <mc-list-item value="three" label="Three"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').find('mc-list-item').as('list-items');
      cy.get('@mc-list').invoke('prop', 'value', ['one', 'three']);
      cy.get('@list-items').eq(0).should('have.attr', 'selected');
      cy.get('@list-items').eq(0).find('mc-checkbox').find('input').eq(1).should('have.attr', 'checked');
      cy.get('@list-items').eq(1).should('not.have.attr', 'selected');
      cy.get('@list-items').eq(1).find('mc-checkbox').find('input').eq(1).should('not.have.attr', 'checked');
      cy.get('@list-items').eq(2).should('have.attr', 'selected');
      cy.get('@list-items').eq(2).find('mc-checkbox').find('input').eq(1).should('have.attr', 'checked');
      cy.realPress('Tab');
      cy.realPress('ArrowDown');
      cy.get('@list-items').eq(0).find('mc-checkbox').find('input').eq(1).should('have.attr', 'tabindex', -1);
      cy.get('@list-items').eq(1).find('mc-checkbox').find('input').eq(1).should('have.attr', 'tabindex', 0);
      cy.get('@list-items').eq(2).find('mc-checkbox').find('input').eq(1).should('have.attr', 'tabindex', -1);
    });

    it('checks the second and last items when resetting the value from outside to ["two", "three"]', () => {
      cy.mount<McList>(
        html`<mc-list type="multiple" .value="${['one', 'three']}">
          <mc-list-item value="one" label="One"></mc-list-item>
          <mc-list-item value="two" label="Two"></mc-list-item>
          <mc-list-item value="three" label="Three"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').then(($el) => {
        ($el[0] as McListItem).value = ['two', 'three'];
        cy.get('@mc-list').find('mc-list-item').as('list-items');

        cy.get('@list-items').eq(0).should('not.have.attr', 'selected');
        cy.get('@list-items').eq(1).should('have.attr', 'selected');
        cy.get('@list-items').eq(2).should('have.attr', 'selected');
      });
    });

    it('sets the first and second items via value prop as an array and first item upon a click', () => {
      cy.mount<McList>(
        html`<mc-list type="multiple" .value="${['one', 'two']}">
          <mc-list-item value="one" label="One"></mc-list-item>
          <mc-list-item value="two" label="Two"></mc-list-item>
          <mc-list-item value="three" label="Three"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').find('mc-list-item').as('list-items');
      cy.get('@list-items').eq(0).should('have.attr', 'selected');
      cy.get('@list-items').eq(1).should('have.attr', 'selected');

      cy.get('@list-items').eq(2).should('not.have.attr', 'selected');
      cy.get('@list-items').eq(2).click();
      cy.get('@list-items').eq(2).should('have.attr', 'selected');
    });

    it('sets the first and second items via value prop as a string and first item upon a click', () => {
      cy.mount<McList>(
        html`<mc-list type="multiple" .value="${'one,two'}">
          <mc-list-item value="one" label="One"></mc-list-item>
          <mc-list-item value="two" label="Two"></mc-list-item>
          <mc-list-item value="three" label="Three"></mc-list-item>
        </mc-list>`,
      ).as('mc-list');
      cy.get('@mc-list').find('mc-list-item').as('list-items');
      cy.get('@list-items').eq(0).should('have.attr', 'selected');
      cy.get('@list-items').eq(1).should('have.attr', 'selected');

      cy.get('@list-items').eq(2).should('not.have.attr', 'selected');
      cy.get('@list-items').eq(2).click();
      cy.get('@list-items').eq(2).should('have.attr', 'selected');
    });

    it('checks the first and third item on keyboard navigation, while the second item is already selected', () => {
      cy.mount<McList>(
        html`<button>Focus</button
          ><mc-list type="multiple">
            <mc-list-item value="one" label="One"></mc-list-item>
            <mc-list-item value="two" selected label="Two"></mc-list-item>
            <mc-list-item value="three" label="Three"></mc-list-item>
          </mc-list>`,
      );
      cy.get('mc-list').as('mc-list');
      cy.get('@mc-list').find('mc-list-item').as('list-items');
      cy.get('button').focus();
      cy.realPress('Tab');
      cy.get('@list-items').eq(0).should('have.focus');
      cy.realPress('Space');
      cy.get('@list-items').eq(0).should('have.attr', 'selected');
      cy.realPress('Space');
      cy.get('@list-items').eq(0).should('not.have.attr', 'selected');
      cy.realPress('ArrowDown');
      cy.get('@list-items').eq(1).should('have.focus');
      cy.realPress('Space');
      cy.get('@list-items').eq(1).should('not.have.attr', 'selected');
      cy.realPress('ArrowDown');
      cy.get('@list-items').eq(2).should('have.focus');
      cy.realPress('Space');
      cy.get('@list-items').eq(2).should('have.attr', 'selected');
    });
  });

  describe('list search functionality', () => {
    describe('basic search functionality', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html`<mc-list listsearch>
            <mc-list-item label="Apple" sublabel="Red fruit"></mc-list-item>
            <mc-list-item label="Banana" sublabel="Yellow fruit"></mc-list-item>
            <mc-list-item label="Cherry" sublabel="Small red fruit"></mc-list-item>
            <mc-list-item label="Date" sublabel="Brown fruit"></mc-list-item>
            <mc-list-item label="Elderberry" sublabel="Dark purple fruit"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@mc-list').find('.list-search').find('input').as('search-input');
      });

      it('renders search input when listsearch is enabled', () => {
        cy.get('@search-input').should('be.visible');
        cy.get('@search-input').should('have.attr', 'placeholder', 'Search in the list');
      });

      it('filters items based on search input - contains filter', () => {
        cy.get('@search-input').type('app');

        // Apple should be visible
        cy.get('@list-items').eq(0).should('be.visible');
        // Other items should be hidden
        cy.get('@list-items').eq(1).should('not.be.visible');
        cy.get('@list-items').eq(2).should('not.be.visible');
        cy.get('@list-items').eq(3).should('not.be.visible');
        cy.get('@list-items').eq(4).should('not.be.visible');
      });

      it('filters items based on search input - case insensitive', () => {
        cy.get('@search-input').type('BANANA');

        // Banana should be visible
        cy.get('@list-items').eq(1).should('be.visible');
        // Other items should be hidden
        cy.get('@list-items').eq(0).should('not.be.visible');
        cy.get('@list-items').eq(2).should('not.be.visible');
        cy.get('@list-items').eq(3).should('not.be.visible');
        cy.get('@list-items').eq(4).should('not.be.visible');
      });

      it('shows all items when search input is empty', () => {
        cy.get('@search-input').type('app');
        cy.get('@search-input').clear();

        // All items should be visible
        cy.get('@list-items').eq(0).should('be.visible');
        cy.get('@list-items').eq(1).should('be.visible');
        cy.get('@list-items').eq(2).should('be.visible');
        cy.get('@list-items').eq(3).should('be.visible');
        cy.get('@list-items').eq(4).should('be.visible');
      });

      it('filters items based on sublabel content', () => {
        cy.get('@search-input').type('red');

        // Apple and Cherry should be visible (both have "red" in sublabel)
        cy.get('@list-items').eq(0).should('be.visible'); // Apple - Red fruit
        cy.get('@list-items').eq(2).should('be.visible'); // Cherry - Small red fruit
        // Other items should be hidden
        cy.get('@list-items').eq(1).should('not.be.visible');
        cy.get('@list-items').eq(3).should('not.be.visible');
        cy.get('@list-items').eq(4).should('not.be.visible');
      });

      it('shows no results when search does not match any items', () => {
        cy.get('@search-input').type('xyz');

        // All items should be hidden
        cy.get('@list-items').eq(0).should('not.be.visible');
        cy.get('@list-items').eq(1).should('not.be.visible');
        cy.get('@list-items').eq(2).should('not.be.visible');
        cy.get('@list-items').eq(3).should('not.be.visible');
        cy.get('@list-items').eq(4).should('not.be.visible');
      });
    });

    describe('search with different filter types', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html`<mc-list listsearch filtertype="startsWith">
            <mc-list-item label="Apple"></mc-list-item>
            <mc-list-item label="Apricot"></mc-list-item>
            <mc-list-item label="Banana"></mc-list-item>
            <mc-list-item label="Pineapple"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@mc-list').find('.list-search').find('input').as('search-input');
      });

      it('filters items using startsWith filter', () => {
        cy.get('@search-input').type('ap');

        // Apple and Apricot should be visible (start with "ap")
        cy.get('@list-items').eq(0).should('be.visible'); // Apple
        cy.get('@list-items').eq(1).should('be.visible'); // Apricot
        // Banana and Pineapple should be hidden
        cy.get('@list-items').eq(2).should('not.be.visible'); // Banana
        cy.get('@list-items').eq(3).should('not.be.visible'); // Pineapple (contains "ap" but doesn't start with it)
      });
    });

    describe('search with custom filter function', () => {
      beforeEach(() => {
        const customFilter = (text: string, searchValue: string) => {
          // Custom filter that only matches exact words
          const words = text.toLowerCase().split(' ');
          return words.includes(searchValue.toLowerCase()) ? [searchValue] : [];
        };

        cy.mount<McList>(
          html`<mc-list listsearch .customfilter=${customFilter}>
            <mc-list-item label="Red Apple"></mc-list-item>
            <mc-list-item label="Green Apple"></mc-list-item>
            <mc-list-item label="Apple Pie"></mc-list-item>
            <mc-list-item label="Applesauce"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@mc-list').find('.list-search').find('input').as('search-input');
      });

      it('filters items using custom filter function', () => {
        cy.get('@search-input').type('apple');

        // Red Apple, Green Apple, and Apple Pie should be visible (contain "apple" as a word)
        cy.get('@list-items').eq(0).should('be.visible'); // Red Apple
        cy.get('@list-items').eq(1).should('be.visible'); // Green Apple
        cy.get('@list-items').eq(2).should('be.visible'); // Apple Pie
        // Applesauce should be hidden (contains "apple" but not as a separate word)
        cy.get('@list-items').eq(3).should('not.be.visible'); // Applesauce
      });
    });

    describe('search with matchlabelonly option', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html`<mc-list listsearch matchlabelonly>
            <mc-list-item label="Apple" sublabel="Red fruit"></mc-list-item>
            <mc-list-item label="Banana" sublabel="Yellow fruit"></mc-list-item>
            <mc-list-item label="Cherry" sublabel="Small red fruit"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@mc-list').find('.list-search').find('input').as('search-input');
      });

      it('filters items based on label only, ignoring sublabel', () => {
        cy.get('@search-input').type('red');

        // No items should be visible because "red" is only in sublabels, not labels
        cy.get('@list-items').eq(0).should('not.be.visible');
        cy.get('@list-items').eq(1).should('not.be.visible');
        cy.get('@list-items').eq(2).should('not.be.visible');
      });

      it('filters items based on label content when matchlabelonly is true', () => {
        cy.get('@search-input').type('app');

        // Apple should be visible
        cy.get('@list-items').eq(0).should('be.visible');
        // Other items should be hidden
        cy.get('@list-items').eq(1).should('not.be.visible');
        cy.get('@list-items').eq(2).should('not.be.visible');
      });
    });

    describe('clearListSearch method', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html`<mc-list listsearch>
            <mc-list-item label="Apple"></mc-list-item>
            <mc-list-item label="Banana"></mc-list-item>
            <mc-list-item label="Cherry"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
        cy.get('@mc-list').find('mc-list-item').as('list-items');
        cy.get('@mc-list').find('.list-search').find('input').as('search-input');
      });

      it('clears search input and shows all items when clearListSearch is called', () => {
        // First, search for something
        cy.get('@search-input').type('app');
        cy.get('@search-input').should('have.value', 'app');
        cy.get('@list-items').eq(0).should('be.visible'); // Apple
        cy.get('@list-items').eq(1).should('not.be.visible'); // Banana
        cy.get('@list-items').eq(2).should('not.be.visible'); // Cherry

        // Call clearListSearch method
        cy.get('@mc-list').then(($el) => {
          ($el[0] as McList).clearListSearch();
        });

        // Verify search input is cleared and all items are visible
        cy.get('@search-input').should('have.value', '');
        cy.get('@list-items').eq(0).should('be.visible');
        cy.get('@list-items').eq(1).should('be.visible');
        cy.get('@list-items').eq(2).should('be.visible');
      });
    });

    describe('search with custom placeholder', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html`<mc-list listsearch listsearchplaceholder="Find items...">
            <mc-list-item label="Apple"></mc-list-item>
            <mc-list-item label="Banana"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
        cy.get('@mc-list').find('.list-search').find('input').as('search-input');
      });

      it('uses custom placeholder text', () => {
        cy.get('@search-input').should('have.attr', 'placeholder', 'Find items...');
      });
    });

    describe('search without listsearch enabled', () => {
      beforeEach(() => {
        cy.mount<McList>(
          html`<mc-list>
            <mc-list-item label="Apple"></mc-list-item>
            <mc-list-item label="Banana"></mc-list-item>
          </mc-list>`,
        ).as('mc-list');
      });

      it('does not render search input when listsearch is disabled', () => {
        cy.get('@mc-list').find('.list-search').should('not.exist');
      });
    });
  });
});
