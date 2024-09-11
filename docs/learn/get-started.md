# Getting started

## Install

::: code-group

```bash:no-line-numbers [yarn]
yarn add bluefish-js
```

```bash:no-line-numbers [npm]
npm install bluefish-js
```

```bash:no-line-numbers [pnpm]
pnpm install bluefish-js
```

```bash:no-line-numbers [bun]
bun add bluefish-js
```


### Start REPLs

We have REPLs to get you started for in many different environments and frameworks:

- [Vanilla JS](https://playground.solidjs.com/anonymous/d19113c2-dab6-4867-9d2b-4c14040757b9)
- Vanilla HTML **TODO**
- [Observable](https://observablehq.com/@joshpoll/bluefish-in-observable)
- [Svelte](https://svelte.dev/repl/1fa5bf8713ac4fc2a991560e50564932?version=4.2.1)
- anywidget **TODO**
- SolidJS **TODO**


:::

## Vanilla JS

Here's a starter REPL: https://playground.solidjs.com/anonymous/d19113c2-dab6-4867-9d2b-4c14040757b9

<!-- ::: sandbox

```tsx [index.ts]
import { render } from "solid-js/web";
import * as bluefish from "@bluefish-js/solid";

const { Bluefish, Background, StackH, StackV, Circle, Text, Ref, Distribute, Align, Arrow } = bluefish.Hyperscript;

function App() {
  return Bluefish(
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
}

render(App, document.getElementById("app"));
```

::: -->


## Vanilla HTML

**TODO**

## Observable notebook

Here's a starter notebook: https://observablehq.com/@joshpoll/bluefish-in-observable.

<iframe
  width="100%"
  height="261"
  frameBorder="0"
  src="https://observablehq.com/embed/@joshpoll/bluefish-in-observable@37?cells=planets"
/>

## Svelte

Here's a starter REPL: https://svelte.dev/repl/1fa5bf8713ac4fc2a991560e50564932?version=4.2.1.

## anywidget

**TODO**

## SolidJS

Bluefish has special support for SolidJS. Use the `bluefish-solid` package:

::: code-group

```bash:no-line-numbers [yarn]
yarn add bluefish-solid
```

```bash:no-line-numbers [npm]
npm install bluefish-solid
```

```bash:no-line-numbers [pnpm]
pnpm install bluefish-solid
```

```bash:no-line-numbers [bun]
bun add bluefish-solid
```

:::

Bluefish can then be used with SolidJS's JSX syntax.

Here's a starter REPL: **TODO**