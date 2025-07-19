import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'cart';

class Cart {
  init(options = {}) {
    this._findElements();
    this._closeCart(options.toggleScroll);
  }

  _findElements() {
    this.closeButton = document.querySelector(`.${BLOCK_CLASS}__close-button`);
    this.cart = document.querySelector(`.${BLOCK_CLASS}`);
    this.cartParentElement = this.cart.parentElement;
  }

  _closeCart(toggleScroll) {
    this.closeButton.addEventListener('click',
      () => {
        const classes = Array.from(this.cartParentElement.classList);
        const visibleClass = classes.find(className => className.includes(VISIBLE_MODIFIER));

        if (visibleClass) {
          this.cartParentElement.classList.remove(visibleClass);
        }

        toggleScroll?.();
      },
    )
  }
}

export default Cart;