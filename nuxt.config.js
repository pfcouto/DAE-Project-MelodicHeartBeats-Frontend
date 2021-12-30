export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'projetoDAE-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    // cookies
    '@nuxtjs/auth'
  ],

  bootstrapVue: {
    icons: true
  },

  axios: {
    // proxy: true,
    // credentials: true
    baseURL: 'http://18.170.87.123:8080/projetoDAE'
  },

  ssr: false,
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    watchLoggedIn: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'http://18.170.87.123:8080/projetoDAE/api/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: 'http://18.170.87.123:8080/projetoDAE/api/auth/user',
            method: 'get',
            propertyName: ''
          }
        }
        // tokenRequired: true, -> default
        // tokenType: 'bearer' -> default
      }
    }
  },
  router: {
    middleware: ['auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  proxy: {
    '/api/': {
      target: 'http://18.170.87.123:8080/projetoDAE/api/',
      pathRewrite: {
        '^/api/': ''
      }
    }
  },
  toast: {
    position: 'top-center',
    defaultProps: {
      timeout: 3
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
