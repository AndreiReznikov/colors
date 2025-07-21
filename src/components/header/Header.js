import { store } from "~store";
import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'header';

class Header {
  init(options = {}) {
    this._findElements();
    this._addSubscribes()
    this._addEventListeners(options);
  }

  _findElements() {
    this.cartButtonElement = document.querySelector(`.${BLOCK_CLASS}__cart-button`);
    this.cartWrapperElement = document.querySelector(`.${BLOCK_CLASS}__cart-wrapper`);
  }

  _handleOpenCart(onAction) {
    this.cartWrapperElement.classList.add(`${BLOCK_CLASS}__cart-wrapper${VISIBLE_MODIFIER}`);
    onAction?.();
  }

  _addSubscribes() {
    store.subscribe("ADD_TO_CART", () => {
      this.cartButtonElement.innerText = store.getState().cart.length;
    });
    store.subscribe("REMOVE_FROM_CART", () => {
      this.cartButtonElement.innerText = store.getState().cart.length;
    });
    store.subscribe("CLEAR_CART", () => {
      this.cartButtonElement.innerText = store.getState().cart.length;
    });
  }

  _addEventListeners(options) {
    this.cartButtonElement.addEventListener('click',
      () => this._handleOpenCart(options.toggleScroll),
    );
  }
}

export default Header;