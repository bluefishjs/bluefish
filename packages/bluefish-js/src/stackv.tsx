import { ParentProps, JSX, mergeProps } from "solid-js";
import { StackArgs, stackLayout } from "./stackLayout";
import withBluefish from "./withBluefish";
import Layout from "./layout";
import { BBox, Transform, ChildNode } from "./scenegraph";
import { AlignmentHorizontal } from "./align";
import { Stack } from "./stack";

export type StackVProps = ParentProps<
  Omit<StackArgs, "direction"> & { alignment?: AlignmentHorizontal }
>;

export const StackV = withBluefish(
  (props: StackVProps) => {
    const stackProps = mergeProps(
      {
        direction: "vertical" as const,
        alignment: "centerX" as const,
      },
      props
    );

    return <Stack {...stackProps} />;
  },
  { displayName: "StackV" }
);
