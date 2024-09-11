// Syntax and rewrite rules experiments
declare function align(alignment: string, ...args: any[]): any;
declare function rect({
  x,
  y,
  width,
  height,
  fill,
}: {
  x?: number;
  y?: number;
  width: number;
  height: number;
  fill: string;
}): any;

const example1 = rect({
  x: 32,
  y: 45,
  width: 100,
  height: 150,
  fill: "steelblue",
});

const example2 = align("center", [
  rect({
    width: 100,
    height: 150,
    fill: "steelblue",
  }),
  rect({
    width: 50,
    height: 50,
    fill: "lightgreen",
  }),
]);

const example3 = () => {
  const rect1 = rect({
    width: 100,
    height: 150,
    fill: "steelblue",
  });

  const rect2 = rect({
    width: 50,
    height: 50,
    fill: "lightgreen",
  });

  return align("center", [rect1, rect2]);
};

const example4 = () => {
  const rect1 = rect({
    width: 100,
    height: 150,
    fill: "steelblue",
  });

  const rect2 = rect({
    width: 50,
    height: 50,
    fill: "lightgreen",
  });

  return [align("centerX", [rect1, rect2]), align("centerY", [rect1, rect2])];
};

const example5 = () => {
  const rect1 = rect({
    width: 100,
    height: 150,
    fill: "steelblue",
  });

  const rect2 = rect({
    width: 50,
    height: 50,
    fill: "lightgreen",
  });

  return [
    align("center", [rect1, rect2]),
    align("center", [rect2, rect({ width: 20, height: 30, fill: "magenta" })]),
  ];
};

const example6 = () => ({
  rect1: rect({
    width: 100,
    height: 150,
    fill: "steelblue",
  }),

  rect2: rect({
    width: 50,
    height: 50,
    fill: "lightgreen",
  }),

  get _() {
    return [
      align("center", [this.rect1, this.rect2]),
      align("center", [
        this.rect2,
        rect({ width: 20, height: 30, fill: "magenta" }),
      ]),
    ];
  },
});

const example7 = () => {
  // parent is example7
  const rect1 = rect({
    width: 100,
    height: 150,
    fill: "steelblue",
  });

  // parent is example7
  const rect2 = rect({
    width: 50,
    height: 50,
    fill: "lightgreen",
  });

  return {
    render: [
      // aligns' parents are example7
      align("center", [rect1, rect2]),
      align("center", [
        rect2,
        // parent is align
        rect({ width: 20, height: 30, fill: "magenta" }),
      ]),
    ],
    export: { rect1, rect2 },
  };
};

/* 
Key problem: what concepts can be used to construct `align` and `row` and `link`?
What's the most compositional way of doing this?


link and row are similar

row(a, b) => TransformGroup({children: [a, b], layout: RowLayout})
link(a, b) => TransformGroup({children: [a, b, Line()], layout: LinkLayout})

but align is more complex. first of all it may align on one or two axes. If it aligns on two axes,
then it seems like it should define a TransformGroup. If it aligns on one axis, then it can't be a
transform group, right? We have a choice for a single axis: TransformGroup, TransformGuide (single
axis version of TransformGroup), Layout.

We have another design constraint. We'd like row ~= align + distribute. How we do this depends on
whether we represent align as a Layout or a TransformGroup. If it is a Layout, then we need a way of
composing the align and distribute layouts. If it is a TransformGroup, then we need to contain it in
another TransformGroup.

A vote in favor of everything being a TransformGroup is that if things are aligned, then they are
visually grouped.

If we choose to represent align as a layout, then we can probably define an Align group using an
align layout. What is the tradeoff of doing that?

In practice, sometimes align is intended to be used as a kind of layout constraint. This seems to be
in cases where the input children are not fully specified by the alignment. (i.e. when aligning on a
single axis when the other axis is not yet specified)

row(a, b) => TransformGroup({children: [a, b]}, layout: [AlignLayout, DistributeLayout])

align(a, b) => TransformGroup({children: [a, b]}, layout: [AlignLayout]) // TransformGroup ensures
that positions of children are fully specified

Alternatively, everything could be a TransformGuide.

align(a, b) => TransformGuide({children: [a, b]}, layout: [AlignLayout])

One of the biggest problems is resolving all the different coordinate systems. Having coordinate
systems associated with Aligns and Distributes seems to complicate things a lot, especially when
it's not clear that they should have coordinate systems of their own.

But if we consider something like DOT layout or tidy tree layout, then we can do x- and y-axis
layout independently for them. Should these be modeled as layouts or as guides? When they fully
specify both axes it definitely seems like they should be groups that can be moved around. But when
they specify just a single axis, it doesn't seem like you should be able to move them.

*/
export {};
