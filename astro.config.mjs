import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    tailwind(),
  ],
  site: "https://ogmer.netlify.app",
  output: "static",
  build: {
    assets: "assets",
  },
  vite: {
    ssr: {
      noExternal: ["framer-motion"],
    },
  },
  devToolbar: {
    enabled: false,
  },
});
