import * as actionTypes from "../actionTypes";

export const setPrimaryColor = (color) => {
  return {
    type: actionTypes.SET_PRIMARY_COLOR,
    payload: {
      color: color,
    },
  };
};

export const setSearchTerm = (searchTerm) => {
  return {
    type: actionTypes.SET_SEARCH_TERM,
    payload: {
      searchTerm: searchTerm,
    },
  };
};

export const initSetSearchItems = (token, searchTerm, limit=10, offset=0) => {
  return {
    type: actionTypes.INIT_SET_SEARCH_ITEMS,
    payload: {
      token: token,
      searchTerm: searchTerm,
      limit:limit,
      offset:offset,
    },
  };
};

export const setSearchItems = (searchItemsResponse) => {
  return {
    type: actionTypes.SET_SEARCH_ITEMS,
    payload: {
      searchItemsResponse: searchItemsResponse,
    },
  };
};



