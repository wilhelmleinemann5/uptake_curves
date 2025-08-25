/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const SelectionController = 'SelectionController';

/**
 * Set of checkable elements with added metadata
 */
export class SingleSelectionSet {
  selected: CheckableElement | null = null;
  ordered: CheckableElement[] | null = null;
  readonly set = new Set<CheckableElement>();
}

/**
 * Element that is checkable consumed by
 * `SingleSelectionController` and `SingleSelectionSet`
 */
export type CheckableElement = HTMLElement & {
  name: string;
  checked: boolean;
  tabindex?: number;
};

/**
 * Controller that provides behavior similar to a native `<input type="radio">`
 * group.
 *
 * Behaviors:
 *
 * - Selection via key navigation (currently LTR is supported)
 * - Deselection of other grouped, checkable controls upon selection
 * - Grouping of checkable elements by name
 *   - Defaults grouping scope to host shadow root
 *   - Document-wide scoping enabled
 * - Land focus only on checked element. Focuses leading element when none
 *   checked.
 *
 * Intended Usage:
 *
 * ```ts
 * class MyElement extends HTMLElement {
 *   private selectionController: SingleSelectionController | null = null;
 *   name = "";
 *   global = false;
 *
 *   private _checked = false;
 *   set checked(checked: boolean) {
 *     const oldVal = this._checked;
 *     if (checked === oldVal) return;
 *
 *     this._checked = checked;
 *
 *     if (this.selectionController) {
 *       this.selectionController.update(this)
 *     }
 *   }
 *
 *   get checked() {
 *     return this._checked;
 *   }
 *
 *   connectedCallback() {
 *     this.selectionController = SelectionController.getController(this);
 *     this.selectionController.register(this);
 *     this.selectionController.update(this);
 *   }
 *
 *   disconnectedCallback() {
 *     this.selectionController!.unregister(this);
 *     this.selectionController = null;
 *   }
 * }
 * ```
 */
export class SingleSelectionController {
  private readonly sets: { [name: string]: SingleSelectionSet } = {};

  private focusedSet: SingleSelectionSet | null = null;

  private mouseIsDown = false;

  private updating = false;

  /**
   * Get a controller for the given element. If no controller exists, one will
   * be created. The controller is scoped to the element's root node.
   * @param element Element from which to get / create a SelectionController.
   */
  static getController(element: CheckableElement): SingleSelectionController | null {
    if (!element.name) return null;

    const root: any = element.getRootNode();
    const controllerName = `${element.name}${SelectionController}`;
    if (!root[controllerName]) {
      root[controllerName] = new SingleSelectionController(root);
    }
    return root[controllerName];
  }

  constructor(element: Node) {
    element.addEventListener('keydown', (e: Event) => {
      this.keyDownHandler(e as KeyboardEvent);
    });
    element.addEventListener('mousedown', () => {
      this.mousedownHandler();
    });
    element.addEventListener('mouseup', () => {
      this.mouseupHandler();
    });
  }

  protected keyDownHandler(e: KeyboardEvent): void {
    const element = e.target as EventTarget | CheckableElement;
    if (!('checked' in element)) {
      return;
    }
    if (!this.has(element)) {
      return;
    }
    if (e.key == 'ArrowRight' || e.key == 'ArrowDown') {
      this.selectNext(element);
    } else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
      this.selectPrevious(element);
    }
  }

  protected mousedownHandler(): void {
    this.mouseIsDown = true;
  }

  protected mouseupHandler(): void {
    this.mouseIsDown = false;
  }

  /**
   * Whether or not the controller controls  the given element.
   *
   * @param element element to check
   */
  has(element: CheckableElement): boolean {
    const set = this.getSet(element.name);
    return set.set.has(element);
  }

  /**
   * Selects and returns the controlled element previous to the given element in
   * document position order. See
   * [Node.compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition).
   *
   * @param element element relative from which preceding element is fetched
   */
  selectPrevious(element: CheckableElement): CheckableElement {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    const previous: CheckableElement = order[i - 1] || order[order.length - 1];
    this.select(previous);

    return previous;
  }

  /**
   * Selects and returns the controlled element next to the given element in
   * document position order. See
   * [Node.compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition).
   *
   * @param element element relative from which following element is fetched
   */
  selectNext(element: CheckableElement): CheckableElement {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    const next: CheckableElement = order[i + 1] || order[0];
    this.select(next);

    return next;
  }

  select(element: CheckableElement): void {
    element.click();
  }

  /**
   * Focuses the selected element in the given element's selection set. User's
   * mouse selection will override this focus.
   *
   * @param element Element from which selection set is derived and subsequently
   *     focused.
   * @deprecated update() method now handles focus management by setting
   *     appropriate tabindex to form element.
   */
  focus(element: CheckableElement): void {
    // Only manage focus state when using keyboard
    if (this.mouseIsDown) {
      return;
    }
    const set = this.getSet(element.name);
    const currentFocusedSet = this.focusedSet;
    this.focusedSet = set;
    if (currentFocusedSet != set && set.selected && set.selected != element) {
      set.selected.focus();
    }
  }

  /**
   * @return Returns true if atleast one radio is selected in the radio group.
   */
  isAnySelected(element: CheckableElement): boolean {
    const set = this.getSet(element.name);

    for (const e of set.set) {
      if (e.checked) {
        return true;
      }
    }

    return false;
  }

  /**
   * Returns the elements in the given element's selection set in document
   * position order.
   * [Node.compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition).
   *
   * @param element Element from which selection set is derived and subsequently
   *     ordered.
   */
  getOrdered(element: CheckableElement): CheckableElement[] {
    const set = this.getSet(element.name);
    if (!set.ordered) {
      set.ordered = Array.from(set.set);
      set.ordered.sort((a, b) => (a.compareDocumentPosition(b) == Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0));
    }
    return set.ordered;
  }

  /**
   * Gets the selection set of the given name and creates one if it does not yet
   * exist.
   *
   * @param name Name of set
   */
  getSet(name: string): SingleSelectionSet {
    if (!this.sets[name]) {
      this.sets[name] = new SingleSelectionSet();
    }
    return this.sets[name];
  }

  /**
   * Register the element in the selection controller.
   *
   * @param element Element to register. Registers in set of `element.name`.
   */
  register(element: CheckableElement): void {
    const name = element.name;
    if (!name) return;

    const set = this.getSet(name);
    set.set.add(element);
    set.ordered = null;
  }

  /**
   * Unregister the element from selection controller.
   *
   * @param element Element to register. Registers in set of `element.name`.
   */
  unregister(element: CheckableElement): void {
    if (!element.name) return;
    const set = this.getSet(element.name);
    set.set.delete(element);
    set.ordered = null;
    if (set.selected == element) {
      set.selected = null;
    }
  }

  /**
   * Unselects other elements in element's set if element is checked. Noop
   * otherwise.
   *
   * @param element Element from which to calculate selection controller update.
   */
  update(element: CheckableElement): void {
    if (this.updating || !element.name) {
      return;
    }
    this.updating = true;
    const set = this.getSet(element.name);
    if (element.checked) {
      for (const e of set.set) {
        if (e == element) {
          continue;
        }
        e.checked = false;
      }
      set.selected = element;
    }

    // When tabbing through land focus on the checked radio in the group.
    if (this.isAnySelected(element)) {
      for (const e of set.set) {
        if (e.tabindex === undefined) {
          break;
        }

        e.tabindex = e.checked ? 0 : -1;
      }
    }
    this.updating = false;
  }
}
