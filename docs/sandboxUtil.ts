// https://github.com/jerrywu001/vitepress-plugin-sandpack/blob/main/src/components/SandpackUtil.ts
import type { Slots, VNode } from "vue";
import { renderToString } from "vue/server-renderer";
import type { SandpackFiles } from "sandpack-vue3";

const defaultFilePath = "/index.ts";

const getFileAttributes = (info: string) => {
  let path: string | undefined;
  const opts = (info || "").split(" ");
  const hidden = opts.includes("[hidden]");
  const readOnly = opts.includes("[readonly]") || opts.includes("[readOnly]");
  const active = opts.includes("[active]");
  const filename = opts.find((v) => v.includes("."));
  if (filename) {
    path = filename;
    path = path === "App.vue" ? defaultFilePath : path;
    path = path.startsWith("/") ? path : `/${path}`;
  }
  return { hidden, active, readOnly, path };
};

export const getSandpackFiles = async (props: { codeOptions: string }, slot: Slots) => {
  const items = {} as SandpackFiles;
  const content = (slot.default ? slot.default() : []) as VNode[];
  let codeItems = content.filter((v) => v.type === "div") || [];
  let i = 0;
  if (Array.isArray(codeItems)) {
    if (!codeItems.length) {
      // @ts-ignore
      const ctx = content ? content[0]?.ctx : {};
      if (ctx && ctx?.slots) {
        codeItems = ctx.slots?.default ? ctx.slots.default() : [];
      }
    }
    for await (const v of codeItems) {
      let code = "";
      let div: HTMLDivElement | null = document.createElement("div");
      const children = (v.children || []) as VNode[];
      const { active, hidden, readOnly, path } = getFileAttributes(
        JSON.parse(decodeURIComponent(props.codeOptions /*  as string */))[i]
      );
      const filename = path || defaultFilePath;
      const pre = children.find((c) => c.type === "pre");
      v.children = pre ? [pre] : [];
      const html = await renderToString(v);
      div.insertAdjacentHTML("beforeend", html);
      code = div.innerText;
      div = null;
      items[filename] = {
        code,
        active,
        hidden,
        readOnly,
      };
      i++;
    }
  }
  return items;
};
