<template>
  <header class="fixed w-full top-0 bg-[#091A32] bg-opacity-70 z-20">
    <div
      class="mx-auto relative flex h-20 max-w-7xl items-center justify-start px-8 xl:px-0"
    >
      <button
        class="relative h-12 w-12 bg-white md:hidden"
        @click="toggleOpen()"
      >
        <span class="sr-only">Open main menu</span>
        <div
          class="absolute left-1/2 top-1/2 block w-6 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <span
            :class="
              _classStringToObject(
                `absolute block h-0.5 w-6 transform bg-black transition duration-500 ease-in-out ${
                  open ? 'rotate-45' : '-translate-y-1.5'
                }`
              )
            "
          ></span>
          <span
            :class="
              _classStringToObject(
                `absolute block h-0.5 w-6 transform bg-black transition duration-500 ease-in-out ${
                  open ? 'opacity-0' : ''
                }`
              )
            "
          ></span>
          <span
            :class="
              _classStringToObject(
                `absolute block h-0.5 w-6 transform bg-black transition duration-500 ease-in-out ${
                  open ? '-rotate-45' : 'translate-y-1.5'
                }`
              )
            "
          ></span>
        </div>
      </button>

      <ul
        :class="
          _classStringToObject(
            `items-center md:space-x-6 text-sm md:flex  ${
              open
                ? 'absolute top-20 left-0 flex w-full flex-col bg-black p-4'
                : 'hidden'
            }`
          )
        "
      >
        <li
          key="home"
          :class="
            _classStringToObject(open ? 'py-4 text-xl' : 'p-auto text-sm')
          "
        >
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
        <template :key="node.name" v-for="(node, index) in navItems">
          <li
            :class="
              _classStringToObject(open ? 'py-4 text-xl' : 'p-auto text-sm')
            "
          >
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
      <div class="absolute right-8 top-2 w-[70px] h-[70px]">
        <logo></logo>
      </div>
    </div>
  </header>
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
import Logo from "./logo.vue";

export default defineComponent({
  name: "header-lite",
  components: { LinkAnchor: LinkAnchor, Logo: Logo },
  props: ["nodes"],

  data() {
    return { open: false };
  },

  computed: {
    navItems() {
      return this.nodes.filter((node) => node.path !== "/");
    },
    path() {
      return useRouterPath();
    },
  },

  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
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