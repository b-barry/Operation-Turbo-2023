<template>
  <template v-if="content">
    <article
      v-html="content?.rteValue"
      :class="
        _classStringToObject(
          `rich-text text-xl mb-4 ${component.variant ? 'p-8' : 'p-0'}`
        )
      "
    ></article>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type RichTextProps = ComponentProps<{
  content: {
    rteValue: string;
  };
  component: {
    variant?: string;
  };
}>;

import { ComponentProps } from "./uniform.type";

export default defineComponent({
  name: "rich-text-lite",

  props: ["content", "component"],

  computed: {
    html() {
      return {
        __html: this.content?.rteValue,
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