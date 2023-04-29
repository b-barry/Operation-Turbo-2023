<template>
  <template v-if="!type || type === 'video'">
    <div
      :class="
        _classStringToObject(
          ` flex flex-col mb-4 ${
            component?.variant ? 'md:flex-row' : 'flex-col'
          }`
        )
      "
    >
      <div
        :class="
          _classStringToObject(
            `relative w-full ${
              component?.variant ? 'md:mr-4 md:w-60' : 'w-full'
            } ${!media ? 'aspect-[16/9] mb-0' : 'mb-4'}`
          )
        "
      >
        <link-lite
          target="_blank"
          rel="noopener noreferrer"
          :title="title"
          :href="`https://youtube.com/watch?v=${identifier}`"
        >
          <template v-if="media">
            <card-image-lite
              :alt="title"
              :src="media"
              :component="component"
            ></card-image-lite>
          </template>

          <template v-else>
            <div class="w-full h-full rounded-lg bg-white bg-opacity-10"></div>
          </template>

          <span class="play"></span>
        </link-lite>
      </div>
      <div
        :class="
          _classStringToObject(
            `w-full ${
              component?.variant ? 'md:w-[calc(100%-15rem)]' : 'w-full'
            }`
          )
        "
      >
        <link-lite
          target="_blank"
          rel="noopener noreferrer"
          :title="title"
          :href="`https://youtube.com/watch?v=${identifier}`"
        >
          <template v-if="title">
            <card-title-lite :title="title"></card-title-lite>
          </template>

          <template v-else>
            <div
              class="w-full rounded-lg bg-white bg-opacity-10 mt-4 py-3"
            ></div>
          </template>
        </link-lite>

        <template v-if="description && component.variant">
          <card-description-lite
            :description="description"
          ></card-description-lite>
        </template>

        <template v-if="!description && component.variant">
          <div class="w-3/4 rounded-lg bg-white bg-opacity-10 py-3 mt-4"></div>
        </template>
      </div>
    </div>
  </template>

  <template v-if="type === 'blog'">
    <card-blog-lite
      :component="component"
      :title="title"
      :identifier="identifier"
      :when="media"
      :day="day"
      :date="date"
      :month="month"
      :year="year"
    ></card-blog-lite>
  </template>

  <template v-if="type === 'talk'">
    <div class="flex flex-row">
      <div class="w-20 mr-4">
        <card-date-lite
          :date="date"
          :day="day"
          :month="month"
          :year="year"
        ></card-date-lite>
      </div>
      <div
        :class="
          _classStringToObject(
            `${component?.variant ? 'w-full md:w-[calc(100%-5rem)]' : 'w-full'}`
          )
        "
      >
        <template
          v-if="upcoming || (date && !isDateBeforeToday(new Date(date)))"
        >
          <p class="inline-block font-bold text-lg uppercase fancy-title">
            upcoming
          </p>
        </template>

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
            <div
              class="w-full rounded-lg bg-white bg-opacity-10 mt-4 py-3"
            ></div>
          </template>
        </link-lite>

        <template v-if="description">
          <card-description-lite
            :description="description"
          ></card-description-lite>
        </template>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type CardProps = ComponentProps<{
  identifier: string;
  type: string;
  title: string;
  description: string;
  date: string;
  media: string;
  day: string;
  month: string;
  year: string;
  upcoming: boolean;
  component: {
    variant?: string;
  };
}>;

import { ComponentProps } from "./uniform.type";
import CardImageLite from "./card-image.vue";
import LinkLite from "./link.vue";
import CardTitleLite from "./card-title.vue";
import CardDescriptionLite from "./card-description.vue";
import CardBlogLite from "./card-blog.vue";
import { isDateBeforeToday } from "./helpers";
import CardDateLite from "./card-date.vue";

export default defineComponent({
  name: "card-lite",
  components: {
    LinkLite: LinkLite,
    CardImageLite: CardImageLite,
    CardTitleLite: CardTitleLite,
    CardDescriptionLite: CardDescriptionLite,
    CardBlogLite: CardBlogLite,
    CardDateLite: CardDateLite,
  },
  props: [
    "type",
    "component",
    "media",
    "title",
    "identifier",
    "description",
    "day",
    "date",
    "month",
    "year",
    "upcoming",
  ],

  data() {
    return { isDateBeforeToday };
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