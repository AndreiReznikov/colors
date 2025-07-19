import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'cart';

class Cart {
  init(options = {}) {
    this._findElements();
    this._addEventListeners(options);
  }

  _findElements() {
    this.closeButtonElement = document.querySelector(`.${BLOCK_CLASS}__close-button`);
    this.cartElement = document.querySelector(`.${BLOCK_CLASS}`);
    this.cartWrapperElement = document.querySelector(`.${BLOCK_CLASS}__wrapper`);
    this.scrimElement = document.querySelector(`.${BLOCK_CLASS}__scrim`);
    this.cartParentElement = this.cartElement.parentElement;
  }

  _handleCloseCart(onClose) {
    const classes = Array.from(this.cartParentElement.classList);
    const visibleClass = classes.find(className => className.includes(VISIBLE_MODIFIER));

    if (visibleClass) {
      this.cartParentElement.classList.remove(visibleClass);
    }

    onClose?.();
  }

  _clickOutsideCart(event, onClose) {
    const clickInside = this.cartWrapperElement.contains(event.target);

    if (!clickInside) {
      this._handleCloseCart(onClose);
    }
  }

  _addEventListeners(options) {
    this.closeButtonElement.addEventListener('click',
      () => this._handleCloseCart(options.toggleScroll),
    );
    this.scrimElement.addEventListener('click',
      (event) => this._clickOutsideCart(event, options.toggleScroll),
    );
  }

}

export default Cart;