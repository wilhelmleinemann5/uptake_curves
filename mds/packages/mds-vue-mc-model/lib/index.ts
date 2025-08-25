/* eslint-disable */
const eventHandlers: WeakMap<HTMLElement, [string, (event: Event) => void]> = new WeakMap<
  HTMLElement,
  [string, (event: Event) => void]
>();

const updatePropertyValueInViewModel = (nestedObj: any, pathArr: Array<any>, value?: string): void => {
  pathArr.reduce(
    (obj, key, index) =>
      obj && obj[key] !== 'undefined' ? (index === pathArr.length - 1 ? (obj[key] = value) : obj[key]) : undefined,
    nestedObj
  );
};
const findAttributeNameHoldingElementValue = (tag: string): string => {
  switch (tag) {
    case 'mc-checkbox':
    case 'mc-switch': {
      return 'checked';
    }
    case 'mc-c-tag-multiselect': {
      return 'tags';
    }
    default: {
      return 'value';
    }
  }
};

const eventHandler = (event: Event, viewModel: any, attributeNameHoldingValue: string, propertyName: string): void => {
  //@ts-expect-error
  const currentValue = event.target[attributeNameHoldingValue];
  updatePropertyValueInViewModel(viewModel, propertyName.split('.'), currentValue);
};

const addEventHandler = (
  tag: string,
  el: HTMLElement,
  viewModel: any,
  attributeNameHoldingValue: string,
  propertyName: string
): void => {
  const callEventHandlerWithArgs = (event: Event): void =>
    eventHandler(event, viewModel, attributeNameHoldingValue, propertyName);
  let eventName = 'input';

  if (
    tag === 'mc-select-native' ||
    tag === 'mc-checkbox' ||
    tag === 'mc-switch' ||
    tag === 'mc-radio' ||
    tag === 'mc-c-tag-multiselect'
  ) {
    eventName = 'change';
  }

  eventHandlers.set(el, [eventName, callEventHandlerWithArgs]);
  el.addEventListener(eventName, callEventHandlerWithArgs);
};

export default {
  bind(el: any, binding: any, vnode: any): void {
    const viewModel = vnode.context;
    const propertyName = binding.expression;
    const tag = vnode.tag;
    const attributeNameHoldingValue = findAttributeNameHoldingElementValue(tag);
    el[attributeNameHoldingValue] = binding.value;
    addEventHandler(tag, el, viewModel, attributeNameHoldingValue, propertyName);
  },
  update(el: HTMLElement, binding: any, vnode: any): void {
    if (binding.value !== binding.oldValue) {
      const attributeNameHoldingValue = findAttributeNameHoldingElementValue(vnode.tag);
      //@ts-expect-error
      el[attributeNameHoldingValue] = binding.value;
    }
  },
  unbind(el: HTMLElement): void {
    //@ts-expect-error
    const [eventName, eventHandler] = eventHandlers.get(el);
    el.removeEventListener(eventName, eventHandler);
  },
};