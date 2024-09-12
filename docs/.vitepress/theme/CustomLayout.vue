<script setup>
import DefaultTheme from "vitepress/theme";
import { Sandbox } from "../../Sandbox";
import { ref } from "vue";
import VCodeSandbox from "@wdns/vue-code-block";

const { Layout } = DefaultTheme;

const encodedOptions = encodeURIComponent(`["tsx ./App.tsx [active]"]`);

const code = `import { Bluefish, Background, StackH, StackV, Circle, Text, Ref, Distribute, Align, Arrow } from "bluefish-solid";

export default function App() {
  return (
    <Bluefish>
      {/* Bluefish is a diagramming library for the web */}
      {/* You can specify UI-like components such as Background and StackH */}
      <Background padding={20}>
        <StackH spacing={50}>
          <Circle name="mercury" r={15} fill="#EBE3CF" strokeWidth={3} stroke="black" />
          <Circle r={36} fill="#DC933C" strokeWidth={3} stroke="black" />
          <Circle r={38} fill="#179DD7" strokeWidth={3} stroke="black" />
          <Circle r={21} fill="#F1CF8E" strokeWidth={3} stroke="black" />
        </StackH>
      </Background>
      {/* But you can also use *relations* like Align and Distribute */}
      <Align alignment="centerX">
        <Text name="label">Mercury</Text>
        {/* Bluefish lets you refer to previous components using a special \`Ref\` component. */}
        <Ref select="mercury" />
      </Align>
      <Distribute direction="vertical" spacing={60}>
        <Ref select="label" />
        <Ref select="mercury" />
      </Distribute>
      {/* In addition to performing layout, Bluefish relations can also draw objects. */}
      <Arrow>
        <Ref select="label" />
        <Ref select="mercury" />
      </Arrow>
    </Bluefish>
  );
};`;

const vanillaTsCode = `import { Bluefish, Background, StackH, StackV, Circle, Text, Ref, Distribute, Align, Arrow, render } from "bluefish-js";

function App() {
  return (
    Bluefish(
      /* Bluefish is a diagramming library for the web */
      /* You can specify UI-like components such as Background and StackH */
      Background({ padding: 20 },
        StackH({ spacing: 50 },
          Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
          Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
          Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
          Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
        )
      ),
      /* But you can also use *relations* like Align and Distribute */
      Align({ alignment: "centerX" },
        Text({ name: "label" }, "Mercury"),
        /* Bluefish lets you refer to previous components using a special \`Ref\` component. */
        Ref({ select: "mercury" }),
      ),
      Distribute({ direction: "vertical", spacing: 60 },
        Ref({ select: "label" }),
        Ref({ select: "mercury" }),
      ),
      /* In addition to performing layout, Bluefish relations can also draw objects. */
      Arrow(
        Ref({ select: "label" }),
        Ref({ select: "mercury" }),
      )
    )
  )
}

render(App, document.getElementById("app"));`;

const activeTab = ref("vanillaTsCode");
</script>

<template>
  <Layout>
    <!-- <template #home-hero-image> -->
    <!-- <div class="tab-group">
        <div class="tab-buttons">
          <button @click="activeTab = 'vanillaTsCode'" :class="{ active: activeTab === 'vanillaTsCode' }">
            Vanilla JS
          </button>
          <button @click="activeTab = 'code'" :class="{ active: activeTab === 'code' }">Solid JSX</button>
        </div>
        <div class="tab-content">
          <VCodeSandbox v-if="activeTab === 'code'" :code="code" lang="js" prismjs />
          <VCodeSandbox v-else :code="vanillaTsCode" lang="js" prismjs />
        </div>
      </div> -->
    <!-- </template> -->
    <!-- <div id="sandbox-container">
        <Sandbox :codeOptions="encodedOptions">
          <div>
            <pre>{{ vanillaTsCode }}</pre>
          </div>
        </Sandbox>
      </div> -->
    <!-- <iframe
        width="100%"
        height="800px"
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-presentation allow-downloads allow-pointer-lock"
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-read; clipboard-write; xr-spatial-tracking;"
        src="https://playground.solidjs.com/anonymous/84e40b06-f892-4243-8930-0370a6af5f72"
        style="border: 0; overflow: hidden"
      ></iframe>
    </template> -->
    <!-- </template> -->
    <template #home-hero-before>
      <div class="construction">
        <h1><strong>Warning: This website is under construction! Many pages are incomplete.</strong></h1>
      </div>
    </template>
    <template #home-features-before>
      <div class="two-column-layout">
        <div class="column tab-group">
          <div class="tab-buttons">
            <button @click="activeTab = 'vanillaTsCode'" :class="{ active: activeTab === 'vanillaTsCode' }">
              Vanilla JS
            </button>
            <button @click="activeTab = 'code'" :class="{ active: activeTab === 'code' }">Solid JSX</button>
          </div>
          <div class="tab-content">
            <VCodeSandbox
              v-show="activeTab === 'code'"
              :code="code"
              lang="js"
              prismjs
              maxHeight="500px"
              theme="default"
            />
            <VCodeSandbox
              v-show="activeTab === 'vanillaTsCode'"
              :code="vanillaTsCode"
              lang="js"
              prismjs
              maxHeight="500px"
              theme="default"
            />
          </div>
        </div>
        <div class="column image-column">
          <img src="/planets.png" alt="Planets" />
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.construction {
  background-color: #ffffcc;
  padding: 20px;
  border: 1px solid #ffff00;
  border-radius: 5px;
  text-align: center;
  color: #422006;
}

.two-column-layout {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .two-column-layout {
    flex-direction: row;
  }
}

.column {
  flex: 1;
  padding: 0 20px;
}

.tab-group {
  display: flex;
  flex-direction: column;
  max-width: 640px;
}

.tab-buttons {
  display: flex;
  justify-content: left;
}

.tab-buttons button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tab-buttons button.active {
  background-color: #fff;
  border-bottom: none;
}

.image-column {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-column img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

@media (min-width: 1024px) {
  .image-column img {
    margin-top: -72px;
  }
}
</style>
