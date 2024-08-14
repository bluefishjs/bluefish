# Tutorial Part 3: Bluefish and Solid

Bluefish is a library in SolidJS, a UI framework. That means we can take advantage of SolidJS's
features to make our diagrams, too. In this tutorial, we'll see how to make custom marks and
relations, how to map over data using Solid's `For` component, and how to make an interactive
diagram with Bluefish.

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, withBluefish, createName } from "@bluefish-js/solid";
import { For, createSignal } from "solid-js";

const planets = [
  { name: "Mercury", radius: 15, color: "#EBE3CF" },
  { name: "Venus", radius: 36, color: "#DC933C" },
  { name: "Earth", radius: 38, color: "#179DD7" },
  { name: "Mars", radius: 21, color: "#F1CF8E" },
];

const Planet = withBluefish((props) => {
  return <Rect width={props.radius*2} height={props.radius*2} fill={props.color} />
});

const PlanetLabel = withBluefish((props: { planetName: string }) => {
  const label = createName('label');

  return (
    <Group>
      <Distribute direction="vertical" spacing={-30}>
        <Ref select="planets" />
        <Text name={label} fill="white">{props.planetName}</Text>
      </Distribute>
      <Align alignment="centerX">
        <Ref select={props.planetName} />
        <Ref select={label} />
      </Align>
    </Group>
  );
});

export default function App() {
  const [spacing, setSpacing] = createSignal(50);
  
  return (
   <>
      <input type="range" min={0} max={100} value={spacing()} onInput={(e) => setSpacing(Number(e.target.value))} />
      <br />
      <Bluefish>
        <Background name="planets" padding={80} background={() => <Rect fill="#1E1B4B" />}>
        <StackH spacing={spacing()}>
          <For each={planets}>
            {(planet) => <Planet name={planet.name} radius={planet.radius} color={planet.color} />}
          </For>
        </StackH>
      </Background>
      <For each={planets}>
        {(planet) => <PlanetLabel planetName={planet.name} />}
      </For>
      </Bluefish>
    </>
  );
};
```

:::

## Making a custom mark

Let's start with our code from the previous tutorial:

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Background name="planets" padding={80} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={50}>
          <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
          <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
          <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
          <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
        </StackH>
      </Background>
      <Distribute direction="vertical" spacing={30}>
        <Ref select="planets" />
        <Text name="label">Mercury</Text>
      </Distribute>
      <Align alignment="centerX">
        <Ref select="mercury" />
        <Ref select="label" />
      </Align>
      <Arrow>
        <Ref select="label" />
        <Ref select="mercury" />
      </Arrow>
    </Bluefish>
  );
};
```

:::

Right now if we wanted to change the black borders around the planets, we'd have to edit each one
individually. To make this change easier to make, we can make a custom `Planet` mark.

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, withBluefish } from "@bluefish-js/solid";

const Planet = withBluefish((props) => {
  return <Circle r={props.radius} fill={props.color} stroke-width={3} stroke="black" />
});

export default function App() {
  return (
    <Bluefish>
      <Background name="planets" padding={80} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={50}>
          <Planet name="mercury" radius={15} color="#EBE3CF" />
          <Planet radius={36} color="#DC933C" />
          <Planet radius={38} color="#179DD7" />
          <Planet radius={21} color="#F1CF8E" />
        </StackH>
      </Background>
      <Distribute direction="vertical" spacing={30}>
        <Ref select="planets" />
        <Text name="label">Mercury</Text>
      </Distribute>
      <Align alignment="centerX">
        <Ref select="mercury" />
        <Ref select="label" />
      </Align>
      <Arrow>
        <Ref select="label" />
        <Ref select="mercury" />
      </Arrow>
    </Bluefish>
  );
};
```

:::

::: info
Don't forget to import `withBluefish` from `@bluefish-js/solid`.
:::

Let's break down the code for the `Planet` mark:

```tsx
const Planet = withBluefish((props) => {
  return <Circle r={props.radius} fill={props.color} stroke-width={3} stroke="black" />
});
```

Remember, a mark is a function that maps some data (props) to some visual elements. Whenever we make
a custom mark in Bluefish, we need to wrap it with `withBluefish`.

<!-- Notice that to call -->

## Making a custom relation

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, withBluefish, createName } from "@bluefish-js/solid";

const Planet = withBluefish((props) => {
  return <Circle r={props.radius} fill={props.color} stroke-width={3} stroke="black" />
});

const PlanetLabel = withBluefish((props) => {
  const label = createName('label');

  return (
    <Group>
      <Distribute direction="vertical" spacing={30}>
        <Ref select="planets" />
        <Text name={label}>{props.planetName}</Text>
      </Distribute>
      <Align alignment="centerX">
        <Ref select={props.planetName} />
        <Ref select={label} />
      </Align>
      <Arrow>
        <Ref select={label} />
        <Ref select={props.planetName} />
      </Arrow>
    </Group>
  );
});

export default function App() {
  return (
    <Bluefish>
      <Background name="planets" padding={80} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={50}>
          <Planet name="Mercury" radius={15} color="#EBE3CF" />
          <Planet radius={36} color="#DC933C" />
          <Planet radius={38} color="#179DD7" />
          <Planet radius={21} color="#F1CF8E" />
        </StackH>
      </Background>
      <PlanetLabel planetName="Mercury" />
    </Bluefish>
  );
};
```

