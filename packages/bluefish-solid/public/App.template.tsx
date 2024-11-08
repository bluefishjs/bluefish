import { type Component } from "solid-js";
import { Bluefish, Text } from "../src";

const App: Component = () => {
  return (
    <>
      <Bluefish>
        <Text>
          Duplicate this file and name it `App.tsx` to use the dev playground!
        </Text>
      </Bluefish>
    </>
  );
};

export default App;
