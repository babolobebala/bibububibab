import { randomBytes } from 'node:crypto'
import { useRuntimeConfig } from '#imports'
import type { H3Event } from 'h3'
import { getRequestURL } from 'h3'

type BpsUser = {
  email?: string
  nama?: string
  username?: string
  nip?: string
  nip_baru?: string
  golongan?: string
  jabatan?: string
  url_foto?: string
  kode_provinsi?: string
  kode_kabupaten?: string
}

type BpsConfig = {
  authUrl: string
  realm: string
  clientId: string
  clientSecret: string
  redirect: string
  scope: string
  cookieName: string
  allowedSatker: string
  bypassEnabled: boolean
}

const trimSlash = (value: string) => value.replace(/\/+$/, '')

export const getBpsConfig = (): BpsConfig => {
  const config = useRuntimeConfig().bps as BpsConfig
  if (!config?.authUrl || !config?.realm || !config?.clientId || !config?.clientSecret || !config?.redirect) {
    throw new Error('Konfigurasi SSO BPS belum lengkap.')
  }
  return config
}

const ensureAuthBase = (value: string) => {
  const trimmed = trimSlash(value)
  return trimmed.endsWith('/auth') ? trimmed : `${trimmed}/auth`
}

export const getBpsEndpoints = (config: BpsConfig) => {
  const base = `${ensureAuthBase(config.authUrl)}/realms/${config.realm}/protocol/openid-connect`
  return {
    authorize: `${base}/auth`,
    token: `${base}/token`,
    userinfo: `${base}/userinfo`
  }
}

export const buildAuthUrl = (event: H3Event, state: string) => {
  const config = getBpsConfig()
  const endpoints = getBpsEndpoints(config)
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: config.redirect,
    scope: config.scope,
    state,
    approval_prompt: 'auto'
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = new URL(getRequestURL(event).toString())
  return `${endpoints.authorize}?${params.toString()}`
}

export const createState = () => randomBytes(16).toString('hex')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapBpsUser = (data: Record<string, any>): BpsUser => ({
  email: data.email || data.preferred_username,
  nama: data.name || data.nama,
  username: data.preferred_username || data.username,
  nip: data.nip || data.nip_lama,
  nip_baru: data.nip_baru || data.nipBaru,
  golongan: data.golongan,
  jabatan: data.jabatan,
  url_foto: data.url_foto || data.foto,
  kode_provinsi: data.kode_provinsi || data.kodeProvinsi,
  kode_kabupaten: data.kode_kabupaten || data.kodeKabupaten
})

export const getSatkerCode = (user: BpsUser) => `${user.kode_provinsi || ''}${user.kode_kabupaten || ''}`
