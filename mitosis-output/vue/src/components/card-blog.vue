<template>
  <div
    :class="
      _classStringToObject(
        ` flex flex-col mb-4 ${component?.variant ? 'md:flex-row' : 'flex-col'}`
      )
    "
  >
    <div
      :class="
        _classStringToObject(
          `relative w-full ${
            component?.variant ? 'md:mr-4 md:w-60' : 'mb-4 w-full'
          }`
        )
      "
    >
      <link-lite
        target="_blank"
        rel="noopener noreferrer"
        :title="title"
        :href="identifier ? identifier : ''"
      >
        <template v-if="when">
          <card-image-lite
            :alt="title"
            :src="when"
            :component="component"
          ></card-image-lite>
        </template>

        <template v-else>
          <div class="w-full h-full rounded-lg bg-white bg-opacity-10"></div>
        </template>
      </link-lite>
    </div>
    <div
      :class="
        _classStringToObject(
          `w-full ${component?.variant ? 'md:w-[calc(100%-15rem)]' : 'w-full'}`
        )
      "
    >
      <link-lite
        target="_blank"
        rel="noopener noreferrer"
        :title="title"
        :href="identifier ? identifier : ''"
      >
        <template v-if="title">
          <card-title-lite :title="title"></card-title-lite>
        </template>

        <template v-else>
          <div class="w-full rounded-lg bg-white bg-opacity-10 mt-4 py-3"></div>
        </template>
      </link-lite>

      <template v-if="component.variant">
        <p class="title flowing-title">{{ dayAndMonth }} {{ yearValue }}</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export interface CardBlogLiteProps {
  component: {
    variant?: string;
  };
  title: string;
  identifier: string;
  when: string;
  day: any;
  date: any;
  month: any;
  year: any;
}

import CardImageLite from "./card-image.vue";
import LinkLite from "./link.vue";
import CardTitleLite from "./card-title.vue";
import { asDay, asMonth, asYear } from "./helpers";

export default defineComponent({
  name: "card-blog-lite",
  components: {
    LinkLite: LinkLite,
    CardImageLite: CardImageLite,
    CardTitleLite: CardTitleLite,
  },
  props: [
    "day",
    "date",
    "month",
    "year",
    "component",
    "title",
    "identifier",
    "when",
  ],

  computed: {
    dayAndMonth() {
      return `${this.day || asDay(this.date)} ${
        this.month || asMonth(this.date)
      }`;
    },
    yearValue() {
      return this.year || asYear(this.date);
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