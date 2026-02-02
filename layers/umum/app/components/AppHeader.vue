<script setup lang="ts">
import SVGLogo from './SVGLogo.vue'
import SVGText from './SVGText.vue'

const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items = computed(() => [{
  label: 'Layanan BPS',
  to: '#features',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Data Strategis',
  to: '#pricing',
  active: activeHeadings.value.includes('pricing')
}, {
  label: 'Portal Pengaduan',
  to: '#testimonials',
  active: activeHeadings.value.includes('testimonials') && !activeHeadings.value.includes('pricing')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    document.querySelector('#testimonials')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex"
      >
        <SVGLogo class="w-auto h-10" />
        <SVGText class="w-auto h-10" />
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="hidden lg:block"
      />

      <UButton
        label="Login SAKU"
        variant="subtle"
        class="hidden lg:block cursor-pointer"
        to="/api/auth/login"
        external
      />

      <UColorModeButton class="cursor-pointer" />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
      <UButton
        class="mt-4"
        label="Login SAKU"
        variant="subtle"
        block
        to="/api/auth/login"
        external
      />
    </template>
  </UHeader>
</template>
