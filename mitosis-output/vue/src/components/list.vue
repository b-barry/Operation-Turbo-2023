<template>
  <div
    :class="
      _classStringToObject(
        `${
          component?.variant !== 'list' || !component?.variant
            ? 'row-component'
            : 'list'
        }`
      )
    "
  >
    <uniform-slot name="title"></uniform-slot>

    <uniform-slot name="description"></uniform-slot>
    <div
      :class="
        _classStringToObject(`mt-4 grid ${moreSpace ? 'gap-12' : 'gap-4'}
      ${
        !component?.variant || component?.variant === 'grid'
          ? `grid-cols-1 ${twoItems ? 'md:grid-cols-2' : 'md:grid-cols-3'}`
          : 'grid-cols-1'
      }`)
      "
    >
      <uniform-slot name="list"></uniform-slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type ListProps = ComponentProps<{
  component: {
    variant?: string;
  };
  moreSpace: boolean;
  twoItems: boolean;
}>;

import { ComponentProps } from "./uniform.type";
import UniformSlot from "./slot-uniform.vue";

export default defineComponent({
  name: "list-lite",
  components: { UniformSlot: UniformSlot },
  props: ["component", "moreSpace", "twoItems"],

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