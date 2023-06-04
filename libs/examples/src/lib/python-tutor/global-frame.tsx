import { Align, Distribute, Group, Rect, Ref } from '@bluefishjs/bluefish';
import { useId } from 'react';
import Variable from './variable';

export type GlobalFrameProps = {
  variables: any[];
};

export function GlobalFrame({ variables }: GlobalFrameProps) {
  const id = useId();

  // Font declaration
  const fontFamily = 'Andale mono, monospace';

  return (
    <Group id={`group${id}`}>
      {/* Global Frame and relevant text */}
      <Rect id={`frame${id}`} height={300} width={200} fill={'#e2ebf6'} />
      <Rect id={`frameBorder${id}`} height={300} width={5} fill={'#a6b3b6'} />
      {/* <Text
        name={opIdLabel}
        contents={'Global Frame'}
        fontSize={'24px'}
        fontFamily={fontFamily}
        fill={'black'}
      /> */}
      {/* <Rect id={`global frame ${id}`} width={10} height={10} fill="blue" /> */}
      <Align x={0} y={0} id={`align1${id}`} alignment="topCenter">
        {/* <Ref id={`ref1${id}`} refId={`global frame ${id}`} /> */}
        <Rect id={`global frame ${id}`} width={10} height={10} fill="blue" />
        <Ref id={`ref2${id}`} refId={`frame${id}`} />
      </Align>
      <Distribute id={`distribute1${id}`} direction="vertical" spacing={10}>
        <Ref id={`ref3${id}`} refId={`global frame ${id}`} />
        <Align id={`frameVariables${id}`} alignment="right">
          {variables.map((variable, i) => (
            <Variable id={`variable${i}${id}`} data={variable} />
          ))}
        </Align>
        <Distribute id={`distribute2${id}`} direction="vertical" spacing={10}>
          {variables.map((variable, i: number) => (
            <Ref id={`ref4${i}${id}`} refId={`variable${i}${id}`} />
          ))}
        </Distribute>
      </Distribute>
      <Align id={`align3${id}`} alignment="right">
        <Ref id={`ref5${id}`} refId={`frameVariables${id}`} />
        <Ref id={`ref6${id}`} refId={`global frame ${id}`} />
      </Align>
      <Align id={`align4${id}`} alignment="centerLeft">
        <Ref id={`ref7${id}`} refId={`frameBorder${id}`} />
        <Ref id={`ref8${id}`} refId={`frame${id}`} />
      </Align>
    </Group>
  );
}
