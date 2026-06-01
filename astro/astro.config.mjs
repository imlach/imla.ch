// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Custom domain (CNAME → imla.ch), so base stays "/" for both the
// production Pages deploy and the cluster preview served at the root of
// preview.x.imla.ch. No project-pages subpath.
export default defineConfig({
  site: "https://imla.ch",
  integrations: [mdx(), sitemap()],
});
