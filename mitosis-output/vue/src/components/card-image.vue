<template>
  <cld-image
    loading="lazy"
    crop="fill"
    deliveryType="fetch"
    class="fancy-image"
    :width="720"
    :height="405"
    :alt="alt"
    :src="src"
    :sizes="`${
      component?.variant
        ? '400px'
        : `(min-width: ${theme.screens.md}) 33vw, 100vw`
    }`"
  ></cld-image>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export interface CardImageLiteProps {
  alt: string;
  src: string;
  component: {
    variant?: string;
  };
}

import CldImage from "./cld-image.vue";
import theme from "tailwindcss/defaultTheme";
import { TARGET } from "../constants/target";

export default defineComponent({
  name: "card-image-lite",
  components: { CldImage: CldImage },
  props: ["component", "alt", "src"],

  data() {
    return { theme };
  },

  computed: {
    sizes() {
      if (TARGET === "react") {
        return this.component?.variant
          ? "400px"
          : `(min-width: ${theme.screens.md}) 33vw, 100vw`;
      }
      return this.component?.variant
        ? "sm:400px md:400px lg:400px xl:400px xxl:400px 2xl:400px"
        : "sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw";
    },
  },
});
</script>