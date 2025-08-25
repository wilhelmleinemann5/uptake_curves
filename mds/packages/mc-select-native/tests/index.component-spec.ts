import { html } from 'lit';
import '../src';
import { McSelectNative } from '../src';
import { SelectOption } from '../src/lib/types';

const inputName = 'test';
const options = [
  {
    value: 0,
    label: 'Zero',
  },
  {
    value: 1,
    label: 'One',
  },
  {
    value: 2,
    label: 'Two',
  },
  {
    value: 3,
    label: 'Three',
  },
  {
    value: 4,
    label: 'Four',
  },
  {
    value: 5,
    label: 'Five',
  },
];

const expectedValueMultiple: SelectOption[] = [
  {
    value: 0,
    label: 'Zero',
  },
  {
    value: 1,
    label: 'One',
  },
];

context('mc-select-native', () => {
  it('parent form should be able to get the value of the input, when value prop is set', () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native
          name="${inputName}"
          .value="${expectedValueMultiple}"
          .options="${options}"
          variant="multiple"
        ></mc-select-native>
      </form>`,
    );

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal(JSON.stringify(expectedValueMultiple));
    });
  });

  it('parent form gets empty value as the value of the input is not set', () => {
    cy.mount<McSelectNative>(
      html`<form><mc-select-native name="${inputName}" .options="${options}"></mc-select-native></form>`,
    );
    cy.get('mc-select-native').find(':selected').contains('Select an item');

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName).toString()).to.equal('undefined');
    });
  });

  it('parent form gets updated and represents the second option when setting selectedindex to [2]', () => {
    const selectedIndex = [2];
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native
          name="${inputName}"
          .selectedindex="${selectedIndex}"
          .options="${options}"
        ></mc-select-native>
      </form>`,
    );

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal(JSON.stringify([options[2]]));
    });
  });

  it('parent form gets updated and represents the second and third option when setting selectedindex to [2, 3] and select is multiple', () => {
    const selectedIndex = [2, 3];
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native
          name="${inputName}"
          .selectedindex="${selectedIndex}"
          .options="${options}"
          variant="multiple"
        ></mc-select-native>
      </form>`,
    );

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal(JSON.stringify([options[2], options[3]]));
    });
  });

  it(`parent form gets empty value when resetting the value to '' whilst the selectedindex was [2]`, () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .selectedindex="${[2]}" .options="${options}"></mc-select-native>
      </form>`,
    );
    cy.get('mc-select-native').invoke('prop', 'value', '');
    cy.get('mc-select-native').find(':selected').contains('Select an item');

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal('');
    });
  });

  it(`parent form gets the value of the second option when setting the selectedindex to [2] whilst the value was set to 5 initially`, () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .value="${[options[5]]}" .options="${options}"></mc-select-native>
      </form>`,
    );

    cy.get('mc-select-native').invoke('prop', 'selectedindex', [2]).find(':selected').contains('Two');

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal(JSON.stringify([options[2]]));
    });
  });

  it(`parent form gets the value of the value property when both value and selectedindex are set`, () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native
          name="${inputName}"
          .value="${[options[5]]}"
          .selectedindex=${[2]}
          .options="${options}"
        ></mc-select-native>
      </form>`,
    );

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal(JSON.stringify([options[5]]));
    });
  });

  it(`parent form gets empty value when resetting the value to '' whilst the selectedindex was [2, 3]`, () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .selectedindex="${[2, 3]}" .options="${options}"></mc-select-native>
      </form>`,
    );

    cy.get('mc-select-native').invoke('prop', 'value', '').should('have.attr', 'value', '""');
    cy.get('mc-select-native').find(':selected').invoke('text').should('contain', 'Select an item');

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal('');
    });
  });

  it(`parent form gets empty value when resetting the value to '' whilst the value was the second option`, () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .value="${[options[2]]}" .options="${options}"></mc-select-native>
      </form>`,
    );

    cy.get('mc-select-native').invoke('prop', 'value', '').should('have.attr', 'value', '""');
    cy.get('mc-select-native').find(':selected').invoke('text').should('contain', 'Select an item');

    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal('');
    });
  });

  it('parent form gets updated when selecting one option from the dropdown', () => {
    const expectedValue = [options[0]];
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .options="${options}"></mc-select-native>
      </form>`,
    );
    cy.get('mc-select-native').find('select').select('0');
    cy.get('mc-select-native').find('input[aria-hidden="true"]').should('have.value', JSON.stringify(expectedValue));
    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal(JSON.stringify(expectedValue));
    });
  });

  it('parent form gets updated when selecting multiple option from the dropdown', () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .options="${options}" variant="multiple"></mc-select-native>
      </form>`,
    );
    cy.get('mc-select-native').find('select').select(['0', '1']);
    cy.get('mc-select-native')
      .find('input[aria-hidden="true"]')
      .should('have.value', JSON.stringify(expectedValueMultiple));
    cy.get('form').then((form) => {
      const formData = new FormData(form.get(0) as HTMLFormElement);
      expect(formData.get(inputName)).to.equal(JSON.stringify(expectedValueMultiple));
    });
  });

  it(`should dispatch a change event along with Two in the selectedOptions and selectedIndex in the detail, when the option with value of 2 is selected`, () => {
    const expectedSelectedOptions = [
      {
        label: 'Two',
        value: 2,
      },
    ];
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .options="${options}"></mc-select-native>
      </form>`,
    );
    const changeHandler = cy.stub().as('changeHandler');
    cy.get('mc-select-native').then(($el) => {
      const mcSelect = $el.get(0);
      mcSelect.addEventListener('change', changeHandler);

      cy.get('mc-select-native').find('select').select('2');
    });

    cy.get('@changeHandler').its('callCount').should('eq', 1);
    cy.get('@changeHandler').should('have.been.calledWithMatch', {
      detail: {
        selectedOptions: expectedSelectedOptions,
        selectedindex: [2],
      },
    });
    cy.get('mc-select-native').invoke('val').should('deep.equal', expectedSelectedOptions);
  });

  it(`should dispatch a change event along with Two and Three in the selectedOptions and selectedIndex in the detail, when the options with value of 2, 3 get selected in the multiple mode`, () => {
    const expectedSelectedOptions = [
      {
        label: 'Two',
        value: 2,
      },
      {
        label: 'Three',
        value: 3,
      },
    ];
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .options="${options}" variant="multiple"></mc-select-native>
      </form>`,
    );
    const changeHandler = cy.stub().as('changeHandler');
    cy.get('mc-select-native').then(($el) => {
      const mcSelect = $el.get(0);
      mcSelect.addEventListener('change', changeHandler);

      cy.get('mc-select-native').find('select').select(['2', '3']);
    });

    cy.get('@changeHandler').its('callCount').should('eq', 1);
    cy.get('@changeHandler').should('have.been.calledWithMatch', {
      detail: {
        selectedOptions: expectedSelectedOptions,
        selectedindex: [2, 3],
      },
    });
    cy.get('mc-select-native').invoke('val').should('deep.equal', expectedSelectedOptions);
  });

  it('should dispatch a focus event when it is focused', () => {
    const focusHandler = cy.stub().as('focusHandler');
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native
          name="${inputName}"
          .options="${options}"
          @focus=${(): void => focusHandler()}
        ></mc-select-native>
      </form>`,
    );

    cy.get('mc-select-native').find('select').realClick();
    cy.get('@focusHandler').its('callCount').should('eq', 1);
  });

  it('should dispatch a blur event when it is blurred', () => {
    cy.mount<McSelectNative>(
      html`<form>
        <mc-select-native name="${inputName}" .options="${options}"></mc-select-native>
      </form>`,
    );
    const blurHander = cy.stub().as('blurHander');
    cy.get('mc-select-native').then(($el) => {
      const mcSelect = $el.get(0);
      mcSelect.addEventListener('blur', blurHander);
      cy.get('mc-select-native').find('select').focus();
      cy.get('mc-select-native').find('select').realPress('Tab');
    });

    cy.get('@blurHander').its('callCount').should('eq', 1);
  });

  it('sets HTML hint, error and label as a slot', () => {
    cy.mount<McSelectNative>(
      html`<mc-select-native invalid>
        <span slot="label">Label <mc-icon icon="star"></mc-icon></span>
        <span slot="hint">Hint text as <b>HTML</b></span>
        <span slot="errormessage">Error text as <b>HTML</b></span>
      </mc-select-native>`,
    );
    // aliases
    cy.get('mc-select-native').find('span[slot="label"]').as('mc-select-native-label');
    cy.get('mc-select-native').find('span[slot="hint"]').as('mc-select-native-hint');
    cy.get('mc-select-native').find('span[slot="errormessage"]').as('mc-select-native-errormessage');

    cy.get('@mc-select-native-label').then(($label) => {
      if ($label.find('mc-icon').length > 0) {
        cy.log('label as slots');
      } else {
        throw new Error("can't pass label as a slot");
      }
    });
    cy.get('@mc-select-native-hint').find('b').should('have.text', 'HTML');
    cy.get('@mc-select-native-errormessage').find('b').should('have.text', 'HTML');
  });

  it('should set the value of its inner select programmatically', () => {
    const expectedValue = [{ value: 2, label: 'Two' }];
    cy.mount<McSelectNative>(html`<mc-select-native name="${inputName}" .options="${options}"></mc-select-native>`).as(
      'mc-select-native',
    );

    cy.get('mc-select-native').invoke('prop', 'value', expectedValue);
    cy.get('mc-select-native').find('select').should('have.value', '2');
  });
});
