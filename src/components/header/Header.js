import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'header';

class Header {
  init(options = {}) {
    this._findElements();
    this._addEventListeners(options);
  }

  _findElements() {
    this.cartButtonElement = document.querySelector(`.${BLOCK_CLASS}__cart-button`);
    this.cartElement = document.querySelector(`.${BLOCK_CLASS}__cart-wrapper`);
  }

  _handleOpenCart(onAction) {
    this.cartElement.classList.add(`${BLOCK_CLASS}__cart-wrapper${VISIBLE_MODIFIER}`);
    onAction?.();
  }

  _addEventListeners(options) {
    this.cartButtonElement.addEventListener('click',
      () => this._handleOpenCart(options.toggleScroll),
    )
  }
}

export default Header;