<template>
  <nuxt-img :src="src">
    <slot />
  </nuxt-img>
</template>

<script setup lang="ts">
export interface ImageProps {
  src: string;
}

const props = defineProps<ImageProps>();
const { src } = toRefs(props);
</script>
