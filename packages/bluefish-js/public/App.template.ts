import { Text, render } from "../src";

function App() {
  return Text(
    "Duplicate this file and name it `App.ts` to use the dev playground!"
  );
}

render(App, document.getElementById("root")!);
