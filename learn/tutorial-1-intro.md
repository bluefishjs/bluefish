# Tutorial Part 1: The Basics

(Credit to react.dev!)

In this tutorial, you'll make this diagram of the four terrestrial planets:

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

This tutorial doesn't assume you know
anything about Bluefish or UI frameworks. Along the way we'll encounter JSX syntax, marks,
relations, and declarative references.

## Tutorial setup

Click "Open Sandbox" in the bottom right corner to open the editor in a new tab using the website
CodeSandbox.

::: sandbox

```tsx ./App.tsx [active]
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
    </Bluefish>
  );
}
```

:::

## A look at the starter code

There are a bunch of files in the sandbox, but the one to pay attention to is `App.tsx`. This is
where our spec lives. Let's walk through the file line by line.

### Import Bluefish

```tsx{1}
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
    </Bluefish>
  );
}
```

We first import all the components we'll need from the Bluefish package, which is called `@bluefish-js/solid`.

### Export Default Function

```tsx{3-4,8-9}
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
    </Bluefish>
  );
}
```

This defines a function called `App` that will return our diagram when it's called. The `export`
keyword makes this function accessible in other files. The `default` keyword tells other files that
this is the main function we're exporting.

### The `Bluefish` element

```tsx{5,7}
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
    </Bluefish>
  );
}
```

Bluefish uses _JSX notation_. JSX looks a lot like HTML syntax, but you can write it directly in
JavaScript. A Bluefish diagram is always enclosed inside a `Bluefish` element. Bluefish has a single
_child_, `Circle`. The element opens with the `<Bluefish>` tag and closes with the `</Bluefish>` tag.

### The `Circle` mark

```tsx{6}
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
    </Bluefish>
  );
}
```

We've placed a `Circle` mark inside the `Bluefish` element. A mark draws a primitive object (like a
circle or a piece of text) on the screen. They don't have any children, so
they use _self-closing_ tag like `<Circle ... />`.

We give arguments the `Circle` element, called _props_. We surround a prop's values in curly braces
unless the value is a string.

::: info NOTE
Marks in Bluefish are similar to SVG primitive, _not_ marks in charting libraries.
They only draw a single element.
:::

## Build the row of planets

Right now we just have one circle. To make more, we can just copy-paste the `Circle` mark a few
times with different sizes and fills:

```tsx
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
      <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" /> // [!code ++]
      <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" /> // [!code ++]
      <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" /> // [!code ++]
    </Bluefish>
  );
}
```

But they're drawn on top of each other!

![overlapping circles](/learn/assets/overlaid-circles.png)

### Create a row using the `StackH` relation

To fix this, we'll lay them out in a row using the `StackH` relation. A relation visually arranges
elements.

```tsx
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <StackH spacing={50}> // [!code ++]
        <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
        <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
        <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
        <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
      </StackH> // [!code ++]
    </Bluefish>
  );
}
```

![circle stack](/learn/assets/circle-stack.png)

This `StackH` relation horizontally stacks its children 50 pixels apart from each other and vertically
centers them.

### Nest `StackH` in a `Background` relation

Next we'll put a background around the planets. To do so, we'll use the `Background` relation.

```tsx{6,13}
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Background padding={80} background={() => <Rect fill="#859fc9" />}> // [!code ++]
        <StackH spacing={50}>
          <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
          <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
          <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
          <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
        </StackH>
      </Background> // [!code ++]
    </Bluefish>
  );
}
```

![circle stack with background](/learn/assets/circle-stack-with-background.png)

Let's look closely at `Background`'s props:
```tsx
<Background padding={80} background={() => <Rect fill="#859fc9" />}>
```

**TODO: this padding is probably off by a factor of 2?????**

We first specify a `padding` of 80px (actually distributed evenly between top and bottom and between
left and right). Next we specify a mark for the background. In this case the background is a `Rect`
mark. Notice that we have contained this mark in an *arrow function*: `() => ...`. We have to do
this whenever we use a mark as a prop.

## Add a label

Now that we've created a horizontal row of the planets, let's add a label to one of them.

### Overlap relations with `Ref`

We first want our diagram to look like this:

![circle stack with background and a label on mercury](/learn/assets/mercury-label.png)

We've vertically stacked a piece of text above the circle that corresponds to Mercury. The code we
add is a pretty direct translation of this description!

```tsx
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect } from "@bluefish-js/solid";

export default function App() {
  return (
    <Bluefish>
      <Background padding={80} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={50}>
          <Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" /> // [!code --]
          <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" /> // [!code ++]
          <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
          <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
          <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
        </StackH>
      </Background>
      <StackV spacing={30}> // [!code ++]
        <Text>Mercury</Text> // [!code ++]
        <Ref select="mercury" /> // [!code ++]
      </StackV> // [!code ++]
    </Bluefish>
  );
}
```

Let's walk through this carefully. First we give the Mercury circle a name so we can refer to it:

```tsx
<Circle r={15} fill="#EBE3CF" stroke-width={3} stroke="black" /> // [!code --]
<Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" /> // [!code ++]
```

Then we create a vertical stack:
```tsx
<StackV spacing={30}>
  ...
</StackV>
```

And place a text mark above the Mercury circle:
```tsx
<StackV spacing={30}>
  <Text>Mercury</Text>
  <Ref select="mercury" />
</StackV>
```

The `Ref` element lets us select an existing element by name.

### Put a `Background` behind the planet and the label

Finally, we can place a `Background` relation behind the label just as we did with the `Background`
behind the planets.

```tsx
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
      <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}> // [!code ++]
        <StackV spacing={30}>
          <Text>Mercury</Text>
          <Ref select="mercury" />
        </StackV>
      </Background> // [!code ++]
    </Bluefish>
  );
}
```

![circle stack with background and a label on mercury with a border around the label and mercury](/learn/assets/bordered-mercury-label.png)

## Wrapping up

Tada! We've completed our first Bluefish diagram. Along the way we encountered JSX notation, some
Bluefish marks (`Circle`, `Rect`, and `Text`), some Bluefish relations (`StackH`, `StackV`, and
`Background`), and declarative references (`Ref`) for referring to existing elements.

Here's what the finished code should look like:

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

If you want to explore more, try playing around with `spacing` and `padding`, or switching `StackH`
and `StackV`.

## What's next?

When you're ready, there are few paths forward from here:

- Learn more about relations in [part 2](/learn/tutorial-2-relations.md) of this tutorial.
- Explore our examples. **TODO: link!!!**
- Read the Bluefish [API reference](/api-reference/).