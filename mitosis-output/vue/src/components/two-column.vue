<template>
  <div
    :class="
      _classStringToObject(
        `row-component flex flex-col md:flex-row ${spaceBelow ? 'mb-12' : ''}`
      )
    "
  >
    <div
      :class="
        _classStringToObject(`w-full mb-8 md:mb-0 md:pr-12 ${position.sideA}`)
      "
    >
      <uniform-slot name="sideA"></uniform-slot>
    </div>
    <div :class="_classStringToObject(`w-full ${position.sideB}`)">
      <uniform-slot name="sideB"></uniform-slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type TwoColumnProps = ComponentProps<{
  layout: "1-1" | "1-2" | "2-1";
  spaceBelow: boolean;
}>;

import { ComponentProps } from "./uniform.type";
import UniformSlot from "./slot-uniform.vue";

export default defineComponent({
  name: "two-column-lite",
  components: { UniformSlot: UniformSlot },
  props: ["layout", "spaceBelow"],

  computed: {
    position() {
      let sideA = "";
      let sideB = "";
      switch (this.layout) {
        case "1-1":
          sideA = "md:w-2/4";
          sideB = "md:w-2/4";
          break;
        case "1-2":
          sideA = "md:w-2/5";
          sideB = "md:w-3/5";
          break;
        case "2-1":
          sideA = "md:w-3/5";
          sideB = "md:w-2/5";
          break;
      }
      return {
        sideA,
        sideB,
      };
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