<template>
  <p class="line-clamp-2">{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type CardProps = ComponentProps<{
  description: string;
}>;

import { ComponentProps } from "./uniform.type";

export default defineComponent({
  name: "card-description-lite",

  props: ["description"],
});
</script>