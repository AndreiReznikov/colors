import reducers from "~reducers";
import { SORT_ORDER } from "~reducers/sort";

import Store from "./store";

const initStore = {
  filters: [],
  sort: {
    sortBy: 'price',
    order: SORT_ORDER.DESC,
  },
  cart: [
    {
      id: 2,
      title: "Краска Wallquest, Brownsone MS90102",
      price: "5290",
      totalPrice: "5290",
      currency: "₽",
      img: "../assets/img/products/product-0.webp",
      count: 1,
    }
  ],
  products: [
    {
      id: 0,
      title: "Краска Wallquest, Brownsone MS90102",
      price: "6000",
      currency: "₽",
      img: "../assets/img/products/product-0.webp",
    },
    {
      id: 1,
      title: "Краска Wallquest, Brownsone MS90102",
      price: "4800",
      currency: "₽",
      img: "../assets/img/products/product-0.webp",
    },
    {
      id: 2,
      title: "Краска Wallquest, Brownsone MS90102",
      price: "5290",
      currency: "₽",
      img: "../assets/img/products/product-0.webp",
    },
  ],
};

export const store = new Store(reducers, initStore);