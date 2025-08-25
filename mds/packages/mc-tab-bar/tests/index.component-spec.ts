import { McTabBar } from '../src';
import '../src';
import '@maersk-global/mds-components-core-tab';

const tabZero = `<mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
<p slot="panel">Info page with lots of information about us.</p>`;
const tabOne = `<mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
  <p slot="panel">Work page that showcases our work.</p>`;
const tabTwo = `<mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
  <p slot="panel">Hobby page that shows our interests.</p>`;
const tabThree = `<mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
  <p slot="panel">Contact page that shows our contacts.</p>`;
const tabFour = `<mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
  <p slot="panel">Address page that shows our addresses.</p>`;

const tabZeroLink = `<mc-tab slot="tab" icon="info-circle"><a href="#info">Info</a></mc-tab>
<p slot="panel">Info page with lots of information about us.</p>`;
const tabOneLink = `<mc-tab slot="tab" icon="globe"><a href="#work">Work</a></mc-tab>
  <p slot="panel">Work page that showcases our work.</p>`;
const tabTwoLink = `<mc-tab slot="tab" icon="heart"><a href="#hobby">Hobby</a></mc-tab>
  <p slot="panel">Hobby page that shows our interests.</p>`;
const tabThreeLink = `<mc-tab slot="tab" icon="envelope" disabled><a href="#contact">Contact</a></mc-tab>
  <p slot="panel">Contact page that shows our contacts.</p>`;

const tabZeroNoPanel = `<mc-tab slot="tab" icon="info-circle"><a href="#info">Info</a></mc-tab>`;
const tabOneNoPanel = `<mc-tab slot="tab" icon="globe"><a href="#work">Work</a></mc-tab>`;
const tabTwoNoPanel = `<mc-tab slot="tab" icon="heart"><a href="#hobby">Hobby</a></mc-tab>`;

