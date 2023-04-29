<template>
  <footer class="w-full bg-[#091A32]">
    <div
      class="flex flex-col lg:flex-row justify-between max-w-[1400px] mx-auto items-center"
    >
      <div class="flex h-auto md:h-36 py-8 md:py-0 justify-start px-8 xl:px-0">
        <ul
          :class="
            _classStringToObject(
              `items-center text-center md:space-x-6 text-sm md:flex`
            )
          "
        >
          <li key="home" class="my-3 md:my-0 text-sm">
            <link-anchor
              title="home"
              href="/"
              :class="
                _classStringToObject(
                  `uppercase font-black text-lg ${
                    path === '/' ? `underline` : `no-underline`
                  }`
                )
              "
            >
              HOME
            </link-anchor>
          </li>
          <template :key="index" v-for="(node, index) in navItems">
            <li class="my-3 text-sm">
              <template v-if="node.path === '/presskit'">
                <a
                  class="uppercase font-black text-lg no-underline"
                  :title="node.name"
                  :href="node.path"
                >
                  {{ node.name }}
                </a>
              </template>

              <template v-else>
                <link-anchor
                  :title="node.name"
                  :href="node.path"
                  :class="_classStringToObject(activeClass(node.path))"
                >
                  {{ node.name }}
                </link-anchor>
              </template>
            </li>
          </template>
        </ul>
      </div>
      <ul class="flex flex-col lg:flex-row lg:mr-8">
        <li class="inline-flex mb-4 lg:mr-8 lg:mb-0 justify-center">
          <icon icon="twitter" url="https://twitter.com/timbenniks"></icon>
          <icon icon="youtube" url="https://youtube.com/timbenniks"></icon>
          <icon icon="github" url="https://github.com/timbenniks"></icon>
          <icon icon="linkedin" url="https://linkedin.com/in/timbenniks"></icon>
        </li>
        <li>
          <a
            href="https://www.buymeacoffee.com/timbenniks"
            target="_blank"
            rel="noopener noreferrer"
            title="Buy Tim Benniks a Coffee"
          >
            <cld-image
              src="bmac_s0znef.png"
              alt="Buy me a coffee"
              loading="lazy"
              sizes="(max-width: 500px) 140px, 300px"
              class="w-52 mb-12 lg:mb-0"
              :width="545"
              :height="153"
            ></cld-image>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type NavLinkLite = {
  name: string;
  path: string;
};
type Props = {
  nodes: NavLinkLite[];
};

import { useRouterPath } from "./router";
import LinkAnchor from "./link.vue";
import Icon from "./icon.vue";
import CldImage from "./cld-image.vue";

export default defineComponent({
  name: "footer-lite",
  components: { LinkAnchor: LinkAnchor, Icon: Icon, CldImage: CldImage },
  props: ["nodes"],

  computed: {
    navItems() {
      return this.nodes.filter((node) => node.path !== "/");
    },
    path() {
      return useRouterPath();
    },
  },

  methods: {
    activeClass(p) {
      return `uppercase font-black text-lg ${
        this.path === p ? "underline" : "no-underline"
      }`;
    },
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