import { LIMIT_ADVERTS_API } from '../utils/definitions';
import * as types from './types';

const initialState = {
  auth: null,
  adverts: null,
  advert: null,
  tags: null,
  ui: {
    loading: false,
    error: null,
    hasMoreAdverts: true,
    advertsIndex: 0,
  },
  locale: null,
  resReset: null,
  user: null,
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      // login
      return action.payload; // Save the token on redux state
    case types.AUTH_LOGOUT:
      // logout
      return null;
    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    case types.ADVERTS_LOADED:
      if (
        action.payload?.length === 0 ||
        action.payload?.length < LIMIT_ADVERTS_API
      ) {
        initialState.ui.hasMoreAdverts = false;
      } else {
        initialState.ui.hasMoreAdverts = true;
        initialState.ui.advertsIndex += LIMIT_ADVERTS_API;
      }
      initialState.ui.loading = false;
      return action.payload; // On new load, save the passed adverts on the state
    case types.ADVERTS_MORE_LOADED:
      if (
        action.payload?.length === 0 ||
        action.payload?.length < LIMIT_ADVERTS_API
      ) {
        initialState.ui.hasMoreAdverts = false;
        return [...state];
      } else {
        initialState.ui.advertsIndex += LIMIT_ADVERTS_API;
      }
      initialState.ui.loading = false;
      return [...state, ...action.payload]; // On new load, save the passed adverts on the state
    case types.ADVERT_CREATED:
      if (!state) {
        // check if there is adverts already on state
        return [action.payload.advert]; // If not, save the passed advert on an array
      } // otherwise, concat the adverts on state with the new advert
      return [...state, action.payload];
    default:
      return state;
  }
};

export const advert = (state = initialState.advert, action) => {
  switch (action.type) {
    case types.ADVERT_LOADED:
      return action.payload;
    default:
      return state;
  }
};

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    case types.TAGS_LOADED:
      return action.payload;
    default:
      return state;
  }
};

export const locale = (state = initialState.locale, action) => {
  switch (action.type) {
    case types.LANGS_LOADED:
      return action.payload;
    default:
      return state;
  }
};

export const ui = (state = initialState.ui, action) => {
  if (action.error) {
    return { ...state, error: action.payload, loading: false };
  }

  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST ||
      types.AUTH_REGISTER_REQUEST ||
      types.AUTH_FORGOT_REQUEST:
      return { ...state, loading: true };
    case types.AUTH_LOGIN_SUCCESS ||
      types.AUTH_REGISTER_SUCCESS ||
      types.AUTH_FORGOT_SUCCESS:
      return { ...state, error: null, loading: false };
    case types.UI_RESET_ERROR:
      return { ...state, error: null, loading: false };
    case types.ADVERTS_REQUEST:
      return { ...state, loading: true };
    case types.ADVERTS_SUCCESS:
    case types.ADVERT_DELETED:
    case types.UI_STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const reset = (state = initialState.resReset, action) => {
  switch (action.type) {
    case types.AUTH_RESET_SUCCESS || types.AUTH_UPDATEPASS_SUCCESS:
      // login
      return action.payload;

    case types.AUTH_UPDATEPASS_REQUEST || types.AUTH_RESET_REQUEST:
      // login
      return { ...state };
    default:
      return state;
  }
};

export const user = (state = initialState.user, action) => {
  switch (action.type) {
    case types.USER_EDITED || types.USER_REQUEST || types.USER_EDITED_REQUEST:
      return { ...state, loading: true };
    case types.USER_SUCCESS:
      return action.payload;
    case types.USER_DELETED:
      return action.payload;
    default:
      return state;
  }
};
