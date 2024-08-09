<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { Sandbox } from "../../Sandbox";

const { Layout } = DefaultTheme

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
};`
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <div style="width: 60%; margin-left: -55%;">
        <Sandbox :codeOptions="encodedOptions">
          <div>
          <pre>{{ code }}</pre>
          </div>
        </Sandbox>
      </div>
    </template>
  </Layout>
</template>