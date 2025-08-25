import { McCheckboxGroup } from '../src';
import { html } from 'lit';
import '../src';
import '@maersk-global/mds-components-core-checkbox';

const legend = 'I agree to the terms';

context('mc-checkbox-group', () => {
  it('mounts', () => {
    cy.mount<McCheckboxGroup>(
      `<mc-checkbox-group
    legend="${legend}"
  >
    <mc-checkbox name="fruit" value="Apple" label="Apple" checked></mc-checkbox>
    <mc-checkbox name="fruit" value="Orange" label="Orange"></mc-checkbox>
    <mc-checkbox name="fruit" value="Banana" label="Banana"></mc-checkbox>
    <mc-checkbox name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
  </mc-checkbox-group>`,
    ).as('mc-checkbox-group');
    cy.get('@mc-checkbox-group').contains(legend);
  });

  describe('events', () => {
    beforeEach(() => {
      cy.mount<McCheckboxGroup>(
        html`<mc-checkbox-group legend="${legend}">
          <mc-checkbox name="fruit" value="Apple" label="Apple" checked></mc-checkbox>
          <mc-checkbox name="fruit" value="Orange" label="Orange" checked></mc-checkbox>
          <mc-checkbox name="fruit" value="Banana" label="Banana"></mc-checkbox>
          <mc-checkbox name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
        </mc-checkbox-group>`,
      ).as('mc-checkbox-group');
    });

    it(`should dispatch a change event along with '["Banana","Orange","Apple"]' in the detail, when a click action occurs on Banana`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-checkbox-group').then(($el) => {
        const mcCheckboxGroup = $el.get(0);
        mcCheckboxGroup.addEventListener('change', changeHandler);

        cy.get('mc-checkbox[value=Banana]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Banana', 'Orange', 'Apple'],
      });
    });

    it(`should dispatch a change event along with '["Apple"]' in the detail, when a click action occurs on Orange`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-checkbox-group').then(($el) => {
        const mcCheckboxGroup = $el.get(0);
        mcCheckboxGroup.addEventListener('change', changeHandler);

        cy.get('mc-checkbox[value=Orange]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Apple'],
      });
    });

    it(`should dispatch a change event along with '["Banana","Orange","Apple"]' in the detail, when Banana was focused and then checked by pressing a Space`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-checkbox-group').then(($el) => {
        const mcCheckboxGroup = $el.get(0);
        mcCheckboxGroup.addEventListener('change', changeHandler);

        cy.get('mc-checkbox[value=Banana]').find('input[data-cy="checkbox"]').focus();
        cy.get('mc-checkbox[value=Banana]').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Banana', 'Orange', 'Apple'],
      });
    });

    it(`should dispatch a change event along with '["Apple"]' in the detail, when Orange was focused and then unchecked by pressing a Space`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-checkbox-group').then(($el) => {
        const mcCheckboxGroup = $el.get(0);
        mcCheckboxGroup.addEventListener('change', changeHandler);

        cy.get('mc-checkbox[value=Orange]').find('input[data-cy="checkbox"]').focus();
        cy.get('mc-checkbox[value=Orange]').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Apple'],
      });
    });

    it(`should dispatch a change event along with '[]' in the detail, when the last checkbox in the group is unchecked by a click`, () => {
      cy.get('mc-checkbox[value=Orange]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-checkbox-group').then(($el) => {
        const mcCheckboxGroup = $el.get(0);
        mcCheckboxGroup.addEventListener('change', changeHandler);

        cy.get('mc-checkbox[value=Apple]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: [],
      });
    });

    it(`should dispatch a change event along with '[]' in the detail, when the last checkbox in the group is unchecked by a space`, () => {
      cy.get('mc-checkbox[value=Orange]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-checkbox-group').then(($el) => {
        const mcCheckboxGroup = $el.get(0);
        mcCheckboxGroup.addEventListener('change', changeHandler);

        cy.get('mc-checkbox[value=Apple]').find('input[data-cy="checkbox"]').focus();
        cy.get('mc-checkbox[value=Apple]').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: [],
      });
    });

    it(`should always focus on the next option when tab is pressed`, () => {
      cy.get('mc-checkbox[value=Apple]').find('input[data-cy="checkbox"]').focus();
      cy.get('mc-checkbox[value=Apple]').should('have.focus');
      cy.get('mc-checkbox[value=Apple]').realPress('Tab');

      cy.get('mc-checkbox[value=Orange]').should('have.focus');
      cy.get('mc-checkbox[value=Orange]').realPress('Tab');

      cy.get('mc-checkbox[value=Banana]').should('have.focus');
      cy.get('mc-checkbox[value=Banana]').realPress('Tab');

      cy.get('mc-checkbox[value=Lemon]').should('have.focus');
    });
  });

  describe('form', () => {
    describe('when initialised by checked property', () => {
      beforeEach(() => {
        cy.mount<McCheckboxGroup>(
          html`<form>
            <mc-checkbox-group legend="${legend}">
              <mc-checkbox name="fruits" value="Apple" label="Apple" checked></mc-checkbox>
              <mc-checkbox name="fruits" value="Orange" label="Orange" checked></mc-checkbox>
              <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
              <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
            </mc-checkbox-group>
          </form>`,
        ).as('form');
      });

      it('parent form should be able to get the value of selected options in the checkbox-group', () => {
        const expectedValue = '["Orange","Apple"]';
        const checkboxGroupName = 'fruits';

        cy.get('@form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(checkboxGroupName)).to.equal(expectedValue);
        });
      });

      it('when uncheck an already selected checkbox, it should remove it from the value array of the checkbox-group', () => {
        const expectedValue = '["Orange"]';
        const checkboxGroupName = 'fruits';

        cy.get('mc-checkbox[value=Apple]').click();

        cy.get('@form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(checkboxGroupName)).to.equal(expectedValue);
        });
      });

      it('selecting a new option should add its value to the value array of the checkbox-group', () => {
        const expectedValue = '["Banana","Orange","Apple"]';
        const checkboxGroupName = 'fruits';

        cy.get('mc-checkbox[value=Banana]').click();

        cy.get('@form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(checkboxGroupName)).to.equal(expectedValue);
        });
      });
    });
  });

  describe('when initialised by the value property', () => {
    beforeEach(() => {
      cy.mount<McCheckboxGroup>(
        html`<form>
          <mc-checkbox-group legend="${legend}" .value="${['Banana', 'Apple', 'Lemon']}">
            <mc-checkbox name="fruits" value="Apple" label="Apple"></mc-checkbox>
            <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
            <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
            <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
          </mc-checkbox-group>
        </form>`,
      ).as('form');
    });

    it('parent form should be able to get the value of selected options in the checkbox-group', () => {
      const expectedValue = '["Banana","Apple","Lemon"]';
      const checkboxGroupName = 'fruits';

      cy.get('@form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(checkboxGroupName)).to.equal(expectedValue);
      });
    });
  });

  describe('disabled state', () => {
    it('should disable all checkboxes in the group when the group is disabled', () => {
      cy.mount<McCheckboxGroup>(
        html`<mc-checkbox-group legend="${legend}" disabled>
          <mc-checkbox name="fruits" value="Apple" label="Apple"></mc-checkbox>
          <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
          <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
          <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
        </mc-checkbox-group>`,
      ).as('mc-checkbox-group');
      cy.get('mc-checkbox').each(($checkbox) => {
        cy.wrap($checkbox).find('input[data-cy="checkbox"]').should('be.disabled');
      });
    });
    it('should disable all checkboxes in the group when the group is disabled and the checkboxes are not', () => {
      cy.mount<McCheckboxGroup>(
        html`<mc-checkbox-group legend="${legend}" disabled>
          <mc-checkbox name="fruits" value="Apple" label="Apple" disabled></mc-checkbox>
          <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
          <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
          <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
        </mc-checkbox-group>`,
      ).as('mc-checkbox-group');

      cy.get('mc-checkbox').each(($checkbox) => {
        cy.wrap($checkbox).find('input[data-cy="checkbox"]').should('be.disabled');
      });
    });
    it('should keep checkboxes disabled in the group when the group is not disabled', () => {
      const isDisabled = true;
      cy.mount<McCheckboxGroup>(
        html`<mc-checkbox-group legend="${legend}">
          <mc-checkbox name="fruits" value="Apple" label="Apple" disabled></mc-checkbox>
          <mc-checkbox name="fruits" value="Orange" label="Orange" ?disabled="${isDisabled}"></mc-checkbox>
          <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
          <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
        </mc-checkbox-group>`,
      ).as('mc-checkbox-group');

      cy.get('mc-checkbox[value="Apple"]').find('input[data-cy="checkbox"]').should('be.disabled');
      cy.get('mc-checkbox[value="Orange"]').find('input[data-cy="checkbox"]').should('be.disabled');
      cy.get('mc-checkbox[value="Banana"]').find('input[data-cy="checkbox"]').should('not.be.disabled');
      cy.get('mc-checkbox[value="Lemon"]').find('input[data-cy="checkbox"]').should('not.be.disabled');
    });
    it('should toggle the disabled state of checkboxes dynamically when the group is disabled and re-enabled', () => {
      cy.mount<McCheckboxGroup>(
        html`<mc-checkbox-group legend="${legend}" .value="${['Banana']}">
          <mc-checkbox name="fruits" value="Apple" label="Apple"></mc-checkbox>
          <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
          <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
          <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
        </mc-checkbox-group>`,
      ).as('mc-checkbox-group');

      cy.get('mc-checkbox').each(($checkbox) => {
        cy.wrap($checkbox).find('input[data-cy="checkbox"]').should('not.be.disabled');
      });
      cy.get('@mc-checkbox-group').invoke('attr', 'disabled', true);
      cy.get('mc-checkbox').each(($checkbox) => {
        cy.wrap($checkbox).find('input[data-cy="checkbox"]').should('be.disabled');
      });
      cy.get('@mc-checkbox-group').invoke('removeAttr', 'disabled');
      cy.get('mc-checkbox').each(($checkbox) => {
        cy.wrap($checkbox).find('input[data-cy="checkbox"]').should('not.be.disabled');
      });
    });
  });
});
