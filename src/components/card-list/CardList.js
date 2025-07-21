import axios from "axios";
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
      <li class=".${BLOCK_CLASS}__item">
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
            <div class="${CHILD_BLOCK_CLASS}__actions-wrapper">
              <button
                class="${CHILD_BLOCK_CLASS}__cart-button"
                data-element="cartIncrement">
                  +
              </button>
            </div>
          </div>
        </div>
      </li>`
    })

    this.listElement.innerHTML = listHtml;
  }

  _setAddToCartEvent() {
    this.cardListElement.querySelectorAll('[data-element="card"')
      .forEach((cardElement) => {
        cardElement.addEventListener('click', (event) => {
          if (event.target.dataset.element !== 'cartIncrement') return;

          const product = store.getState().products.find((product) =>
            Number(product.id) === Number(cardElement.dataset.id));

          store.dispatch({
            type: "ADD_TO_CART",
            payload: product,
          });

        });
      });
  }

  _setSubscribes() {
    try {
      store.subscribe("SET_SORT_TYPE", async (state = {}) => {
        const params = { ...state };
        const filters = store.getState().filters;
        filters?.forEach((filter) => params[filter] = true);

        const products = await productApi.getProducts(params);
        if (!products) return;
        store.dispatch(setProducts(products));
      });
    } catch (error) {
      console.error('Ошибка:', error);
      store.dispatch(setProducts([]));
    }
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
      this._renderList(state);
      this._setAddToCartEvent();
    });
  }
}

export default CardList;