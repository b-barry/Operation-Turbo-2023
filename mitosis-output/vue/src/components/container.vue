<template>
  <div :style="backgroundStyle" :class="_classStringToObject(className)">
    <div class="max-w-[1400px] mx-auto">
      <uniform-slot name="content"></uniform-slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type ContainerProps = ComponentProps<{
  label: string;
  background: string;
  component: {
    variant?: string;
  };
}>;

import { ComponentProps } from "./uniform.type";
import UniformSlot from "./slot-uniform.vue";

export default defineComponent({
  name: "container-lite",
  components: { UniformSlot: UniformSlot },
  props: ["background", "component"],

  computed: {
    backgroundStyle() {
      return {
        background: this.background ? this.background : "#0F223E",
      };
    },
    className() {
      return `${
        this.component?.variant
          ? "w-full py-12 mb-12"
          : "max-w-[1400px] mx-auto"
      }`;
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