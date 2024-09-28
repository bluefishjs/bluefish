# Tutorial Part 1: The Basics

(Credit to react.dev!)

In this tutorial, you'll make this diagram of the four terrestrial planets:

::: sandbox

```tsx [active]
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return [
    Background(
      { padding: 40, fill: "#859fc9", stroke: "none" },
      StackH({ spacing: 50 }, [
        Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
      ])
    ),
    Background({ rx: 10 }, StackV({ spacing: 30 }, [Text("Mercury"), Ref({ select: "mercury" })])),
  ];
}

render(Diagram, document.getElementById("app"));
```

:::

This tutorial doesn't assume you know
anything about Bluefish or UI frameworks. Along the way we'll encounter JSX syntax, marks,
relations, and declarative references.

## Tutorial setup

Click "Open Sandbox" in the bottom right corner to open the editor in a new tab using the website
CodeSandbox. If that doesn't work, simply open this tutorial in a new tab and work in this editor.

::: info
You may see an error like

> Cannot find module 'solid-js/jsx-runtime' or its corresponding type declarations.

This is ok and won't affect your ability to follow the tutorial.
:::

::: sandbox

```tsx [active]
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" });
}

render(Diagram, document.getElementById("app"));
```

:::

## A look at the starter code

There are a bunch of files in the sandbox, but the one to pay attention to is `Diagram.tsx`. This is
where our spec lives. Let's walk through the file line by line.

### Import Bluefish

```tsx{1}
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" });
}

render(Diagram, document.getElementById("app"));
```

We first import all the components we'll need from the Bluefish package, which is called `@bluefish-js/solid`.

### Export Default Function

```tsx{3-4,8-9}
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" });
}

render(Diagram, document.getElementById("app"));
```

This defines a function called `Diagram` that will return our diagram when it's called. The `export`
keyword makes this function accessible in other files. The `default` keyword tells other files that
this is the main function we're exporting.

### The `Bluefish` element

```tsx{5,7}
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" });
}

render(Diagram, document.getElementById("app"));
```

Bluefish uses _JSX notation_. JSX looks a lot like HTML syntax, but you can write it directly in
JavaScript. A Bluefish diagram is always enclosed inside a `Bluefish` element. Bluefish has a single
_child_, `Circle`. The element opens with the `<Bluefish>` tag and closes with the `</Bluefish>` tag.

### The `Circle` mark

```tsx{6}
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" });
}

render(Diagram, document.getElementById("app"));
```

We've placed a `Circle` mark inside the `Bluefish` element. A mark draws a primitive object (like a
circle or a piece of text) on the screen. They don't have any children, so
they use _self-closing_ tag like `<Circle ... />`.

We give arguments the `Circle` element, called _props_. We surround a prop's values in curly braces
unless the value is a string.

::: info NOTE
Marks in Bluefish are similar to SVG primitives, _not_ marks in charting libraries.
They only draw a single element.
:::

## Build the row of planets

Right now we just have one circle. To make more, we can just copy-paste the `Circle` mark a few
times with different sizes and fills:

```tsx
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return [
    Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
    Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }), // [!code ++]
    Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }), // [!code ++]
    Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }), // [!code ++]
  ];
}

render(Diagram, document.getElementById("app"));
```

But they're drawn on top of each other!

![overlapping circles](/learn/assets/overlaid-circles.png)

### Create a row using the `StackH` relation

To fix this, we'll lay them out in a row using the `StackH` relation. A relation visually arranges
elements.

```tsx
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return StackH(
    { spacing: 50 }, // [!code ++]
    Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
    Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
    Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
    Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" })
  ); // [!code ++]
}

render(Diagram, document.getElementById("app"));
```

![circle stack](/learn/assets/circle-stack.png)

This `StackH` relation horizontally stacks its children 50 pixels apart from each other and vertically
centers them.

### Nest `StackH` in a `Background` relation

