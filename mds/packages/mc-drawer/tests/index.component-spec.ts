import { html } from 'lit';
import '../src';
import { McDrawer } from '../src';

const heading = 'Drawer heading';
const body = 'Drawer body';

//tests specific to mc-drawer, rest of the functionality is covered in mc-dialog-base tests
context('mc-drawer', () => {
  beforeEach(() => {
    cy.mount<McDrawer>(html`
      <mc-drawer .heading=${heading} .body=${body}>
        <mc-button slot="footer" appearance="neutral" dialogaction="close" id="button-drawer-close">Close</mc-button>
      </mc-drawer>
    `).as('mc-drawer');
  });

  it(`dispatches 'closed' event along with 'close' in detail, when the button with 'dialogaction="close"' is clicked`, () => {
    cy.get('@mc-drawer').invoke('attr', 'open', '');
    const closedHandler = cy.stub().as('closedHandler');
    cy.get('mc-drawer').then(($el) => {
      const mcDrawer = $el.get(0);
      mcDrawer.addEventListener('closed', closedHandler);

      cy.get('#button-drawer-close').click();
    });

    cy.get('@closedHandler').its('callCount').should('eq', 1);
    cy.get('@closedHandler').should('have.been.calledWithMatch', {
      detail: { action: 'close' },
    });
  });

  it('shows close button by default', () => {
    cy.get('@mc-drawer').find('[data-cy="close"]').should('exist');
  });

  it('closes on click outside by default', () => {
    cy.get('@mc-drawer').invoke('attr', 'open', '');
    cy.get('body').click(0, 0);
    cy.get('@mc-drawer').find('dialog').should('not.be.visible');
  });

  it('applies customsize as objects with breakpoint values for width when position is left or right', () => {
    cy.get('@mc-drawer').invoke('remove');

    const customSizeObj = { xs: '100%', sm: '400px', md: '500px', lg: '600px', xl: '700px' };

    cy.mount<McDrawer>(html`
      <mc-drawer .heading=${heading} .body=${body} position="right">
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-drawer>
    `).as('mc-drawer');

    cy.get('@mc-drawer').then(($el) => {
      const drawer = $el.get(0) as McDrawer;
      drawer.customsize = { ...customSizeObj };
    });

    cy.get('@mc-drawer').invoke('attr', 'open', '');

    const checkCustomSizeAndProperties = (viewportWidth: number, expectedSize: string) => {
      cy.viewport(viewportWidth, 600);

      cy.get('@mc-drawer')
        .find('dialog')
        .should(($dialog) => {
          const computedStyle = window.getComputedStyle($dialog[0]);
          const computedSize = parseFloat(computedStyle.width).toFixed(0) + 'px';
          expect(computedSize).to.equal(expectedSize);

          // Check if CSS custom properties are set
          Object.entries(customSizeObj).forEach(([breakpoint, value]) => {
            const propertyValue = computedStyle.getPropertyValue(`--dialog-width-${breakpoint}`);
            expect(propertyValue.trim()).to.equal(value);
          });
        });
    };

    // Test for different breakpoints
    checkCustomSizeAndProperties(640, '640px'); // xs breakpoint
    checkCustomSizeAndProperties(1024, '400px'); // sm breakpoint
    checkCustomSizeAndProperties(1440, '500px'); // md breakpoint
    checkCustomSizeAndProperties(1920, '600px'); // lg breakpoint
    checkCustomSizeAndProperties(2000, '700px'); // xl breakpoint
  });

  it('applies customsize as objects with breakpoint values for height when position is top or bottom', () => {
    cy.get('@mc-drawer').invoke('remove');

    const customSizeObj = { xs: '200px', sm: '400px', md: '500px', lg: '600px', xl: '700px' };

    cy.mount<McDrawer>(html`
      <mc-drawer .heading=${heading} .body=${body} position="top">
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-drawer>
    `).as('mc-drawer');

    cy.get('@mc-drawer').then(($el) => {
      const drawer = $el.get(0) as McDrawer;
      drawer.customsize = { ...customSizeObj };
    });

    cy.get('@mc-drawer').invoke('attr', 'open', '');

    const checkCustomSizeAndProperties = (viewportWidth: number, expectedSize: string) => {
      cy.viewport(viewportWidth, 800);

      cy.get('@mc-drawer')
        .find('dialog')
        .should(($dialog) => {
          const computedStyle = window.getComputedStyle($dialog[0]);
          const computedSize = parseFloat(computedStyle.height).toFixed(0) + 'px';
          expect(computedSize).to.equal(expectedSize);

          // Check if CSS custom properties are set
          Object.entries(customSizeObj).forEach(([breakpoint, value]) => {
            const propertyValue = computedStyle.getPropertyValue(`--dialog-height-${breakpoint}`);
            expect(propertyValue.trim()).to.equal(value);
          });
        });
    };

    // Test for different breakpoints
    checkCustomSizeAndProperties(640, '200px'); // xs breakpoint
    checkCustomSizeAndProperties(1024, '400px'); // sm breakpoint
    checkCustomSizeAndProperties(1440, '500px'); // md breakpoint
    checkCustomSizeAndProperties(1920, '600px'); // lg breakpoint
    checkCustomSizeAndProperties(2000, '700px'); // xl breakpoint
  });

  it('applies customsize as strings for width when position is left or right', () => {
    cy.get('@mc-drawer').invoke('remove');
    cy.mount<McDrawer>(html`
      <mc-drawer .heading=${heading} .body=${body} position="left" customsize="300px">
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-drawer>
    `).as('mc-drawer');
    cy.viewport(1000, 1000);
    cy.get('@mc-drawer').invoke('attr', 'open', '');

    cy.get('@mc-drawer')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(300);
      });
  });

  it('applies customsize as strings for height when position is top or bottom', () => {
    cy.get('@mc-drawer').invoke('remove');
    cy.mount<McDrawer>(html`
      <mc-drawer .heading=${heading} .body=${body} position="bottom" customsize="300px">
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-drawer>
    `).as('mc-drawer');
    cy.viewport(1000, 1000);
    cy.get('@mc-drawer').invoke('attr', 'open', '');

    cy.get('@mc-drawer')
      .find('dialog')
      .should(($dialog) => {
        const height = Math.round(parseFloat(window.getComputedStyle($dialog[0]).height));
        expect(height).to.equal(300);
      });
  });

  it('string values override object values for customsize based on position', () => {
    cy.get('@mc-drawer').invoke('remove');
    const customSizeObj = { xs: '100%', sm: '400px', md: '500px', lg: '600px', xl: '700px' };

    cy.mount<McDrawer>(html`
      <mc-drawer .heading=${heading} .body=${body} position="right" .customsize=${customSizeObj}>
        <mc-button slot="footer" dialogaction="close">Close</mc-button>
      </mc-drawer>
    `).as('mc-drawer');

    cy.get('@mc-drawer').invoke('attr', 'open', '');

    // First, check that object values are applied
    cy.viewport(1200, 1024); // lg breakpoint
    cy.get('@mc-drawer')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(500);
      });

    // Now, override with string values
    cy.get('@mc-drawer').then(($el) => {
      const drawer = $el.get(0) as McDrawer;
      drawer.customsize = '300px';
    });

    // Check that string values are applied and override object values
    cy.get('@mc-drawer')
      .find('dialog')
      .should(($dialog) => {
        const width = Math.round(parseFloat(window.getComputedStyle($dialog[0]).width));
        expect(width).to.equal(300);
      });
  });

  it('should not close the drawer if backdropcloseactiondisabled attribute is set', () => {
    cy.get('mc-drawer').invoke('attr', 'backdropcloseactiondisabled', true);
    cy.get('@mc-drawer').invoke('attr', 'open', '');
    cy.get('mc-drawer').should('have.attr', 'backdropcloseactiondisabled');
    cy.get('body').click(0, 0);
    cy.get('mc-drawer').find('dialog').should('be.visible');
  });

  describe('scroll locking behavior', () => {
    it('always locks page scroll for modal drawers when disablepagescroll is true', () => {
      cy.get('@mc-drawer').invoke('remove');
      cy.mount<McDrawer>(html`
        <mc-drawer .heading=${heading} .body=${body}>
          <mc-button slot="footer" dialogaction="close">Close</mc-button>
        </mc-drawer>
      `).as('mc-drawer');

      cy.get('@mc-drawer').then(($el) => {
        const drawer = $el.get(0) as McDrawer;
        drawer.disablepagescroll = true;
      });

      cy.get('@mc-drawer').invoke('attr', 'open', '');
      cy.get('html').should('have.css', 'overflow', 'hidden');
    });

    it('does not lock page scroll for modal drawers when disablepagescroll is false', () => {
      cy.get('@mc-drawer').invoke('remove');
      cy.mount<McDrawer>(html`
        <mc-drawer .heading=${heading} .body=${body}>
          <mc-button slot="footer" dialogaction="close">Close</mc-button>
        </mc-drawer>
      `).as('mc-drawer');

      cy.get('@mc-drawer').then(($el) => {
        const drawer = $el.get(0) as McDrawer;
        drawer.disablepagescroll = false;
      });

      cy.get('@mc-drawer').invoke('attr', 'open', '');
      cy.get('html').should('not.have.css', 'overflow', 'hidden');
    });

    describe('non-modal drawers', () => {
      it('locks page scroll when drawer dimensions exceed viewport bounds and disablepagescroll is true', () => {
        cy.get('@mc-drawer').invoke('remove');
        cy.viewport(800, 600);
        cy.mount<McDrawer>(html`
          <mc-drawer .heading=${heading} .body=${body} position="right" customsize="780px">
            <mc-button slot="footer" dialogaction="close">Close</mc-button>
          </mc-drawer>
        `).as('mc-drawer');

        cy.get('@mc-drawer').then(($el) => {
          const drawer = $el.get(0) as McDrawer;
          drawer.nonmodal = true;
          drawer.disablepagescroll = true;
        });

        cy.get('@mc-drawer').invoke('attr', 'open', '');
        cy.get('html').should('have.css', 'overflow', 'hidden');
      });

      it('does not lock page scroll when drawer dimensions are smaller than viewport bounds', () => {
        cy.get('@mc-drawer').invoke('remove');
        cy.viewport(800, 600);
        cy.mount<McDrawer>(html`
          <mc-drawer .heading=${heading} .body=${body} position="right" customsize="400px">
            <mc-button slot="footer" dialogaction="close">Close</mc-button>
          </mc-drawer>
        `).as('mc-drawer');

        cy.get('@mc-drawer').then(($el) => {
          const drawer = $el.get(0) as McDrawer;
          drawer.nonmodal = true;
          drawer.disablepagescroll = true;
        });

        cy.get('@mc-drawer').invoke('attr', 'open', '');
        cy.get('html').should('not.have.css', 'overflow', 'hidden');
      });

      it('updates scroll locking when drawer is resized', () => {
        cy.get('@mc-drawer').invoke('remove');
        cy.viewport(800, 600);
        cy.mount<McDrawer>(html`
          <mc-drawer .heading=${heading} .body=${body} position="right" customsize="400px">
            <mc-button slot="footer" dialogaction="close">Close</mc-button>
          </mc-drawer>
        `).as('mc-drawer');

        cy.get('@mc-drawer').then(($el) => {
          const drawer = $el.get(0) as McDrawer;
          drawer.nonmodal = true;
          drawer.disablepagescroll = true;
        });

        cy.get('@mc-drawer').invoke('attr', 'open', '');
        cy.get('html').should('not.have.css', 'overflow', 'hidden');

        // Change size to exceed viewport bounds
        cy.get('@mc-drawer').then(($el) => {
          const drawer = $el.get(0) as McDrawer;
          drawer.customsize = '780px';
        });

        cy.get('html').should('have.css', 'overflow', 'hidden');
      });

      it('does not lock scroll when disablepagescroll is false, regardless of dimensions', () => {
        cy.get('@mc-drawer').invoke('remove');
        cy.viewport(800, 600);
        cy.mount<McDrawer>(html`
          <mc-drawer .heading=${heading} .body=${body} position="right" customsize="780px">
            <mc-button slot="footer" dialogaction="close">Close</mc-button>
          </mc-drawer>
        `).as('mc-drawer');

        cy.get('@mc-drawer').then(($el) => {
          const drawer = $el.get(0) as McDrawer;
          drawer.nonmodal = true;
          drawer.disablepagescroll = false;
        });

        cy.get('@mc-drawer').invoke('attr', 'open', '');
        cy.get('html').should('not.have.css', 'overflow', 'hidden');
      });
    });
  });
});
