class Cart {
  init(options = {}) {
    this._findElements();
    this._closeCart(options.toggleScroll);
  }

  _findElements() {
    this.closeButton = document.querySelector('.cart__close-button');
    this.cart = document.querySelector('.cart');
    this.cartParentElement = this.cart.parentElement;
  }

  _closeCart(toggleScroll) {
    this.closeButton.addEventListener('click',
      () => {
        const classes = Array.from(this.cartParentElement.classList);
        const visibleClass = classes.find(className => className.includes('_visible'));

        if (visibleClass) {
          this.cartParentElement.classList.remove(visibleClass);
        }

        toggleScroll?.();
      },
    )
  }
}

export default Cart;