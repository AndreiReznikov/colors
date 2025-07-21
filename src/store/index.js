import reducers from "~reducers";
import { SORT_ORDER } from "~reducers/sort";

import Store from "./store";

const initStore = {
  filters: [],
  sort: {
    sortBy: 'price',
    order: SORT_ORDER.DESC,
  },
  cart: [],
  products: [],
};

export const store = new Store(reducers, initStore);