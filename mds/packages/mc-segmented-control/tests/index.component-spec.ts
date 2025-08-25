import '../src';
import { McSegmentedControl } from '../src';

context('mc-segmented-control', () => {
  describe('', () => {
    beforeEach(() => {
      cy.mount<McSegmentedControl>(
        `<mc-segmented-control>
            <mc-segmented-control-item value="Computer" label="Computer" icon="computer"></mc-segmented-control-item>
            <mc-segmented-control-item value="Printer" label="Printer" icon="printer"></mc-segmented-control-item>
            <mc-segmented-control-item value="File" label="File" icon="file"></mc-segmented-control-item>
            <mc-segmented-control-item value="Folder" label="Folder" icon="folder-open"></mc-segmented-control-item>
            <mc-segmented-control-item value="Office" label="Office" icon="office-2"></mc-segmented-control-item>
        </mc-segmented-control>`
      ).as('mc-segmented-control');

      cy.get('@mc-segmented-control').find('mc-segmented-control-item[value="Computer"]').as('computer-item');
      cy.get('@mc-segmented-control').find('mc-segmented-control-item[value="Printer"]').as('printer-item');
      cy.get('@mc-segmented-control').find('mc-segmented-control-item[value="File"]').as('file-item');
    });

    it('toggles selected class properly', () => {
      cy.get('@printer-item').realClick();
      cy.get('@printer-item').should('have.attr', 'selected');
      cy.get('@computer-item').realClick();
      cy.get('@computer-item').should('have.attr', 'selected');
      cy.get('@printer-item').should('not.have.attr', 'selected');
    });
  });
});
