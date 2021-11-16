import {
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCESS,
  FETCH_TOKEN_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  SET_LOGGED_IN_LOGGED_OUT,
  SET_REFRESHED_TOKEN,
  FETCH_REFRESHED_TOKEN_ERROR,
  UPDATE_IMAGE_SUCCESS,
} from '../constants';
/**
 * This is for fetching token
 */

const fetchTokenRequest = () => {
  return {
    type: FETCH_TOKEN_REQUEST,
  };
};

const updateImageSuccess = (payload) => {
  return {
    type: UPDATE_IMAGE_SUCCESS,
    payload: payload,
  };
};

/**
 *
 * @param {*} payload
 * When user fetch the token successfully this action is called.
 */
const fetchTokenSuccess = (payload) => {
  return {
    type: FETCH_TOKEN_SUCESS,
    payload: payload,
  };
};

/**
 *
 * @param {*} payload
 * This action is called when user wants to login or logout
 */
const fetchLoginLogout = (payload) => {
  return {
    type: SET_LOGGED_IN_LOGGED_OUT,
    payload: payload,
  };
};

/**
 * @param {*} error
 * This action is called if any error occurs at the time of token fetching.
 */
const fetchTokenError = (error) => {
  return {
    type: FETCH_TOKEN_ERROR,
    payload: error,
  };
};

/**
 * When user request to logout
 */
const logoutRequest = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  };
};

/**
 *
 * @param {*} payload
 * When user logout successfully.
 */
const logoutSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
};

/**
 *
 * @param {*} error
 * If user gets any error at the time of logout. This action will be called.
 */
const logoutError = (error) => {
  return {
    type: LOGOUT_USER_ERROR,
    payload: error,
  };
};

/**
 *
 * @param {*} payload
 * If user's token expired then this action will be called
 */
const fetchRefreshedTokenSuccess = (payload) => {
  return {
    type: SET_REFRESHED_TOKEN,
    payload: payload,
  };
};
/**
 *
 * @param {*} error
 * If user gets any error at the time of toke refreshing this action will be called.
 */
const fetchRefreshedTokenError = (error) => {
  return {
    type: FETCH_REFRESHED_TOKEN_ERROR,
    payload: error,
  };
};
export {
  fetchTokenRequest,
  fetchTokenSuccess,
  fetchTokenError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  fetchLoginLogout,
  fetchRefreshedTokenSuccess,
  fetchRefreshedTokenError,
  updateImageSuccess,
};
