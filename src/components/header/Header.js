import { store } from "~store";
import { ACTIVE_MODIFIER, VISIBLE_MODIFIER } from "~constants/constants";

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
    this.burgerButtonElement = document.querySelector(`.${BLOCK_CLASS}__burger-button`);
    this.mobileMenuWrapperElement = document.querySelector(`.${BLOCK_CLASS}__mobile-menu-wrapper`);
  }

  _transformBurger() {
    this.burgerButtonElement.classList.toggle(`${BLOCK_CLASS}__burger-button${ACTIVE_MODIFIER}`);
  }

  _handleOpenCart(onAction) {
    onAction?.();
    this.cartWrapperElement.classList.add(`${BLOCK_CLASS}__cart-wrapper${VISIBLE_MODIFIER}`);
    this._handleCloseMenu(onAction);
  }

  _handleToggleMenu(onAction) {
    onAction?.();
    this.mobileMenuWrapperElement.classList.toggle(`${BLOCK_CLASS}__mobile-menu-wrapper${VISIBLE_MODIFIER}`);
    this._transformBurger();
  }

  _handleCloseMenu(onAction) {
    const visibleClass = `${BLOCK_CLASS}__mobile-menu-wrapper${VISIBLE_MODIFIER}`;
    const isMenuOpened = this.mobileMenuWrapperElement.classList.contains(visibleClass);

    if (!isMenuOpened) return;

    onAction?.();
    this.mobileMenuWrapperElement.classList.remove(visibleClass);
    this._transformBurger();
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
    this.burgerButtonElement.addEventListener('click',
      () => this._handleToggleMenu(options.toggleScroll),
    );
  }
}

export default Header;