context('mc-tab-bar', () => {
  describe('shows tab content', () => {
    beforeEach(() => {
      cy.mount<McTabBar>(
        `<mc-tab-bar currentindex="0">
        ${tabZero}
        ${tabOne}
        ${tabTwo}
        ${tabThree}
        ${tabFour}
      </mc-tab-bar>`,
      ).as('mc-tab-bar');
    });
    it('mounts', () => {
      cy.get('@mc-tab-bar');
    });
    it('can click on tabs', () => {
      cy.get('mc-tab').eq(1).click();
      cy.get('mc-tab').eq(1).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(1).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(1).should('be.visible');
      cy.get('mc-tab').eq(2).click();
      cy.get('mc-tab').eq(2).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(2).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(2).should('be.visible');
      cy.get('mc-tab').eq(3).click();
      cy.get('mc-tab').eq(3).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(3).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(3).should('be.visible');
    });
    it('fires `tabchange` event along with 1 (selected tab index) in detail, if the second tab button is clicked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-tab-bar').then(($el) => {
        const mcTabBar = $el.get(0);
        mcTabBar.addEventListener('tabchange', changeHandler);

        cy.get('mc-tab').eq(1).realClick();
      });
      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 1,
      });
    });
    it("shows the second tab's panel if the first tab is disabled and then the second one is clicked on", () => {
      cy.get('mc-tab').eq(0).invoke('prop', 'disabled', true);
      cy.get('mc-tab').eq(1).realClick();

      cy.get('p[slot=panel]').eq(0).should('not.have.attr', 'selected');
      cy.get('p[slot=panel]').eq(1).should('have.attr', 'selected');
    });
  });

  describe('can click on scroll buttons', () => {
    beforeEach(() => {
      cy.viewport(550, 750);
      cy.mount<McTabBar>(
        `
      <mc-tab-bar currentindex="0">
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <div slot="panel">Info page with lots of information about us.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
        <p slot="panel">Work page that showcases our work.</p>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
        <p slot="panel">Hobby page that shows our interests.</p>
        <!-- tab 3: -->
        <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
        <p slot="panel">Contact page that shows our contacts.</p>
        <!-- tab 4: -->
        <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
        <p slot="panel">Address page that shows our addresses.</p>
      </mc-tab-bar>`,
      ).as('mc-tab-bar');

      // aliases
      cy.get('mc-tab-bar').find('[data-cy="scroll-button-left"]').as('scroll-button-left');
      cy.get('mc-tab-bar').find('[data-cy="scroll-button-right"]').as('scroll-button-right');
    });
    it('left button disabled, right button not disabled', () => {
      cy.get('@scroll-button-left').should('have.attr', 'disabled');
      cy.get('@scroll-button-right').should('not.have.attr', 'disabled');
    });
    it('right button click, left button not disabled', () => {
      cy.get('@scroll-button-right').realClick();
      cy.get('@scroll-button-left').should('not.have.attr', 'disabled');
    });
    it('right button gets disabled when scrolled to the end', () => {
      for (let i = 0; i < 3; i++) {
        cy.get('@scroll-button-right').click({ force: true });
      }
      cy.get('@scroll-button-right').should('have.attr', 'disabled');
    });
    it('left button gets disabled when scrolled to the start', () => {
      cy.get('@scroll-button-left').should('have.attr', 'disabled');
      for (let i = 0; i < 3; i++) {
        cy.get('@scroll-button-right').realClick();
      }

      for (let i = 0; i < 3; i++) {
        cy.get('@scroll-button-left').realClick();
      }
      cy.get('@scroll-button-left').should('have.attr', 'disabled');
    });
  });

  describe('key navigation', () => {
    beforeEach(() => {
      cy.viewport(1000, 1000);
      cy.mount<McTabBar>(
        `
      <mc-button id="initial-focus">Focus me</mc-button>
      <mc-tab-bar currentindex="0">
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <p slot="panel">Info page with lots of information about us.</p>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
        <p slot="panel">Work page that showcases our work.</p>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
        <p slot="panel">Hobby page that shows our interests.</p>
        <!-- tab 3: -->
        <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
        <p slot="panel">Contact page that shows our contacts.</p>
        <!-- tab 4: -->
        <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
        <p slot="panel">Address page that shows our addresses.</p>
      </mc-tab-bar>`,
      );

      cy.get('mc-button#initial-focus').find('button').realClick();
      cy.get('mc-button#initial-focus').find('button').should('have.focus');
      cy.realPress('Tab');
    });

    it('while the first tab is focused, pressing the right-arrow moves the focus to the second tab', () => {
      cy.realPress('ArrowRight');
      cy.get('mc-tab').eq(1).find('mc-button').should('have.focus');
    });

    it('while the first tab is focused, pressing the left-arrow moves the focus to the last item', () => {
      cy.realPress('ArrowLeft');
      cy.get('mc-tab').eq(4).find('mc-button').should('have.focus');
    });

    it('while the third tab is focused, pressing the left-arrow moves the focus to the second item', () => {
      // Move to the second tab
      cy.realPress('ArrowRight').realPress('ArrowRight').realPress('ArrowLeft');
      cy.get('mc-tab').eq(1).find('mc-button').should('have.focus');
    });

    it('while the third tab is focused, pressing the right-arrow moves the focus to the forth item', () => {
      // Move to the second tab
      cy.realPress('ArrowRight').realPress('ArrowRight').realPress('ArrowRight');
      cy.get('mc-tab').eq(3).find('mc-button').should('have.focus');
    });

    it('while the first tab is focused, pressing the end moves the focus to the last tab', () => {
      cy.get('mc-tab').eq(0).find('mc-button').should('have.focus');

      cy.realPress('End');
      cy.get('mc-tab').eq(4).find('mc-button').should('have.focus');
    });

    it('while the last tab is focused, pressing the home moves the focus to the last tab', () => {
      cy.realPress('ArrowRight').realPress('ArrowRight').realPress('ArrowRight').realPress('Home');

      cy.get('mc-tab').eq(0).find('mc-button').should('have.focus');
    });

    it('while the first tab is focused and second one is disabled, pressing the right-arrow moves the focus to the third tab', () => {
      cy.get('mc-tab').eq(1).invoke('prop', 'disabled', true);
      cy.realPress('ArrowRight');
      cy.get('mc-tab').eq(2).find('mc-button').should('have.focus');
    });

    it('while the third tab is focused and second one is disabled, pressing the left-arrow moves the focus to the first tab', () => {
      cy.get('mc-tab').eq(1).invoke('prop', 'disabled', true);
      cy.realPress('ArrowRight').realPress('ArrowLeft');
      cy.get('mc-tab').eq(0).find('mc-button').should('have.focus');
    });

    it('while the third tab is focused and the second and last tabs are disabled, pressing the right-arrow twice moves the focus to the first tab', () => {
      cy.get('mc-tab').eq(1).invoke('prop', 'disabled', true);
      cy.get('mc-tab').eq(4).invoke('prop', 'disabled', true);

      cy.realPress('ArrowRight').realPress('ArrowRight').realPress('ArrowRight');
      cy.get('mc-tab').eq(0).find('mc-button').should('have.focus');
    });

    it('while the second tab is focused and the first tabs is disabled, pressing the left-arrow moves the focus to the last tab', () => {
      cy.realPress('ArrowRight');
      cy.get('mc-tab').eq(0).invoke('prop', 'disabled', true);

      cy.realPress('ArrowLeft');
      cy.get('mc-tab').eq(4).find('mc-button').should('have.focus');
    });
  });

  describe('dynamic tabs', () => {
    it('should show the scroll buttons when being added dynamically (simulates a route change in SPA)', () => {
      cy.mount(`<mc-tab-bar></mc-tab-bar>`).as('mc-tab-bar');
      cy.get('@mc-tab-bar').invoke(
        'prop',
        'innerHTML',
        `<mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab><div slot="panel">Info page with lots of information about us.</div>
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab><div slot="panel">Info page with lots of information about us.</div>
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab><div slot="panel">Info page with lots of information about us.</div>
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab><div slot="panel">Info page with lots of information about us.</div>
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab><div slot="panel">Info page with lots of information about us.</div>
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab><div slot="panel">Info page with lots of information about us.</div>
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab><div slot="panel">Info page with lots of information about us.</div>`,
      );
      cy.get('mc-tab-bar').find('[data-cy="scroll-button-left"]');
      cy.get('mc-tab-bar').find('[data-cy="scroll-button-right"]');
    });
  });

  describe('handles dynamic slot tab and panel change', () => {
    beforeEach(() => {
      cy.mount<McTabBar>(
        `<mc-tab-bar>
        ${tabZero}
        ${tabOne}
        ${tabTwo}
      </mc-tab-bar>`,
      ).as('mc-tab-bar');
    });
    it('can click on the tabs after first tab is removed from the dom', () => {
      cy.get('@mc-tab-bar').find('mc-tab').should('have.length', 3);
      cy.get('@mc-tab-bar').find('p').should('have.length', 3);
      cy.get('@mc-tab-bar').find('mc-tab').eq(0).invoke('remove');
      cy.get('@mc-tab-bar').find('p').eq(0).invoke('remove');
      cy.get('@mc-tab-bar').find('mc-tab').should('have.length', 2);
      cy.get('@mc-tab-bar').find('p').should('have.length', 2);

      cy.get('mc-tab').eq(1).realClick();
      cy.get('mc-tab').eq(1).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(1).find('mc-button').should('contain.text', 'Hobby');
      cy.get('mc-tab').eq(1).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(1).should('be.visible');
      cy.get('*[role=tabpanel]').eq(1).should('contain.text', 'Hobby page that shows our interests.');

      cy.get('mc-tab').eq(0).realClick();
      cy.get('mc-tab').eq(0).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(0).find('mc-button').should('contain.text', 'Work');
      cy.get('mc-tab').eq(0).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(0).should('be.visible');
      cy.get('*[role=tabpanel]').eq(0).should('contain.text', 'Work page that showcases our work.');
    });
    it('can click on the tabs after first tab is added to the dom', () => {
      cy.get('@mc-tab-bar').find('mc-tab').should('have.length', 3);
      cy.get('@mc-tab-bar').find('p').should('have.length', 3);
      cy.get('@mc-tab-bar').then(($el) => {
        $el.append(tabThree);
      });
      cy.get('@mc-tab-bar').find('mc-tab').should('have.length', 4);
      cy.get('@mc-tab-bar').find('p').should('have.length', 4);

      cy.get('mc-tab').eq(2).realClick();
      cy.get('mc-tab').eq(2).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(2).find('mc-button').should('contain.text', 'Hobby');
      cy.get('mc-tab').eq(2).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(2).should('be.visible');
      cy.get('*[role=tabpanel]').eq(2).should('contain.text', 'Hobby page that shows our interests.');

      cy.get('mc-tab').eq(3).realClick();
      cy.get('mc-tab').eq(3).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(3).find('mc-button').should('contain.text', 'Contact');
      cy.get('mc-tab').eq(3).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(3).should('be.visible');
      cy.get('*[role=tabpanel]').eq(3).should('contain.text', 'Contact page that shows our contacts.');
    });
  });

  describe('currentindex', () => {
    beforeEach(() => {
      cy.mount<McTabBar>(
        `<mc-tab-bar>
        ${tabZero}
        ${tabOne}
        ${tabTwo}
        ${tabThree}
        ${tabFour}
      </mc-tab-bar>`,
      ).as('mc-tab-bar');
    });
    it('shows correct tab on load', () => {
      cy.get('mc-tab').eq(0).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(0).should('be.visible');
    });
    it('shows correct tab when currentindex prop is set to 0 on load', () => {
      cy.get('@mc-tab-bar').invoke('prop', 'currentindex', 0);
      cy.get('mc-tab').eq(0).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(0).should('be.visible');
    });
    it('shows correct tab when clicked on tab 1', () => {
      cy.get('mc-tab').eq(1).realClick();
      cy.get('mc-tab').eq(1).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(1).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(1).should('be.visible');
    });
    it('shows correct tab when currentindex prop is set to 2', () => {
      cy.get('@mc-tab-bar').invoke('prop', 'currentindex', 2);
      cy.get('mc-tab').eq(2).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(2).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(2).should('be.visible');
    });
    it('shows correct tab when currentindex is set dynamically to 3', () => {
      cy.get('mc-tab').eq(0).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(0).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(0).should('be.visible');

      cy.document().then((doc) => {
        const htmlButton = doc.createElement('button');
        htmlButton.id = 'htmlButton';
        htmlButton.innerHTML = 'Set current index';
        htmlButton.onclick = () => {
          const mcTabBar = doc.querySelector('mc-tab-bar') as McTabBar;
          mcTabBar.currentindex = 3;
        };
        doc.body.appendChild(htmlButton);
      });

      cy.get('#htmlButton').click();
      cy.get('mc-tab').eq(3).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(3).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(3).should('be.visible');
    });
  });

  describe('tab with slot and links', () => {
    beforeEach(() => {
      cy.mount<McTabBar>(
        `<mc-tab-bar currentindex="0">
        ${tabZeroLink}
        ${tabOneLink}
        ${tabTwoLink}
        ${tabThreeLink}
      </mc-tab-bar>`,
      ).as('mc-tab-bar');
    });
    it('can click on tabs', () => {
      cy.get('mc-tab').eq(1).realClick();
      cy.get('mc-tab').eq(1).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(1).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(1).should('be.visible');
      cy.get('mc-tab').eq(2).realClick();
      cy.get('mc-tab').eq(2).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(2).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(2).should('be.visible');
      cy.get('mc-tab').eq(0).realClick();
      cy.get('mc-tab').eq(0).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(0).should('have.attr', 'active');
      cy.get('*[role=tabpanel]').eq(0).should('be.visible');
    });
    it('fires `tabchange` event along with 1 (selected tab index) in detail, if the second tab button is clicked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-tab-bar').then(($el) => {
        const mcTabBar = $el.get(0);
        mcTabBar.addEventListener('tabchange', changeHandler);

        cy.get('mc-tab').eq(1).realClick();
      });
      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 1,
      });
    });
    it("shows the second tab's panel if the first tab is disabled and then the second one is clicked on", () => {
      cy.get('mc-tab').eq(0).invoke('prop', 'disabled', true);
      cy.get('mc-tab').eq(1).realClick();

      cy.get('p[slot=panel]').eq(0).should('not.have.attr', 'selected');
      cy.get('p[slot=panel]').eq(1).should('have.attr', 'selected');
    });
    it("can't click on disabled tab", () => {
      cy.get('mc-tab').eq(3).realClick();
      cy.get('p[slot=panel]').eq(3).should('not.have.attr', 'selected');
    });
  });

  describe('tab without panel slot', () => {
    beforeEach(() => {
      cy.mount<McTabBar>(
        `<mc-tab-bar currentindex="0">
        ${tabZeroNoPanel}
        ${tabOneNoPanel}
        ${tabTwoNoPanel}
      </mc-tab-bar>`,
      ).as('mc-tab-bar');
    });
    it('can click on tabs', () => {
      cy.get('mc-tab').eq(1).realClick();
      cy.get('mc-tab').eq(1).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(1).should('have.attr', 'active');
      cy.get('mc-tab').eq(2).realClick();
      cy.get('mc-tab').eq(2).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(2).should('have.attr', 'active');
      cy.get('mc-tab').eq(0).realClick();
      cy.get('mc-tab').eq(0).find('mc-button').should('have.attr', 'ariaselected', 'true');
      cy.get('mc-tab').eq(0).should('have.attr', 'active');
    });
    it('fires `tabchange` event along with 1 (selected tab index) in detail, if the second tab button is clicked', () => {
      const changeHandler = cy.stub().as('changeHandler');
      cy.get('mc-tab-bar').then(($el) => {
        const mcTabBar = $el.get(0);
        mcTabBar.addEventListener('tabchange', changeHandler);

        cy.get('mc-tab').eq(1).realClick();
      });
      cy.get('@changeHandler').its('callCount').should('eq', 1);
      cy.get('@changeHandler').should('have.been.calledWithMatch', {
        detail: 1,
      });
    });
  });
});
