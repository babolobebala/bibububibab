// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vite-pwa/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },
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
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'SAKU BPS KSB',
      short_name: 'SAKU',
      description: 'Satu Aplikasi untuk Kinerja Unggul',
      theme_color: '#4A90E2',
      icons: [
        {
          src: '/pwa-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://suka.bpsksb.id/.*',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 86400
            }
          }
        }
      ]
    }
  }
})
