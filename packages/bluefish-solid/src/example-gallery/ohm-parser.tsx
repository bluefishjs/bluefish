import { Show, For } from "solid-js";
import Bluefish from "../bluefish";
import { createName } from "../createName";
import Distribute from "../distribute";
import Group from "../group";
import Rect from "../rect";
import Ref from "../ref";
import { StackH } from "../stackh";
import { StackV } from "../stackv";
import withBluefish from "../withBluefish";
import Text from "../text";
import Align from "../align";
import * as ohm from "ohm-js";
import LayoutFunction from "./layoutfunction";

const myGrammar = ohm.grammar(String.raw`
  Arithmetic {
    Exp
      = AddExp
  
    AddExp
      = AddExp "+" MulExp  -- plus
      | AddExp "-" MulExp  -- minus
      | MulExp
  
    MulExp
      = MulExp "*" PriExp  -- times
      | MulExp "/" PriExp  -- divide
      | PriExp
  
    PriExp
      = "(" Exp ")"  -- paren
      | number
  
    number  (a number)
      = digit+
  }
  `);

const BIG_FONT_STYLE = {
  "font-family": "monospace",
  "font-weight": 500,
  "font-size": 25,
};
const BIG_FONT_CHAR_WIDTH = 60;
const BIG_FONT_SYMBOL_WIDTH = 30;

const LABEL_HEIGHT = 25;
const LABEL_COLOR = "#eee";

const LABEL_COLOR_MAP = {
  Exp: "#b148d2",
  AddExp: "#FFBD27",
  MulExp: "#5cc593",
  PriExp: "#FF6302",
  number: "#00B4D8",
  end: "#EE092D",
};

const LABEL_UNDERLINE_COLOR = "LightGray";
const LABEL_UNDERLINE_HEIGHT = 2;
const LABEL_FONT_STYLE = {
  "font-family": "monospace",
  "font-weight": 300,
  "font-size": 14,
};
const SUB_LABEL_FONT_STYLE = {
  ...LABEL_FONT_STYLE,
  fill: "#777",
  "font-style": "italic",
};

const SPECIAL_LABEL_FONT_STYLE = {
  "font-family": "monospace",
  "font-weight": 300,
  "font-size": 14,
  fill: "green",
};

const Label = withBluefish((props) => {
  const g = createName("g");
  const rect = createName("rect");
  const underline = createName("underline");
  return (
    <Group>
      <Group name={g}>
        <Ref select={props.from} />
        <Show when={props.to}>
          <Ref select={props.to} />
        </Show>
      </Group>

      <Rect
        height={LABEL_HEIGHT}
        name={rect}
        fill={LABEL_COLOR_MAP[props.textOnLabel]}
        opacity={0.5}
      ></Rect>

      <Distribute direction="vertical" spacing={4}>
        <Ref select={props.below} />
        <Ref select={rect} />
      </Distribute>
      <LayoutFunction f={({ left, width, right }) => ({ left, width, right })}>
        <Ref select={g} />
        <Ref select={rect} />
      </LayoutFunction>
      <Align alignment="center">
        <Ref select={rect} />
        {props.children}
      </Align>

      <Show when={props.underlined}>
        <Rect
          height={LABEL_UNDERLINE_HEIGHT}
          name={underline}
          fill={LABEL_UNDERLINE_COLOR}
        ></Rect>
        <LayoutFunction
          f={({ left, width, right }) => ({ left, width, right })}
        >
          <Ref select={g} />
          <Ref select={underline} />
        </LayoutFunction>
        <StackV spacing={-LABEL_UNDERLINE_HEIGHT}>
          <Ref select={rect} />
          <Ref select={underline} />
        </StackV>
      </Show>
    </Group>
  );
});

const LabelText = withBluefish((props) => {
  return (
    <StackH>
      <Text {...LABEL_FONT_STYLE} y={-2}>
        {props.text}
      </Text>
      <Show when={props.note}>
        <Text {...SUB_LABEL_FONT_STYLE} y={-2}>
          {`- ${props.note}`}
        </Text>
      </Show>
    </StackH>
  );
});

const SpecialLabel = withBluefish((props) => {
  const text = createName("text");
  return (
    <Group>
      <Align alignment="centerX">
        <Ref select={props.from} />
        <Text name={text} {...SPECIAL_LABEL_FONT_STYLE}>
          {`"${props.text}"`}
        </Text>
      </Align>
      <Distribute direction="vertical" spacing={4}>
        <Ref select={props.below} />
        <Ref select={text} />
      </Distribute>
    </Group>
  );
});

