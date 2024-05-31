---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Bluefish"
  text: "Because your diagrams are worth it"
  tagline: "The missing diagramming framework"
  actions:
    - theme: brand
      text: Get started
      link: /get-started
    - theme: alt
      text: API Examples
      link: /api-examples
features:
  - title: "Build Reactive Diagrams"
    details: Created interactive and animated diagrams with popular reactive UI primitives
  - title: Use Powerful Custom Layouts
    details: Bluefish provides graph and arrow layouts out of the box, with the ability to add your own
  # - title: "Compose Diagrams with <i>Relations</i>"
  #   details: Combine elements using alignment, arrows, containment and more!
  - title: "Create Composably with Relations"
    details: Build complex diagrams from simpler building blocks like alignment, spacing, and arrows
---

<br />

<!-- https://css-tricks.com/full-width-containers-limited-width-parents/ -->
<div style="border-radius: 10px; overflow: hidden; width: 80vw; position: relative; left: 50%; right: 50%; margin-left: -40vw; margin-right: -40vw; border: none; height: 100vh">
<iframe
  width="100%"
  height="100%"
  frameBorder="0"
  allow="clipboard-write"
  src="https://playground.solidjs.com/anonymous/1294d728-8f3f-4d98-b507-155be3679134"
/>
</div>

<!-- ::: sandbox

```tsx ./App.tsx [active]
// prettier-ignore
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

const App = () => {
  return (
    <Bluefish>
      {/* Bluefish is a diagramming library for SolidJS */}
      {/* You can specify UI-like components such as Row and Background */}
      <Background padding={20}>
        <StackH spacing={50}>
          <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
          <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
          <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
          <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
        </StackH>
      </Background>
      {/* But you can also use *relations* like Align and Distribute */}
      <Align alignment="centerX">
        <Text name="label">Mercury</Text>
        {/* Bluefish lets you refer to previous components using a special `Ref` component. */}
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
};

export default App;
```

::: -->
