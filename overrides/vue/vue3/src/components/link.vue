<template>
  <a :to="href">
    <slot />
  </a>
</template>

<script setup lang="ts">
import {toRefs} from "vue";

export interface LinkProps {
  href: string;
}

const props = defineProps<LinkProps>();
const { href } = toRefs(props);
</script>
