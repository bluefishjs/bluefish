import { For } from "solid-js";
import Arrow from "../arrow";
import { createName } from "../createName";
import Group from "../group";
import Ref from "../ref";
import { StackH } from "../stackh";
import withBluefish, { WithBluefishProps } from "../withBluefish";
import GlobalFrame from "./global-frame";
import Heap from "./heap";
import { StackSlot, HeapObject, Address } from "./types";

type PythonTutorProps = WithBluefishProps<{
    stack: StackSlot[];
    heap: HeapObject[];
    heapArrangement: (Address | null)[][];
    debug?: boolean;
  }>;
  
  export const PythonTutor = withBluefish((props: PythonTutorProps) => {
    const globalFrameName = createName("globalFrame");
    const heapName = createName("heap");
  
    // Maps object number to the ID of the corresponding heap object
    // This will help generate Arrows between objects
    const objectIdToComponentId = new Map<number, string>();
    props.heapArrangement.forEach((row, rowIndex) => {
      row.forEach((obj, colIndex) => {
        if (obj !== null) {
          objectIdToComponentId.set(obj, `row${rowIndex}_col${colIndex}`);
        }
      });
    });
  
    return (
      <Group
        rels={() => (
          <>
            {/* Make arrows from stack slots to heap objects */}
            <For each={props.stack}>
              {(stackSlot, stackSlotIndex) =>
                typeof stackSlot.value === "object" &&
                "type" in stackSlot.value &&
                stackSlot.value.type === "pointer" ? (
                  <Arrow
                    bow={0}
                    stretch={0}
                    flip
                    stroke="#1A5683"
                    padStart={0}
                    start
                  >
                    <Ref
                      select={[
                        globalFrameName,
                        `stackSlot-${stackSlotIndex()}`,
                        "value",
                      ]}
                    />
                    <Ref
                      select={[
                        heapName,
                        `address-${stackSlot.value.value}`,
                        "elm-0",
                      ]}
                    />
                  </Arrow>
                ) : null
              }
            </For>
          </>
        )}
      >
        <StackH alignment="top" spacing={60}>
          <GlobalFrame name={globalFrameName} variables={props.stack} />
          <Heap
            name={heapName}
            heap={props.heap}
            heapArrangement={props.heapArrangement}
          />
        </StackH>
      </Group>
    );
  });
  