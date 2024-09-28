import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  publicDir: command === "serve" ? "public" : false,
  server: {
    port: 3000,
    open: "/public/index.html",
  },
  build: {
    emptyOutDir: false,
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs", "umd"],
      name: "bluefish",
      fileName: "index",
    },
  },
}));
