export const SET_FILTERS = 'SET_FILTERS';

export const setFilters = payload => {
  return {
    type: SET_FILTERS,
    payload,
  };
};

export const filters = {
  [SET_FILTERS] (previousState = [], payload) {
    if (previousState.includes(payload.value)) {
      return previousState.filter((item) => item !== payload?.value);
    }

    return [...previousState, payload.value];
  },
};