:::

## Mapping over data with Solid's `For` component

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, withBluefish, createName } from "@bluefish-js/solid";
import { For, createSignal } from "solid-js";

const planets = [
  { name: "Mercury", radius: 15, color: "#EBE3CF" },
  { name: "Venus", radius: 36, color: "#DC933C" },
  { name: "Earth", radius: 38, color: "#179DD7" },
  { name: "Mars", radius: 21, color: "#F1CF8E" },
];

const Planet = withBluefish((props) => {
  return <Circle r={props.radius} fill={props.color} stroke-width={3} stroke="black" />
});

const PlanetLabel = withBluefish((props: { planetName: string }) => {
  const label = createName('label');

  return (
    <Group>
      <Distribute direction="vertical" spacing={30}>
        <Ref select="planets" />
        <Text name={label}>{props.planetName}</Text>
      </Distribute>
      <Align alignment="centerX">
        <Ref select={props.planetName} />
        <Ref select={label} />
      </Align>
      <Arrow>
        <Ref select={label} />
        <Ref select={props.planetName} />
      </Arrow>
    </Group>
  );
});

export default function App() {
  return (
    <Bluefish>
      <Background name="planets" padding={80} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={50}>
          <For each={planets}>
            {(planet) => <Planet name={planet.name} radius={planet.radius} color={planet.color} />}
          </For>
        </StackH>
      </Background>
      <For each={planets}>
        {(planet) => <PlanetLabel planetName={planet.name} />}
      </For>
    </Bluefish>
  );
};
```

:::

## Adding reactivity with signals

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, withBluefish, createName } from "@bluefish-js/solid";
import { For, createSignal } from "solid-js";

const planets = [
  { name: "Mercury", radius: 15, color: "#EBE3CF" },
  { name: "Venus", radius: 36, color: "#DC933C" },
  { name: "Earth", radius: 38, color: "#179DD7" },
  { name: "Mars", radius: 21, color: "#F1CF8E" },
];

const Planet = withBluefish((props) => {
  return <Circle r={props.radius} fill={props.color} stroke-width={3} stroke="black" />
});

const PlanetLabel = withBluefish((props: { planetName: string }) => {
  const label = createName('label');

  return (
    <Group>
      <Distribute direction="vertical" spacing={30}>
        <Ref select="planets" />
        <Text name={label}>{props.planetName}</Text>
      </Distribute>
      <Align alignment="centerX">
        <Ref select={props.planetName} />
        <Ref select={label} />
      </Align>
      <Arrow>
        <Ref select={label} />
        <Ref select={props.planetName} />
      </Arrow>
    </Group>
  );
});

export default function App() {
  const [spacing, setSpacing] = createSignal(50);
  
  return (
   <>
      <input type="range" min={10} max={100} value={spacing()} onInput={(e) => setSpacing(Number(e.target.value))} />
      <br />
      <Bluefish>
        <Background name="planets" padding={80} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={spacing()}>
          <For each={planets}>
            {(planet) => <Planet name={planet.name} radius={planet.radius} color={planet.color} />}
          </For>
        </StackH>
      </Background>
      <For each={planets}>
        {(planet) => <PlanetLabel planetName={planet.name} />}
      </For>
      </Bluefish>
    </>
  );
};
```

:::