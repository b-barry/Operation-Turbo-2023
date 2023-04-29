<template>
  <div :class="_classStringToObject(`${bottomMargin ? 'mb-6' : 'mb-auto'} `)">
    <component
      :class="
        _classStringToObject(
          `${size} title flowing-title leading-mobiletitle md:leading-title`
        )
      "
      :is="tag"
    >
      {{ text }}
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type TitleProps = ComponentProps<{
  text: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  bottomMargin: boolean;
  component: {
    variant?: string;
  };
}>;

import { ComponentProps } from "./uniform.type";

export default defineComponent({
  name: "title-lite",

  props: ["type", "component", "bottomMargin", "text"],

  data() {
    return { tag: this.type || "h1" };
  },

  computed: {
    size() {
      let sizeClass = "text-3xl md:text-7xl";
      switch (this.component.variant) {
        case "large":
          sizeClass = "text-3xl md:text-6xl";
          break;
        case "medium":
          sizeClass = "text-3xl md:text-5xl";
          break;
        case "small":
          sizeClass = "text-3xl";
          break;
        default:
          sizeClass = "text-3xl md:text-6xl";
          break;
      }
      return sizeClass;
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