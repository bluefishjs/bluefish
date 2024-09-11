import { ParentProps } from "solid-js";
import { Id, withBluefish } from "../../src";
import Background from "../../src/background";

export type NeighborhoodProps = ParentProps<{
  name: Id;
}>;

export const Neighborhood = withBluefish((props: NeighborhoodProps) => {
  return (
    <Background name={props.name} padding={20}>
      {props.children}
    </Background>
  );
});
