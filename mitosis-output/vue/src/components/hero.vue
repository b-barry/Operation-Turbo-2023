<template>
  <div
    :class="
      _classStringToObject(
        `hero relative md:aspect-[1400/600] overflow-hidden mt-20 md:mt-auto ${
          spaceBelow ? 'mb-16' : ''
        } `
      )
    "
  >
    <template v-if="image && image?.src">
      <div class="aspect-[1400/600] md:aspect-auto">
        <cld-image
          loading="eager"
          class="static md:absolute left-0 top-0 object-cover aspect-[1400/600]"
          :width="image?.width"
          :height="image?.height"
          :src="image?.src"
          :alt="image?.alt || ''"
          :rawTransformations="[image?.transformation]"
          :sizes="sizes"
        ></cld-image>
      </div>
    </template>

    <template v-else>
      <div class="w-full h-full absolute top-0 left-0">
        <div class="w-full h-full rounded-lg bg-white bg-opacity-10"></div>
      </div>
    </template>

    <article
      :class="
        _classStringToObject(`static m-4 md:m-0 md:absolute ${
          textAlignment === 'right' ? 'md:text-right' : ''
        } ${!textAlignment || textAlignment === 'left' ? 'md:text-left' : ''} ${
          textAlignment === 'center' ? 'md:text-center' : ''
        } ${copyLocation === 'right' ? 'right-12' : 'left-12'}
      ${verticalAlignment === 'top' ? 'top-12' : ''} ${
          verticalAlignment === 'bottom' ? 'bottom-12' : ''
        } ${
          !verticalAlignment || verticalAlignment === 'middle'
            ? 'top-2/4 md:-translate-y-2/4'
            : ''
        }`)
      "
    >
      <uniform-slot-lite name="title"></uniform-slot-lite>
      <uniform-slot-lite name="description"></uniform-slot-lite>
      <uniform-slot-lite name="cta"></uniform-slot-lite>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type HeroProps = ComponentProps<{
  image: Image;
  copyLocation: "left" | "right";
  verticalAlignment: "top" | "middle" | "bottom";
  textAlignment: "left" | "center" | "right";
  spaceBelow: boolean;
}>;

import { ComponentProps } from "./uniform.type";
import CldImage from "./cld-image.vue";
import UniformSlotLite from "./slot-uniform.vue";
import { Image } from "./types";
import { TARGET } from "../constants/target";

export default defineComponent({
  name: "hero-lite",
  components: { CldImage: CldImage, UniformSlotLite: UniformSlotLite },
  props: [
    "spaceBelow",
    "image",
    "textAlignment",
    "copyLocation",
    "verticalAlignment",
  ],

  computed: {
    sizes() {
      return TARGET === "react"
        ? "100vw"
        : "sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw";
    },
  },

  methods: {
    _classStringToObject(str) {
      const obj = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
});
</script>