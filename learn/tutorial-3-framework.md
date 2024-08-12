# Tutorial Part 3: Bluefish and Solid

Bluefish is a library in SolidJS, a UI framework. That means we can take advantage of SolidJS's
features to make our diagrams, too. In this tutorial, we'll see how to make custom marks and
relations, how to map over data using Solid's `For` component, and make an interactive diagram with
signals.

**TODO: rip this code is buggy :(**

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, withBluefish, createName } from "@bluefish-js/solid";
import { For, createSignal } from "solid-js";

type PlanetProps = {
  radius: number;
  color: string;
}

const Planet = withBluefish((props: PlanetProps) => {
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

const planets = [
  { name: "Mercury", radius: 15, color: "#EBE3CF" },
  { name: "Venus", radius: 36, color: "#DC933C" },
  { name: "Earth", radius: 38, color: "#179DD7" },
  { name: "Mars", radius: 21, color: "#F1CF8E" },
];

export default function App() {
  const [spacing, setSpacing] = createSignal(50);

  return (
    <>
    <input type="range" min="0" max="100" value={spacing()} onInput={(e) => setSpacing(e.target.value)} />
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


**TODO:** Making custom components for marks and relations

**TODO:** For loops

**TODO:** Reactivity
