import { h, defineComponent, ref, watch, onBeforeMount } from "vue";
// import { Sandbox as DefaultSandbox, sandboxProps } from "vitepress-plugin-sandpack";
import { Sandpack, SandpackProvider, SandpackCodeEditor, SandpackPreview, type SandpackFiles } from "sandpack-vue3";
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
        <SandpackProvider
          {...props}
          files={files.value}
          template="vanilla-ts"
          customSetup={{
            dependencies: { "bluefish-js": "0.0.32" },
          }}
        >
          <div style={{ border: "solid cornflowerblue 2px", borderRadius: "10px", padding: "10px" }}>
            <SandpackCodeEditor showLineNumbers style={{ height: "300px" }} />
            <SandpackPreview style={{ height: "300px" }} />
          </div>
        </SandpackProvider>
      );
    };
  },
});
