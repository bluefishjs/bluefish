import { h, defineComponent } from "vue";
import { Sandbox as DefaultSandbox, sandboxProps } from "vitepress-plugin-sandpack";

export const indexjs = `import { render } from "solid-js/web";
import App from "./App";

render(App, document.getElementById("app"));`;

export const indexhtml = `<!DOCTYPE html>
<html>

<head>
	<title>Solid Demo</title>
	<meta charset="UTF-8" />
</head>

<body>
	<div id="app"></div>

	<script src="index.js">
	</script>
</body>

</html>`;

export const Sandbox = defineComponent({
  name: "Sandbox",
  props: sandboxProps,
  setup(props, { slots }) {
    return () => (
      <DefaultSandbox
        {...props}
        template="vite-solid"
        coderHeight={500}
        customSetup={{
          deps: {
            "@bluefish-js/solid": "latest",
          },
        }}
      >
        {slots.default?.()}
      </DefaultSandbox>
    );
  },
});
