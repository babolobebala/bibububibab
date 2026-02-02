<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch('/api/auth/me')

const prettyJson = computed(() => {
  const user = data.value?.user
  return user ? JSON.stringify(user, null, 2) : ''
})

useSeoMeta({
  title: 'Main Menu'
})
</script>

<template>
  <UContainer class="py-10">
    <UPageHeader
      title="Main Menu"
      description="Data session SSO yang valid."
    />

    <UCard class="mt-6">
      <div class="flex items-center justify-between gap-4">
        <div class="text-sm text-muted">
          Endpoint: <code>/api/auth/me</code>
        </div>
        <UButton
          size="sm"
          variant="soft"
          :loading="pending"
          @click="refresh"
        >
          Refresh
        </UButton>
      </div>

      <UAlert
        v-if="error"
        class="mt-4"
        color="red"
        variant="soft"
        title="Gagal memuat session."
      />

      <UAlert
        v-else-if="!data?.user && !pending"
        class="mt-4"
        color="yellow"
        variant="soft"
        title="Belum login SSO."
      />

      <UTextarea
        v-else
        class="mt-4 font-mono text-xs"
        :model-value="prettyJson"
        rows="14"
        readonly
      />
    </UCard>
  </UContainer>
</template>
