import * as actionTypes from "../actionTypes";

const initialState = {
  bgColor: "rgb(20, 20, 20)",
  searchTerm: "",
  searchItems: {},
};

export const metadataReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_PRIMARY_COLOR:
      return {
        ...state,
        bgColor: action.payload.color,
      };

    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case actionTypes.SET_SEARCH_ITEMS:
      return {
        ...state,
        searchItems: { ...action.payload.searchItemsResponse },
      };

    default:
      return state;
  }
};
