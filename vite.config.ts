import { defineConfig } from "vite";
export default defineConfig({
  root: "app",
  base: "/portfolio/",
  publicDir: false,
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "bundles",
    target: "es2020",
  },
});
