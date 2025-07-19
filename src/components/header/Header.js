import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'header';

class Header {
  init(options = {}) {
    this._findElements();
    this._openCart(options.toggleScroll);
  }

  _findElements() {
    this.cartButton = document.querySelector(`.${BLOCK_CLASS}__cart-button`);
    this.cart = document.querySelector(`.${BLOCK_CLASS}__cart-wrapper`);
  }

  _openCart(toggleScroll) {
    this.cartButton.addEventListener('click',
      () => {
        this.cart.classList.add(`${BLOCK_CLASS}__cart-wrapper${VISIBLE_MODIFIER}`);
        toggleScroll?.();
      },
    )
  }
}

export default Header;