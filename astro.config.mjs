import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), tailwind({
    // Example: Disable injecting a basic `base.css` import on every page.
    // Useful if you need to define and/or import your own custom `base.css`.
    config: {
      applyBaseStyles: false
    }
  }), image(), vue()],
  vite: {
    optimizeDeps: {
      exclude: ['fsevents', 'gulp-sourcemaps']
    }
  }
});