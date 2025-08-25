import { html } from 'lit';
import '../src';
import { McThemeSwitch } from '../src';

context('mc-theme-switch', () => {
  it('triggers a change event when it is clicked', () => {
    const clickHandlerSpy = cy.spy().as('onClickSpy');
    cy.mount<McThemeSwitch>(html`<mc-theme-switch @change="${(): void => clickHandlerSpy()}"></mc-theme-switch>`).as(
      'mc-theme-switch',
    );
    cy.get('@mc-theme-switch').should('have.prop', 'theme', 'auto');
    cy.get('@mc-theme-switch').should('have.prop', 'icon', 'moon');
    cy.get('@mc-theme-switch').click();
    cy.get('@mc-theme-switch').should('have.prop', 'theme', 'dark');
    cy.get('@mc-theme-switch').should('have.prop', 'icon', 'sun');
    cy.get('@onClickSpy').its('callCount').should('above', 0);
  });

  it("starts in dark mode if localstorage is set to 'dark' and switches to light mode on click", () => {
    const clickHandlerSpy = cy.spy().as('onClickSpy');
    cy.window().then((win) => win.localStorage.setItem('[mds-theme-switch]theme', 'dark'));
    cy.mount<McThemeSwitch>(html`<mc-theme-switch @change="${(): void => clickHandlerSpy()}"></mc-theme-switch>`).as(
      'mc-theme-switch',
    );
    cy.get('@mc-theme-switch').should('have.prop', 'theme', 'dark');
    cy.get('@mc-theme-switch').should('have.prop', 'icon', 'sun');
    // then switches to light on click
    cy.get('@mc-theme-switch').click();
    cy.get('@onClickSpy').its('callCount').should('above', 0);
    cy.get('@mc-theme-switch').should('have.prop', 'theme', 'light');
    cy.get('@mc-theme-switch').should('have.prop', 'icon', 'moon');
    cy.window().then((win) => expect(win.localStorage.getItem('[mds-theme-switch]theme')).to.eq('"light"')); // with extra ""
  });

  describe('Checks the label of the button for different languages', () => {
    const dataMap = [
      { code: 'en', light: 'Switch to light theme', dark: 'Switch to dark theme' },
      { code: 'fr', light: 'Passer au thème clair', dark: 'Passer au thème sombre' },
      { code: 'de', light: `Wechseln Sie zum hell-Thema`, dark: `Wechseln Sie zum dunkel-Thema` },
      { code: 'zh_cn', light: `切换到浅色主题`, dark: `切换到深色主题` },
      { code: 'zh_tw', light: `切換到浅色主題`, dark: `切換到深色主題` },
      { code: 'ja', light: `ライトテーマに切り替え`, dark: `ダークテーマに切り替え` },
      { code: 'ko', light: `라이트 테마로 전환`, dark: `다크 테마로 전환` },
      { code: 'ru', light: `Переключиться на светлый тему`, dark: `Переключиться на темный тему` },
      { code: 'pt_br', light: `Mudar para o tema claro`, dark: `Mudar para o tema escuro` },
      { code: 'es_mx', light: `Cambiar al tema claro`, dark: `Cambiar al tema oscuro` },
      { code: 'it', light: 'Passa al tema chiaro', dark: 'Passa al tema scuro' },
    ];
    for (const lang of dataMap) {
      it(`should display the correct label in ${lang.code}`, () => {
        cy.window().then((win) => (win.document.documentElement.lang = lang.code));
        cy.mount<McThemeSwitch>(html`<mc-theme-switch></mc-theme-switch>`).as('mc-theme-switch');
        cy.get('@mc-theme-switch').shadow().find('mc-button').should('have.attr', 'aria-label', lang.dark);
      });
    }
  });
});
