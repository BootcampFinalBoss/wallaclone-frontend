import * as types from './types';

// import { getLoggedUserToken } from './selectors';

import { auth, adverts } from '../api';

/* REGISTER */

export const authRegisterRequest = () => ({
  type: types.AUTH_REGISTER_REQUEST,
});

export const authRegisterFailure = (error) => ({
  type: types.AUTH_REGISTER_FAILURE,
  error: true,
  payload: error,
});

export const authRegisterSuccess = () => ({
  type: types.AUTH_REGISTER_SUCCESS,
});

export const authRegister = (newUserData) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authRegisterRequest());
    try {
      const token = await api.auth.register(newUserData);
      dispatch(authRegisterSuccess(token));
      dispatch(resetError());
      history.push('/login');
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

export const authLoginSuccess = (token) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload: token,
});

export const authLogin = (crendentials) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authLoginRequest());
    try {
      const token = await auth.login(crendentials);
      dispatch(authLoginSuccess(token));
      history.push('/adverts');
    } catch (error) {
      console.error(error);
      dispatch(authLoginFailure(error.response.data));
    }
  };
};

export const authLogout = () => {
  return {
    type: types.AUTH_LOGOUT,
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
  console.log(filters);
  const fetchedAdverts = await adverts.getAdverts(filters);
  dispatch(advertsLoaded(fetchedAdverts?.data?.result || []));
};

export const advertLoaded = (advert) => {
  return {
    type: types.ADVERT_LOADED,
    payload: advert,
  };
};

export const loadAdvert = (advertId) => async (dispatch, getState) => {
  const fetchedAdvert = await adverts.getAdvert(advertId);
  dispatch(advertLoaded(fetchedAdvert?.result));
  s;
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
  { history, api },
) => {
  try {
    const fetchedAdvert = await adverts.createAdvert(advertData);
    dispatch(advertCreated(fetchedAdvert?.data?.result));
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

export const deleteAdvert = (advertId) => async (dispatch, getState) => {
  const fetchedAdvert = await adverts.deleteAdvert(advertId);
  dispatch(advertDeleted(fetchedAdvert.result));
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
