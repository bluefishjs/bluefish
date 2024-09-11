<script setup>
import DefaultTheme from "vitepress/theme";
import { Sandbox } from "../../Sandbox";
import "./tailwind.css";

const { Layout } = DefaultTheme;

const encodedOptions = encodeURIComponent(`["tsx ./App.tsx [active]"]`);

const code = `import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Background padding={80} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={50}>
          <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
          <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
          <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
          <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
        </StackH>
      </Background>
      <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}>
        <StackV spacing={30}>
          <Text>Mercury</Text>
          <Ref select="mercury" />
        </StackV>
      </Background>
    </Bluefish>
  );
};`;

const vanillaTsCode = `<!DOCTYPE html>
<div id="container"></div>
<script type="module">
import { createSignal, createEffect } from "https://cdn.skypack.dev/solid-js";
import { render as solidRender } from "https://cdn.skypack.dev/solid-js/web";
import * as bluefish from "https://cdn.skypack.dev/@bluefish-js/solid";
import h from "https://cdn.skypack.dev/solid-js/h";

function App() {
    let bf = bluefish.Hyperscript;

    return h('div', 
      bf.Bluefish(
        /* Bluefish is a diagramming library for SolidJS */
        /* You can specify UI-like components such as Row and Background */
        bf.Background({ padding: 20 },
            bf.StackH({ spacing: 50 },
                bf.Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
                bf.Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
                bf.Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
                bf.Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
            )
        ),
        /* But you can also use *relations* like Align and Distribute */
        bf.Align({ alignment: "centerX" },
            bf.Text({ name: "label" }, "Mercury"),
            /* Bluefish lets you refer to previous components using a special \`Ref\` component. */
            bf.Ref({ select: "mercury" }),
        ),
        bf.Distribute({ direction: "vertical", spacing: 60 },
            bf.Ref({ select: "label" }),
            bf.Ref({ select: "mercury" }),
        ),
        /* In addition to performing layout, Bluefish relations can also draw objects. */
        bf.Arrow(
            bf.Ref({ select: "label" }),
            bf.Ref({ select: "mercury" }),
        )
    ))
}

// Using HTL to create the root element
solidRender(App, document.getElementById("container"));  // Mount the SolidJS component into the root
</` + 'script>';

</script>

<template>
  <Layout>
    <template #home-hero-image>
      <div id="sandbox-container">
        <Sandbox :codeOptions="encodedOptions">
          <div>
            <pre>{{ vanillaTsCode }}</pre>
          </div>
        </Sandbox>
      </div>
      <!-- <iframe
        width="100%"
        height="800px"
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-presentation allow-downloads allow-pointer-lock"
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-read; clipboard-write; xr-spatial-tracking;"
        src="https://playground.solidjs.com/anonymous/84e40b06-f892-4243-8930-0370a6af5f72"
        style="border: 0; overflow: hidden"
      ></iframe>
    </template> -->
    </template>
  </Layout>
</template>

<style>
#sandbox-container {
  width: 60%;
  margin-left: -55%;
}

@media (max-width: 959px) {
  #sandbox-container {
    display: none;
  }
  .VPHero .image {
    display: none;
  }
}
</style>
