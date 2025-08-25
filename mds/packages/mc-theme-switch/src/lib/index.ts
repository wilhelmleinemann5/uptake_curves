import { html, TemplateResult, CSSResultArray, LitElement, isServer, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles/index.styles';
import { Fit } from '@maersk-global/mds-shared-types';
import { IMcThemeSwitch, IMcThemeSwitchChangeEvent, ThemeOptions } from './types';
import '@maersk-global/mds-components-core-button';
import { localStore } from '@maersk-global/shared-js';

/**
 * @element `mc-theme-switch`
 *
 * @event {CustomEvent<IMcThemeSwitchChangeEvent>} change - Fired when the theme is changed.
 */
export class McThemeSwitch extends LitElement implements IMcThemeSwitch {
  private LSThemeCategory = 'mds-theme-switch';
  private LSThemeKey = 'theme';

  @state() public theme: ThemeOptions = 'auto';

  @property({ type: String }) public fit: Fit = 'medium';

  @state() private styleLight: HTMLLinkElement;
  @state() private styleDark: HTMLLinkElement;
  @state() private browserScheme: ThemeOptions;
  @state() private nextTheme: ThemeOptions = 'dark';
  @state() private icon: 'moon' | 'sun' = 'moon';

  public constructor() {
    super();
    if (!isServer) {
      // Get the user selected theme from local storage
      const localTheme = localStore.getItem(this.LSThemeKey, this.LSThemeCategory) as ThemeOptions;
      if (localTheme && this.theme !== localTheme) {
        this.theme = localTheme;
      }
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.styleLight = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
    this.styleDark = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
    this.switchTheme(this.theme);
    if (!isServer) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => this.onSystemColorSchemeChange());
      // Must set browser scheme on connected callback or the next scheme will always be dark
      this.browserScheme =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    this.fireChangeEvent();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.styleLight = null;
    this.styleDark = null;
    if (!isServer) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => this.onSystemColorSchemeChange());
    }
  }

  public static get styles(): CSSResultArray {
    return styles;
  }

  // Change the color scheme based on the system level theme
  private onSystemColorSchemeChange(): void {
    this.browserScheme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.fireChangeEvent();
  }

  public willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('theme') || _changedProperties.has('browserScheme')) {
      // If the theme is changing or the browserScheme is changing, update the next theme and icon
      if (this.theme === 'auto') {
        this.nextTheme = this.browserScheme === 'dark' ? 'light' : 'dark';
      } else {
        this.nextTheme = this.theme !== 'dark' ? 'dark' : 'light';
      }
      this.icon = this.nextTheme === 'dark' ? 'moon' : 'sun';
    }
  }

  // Get the label for the button based on the current language
  private get label(): string {
    const ldTrans = {
      light: {
        en: 'light',
        fr: `clair`,
        de: `hell`,
        zh_cn: `浅色`,
        zh_tw: `淺色`,
        ja: `ライト`,
        ko: `라이트`,
        ru: `светлый`,
        pt_br: `claro`,
        es_mx: `claro`,
        it: 'chiaro',
      },
      dark: {
        en: 'dark',
        fr: `sombre`,
        de: `dunkel`,
        zh_cn: `深色`,
        zh_tw: `深色`,
        ja: `ダーク`,
        ko: `다크`,
        ru: `темный`,
        pt_br: `escuro`,
        es_mx: `oscuro`,
        it: 'scuro',
      },
    };

    let ldWord = this.nextTheme;
    if (!isServer) {
      ldWord = ldTrans[this.nextTheme][document.documentElement.lang] || this.nextTheme;
    }

    const translations = {
      en: `Switch to ${ldWord} theme`,
      fr: `Passer au thème ${ldWord}`,
      de: `Wechseln Sie zum ${ldWord}-Thema`,
      zh_cn: `切换到${ldWord}主题`,
      zh_tw: `切換到${ldWord}主題`,
      ja: `${ldWord}テーマに切り替え`,
      ko: `${ldWord} 테마로 전환`,
      ru: `Переключиться на ${ldWord} тему`,
      pt_br: `Mudar para o tema ${ldWord}`,
      es_mx: `Cambiar al tema ${ldWord}`,
      it: `Passa al tema ${ldWord}`,
    };

    if (!isServer) {
      return translations[document.documentElement.lang] || translations['en'];
    }
    return translations['en'];
  }

  public render(): TemplateResult {
    return html`<mc-button
      appearance="neutral"
      variant="plain"
      .icon=${this.icon}
      @click=${this.changeTheme}
      aria-label=${this.label}
      hiddenlabel
      .fit=${this.fit}
      >${this.label}
    </mc-button>`;
  }

  /**
   * Changes the theme of the component on the click of the button.
   * @event change
   */
  public changeTheme(): void {
    this.theme = this.nextTheme;
    this.switchTheme(this.theme);
    this.fireChangeEvent();
    localStore.setItem(this.LSThemeKey, this.theme, this.LSThemeCategory);
  }

  private fireChangeEvent(): void {
    this.dispatchEvent(new CustomEvent<IMcThemeSwitchChangeEvent>('change', { detail: { theme: this.theme } }));
  }

  // Sets the correct media attributes of the attached stylesheets
  private switchTheme(theme: string): void {
    // If we can't find the stylesheets, don't do anything
    if (!this.styleLight || !this.styleDark) {
      return;
    }
    let lightMedia = theme === 'light' ? 'all' : 'not all';
    let darkMedia = theme === 'dark' ? 'all' : 'not all';

    if (theme === 'auto') {
      lightMedia = '(prefers-color-scheme: light)';
      darkMedia = '(prefers-color-scheme: dark)';
    }

    this.styleLight.media = lightMedia;
    this.styleDark.media = darkMedia;
  }
}
customElements.get('mc-theme-switch') || customElements.define('mc-theme-switch', McThemeSwitch);

declare global {
  interface HTMLElementTagNameMap {
    'mc-theme-switch': McThemeSwitch;
  }
}
