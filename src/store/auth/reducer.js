import * as actionTypes from "../actionTypes";

const initialState = {
  token:
    null,
  userProfile: {},
  country: "IN",
};

export const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    case actionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload.userProfile,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};
