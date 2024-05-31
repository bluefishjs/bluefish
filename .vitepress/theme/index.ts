import DefaultTheme from "vitepress/theme";
import { Sandbox } from "../../Sandbox";
import "vitepress-plugin-sandpack/dist/style.css";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    +ctx.app.component("Sandbox", Sandbox);
  },
};
