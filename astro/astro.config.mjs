// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const preview = process.env.SITE_PREVIEW === "true";

// Keep the research board and peer reference assets out of the public build.
/** @returns {import("astro").AstroIntegration} */
function reviewRoutes() {
  return {
    name: "preview-review-routes",
    hooks: {
      "astro:config:setup": ({ command, injectRoute }) => {
        if (command === "dev" || preview) {
          injectRoute({ pattern: "/directions", entrypoint: new URL("./src/review/directions.astro", import.meta.url) });
        }
      },
    },
  };
}

export default defineConfig({
  site: preview ? "https://imla-preview.x.imla.ch" : "https://imla.ch",
  integrations: [mdx(), reviewRoutes(), sitemap({
    filter: (page) => !["/directions/", "/404/", "/404.html"].includes(new URL(page).pathname),
  })],
});
