import { toggleScroll } from "~utils/utils";

import Cart from './Cart';

const initializeCart = () => {
  const cart = new Cart();
  cart.init({ toggleScroll });
};

document.addEventListener('DOMContentLoaded', initializeCart);