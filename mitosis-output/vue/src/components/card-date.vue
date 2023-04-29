<template>
  <div class="date-field fancy-image bg-black">
    <div class="item-date">
      <div
        class="date-wrap py-2 px-4 text-white uppercase text-center font-black"
      >
        <span class="block leading-none text-4xl pb-1">{{ dayValue }}</span>
        <span class="block leading-none text-lg pb-1 uppercase">
          {{ monthValue }}
        </span>
        <span class="block leading-none text-lg pb-1">{{ yearValue }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type CardProps = ComponentProps<{
  date: string;
  day: string;
  month: string;
  year: string;
}>;

import { ComponentProps } from "./uniform.type";
import { asDay, asMonth, asYear } from "./helpers";

export default defineComponent({
  name: "card-date-lite",

  props: ["day", "date", "month", "year"],

  computed: {
    dayValue() {
      return this.day || asDay(this.date);
    },
    monthValue() {
      return this.month || asMonth(this.date);
    },
    yearValue() {
      return this.year || asYear(this.date);
    },
  },
});
</script>