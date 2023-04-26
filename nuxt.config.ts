import manifestJson from './lib/uniform/contextManifest.json'
import type { ManifestV2 } from '@uniformdev/context'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'operation-turbo-2023',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },



  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-fonts',
    '@uniformdev/uniform-nuxt',
    '@nuxtjs/plausible',
    '@nuxt/image-edge',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  image: {
    domains: [
      'i.ytimg.com',
      'ytimg.com',
      'res.cloudinary.com',
      'cloudinary.com',
      'amazonaws.com',
      's3.amazonaws.com',
      'dev-to-uploads.s3.amazonaws.com',
    ],
  },
  runtimeConfig: {
    public: {
      uniformApikey: process.env.UNIFORM_API_KEY || null,
      uniformProjectId: process.env.UNIFORM_PROJECT_ID || null,
      uniformApiHost: process.env.UNIFORM_CLI_BASE_URL || null,
      uniformProjectMapId: process.env.UNIFORM_PROJECT_MAP_ID || null,
    },
    // storyblokToken:process.env.STORYBLOK_TOKEN || null
  },
  uniform: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    readOnlyApiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    outputType: process.env.OUTPUT_TYPE,
    manifest: manifestJson as ManifestV2,
    defaultConsent: true,
    // If you prefer to have full control over your Uniform Context instance:
    // uniformContextPath: './path-to-my-uniform-context-instance',
  },

  plausible: {
    domain: 'timbenniks.dev',
  },
  googleFonts: {
    subsets: 'latin',
    useStylesheet:true,
    preconnect:true,
    preload:true,
    families: {
      Lato: [400, 700],
    },
  },
})
