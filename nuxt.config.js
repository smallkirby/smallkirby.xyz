import path from 'path';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

export default {
  router: {
    base: '/',
  },
  srcDir: '.',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    base: {
      href: 'router.base',
    },
    title: 'smallkirby.xyz',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      {
        hid: 'description',
        name: 'description',
        content: 'Make Nirugiri Greater...',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'smallkirby.xyz',
      },
      {
        hid: 'og:type',
        property: 'og:site_name',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:site_name',
        content: 'https://smallkirby.xyz',
      },
      {
        hid: 'og:title',
        property: 'og:site_name',
        content: 'smallkirby.xyz',
      },
      {
        hid: 'og:description',
        property: 'og:site_name',
        content: 'Make Nirugiri Greater...',
      },
      {
        hid: 'og:image',
        property: 'og:site_name',
        content: 'https://smallkirby.xyz/image/simple-transparent.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/css/default.scss',
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
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    plugins: [
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, 'wasm/tetris'),
        watchDirectories: [
          path.resolve(__dirname, 'wasm/tetris'),
        ],
        args: '--log-level info',
        outDir: 'pkg',
        outName: 'index',
      }),
    ],
  },

  axios: {
    baseURL: (process.env.NODE_ENV === 'production' ? 'https://smallkirby.xyz' : 'http://localhost:3000'),
  },

  serverMiddleware: [
    {
      path: '/api',
      handle: '~/serverMiddleware/api/sleeps.ts',
    },
    {
      path: '/hooks',
      handle: '~/serverMiddleware/hooks/github.ts',
    },
  ],
};
