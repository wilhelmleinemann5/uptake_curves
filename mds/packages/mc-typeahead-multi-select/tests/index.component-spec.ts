import { html } from 'lit';
import '../src';
import { McTypeaheadMultiSelect } from '../src';
import type { IMcTypeaheadData } from '@maersk-global/mds-components-core-typeahead/types';

const fruits = [
  { label: 'apple', value: 'apple' },
  { label: 'banana', value: 'banana' },
  { label: 'cherry', value: 'cherry' },
  { label: 'date', value: 'date' },
  { label: 'elderberry', value: 'elderberry' },
  { label: 'fig', value: 'fig' },
  { label: 'grape', value: 'grape' },
  { label: 'honeydew', value: 'honeydew' },
];

context('@typeahead', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  describe('basic functionality', () => {
    it('mounts correctly', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').should('exist');
    });

    it('displays available options when focused by default', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');
      cy.get('@typeahead').find('mc-option').should('not.exist');
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-option').should('exist');
    });

    it('filters options based on input value', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type 'ap' and verify options are filtered
      cy.get('@input').type('ap');
      cy.get('@typeahead').find('mc-option').should('have.length', 2);
      cy.get('@typeahead').find('mc-option').first().should('contain', 'apple');

      // Clear input and verify all options are shown
      cy.get('@input').clear();
      cy.get('@typeahead').find('mc-option').should('have.length', fruits.length);
    });
  });

  describe('multi-select functionality', () => {
    it('allows selecting multiple options', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Focus and select first option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Focus again and select second option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Verify two tags are rendered
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
    });

    it('fires optionselected event with array of selected options', () => {
      let selectedOptions: IMcTypeaheadData[] = [];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select
          .data=${fruits}
          @optionselected=${(e: CustomEvent) => {
            selectedOptions = e.detail;
          }}
        ></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select first option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      cy.then(() => {
        expect(selectedOptions).to.have.length(1);
        expect(selectedOptions[0].value).to.equal('apple');
      });

      // Select second option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      cy.then(() => {
        expect(selectedOptions).to.have.length(2);
        expect(selectedOptions[1].value).to.equal('banana');
      });
    });

    it('filters out already selected options from dropdown', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select first option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Open dropdown again and verify selected option is not shown
      cy.get('@input').click();
      cy.get('@typeahead')

        .find('mc-popover mc-list mc-option')
        .should('have.length', fruits.length - 1);

      // Verify the first option (apple) is not in the list
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'apple');
    });

    it('clears input value after each selection', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type and select
      cy.get('@input').type('app');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Verify input is cleared
      cy.get('@input').should('have.value', '');
    });
  });

  describe('tag rendering and interaction', () => {
    it('renders tags for selected options', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select two options
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();

      // Verify tags are rendered with correct labels
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).should('have.attr', 'label', 'apple');
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(1).should('have.attr', 'label', 'banana');
    });

    it('allows dismissing individual tags', () => {
      let selectedOptions: IMcTypeaheadData[] = [];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select
          .data=${fruits}
          @optionselected=${(e: CustomEvent) => {
            selectedOptions = e.detail;
          }}
        ></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select two options
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();

      // Dismiss first tag
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).find('mc-button').click();

      // Verify only one tag remains
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).should('have.attr', 'label', 'banana');

      // Verify event fired with updated selection
      cy.then(() => {
        expect(selectedOptions).to.have.length(1);
        expect(selectedOptions[0].value).to.equal('banana');
      });
    });

    it('shows dismissed option back in dropdown', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Dismiss the tag
      cy.get('@typeahead').find('.selected-tags mc-tag').find('mc-button').click();

      // Open dropdown and verify option is back
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'apple');
    });
  });

  describe('clear filters functionality', () => {
    it('shows clear filters button when 2 or more options are selected', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select first option - no clear button yet
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@typeahead').find('.selected-tags mc-button').should('not.exist');

      // Select second option - clear button should appear
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@typeahead').find('.selected-tags mc-button').should('exist');
      cy.get('@typeahead').find('.selected-tags mc-button').should('contain', 'Clear all');
    });

    it('uses custom clear filters label', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} clearalllabel="Remove All"></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select two options
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();

      cy.get('@typeahead').find('.selected-tags mc-button').should('contain', 'Remove All');
    });

    it('hides clear filters button when clearalllabel is empty', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} clearalllabel=""></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select two options
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();

      cy.get('@typeahead').find('.selected-tags mc-button').should('not.exist');
    });

    it('clears all selected options when clear filters button is clicked', () => {
      let selectedOptions: IMcTypeaheadData[] = [];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select
          .data=${fruits}
          @optionselected=${(e: CustomEvent) => {
            selectedOptions = e.detail;
          }}
        ></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select three options
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();

      // Click clear filters button
      cy.get('@typeahead').find('.selected-tags mc-button').click();

      // Verify all tags are cleared
      cy.get('@typeahead').find('.selected-tags mc-tag').should('not.exist');
      cy.get('@typeahead').find('.selected-tags mc-button').should('not.exist');

      // Verify event fired with empty array
      cy.then(() => {
        expect(selectedOptions).to.have.length(0);
      });

      // Verify all options are back in dropdown
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('have.length', fruits.length);
    });
  });

  describe('hiddentags functionality', () => {
    it('hides tags when hiddentags is true', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} hiddentags></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select options
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();

      // Verify tags are not rendered
      cy.get('@typeahead').find('.selected-tags').should('not.exist');
    });

    it('still filters options and fires events when hiddentags is true', () => {
      let selectedOptions: IMcTypeaheadData[] = [];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select
          .data=${fruits}
          hiddentags
          @optionselected=${(e: CustomEvent) => {
            selectedOptions = e.detail;
          }}
        ></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').eq(0).click();

      // Verify event fired
      cy.then(() => {
        expect(selectedOptions).to.have.length(1);
        expect(selectedOptions[0].value).to.equal('apple');
      });

      // Verify option filtered from dropdown
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'apple');
    });
  });

  describe('keyboard behavior', () => {
    it('disables Enter key after selection until user types', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select an option using mouse
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Focus input and try Enter - should not do anything
      cy.get('@input').focus();
      cy.get('@input').type('{enter}');

      // Open dropdown to verify no additional selection occurred
      cy.get('@input').click();
      cy.get('@typeahead')
        .find('mc-popover mc-list mc-option')
        .should('have.length', fruits.length - 1);

      // Type something to re-enable Enter and wait for dropdown to show filtered options
      cy.get('@input').type('b');

      // Wait for the dropdown to be visible with filtered options
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('be.visible');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'banana');

      // Now use keyboard to navigate and select
      cy.get('@input').type('{downarrow}');

      // Press Enter to select the focused option
      cy.get('@input').type('{enter}');

      // Verify second option was selected
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
    });

    it('re-enables Enter key when user starts typing', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type and select option
      cy.get('@input').type('app');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Start typing again - should re-enable Enter
      cy.get('@input').type('ban');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Verify two selections
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
    });
  });

  describe('focus and interaction behavior', () => {
    it('maintains focus on input after selection', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Verify input is still focused (can continue typing)
      cy.get('@input').should('be.focused');
    });

    it('closes popover after selection', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Verify popover is hidden
      cy.get('@typeahead').find('mc-popover').should('not.have.attr', 'show');
    });
  });

  describe('filtering behavior', () => {
    it('shows all unselected options when input is empty', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select one option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Open dropdown with empty input
      cy.get('@input').click();

      // Should show all remaining options
      cy.get('@typeahead')
        .find('mc-popover mc-list mc-option')
        .should('have.length', fruits.length - 1);
    });

    it('filters options by text input while excluding selected ones', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select 'apple'
      cy.get('@input').type('app');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Type 'a' - should show remaining options that contain 'a' but not 'apple'
      cy.get('@input').type('a');

      // Verify 'apple' is not shown but 'banana' and 'grape' are
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'apple');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'banana');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'grape');
    });
  });

  describe('edge cases and error handling', () => {
    it('handles selecting the same option twice gracefully', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select same option twice
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Try to select the same option again (it shouldn't be in the list)
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'apple');

      // Should still have only one tag
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
    });

    it('handles empty data array', () => {
      cy.mount<McTypeaheadMultiSelect>(html`<mc-typeahead-multi-select .data=${[]}></mc-typeahead-multi-select>`).as(
        'typeahead',
      );
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.exist');
    });

    it('handles removal of non-existent option gracefully', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Select an option first
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Try to remove a non-existent option programmatically
      cy.get('@typeahead').then(($wrapper) => {
        const typeahead = $wrapper[0] as McTypeaheadMultiSelect;
        typeahead.removeSelectedOption({ label: 'nonexistent', value: 'nonexistent' });
      });

      // Should still have the original selection
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
    });
  });

  describe('initial selected data functionality', () => {
    it('renders initial selected data as tags', () => {
      const initialSelected = [
        { label: 'apple', value: 'apple' },
        { label: 'banana', value: 'banana' },
      ];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${initialSelected}></mc-typeahead-multi-select>`,
      ).as('typeahead');

      // Verify initial tags are rendered
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).should('have.attr', 'label', 'apple');
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(1).should('have.attr', 'label', 'banana');
    });

    it('filters out initial selected data from dropdown options', () => {
      const initialSelected = [
        { label: 'apple', value: 'apple' },
        { label: 'cherry', value: 'cherry' },
      ];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${initialSelected}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Open dropdown and verify selected options are not shown
      cy.get('@input').click();
      cy.get('@typeahead')
        .find('mc-popover mc-list mc-option')
        .should('have.length', fruits.length - 2);
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'apple');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'cherry');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'banana');
    });

    it('shows clear filters button when initial selected data has 2+ items', () => {
      const initialSelected = [
        { label: 'apple', value: 'apple' },
        { label: 'banana', value: 'banana' },
        { label: 'cherry', value: 'cherry' },
      ];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${initialSelected}></mc-typeahead-multi-select>`,
      ).as('typeahead');

      // Verify clear filters button is shown
      cy.get('@typeahead').find('.selected-tags mc-button').should('exist');
      cy.get('@typeahead').find('.selected-tags mc-button').should('contain', 'Clear all');
    });

    it('allows dismissing individual initial selected tags', () => {
      const initialSelected = [
        { label: 'apple', value: 'apple' },
        { label: 'banana', value: 'banana' },
      ];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${initialSelected}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Dismiss first tag
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).find('mc-button').click();

      // Verify only one tag remains
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).should('have.attr', 'label', 'banana');

      // Verify dismissed option is back in dropdown
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'apple');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'banana');
    });

    it('clears all initial selected data when clear filters button is clicked', () => {
      const initialSelected = [
        { label: 'apple', value: 'apple' },
        { label: 'banana', value: 'banana' },
        { label: 'cherry', value: 'cherry' },
      ];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${initialSelected}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Click clear filters button
      cy.get('@typeahead').find('.selected-tags mc-button').click();

      // Verify all tags are cleared
      cy.get('@typeahead').find('.selected-tags mc-tag').should('not.exist');
      cy.get('@typeahead').find('.selected-tags mc-button').should('not.exist');

      // Verify all options are back in dropdown
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('have.length', fruits.length);
    });

    it('works with hiddentags and initial selected data', () => {
      const initialSelected = [
        { label: 'apple', value: 'apple' },
        { label: 'banana', value: 'banana' },
      ];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select
          .data=${fruits}
          .selecteddata=${initialSelected}
          hiddentags
        ></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Verify tags are not rendered
      cy.get('@typeahead').find('.selected-tags').should('not.exist');

      // But options should still be filtered from dropdown
      cy.get('@input').click();
      cy.get('@typeahead')
        .find('mc-popover mc-list mc-option')
        .should('have.length', fruits.length - 2);
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'apple');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'banana');
    });

    it('fires optionselected event when initial selected data is modified', () => {
      const initialSelected = [
        { label: 'apple', value: 'apple' },
        { label: 'banana', value: 'banana' },
      ];
      let selectedOptions: IMcTypeaheadData[] = [];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select
          .data=${fruits}
          .selecteddata=${initialSelected}
          @optionselected=${(e: CustomEvent) => {
            selectedOptions = e.detail;
          }}
        ></mc-typeahead-multi-select>`,
      ).as('typeahead');

      // Dismiss a tag
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).find('mc-button').click();

      // Verify event was fired with updated selection
      cy.then(() => {
        expect(selectedOptions).to.have.length(1);
        expect(selectedOptions[0].value).to.equal('banana');
      });
    });

    it('allows adding to initial selected data', () => {
      const initialSelected = [{ label: 'apple', value: 'apple' }];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${initialSelected}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Add another option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Verify both tags are now shown
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).should('have.attr', 'label', 'apple');
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(1).should('have.attr', 'label', 'banana');
    });

    it('handles empty initial selected data', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${[]}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Verify no tags are rendered
      cy.get('@typeahead').find('.selected-tags').should('not.exist');

      // Verify all options are available
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('have.length', fruits.length);
    });

    it('updates when selecteddata property is changed programmatically', () => {
      const initialSelected = [{ label: 'apple', value: 'apple' }];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} .selecteddata=${initialSelected}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Verify initial state
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);

      // Update selecteddata programmatically
      cy.get('@typeahead').then(($wrapper) => {
        const typeahead = $wrapper[0] as McTypeaheadMultiSelect;
        typeahead.selecteddata = [
          { label: 'banana', value: 'banana' },
          { label: 'cherry', value: 'cherry' },
        ];
      });

      // Verify tags updated
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).should('have.attr', 'label', 'banana');
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(1).should('have.attr', 'label', 'cherry');

      // Verify dropdown filters updated
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'apple');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'banana');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'cherry');
    });
  });

  describe('custom tag creation functionality', () => {
    it('allows creating custom tags when freetexttagging is true', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type a custom tag value and press Enter
      cy.get('@input').type('custom-fruit{enter}');

      // Verify custom tag is created
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
      cy.get('@typeahead')
        .find('.selected-tags mc-tag')
        .find('slot[data-cy="label"]')
        .should('contain', 'custom-fruit');

      // Verify input is cleared after creating custom tag
      cy.get('@input').should('have.value', '');
    });

    it('does not create custom tags when freetexttagging is false', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits}></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type a custom tag value and press Enter
      cy.get('@input').type('custom-fruit{enter}');

      // Verify no custom tag is created
      cy.get('@typeahead').find('.selected-tags mc-tag').should('not.exist');

      // Verify input still has the value
      cy.get('@input').should('have.value', 'custom-fruit');
    });

    it('does not create custom tag if value matches existing option', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type existing option value to filter dropdown
      cy.get('@input').type('apple');

      // Wait for dropdown to show filtered options
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('be.visible');

      // Press Enter to select the filtered option
      cy.get('@input').type('{enter}');

      // Should select the existing option instead of creating custom tag
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
      cy.get('@typeahead').find('.selected-tags mc-tag').find('slot[data-cy="label"]').should('contain', 'apple');

      // Input should be cleared
      cy.get('@input').should('have.value', '');
    });

    it('does not create custom tag for empty input', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Press Enter without typing anything
      cy.get('@input').type('{enter}');

      // Verify no custom tag is created
      cy.get('@typeahead').find('.selected-tags mc-tag').should('not.exist');
    });

    it('allows dismissing custom tags', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Create a custom tag
      cy.get('@input').type('custom-fruit{enter}');
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);

      // Dismiss the custom tag
      cy.get('@typeahead').find('.selected-tags mc-tag').find('button').click();

      // Verify custom tag is removed
      cy.get('@typeahead').find('.selected-tags mc-tag').should('not.exist');
    });

    it('custom tags do not affect dropdown options', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Create a custom tag with same name as existing option
      cy.get('@input').type('apple-custom{enter}');

      // Verify custom tag is created
      cy.get('@typeahead')
        .find('.selected-tags mc-tag')
        .find('slot[data-cy="label"]')
        .should('contain', 'apple-custom');

      // Focus input to show dropdown
      cy.get('@input').click();

      // Verify original 'apple' option is still available in dropdown
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'apple');

      // Select the original apple option
      cy.get('@typeahead').find('mc-popover mc-list mc-option').contains('apple').click();

      // Verify both tags exist
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);
      cy.get('@typeahead')
        .find('.selected-tags mc-tag')
        .eq(0)
        .find('slot[data-cy="label"]')
        .should('contain', 'apple-custom');
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(1).find('slot[data-cy="label"]').should('contain', 'apple');
    });

    it('dismissing custom tags does not restore dropdown options', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Create a custom tag
      cy.get('@input').type('custom-fruit{enter}');

      // Select a regular option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').contains('apple').click();

      // Verify both tags exist
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 2);

      // Dismiss the custom tag
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(0).find('button').click();

      // Focus input to show dropdown
      cy.get('@input').click();

      // Verify apple is still not in dropdown (because it was selected as regular option)
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.contain', 'apple');

      // Verify other options are still available
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'banana');
    });

    it('fires optionselected event when custom tag is created', () => {
      let selectedOptions: IMcTypeaheadMultiSelectData[] = [];

      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select
          .data=${fruits}
          freetexttagging
          @optionselected=${(e: CustomEvent) => {
            selectedOptions = e.detail;
          }}
        ></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Create a custom tag
      cy.get('@input').type('custom-fruit{enter}');

      cy.then(() => {
        expect(selectedOptions).to.have.length(1);
        expect(selectedOptions[0].label).to.equal('custom-fruit');
        expect(selectedOptions[0].value).to.equal('custom-fruit');
        expect(selectedOptions[0].isCustomTag).to.be.true;
      });
    });

    it('handles custom tags with mixed regular selections', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Create a custom tag
      cy.get('@input').type('custom-fruit{enter}');

      // Select a regular option
      cy.get('@input').click();
      cy.get('@typeahead').find('mc-popover mc-list mc-option').first().click();

      // Create another custom tag
      cy.get('@input').type('another-custom{enter}');

      // Verify all tags are present
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 3);
      cy.get('@typeahead')
        .find('.selected-tags mc-tag')
        .eq(0)
        .find('slot[data-cy="label"]')
        .should('contain', 'custom-fruit');
      cy.get('@typeahead').find('.selected-tags mc-tag').eq(1).find('slot[data-cy="label"]').should('contain', 'apple');
      cy.get('@typeahead')
        .find('.selected-tags mc-tag')
        .eq(2)
        .find('slot[data-cy="label"]')
        .should('contain', 'another-custom');
    });

    it('trims whitespace from custom tag input', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type custom tag with whitespace
      cy.get('@input').type('  custom-fruit  {enter}');

      // Verify custom tag is created with trimmed value
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
      cy.get('@typeahead')
        .find('.selected-tags mc-tag')
        .find('slot[data-cy="label"]')
        .should('contain', 'custom-fruit');
    });

    it('selects matching option from dropdown when typing partial match instead of creating custom tag', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type partial text that matches an existing option
      cy.get('@input').type('app');

      // Wait for dropdown to show filtered options containing "apple"
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('be.visible');
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('contain', 'apple');

      // Press Enter to select the first/highlighted option from dropdown
      cy.get('@input').type('{enter}');

      // Should select "apple" from dropdown, not create a custom tag with "app"
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
      cy.get('@typeahead').find('.selected-tags mc-tag').find('slot[data-cy="label"]').should('contain', 'apple');

      // Input should be cleared
      cy.get('@input').should('have.value', '');
    });

    it('creates custom tag when no dropdown options match the input', () => {
      cy.mount<McTypeaheadMultiSelect>(
        html`<mc-typeahead-multi-select .data=${fruits} freetexttagging></mc-typeahead-multi-select>`,
      ).as('typeahead');
      cy.get('@typeahead').find('input[data-cy="input"]').as('input');

      // Type text that doesn't match any existing options
      cy.get('@input').type('xyz');

      // Verify no dropdown options are visible (all filtered out)
      cy.get('@typeahead').find('mc-popover mc-list mc-option').should('not.exist');

      // Press Enter to create custom tag
      cy.get('@input').type('{enter}');

      // Should create custom tag with "xyz"
      cy.get('@typeahead').find('.selected-tags mc-tag').should('have.length', 1);
      cy.get('@typeahead').find('.selected-tags mc-tag').find('slot[data-cy="label"]').should('contain', 'xyz');

      // Input should be cleared
      cy.get('@input').should('have.value', '');
    });
  });
});
