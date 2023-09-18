import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  server: {
    port: 8080
  },

  plugins: [
    vue({}),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts",
      vueTemplate: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
