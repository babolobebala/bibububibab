<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()

const color = computed(() => colorMode.value === 'dark' ? '#171717' : 'white')
const ssoStatus = computed(() => route.query.sso)
const ssoReason = computed(() => route.query.reason)
const ssoAlert = computed(() => {
  if (ssoStatus.value === 'success') {
    return { color: 'green', title: 'Login SSO berhasil.' }
  }
  if (ssoStatus.value === 'error') {
    if (ssoReason.value === 'satker') {
      return {
        color: 'red',
        title: 'Akses ditolak.',
        description: 'Aplikasi ini hanya untuk pegawai BPS sesuai satker yang diizinkan.'
      }
    }
    if (ssoReason.value === 'invalid_state') {
      return { color: 'red', title: 'State login tidak valid. Silakan coba lagi.' }
    }
    if (ssoReason.value === 'token_missing') {
      return { color: 'red', title: 'Token tidak ditemukan. Silakan login ulang.' }
    }
    return { color: 'red', title: 'Login SSO gagal. Silakan coba lagi.' }
  }
  return null
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap'
    }
  ],
  htmlAttrs: {
    lang: 'en',
    class: colorMode.value
  }
})

useSeoMeta({
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/landing-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/landing-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <ColorModeScript />
  <UApp :toaster="{ expand: false }">
    <AppHeader />

    <UMain>
      <UContainer
        v-if="ssoAlert"
        class="pt-6"
      >
        <UAlert
          :color="ssoAlert.color"
          variant="soft"
          :title="ssoAlert.title"
          :description="ssoAlert.description"
        />
      </UContainer>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
