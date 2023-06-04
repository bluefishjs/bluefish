import { Align, Distribute, Group, Rect, Ref, Row } from '@bluefishjs/bluefish';

export type VariableProps = any;

export function Variable({ data }: { data: VariableProps }) {
  // const { pointObject, name, value, opId } = data;

  // Declares font used in Python Tutor Diagrams
  const fontFamily = 'verdana, arial, helvetica, sans-serif';

  return (
    <Group id="group">
      {/* Creates frame of Variable component (text label & box for value) */}
      {/* <Text
          contents={name}
          fontSize={'24px'}
          fontFamily={fontFamily}
          fill={'black'}
        /> */}
      <Align x={0} y={0} id="alignRow" alignment="centerVertically">
        <Rect id="name" width={10} height={10} fill="magenta" />
        <Rect id="box" height={40} width={40} fill={'#e2ebf6'} />
      </Align>
      <Distribute id="distribute" direction="horizontal" spacing={5}>
        <Ref id="rowRef1" refId="name" />
        <Ref id="rowRef2" refId="box" />
      </Distribute>
      {/* Creates left and bottom edge borders */}
      {/* <Rect id="boxBorderLeft" height={40} width={2} fill={'#a6b3b6'} /> */}
      {/* <Rect id="boxBorderBottom" height={2} width={40} fill={'#a6b3b6'} /> */}
      {/* Creates text labels of variable */}
      {/* <Text
        name={valueName}
        contents={value}
        fontFamily={fontFamily}
        fontSize={'24px'}
        fill={'black'}
      /> */}
      {/* <Rect id="valueName" width={10} height={10} fill="green" /> */}
      {/* Align text and border components to variable frame */}
      <Align id="align1" alignment="bottomCenter">
        {/* <Ref id="ref1" refId="boxBorderBottom" /> */}
        <Rect id="boxBorderBottom" height={2} width={40} fill={'#a6b3b6'} />
        <Ref id="ref2" refId="box" />
      </Align>
      <Align id="align2" alignment="centerLeft">
        {/* <Ref id="ref3" refId="boxBorderLeft" /> */}
        <Rect id="boxBorderLeft" height={40} width={2} fill={'#a6b3b6'} />
        <Ref id="ref4" refId="box" />
      </Align>
      <Align id="align3" alignment="center">
        {/* <Ref id="ref5" refId="valueName" /> */}
        <Rect id="valueName" width={10} height={10} fill="green" />
        <Ref id="ref6" refId="box" />
      </Align>
    </Group>
  );
}

export default Variable;
