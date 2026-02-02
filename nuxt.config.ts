// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    bps: {
      authUrl: process.env.BPS_AUTH_URL,
      realm: process.env.BPS_REALM,
      clientId: process.env.BPS_CLIENT_ID,
      clientSecret: process.env.BPS_CLIENT_SECRET,
      redirect: process.env.BPS_REDIRECT,
      scope: process.env.BPS_SCOPE || 'profile-pegawai,email',
      cookieName: process.env.BPS_COOKIE_NAME || 'bps_session',
      allowedSatker: process.env.BPS_ALLOWED_SATKER || '5207',
      bypassEnabled: process.env.BPS_BYPASS === 'true'
    },
    public: {
      keyApi: process.env.KEYAPI
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content'
  ],

  devtools: {
    enabled: true
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: [
        '/landing-page'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
