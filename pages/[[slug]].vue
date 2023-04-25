<template>
  <main>
    <Head>
      <title v-html="title?.value as string || 'Tim Benniks'"></title>
      <meta property="og:title" :content="title?.value as string" />
      <meta name="description" :content="description?.value as string" />
      <meta
        property="og:description"
        :content="description?.value as string"
      />
<!--      <Script-->
<!--        type="application/ld+json">-->
<!--        [{"@context":"http://schema.org","@type":"WebSite","url":"https://timbenniks.dev","name":"Tim Benniks: developer relations, video creator, speaker","alternateName":"Tim Benniks"}]-->
<!--      </Script>-->

      <meta
        property="og:url"
        :content="`https://timbenniks.dev${route.path}`"
      />
      <link
        rel="canonical"
        :href="`https://timbenniks.dev${route.path}`"
      />

      <meta
        name="google-site-verification"
        content="hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20"
      />
      <meta property="og:site_name" content="Tim Benniks" />
      <meta property="og:type" content="website" />

      <meta name="application-name" content="Tim Benniks" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Tim Benniks" />
      <meta
        name="description"
        content="Tim Benniks: developer relations, video creator, speaker"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#0F223E" />

      <link rel="apple-touch-icon" href="/android-chrome-512x512.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <HeaderLite :nodes="[]"/>
    <UniformComposition
      v-if="composition"
      :data="composition"
      :resolve-renderer="resolveRenderer"
      behaviorTracking="onLoad"
    >
      <UniformSlot name="components" />
    </UniformComposition>
    <div v-else>Couldn't fetch the composition: {{ error }}</div>
    <FooterLite :nodes="[]"/>
  </main>
</template>
<script setup lang="ts">
import { resolveRenderer } from '../components/canvasComponents';
import HeaderLite from "~/mitosis-output/vue/src/components/header.vue";
import FooterLite from "~/mitosis-output/vue/src/components/footer.vue";

const route = useRoute();
const slug = `/${route.params.slug ?? ''}`;
const { composition, error } = await useUniformEnhancedComposition({
  projectMapNodePath: slug,
});
const { title, description, image } = composition?.parameters || {};
const variant = composition?.variant || false;

console.log('###composition', slug, JSON.stringify(composition, null, 1));
</script>
