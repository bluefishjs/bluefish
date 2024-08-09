---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Bluefish"
  text: "The missing diagramming framework"
  tagline: "Because your diagrams are worth it"
  image: "/assets/bluefish-logo.png"
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
  - title: "Compose with Relations"
    details: Build complex diagrams from simpler building blocks like alignment, spacing, and arrows
  - title: "Build Reactive Diagrams"
    details: Created interactive and animated diagrams with popular reactive UI primitives
  - title: "Use Powerful Custom Layouts"
    details: Bluefish provides graph and arrow layouts out of the box, with the ability to add your own
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
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

const App = () => {
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
};

export default App;
```

:::
