---
outline: deep
---

Bluefish has three kinds of primitives: marks, relations, and special.

# Marks

A **mark** is a basic visual element. Bluefish's marks are mostly thin wrappers around SVG
primitives. However, unlike in SVG, in Bluefish a mark's position and size are often omitted,
because they are determined by relations instead.

- [`Circle`](/api-reference/marks/circle)
- [`Ellipse`](/api-reference/marks/ellipse)
- [`Image`](/api-reference/marks/image)
- [`Path`](/api-reference/marks/path)
- [`Rect`](/api-reference/marks/rect)
- [`Text`](/api-reference/marks/text)

# Relations

A **relation** is a visual arrangement of elements. Bluefish's relations are inspired by Gestalt
relations including uniform density, alignment, common region, and connectedness.

- [`Align`](/api-reference/relations/align)
- [`Arrow`](/api-reference/relations/arrow)
- [`Background`](/api-reference/relations/background)
- [`Distribute`](/api-reference/relations/distribute)
- [`Group`](/api-reference/relations/group)
- [`Line`](/api-reference/relations/line)
- [`Stack`](/api-reference/relations/stack)

# Special

Bluefish provides additional primitives for overlapping relations, composing new marks and
relations, and creating new mark and relation primitives.

- [`Bluefish`](/api-reference/special/bluefish)
- [`Ref`](/api-reference/special/ref)
- [`withBluefish`](/api-reference/special/withBluefish)
- [`Layout`](/api-reference/special/layout)

<!-- ## `Bluefish`

`Bluefish` denotes the region of the specification that is controlled by the Bluefish framework.
Bluefish primitives cannot be used outside this region.

## `Ref`

`Ref` (in conjunction with `createName`) provide _declarative references_. These references let you
select an existing element (either a mark or a relation of marks) and use it in another relation.
`createName` creates a new name in the current scope to avoid name collisions.

## `withBluefish`

Custom mark and relation definitions must be wrapped in the `withBluefish` higher-order component.
This component handles reference scopes.

## `Layout`

When you can't compose the mark or relation you want using Bluefish's existing primitives, you can
use the lower-level `Layout` API to define your own. This API works similarly to Jetpack Compose's
own `Layout` API. -->
