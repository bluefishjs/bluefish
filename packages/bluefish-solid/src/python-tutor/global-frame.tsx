import { For, createUniqueId } from "solid-js";
import { Id } from "../scenegraph";
import Rect from "../rect";
import Group from "../group";
import Align from "../align";
import Ref from "../ref";
import { StackSlot } from "./stack-slot";
import Distribute from "../distribute";
import Text from "../text";
import { Value } from "./types";
import { createName } from "../createName";
import { StackV } from "../stackv";
import withBluefish from "../withBluefish";

export type GlobalFrameProps = {
  name?: Id;
  variables: { variable: string; value: Value }[];
};

export const GlobalFrame = withBluefish((props: GlobalFrameProps) => {
  const frameName = createName("frame");
  const frameBorderName = createName("frameBorder");
  const labelName = createName("label");
  const frameVariablesName = createName("frameVariables");
  const stackSlotNames = props.variables.map((_, i) =>
    createName(`stackSlot-${i}`)
  );

  // Font declaration
  const fontFamily = "Andale mono, monospace";

  return (
    <Group
      rels={() => (
        <>
          <Align alignment="topCenter">
            <Ref select={labelName} />
            <Ref select={frameName} />
          </Align>
          <Align alignment="centerLeft">
            <Ref select={frameBorderName} />
            <Ref select={frameName} />
          </Align>
          <StackV alignment="right" spacing={10}>
            <Ref select={labelName} />
            <Ref select={frameVariablesName} />
          </StackV>
        </>
      )}
    >
      {/* Global Frame and relevant text */}
      <Rect name={frameName} height={300} width={200} fill={"#e2ebf6"} />
      <Rect name={frameBorderName} height={300} width={5} fill={"#a6b3b6"} />
      {/* TODO: there is a bug where the text is showing up lower than I expect it to... */}
      <Text
        name={labelName}
        font-size={"24px"}
        font-family={fontFamily}
        fill={"black"}
      >
        Global Frame
      </Text>
      <StackV name={frameVariablesName} alignment="right" spacing={10}>
        <For each={props.variables}>
          {(variable, i) => (
            <StackSlot
              name={stackSlotNames[i()]}
              variable={variable.variable}
              value={variable.value as any}
            />
          )}
        </For>
      </StackV>
    </Group>
  );
});

export default GlobalFrame;
