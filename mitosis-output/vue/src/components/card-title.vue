<template>
  <h3 class="text-xl mb-2 line-clamp-2 font-black underline">
    {{ title }}
  </h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type CardProps = ComponentProps<{
  title: string;
}>;

import { ComponentProps } from "./uniform.type";

export default defineComponent({
  name: "card-title-lite",

  props: ["title"],
});
</script>