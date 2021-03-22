import { LOCALES } from '../constants';

export default {
  [LOCALES.SPANISH]: {
    advertsPage: {
      title: 'Página de anuncios',
      pNoAdverts: 'No hay anuncios cargados, ¡refine su búsqueda o cree una!',
      byTags: 'Tags',
      byPrice: 'Precio',
      byName: 'Nombre',
      byType: 'Tipo',
      bySort: 'Orden',
      search: 'Buscar',
      phName: 'Nombre',
      phTags: 'Selecciona Tags',
      createOne: 'Crea tu anuncio!',
    },
    advertsList: {
      title: 'Lista de Anuncios',
      haveAccount: 'Tienes una cuenta?',
      logAndCreateBtn: 'Inicia sesión y crea tu anuncio!',
      regAndCreateBtn: 'Regístrate y crea tu anuncio!',
      member: 'Aún no eres miembro?',
    },
    createAdvert: {
      title: 'Crear un anuncio',
    },
    advert: {
      description: 'Descripción',
      state: 'Estado actual',
      changeState: 'Cambiar estado',
      reserved: 'Reservado',
      sold: 'Vendido',
      seller: 'Vendedor',
      detail: {
        title: 'Detalle del anuncio',
        removeFavorite: 'Quitar favorito',
        addFavorite: 'Añadir favorito',
      },
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
      sell: 'Venta',
      buy: 'Compra',
      all: 'Todo'
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
    richTextEx: 'I have <bold>{num, plural, one {# dog} other {# dogs}}</bold>',
    deleteModal: {
      title: '¿Está seguro que desea borrar la cuenta?',
      content:
          "Esta acción no es reversible. Si borra el usuario dejará también borrará sus anuncios.",
      okText: 'Si, estoy seguro',
      cancelText: 'Cancelar',
    },
    buttonProfile: {
      showAdverts: 'Mostrar Anuncios Usuario',
      showFavorite: 'Mostrar Favoritos',
      edit: 'Editar',
      delete: 'Borrar'
    },
    profile: {
      name: 'Nombre',
      username: 'Usuario',
      profileUser: 'Perfil Usuario',
      title: 'Mi Perfil'
    },
    buttonAdvert: {
      nothing: 'Nada',
      sold: 'Vendido',
      reserved: 'Reservado',
      edit: 'Editar Anuncio',
      delete: 'Borrar Anuncio'
    },
  },
};