const Char = withBluefish((props) => {
  return (
    <Align alignment="center">
      <Rect width={props.width}></Rect>
      <Text {...BIG_FONT_STYLE}>{props.children}</Text>
    </Align>
  );
});

const RenderText = withBluefish((props) => {
  const charsStackName = createName("charsStack");
  const lineName = createName("charlineNamesStack");
  return (
    <Group>
      <StackV alignment="left">
        <StackH spacing={4} name={charsStackName}>
          <For each={props.charAndNames}>
            {([char, name]) => (
              <Char name={name} width={BIG_FONT_CHAR_WIDTH}>
                {char}
              </Char>
            )}
          </For>
          <Char name={props.endName} width={BIG_FONT_SYMBOL_WIDTH}></Char>
        </StackH>
        <Rect name={lineName} height={1} fill="gray"></Rect>
      </StackV>
      {/* <SetHorizontalLayout>
        
      </SetHorizontalLayout> */}
      {/* <LayoutFunction f={({ left, width, right }) => ({ left, width, right })}> */}
      <Ref select={charsStackName} />
        <Ref select={lineName} />
      {/* </LayoutFunction> */}
    </Group>
  );
});
const RenderNode = withBluefish((props) => {
  const {
    charNames,
    offset,
    matchLength,
    text,
    parentName,
    ruleName,
    underlined,
  } = props;
  const myName = createName("myName");

  // console.log(ruleName, text);
  return ruleName ? (
    <Label
      name={myName}
      from={charNames[offset]}
      to={charNames[offset + matchLength - 1]}
      below={parentName}
      underlined={underlined}
      textOnLabel={ruleName.split("_")[0]}
      note={ruleName.split("_")[1]}
    >
      <LabelText text={ruleName.split("_")[0]} note={ruleName.split("_")[1]} />
    </Label>
  ) : (
    <SpecialLabel
      below={parentName}
      from={charNames[offset]}
      to={charNames[offset + matchLength - 1]}
      text={text.substring(offset, offset + matchLength)}
    />
  );
});

const RenderTrace = withBluefish((props) => {
  const { trace, offset, text, charNames, parentName } = props;

  const traceName = createName("traceName");

  if ("children" in trace) {
    const children = trace.children.filter(
      (childTrace) => childTrace.ctorName !== "_iter"
    );
    return (
      <Group>
        <RenderNode
          name={traceName}
          text={text}
          charNames={charNames}
          parentName={parentName}
          offset={offset}
          matchLength={trace.matchLength}
          ruleName={trace.ruleName}
          underlined={children.length === 0}
        />
        <For each={children}>
          {(childTrace, i) => (
            <RenderTrace
              trace={childTrace}
              offset={offset + trace.childOffsets[i()]}
              text={text}
              charNames={charNames}
              parentName={traceName}
            />
          )}
        </For>
      </Group>
    );
  } else {
    return (
      <RenderNode
        text={text}
        charNames={charNames}
        parentName={parentName}
        offset={offset}
        matchLength={trace.matchLength}
        ruleName={trace.ruleName}
      />
    );
  }
});

type OhmParserProps = {
  expression: string;
  debug?: boolean;
};
// TODO: synced text box
// TODO: check if parse succeeds
// TODO:
//  - format RenderText chars differently if they are a symbol or char
//  - OR (prob better): set with of chars based on the tree node's contents width

export const OhmParser = withBluefish(
  ({ expression, debug }: OhmParserProps) => {
    // const text = "3+(4*5)";
    const text = expression;
    const charAndNames = text.split("").map((char) => [char, createName(char)]);
    const charNames = charAndNames.map(([c, n]) => n);
    const endName = createName("end");

    const traces = myGrammar.trace(text).bindings;
    // console.log(1, traces);
    return (
      <Group x={0} y={0}>
        <RenderText name="top" charAndNames={charAndNames} endName={endName} />
        <RenderTrace
          trace={traces[0]}
          offset={0}
          text={text}
          charNames={charNames}
          parentName="top"
        />
        <Label from={endName} below="top" textOnLabel="end">
          <LabelText text="end" />
        </Label>
      </Group>
    );
  }
);
