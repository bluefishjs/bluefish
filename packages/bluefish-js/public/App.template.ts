import { Bluefish, Text, render } from "../src";

function App() {
  return Bluefish(Text("Duplicate this file and name it `App.tsx` to use the dev playground!"));
}

render(App, document.getElementById("root")!);
