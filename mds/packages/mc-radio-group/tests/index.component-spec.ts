import { html } from 'lit';
import { McRadioGroup } from '../src';
import '../src';
import '@maersk-global/mds-components-core-radio';

const legend = 'I agree to the terms';
const radioGroupName = 'fruits';

context('mc-radio-group', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McRadioGroup>(
        `<mc-radio-group legend="${legend}">
            <mc-radio name="fruits" value="Apple" label="Apple" checked></mc-radio>
            <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
            <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
            <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
          </mc-radio-group>`,
      ).as('mc-radio-group');
    });
    it('mounts', () => {
      cy.get('@mc-radio-group').contains(legend);
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.mount<McRadioGroup>(
        `<mc-radio-group legend="${legend}">
            <mc-radio name="fruits" value="Apple" label="Apple" checked></mc-radio>
            <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
            <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
            <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
          </mc-radio-group>`,
      ).as('mc-radio-group');
    });
    it(`should dispatch a change event along with "Banana" in the detail, when a click action occurs on Banana`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Banana]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Banana',
      });
    });

    it(`should dispatch a change event along with "Orange" in the detail, when Apple was focused and then ArrowDown was pressed`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Apple]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Apple]').realPress('ArrowDown');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Orange',
      });
    });

    it(`should dispatch a change event along with "Orange" in the detail, when Apple was focused and then ArrowRight was pressed`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Apple]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Orange]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Orange',
      });
    });

    it(`should dispatch a change event along with "Apple" in the detail, when Orange was focused and then ArrowUp was pressed`, () => {
      cy.get('mc-radio[value=Orange]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Orange]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Orange]').realPress('ArrowUp');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Apple',
      });
    });

    it(`should dispatch a change event along with "Apple" in the detail, when Orange was focused and then ArrowLeft was pressed`, () => {
      cy.get('mc-radio[value=Orange]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Orange]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Orange]').realPress('ArrowLeft');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Apple',
      });
    });

    it(`should dispatch a change event along with "Lemon" in the detail, when Apple was focused and then ArrowUp was pressed`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Apple]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Apple]').realPress('ArrowUp');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Lemon',
      });
    });

    it(`should dispatch a change event along with "Lemon" in the detail, when Apple was focused and then ArrowLeft was pressed`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Apple]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Apple]').realPress('ArrowLeft');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Lemon',
      });
    });

    it(`should dispatch a change event along with "Apple" in the detail, when Lemon was focused and then ArrowDown was pressed`, () => {
      cy.get('mc-radio[value=Lemon]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Lemon]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Lemon]').realPress('ArrowDown');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Apple',
      });
    });

    it(`should dispatch a change event along with "Apple" in the detail, when Lemon was focused and then ArrowRight was pressed`, () => {
      cy.get('mc-radio[value=Lemon]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);

        cy.get('mc-radio[value=Lemon]').find('input[data-cy="radio"]').focus();
        cy.get('mc-radio[value=Lemon]').realPress('ArrowRight');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Apple',
      });
    });
  });

  describe('form', () => {
    describe('when initialised by the checked prop', () => {
      beforeEach(() => {
        cy.mount<McRadioGroup>(
          html`<form>
            <mc-radio-group legend="${legend}">
              <mc-radio name="fruits" value="Apple" label="Apple" checked></mc-radio>
              <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
              <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
              <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
            </mc-radio-group>
          </form>`,
        ).as('mc-radio-group');
      });

      it('parent form should be able to get the value of selected option in the radio-group', () => {
        const expectedValue = 'Apple';

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(radioGroupName)).to.equal(expectedValue);
        });
      });

      it('selecting a new option should change the value of the radio-group', () => {
        const expectedValue = 'Banana';

        cy.get('mc-radio[value=Banana]').click();

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(radioGroupName)).to.equal(expectedValue);
        });
      });
    });

    describe('when initialised by the value prop', () => {
      it('parent form should be able to get the value of selected option in the radio-group', () => {
        const expectedValue = 'Banana';

        cy.mount<McRadioGroup>(
          html`<form>
            <mc-radio-group legend="${legend}" value="${expectedValue}">
              <mc-radio name="fruits" value="Apple" label="Apple"></mc-radio>
              <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
              <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
              <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
            </mc-radio-group>
          </form>`,
        ).as('mc-radio-group');

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(radioGroupName)).to.equal(expectedValue);
        });
      });

      it('the parent form should be able to get the value of selected option in the radio-group, when the value is not a string', () => {
        const expectedValue = 1;

        cy.mount<McRadioGroup>(
          html`<form>
            <mc-radio-group legend="${legend}" .value=${expectedValue}>
              <mc-radio name="employed" value=${2} label="unemployed"></mc-radio>
              <mc-radio name="employed" value=${1} label="full-time"></mc-radio>
            </mc-radio-group>
          </form>`,
        ).as('mc-radio-group');

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get('employed')).to.equal(`${expectedValue}`);
        });
      });
    });
  });
  describe('disconnected from the dom and reconnect later', () => {
    it('fires the correct value when a mc-radio is checked after the mc-radio-group is reconnected', () => {
      cy.mount(
        html`<div>
          <mc-radio-group legend="Reconnections" id="myradiogroup">
            <mc-radio name="employed" value="Foo" label="Foo"></mc-radio>
            <mc-radio name="employed" value="Bar" label="Bar"></mc-radio>
          </mc-radio-group>
        </div>`,
      ).as('mc-radio-group');
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);
      });
      cy.get('mc-radio[value="Foo"]').as('foo');
      cy.get('mc-radio[value="Bar"]').as('bar');

      cy.get('@foo').click();
      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Foo',
      });
      cy.get('@foo').should('have.attr', 'checked');
      cy.get('@bar').should('not.have.attr', 'checked');
      cy.get('@bar').click();
      cy.get('@changeHandler').its('callCount').should('eq', 2);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 'Bar',
      });
      cy.get('@foo').should('not.have.attr', 'checked');
      cy.get('@bar').should('have.attr', 'checked');
      // Now, disconnect the group
      cy.document().then((doc) => {
        const group = doc.getElementById('myradiogroup');
        const div = group?.parentElement;
        if (group && div) {
          cy.log('DISCONNECTING');
          div.removeChild(group);
          cy.log('DISCONNECTED');
          expect(group).to.not.be.null;
          expect(div).to.not.be.null;
          cy.log('RECONNECTING');
          div?.appendChild(group);
          cy.log('RECONNECTED');
        }
        cy.get('@foo').click();
        cy.get('@changeHandler').its('callCount').should('eq', 3);
        cy.get('@changeHandler').should('have.been.calledWithMatch', {
          detail: 'Foo',
        });
        cy.get('@foo').should('have.attr', 'checked');
        cy.get('@bar').should('not.have.attr', 'checked');
        cy.get('@bar').click();
        cy.get('@changeHandler').its('callCount').should('eq', 4);
        cy.get('@changeHandler').should('have.been.calledWithMatch', {
          detail: 'Bar',
        });
        cy.get('@foo').should('not.have.attr', 'checked');
        cy.get('@bar').should('have.attr', 'checked');
      });
    });
    it('can set value and checked programmatically after the mc-radio-group is reconnected', () => {
      cy.mount(
        html`<div>
          <mc-radio-group legend="Reconnections" id="myradiogroup" .value=${'Foo'}>
            <mc-radio name="employed" value="Foo" label="Foo"></mc-radio>
            <mc-radio name="employed" value="Bar" label="Bar"></mc-radio>
          </mc-radio-group>
        </div>`,
      ).as('mc-radio-group');
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('@mc-radio-group').then(($el) => {
        const mcRadioGroup = $el.get(0);
        mcRadioGroup.addEventListener('change', changeHandler);
      });
      cy.get('mc-radio[value="Foo"]').as('foo');
      cy.get('mc-radio[value="Bar"]').as('bar');

      cy.get('@foo').should('have.attr', 'checked');
      cy.get('@bar').should('not.have.attr', 'checked');

      // Now, disconnect the group
      cy.document().then((doc) => {
        const group = doc.getElementById('myradiogroup');
        const div = group?.parentElement;
        if (group && div) {
          cy.log('DISCONNECTING');
          div.removeChild(group);
          cy.log('DISCONNECTED');
          expect(group).to.not.be.null;
          expect(div).to.not.be.null;
          cy.log('RECONNECTING');
          div?.appendChild(group);
          cy.log('RECONNECTED');
        }

        cy.get('@foo').should('have.attr', 'checked');
        cy.get('@bar').should('not.have.attr', 'checked');

        cy.get('mc-radio-group').invoke('prop', 'value', 'Bar');
        cy.get('@foo').should('not.have.attr', 'checked');
        cy.get('@bar').should('have.attr', 'checked');
      });
    });
  });
});
