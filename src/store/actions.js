import * as types from "./types";

// import { getLoggedUserToken } from './selectors';

import { auth, adverts } from "../api";
import { formatFilters, storage } from "../utils";

/* REGISTER */

export const authRegisterRequest = () => ({
  type: types.AUTH_REGISTER_REQUEST,
});

export const authRegisterFailure = (error) => ({
  type: types.AUTH_REGISTER_FAILURE,
  error: true,
  payload: error,
});

export const authRegisterSuccess = (res) => ({
  type: types.AUTH_REGISTER_SUCCESS,
  payload: res,
});

export const authRegister = (data) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authRegisterRequest());
    try {
      const res = await api.auth.register(data);
      dispatch(authRegisterSuccess(res));
      console.log(res);
      dispatch(resetError());
      setTimeout(() => {
        history.push("/login");
      }, 3000)
      return res;
    } catch (error) {
      dispatch(authRegisterFailure(error.response.data));
    }
  };
};

/* LOGIN */

export const authLoginRequest = () => ({
  type: types.AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = (error) => ({
  type: types.AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = (token, username) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload: token,
  username,
});

export const authLogin = (crendentials) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authLoginRequest());
    try {
      const userData = await auth.login(crendentials);
      dispatch(authLoginSuccess(userData));
      history.push("/adverts");
    } catch (error) {
      console.error(error);
      dispatch(authLoginFailure(error.response.data));
    }
  };
};

export const authLogout = () => {
  return async function (dispatch, getState, { history, api }) {
    try {
      await auth.logout();
      history.push("/login");
    } catch (error) {
      console.error(error);
      dispatch(authLoginFailure(error.response.data));
    }
  };
};

/*RESET PASSWORD */

/*export const authForgotPasswordRequest = () => ({
  type: types.AUTH_FORGOT_REQUEST,
});

export const authForgotPasswordFailure = (error) => ({
  type: types.AUTH_FORGOT_FAILURE,
  error: true,
  payload: error,
});

export const authForgotPasswordSuccess = () => ({
  type: types.AUTH_FORGOT_SUCCESS,
});*/

/*export const authForgotPassword = (email) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authForgotPasswordRequest());
    try {
      await api.auth.forgot(email);
      dispatch(authForgotPasswordSuccess(email));
      console.log("Aqui", email);
      //history.push("/adverts");
    } catch (error) {
      console.log(email);
      console.log("Aqui", error);
      dispatch(authForgotPasswordFailure(error));
    }
  };
};*/

/* ADVERTS */

export const generateAdvertError = (error) => {
  return {
    type: types.ADVERT_ERROR,
    error: true,
    payload: error,
  };
};

export const advertsLoaded = (adverts) => {
  return {
    type: types.ADVERTS_LOADED,
    payload: adverts,
  };
};

export const loadAdverts = (filters) => async (dispatch, getState) => {
  storage.set("filters", filters);
  const formattedFilters = formatFilters(filters);
  const fetchedAdverts = await adverts.getAdverts(formattedFilters);
  dispatch(advertsLoaded(fetchedAdverts?.data?.result || []));
};

export const advertLoaded = (advert) => {
  return {
    type: types.ADVERT_LOADED,
    payload: advert,
  };
};

export const loadAdvert = (advertId) => async (
  dispatch,
  getState,
  { history, api }
) => {
  const fetchedAdvert = await adverts.getAdvert(advertId);
  if (!fetchedAdvert.data?.result?.name) {
    history.push("/404");
  }
  dispatch(advertLoaded(fetchedAdvert?.data.result));
};

export const advertCreated = (advert) => {
  return {
    type: types.ADVERT_CREATED,
    payload: {
      advert,
    },
  };
};

export const createAdvert = (advertData) => async (
  dispatch,
  getState,
  { history, api }
) => {
  try {
    const fetchedAdvert = await adverts.createAdvert(advertData);
    dispatch(advertCreated(fetchedAdvert?.data?.result));
    history.push(`/adverts/${fetchedAdvert?.data?.result?._id}`);
  } catch (error) {
    dispatch(generateAdvertError(error));
  }
};

export const advertEdited = (advert) => {
  return {
    type: types.ADVERT_CREATED,
    payload: {
      advert,
    },
  };
};

export const editAdvert = (advertData) => async (
  dispatch,
  getState,
  { history, api }
) => {
  try {
    const fetchedAdvert = await adverts.editAdvert(advertData);
    dispatch(advertEdited(fetchedAdvert?.data?.result));
    history.push(`/adverts/${fetchedAdvert?.data?.result?._id}`);
  } catch (error) {
    dispatch(generateAdvertError(error));
  }
};

export const advertDeleted = (advert) => {
  return {
    type: types.ADVERT_DELETED,
    payload: {
      advert,
    },
  };
};

export const deleteAdvert = (advertId) => async (
  dispatch,
  getState,
  { history, api }
) => {
  const fetchedAdvert = await adverts.deleteAdvert(advertId);
  dispatch(advertDeleted(fetchedAdvert.result));
  history.push("/adverts");
};

export const resetError = () => {
  return {
    type: types.UI_RESET_ERROR,
  };
};

/* TAGS */

export const tagsLoaded = (tags) => {
  return {
    type: types.TAGS_LOADED,
    payload: tags,
  };
};

export const loadTags = () => async (dispatch, getState) => {
  const fetchedTags = await adverts.getTags();
  console.log(fetchedTags);
  dispatch(tagsLoaded(fetchedTags.data.result || null));
};
