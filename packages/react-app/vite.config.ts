import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { join, resolve } from "path";
import alias from "@rollup/plugin-alias";

const srcRoot = join(__dirname, "src");
const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": resolve(projectRootDir, "src"),
      process: "process/browser",
      util: "util",
    },
  },
  plugins: [alias(), react()],
  build: {
    // outDir: join(srcRoot, "/out"),
    outDir: join(srcRoot, "/build"),
    emptyOutDir: true,
    rollupOptions: {},
  },
});
