// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  publicDir: path.resolve(__dirname, "./public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
