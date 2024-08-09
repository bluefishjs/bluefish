import { defineConfig } from "vitepress";
import container from "markdown-it-container";
import { renderSandbox } from "vitepress-plugin-sandpack";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bluefish",
  description: "A diagramming library for the web",
  themeConfig: {
    logo: "./bluefish-logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Learn", link: "/learn/get-started" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "API Reference", link: "/api-reference" },
    ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/learn": [
        { text: "Get started", link: "/learn/get-started" },
        { text: "What is Bluefish?", link: "/learn/what-is-bluefish" },
        {
          text: "Tutorial",
          items: [
            { text: "1. The Basics", link: "/learn/tutorial-1-intro" },
            { text: "2. The Power of Relations", link: "/learn/tutorial-2-relations" },
            { text: "3. Bluefish and Solid", link: "/learn/tutorial-3-framework" },
          ],
        },
      ],
      "/api-reference": [
        {
          text: "API Reference",
          items: [
            { text: "Overview", link: "/api-reference/index" },
            {
              text: "Marks",
              collapsed: true,
              items: [
                { text: "Circle", link: "/api-reference/marks/circle" },
                { text: "Ellipse", link: "/api-reference/marks/ellipse" },
                { text: "Image", link: "/api-reference/marks/image" },
                { text: "Path", link: "/api-reference/marks/path" },
                { text: "Rect", link: "/api-reference/marks/rect" },
                { text: "Text", link: "/api-reference/marks/text" },
              ],
            },
            {
              text: "Relations",
              collapsed: true,
              items: [
                { text: "Align", link: "/api-reference/relations/align" },
                { text: "Arrow", link: "/api-reference/relations/arrow" },
                { text: "Background", link: "/api-reference/relations/background" },
                { text: "Distribute", link: "/api-reference/relations/distribute" },
                { text: "Group", link: "/api-reference/relations/group" },
                { text: "Line", link: "/api-reference/relations/line" },
                { text: "Stack", link: "/api-reference/relations/stack" },
              ],
            },
            {
              text: "Special",
              collapsed: true,
              items: [
                { text: "Bluefish", link: "/api-reference/special/bluefish" },
                { text: "Ref", link: "/api-reference/special/ref" },
                { text: "withBluefish", link: "/api-reference/special/withBluefish" },
                { text: "Layout", link: "/api-reference/special/layout" },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/bluefishjs/bluefish" }],
  },
  markdown: {
    lineNumbers: true,
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
