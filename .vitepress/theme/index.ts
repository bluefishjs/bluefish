import DefaultTheme from "vitepress/theme";
import { Sandbox } from "../../Sandbox";
// re-enable for some other styling options for the sandbox
// import "vitepress-plugin-sandpack/dist/style.css";
import "./tailwind.css";
import { h } from "vue";
import CustomLayout from "./CustomLayout.vue";

const codeOptions = encodeURIComponent(JSON.stringify({
  'App.tsx': `import { Component } from "solid-js";

const App: Component = () => {
  return <h1>Ahoyyyyyyyyyyy!</h1>
};

export default App;`
}));

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    +ctx.app.component("Sandbox", Sandbox);
  },
  Layout: CustomLayout,
};
