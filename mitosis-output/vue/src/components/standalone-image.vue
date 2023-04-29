<template>
  <template v-if="image && image[0]?.publicId">
    <cld-image
      loading="eager"
      sizes="100vw"
      :width="image[0]?.width"
      :height="image[0]?.height"
      :src="image[0]?.publicId"
      :alt="image[0]?.alt || title"
      :rawTransformations="[image[0]?.transformation]"
      :class="
        _classStringToObject(
          `object-cover fancy-image ${spaceBelow ? 'mb-8' : ''}`
        )
      "
    ></cld-image>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type StandAloneImageProps = ComponentProps<{
  image: Image[];
  title: string;
  spaceBelow: string;
}>;

import { Image } from "../../lib/types";
import { ComponentProps } from "./uniform.type";
import CldImage from "./cld-image.vue";

export default defineComponent({
  name: "standalone-image-lite",
  components: { CldImage: CldImage },
  props: ["image", "title", "spaceBelow"],

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