import * as bluefish from "@bluefish-js/solid";

const {
  Bluefish,
  Background,
  StackH,
  StackV,
  Circle,
  Text,
  Ref,
  Distribute,
  Align,
  Arrow,
  withBluefish,
  Group,
  Rect,
  createName,
  For,
  Show,
} = bluefish.Hyperscript;

// so that colors in this diagram match the colors of the original diagram
const color = (t: number) => {
  const T = 0.1 + 0.8 * (1 - t);
  const s = Math.max(0, Math.min(1, T)); // clamp to [0,1]

  const r = Math.max(0.05, Math.min(1, 3 * T - 2));
  const g = 3 * s * s - 2 * s * s * s;
  const b = 1 - Math.sqrt(1 - Math.max(0, Math.min(1, 3 * T)));

  return `rgba(${r * 255}, ${g * 255}, ${b * 255}, .75)`;
};

function findPosToInsert<T>(sorted: T[], item: T) {
  const findIndex = sorted.findIndex((v) => v >= item);
  if (findIndex === -1) return sorted.length;
  else return findIndex;
}
function insertAtPos<T>(array: T[], pos: number, item: T) {
  const result = [...array];
  result.splice(pos, 0, item); // modifies result in-place
  return result;
}
// insertion sort implemented as a generator function.
// at each stage of the algorithm, the iterable returned by
// this function yields the array at that stage and the move
// the algorithm is about to perform.
function* insertionSort<T>(unsorted: T[], sorted: T[] = []): Generator<{ ar: T[]; move: [number, number] }> {
  if (unsorted.length === 0) {
    yield { ar: sorted, move: [sorted.length, sorted.length] };
    return sorted;
  }

  const entryToSort = unsorted[0];
  const posToInsert = findPosToInsert(sorted, entryToSort);

  if (sorted.length > 0)
    yield {
      ar: [...sorted, ...unsorted],
      move: [sorted.length, posToInsert],
    };

  const newSorted = insertAtPos(sorted, posToInsert, entryToSort);
  const newUnsorted = unsorted.slice(1);
  yield* insertionSort(newUnsorted, newSorted);
}

const LabelText = withBluefish((props: any) =>
  Text(
    {
      "font-family": "serif",
      "font-style": "italic",
      "font-weight": 300,
      fill: "gray",
      y: -2 /* magic offset to visually center text */,
    },
    props.children
  )
);

const ArrayEntryText = withBluefish((props: any) =>
  Text({ "font-family": "serif", "font-weight": 300, y: -2 /* magic offset to visually center text */ }, props.children)
);

const ArrayEntry = withBluefish((props: any) =>
  Background(
    { background: () => Rect({ fill: props.color, rx: 8 }) },
    Align(
      { alignment: "center" },
      Circle({ r: 13, fill: "rgba(255,255,255,0.6)" }),
      ArrayEntryText({ highlight: props.highlight }, props.data)
    )
  )
);

const ArrayOutline = withBluefish((props: any) =>
  Background({ background: () => Rect({ fill: "none", stroke: "black", strokeWidth: 2, rx: 8 }) }, props.children)
);

const DashedBorder = withBluefish((props: any) =>
  Background(
    {
      padding: 8,
      background: () => Rect({ fill: "none", stroke: "teal", strokeWidth: 4, rx: 12, strokeDasharray: "12" }),
    },
    props.children
  )
);

const InsertionSortStep = withBluefish((props: any) => {
  const {
    ar,
    move: [from, to],
  } = props.iterationData;
  const stage = props.stage;

  const entryNames = ar.map((entry) => createName(entry));

  return Group(
    ArrayOutline(
      StackH(
        { spacing: 3 },
        For({ each: ar }, (entry, i) =>
          ArrayEntry({ highlight: i === stage + 1, name: entryNames[i], data: entry, color: color(stage / 7) })
        )
      )
    ),
    DashedBorder(Ref(entryNames[0]), Ref(entryNames[from - 1])),
    Show({ when: from !== to }, () =>
      Arrow({ padEnd: 2, padStart: 0, straights: false, flip: true }, Ref(entryNames[from]), Ref(entryNames[to]))
    )
  );
});

const stageLabel = (stage, length) => {
  if (stage === 0) return "Unsorted";
  if (stage === length - 1) return "Sorted";
  return "Stage " + stage;
};

const InsertionSortDiagram = withBluefish((props) => {
  const insertionSortIterationData = [...insertionSort(props.unsortedArray)];
  return Group(
    StackV(
      { spacing: 15 },
      For({ each: insertionSortIterationData }, (iterationData, i) =>
        InsertionSortStep({ name: i(), stage: i(), iterationData: iterationData })
      )
    ),
    For({ each: insertionSortIterationData }, (iterationData, i) =>
      StackH({ spacing: 20 }, LabelText({ children: () => stageLabel(i(), props.unsortedArray.length) }), Ref(i()))
    )
  );
});

type InsertionSortProps = {
  unsortedArray: number[];
};
