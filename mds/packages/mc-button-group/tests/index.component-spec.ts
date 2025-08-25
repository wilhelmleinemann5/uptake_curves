import '../src';
import { McButtonGroup } from '../src';

context('mc-button-group', () => {
  describe('', () => {
    const afterSelectedClassName = 'after-selected';

    beforeEach(() => {
      cy.mount<McButtonGroup>(
        `<mc-button-group>
            <mc-button-group-item value="Computer" label="Computer" icon="computer"></mc-button-group-item>
            <mc-button-group-item value="Printer" label="Printer" icon="printer"></mc-button-group-item>
            <mc-button-group-item value="File" label="File" icon="file"></mc-button-group-item>
            <mc-button-group-item value="Folder" label="Folder" icon="folder-open"></mc-button-group-item>
            <mc-button-group-item value="Office" label="Office" icon="office-2"></mc-button-group-item>
        </mc-button-group>`
      ).as('mc-button-group');

      cy.get('@mc-button-group').find('mc-button-group-item[value="Computer"]').as('computer-item');
      cy.get('@mc-button-group').find('mc-button-group-item[value="Printer"]').as('printer-item');
      cy.get('@mc-button-group').find('mc-button-group-item[value="Folder"]').as('folder-item');
      cy.get('@mc-button-group').find('mc-button-group-item[value="Office"]').as('office-item');
    });

    it("toggles '.after-selected' class on subsequent item during 'multiple' mode", () => {
      cy.get('@mc-button-group').invoke('attr', 'type', 'multiple');
      cy.get('@computer-item').realClick();
      cy.get('@printer-item').should('have.class', afterSelectedClassName);

      cy.get('@computer-item').realClick();
      cy.get('@printer-item').should('not.have.class', afterSelectedClassName);
    });

    it("only one '.after-selected' class item exists at a time in 'single' mode", () => {
      cy.get('@mc-button-group').invoke('attr', 'type', 'single');
      cy.get('@folder-item').realClick();
      cy.get('@office-item').should('have.class', afterSelectedClassName);

      // clicking again on the same item in 'single' selection mode, does not toggle
      // the 'after-selected' class on the subsequent item.
      cy.get('@folder-item').realClick();
      cy.get('@office-item').should('have.class', afterSelectedClassName);

      cy.get('@computer-item').realClick();
      cy.get(`mc-button-group-item.${afterSelectedClassName}`).should('have.length', 1);
    });
  });
});
