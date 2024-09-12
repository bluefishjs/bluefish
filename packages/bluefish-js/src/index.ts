import { Component, JSX } from "solid-js";
import h from "solid-js/h";

import {
  Align as AlignJSX,
  Arrow as ArrowJSX,
  Background as BackgroundJSX,
  Blob as BlobJSX,
  Bluefish as BluefishJSX,
  Circle as CircleJSX,
  StackV as StackVJSX,
  Distribute as DistributeJSX,
  Group as GroupJSX,
  Image as ImageJSX,
  Layout as LayoutJSX,
  Rect as RectJSX,
  Ref as RefJSX,
  StackH as StackHJSX,
  Text as TextJSX,
  Path as PathJSX,
  withBluefish as withBluefishJSX,
  ArrowProps,
} from "bluefish-solid";

export type ExpandableNode = Node & {
  [key: string]: any;
};
export type HyperScriptReturn = () => ExpandableNode | ExpandableNode[];

export type Child = JSX.Element | HyperScriptReturn;

export type HyperScriptComponent<P> = {
  (props: P, children: Child[]): HyperScriptReturn;
  (props: P, ...children: Child[]): HyperScriptReturn;
};

export function component<P>(fn: Component<P>): HyperScriptComponent<P> {
  return (...args: any[]) => {
    return h(fn, ...args);
  };
}

export const Align = component(AlignJSX);
// NB: type annotation required b/c of transitive perfect-arrows dependency
export const Arrow = component<ArrowProps>(ArrowJSX);
export const Background = component(BackgroundJSX);
export const Blob = component(BlobJSX);
export const Bluefish = component(BluefishJSX);
export const Circle = component(CircleJSX);
export const StackV = component(StackVJSX);
export const Distribute = component(DistributeJSX);
export const Group = component(GroupJSX);
export const Image = component(ImageJSX);
export const Layout = component(LayoutJSX);
export const Rect = component(RectJSX);
export const Ref = component(RefJSX);
export const StackH = component(StackHJSX);
export const Text = component(TextJSX);
export const Path = component(PathJSX);
export function withBluefish(WrappedComponent: Component) {
  return component(withBluefishJSX(WrappedComponent));
}
