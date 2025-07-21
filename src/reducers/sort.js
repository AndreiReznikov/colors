export const SET_SORT_TYPE = 'SET_SORT_TYPE';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const setSortType = payload => {
  return {
    type: SET_SORT_TYPE,
    payload,
  };
};

export const sort = {
  [SET_SORT_TYPE](previousState = {}, payload) {
    return {
      sortBy: payload?.sortBy ?? '',
      order: payload?.order ?? SORT_ORDER.DESC,
    };
  },
};