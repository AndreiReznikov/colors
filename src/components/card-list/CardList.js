import { store } from "~store";

const BLOCK_CLASS = 'card-list';

class CardList {
  init() {
    this._findElements();
    this._addSubscribes()
    this._addEventListeners();
    this._setAddToCartEvent();
  }

  _findElements() {
    this.cardListElement = document.querySelector(`.${BLOCK_CLASS}`);
  }

  _setAddToCartEvent() {
    this.cardListElement.querySelectorAll('[data-element="card"')
      .forEach((cardElement) => {
        cardElement.addEventListener('click', (event) => {
          if (event.target.dataset.element !== 'cartIncrement') return;

          const product = store.getState().products.find((product) =>
            product.id === Number(cardElement.dataset.id));

          store.dispatch({
            type: "ADD_TO_CART",
            payload: product,
          });

        });
      });
  }

  _addSubscribes() {
    // store.subscribe("ADD_TO_CART", () => {
    //   this.cartButtonElement.innerText = store.getState().cart.length;
    // });
  }

  _addEventListeners(options) {
    // this.cartButtonElement.addEventListener('click',
    //   () => this._handleOpenCart(options.toggleScroll),
    // );
  }
}

export default CardList;