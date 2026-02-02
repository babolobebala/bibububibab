<script setup lang="ts">
const config = useRuntimeConfig()

const form = reactive({
  model: 'publication',
  lang: 'ind',
  domain: '5207',
  page: '',
  month: '',
  year: '',
  keyword: '',
  key: config.public.keyApi || ''
})

const baseUrl = 'https://webapi.bps.go.id/v1/api/list'
const output = ref('')
const pending = ref(false)
const errorMessage = ref('')

const requestUrl = computed(() => {
  const segments = [
    ['model', form.model],
    ['lang', form.lang],
    ['domain', form.domain],
    ['page', form.page],
    ['month', form.month],
    ['year', form.year],
    ['keyword', form.keyword],
    ['key', form.key]
  ]

  const path = segments
    .filter(([, value]) => value !== '')
    .map(([label, value]) => `${label}/${encodeURIComponent(String(value))}`)
    .join('/')

  return path ? `${baseUrl}/${path}` : baseUrl
})

const sendRequest = async () => {
  errorMessage.value = ''
  output.value = ''

  if (!form.key) {
    errorMessage.value = 'KEYAPI belum diisi.'
    return
  }

  pending.value = true
  try {
    const data = await $fetch(requestUrl.value)
    output.value = JSON.stringify(data, null, 2)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorMessage.value = error?.message || 'Request gagal.'
  } finally {
    pending.value = false
  }
}

useSeoMeta({
  title: 'Contoh API BPS'
})
</script>

<template>
  <UContainer class="py-10">
    <UPageHeader
      title="Contoh Pemanggilan API BPS (List Publication)"
      description="URL menggunakan format slash sesuai dokumentasi BPS."
    />

    <UCard class="mt-6">
      <div class="grid gap-4 md:grid-cols-2">
        <UFormGroup label="model">
          <UInput
            v-model="form.model"
            placeholder="publication"
          />
        </UFormGroup>

        <UFormGroup label="lang">
          <UInput
            v-model="form.lang"
            placeholder="ind"
          />
        </UFormGroup>

        <UFormGroup label="domain">
          <UInput
            v-model="form.domain"
            placeholder="5207"
          />
        </UFormGroup>

        <UFormGroup label="page">
          <UInput
            v-model="form.page"
            placeholder="opsional"
          />
        </UFormGroup>

        <UFormGroup label="month">
          <UInput
            v-model="form.month"
            placeholder="opsional"
          />
        </UFormGroup>

        <UFormGroup label="year">
          <UInput
            v-model="form.year"
            placeholder="opsional"
          />
        </UFormGroup>

        <UFormGroup label="keyword">
          <UInput
            v-model="form.keyword"
            placeholder="opsional"
          />
        </UFormGroup>
      </div>

      <div class="mt-4">
        <UFormGroup label="key">
          <UInput
            v-model="form.key"
            placeholder="diambil dari ENV.KEYAPI"
          />
        </UFormGroup>
      </div>

      <div class="mt-6 flex flex-wrap gap-2">
        <UButton
          color="primary"
          :loading="pending"
          @click="sendRequest"
        >
          Send
        </UButton>
        <span class="text-xs text-muted mt-1">
          Request URL: <code>{{ requestUrl }}</code>
        </span>
      </div>

      <UAlert
        v-if="errorMessage"
        class="mt-4"
        color="error"
        variant="soft"
        :title="errorMessage"
      />
    </UCard>

    <div class="mt-8">
      <div class="text-sm font-medium mb-2">
        Output
      </div>
      <UTextarea
        :model-value="output"
        :rows="14"
        readonly
        placeholder="Output akan muncul di sini..."
      />
    </div>
  </UContainer>
</template>
