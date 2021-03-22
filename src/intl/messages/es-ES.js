import { LOCALES } from '../constants';

export default {
  [LOCALES.SPANISH]: {
    advertsPage: {
      title: 'Página de anuncios',
      pNoAdverts:
        'No hay anuncios cargados, ¡refine su búsqueda o cree un auncio!',
      byTags: 'Tags',
      byPrice: 'Precio',
      byName: 'Nombre',
      byType: 'Tipo',
      bySort: 'Orden',
      search: 'Buscar',
      createOne: 'Crea tu anuncio!',
    },
    advertsList: {
      title: 'Lista de Anuncios',
      haveAccount: 'Tienes una cuenta?',
      logAndCreateBtn: 'Inicia sesión y crea tu anuncio!',
      regAndCreateBtn: 'Regístrate y crea tu anuncio!',
      member: 'Aún no eres miembro?',
    },
    /* 'no-more-adverts': '{noMoreMsg}',*/
    createAdvert: {
      title: 'Crear un anuncio',
    },
    advert: {
      price: 'Precio',
      state: 'Estado actual',
      changeState: 'Cambiar estado',
      reserved: 'Reservado',
      sold: 'Vendido',
      seller: 'Vendedor',
      detail: {
        title: 'Detalle del anuncio',
        removeFavorite: 'Quitar favorito',
        addFavorite: 'Añadir favorito',
        hasNFavorites: 'Favoritos del anuncio',
      },
      editAdvertBtn: 'Editar Anuncio',
      deleteAdvertBtn: 'Borrar Anuncio',
    },
    advertsForm: {
      formName: 'Nombre',
      formPrice: 'Precio',
      formType: 'Tipo',
      formDesc: 'Descripción',
      formImage: 'Imagen',
      formSelectFile: 'Seleccione Archivo',
      createBtn: 'Crear',
    },
    advertsCard: {
      sell: 'Se vende',
      buy: 'Se compra',
    },
    loginPage: {
      title: 'Acceder a su cuenta',
      username: 'Usuario',
      password: 'Contraseña',
      rememberMe: 'Recordar',
      register: 'Regístrate ahora, es gratis!',
      account: '¿Aún no tiene una cuenta?',
      forgotPass: 'Ha olvidado su contraseña?',
      loginBtn: 'Acceder',
    },
    userProfile: {
      title: 'Perfil de Usuario',
      showUserAdsBtn: 'Mostrar Anuncios del Usuario',
      showFavAdsBtn: 'Mostrar Anuncios Favoritos',
      edit: 'Editar',
      delete: 'Eliminar',
    },
    editUser: {
      title: 'Editar Usuario',
      editName: 'Nombre',
      editSurname: 'Apellidos',
      editUser: 'Usuario',
      wrongEmail: 'La entrada de E-mail no es válida',
      updateBtn: 'Actualizar',
    },
    'subscribe-invite': 'Sure, {name}. I will subscribe your channel!',
    menu: {
      home: 'Inicio',
      adverts: 'Anuncios',
      createAdvert: 'Crear anuncio',
      editAdvert: 'Editar anuncio',
      myProfile: 'Mi perfil',
      register: 'Registrarse',
      login: 'Acceder',
      logout: 'Cerrar sesión',
      langs: 'Cambiar idioma',
    },
    ui: {
      loading: 'Cargando...',
    },
    global: {
      share: 'Compartir',
    },
    richTextEx: 'I have <bold>{num, plural, one {# dog} other {# dogs}}</bold>',
  },
};
