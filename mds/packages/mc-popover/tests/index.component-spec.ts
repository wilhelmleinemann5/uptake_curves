import { html } from 'lit';
import { McPopover } from '../src';
import '../src';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-list-item';

const triggerButtonText = 'trigger button';
const contentText = 'this is content';

context('mc-popover', () => {
  beforeEach(() => {
    cy.mount<McPopover>(
      html`<mc-popover zindex="1000" id="first" position="bottom-center"
        ><button slot="trigger" id="trigger">${triggerButtonText}</button>
        <div>
          <span>${contentText}</span><button id="content-button">Test</button><button>Test2</button>
        </div></mc-popover
      >`,
    ).as('mc-popover');
  });
  it('mounts', () => {
    cy.get('@mc-popover');
  });

  it('renders trigger in a correct slot', () => {
    cy.get('@mc-popover')
      .find('slot[name="trigger"]')
      .then(($el) => {
        expect(
          ($el[0] as HTMLSlotElement)
            .assignedElements()
            .map((e) => e.innerHTML)
            .join(''),
        )
          .to.contain(triggerButtonText)
          .not.to.contain(contentText);
      });
  });

  it('renders content in a correct slot', () => {
    cy.get('@mc-popover').find('[slot="trigger"]').click();
    cy.get('@mc-popover')
      .find('slot:not([name="trigger"])')
      .then(($el) => {
        expect(
          ($el[0] as HTMLSlotElement)
            .assignedElements()
            .map((e) => e.innerHTML)
            .join(''),
        )
          .to.contain(contentText)
          .not.to.contain(triggerButtonText);
      });
  });

  it('is can be opened using "show" function', () => {
    cy.get('@mc-popover').then(($el) => {
      ($el[0] as McPopover).show();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
  });

  it('is can be closed using "hide" function', () => {
    cy.get('@mc-popover').then(($el) => {
      ($el[0] as McPopover).show();
      cy.get('@mc-popover')
        .find('[data-cy="content"]')
        .should('have.css', 'display', 'block')
        .then(() => {
          ($el[0] as McPopover).hide();
          cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
        });
    });
  });

  it('moving mouse from target element to content should keep the popover open', () => {
    cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
    cy.get('@mc-popover').find('button#trigger').realClick();
    cy.get('@mc-popover').trigger('mouseover', 'bottom', { force: true });
    cy.get('@mc-popover').trigger('mouseup', 20, -25, { force: true });

    cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
  });

  it('sets the zindex prop correctly on the content area', () => {
    cy.get('@mc-popover').then(($popover) => {
      const popover = $popover[0].shadowRoot?.querySelector('[data-cy="content"]');
      expect(popover).to.have.css('z-index', '1000');
    });
  });

  it('hovering a non-focusable element in content should not close the popover', () => {
    //delete old popover
    const previous = document.querySelector('#first');
    previous?.remove();

    cy.mount<McPopover>(
      html`<mc-popover position="bottom-center"
        ><button slot="trigger" id="trigger">${triggerButtonText}</button>
        <mc-list>
          <mc-list-item label="One"></mc-list-item>
          <div id="div-content">test</div>
          <mc-list-item label="Two"></mc-list-item>
          <mc-list-item label="Three"></mc-list-item>
          <mc-list-item label="Four"></mc-list-item>
          <mc-list-item label="Five"></mc-list-item>
        </mc-list>
      </mc-popover>`,
    ).as('mc-popover');

    cy.get('@mc-popover').find('button#trigger').realClick();
    cy.get('@mc-popover').find('mc-list-item').first().trigger('mouseover', 'center', { force: true });
    cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    cy.get('@mc-popover').find('#div-content').trigger('mouseover', 'center', { force: true });
    cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
  });

  context('triggers', () => {
    it('should open on click when trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('@mc-popover').find('button#trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should close on trigger click when is open and trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('@mc-popover').find('button#trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@mc-popover').find('button#trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
    it('should not close on content click when trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('@mc-popover').find('button#trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@mc-popover').find('[data-cy="content"]').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@mc-popover').find('button#content-button').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open on touch when trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('@mc-popover').find('button#trigger').realTouch();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open on focus when trigger is focus', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').find('button#trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open focusing element using mouse when trigger is focus', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').find('button#trigger').click();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should close on blur when trigger is focus', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').find('button#trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
    it('should not close on blur when preventcloseonblur is true', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').invoke('attr', 'preventcloseonblur', 'true');
      cy.get('@mc-popover').find('button#trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open on mouseover when trigger is hover', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'hover');
      cy.get('@mc-popover').find('button#trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should hide on mouseout when trigger is hover', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'hover');
      cy.get('@mc-popover').find('button#trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@mc-popover').find('button#trigger').trigger('mouseout');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
    it('should open on contextmenu when trigger is contextmenu', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'contextmenu');
      cy.get('@mc-popover').find('button#trigger').rightclick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open when action key is clicked', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('@mc-popover').then(($el) => {
        $el[0].actionkeys = ['ArrowDown'];
      });
      cy.realPress('Tab');
      cy.get('button#trigger').as('trigger-button');
      cy.get('@trigger-button').focus();
      cy.get('@trigger-button').realPress('ArrowDown');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should not open the popover on any event by default when the trigger is manual', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'manual');

      cy.get('@mc-popover').find('button#trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('@mc-popover').find('button#trigger').trigger('hover');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('@mc-popover').find('button#trigger').trigger('focus');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('@mc-popover').find('button#trigger').rightclick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });
  });

  context('custom trigger element', () => {
    beforeEach(() => {
      const previous = document.querySelector('#first');
      previous?.remove();
      cy.mount<McPopover>(
        html`<mc-popover position="bottom-center">
          <div>
            <span>${contentText}</span><button id="content-button">Test</button><button>Test2</button>
          </div></mc-popover
        >`,
      ).as('mc-popover');
      cy.mount<HTMLElement>(html`<button id="custom-trigger">custom ${triggerButtonText}</button>`);
      cy.get('@mc-popover').then(($popover) => {
        const triggerButton = document.querySelector('#custom-trigger');
        $popover[0].customtriggerelement = triggerButton;
      });
    });
    it('should open on click when trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('button#custom-trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should close on trigger click when is open and trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('button#custom-trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('button#custom-trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
    it('should not close on content click when trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('button#custom-trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('button#content-button').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('[data-cy="content"]').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should not open on right click when trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('button#custom-trigger').rightclick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
    it('should open on touch when trigger is click', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('button#custom-trigger').realTouch();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open on focus when trigger is focus', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('button#custom-trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should close on blur when trigger is focus', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('button#custom-trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
    it('should not close on blur when preventcloseonblur is true', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').invoke('attr', 'preventcloseonblur', 'true');
      cy.get('button#custom-trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open on mouseover when trigger is hover', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'hover');
      cy.get('button#custom-trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should hide on mouseout when trigger is hover', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'hover');
      cy.get('button#custom-trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('button#custom-trigger').trigger('mouseout');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
    it('should open on contextmenu when trigger is contextmenu', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'contextmenu');
      cy.get('button#custom-trigger').rightclick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should open when action key is clicked', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'click');
      cy.get('@mc-popover').then(($el) => {
        $el[0].actionkeys = ['ArrowDown'];
      });
      cy.realPress('Tab');
      cy.get('button#custom-trigger').as('trigger-button');
      cy.get('@trigger-button').focus();
      cy.get('@trigger-button').realPress('ArrowDown');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });
    it('should not open the popover on any event by default when the trigger is manual', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'manual');

      cy.get('button#custom-trigger').realClick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('button#custom-trigger').trigger('hover');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('button#custom-trigger').trigger('focus');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
      cy.get('button#custom-trigger').rightclick();
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.have.css', 'display', 'block');
    });
  });

  context('keyboard navigation', () => {
    it('closes when "escape" is pressed', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').find('button#trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.realPress('Escape');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });

    it('stays open when navigating inside content using tab', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').find('button#trigger').focus();
      cy.realPress('Tab');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });

    it('closes when blurred after navigating with Tab', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'focus');
      cy.get('@mc-popover').find('button#trigger').focus();
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
  });

  context('open/close delay', () => {
    it('should open after opendelay', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'hover');
      cy.get('@mc-popover').invoke('attr', 'opendelay', '100');
      cy.get('@mc-popover').find('button#trigger').trigger('mouseover');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
    });

    it('should close after 50ms', () => {
      cy.get('@mc-popover').invoke('attr', 'trigger', 'hover');
      cy.get('@mc-popover').find('button#trigger').trigger('mouseover');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@mc-popover').find('button#trigger').trigger('mouseout');
      cy.get('@mc-popover').find('[data-cy="content"]').should('have.css', 'display', 'block');
      cy.get('@mc-popover').find('[data-cy="content"]').should('not.be.visible');
    });
  });
});
