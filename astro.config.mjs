// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://acmcsufoss.github.io",
  base: "1st",
  integrations: [svelte()],
});