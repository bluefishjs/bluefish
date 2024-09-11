const alphabet: any = null;

// Observable Plot
Plot({
  x: { percent: true },
  marks: [
    BarX(alphabet, StackX({ x: "frequency", fillOpacity: 0.3, inset: 0.5 })),
    TextX(alphabet, StackX({ x: "frequency", text: "letter", inset: 0.5 })),
  ],
});

// Bluefish Plot StackX(BarX)
Plot(
  { data: alphabet, x: { percent: true } },
  Align("center", [
    StackX({ spacing: 0.5 }, BarX({ x: "frequency", fillOpacity: 0.3 })),
    TextX({ text: "letter" }),
  ])
);

// Bluefish Plot BarX(StackX)
Plot(
  { data: alphabet, x: { percent: true } },
  Align("center", [
    BarX({
      x: "frequency",
      fillOpacity: 0.3,
      layout: StackX({ spacing: 0.5 }),
    }),
    TextX({ text: "letter" }),
  ])
);

function Plot(...arg0: any) {
  throw new Error("Function not implemented.");
}

function Align(...arg0: any[]): any {
  throw new Error("Function not implemented.");
}

function StackX(...BarX: any): any {
  throw new Error("Function not implemented.");
}

function BarX(...args: any): any {
  throw new Error("Function not implemented.");
}

function TextX(...args: any): any {
  throw new Error("Function not implemented.");
}
