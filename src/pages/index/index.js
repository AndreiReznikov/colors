import GlideLib from '~libs/glideLib';
import '~components/cart';
import '~components/header';
import '~components/selector';
import '~components/toggle-list';
import '~templates/fonts.scss';
import { store } from '~store';

import './index.scss';

class Colors {
  initializePlugins() {
    this._initializeGlide();
  }

  _initializeGlide() {
    this.glide = new GlideLib()
    this.glide.initializePlugin('.js-glide', { animationDuration: 1200 });
  }
}

const colors = new Colors();

colors.initializePlugins();

document.addEventListener('DOMContentLoaded', () => {
  store.subscribe("ADD_TO_CART", () => {
    const cartCounter = document.querySelector(
      '[data-element="cartCounter"]',
    );

    cartCounter.innerText = store.getState().cart.length;
  });

  store.subscribe("REMOVE_FROM_CART", () => {
    const cartCounter = document.querySelector(
      '[data-element="cartCounter"]',
    );

    cartCounter.innerText = store.getState().cart.length;
  });

  store.subscribe("CLEAR_CART", () => {
    const cartCounter = document.querySelector(
      '[data-element="cartCounter"]',
    );

    cartCounter.innerText = store.getState().cart.length;
  });

  document.querySelectorAll('[data-element="cartIncrement"]').forEach((element) => {
    element.addEventListener('click', () => {
      const product = store.getState().products.find((product) =>
        product.id === Number(element.dataset.productId));

      store.dispatch({
        type: "ADD_TO_CART",
        payload: product,
      })
    });
  });
});