import { Bluefish, Circle, Text, render } from "../src";

function App() {
  return Circle({ r: 15 });
}

render(App, document.getElementById("root")!);
