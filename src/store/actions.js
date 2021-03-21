import * as types from './types';

// import { getLoggedUserToken } from './selectors';

import { auth, adverts, user } from '../api';
import { formatFilters, storage } from '../utils';
import { STORAGE_KEY, LOCALES } from '../intl/constants';

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
        history.push('/login');
      }, 3000);
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
      history.push('/adverts');
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
      history.push('/login');
    } catch (error) {
      console.error(error);
      dispatch(authLoginFailure(error.response.data));
    }
  };
};

/*RESET PASSWORD */

export const authForgotPasswordRequest = () => ({
  type: types.AUTH_FORGOT_REQUEST,
});

export const authForgotPasswordFailure = (error) => ({
  type: types.AUTH_FORGOT_FAILURE,
  error: true,
  payload: error,
});

export const authForgotPasswordSuccess = () => ({
  type: types.AUTH_FORGOT_SUCCESS,
});

export const authForgotPassword = (email) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authForgotPasswordRequest());
    try {
      const res = await auth.forgot(email);
      dispatch(authForgotPasswordSuccess());
      console.log(res);
      //history.push("/adverts");
      return res;
    } catch (error) {
      dispatch(authForgotPasswordFailure(error));
    }
  };
};

export const authResetRequest = () => ({
  type: types.AUTH_RESET_REQUEST,
});

export const authResetFailure = (error) => ({
  type: types.AUTH_RESET_FAILURE,
  error: true,
  payload: error,
});

export const authResetSuccess = (res) => ({
  type: types.AUTH_RESET_SUCCESS,
  payload: res,
});

export const authReset = (token, data) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authResetRequest(token.id));
    try {
      const res = await auth.getResetPassword(token, data);
      dispatch(authResetSuccess(res));
    } catch (error) {
      console.log(error);
      dispatch(authResetFailure(error.response.data));
      setTimeout(() => {
        dispatch(resetError());
        history.push('/login');
      }, 3000);
    }
  };
};

export const authUpdateResetRequest = () => ({
  type: types.AUTH_UPDATEPASS_REQUEST,
});

export const authUpdateResetFailure = (error) => ({
  type: types.AUTH_UPDATEPASS_FAILURE,
  error: true,
  payload: error,
});

export const authUpdateResetSuccess = (res) => ({
  type: types.AUTH_UPDATEPASS_SUCCESS,
  payload: res,
});

export const authUpdatePassword = (token, data) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authUpdateResetRequest(token.id, data));
    try {
      const res = await auth.updatePasswordReset(token, data);
      console.log(res);
      dispatch(authUpdateResetSuccess(res));
      setTimeout(() => {
        history.push('/login');
      }, 3000);
      return res;
    } catch (error) {
      dispatch(authUpdateResetFailure(error));
      console.log(error);
    }
  };
};

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
  storage.set('filters', filters);
  const formattedFilters = formatFilters(filters);
  const fetchedAdverts = await adverts.getAdverts(formattedFilters);
  dispatch(advertsLoaded(fetchedAdverts?.data?.result || []));
};

export const advertsMoreLoaded = (adverts) => {
  return {
    type: types.ADVERTS_MORE_LOADED,
    payload: adverts,
  };
};

export const loadMoreAdverts = (filters) => async (dispatch, getState) => {
  const formattedFilters = formatFilters(filters);
  const fetchedAdverts = await adverts.getAdverts(formattedFilters);
  dispatch(advertsMoreLoaded(fetchedAdverts?.data?.result));
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
  { history, api },
) => {
  const fetchedAdvert = await adverts.getAdvert(advertId);
  if (!fetchedAdvert.data?.result?.name) {
    history.push('/404');
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
  { history, api },
) => {
  try {
    const fetchedAdvert = await adverts.createAdvert(advertData);
    dispatch(advertCreated(fetchedAdvert?.data?.result));
    const { _id, name } = fetchedAdvert?.data?.result;
    history.push(`/adverts/${name}-${_id}`);
    dispatch(stopLoading());
    return fetchedAdvert;
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
  { history, api },
) => {
  try {
    const fetchedAdvert = await adverts.editAdvert(advertData);
    dispatch(advertEdited(fetchedAdvert?.data?.result));

    const { _id, name } = fetchedAdvert?.data?.result;
    setTimeout(() => {
      history.push(`/adverts/${name}-${_id}`);
    }, 2800);

    dispatch(stopLoading());
    return fetchedAdvert;
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

export const deleteAdvert = (advertId, userId) => async (
  dispatch,
  getState,
  { history, api },
) => {
  const fetchedAdvert = await adverts.deleteAdvert(advertId, userId);
  dispatch(advertDeleted(fetchedAdvert.result));
  setTimeout(async () => {
    await history.push('/');
  }, 2800);
  dispatch(stopLoading());
  return fetchedAdvert;
};

/* UI */

export const resetError = () => {
  return {
    type: types.UI_RESET_ERROR,
  };
};

export const stopLoading = () => {
  return {
    type: types.UI_STOP_LOADING,
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
  dispatch(tagsLoaded(fetchedTags.data.result || null));
};

/* LANG - LOCALE */

export const langLoaded = (locale) => {
  return {
    type: types.LANGS_LOADED,
    payload: locale,
  };
};

export const loadLang = (newLocale) => async (dispatch, getState) => {
  storage.set(STORAGE_KEY, newLocale);
  dispatch(langLoaded(newLocale));
};

/* USER */

export const userRequest = () => ({
  type: types.USER_REQUEST,
});

export const userFailure = (error) => ({
  type: types.USER_FAILURE,
  error: true,
  payload: error,
});

export const userSuccess = (res) => ({
  type: types.USER_SUCCESS,
  payload: res,
});

export const getUserId = (id, token) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(userRequest(id, token.token));
    try {
      const res = await user.getUser(id, token);
      dispatch(userSuccess(res));
      dispatch(resetError());
    } catch (error) {
      dispatch(userFailure());
    }
  };
};

export const userEditedRequest = () => {
  return {
    type: types.USER_EDITED_REQUEST,
  };
};

export const userEdited = () => {
  return {
    type: types.USER_EDITED,
  };
};

export const userEditedError = (error) => {
  return {
    type: types.USER_EDITED_ERROR,
    error: true,
    payload: {
      error,
    },
  };
};

export const editUser = (id, userData, token) => async (
  dispatch,
  getState,
  { history, api },
) => {
  dispatch(userEditedRequest());
  try {
    const res = await user.editUser(id, userData, token);
    console.log(res);
    await dispatch(userEdited(res));
    setTimeout(() => {
      history.push(`/profile/${res?.data?.user?.username}`);
    }, 3000);

    return res;
  } catch (error) {
    dispatch(userEditedError(error.response.data));
  }
};

export const userDeleted = (user) => {
  return {
    type: types.USER_DELETED,
    payload: {
      user,
    },
  };
};

export const deleteUser = (id) => async (
  dispatch,
  getState,
  { history, api },
) => {
  const fetchedAdvert = await user.deleteUser(id);
  setTimeout(() => {
    dispatch(authLogout());
  }, 3000);

  return fetchedAdvert;
};
