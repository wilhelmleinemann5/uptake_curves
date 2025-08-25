// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, queryAssignedNodes, state } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { Fit, Orientation, Target, CardVariant, ContentAlignment, ImageScaleStrength, IMcCard } from './types';

import { setHostCssClass } from '@maersk-global/mds-components-utils';

export type { IMcCard } from './types';

/**
 * @element `mc-card`
 *
 * @slot - The default slot for the body content.
 * @slot `actions` -  For adding links / buttons etc.
 * @slot `image` - Image.
 * @slot `footer` - Footer.
 *
 * @csspart `container` - for changing visuals of container div
 * @csspart `image-container` - for changing visuals of image wrapper div
 * @csspart `image-inner` - for changing visuals of inner image div
 * @csspart `content-container` - for changing visuals of content wrapper div
 * @csspart `content-inner` - for changing visuals of inner content div
 * @csspart `header-container` - for changing visuals of header wrapper div
 * @csspart `body-container` - for changing visuals of body wrapper div
 * @csspart `footer-container` - for changing visuals of footer wrapper div
 * @csspart `actions-container` - for changing visuals of action buttons wrapper div
 *
 */
export class McCard extends LitElement implements IMcCard {
  @state()
  private hasBodySlot = false;

  @queryAssignedNodes({ slot: '', flatten: true })
  private bodySlotNodes!: Array<HTMLElement>;

  @state()
  private hasActionsSlot = false;

  @queryAssignedNodes({ slot: 'actions', flatten: true })
  private actionsSlotNodes!: Array<HTMLElement>;

  @state()
  private hasImageSlot = false;

  @state()
  private hasFooterSlot = false;

  @queryAssignedNodes({ slot: 'footer', flatten: true })
  private footerSlotNodes!: Array<HTMLElement>;

  @queryAssignedNodes({ slot: 'image', flatten: true })
  private imageSlotNodes!: Array<HTMLElement>;

  @property({ type: String })
  public variant: CardVariant = 'bordered';

  @property({ type: String })
  public orientation: Orientation = 'vertical';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public heading?: string;

  @property({ type: String })
  public subheading?: string;

  @property({ type: String })
  public body?: string;

  @property({ type: String })
  public footer?: string;

  @property({ type: String })
  public contentalignment: ContentAlignment = 'top';

  @property({ type: String })
  public padding?: string;

  @property({ type: String })
  public image?: string;

  @property({ type: Number })
  public imagepercent?: number;

  @property({ type: String })
  public imagescalestrength: ImageScaleStrength = 'light';

  @property({ type: String })
  public imagebackgroundcolor?: string;

  @property({ type: String })
  public href?: string;

  @property({ type: String })
  public rel?: string;

  @property({ type: String })
  public target?: Target;

  @property({ type: Boolean })
  public clickable?: boolean;

  public static get styles(): CSSResultArray {
    return styles;
  }

  /**
   * Renders the component
   * @returns {TemplateResult}
   */
  public render(): TemplateResult {
    const templateClasses = {
      'mc-card': true,
      link: !!(this.href && this.href !== ''),
      clickable: !!this.clickable,
      [`${this.fit}`]: true,
      [`${this.variant}`]: true,
      [`${this.orientation}`]: true,
      [`content-${this.contentalignment}`]: true,
      'no-image': !this.hasImage(),
      [`image-scale-strength-${this.imagescalestrength}`]: true,
      'custom-padding': !!this.padding,
      'default-padding': !this.padding,
      'no-actions': !this.hasActionsSlot,
      [`${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}`]: true,
    };

    const style: { padding?: string } = {};
    if (this.padding) {
      style['padding'] = this.padding;
    }

    if (this.href && this.href !== '') {
      return html`<a
        part="container"
        href="${this.href}"
        rel="${ifDefined(this.rel === '' ? undefined : this.rel)}"
        target="${ifDefined(!this.target ? undefined : this.target)}"
        class="${classMap(templateClasses)}"
        style="${styleMap(style)}"
        >${this.renderImage()} ${this.renderContent()}</a
      >`;
    } else {
      return html`<div part="container" class="${classMap(templateClasses)}" style="${styleMap(style)}">
        ${this.renderImage()} ${this.renderContent()}
      </div>`;
    }
  }

  /**
   * Render the image
   * @returns {TemplateResult}
   */
  protected renderImage(): TemplateResult {
    return html`${this.renderImageAsSlot()}${this.renderImageAsBackground()}`;
  }

  private onImageSlotChange(): void {
    this.hasImageSlot = this.imageSlotNodes.length > 0;
  }

  private hasImage(): boolean {
    return !!(this.hasImageSlot || (this.image && this.image !== ''));
  }

