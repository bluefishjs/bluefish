---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Bluefish"
  text: "The missing diagramming framework"
  tagline: "Because your diagrams are worth it"
  image: "./bluefish-logo.svg"
  # image: https://github.com/bluefishjs/bluefish/assets/21694516/063a0056-3386-430d-a18b-cfbecf500c0b
  actions:
    - theme: brand
      text: Get started
      link: /learn/get-started
    - theme: alt
      text: What is Bluefish?
      link: /what-is-bluefish
    - theme: alt
      text: Examples
      link: /examples
features:
  - title: "Build Reactive Diagrams"
    details: Created interactive and animated diagrams with popular reactive UI primitives
  - title: "Use Powerful Custom Layouts"
    details: Bluefish provides graph and arrow layouts out of the box, with the ability to add your own
  # - title: "Compose Diagrams with <i>Relations</i>"
  #   details: Combine elements using alignment, arrows, containment and more!
  - title: "Compose with Relations"
    details: Build complex diagrams from simpler building blocks like alignment, spacing, and arrows
---

<br />

<div class="flex flex-col space-y-4">
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-1">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/200x200" alt="Placeholder Image" />
        <p>Insertion Sort</p>
      </div>
    </div>
    <div class="col-span-2">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/400x200" alt="Placeholder Image" />
        <p>A Transaction in the DFSCQ File System</p>
      </div>
    </div>
    <div class="col-span-2">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/400x100" alt="Placeholder Image" />
        <p>Python Tutor</p>
      </div>
    </div>
    <div class="col-span-1 row-span-2">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/200x200" alt="Placeholder Image" />
        <p>Pulley Diagram</p>
      </div>
    </div>
    <div class="col-span-2">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/400x100" alt="Placeholder Image" />
        <p>Baking Recipe</p>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-1">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/200x100" alt="Placeholder Image" />
        <p>Quantum Circuit Equivalence</p>
      </div>
    </div>
    <div class="col-span-1 row-span-2">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/200x200" alt="Placeholder Image" />
        <p>Ohm Parse Tree</p>
      </div>
    </div>
    <div class="col-span-1">
      <div class="flex flex-col space-y-2">
        <img src="https://placehold.co/200x100" alt="Placeholder Image" />
        <p>Three-Point Set Topologies</p>
      </div>
    </div>
  </div>
</div>

<br />

# Try Bluefish in your browser

::: sandbox

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

:::
