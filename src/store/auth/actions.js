import * as actionTypes from "../actionTypes";

export const setToken = (token) => {
  return {
    type: actionTypes.SET_TOKEN,
    payload: {
      token: token,
    },
  };
};

export const initSetUserProfile = (token) => {
  return {
    type: actionTypes.INIT_SET_USER_PROFILE,
    payload: {
      token: token,
    },
  };
};

export const setUserProfile = (userProfile) => {
  return {
    type: actionTypes.SET_USER_PROFILE,
    payload: {
      userProfile: userProfile,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
