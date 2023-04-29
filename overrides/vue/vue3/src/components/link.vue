<template>
  <NuxtLink :to="href">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
export interface LinkProps {
  href: string;
}

const props = defineProps<LinkProps>();
const { href } = toRefs(props);
</script>
