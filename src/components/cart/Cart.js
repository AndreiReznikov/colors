import { VISIBLE_MODIFIER } from "~constants/constants";
import { pluralize } from "~utils/utils";
import { clearCart, decrementCartItem, incrementCartItem, removeFromCart } from "~reducers/cart";
import { store } from "~store";

const ITEMS_WORDS = ['товар', 'товара', 'товаров'];
const EMPTY_CART_TEXT = 'Корзина пуста';
const BLOCK_CLASS = 'cart';
const CHILD_BLOCK_CLASS = 'cart-item';

class Cart {
  init(options = {}) {
    this._findElements();
    this._addSubscribes()
    this._addEventListeners(options);
    this._renderCartItems();
  }

  _findElements() {
    this.cartElement = document.querySelector(`.${BLOCK_CLASS}`);
    this.closeButtonElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__close-button`);
    this.cartWrapperElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__wrapper`);
    this.cartItemsControlWrapperElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__items-control-wrapper`);
    this.cartItemsCountElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__items-count`);
    this.cartItemsListElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__items-list`);
    this.cartSumElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__sum`);
    this.cartEmptyTextElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__empty-text`);
    this.cartOrderButtonElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__order-button`);
    this.cartClearButtonElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__clear-button`);
    this.scrimElement = this.cartElement.querySelector(`.${BLOCK_CLASS}__scrim`);
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

  _renderCartItems() {
    let itemsText = '';

    const cart = store.getState().cart;

    cart.forEach((item) => {
      itemsText += `
        <li class="${BLOCK_CLASS}__item">
          <div class="${CHILD_BLOCK_CLASS}" data-element="cartItem" data-id="${item.id}">
            <div class="${CHILD_BLOCK_CLASS}__wrapper">
              <div class="${CHILD_BLOCK_CLASS}__main-wrapper" data-element="mainWrapper">
                <div class="${CHILD_BLOCK_CLASS}__image-wrapper">
                  <img class="${CHILD_BLOCK_CLASS}__image" src="${item.img}" alt="${item.altText || ''}">
                </div>
                <div class="${CHILD_BLOCK_CLASS}__info-wrapper">
                  <h3 class="${CHILD_BLOCK_CLASS}__title">${item.title}</h3>
                  <div class="${CHILD_BLOCK_CLASS}__price-wrapper">
                    <span class="${CHILD_BLOCK_CLASS}__price" data-element="price">
                      ${item.totalPrice}
                    </span>
                    <span class="${CHILD_BLOCK_CLASS}__currency"> ${item.currency}</span>
                  </div>
                </div>
                <div class="${CHILD_BLOCK_CLASS}__counter-wrapper" data-product-id=${item.id}>
                  <button type="button" class="${CHILD_BLOCK_CLASS}__decrement" data-element="decrement">-</button>
                  <span class="${CHILD_BLOCK_CLASS}__counter" data-element="counter">${item.count}</span>
                  <button type="button" class="${CHILD_BLOCK_CLASS}__increment" data-element="increment">
                    +
                  </button>
                </div>
              </div>
              <div class="${CHILD_BLOCK_CLASS}__actions-wrapper">
                <button
                  class="${CHILD_BLOCK_CLASS}__delete-button"
                  type="button"
                  data-element="delete"
                  aria-label="Удалить продукт ${item.title} из корзины"
                ></button>
                <button
                  class="${CHILD_BLOCK_CLASS}__repeat-button"
                  type="button"
                  data-element="repeat"
                  aria-label="Вернуть продукт ${item.title} в корзину"
                ></button>
              </div>
            </div>
          </div>
        </li>
      `;
    });

    this.cartItemsListElement.innerHTML = itemsText;
    this._calculateTotalSum();
    this._calculateTotalCount();
    this._setCartItemEvents();
    this._setOrderButtonProp();
    this._setEmptyText();
    this._setCartItemsControlProps();
    this.cartSumElement.innerHTML = this.localeTotalSum;
    this.cartItemsCountElement.innerHTML = this.countText;
  }

  _calculateTotalSum() {
    this.totalSum = store.getState().cart.reduce(
      (sum, item) => sum += Number(item.totalPrice), 0);
    this.localeTotalSum = this.totalSum.toLocaleString();
  }

  _calculateTotalCount() {
    this.totalCount = store.getState().cart.reduce(
      (count, item) => count += Number(item.count), 0);

    this._addTotalCountText();
  }

  _setOrderButtonProp() {
    if (!!this.totalSum) {
      return this.cartOrderButtonElement.disabled = false;
    }

    this.cartOrderButtonElement.disabled = true;
  }

  _setEmptyText() {
    if (!this.cartEmptyTextElement) return;

    const cartLength = store.getState().cart.length;

    if (!!cartLength) {
      return this.cartEmptyTextElement.textContent = '';
    }

    this.cartEmptyTextElement.textContent = EMPTY_CART_TEXT;
  }

  _setCartItemsControlProps() {
    const cartLength = store.getState().cart.length;

    if (!!cartLength) {
      return this.cartItemsControlWrapperElement.style.display = 'flex';
    }

    this.cartItemsControlWrapperElement.style.display = 'none';
  }

  _addTotalCountText() {
    this.countText = `${this.totalCount} ${pluralize(this.totalCount, ITEMS_WORDS)}`;
  }

  _setCartItemEvents() {
    this.cartItemsListElement
      .querySelectorAll('[data-element="cartItem"]').forEach((cartItemElement) => {
        const mainWrapperElement = cartItemElement.querySelector('[data-element="mainWrapper"]');
        const counterElement = cartItemElement.querySelector('[data-element="counter"]');
        const deleteElement = cartItemElement.querySelector('[data-element="delete"]');
        const repeatElement = cartItemElement.querySelector('[data-element="repeat"]');
        const priceElement = cartItemElement.querySelector('[data-element="price"]');
        const id = Number(cartItemElement.dataset.id);
        const cartItem = store.getState().cart.find(
          (item) => Number(item.id) === id,
        );
        let timerId;

        cartItemElement.addEventListener('click', (event) => {
          const currentCount = Number(counterElement.innerHTML);

          if (event.target.dataset.element === 'increment') {
            counterElement.innerHTML = currentCount + 1;
            store.dispatch(incrementCartItem({ id }));
            this._calculateTotalSum();
            this._calculateTotalCount();

            priceElement.innerHTML = cartItem.totalPrice;
            this.cartSumElement.innerHTML = this.localeTotalSum;
            this.cartItemsCountElement.innerHTML = this.countText;
          }

          if (event.target.dataset.element === 'decrement') {
            if (currentCount <= 1) return;
            counterElement.innerHTML = currentCount - 1;
            store.dispatch(decrementCartItem({ id }));
            this._calculateTotalSum();
            this._calculateTotalCount();

            priceElement.innerHTML = cartItem.totalPrice;
            this.cartSumElement.innerHTML = this.localeTotalSum;
            this.cartItemsCountElement.innerHTML = this.countText;
          }

          if (event.target.dataset.element === 'delete') {
            mainWrapperElement.style.pointerEvents = 'none';
            mainWrapperElement.style.opacity = 0.2;
            deleteElement.style.display = "none";
            repeatElement.style.display = "block";

            timerId = setTimeout(() => {
              cartItemElement.remove();
              store.dispatch(removeFromCart({ id }));
              this._calculateTotalSum();
              this._calculateTotalCount();
              this._setOrderButtonProp();
              this._setEmptyText();
              this._setCartItemsControlProps();
              this.cartSumElement.innerHTML = this.localeTotalSum;
              this.cartItemsCountElement.innerHTML = this.countText;
            }, 3000);

          }

          if (event.target.dataset.element === 'repeat') {
            mainWrapperElement.style.opacity = 1;
            mainWrapperElement.style.pointerEvents = 'auto';
            deleteElement.style.display = "block";
            repeatElement.style.display = "none";

            clearTimeout(timerId);
          }

          this._setOrderButtonProp();
          this._setEmptyText();
          this._setCartItemsControlProps();
        });
      });
  }

  _clearCart() {
    store.dispatch(clearCart());
    this.totalSum = 0;
    this.localeTotalSum = 0;
    this.cartSumElement.innerHTML = 0;
    this.cartItemsCountElement.innerHTML = '';
    this.cartItemsListElement.innerHTML = '';
    this._setOrderButtonProp();
    this._setEmptyText();
    this._setCartItemsControlProps();
  }

  _addSubscribes() {
    store.subscribe('ADD_TO_CART', this._renderCartItems.bind(this));
    store.subscribe('ADD_TO_CART', this._setOrderButtonProp.bind(this));
    store.subscribe('ADD_TO_CART', this._setEmptyText.bind(this));
    store.subscribe('ADD_TO_CART', this._setCartItemsControlProps.bind(this));
  }

  _addEventListeners(options) {
    this.closeButtonElement.addEventListener('click',
      () => this._handleCloseCart(options.toggleScroll),
    );
    this.cartClearButtonElement.addEventListener('click',
      () => this._clearCart(),
    );
    this.scrimElement.addEventListener('click',
      (event) => this._clickOutsideCart(event, options.toggleScroll),
    );
  }

}

export default Cart;