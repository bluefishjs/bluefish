import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";

export default defineConfig(({ command }) => ({
  publicDir: command === "serve" ? "public" : false,
  plugins: [
    devtools({
      autoname: true,
    }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
    open: "/public/index.html",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs", "umd"],
      name: "bluefish",
      fileName: "index",
    },
    target: "esnext",
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
      output: {
        globals: {
          "solid-js": "solidJs",
          "solid-js/web": "web",
          "solid-js/store": "store",
        },
      },
    },
  },
}));
