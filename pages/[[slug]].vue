<template>
  <Head>
    <Title v-html="title?.value as string || 'Tim Benniks'"></Title>
    <Meta property="og:title" :content="title?.value as string" />
    <Meta name="description" :content="description?.value as string" />
    <Meta property="og:description" :content="description?.value as string" />

    <Meta property="og:url" :content="`https://timbenniks.dev${route.path}`" />
    <Link rel="canonical" :href="`https://timbenniks.dev${route.path}`" />

    <Meta
      name="google-site-verification"
      content="hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20"
    />
    <Meta property="og:site_name" content="Tim Benniks" />
    <Meta property="og:type" content="website" />

    <Meta name="application-name" content="Tim Benniks" />
    <Meta name="apple-mobile-web-app-capable" content="yes" />
    <Meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <Meta name="apple-mobile-web-app-title" content="Tim Benniks" />
    <Meta
      name="description"
      content="Tim Benniks: developer relations, video creator, speaker"
    />
    <Meta name="format-detection" content="telephone=no" />
    <Meta name="mobile-web-app-capable" content="yes" />
    <Meta name="theme-color" content="#0F223E" />

    <Link rel="apple-touch-icon" href="/android-chrome-512x512.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <Link rel="manifest" href="/manifest.json" />
  </Head>
  <main>
    <HeaderLite :nodes="nodes" />
    <UniformComposition
      v-if="composition"
      :data="composition"
      :resolve-renderer="resolveRenderer"
      behaviorTracking="onLoad"
    >
      <UniformSlot name="components" />
    </UniformComposition>
    <div v-else>Couldn't fetch the composition: {{ error }}</div>
    <FooterLite :nodes="nodes" />
  </main>
</template>
<script setup lang="ts">
import { useUniformEnhancedComposition } from '#imports'

import { resolveRenderer } from '../components/canvasComponents'
import HeaderLite from '~/mitosis-output/vue/src/components/header.vue'
import FooterLite from '~/mitosis-output/vue/src/components/footer.vue'

const schema = [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: 'https://timbenniks.dev',
    name: 'Tim Benniks: developer relations, video creator, speaker',
    alternateName: 'Tim Benniks',
  },
]

useServerHead({
  script: [
    { type: 'application/ld+json', children: JSON.stringify(schema, null, 1) },
  ],
})
const route = useRoute()
const slug = `/${route.params.slug ?? ''}`
const { nodes, composition, error } = await useUniformEnhancedComposition({
  projectMapNodePath: slug,
})
const { title, description, image } = composition?.parameters || {}
const variant = composition?.variant || false

console.log('###composition', slug, JSON.stringify(composition, null, 1))
</script>
