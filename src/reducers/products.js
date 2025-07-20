export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = payload => {
  return {
    type: SET_PRODUCTS,
    payload,
  };
};

export const products = {
  [SET_PRODUCTS] (_, payload) {
    return [...payload];
  },
};