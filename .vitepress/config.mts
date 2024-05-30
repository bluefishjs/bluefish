import { defineConfig } from "vitepress";
import container from "markdown-it-container";
import { renderSandbox } from "vitepress-plugin-sandpack";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bluefish",
  description: "A diagramming library for the web",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/bluefishjs/bluefish" }],
  },
  markdown: {
    config(md) {
      md
        // the second parameter is html tag name
        .use(container, "sandbox", {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, "sandbox");
          },
        });
    },
  },
});
