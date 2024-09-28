import { Bluefish, Circle, Text, render, StackH, Ref } from "../src";

function App() {
  return [
    Circle({ name: "foo", r: 15 }),
    Circle({ name: "bar", r: 10, fill: "red" }),
    StackH([Ref({ select: "foo" }), Ref({ select: "bar" })]),
  ];
}

render(App, document.getElementById("root")!);
