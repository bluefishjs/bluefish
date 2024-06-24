import { h, defineComponent, ref, watch, onBeforeMount } from "vue";
// import { Sandbox as DefaultSandbox, sandboxProps } from "vitepress-plugin-sandpack";
import { Sandpack, type SandpackFiles } from "sandpack-vue3";
import { getSandpackFiles } from "./sandboxUtil";

export const Sandbox = defineComponent({
  name: "Sandbox",
  props: {
    codeOptions: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const files = ref<SandpackFiles>({});

    const resolveFiles = async () => {
      files.value = await getSandpackFiles(props, slots);
    };

    watch(props, resolveFiles);

    onBeforeMount(resolveFiles);

    return () => {
      return (
        <Sandpack
          {...props}
          files={files.value}
          template="vite-solid"
          customSetup={{
            dependencies: {
              "@bluefish-js/solid": "latest",
            },
          }}
        />
      );
    };
  },
});
