// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues, isServer } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeSVG, UnsafeSVGDirective } from 'lit/directives/unsafe-svg.js';
import { DirectiveResult } from 'lit/directive';
import { styleMap } from 'lit/directives/style-map.js';
import { until } from 'lit/directives/until.js';

// utils
import { isCdn, supportsDynamicImport } from '@maersk-global/mds-components-utils';
import { MdsConfig } from '@maersk-global/mds-config';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcIcon, IconSize } from './types';
export type { IMcIcon } from './types';

// This is the directory that SVG assets are fetched from
const svgAssetsDir = 'https://assets.maerskline.com/mds/icons/latest/svg';
/**
 * @element `mc-icon`
 *
 * @csspart `icon` - for changing visuals of svg icon
 * @csspart `icon-wrapper` - for changing visuals of icon wrapper
 */
export class McIcon extends LitElement implements IMcIcon {
  @state()
  private convertedSize = '20';

  @state()
  private svg?: Promise<DirectiveResult<typeof UnsafeSVGDirective>>;
  private static supportsDynamicImport: boolean | undefined = undefined;

  @property({ type: String })
  public color: string | undefined;

  @property({ type: String, reflect: true })
  public icon = 'empty';

  @property({ type: String })
  public size: IconSize = '20';

  @property({ type: String, reflect: true })
  public title: string;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public get iconTitle(): string | undefined {
    return this.title || (this.icon !== 'empty' ? this.icon : undefined);
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size') || changedProperties.has('icon') || changedProperties.has('title')) {
      this.convertedSize = this.size === '16' ? '20' : this.size;

      if (this.icon && this.icon !== 'empty') {
        this.svg = this.renderIcon(this.convertedSize);
      }
    }
  }

  public render(): TemplateResult {
    const classes = {
      [`size-${this.size}`]: true,
    };
    const styles = {
      fill: this.color ? this.color : 'var(--mds_core_icon_color)',
    };
    return html`<span part="icon-wrapper" class="mc-icon ${classMap(classes)}" style="${styleMap(styles)}"
      >${this.icon && this.icon !== 'empty' && this.svg ? until(this.svg) : this.getEmptyIcon(this.convertedSize)}</span
    >`;
  }

  private async renderIcon(size: string): Promise<DirectiveResult<typeof UnsafeSVGDirective>> {
    try {
      if (McIcon.supportsDynamicImport === undefined) {
        McIcon.supportsDynamicImport = supportsDynamicImport();
      }
      let icon: string | undefined;
      // Get config path based on server/client context
      const configPath = MdsConfig?.iconsDynamicImportPath || isServer ? MdsConfig?.iconsDynamicImportPath : window.MdsConfig?._iconsDynamicImportPath;

      // Check if the browser supports dynamic imports or if iconsDynamicImportPath is not set and load dynamically svg from our cdn
      if (!McIcon.supportsDynamicImport || isCdn()) {
        icon = await fetch(`${svgAssetsDir}/${size}px/mi-${this.icon}.svg`).then((response) => {
          if (response.ok) {
            return response.text();
          }
        });
      } else {
        let iconModule = null;
        if (configPath) {
          iconModule = await import(
            /* @vite-ignore */
            `${configPath}@maersk-global/icons/js/${size}px/mi-${this.icon}.js`
          );
        } else {
          iconModule = await import(/* @vite-ignore */ `@maersk-global/icons/js/${size}px/mi-${this.icon}.js`);
        }
        icon = iconModule.default;
      }
      return unsafeSVG(this.addTitleToSvg(icon));
    } catch (err) {
      console.warn(
        `The icons path not configured. 
        Please set MdsConfig.iconsDynamicImportPath before using mc-icon component.
        Example: MdsConfig.iconsDynamicImportPath = "/node_modules/"
        ${err}`,
      );
      return this.getEmptyIcon(size);
    }
  }

  /**
   * Adds an aria-label attribute to the SVG element of the icon
   * @param svg
   * @returns The SVG element modified with the title attribute
   */
  private addTitleToSvg(svg: string): string {
    if (this.iconTitle) {
      return svg.replace(/<svg/, `<svg aria-label="${this.iconTitle}"`);
    }
    return svg;
  }

  private getEmptyIcon(size: string): DirectiveResult<typeof UnsafeSVGDirective> {
    return unsafeSVG(`<svg
    width="${size}"
    height="${size}"
    viewBox="0 0 ${size} ${size}"
    xmlns="http://www.w3.org/2000/svg"
  ></svg>`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-icon': McIcon;
  }
}

customElements.get('mc-icon') || customElements.define('mc-icon', McIcon);
