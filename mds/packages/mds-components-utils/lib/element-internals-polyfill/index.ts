// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const attachElementInternalsPolyfill = (): void => {
  const refMap = new WeakMap();
  const validityMap = new WeakMap();
  const hiddenInputMap = new WeakMap();
  const internalsMap = new WeakMap();
  const validationMessageMap = new WeakMap();
  const formsMap = new WeakMap();
  const shadowHostsMap = new WeakMap();
  const formElementsMap = new WeakMap();
  const refValueMap = new WeakMap();
  const upgradeMap = new WeakMap();
  const shadowRootMap = new WeakMap();
  const validationAnchorMap = new WeakMap();
  const documentFragmentMap = new WeakMap();
  const connectedCallbackMap = new WeakMap();
  const validityUpgradeMap = new WeakMap();

  const aom = {
    ariaAtomic: 'aria-atomic',
    ariaAutoComplete: 'aria-autocomplete',
    ariaBusy: 'aria-busy',
    ariaChecked: 'aria-checked',
    ariaColCount: 'aria-colcount',
    ariaColIndex: 'aria-colindex',
    ariaColIndexText: 'aria-colindextext',
    ariaColSpan: 'aria-colspan',
    ariaCurrent: 'aria-current',
    ariaDisabled: 'aria-disabled',
    ariaExpanded: 'aria-expanded',
    ariaHasPopup: 'aria-haspopup',
    ariaHidden: 'aria-hidden',
    ariaInvalid: 'aria-invalid',
    ariaKeyShortcuts: 'aria-keyshortcuts',
    ariaLabel: 'aria-label',
    ariaLevel: 'aria-level',
    ariaLive: 'aria-live',
    ariaModal: 'aria-modal',
    ariaMultiLine: 'aria-multiline',
    ariaMultiSelectable: 'aria-multiselectable',
    ariaOrientation: 'aria-orientation',
    ariaPlaceholder: 'aria-placeholder',
    ariaPosInSet: 'aria-posinset',
    ariaPressed: 'aria-pressed',
    ariaReadOnly: 'aria-readonly',
    ariaRelevant: 'aria-relevant',
    ariaRequired: 'aria-required',
    ariaRoleDescription: 'aria-roledescription',
    ariaRowCount: 'aria-rowcount',
    ariaRowIndex: 'aria-rowindex',
    ariaRowIndexText: 'aria-rowindextext',
    ariaRowSpan: 'aria-rowspan',
    ariaSelected: 'aria-selected',
    ariaSetSize: 'aria-setsize',
    ariaSort: 'aria-sort',
    ariaValueMax: 'aria-valuemax',
    ariaValueMin: 'aria-valuemin',
    ariaValueNow: 'aria-valuenow',
    ariaValueText: 'aria-valuetext',
    role: 'role',
  };
  const initAom = (ref, internals): void => {
    for (const key in aom) {
      internals[key] = null;
      let closureValue = null;
      const attributeName = aom[key];
      Object.defineProperty(internals, key, {
        get() {
          return closureValue;
        },
        set(value) {
          closureValue = value;
          if (ref.isConnected) {
            ref.setAttribute(attributeName, value);
          } else {
            upgradeMap.set(ref, internals);
          }
        },
      });
    }
  };

  const formResetCallback = (event): void => {
    const elements = formElementsMap.get(event.target);
    if (elements && elements.size) {
      elements.forEach((element) => {
        if (element.constructor.formAssociated && element.formResetCallback) {
          element.formResetCallback.apply(element);
        }
      });
    }
  };

  const setFormValidity = (form): void => {
    const nativeControlValidity = Array.from(form.elements)
      .filter((element) => !element.tagName.includes('-') && element.validity)
      .map((element) => element.validity.valid);
    const polyfilledElements = formElementsMap.get(form) || [];
    const polyfilledValidity = Array.from(polyfilledElements)
      .filter((control) => control.isConnected)
      .map((control) => internalsMap.get(control).validity.valid);
    const hasInvalid = [...nativeControlValidity, ...polyfilledValidity].includes(false);
    form.toggleAttribute('internals-invalid', hasInvalid);
    form.toggleAttribute('internals-valid', !hasInvalid);
  };
  const findParentForm = (elem): any => {
    let parent = elem.parentNode;
    if (parent && parent.tagName !== 'FORM') {
      parent = findParentForm(parent);
    }
    return parent;
  };
  const formChangeCallback = (event): void => {
    setFormValidity(findParentForm(event.target));
  };
  const formInputCallback = (event): void => {
    setFormValidity(findParentForm(event.target));
  };
  const wireSubmitLogic = (form): any => {
    const SUBMIT_BUTTON_SELECTOR = ':is(button[type=submit], input[type=submit], button:not([type])):not([disabled])';
    let submitButtonSelector = `${SUBMIT_BUTTON_SELECTOR}:not([form])`;
    if (form.id) {
      submitButtonSelector += `,${SUBMIT_BUTTON_SELECTOR}[form='${form.id}']`;
    }
    form.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest(submitButtonSelector)) {
        const elements = formElementsMap.get(form);
        if (form.noValidate) {
          return;
        }
        if (elements.size) {
          const nodes = Array.from(elements);
          const validityList = nodes.reverse().map((node) => {
            const internals = internalsMap.get(node);
            return internals.reportValidity();
          });
          if (validityList.includes(false)) {
            event.preventDefault();
          }
        }
      }
    });
  };
  const initForm = (ref, form, internals): void => {
    if (form) {
      const formElements = formElementsMap.get(form);
      if (formElements) {
        formElements.add(ref);
      } else {
        const initSet = new Set();
        initSet.add(ref);
        formElementsMap.set(form, initSet);
        wireSubmitLogic(form);
        form.addEventListener('reset', formResetCallback);
        form.addEventListener('input', formInputCallback);
        form.addEventListener('change', formChangeCallback);
      }
      formsMap.set(form, { ref, internals });
      if (ref.constructor['formAssociated'] && ref.formAssociatedCallback) {
        setTimeout(() => {
          ref.formAssociatedCallback.apply(ref, [form]);
        }, 0);
      }
      setFormValidity(form);
    }
  };
  const setDisabled = (ref, disabled): void => {
    ref.toggleAttribute('internals-disabled', disabled);
    if (disabled) {
      ref.setAttribute('aria-disabled', 'true');
    } else {
      ref.removeAttribute('aria-disabled');
    }
    if (ref.formDisabledCallback) {
      ref.formDisabledCallback.apply(ref, [disabled]);
    }
  };
  const initLabels = (ref, labels): void => {
    if (labels.length) {
      Array.from(labels).forEach((label) => label.addEventListener('click', ref.click.bind(ref)));
      let firstLabelId = labels[0].id;
      if (!labels[0].id) {
        firstLabelId = `${labels[0].htmlFor}_Label`;
        labels[0].id = firstLabelId;
      }
      ref.setAttribute('aria-labelledby', firstLabelId);
    }
  };
  function initNode(node): void {
    const internals = internalsMap.get(node);
    const { form } = internals;
    initForm(node, form, internals);
    initLabels(node, internals.labels);
  }
  const walkFieldset = (node, firstRender = false): any => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        return internalsMap.has(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    let current = walker.nextNode();
    const isCallNecessary = !firstRender || node.disabled;
    while (current) {
      if (current.formDisabledCallback && isCallNecessary) {
        setDisabled(current, node.disabled);
      }
      current = walker.nextNode();
    }
  };
  function mutationObserverExists(): boolean {
    return typeof MutationObserver !== 'undefined';
  }
  const removeHiddenInputs = (internals): void => {
    const hiddenInputs = hiddenInputMap.get(internals);
    hiddenInputs.forEach((hiddenInput) => {
      hiddenInput.remove();
    });
    hiddenInputMap.set(internals, []);
  };
  const disabledOrNameObserverConfig = { attributes: true, attributeFilter: ['disabled', 'name'] };
  const disabledOrNameObserver = mutationObserverExists()
    ? new MutationObserver((mutationsList): void => {
        for (const mutation of mutationsList) {
          const target = mutation.target;
          if (mutation.attributeName === 'disabled') {
            if (target.constructor['formAssociated']) {
              setDisabled(target, target.hasAttribute('disabled'));
            } else if (target.localName === 'fieldset') {
              walkFieldset(target);
            }
          }
          if (mutation.attributeName === 'name') {
            if (target.constructor['formAssociated']) {
              const internals = internalsMap.get(target);
              const value = refValueMap.get(target);
              internals.setFormValue(value);
            }
          }
        }
      })
    : {};
  function observerCallback(mutationList): void {
    mutationList.forEach((mutationRecord) => {
      const { addedNodes, removedNodes } = mutationRecord;
      const added = Array.from(addedNodes);
      const removed = Array.from(removedNodes);
      added.forEach((node) => {
        if (internalsMap.has(node) && node.constructor['formAssociated']) {
          initNode(node);
        }
        if (upgradeMap.has(node)) {
          const internals = upgradeMap.get(node);
          const aomKeys = Object.keys(aom);
          aomKeys
            .filter((key) => internals[key] !== null)
            .forEach((key) => {
              node.setAttribute(aom[key], internals[key]);
            });
          upgradeMap.delete(node);
        }
        if (validityUpgradeMap.has(node)) {
          const internals = validityUpgradeMap.get(node);
          node.setAttribute('internals-valid', internals.validity.valid.toString());
          node.setAttribute('internals-invalid', (!internals.validity.valid).toString());
          node.setAttribute('aria-invalid', (!internals.validity.valid).toString());
          validityUpgradeMap.delete(node);
        }
        if (node.localName === 'form') {
          const formElements = formElementsMap.get(node);
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, {
            acceptNode(node) {
              return internalsMap.has(node) && !(formElements && formElements.has(node))
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP;
            },
          });
          let current = walker.nextNode();
          while (current) {
            initNode(current);
            current = walker.nextNode();
          }
        }
        if (node.localName === 'fieldset') {
          disabledOrNameObserver.observe?.(node, disabledOrNameObserverConfig);
          walkFieldset(node, true);
        }
      });
      removed.forEach((node): void => {
        const internals = internalsMap.get(node);
        if (internals && hiddenInputMap.get(internals)) {
          removeHiddenInputs(internals);
        }
        if (shadowHostsMap.has(node)) {
          const observer = shadowHostsMap.get(node);
          observer.disconnect();
        }
      });
    });
  }
  const upgradeInternals = (ref): void => {
    if (ref.constructor['formAssociated']) {
      const internals = internalsMap.get(ref);
      const { labels, form } = internals;
      initLabels(ref, labels);
      initForm(ref, form, internals);
    }
  };
  function fragmentObserverCallback(mutationList): void {
    mutationList.forEach((mutation) => {
      const { removedNodes } = mutation;
      removedNodes.forEach((node) => {
        const observer = documentFragmentMap.get(mutation.target);
        if (internalsMap.has(node)) {
          upgradeInternals(node);
        }
        observer.disconnect();
      });
    });
  }
  const deferUpgrade = (fragment): void => {
    const observer = new MutationObserver(fragmentObserverCallback);
    observer.observe?.(fragment, { childList: true });
    documentFragmentMap.set(fragment, observer);
  };
  if (mutationObserverExists()) {
    new MutationObserver(observerCallback);
  }

  const observerConfig = {
    childList: true,
    subtree: true,
  };

  const createHiddenInput = (ref, internals): void => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = ref.getAttribute('name');
    ref.after(input);
    hiddenInputMap.get(internals).push(input);
    return input;
  };
  const initRef = (ref, internals): void => {
    hiddenInputMap.set(internals, []);
    disabledOrNameObserver.observe?.(ref, disabledOrNameObserverConfig);
  };

  const throwIfNotFormAssociated = (ref, message, ErrorType = DOMException): void => {
    if (!ref.constructor['formAssociated']) {
      throw new ErrorType(message);
    }
  };
  const overrideFormMethod = (form, returnValue, method): any => {
    const elements = formElementsMap.get(form);
    if (elements && elements.size) {
      elements.forEach((element) => {
        const internals = internalsMap.get(element);
        const valid = internals[method]();
        if (!valid) {
          returnValue = false;
        }
      });
    }
    return returnValue;
  };

  class ValidityState {
    constructor() {
      this.badInput = false;
      this.customError = false;
      this.patternMismatch = false;
      this.rangeOverflow = false;
      this.rangeUnderflow = false;
      this.stepMismatch = false;
      this.tooLong = false;
      this.tooShort = false;
      this.typeMismatch = false;
      this.valid = true;
      this.valueMissing = false;
      Object.seal(this);
    }
  }
  const setValid = (validityObject): any => {
    validityObject.badInput = false;
    validityObject.customError = false;
    validityObject.patternMismatch = false;
    validityObject.rangeOverflow = false;
    validityObject.rangeUnderflow = false;
    validityObject.stepMismatch = false;
    validityObject.tooLong = false;
    validityObject.tooShort = false;
    validityObject.typeMismatch = false;
    validityObject.valid = true;
    validityObject.valueMissing = false;
    return validityObject;
  };
  const isValid = (validityState): boolean => {
    let valid = true;
    for (const key in validityState) {
      if (key !== 'valid' && validityState[key] !== false) {
        valid = false;
      }
    }
    return valid;
  };
  const reconcileValidity = (validityObject, newState, form): any => {
    validityObject.valid = isValid(newState);
    Object.keys(newState).forEach((key) => (validityObject[key] = newState[key]));
    if (form) {
      setFormValidity(form);
    }
    return validityObject;
  };

  const customStateMap = new WeakMap();
  function addState(ref, stateName): void {
    ref.toggleAttribute(stateName, true);
    if (ref.part) {
      ref.part.add(stateName);
    }
  }
  class CustomStateSet extends Set {
    static get isPolyfilled(): boolean {
      return true;
    }
    constructor(ref) {
      super();
      if (!ref || !ref.tagName || ref.tagName.indexOf('-') === -1) {
        throw new TypeError('Illegal constructor');
      }
      customStateMap.set(this, ref);
    }
    add(state): any {
      if (!/^--/.test(state) || typeof state !== 'string') {
        throw new DOMException(
          `Failed to execute 'add' on 'CustomStateSet': The specified value ${state} must start with '--'.`,
        );
      }
      const result = super.add(state);
      const ref = customStateMap.get(this);
      const stateName = `state${state}`;
      if (ref.isConnected) {
        addState(ref, stateName);
      } else {
        setTimeout(() => {
          addState(ref, stateName);
        });
      }
      return result;
    }
    clear(): void {
      for (const [entry] of this.entries()) {
        this.delete(entry);
      }
      super.clear();
    }
    delete(state): any {
      const result = super.delete(state);
      const ref = customStateMap.get(this);
      if (ref.isConnected) {
        ref.toggleAttribute(`state${state}`, false);
        if (ref.part) {
          ref.part.remove(`state${state}`);
        }
      } else {
        setTimeout(() => {
          ref.toggleAttribute(`state${state}`, false);
          if (ref.part) {
            ref.part.remove(`state${state}`);
          }
        });
      }
      return result;
    }
  }

  function __classPrivateFieldGet(receiver, state, kind, f): any {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot read private member from an object whose class did not declare it');
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f): any {
    if (kind === 'm') throw new TypeError('Private method is not writable');
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot write private member to an object whose class did not declare it');
    return (kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value);
  }

  let _HTMLFormControlsCollection_elements;
  class HTMLFormControlsCollection {
    constructor(elements) {
      _HTMLFormControlsCollection_elements.set(this, void 0);
      __classPrivateFieldSet(this, _HTMLFormControlsCollection_elements, elements, 'f');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        this[i] = element;
        if (element.hasAttribute('name')) {
          this[element.getAttribute('name')] = element;
        }
      }
      Object.freeze(this);
    }
    get length(): any {
      return __classPrivateFieldGet(this, _HTMLFormControlsCollection_elements, 'f').length;
    }
    [((_HTMLFormControlsCollection_elements = new WeakMap()), Symbol.iterator)](): any {
      return __classPrivateFieldGet(this, _HTMLFormControlsCollection_elements, 'f')[Symbol.iterator]();
    }
    item(i): any {
      return this[i] == null ? null : this[i];
    }
    namedItem(name): any {
      return this[name] == null ? null : this[name];
    }
  }

  function patchFormPrototype(): any {
    const checkValidity = HTMLFormElement.prototype.checkValidity;
    const reportValidity = HTMLFormElement.prototype.reportValidity;

    function checkValidityOverride(...args): any {
      const returnValue = checkValidity.apply(this, args);
      return overrideFormMethod(this, returnValue, 'checkValidity');
    }

    function reportValidityOverride(...args): any {
      const returnValue = reportValidity.apply(this, args);
      return overrideFormMethod(this, returnValue, 'reportValidity');
    }

    HTMLFormElement.prototype.checkValidity = checkValidityOverride;

    HTMLFormElement.prototype.reportValidity = reportValidityOverride;

    const { get } = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'elements');
    Object.defineProperty(HTMLFormElement.prototype, 'elements', {
      get(...args) {
        const elements = get.call(this, ...args);
        const polyfilledElements = Array.from(formElementsMap.get(this) || []);
        if (polyfilledElements.length === 0) {
          return elements;
        }
        const orderedElements = Array.from(elements)
          .concat(polyfilledElements)
          .sort((a, b) => {
            if (a.compareDocumentPosition) {
              return a.compareDocumentPosition(b) & 2 ? 1 : -1;
            }
            return 0;
          });
        return new HTMLFormControlsCollection(orderedElements);
      },
    });
  }

  class ElementInternals {
    static get isPolyfilled(): boolean {
      return true;
    }
    constructor(ref) {
      if (!ref || !ref.tagName || ref.tagName.indexOf('-') === -1) {
        throw new TypeError('Illegal constructor');
      }
      const rootNode = ref.getRootNode();
      const validity = new ValidityState();
      this.states = new CustomStateSet(ref);
      refMap.set(this, ref);
      validityMap.set(this, validity);
      internalsMap.set(ref, this);
      initAom(ref, this);
      initRef(ref, this);
      Object.seal(this);
      if (rootNode instanceof DocumentFragment) {
        deferUpgrade(rootNode);
      }
    }
    checkValidity(): boolean {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      if (!this.willValidate) {
        return true;
      }
      const validity = validityMap.get(this);
      if (!validity.valid) {
        const validityEvent = new Event('invalid', {
          bubbles: false,
          cancelable: true,
          composed: false,
        });
        ref.dispatchEvent(validityEvent);
      }
      return validity.valid;
    }
    get form(): any {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      let form;
      if (ref.constructor['formAssociated'] === true) {
        form = findParentForm(ref);
      }
      return form;
    }
    get labels(): any {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      const id = ref.getAttribute('id');
      const hostRoot = ref.getRootNode();
      if (hostRoot && id) {
        return hostRoot.querySelectorAll(`[for="${id}"]`);
      }
      return [];
    }
    reportValidity(): boolean {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      if (!this.willValidate) {
        return true;
      }
      const valid = this.checkValidity();
      const anchor = validationAnchorMap.get(this);
      if (anchor && !ref.constructor['formAssociated']) {
        throw new DOMException(
          `Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.`,
        );
      }
      if (!valid && anchor) {
        ref.focus();
        anchor.focus();
      }
      return valid;
    }
    setFormValue(value): void {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      removeHiddenInputs(this);
      if (value != null && !(value instanceof FormData)) {
        if (ref.getAttribute('name')) {
          const hiddenInput = createHiddenInput(ref, this);
          hiddenInput.value = value;
        }
      } else if (value != null && value instanceof FormData) {
        Array.from(value)
          .reverse()
          .forEach(([formDataKey, formDataValue]) => {
            if (typeof formDataValue === 'string') {
              const hiddenInput = createHiddenInput(ref, this);
              hiddenInput.name = formDataKey;
              hiddenInput.value = formDataValue;
            }
          });
      }
      refValueMap.set(ref, value);
    }
    setValidity(validityChanges, validationMessage, anchor): void {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      if (!validityChanges) {
        throw new TypeError(
          "Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.",
        );
      }
      validationAnchorMap.set(this, anchor);
      const validity = validityMap.get(this);
      const validityChangesObj = {};
      for (const key in validityChanges) {
        validityChangesObj[key] = validityChanges[key];
      }
      if (Object.keys(validityChangesObj).length === 0) {
        setValid(validity);
      }
      const check = { ...validity, ...validityChangesObj };
      delete check.valid;
      const { valid } = reconcileValidity(validity, check, this.form);
      if (!valid && !validationMessage) {
        throw new DOMException(
          `Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.`,
        );
      }
      validationMessageMap.set(this, valid ? '' : validationMessage);
      if (ref.isConnected) {
        ref.toggleAttribute('internals-invalid', !valid);
        ref.toggleAttribute('internals-valid', valid);
        ref.setAttribute('aria-invalid', `${!valid}`);
      } else {
        validityUpgradeMap.set(ref, this);
      }
    }
    get shadowRoot(): ShadowRoot | null {
      const ref = refMap.get(this);
      const shadowRoot = shadowRootMap.get(ref);
      if (shadowRoot) {
        return shadowRoot;
      }
      return null;
    }
    get validationMessage(): string {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      return validationMessageMap.get(this);
    }
    get validity(): any {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      const validity = validityMap.get(this);
      return validity;
    }
    get willValidate(): boolean {
      const ref = refMap.get(this);
      throwIfNotFormAssociated(
        ref,
        `Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element.`,
      );
      if (ref.disabled || ref.hasAttribute('disabled') || ref.hasAttribute('readonly')) {
        return false;
      }
      return true;
    }
  }

  let attachShadow;
  function attachShadowObserver(...args): ShadowRoot {
    const shadowRoot = attachShadow.apply(this, args);
    shadowRootMap.set(this, shadowRoot);

    if (mutationObserverExists()) {
      const observer = new MutationObserver(observerCallback);
      if (window.ShadyDOM) {
        observer.observe(this, observerConfig);
      } else {
        observer.observe(shadowRoot, observerConfig);
      }
      shadowHostsMap.set(this, observer);
    }
    return shadowRoot;
  }

  function isElementInternalsSupported(): boolean {
    if (typeof window === 'undefined' || !window.ElementInternals || !HTMLElement.prototype.attachInternals) {
      return false;
    }
    class ElementInternalsFeatureDetection extends HTMLElement {
      constructor() {
        super();
        this.internals = this.attachInternals();
      }
    }
    const randomName = `element-internals-feature-detection-${Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')}`;
    customElements.define(randomName, ElementInternalsFeatureDetection);
    const featureDetectionElement = new ElementInternalsFeatureDetection();
    return [
      'shadowRoot',
      'form',
      'willValidate',
      'validity',
      'validationMessage',
      'labels',
      'setFormValue',
      'setValidity',
      'checkValidity',
      'reportValidity',
    ].every((prop) => prop in featureDetectionElement.internals);
  }

  if (!isElementInternalsSupported()) {
    if (typeof window !== 'undefined') {
      window.ElementInternals = ElementInternals;
    }
    if (typeof CustomElementRegistry !== 'undefined') {
      const define = CustomElementRegistry.prototype.define;
      CustomElementRegistry.prototype.define = function (name, constructor, options): void {
        if (constructor.formAssociated) {
          const connectedCallback = constructor.prototype.connectedCallback;
          constructor.prototype.connectedCallback = function (): void {
            if (!connectedCallbackMap.has(this)) {
              connectedCallbackMap.set(this, true);
              if (this.hasAttribute('disabled')) {
                setDisabled(this, true);
              }
            }
            if (connectedCallback != null) {
              connectedCallback.apply(this);
            }
            upgradeInternals(this);
          };
        }
        define.call(this, name, constructor, options);
      };
    }
    if (typeof HTMLElement !== 'undefined') {
      HTMLElement.prototype.attachInternals = function (): any {
        if (!this.tagName) {
          return {};
        } else if (this.tagName.indexOf('-') === -1) {
          throw new Error(
            `Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.`,
          );
        }
        if (internalsMap.has(this)) {
          throw new DOMException(
            `DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.`,
          );
        }
        return new ElementInternals(this);
      };
    }
    if (typeof Element !== 'undefined') {
      attachShadow = Element.prototype.attachShadow;
      Element.prototype.attachShadow = attachShadowObserver;
    }
    if (mutationObserverExists()) {
      const documentObserver = new MutationObserver(observerCallback);
      documentObserver.observe(document.documentElement, observerConfig);
    }
    if (typeof HTMLFormElement !== 'undefined') {
      patchFormPrototype();
    }
    if (typeof window !== 'undefined' && !window.CustomStateSet) {
      window.CustomStateSet = CustomStateSet;
    }
  } else if (typeof window !== 'undefined' && !window.CustomStateSet) {
    window.CustomStateSet = CustomStateSet;
    const attachInternals = HTMLElement.prototype.attachInternals;
    HTMLElement.prototype.attachInternals = function (...args): any {
      const internals = attachInternals.call(this, args);
      internals.states = new CustomStateSet(this);
      return internals;
    };
  }
};
