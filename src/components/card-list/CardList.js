import { store } from "~store";
import { productApi } from "~api";
import { setProducts } from "~reducers/products";

const BLOCK_CLASS = 'card-list';
const CHILD_BLOCK_CLASS = 'card';

class CardList {
  init() {
    this._findElements();
    this._setAddToCartEvent();
    this._setSubscribes();
  }

  _findElements() {
    this.cardListElement = document.querySelector(`.${BLOCK_CLASS}`);
    this.listElement = this.cardListElement.querySelector(`.${BLOCK_CLASS}__list`);
  }

  _renderList(items) {
    let listHtml = '';

    if (!items.length) {
      return this.listElement.innerHTML = 'Товары не найдены';
    }

    items.forEach((item = {}) => {
      listHtml += `
      <li class="${BLOCK_CLASS}__item">
        <a class="${BLOCK_CLASS}__link" href="colors/${item.id}">
          <div
            class="${CHILD_BLOCK_CLASS}"
            data-id="${item.id}"
            data-element="card"
          >
            <div class="${CHILD_BLOCK_CLASS}__image-wrapper">
              <img
                class="${CHILD_BLOCK_CLASS}__image"
                src="${item.img}"
                alt="${item.title}"
                loading="lazy"
                width="278"
                height="278"
              >
            </div>
            <div class="${CHILD_BLOCK_CLASS}__title-wrapper">
              <h3 class="${CHILD_BLOCK_CLASS}__title">${item.title}</h3>
            </div>
            <div class="${CHILD_BLOCK_CLASS}__bottom-wrapper">
              <div class="${CHILD_BLOCK_CLASS}__price-wrapper">
                <span class="${CHILD_BLOCK_CLASS}__price">${item.price}</span>
                <span class="${CHILD_BLOCK_CLASS}__currency"> ${item.currency}</span>
              </div>
              <div class="${CHILD_BLOCK_CLASS}__cart-wrapper">
                <div
                  class="${CHILD_BLOCK_CLASS}__actions-wrapper"
                  data-element="actionsWrapper"
                >
                  <button
                    class="${CHILD_BLOCK_CLASS}__cart-button"
                    data-element="cartIncrement"
                  >
                    +
                  </button>
                </div>
                <span class="${CHILD_BLOCK_CLASS}__status-text" data-element="statusText"></span>
              </div>
          </div>
        </a>
      </li>`
    })

    this.listElement.innerHTML = listHtml;
  }

  _setAddToCartEvent() {
    this.cardListElement.querySelectorAll('[data-element="card"')
      .forEach((cardElement) => {
        cardElement.addEventListener('click', (event) => {
          if (event.target.dataset.element !== 'cartIncrement') return;
          event.preventDefault();

          const product = store.getState().products.find((product) =>
            Number(product.id) === Number(cardElement.dataset.id));

          store.dispatch({
            type: "ADD_TO_CART",
            payload: product,
          });

        });
      });
  }

  _setStatusText(items = []) {
    this.cardListElement.querySelectorAll('[data-element="card"')
      .forEach((cardElement) => {
        const actionsWrapperElement = cardElement.querySelector('[data-element="actionsWrapper"]');
        const statusTextElement = cardElement.querySelector('[data-element="statusText"]');

        if (!actionsWrapperElement || !statusTextElement) return;

        const addedToCart = items.some((item) => Number(item.id) === Number(cardElement.dataset.id));

        if (addedToCart) {
          actionsWrapperElement.style.display = "none";
          statusTextElement.textContent = "Товар в корзине";

          return;
        }

        actionsWrapperElement.style.display = "block";
        statusTextElement.textContent = "";
      });
  }

  _setSubscribes() {
    store.subscribe("SET_SORT_TYPE", async (state = {}) => {
      try {
        const params = { ...state };
        const filters = store.getState().filters;
        filters?.forEach((filter) => params[filter] = true);

        const products = await productApi.getProducts(params);
        if (!products) return;
        store.dispatch(setProducts(products));
      } catch (error) {
        console.error('Ошибка:', error);
        store.dispatch(setProducts([]));
      }
    });
    store.subscribe("SET_FILTERS", async (state = []) => {
      try {
        const sort = store.getState().sort;
        const params = { ...sort };
        state.forEach((filter) => params[filter] = true);

        const products = await productApi.getProducts(params);
        if (!products) return;
        store.dispatch(setProducts(products));
      } catch (error) {
        console.error('Ошибка:', error);
        store.dispatch(setProducts([]));
      }
    });
    store.subscribe("SET_PRODUCTS", (state = []) => {
      const cart = store.getState().cart;
      this._renderList(state);
      this._setStatusText(cart);
      this._setAddToCartEvent();
    });
    store.subscribe("ADD_TO_CART", (state = []) => {
      this._setStatusText(state);
    });
    store.subscribe("REMOVE_FROM_CART", (state = []) => {
      this._setStatusText(state);
    });
    store.subscribe("CLEAR_CART", (state = []) => {
      this._setStatusText(state);
    });
  }
}

export default CardList;