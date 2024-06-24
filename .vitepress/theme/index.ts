import DefaultTheme from "vitepress/theme";
import { Sandbox } from "../../Sandbox";
// re-enable for some other styling options for the sandbox
// import "vitepress-plugin-sandpack/dist/style.css";
import "./tailwind.css";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    +ctx.app.component("Sandbox", Sandbox);
  },
};
