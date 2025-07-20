import { VISIBLE_MODIFIER } from "~constants/constants";
import { decrementCartItem, incrementCartItem, removeFromCart } from "~reducers/cart";
import { store } from "~store";

const BLOCK_CLASS = 'cart';

class Cart {
  init(options = {}) {
    this._findElements();
    this._addEventListeners(options);
    this._renderCartItem();
  }

  _findElements() {
    this.closeButtonElement = document.querySelector(`.${BLOCK_CLASS}__close-button`);
    this.cartElement = document.querySelector(`.${BLOCK_CLASS}`);
    this.cartWrapperElement = document.querySelector(`.${BLOCK_CLASS}__wrapper`);
    this.cartItemsListElement = document.querySelector(`.${BLOCK_CLASS}__items-list`);
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

  _renderCartItem() {
    let itemsText = '';

    const cart = store.getState().cart;

    cart.forEach((item) => {
      itemsText += `
        <div class="cart-item" data-element="cartItem" data-id="${item.id}">
          <div class="cart-item__wrapper">
            <div class="cart-item__image-wrapper">
              <img class="cart-item__image" src="${item.img}" alt="${item.altText || ''}">
            </div>
            <div class="cart-item__info-wrapper">
              <h3 class="cart-item__title">${item.title}</h3>
              <div class="cart-item__price-wrapper">
                <span class="cart-item__price" data-element="price">
                  ${item.totalPrice}
                </span>
                <span class="cart-item__currency"> ${item.currency}</span>
              </div>
            </div>
            <div class="cart-item__counter-wrapper" data-product-id=${item.id}>
              <button class="cart-item__decrement" data-element="decrement">-</button>
              <span class="cart-item__counter" data-element="counter">${item.count}</span>
              <button class="cart-item__increment" data-element="increment">
                +
              </button>
            </div>
            <div class="cart-item__actions-wrapper">
              <button
                class="cart-item__delete-button"
                data-element="delete"
                aria-label="Удалить продукт ${item.title} из корзины"
              ></button>
              <button
                class="cart-item__repeat-button"
                data-element="repeat"
                aria-label="Вернуть продукт ${item.title} в корзину"
              ></button>
            </div>
          </div>
        </div>
      `;
    });

    this.cartItemsListElement.innerHTML = itemsText;
    this._setCartItemEvents();
  }

  _setCartItemEvents() {
    this.cartItemsListElement
      .querySelectorAll('[data-element="cartItem"]').forEach((cartItemElement) => {
        const counterElement = cartItemElement.querySelector('[data-element="counter"]');
        const deleteElement = cartItemElement.querySelector('[data-element="delete"]');
        const repeatElement = cartItemElement.querySelector('[data-element="repeat"]');
        const priceElement = cartItemElement.querySelector('[data-element="price"]');
        const id = Number(cartItemElement.dataset.id);
        const cartItem = store.getState().cart.find(
          (item) => item.id === id,
        );
        let timerId;

        cartItemElement.addEventListener('click', (event) => {
          const currentCount = Number(counterElement.innerHTML);

          if (event.target.dataset.element === 'increment') {
            counterElement.innerHTML = currentCount + 1;
            store.dispatch(incrementCartItem({ id }));

            priceElement.innerHTML = cartItem.totalPrice;
          }

          if (event.target.dataset.element === 'decrement') {
            if (currentCount <= 1) return;
            counterElement.innerHTML = currentCount - 1;
            store.dispatch(decrementCartItem({ id }));

            priceElement.innerHTML = cartItem.totalPrice;
          }

          if (event.target.dataset.element === 'delete') {
            deleteElement.style.display = "none";
            repeatElement.style.display = "block";

            timerId = setTimeout(() => {
              cartItemElement.remove();
              store.dispatch(removeFromCart({ id }));
            }, 3000);
          }

          if (event.target.dataset.element === 'repeat') {
            deleteElement.style.display = "block";
            repeatElement.style.display = "none";

            clearTimeout(timerId);
          }
        });
      });
  }

  _addEventListeners(options) {
    this.closeButtonElement.addEventListener('click',
      () => this._handleCloseCart(options.toggleScroll),
    );
    this.scrimElement.addEventListener('click',
      (event) => this._clickOutsideCart(event, options.toggleScroll),
    );

    store.subscribe('ADD_TO_CART', this._renderCartItem.bind(this))
  }

}

export default Cart;