<template>
  <link-lite
    rel="noopener noreferrer"
    class="cta cta-default"
    :title="text"
    :href="link ? link : externalLink"
    :target="externalLink ? '_blank' : '_self'"
  >
    {{ text }}
  </link-lite>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type CtaProps = ComponentProps<{
  text: string;
  link: any;
  externalLink: string;
}>;

import { ComponentProps } from "./uniform.type";
import LinkLite from "./link.vue";

export default defineComponent({
  name: "cta-lite",
  components: { LinkLite: LinkLite },
  props: ["text", "link", "externalLink"],
});
</script>