Next we'll put a background around the planets. To do so, we'll use the `Background` relation.

```tsx{6,13}
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return Background(
      { padding: 80, fill: "#859fc9", stroke: "none" },
      StackH({ spacing: 50 }, [
        Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
      ]),
    );
}

render(Diagram, document.getElementById("app"));
```

![circle stack with background](/learn/assets/circle-stack-with-background.png)

Let's look closely at `Background`'s props:

```tsx
Background({ padding: 40, background: () => Rect({ fill: "#859fc9" }) }, ...)
```

We first specify a `padding` of 40px. Next we specify a mark for the background. In this case the background is a `Rect`
mark. Notice that we have contained this mark in an _arrow function_: `() => ...`. We have to do
this whenever we use a mark as a prop.

## Add a label

Now that we've created a horizontal row of the planets, let's add a label to one of them.

### Overlap relations with `Ref`

We first want our diagram to look like this:

![circle stack with background and a label on mercury](/learn/assets/mercury-label.png)

We've vertically stacked a piece of text above the circle that corresponds to Mercury. The code we
add is a pretty direct translation of this description!

```tsx
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return [
    Background(
      { padding: 80, background: () => Rect({ fill: "#859fc9" }) },
      StackH(
        { spacing: 50 },
        Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }), // [!code --]
        Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }), // [!code ++]
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" })
      )
    ),
    StackV({ spacing: 30 /* [!code ++] */ }, [
      Text("Mercury"), // [!code ++]
      Ref({ select: "mercury" }), // [!code ++]
    ]), // [!code ++]
  ];
}

render(Diagram, document.getElementById("app"));
```

Let's walk through this carefully. First we give the Mercury circle a name so we can refer to it:

```tsx
Circle({ r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }), // [!code --]
Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }), // [!code ++]
```

Then we create a vertical stack:

```tsx
StackV({ spacing: 30 }, ...)
```

And place a text mark above the Mercury circle:

```tsx
StackV({ spacing: 30 }, [Text("Mercury"), Ref({ select: "mercury" })]);
```

The `Ref` element lets us select an existing element by name.

### Put a `Background` behind the planet and the label

Finally, we can place a `Background` relation behind the label just as we did with the `Background`
behind the planets.

```tsx
import {
  Bluefish,
  Group,
  StackH,
  StackV,
  Circle,
  Text,
  Ref,
  Background,
  Arrow,
  Align,
  Distribute,
  Rect,
} from "@bluefish-js/solid";

export default function Diagram() {
  return (
    <Bluefish>
      <Background padding={40} background={() => <Rect fill="#859fc9" />}>
        <StackH spacing={50}>
          <Circle name="mercury" r={15} fill="#EBE3CF" stroke-width={3} stroke="black" />
          <Circle r={36} fill="#DC933C" stroke-width={3} stroke="black" />
          <Circle r={38} fill="#179DD7" stroke-width={3} stroke="black" />
          <Circle r={21} fill="#F1CF8E" stroke-width={3} stroke="black" />
        </StackH>
      </Background>
      <Background background={() => <Rect stroke="black" stroke-width={3} fill="none" rx={10} />}>
        {" "}
        // [!code ++]
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

```tsx [active]
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return [
    Background(
      { padding: 40, fill: "#859fc9", stroke: "none" },
      StackH({ spacing: 50 }, [
        Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
      ])
    ),
    Background({ rx: 10 }, StackV({ spacing: 30 }, [Text("Mercury"), Ref({ select: "mercury" })])),
  ];
}

render(Diagram, document.getElementById("app"));
```

:::

If you want to explore more, try playing around with `spacing` and `padding`, or switching `StackH`
and `StackV`.

## What's next?

When you're ready, there are few paths forward from here:

- Learn more about relations in [part 2](/learn/tutorial-2-relations.md) of this tutorial.
- Explore our [examples](/examples/).
- Read the Bluefish [API reference](/api-reference/).
