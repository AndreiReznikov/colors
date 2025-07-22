import { store } from '~store';
import { productApi } from '~api';
import { setProducts } from '~reducers/products';
import { VISIBLE_MODIFIER } from '~constants/constants';
import { pluralize } from '~utils/utils';
import GlideLib from '~libs/glideLib';
import '~components/cart';
import '~components/header';
import '~components/selector';
import '~components/toggle-sheet';
import '~components/card-list';
import '~components/toggle-list';

import './index.scss';

const BLOCK_CLASS = 'index';
const ITEMS_WORDS = ['товар', 'товара', 'товаров'];

class Colors {
  constructor() {
    this._loadProducts();
    this._findElements();
    this._addEventListeners();
    this._addSubscribes();
  }

  initializePlugins() {
    this._initializeGlide();
  }

  _findElements() {
    this.pageElement = document.querySelector(`.${BLOCK_CLASS}`)
    this.productCountElement = this.pageElement.querySelector(`.${BLOCK_CLASS}__products-count`);
    this.filtersButtonElement = this.pageElement.querySelector(`.${BLOCK_CLASS}__filters-button`);
    this.toggleSheetWrapperElement = this.pageElement.querySelector(`.${BLOCK_CLASS}__toggle-sheet-wrapper`);
  }

  _initializeGlide() {
    this.glide = new GlideLib()
    this.glide.initializePlugin('.js-glide', { animationDuration: 1200 });
  }

  async _loadProducts() {
    try {
      const filters = store.getState().filters;
      const sort = store.getState().sort;
      const params = { ...sort };
      filters?.forEach((filter) => params[filter] = true);

      const products = await productApi.getProducts(params);
      if (!products) return;
      store.dispatch(setProducts(products));
    } catch (error) {
      console.error('Ошибка:', error);
      store.dispatch(setProducts([]));
    }
  }

  _openFilters() {
    this.toggleSheetWrapperElement.classList.add(`${BLOCK_CLASS}__toggle-sheet-wrapper${VISIBLE_MODIFIER}`);
  }

  _addEventListeners() {
    this.filtersButtonElement.addEventListener('click', () => {
      this._openFilters();
    });
  }

  _addSubscribes() {
    store.subscribe('SET_PRODUCTS', (products = []) => {
      this.productCountElement.textContent = `${products.length} ${pluralize(
        products.length,
        ITEMS_WORDS,
      )}`
    });
  }
}

const colors = new Colors();

colors.initializePlugins();