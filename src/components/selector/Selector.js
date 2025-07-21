import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'selector';

class Selector {
  constructor(element, options = {}) {
    this.rootElement = element;
    this.options = options;
    this._findElements();
    this._addEventListeners();
  }

  _findElements() {
    this.selectorButtonElement = this.rootElement.querySelector(`.${BLOCK_CLASS}__button`);
    this.selectorWrapperElement = this.rootElement.querySelector(`.${BLOCK_CLASS}__wrapper`);
    this.selectorListElement = this.rootElement.querySelector(`.${BLOCK_CLASS}__list`);
    this.selectorItemElementCollection = this.rootElement.querySelectorAll(`.${BLOCK_CLASS}__item`);
    this.scrimElement = this.rootElement.querySelector(`.${BLOCK_CLASS}__scrim`);
  }

  _handleOpenSelector() {
    this.selectorWrapperElement.classList.add(`${BLOCK_CLASS}__wrapper${VISIBLE_MODIFIER}`);
    this.options.onOpen?.();
  }

  _setSelectorText(text) {
    this.selectorButtonElement.textContent = text;
  }

  _handleItemClick(event) {
    const target = event.currentTarget;
    const { order, value } = target.dataset;

    this.options.onSelect?.({ order, value });
    this._setSelectorText(target.textContent);
    this._handleCloseSelector();
  }

  _handleCloseSelector() {
    const classes = Array.from(this.selectorWrapperElement.classList);
    const visibleClass = classes.find(className => className.includes(VISIBLE_MODIFIER));

    if (visibleClass) {
      this.selectorWrapperElement.classList.remove(visibleClass);
    }

    this.options.onClose?.();
  }

  _clickOutsideSelector(event) {
    const clickInside = this.selectorListElement.contains(event.target);

    if (!clickInside) {
      this._handleCloseSelector();
    }
  }

  _addEventListeners() {
    this.selectorButtonElement.addEventListener('click',
      () => this._handleOpenSelector()
    );

    this.selectorItemElementCollection.forEach((itemElement) => {
      itemElement.addEventListener('click',
        (event) => this._handleItemClick(event)
      );
    });

    this.scrimElement.addEventListener('click',
      (event) => this._clickOutsideSelector(event)
    );
  }
}

export default Selector;