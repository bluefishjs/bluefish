import { BBox, Id, Inferred, Transform } from "./scenegraph";

/* A collection of common Bluefish Error types */

export type BluefishError = {
  type: string;
  source: Id;
  display: (resolveScopeName: (name: Id) => Id) => string;
};

export type DimUnownedError = {
  type: "DimUnownedError";
  name: Id;
  dim: keyof BBox;
} & BluefishError;

export const dimUnownedError = ({
  source,
  name,
  dim,
}: {
  source: Id;
  name: Id;
  dim: keyof BBox;
}): DimUnownedError => {
  return {
    type: "DimUnownedError",
    source,
    name,
    dim,
    display: (resolveScopeName) =>
      `${resolveScopeName(name)}'s ${dim} is undefined`,
  };
};

export type DimAlreadyOwnedError = {
  type: "DimAlreadyOwnedError";
  name: Id;
  owner: Id | Inferred;
  dim: keyof BBox;
  value: number;
} & BluefishError;

export const dimAlreadyOwnedError = ({
  source,
  name,
  owner,
  dim,
  value,
}: {
  source: Id;
  name: Id;
  owner: Id | Inferred;
  dim: keyof BBox;
  value: number;
}): DimAlreadyOwnedError => {
  return {
    type: "DimAlreadyOwnedError",
    source,
    name,
    owner,
    dim,
    value,
    display: (resolveScopeName) =>
      `tried to set ${resolveScopeName(
        name
      )}'s ${dim} to ${value}, but it is already owned by ${
        typeof owner === "object" ? "<inferred>" : resolveScopeName(owner)
      }. A dimension cannot be set if it is already owned by another node.`,
  };
};

export type TranslateAlreadyOwnedError = {
  type: "TranslateAlreadyOwnedError";
  name: Id;
  owner: Id | Inferred;
  axis: keyof Transform["translate"];
  value: number;
} & BluefishError;

export const translateAlreadyOwnedError = ({
  source,
  name,
  owner,
  axis,
  value,
}: {
  source: Id;
  name: Id;
  owner: Id | Inferred;
  axis: keyof Transform["translate"];
  value: number;
}): TranslateAlreadyOwnedError => {
  return {
    type: "TranslateAlreadyOwnedError",
    source,
    name,
    owner,
    axis,
    value,
    display: (resolveScopeName) =>
      `tried to set ${resolveScopeName(
        name
      )}'s transform.translate.${axis} to ${value}, but it is already owned by ${
        typeof owner === "object" ? "<inferred>" : resolveScopeName(owner)
      }. A dimension cannot be set if it is already owned by another node.`,
  };
};

export type AccumulatedTransformUndefinedError = {
  type: "AccumulatedTransformUndefinedError";
  name: Id;
  dim: keyof BBox;
  axis: keyof Transform["translate"];
  value: number;
} & BluefishError;

export const accumulatedTransformUndefinedError = ({
  source,
  name,
  dim,
  axis,
  value,
}: {
  source: Id;
  name: Id;
  dim: keyof BBox;
  axis: keyof Transform["translate"];
  value: number;
}): AccumulatedTransformUndefinedError => {
  return {
    type: "AccumulatedTransformUndefinedError",
    source,
    name,
    dim,
    axis,
    value,
    display: (resolveScopeName) =>
      `tried to set ${resolveScopeName(
        name
      )}'s ${dim} to ${value}, but the accumulated transform.translate.${axis} is undefined. We are skipping this operation`,
  };
};

export type DimNaNError = {
  type: "DimNaNError";
  name: Id;
  dim: keyof BBox;
} & BluefishError;

export const dimNaNError = ({
  source,
  name,
  dim,
}: {
  source: Id;
  name: Id;
  dim: keyof BBox;
}): DimNaNError => {
  return {
    type: "DimNaNError",
    source,
    name,
    dim,
    display: (resolveScopeName) =>
      `tried to set ${resolveScopeName(name)}'s ${dim} to NaN`,
  };
};

export type DimSetUndefinedError = {
  type: "DimSetUndefinedError";
  name: Id;
  dim: keyof BBox;
} & BluefishError;

export const dimSetUndefinedError = ({
  source,
  name,
  dim,
}: {
  source: Id;
  name: Id;
  dim: keyof BBox;
}): DimSetUndefinedError => {
  return {
    type: "DimSetUndefinedError",
    source,
    name,
    dim,
    display: (resolveScopeName) =>
      `tried to set ${resolveScopeName(
        name
      )}'s ${dim} to undefined, but it already has a value. A dimension cannot be set to undefined if it already has a value.
We are skipping this operation`,
  };
};

export type IdNotFoundError = {
  type: "IdNotFoundError";
  caller: string;
} & BluefishError;

export const idNotFoundError = ({
  source,
  caller,
}: {
  source: Id;
  caller: string;
}): IdNotFoundError => {
  return {
    type: "IdNotFoundError",
    source,
    caller,
    display: (resolveScopeName) =>
      `tried to find ${resolveScopeName(
        source
      )}, but it doesn't exist in the scenegraph. This error occurred in ${caller}.`,
  };
};

export type ParentRefError = {
  type: "ParentRefError";
  caller: string;
  child: Id;
} & BluefishError;

export const parentRefError = ({
  source,
  caller,
  child,
}: {
  source: Id;
  caller: string;
  child: Id;
}): ParentRefError => {
  return {
    type: "ParentRefError",
    source,
    caller,
    child,
    display: (resolveScopeName) =>
      `This node is a ref, so it cannot be the parent of another node. But this node is a parent of ${resolveScopeName(
        child
      )}. This error occurred in ${caller}.`,
  };
};
