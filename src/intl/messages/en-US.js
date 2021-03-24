import { LOCALES } from '../constants';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Divider } from 'antd';

export default {
  [LOCALES.ENGLISH]: {
    advertsPage: {
      title: 'Adverts Page',
      pNoAdverts: 'No ads loaded, please, refine your search or create one!',
      pNoMoreAdverts:
        'No more ads to load, please, please, refine your search or create one!',
      byTags: 'By tags',
      byPrice: 'By price',
      byName: 'By name',
      byType: 'By type',
      bySort: 'By sort',
      search: 'Search',
      phNameData: 'Name',
      phTags: 'Select Tags',
      createOne: 'Go create one!',
    },
    advertsList: {
      title: 'Adverts List',
      haveAccount: 'Have an account?',
      logAndCreateBtn: 'Go login and create one!',
      regAndCreateBtn: 'Go register and create one!',
      member: 'You are not a member yet?',
    },
    /* 'no-more-adverts': '{noMoreMsg}', */

    createAdvert: {
      title: 'Create an advert',
    },
    advert: {
      price: 'Price',
      priceWithNumber: 'Price: {price} €',
      description: 'Description',
      state: 'Actual state',
      changeState: 'Change state',
      reserved: 'Reserved',
      sold: 'Sold',
      seller: 'Seller',
      detail: {
        title: 'Detail of your advert',
        removeFavorite: 'Remove favorite',
        addFavorite: 'Add Favorite',
        hasNFavorites: '{favorites} Favorites',
      },
      editAdvertBtn: 'Edit Advert',
      deleteAdvertBtn: 'Delete Advert',
      titleEdit: 'Edit the advert',
      advancedOptions: {
        title: 'Advanced options',
      },
    },
    advertsForm: {
      formName: 'Name',
      formPrice: 'Price',
      formType: 'Type',
      formDesc: 'Description',
      formImage: 'Image',
      formSelectFile: 'Select File',
      createBtn: 'Create',
      updateBtn: 'Update',
    },
    registerPage: {
      title: 'Register',
      registerName: 'Name',
      surname: 'Surname',
      username: 'Username',
      password: 'Password',
      confirmPass: 'Confirm Password',
      registerBtn: 'Register',
      checkbox: ' I have read the',
      agreement: 'agreement',
    },
    userPage: {},
    advertsCard: {
      sell: 'Sell',
      buy: 'Buy',
      all: 'All',
    },
    loginPage: {
      title: 'Log-in to your account',
      username: 'Username',
      password: 'Password',
      rememberMe: 'Remember me',
      register: 'Register now, its free!',
      account: 'You do not have an account yet?',
      forgotPass: 'Forgot Password',
      loginBtn: 'Login',
    },
    userProfile: {
      title: 'User Profile',
      showUserAdsBtn: 'Show User Adverts',
      showFavAdsBtn: 'Show User Favorites',
      edit: 'Edit',
      delete: 'Delete',
    },
    editUser: {
      title: 'Edit User',
      editName: 'Name',
      editSurname: 'Surname',
      editUser: 'Username',
      wrongEmail: 'The input is not valid E-mail!',
      updateBtn: 'Update',
    },
    'subscribe-invite': 'Sure, {name}. I will subscribe your channel!',
    menu: {
      home: 'Home',
      adverts: 'Adverts',
      createAdvert: 'Create advert',
      editAdvert: 'Edit advert',
      myProfile: 'My profile',
      register: 'Register',
      login: 'Login',
      logout: 'Logout',
      langs: 'Change Language',
    },
    ui: {
      loading: 'Loading...',
    },
    global: {
      share: 'Share',
    },
    richTextEx: 'I have <bold>{num, plural, one {# dog} other {# dogs}}</bold>',
    deleteModal: {
      title: 'Are you sure delete the user account?',
      content:
        "This action can't be reversed. Your adverts will be deleted aswell.",
      okText: 'Yes, delete this user account',
      cancelText: 'Cancel',
    },
    buttonProfile: {
      showAdverts: 'Show User Adverts',
      showFavorite: 'Show User Favorites',
      edit: 'Edit',
      delete: 'Delete',
    },
    profile: {
      name: 'Name',
      username: 'Username',
      profileUser: 'User Profile',
      title: 'My Profile',
    },
    buttonAdvert: {
      nothing: 'Nothing',
      sold: 'Sold',
      reserved: 'Reserved',
      edit: 'Edit Advert',
      delete: 'Delete Advert',
      showAdvancedOptions: {
        title: 'Show advanced options',
        close: 'Close',
      },
      changeState: {
        title: 'Change state',
      },
    },
    formForgot: {
      title: 'Forgot-Password',
      titleReset: 'Reset-Password',
      btnReset: 'Reset Password',
      iPass: 'Password',
      iPassConfirm: 'Password Confirm',
      btnUpdate: 'Update Password',
    },
  },
};
