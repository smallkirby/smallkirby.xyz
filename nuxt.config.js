export default {
  mode: 'universal',
  router: {
    base: '/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    base: {
      href: 'router.base'
    },
    title: 'smallkirby.xyz',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      {
        hid: 'description',
        name: 'description',
        content: 'Make Nirugiri Greater...'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name', content:'smallkirby.xyz'
      },
      {
        hid: 'og:type',
        property: 'og:site_name', content:'website'
      },
      {
        hid: 'og:url',
        property: 'og:site_name', content:'https://smallkirby.xyz'
      },
      {
        hid: 'og:title',
        property: 'og:site_name', content:'smallkirby.xyz'
      },
      {
        hid: 'og:description',
        property: 'og:site_name', content:'Make Nirugiri Greater...'
      },
      {
        hid: 'og:image',
        property: 'og:site_name', content:'https://smallkirby.xyz/image/simple-transparent.png'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
