export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const INCREMENT_CART_ITEM = 'INCREMENT_CART_ITEM';
export const DECREMENT_CART_ITEM = 'DECREMENT_CART_ITEM';

export const addToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = payload => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const clearCart = payload => {
  return {
    type: CLEAR_CART,
    payload,
  };
};

export const incrementCartItem = payload => {
  return {
    type: INCREMENT_CART_ITEM,
    payload,
  };
};

export const decrementCartItem = payload => {
  return {
    type: DECREMENT_CART_ITEM,
    payload,
  };
};

export const cart = {
  [ADD_TO_CART](previousState = [], payload) {
    const product = previousState.find((prevProduct) =>
      Number(prevProduct.id) === Number(payload?.id));

    if (!!product) {
      product.count += 1;
      product.totalPrice = product?.price * product?.count;

      return previousState;
    }

    return [...previousState, { ...payload, totalPrice: payload?.price, count: 1 }];
  },
  [REMOVE_FROM_CART](previousState = [], payload) {
    return previousState.filter((prevProduct) =>
      Number(prevProduct.id) !== Number(payload?.id));
  },
  [CLEAR_CART](previousState = [], payload) {
    return [];
  },
  [INCREMENT_CART_ITEM](previousState = [], payload) {
    const product = previousState.find((prevProduct) =>
      Number(prevProduct.id) === Number(payload?.id));

    if (!!product) {
      product.count += 1;
      product.totalPrice = product?.price * product?.count;

      return previousState;
    }
  },
  [DECREMENT_CART_ITEM](previousState = [], payload) {
    const product = previousState.find((prevProduct) =>
      Number(prevProduct.id) === Number(payload?.id));

    if (!!product && product.count > 1) {
      product.count -= 1;
      product.totalPrice = product?.price * product?.count;

      return previousState;
    }

    return previousState;
  },
};