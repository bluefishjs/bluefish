# Tutorial Part 2: The Power of Relations

In the last tutorial, we got a brief introduction to Bluefish: its marks, relations, and declarative
references. In this tutorial, we'll see just how expressive relations can be. We'll progressively
modify the label in the last tutorial until we've gone from this:

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

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
};
```

:::

to this:

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

Along the way we'll encounter some other Bluefish relations: `Arrow`, `Align`, and `Distribute`.
We'll also gain some more experience using `name` and `Ref`.

## Flip label direction

One thing we can do without changing our spec very much is move the label below the planet by
simplifying reversing the order of `StackV`'s children:

```tsx ./App.tsx [active]
// ...
      <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}>
        <StackV spacing={30}>
          <Text>Mercury</Text> // [!code --]
          <Ref select="mercury" /> // [!code --]
          <Ref select="mercury" /> // [!code ++]
          <Text>Mercury</Text> // [!code ++]
        </StackV>
      </Background>
// ...
```

![label under planet](/learn/assets/label-under-planet.png)

## Change `Background` to `Arrow`

We can also change how we connect the label to the planet. Instead of using a `Background`, we can
use an `Arrow` relation instead:

```tsx
// ...
      <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}> // [!code --]
        <StackV spacing={30}>
          <Ref select="mercury" />
          <Text>Mercury</Text> // [!code --]
          <Text name="label">Mercury</Text> // [!code ++]
        </StackV>
        <Arrow> // [!code ++]
          <Ref select="label"> // [!code ++]
          <Ref select="mercury" /> // [!code ++]
        </Arrow> // [!code ++]
      </Background> // [!code --]
// ...
```

![label arrow](/learn/assets/label-arrow.png)

We named the Mercury label, deleted the `Background`, and added an `Arrow` relation whose children
point at `StackV`'s children.

::: info CHALLENGE
Can figure out how to get back to the previous version of the diagram with `Background` by only changing two lines of code?
:::

## Distribute the label from the planets

Right now the label is inside the planets `Background`, but what if we want to place it outside? We
could change the `StackV` spacing until it's large enough, but we would have to manually update it
whenever we changed the `Background` or the sizes of the planets. Instead, we'll offset the label
from the planets `Background` directly.

To do this, we first have to split `StackV` into its two constituent parts: vertical `Distribute`
and horizontal `Align`:

```tsx
<StackV spacing={30}> // [!code --]
<Distribute direction="vertical" spacing={30}> // [!code ++]
  <Ref select="mercury" />
  <Text name="label">Mercury</Text>
</StackV> // [!code --]
</Distribute> // [!code ++]
<Align alignment="centerX"> // [!code ++]
  <Ref select="mercury" /> // [!code ++]
  <Ref select="label" /> // [!code ++]
</Align> // [!code ++]
```

This refactor doesn't change the diagram at all, but it *does* let us retarget the `Distribute` so
we n offset it from the `Background` instead of the Mercury `Circle`. To do this, we'll first label
the planets `Background`:

```tsx
<Background padding={80} background={() => <Rect fill="#859fc9" />}> // [!code --]
<Background name="planets" padding={80} background={() => <Rect fill="#859fc9" />}> // [!code ++]
```

Then we'll change the selection in the `Distribute`:

```tsx
<Distribute direction="vertical" spacing={30}>
  <Ref select="mercury" /> // [!code --]
  <Ref select="planets" /> // [!code ++]
  <Text name="label">Mercury</Text>
</Distribute>
```

![mercury label outside background](/learn/assets/mercury-label-outside-background.png)

## Wrapping up

Huzzah! We modified the label in our planets diagram. Along the way we used `Arrow`, `Align`, and
`Distribute`, three important Bluefish relations. We've also gained more experience naming elements
and selecting them with `Ref`. Your final code should look like this:

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

## What's next

In the next tutorial we'll see how to take advantage of SolidJS, Bluefish's host framework, to make
our diagram data-driven and reactive and our spec a little easier to read and modify.