  protected renderImageAsSlot(): TemplateResult {
    const classes = {
      hidden: !this.hasImageSlot,
    };
    const imageInnerStyle: { backgroundColor?: string } = {};
    if (this.imagebackgroundcolor) {
      imageInnerStyle['backgroundColor'] = this.imagebackgroundcolor;
    }
    return html`<div class="image-as-slot image${classMap(classes)}" part="image-container">
      <div class="image-inner-container">
        <div class="image-inner" part="image-inner" style="${styleMap(imageInnerStyle)}">
          <slot name="image" @slotchange=${this.onImageSlotChange}></slot>
        </div>
      </div>
    </div>`;
  }

  /**
   * Render the image as a CSS background
   * @returns {TemplateResult}
   */
  protected renderImageAsBackground(): TemplateResult {
    if (!(this.image && this.image !== '')) {
      return html``;
    }
    let imagepercent = this.imagepercent;
    if (!imagepercent) {
      if (this.orientation === 'vertical') {
        imagepercent = 56.25;
      } else {
        imagepercent = 33;
      }
    }
    const imageStyle: { width?: string } = {};
    const imageInnerStyle: { backgroundImage?: string; backgroundColor?: string; paddingTop?: string } = {
      backgroundImage: `url(${this.image})`,
    };
    if (this.imagebackgroundcolor) {
      imageInnerStyle['backgroundColor'] = this.imagebackgroundcolor;
    }
    if (this.orientation === 'vertical') {
      imageInnerStyle['paddingTop'] = `${imagepercent}%`;
    } else {
      imageStyle['width'] = `${imagepercent}%`;
    }
    return html`<div class="image-as-background image" style="${styleMap(imageStyle)}" part="image-container">
      <div class="image-inner-container">
        <div class="image-inner" part="image-inner" style="${styleMap(imageInnerStyle)}"></div>
      </div>
    </div>`;
  }

  /**
   * Render the content
   * @returns {TemplateResult}
   */
  protected renderContent(): TemplateResult {
    const hasBody = this.hasBody();
    const hasFooter = this.hasFooter();
    const classes = {
      hidden: !this.heading && !this.subheading && !hasFooter && !hasBody && !this.hasActionsSlot,
      'no-image': !this.hasImage(),
    };

    const style = {
      margin: !this.hasImage() && this.padding ? '0' : undefined,
    };

    return html`<div class="content ${classMap(classes)}" part="content-container" style="${styleMap(style)}">
      <div part="content-inner" class="content-inner">
        ${this.renderHeading()} ${this.renderBody(hasBody)} ${this.renderFooter(hasFooter)}
      </div>
      ${this.renderActions(this.hasActionsSlot)}
    </div>`;
  }

  /**
   * Render the heading
   * @returns {TemplateResult}
   */
  protected renderHeading(): TemplateResult {
    if (!this.heading && !this.subheading) {
      return html``;
    }
    return html`<div class="header" part="header-container">
      ${this.heading ? html`<h2 class="heading">${this.heading}</h2>` : ''}
      ${this.subheading ? html`<p class="sub-heading">${this.subheading}</p>` : ''}
    </div>`;
  }

  /**
   * Render the body
   * @returns {TemplateResult}
   */
  protected renderBody(hasBody: boolean): TemplateResult {
    const classes = {
      hidden: !hasBody,
    };
    return html`<div class="body ${classMap(classes)}" part="body-container">
      <slot @slotchange=${this.onBodySlotChange}>${this.body}</slot>
    </div>`;
  }

  private onBodySlotChange(): void {
    this.hasBodySlot = this.bodySlotNodes.length > 0;
  }

  private hasBody(): boolean {
    return !!(this.hasBodySlot || (this.body && this.body !== ''));
  }

  /**
   * Render the footer
   * @returns {TemplateResult}
   */
  protected renderFooter(hasFooter: boolean): TemplateResult {
    const classes = {
      footer: true,
      hidden: !hasFooter,
    };
    return html`<div class="${classMap(classes)}" part="footer-container">
      <slot name="footer" @slotchange=${this.onFooterSlotChange}>${this.footer}</slot>
    </div>`;
  }

  private onFooterSlotChange(): void {
    this.hasFooterSlot = this.footerSlotNodes.length > 0;
  }

  private hasFooter(): boolean {
    return !!(this.hasFooterSlot || (this.footer && this.footer !== ''));
  }

  /**
   * Render the "actions" bar
   * @returns {TemplateResult}
   */
  protected renderActions(hasActions: boolean): TemplateResult {
    const classes = {
      hidden: !!(!hasActions || (this.href && this.href !== '')),
    };

    if (this.href && this.href !== '' && hasActions) {
      console.warn('"actions" will not be rendered if a card has a "href"');
    }
    return html`<div class="actions ${classMap(classes)}" part="actions-container">
      <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
    </div>
  </div>`;
  }

  private onActionsSlotChange(): void {
    this.hasActionsSlot = this.actionsSlotNodes.length > 0;
  }
}
customElements.get('mc-card') || customElements.define('mc-card', McCard);
