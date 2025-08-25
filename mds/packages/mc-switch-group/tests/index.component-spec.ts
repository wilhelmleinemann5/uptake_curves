import { html } from 'lit';
import { McSwitchGroup } from '../src';
import '../src';
import '@maersk-global/mds-components-core-switch';

const legend = 'I agree to the terms';

context('mc-switch-group', () => {
  describe('mounts and props', () => {
    beforeEach(() => {
      cy.mount<McSwitchGroup>(
        `<mc-switch-group
        legend="${legend}"
      >
        <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
        <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
        <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
        <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
      </mc-switch-group>`
      ).as('mc-switch-group');
    });

    it('mounts', () => {
      cy.get('@mc-switch-group').contains(legend);
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.mount<McSwitchGroup>(
        `<mc-switch-group
        legend="${legend}"
      >
        <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
        <mc-switch name="fruits" value="Orange" label="Orange" checked></mc-switch>
        <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
        <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
      </mc-switch-group>`
      ).as('mc-switch-group');
    });

    it(`should dispatch a change event along with '["Banana","Orange","Apple"]' in the detail, when a click action occurs on Banana`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Banana]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Banana', 'Orange', 'Apple'],
      });
    });

    it(`should dispatch a change event along with '["Apple"]' in the detail, when a click action occurs on Orange`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Orange]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Apple'],
      });
    });

    it(`should dispatch a change event along with '["Banana","Orange","Apple"]' in the detail, when Banana was focused and then checked by pressing a Space`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Banana]').find('button').focus();
        cy.get('mc-switch[value=Banana]').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Banana', 'Orange', 'Apple'],
      });
    });

    it(`should dispatch a change event along with '["Apple"]' in the detail, when Orange was focused and then unchecked by pressing a Space`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Orange]').find('button').focus();
        cy.get('mc-switch[value=Orange]').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Apple'],
      });
    });

    it(`should dispatch a change event along with '["Banana","Orange","Apple"]' in the detail, when Banana was focused and then checked by pressing an Enter`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Banana]').find('button').focus();
        cy.get('mc-switch[value=Banana]').realPress('Enter');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Banana', 'Orange', 'Apple'],
      });
    });

    it(`should dispatch a change event along with '["Apple"]' in the detail, when Orange was focused and then unchecked by pressing an Enter`, () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Orange]').find('button').focus();
        cy.get('mc-switch[value=Orange]').realPress('Enter');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: ['Apple'],
      });
    });

    it(`should dispatch a change event along with '[]' in the detail, when the last option in the group is unchecked by a click`, () => {
      cy.get('mc-switch[value=Orange]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Apple]').click();
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: [],
      });
    });

    it(`should dispatch a change event along with '[]' in the detail, when the last option in the group is unchecked by a space`, () => {
      cy.get('mc-switch[value=Orange]').click();

      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-switch-group').then(($el) => {
        const mcSwitchGroup = $el.get(0);
        mcSwitchGroup.addEventListener('change', changeHandler);

        cy.get('mc-switch[value=Apple]').find('button').focus();
        cy.get('mc-switch[value=Apple]').realPress('Space');
      });

      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: [],
      });
    });

    it(`should always focus on the next option when tab is pressed`, () => {
      cy.get('mc-switch[value=Apple]').find('button').focus();
      cy.get('mc-switch[value=Apple]').should('have.focus');
      cy.get('mc-switch[value=Apple]').realPress('Tab');

      cy.get('mc-switch[value=Orange]').should('have.focus');
      cy.get('mc-switch[value=Orange]').realPress('Tab');

      cy.get('mc-switch[value=Banana]').should('have.focus');
      cy.get('mc-switch[value=Banana]').realPress('Tab');

      cy.get('mc-switch[value=Lemon]').should('have.focus');
    });
  });

  describe('form', () => {
    describe('when initialised by the checked property', () => {
      beforeEach(() => {
        cy.mount<McSwitchGroup>(
          html`<form>
            <mc-switch-group legend="${legend}">
              <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
              <mc-switch name="fruits" value="Orange" label="Orange" checked></mc-switch>
              <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
              <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
            </mc-switch-group>
          </form>`
        ).as('mc-switch-group');
      });

      it('parent form should be able to get the value of selected options in the switch-group', () => {
        const expectedValue = '["Orange","Apple"]';
        const switchGroupName = 'fruits';

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(switchGroupName)).to.equal(expectedValue);
        });
      });

      it('when uncheck an already selected switch, it should remove it from the value array of the switch-group', () => {
        const expectedValue = '["Orange"]';
        const switchGroupName = 'fruits';

        cy.get('mc-switch[value=Apple]').click();

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(switchGroupName)).to.equal(expectedValue);
        });
      });

      it('selecting a new option should add its value to the value array of the switch-group', () => {
        const expectedValue = '["Banana","Orange","Apple"]';
        const switchGroupName = 'fruits';

        cy.get('mc-switch[value=Banana]').click();

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(switchGroupName)).to.equal(expectedValue);
        });
      });
    });
    describe('when initialised by the value property', () => {
      beforeEach(() => {
        cy.mount<McSwitchGroup>(
          html`<form>
            <mc-switch-group legend="${legend}" .value=${['Banana', 'Apple']}>
              <mc-switch name="fruits" value="Apple" label="Apple"></mc-switch>
              <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
              <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
              <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
            </mc-switch-group>
          </form>`
        ).as('mc-switch-group');
      });

      it('parent form should be able to get the value of selected options in the switch-group', () => {
        const expectedValue = '["Banana","Apple"]';
        const switchGroupName = 'fruits';

        cy.get('form').then((form) => {
          const formData = new FormData(form.get(0) as HTMLFormElement);
          expect(formData.get(switchGroupName)).to.equal(expectedValue);
        });
      });
    });
  });
});
