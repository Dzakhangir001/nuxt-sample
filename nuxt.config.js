export default {
  mode: 'universal',
  target: 'static',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://player.twitch.tv/js/embed/v1.js'
      }
    ]
  },
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'swiper/swiper-bundle.min.css',
    'assets/main.scss'
  ],
  plugins: [
    '~plugins/globalComponents',
    {
      src: '~plugins/velocity',
      ssr: false
    }
  ],
  publicRuntimeConfig: {
    api_url: 'https://fazeweb.fazeclan.com',
    domain: 'staging.x420.fazeclan.com',
    shop_url: 'https://fazeclan.com'
  },
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
  ],
  loading: '~/components/loader.vue'
}
