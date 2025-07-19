class Header {
  init(options = {}) {
    this._findElements();
    this._openCart(options.toggleScroll);
  }

  _findElements() {
    this.cartButton = document.querySelector('.header__cart-button');
    this.cart = document.querySelector('.header__cart-wrapper');
  }

  _openCart(toggleScroll) {
    this.cartButton.addEventListener('click',
      () => {
        this.cart.classList.add('header__cart-wrapper_visible');
        toggleScroll?.();
      },
    )
  }
}

export default Header;