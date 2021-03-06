module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'mononuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Env
   */
  env: {
    pages: {
      it: {
        contatti: 'contatti',
        progetti: 'progetti',
        chiSiamo: 'chi-siamo'
      },
      en: {
        contacts: 'contacts',
        about: 'about',
        projects: 'projects'
      }
    }
  },
  /*
   ** Plugins
   */
  plugins: [
    { src: '~plugins/vue-lazyload', ssr: false },
    { src: '~plugins/pixiPlugins', ssr: false },
    { src: '~/plugins/ksvuescrollmagic', ssr: false },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/eventBus', ssr: false }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'red' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['vue-i18n']
  },
  router: {
    middleware: 'i18n'
  }
}
