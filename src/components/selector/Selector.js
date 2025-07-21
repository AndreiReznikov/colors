import { store } from "~store";
import { setSortType } from "~reducers/sort";
import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'selector';

class Selector {
  init(options = {}) {
    this._findElements();
    this._addEventListeners(options);
  }

  _findElements() {
    this.selectorButtonElement = document.querySelector(`.${BLOCK_CLASS}__button`);
    this.selectorWrapperElement = document.querySelector(`.${BLOCK_CLASS}__wrapper`);
    this.selectorListElement = document.querySelector(`.${BLOCK_CLASS}__list`);
    this.selectorItemElementCollection = document.querySelectorAll(`.${BLOCK_CLASS}__item`);
    this.scrimElement = document.querySelector(`.${BLOCK_CLASS}__scrim`);
  }

  _setSortType({ value, order }) {
    store.dispatch(setSortType({
      sortBy: value,
      order,
    }));
  }

  _handleOpenSelector(onAction) {
    this.selectorWrapperElement.classList.add(`${BLOCK_CLASS}__wrapper${VISIBLE_MODIFIER}`);
    onAction?.();
  }

  _setSelectorText(text) {
    this.selectorButtonElement.textContent = text;
  }

  _handleItemClick(event, onClick) {
    onClick?.();

    const target = event.currentTarget;
    const { order, value } = target.dataset;

    this._setSortType({ value, order });
    this._setSelectorText(target.textContent);
    this._handleCloseSelector();
  }

  _handleCloseSelector(onClose) {
    const classes = Array.from(this.selectorWrapperElement.classList);
    const visibleClass = classes.find(className => className.includes(VISIBLE_MODIFIER));

    if (visibleClass) {
      this.selectorWrapperElement.classList.remove(visibleClass);
    }

    onClose?.();
  }

  _clickOutsideSelector(event, onClose) {
    const clickInside = this.selectorListElement.contains(event.target);

    if (!clickInside) {
      this._handleCloseSelector(onClose);
    }
  }

  _addEventListeners(options) {
    this.selectorButtonElement.addEventListener('click',
      () => this._handleOpenSelector(options.toggleScroll),
    );
    this.selectorItemElementCollection.forEach((itemElement) => {
      itemElement.addEventListener('click',
        (event) => this._handleItemClick(event, options.toggleScroll),
      );
    });
    this.scrimElement.addEventListener('click',
      (event) => this._clickOutsideSelector(event, options.toggleScroll),
    );
  }

}

export default Selector;