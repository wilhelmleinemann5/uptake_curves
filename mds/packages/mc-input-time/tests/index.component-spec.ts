import { html } from 'lit';
import { McInputTime } from '../src';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';
import '../src';
import { McPicker } from '@maersk-global/mds-components-core-picker';

const inputName = `departureTime`;

context('mc-input-time', () => {
  beforeEach(() => {
    cy.viewport(1000, 1000);
  });

  describe('form', () => {
    beforeEach(() => {
      const inputEventHandlerSpy = cy.spy().as('onInputEventSpy');
      cy.mount<McInputTime>(
        html`<form>
          <mc-input-time
            name="${inputName}"
            @input="${(e): void => inputEventHandlerSpy(e.target.value)}"
          ></mc-input-time>
        </form>`,
      ).as('mc-input-time');
      cy.get('@mc-input-time').find('input[data-cy="input"]').as('inner-input');
      cy.get('@mc-input-time').find('input[aria-hidden="true"]').as('hidden-input');
    });

    it('parent form gets updated when typing time into the input', () => {
      const testTime = '11:20';
      cy.get('@inner-input').type(testTime);
      cy.get('@hidden-input').should('have.value', testTime);
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(testTime);
      });
    });

    it('adds colon if missing', () => {
      const testTime = '0930';
      cy.get('@inner-input').type(testTime);
      cy.get('@hidden-input').should('have.value', '09:30');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('09:30');
      });
    });

    it('adds :00 if missing and typed 10', () => {
      const testTime = '10';
      cy.get('@inner-input').type(testTime);
      cy.get('@inner-input').realPress('Tab');
      cy.get('@hidden-input').should('have.value', '10:00');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('10:00');
      });
    });

    it('adds :00 if missing and typed 1', () => {
      const testTime = '1';
      cy.get('@inner-input').type(testTime);
      cy.get('@inner-input').realPress('Tab');
      cy.get('@hidden-input').should('have.value', '01:00');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('01:00');
      });
    });

    it('adds :00 if missing and typed 10:0', () => {
      const testTime = '10:0';
      cy.get('@inner-input').type(testTime);
      cy.get('@inner-input').realPress('Tab');
      cy.get('@hidden-input').should('have.value', '10:00');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('10:00');
      });
    });

    it('doesnt add :00 if input value is 0', () => {
      cy.get('@inner-input').focus();
      cy.get('@inner-input').realPress('Tab');
      cy.get('@hidden-input').should('have.value', '');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('');
      });
    });

    it('removes unexpected chars', () => {
      const testTime = '09.30';
      cy.get('@inner-input').type(testTime);
      cy.get('@hidden-input').should('have.value', '09:30');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('09:30');
      });
    });

    it('converts hours > 23 to 23', () => {
      const testTime = '24:30';
      cy.get('@inner-input').type(testTime);
      cy.get('@hidden-input').should('have.value', '23:30');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('23:30');
      });
    });

    it('converts minutes > 59 to 59', () => {
      const testTime = '23:70';
      cy.get('@inner-input').type(testTime);
      cy.get('@hidden-input').should('have.value', '23:70');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('23:70');
      });
    });

    it('trims extra chars', () => {
      const testTime = '23:5933333';
      cy.get('@inner-input').type(testTime);
      cy.get('@hidden-input').should('have.value', '23:59');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('23:59');
      });
    });

    it('doesnt allow to type letters', () => {
      const testTime = 'e';
      cy.get('@inner-input').type(testTime);
      cy.get('@inner-input').realPress('Tab');
      cy.get('@hidden-input').should('have.value', '');
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal('');
      });
    });

    it('sets the time to "23:00" when only entering "23" and press enter', () => {
      const expectedTime = '23:00';
      cy.get('@inner-input').focus();
      cy.get('@inner-input').realType('23');
      cy.get('@inner-input').realPress('Enter');
      cy.get('@hidden-input').should('have.value', expectedTime);

      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(expectedTime);
        cy.get('@onInputEventSpy').its('callCount').should('eq', 3);
        cy.get('@onInputEventSpy').should('have.been.calledWithMatch', '2');
        cy.get('@onInputEventSpy').should('have.been.calledWithMatch', '3');
        cy.get('@onInputEventSpy').should('have.been.calledWithMatch', expectedTime);
      });
    });

    it('parent form gets the selected time value', () => {
      const testTime = '10:30';
      cy.get('@inner-input').focus();
      cy.get('@inner-input').realPress('Space');
      cy.get('mc-time-picker').should('be.visible');
      cy.get('mc-time-picker').invoke('prop', 'value', '10:30');
      cy.get('mc-time-picker').realPress('Enter');
      cy.get('@hidden-input').should('have.value', testTime);
      cy.get('form').then((form) => {
        const formData = new FormData(form.get(0) as HTMLFormElement);
        expect(formData.get(inputName)).to.equal(testTime);
      });
    });

    it('fires keydown event with correct event key', () => {
      cy.get('mc-input-time').then(($input) => {
        const input = $input[0];
        const keydownStub = cy.stub();
        input.addEventListener('keydown', keydownStub);

        cy.get('@inner-input').type('2');

        cy.get('@inner-input').then(() => {
          expect(keydownStub).to.be.calledOnce;
          expect(keydownStub.firstCall.args[0].key).to.equal('2');
        });
      });
    });
  });

  describe('in small screen', () => {
    const label = 'Input Date';
    beforeEach(() => {
      cy.viewport(400, 400);
      cy.mount<McInputTime>(html`<mc-input-time .label=${label}></mc-input-time>`).as('mc-input-time');
      cy.get('@mc-input-time').find('input[data-cy="input"]').as('inner-input').focus();
    });

    it('popover should be displayed in fullscreen mode', () => {
      cy.get('@inner-input').realClick();
      cy.get('mc-time-picker').should('be.visible');
      cy.get('[part="container"]').should('have.css', 'position', 'fixed');
    });

    it('same label as the input should be displayed on popover heading', () => {
      cy.get('@inner-input').realClick();
      cy.get('mc-time-picker').should('be.visible');
      cy.get('mc-popover').should('contain', label);
    });

    it('click should toggle the timepicker and move the focus to the timepicker', () => {
      cy.get('@inner-input').realClick();
      cy.get('mc-time-picker').should('be.visible');
      cy.get('@inner-input').should('not.have.focus');
    });
  });

  describe('error & hint', () => {
    it('sets HTML hint, error and label as a slot', () => {
      cy.mount<McInputTime>(
        html`<mc-input-time invalid>
          <span slot="label"> Label <mc-icon icon="star"></mc-icon> </span>
          <span slot="hint">Hint text as <b>HTML</b></span>
          <span slot="errormessage">Error text as <b>HTML</b></span>
        </mc-input-time>`,
      ).as('mc-input-time');
      cy.get('@mc-input-time').find('span[slot="label"]').as('mc-input-time-label');
      cy.get('@mc-input-time').find('span[slot="hint"]').as('mc-input-time-hint');
      cy.get('@mc-input-time').find('span[slot="errormessage"]').as('mc-input-time-errormessage');

      cy.get('@mc-input-time-label').then(($label) => {
        if ($label.find('mc-icon').length > 0) {
          cy.log('label as slots');
        } else {
          throw new Error("can't pass label as a slot");
        }
      });
      cy.get('@mc-input-time-hint').find('b').should('have.text', 'HTML');
      cy.get('@mc-input-time-errormessage').find('b').should('have.text', 'HTML');
    });
  });

  describe('key navigation', () => {
    beforeEach(() => {
      cy.mount<McInputTime>(html`<mc-input-time></mc-input-time>`).as('mc-input-time');
      cy.get('@mc-input-time').find('input[data-cy="input"]').as('inner-input').focus();
    });

    it('Focus must keep the timepicker closed', () => {
      cy.get('mc-time-picker').should('not.be.visible');
    });

    it('Click on the label should focus on the input and keep the timepicker closed', () => {
      cy.get('mc-label').click();
      cy.get('@inner-input').should('be.focused');
      cy.get('mc-time-picker').should('not.be.visible');
    });

    it('Click on the icon toggle the timepicker', () => {
      cy.get('mc-icon[icon=clock]').realClick();
      cy.get('mc-time-picker').should('be.visible');
    });

    it('Space must open the timepicker while it is initially closed', () => {
      cy.realPress('Space');
      cy.get('mc-time-picker').should('be.visible');
    });

    it('Click must open the timepicker while it is initially closed', () => {
      cy.get('@inner-input').realClick();
      cy.get('mc-time-picker').should('be.visible');
    });

    it('Click must close the timepicker while it is open', () => {
      cy.get('@inner-input').realClick();
      cy.get('@inner-input').realClick();
      cy.get('mc-time-picker').should('not.be.visible');
    });

    it('Tab must move the focus to the hour while the timepicker is open', () => {
      cy.get('@inner-input').realClick();
      cy.get('@inner-input').realPress('Tab');

      cy.get('[data-cy=hour]').then(($el) => {
        const el: McPicker = $el.get(0) as McPicker;
        expect(el.focused).to.equal(true);
      });
    });

    it('closes the timepicker when clicked outside', () => {
      cy.get('@inner-input').realClick();
      cy.get('mc-time-picker').should('be.visible');
      cy.get('body').realClick();
      cy.get('mc-time-picker').should('not.be.visible');
    });

    it('closes the timepicker when Escape is pressed', () => {
      cy.get('@inner-input').realClick();
      cy.get('mc-time-picker').should('be.visible');
      cy.get('@inner-input').focus();
      cy.get('@inner-input').realPress('Escape');
      cy.get('mc-time-picker').should('not.be.visible');
    });
  });
});
