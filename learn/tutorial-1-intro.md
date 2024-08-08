# Tutorial: The Basics

You'll make this diagram of the four terrestrial planets:

**TODO: insert preview!!!!**

This tutorial doesn't assume you know
anything about Bluefish or UI frameworks. Along the way we'll encounter JSX syntax, marks,
relations, and declarative references.

## Tutorial setup

Fork this live code editor.

## A look at the starter code

### JSX notation

### The `Bluefish` container

### The `Circle` mark

## Build the row of planets

### Create a row using the `StackH` relation

### Nest `StackH` in a `Background` relation

## Add a label

### Overlap relations with `Ref`

### Put a `Background` behind the planet and the label

## Getting Started with Bluefish

Let's start by looking at a simple example:

```jsx
<Bluefish>
  <Background background={() => ...}>
    <StackH spacing={50}>
      <Circle r={15} fill={"#EBE3CF"} ... />
      <Circle r={36} fill={"#DC933C"} ... />
      <Circle r={38} fill={"#179DD7"} ... />
      <Circle r={21} fill={"#F1CF8E"} ... />
    </StackH>
  </Background>
</Bluefish>
```

This code creates a simple diagram of four circles in a horizontal stack, contained within a background. Let's break it down step by step:

1. The `<Bluefish>` tag wraps our entire diagram specification.
2. Inside, we have a `<Background>` relation that sets a background for our diagram.
3. The `<StackH>` relation arranges its children horizontally with a spacing of 50 units.
4. Inside the `<StackH>`, we have four `<Circle>` marks representing planets.

## Adding Complexity

Now, let's add some complexity to our diagram by labeling one of the planets:

```jsx
<Bluefish>
  <Background background={() => ...}>
    <StackH spacing={50}>
      <Circle name="mercury" r={15} fill={"#EBE3CF"} ... />
      <Circle r={36} fill={"#DC933C"} ... />
      <Circle r={38} fill={"#179DD7"} ... />
      <Circle r={21} fill={"#F1CF8E"} ... />
    </StackH>
  </Background>
  <StackV spacing={30}>
    <Text>Mercury</Text>
    <Ref select="mercury" />
  </StackV>
</Bluefish>
```

Here's what's new:

1. We've given the first `<Circle>` a `name` attribute of "mercury".
2. We've added a new `<StackV>` relation outside of the `<Background>`.
3. Inside the `<StackV>`, we have a `<Text>` element for the label, and a `<Ref>` element that references the "mercury" circle.

This demonstrates a key feature of Bluefish: the ability for elements to participate in multiple relations simultaneously. The "mercury" circle is part of both the horizontal stack of planets and the vertical stack with its label.

## Relations in Bluefish

In Bluefish, relations are the building blocks of diagrams. They're similar to components in UI frameworks, but with two key differences:

1. Relations can share children with other relations.
2. Relations don't need to fully specify their children's layout.

This flexibility allows for more expressive and intuitive diagram specifications.

## Trading Locality for Expressiveness

Bluefish allows you to smoothly trade locality for expressiveness in your diagram specifications. Let's see how we can make our specification more flexible:

```jsx
<Bluefish>
  <Background background={() => ...}>
    <StackH spacing={50}>
      <Circle name="mercury" r={15} fill={"#EBE3CF"} ... />
      <Circle r={36} fill={"#DC933C"} ... />
      <Circle r={38} fill={"#179DD7"} ... />
      <Circle r={21} fill={"#F1CF8E"} ... />
    </StackH>
  </Background>
  <Text name="label">Mercury</Text>
  <Background>
    <Ref select="label" />
    <Ref select="mercury" />
  </Background>
</Bluefish>
```

In this version:

1. We've moved the `<Text>` element out of the `<StackV>` and given it a name.
2. We've replaced the `<StackV>` with a new `<Background>` that references both the label and the "mercury" circle.

This more diffuse specification allows for easier atomic edits. For example, we could easily change the `<Background>` to an `<Arrow>` to connect the label to the planet instead:

```jsx
<Arrow>
  <Ref select="label" />
  <Ref select="mercury" />
</Arrow>
```

## Further Decomposition

We can make our specification even more flexible by breaking down composite relations into their constituent parts:

```jsx
<Bluefish>
  <Background background={() => ...}>
    <StackH spacing={50}>
      <Circle name="mercury" r={15} fill={"#EBE3CF"} ... />
      <Circle r={36} fill={"#DC933C"} ... />
      <Circle r={38} fill={"#179DD7"} ... />
      <Circle r={21} fill={"#F1CF8E"} ... />
    </StackH>
  </Background>
  <Text name="label">Mercury</Text>
  <Align alignment="centerX">
    <Ref select="label" />
    <Ref select="mercury" />
  </Align>
  <Distribute direction="vertical">
    <Ref select="label" />
    <Background name="planets">
      <Ref select="mercury" />
    </Background>
  </Distribute>
</Bluefish>
```

In this final version:

1. We've replaced the `<Background>` around the label and planet with separate `<Align>` and `<Distribute>` relations.
2. We've added a new `<Background>` around just the "mercury" planet and given it a name.
3. The `<Distribute>` relation now spaces the label relative to the entire planets background.

This decomposition allows for even more flexible editing of the diagram's layout.

## What's Next?

This introduction has covered the core concepts of Bluefish: relations, references, and trading locality for expressiveness. From here, you might want to explore:

- The full API reference for Bluefish's standard library of marks and relations
- How to create custom marks and relations
- More complex examples in the Bluefish gallery

Happy diagramming with Bluefish!
