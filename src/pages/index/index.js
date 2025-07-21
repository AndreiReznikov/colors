import { store } from '~store';
import { productApi } from '~api';
import { setProducts } from '~reducers/products';
import GlideLib from '~libs/glideLib';
import '~components/cart';
import '~components/header';
import '~components/selector';
import '~components/card-list';
import '~components/toggle-list';

import './index.scss';

class Colors {
  constructor() {
    this._loadProducts();
  }

  initializePlugins() {
    this._initializeGlide();
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
}

const colors = new Colors();

colors.initializePlugins();