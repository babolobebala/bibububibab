<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()
const toast = useToast()

const color = computed(() => colorMode.value === 'dark' ? '#171717' : 'white')
const ssoStatus = computed(() => route.query.sso)
const ssoReason = computed(() => route.query.reason)
const ssoAlert = computed(() => {
  if (ssoStatus.value === 'success') {
    return { color: 'success' as const, title: 'Login SSO berhasil.' }
  }
  if (ssoStatus.value === 'error') {
    if (ssoReason.value === 'satker') {
      return {
        color: 'error' as const,
        title: 'Gagal Login: Akses Ditolak.',
        description: 'Aplikasi ini hanya untuk pegawai BPS sesuai satker yang diizinkan.'
      }
    }
    if (ssoReason.value === 'invalid_state') {
      return { color: 'error' as const,
        title: 'Gagal Login.',
        description: 'invalid_state' }
    }
    if (ssoReason.value === 'token_missing') {
      return { color: 'error' as const,
        title: 'Gagal Login.',
        description: 'token_missing' }
    }
    return { color: 'error' as const,
      title: 'Gagal Login SSO.',
      description: '' }
  }
  return null
})

watch(
  () => route.query.sso,
  () => {
    if (!import.meta.client) return
    if (!ssoAlert.value) return

    toast.add({
      title: ssoAlert.value.title,
      description: ssoAlert.value.description,
      icon: 'i-lucide-key-round',
      color: ssoAlert.value.color,
      duration: 6000
    })
  },
  { immediate: true }
)

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
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
