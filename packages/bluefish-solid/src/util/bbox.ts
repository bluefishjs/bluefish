import { createMemo, untrack } from "solid-js";
import { maybeAdd, maybeDiv, maybeMax, maybeMin, maybeSub } from "./maybe";
import { createStore, produce } from "solid-js/store";
import { BBoxOwners, Id, Inferred, inferred } from "../scenegraph";

export type Dim =
  | "left"
  | "top"
  | "centerX"
  | "centerY"
  | "right"
  | "bottom"
  | "width"
  | "height";

export type Axis = "x" | "y";

export const axisMap: { [key in Dim]: "x" | "y" } = {
  left: "x",
  centerX: "x",
  right: "x",
  top: "y",
  centerY: "y",
  bottom: "y",
  width: "x",
  height: "y",
};

export type BBox = { [key in Dim]?: number };

export const from = (bboxes: BBox[]): BBox => {
  if (bboxes.length === 0)
    return {
      centerX: 0,
      centerY: 0,
      width: 0,
      height: 0,
    };

  const bboxesStructOfArray = {
    left: bboxes.map((bbox) => bbox.left),
    top: bboxes.map((bbox) => bbox.top),
    width: bboxes.map((bbox) => bbox.width),
    height: bboxes.map((bbox) => bbox.height),
  };

  const left = maybeMin(bboxesStructOfArray.left);

  const right = maybeMax(
    bboxesStructOfArray.left.map((left, i) =>
      maybeAdd(left, bboxesStructOfArray.width[i])
    )
  );

  const top = maybeMin(bboxesStructOfArray.top);

  const bottom = maybeMax(
    bboxesStructOfArray.top.map((top, i) =>
      maybeAdd(top, bboxesStructOfArray.height[i])
    )
  );

  const width = maybeSub(right, left);
  const height = maybeSub(bottom, top);

  const centerX = maybeAdd(left, maybeDiv(width, 2));
  const centerY = maybeAdd(top, maybeDiv(height, 2));

  return {
    // left,
    // top,
    // right,
    // bottom,
    centerX,
    centerY,
    width,
    height,
  };
};

// The coefficients for the linear equations that define the bounding box dimensions in terms of
// center and size.
// For example, left = 1 * centerX - 0.5 * width, so its entry is [1, -0.5].
export const dimVecs = {
  x: {
    left: [1, -0.5],
    right: [1, 0.5],
    centerX: [1, 0],
    width: [0, 1],
  },
  y: {
    top: [1, -0.5],
    bottom: [1, 0.5],
    centerY: [1, 0],
    height: [0, 1],
  },
} as const;

// solve 2x2 system given two equations e1 and e2
export const solveSystem = (
  e1: [readonly [number, number], number],
  e2: [readonly [number, number], number]
): [number, number] => {
  const a = e1[0][0];
  const b = e1[0][1];
  const c = e1[1];
  const d = e2[0][0];
  const e = e2[0][1];
  const f = e2[1];

  const det = a * e - b * d;

  if (det === 0) {
    throw new Error("system is not solvable");
  }

  const center = (e * c - b * f) / det;
  const size = (a * f - c * d) / det;

  return [center, size];
};

// If eq = [[a, b], c] and vec = [x, y], then this function checks: a * x + b * y = c
export const checkLinearEq = (
  eq: [readonly [number, number], number],
  vec: readonly [number, number],
  tolerance = 1e-6
): boolean => {
  const [a, b] = eq[0];
  const c = eq[1];
  return Math.abs(a * vec[0] + b * vec[1] - c) < tolerance;
};

// If eq = [a, b] and vec = [x, y], then this function computes: a * x + b * y
export const computeLinearExpr = (
  eq: readonly [number, number],
  vec: readonly [number, number]
) => eq[0] * vec[0] + eq[1] * vec[1];

/* 
Creates a linear system of equations representing the bounding box dimensions.

Dimensions along the x- and y-axes are defined using a 2x2 linear system for each axis. Two linear
equations are sufficient to define all the dimensions along a single axis. For example, once left
and right are specified, width and centerX can be inferred. The bounding box dimensions have three
behaviors depending on the number of equations specified:
- (<2): When fewer than two equations are specified, only the property set directly for that axis can be
        read.
- (=2): Once there are at least two equations, all the properties can be read. Properties that were
  not set directly are marked as "inferred," because they are not directly owned.
- (>2): If a user adds more equations, the system checks that the new equations are consistent with the
        existing ones.
*/
export const createLinSysBBox = (): {
  bbox: BBox;
  owners: BBoxOwners;
} => {
  const [equations, setEquations] = createStore<{
    [key in Axis]: { [key in Dim]?: [readonly [number, number], number] };
  }>({
    x: {},
    y: {},
  });

  const [owners, setOwners] = createStore<{
    [key in Axis]: { [key in Dim]?: Id | Inferred };
  }>({
    x: {},
    y: {},
  });

  const centerXAndWidth = createMemo(() => {
    const xEqs = Object.values(equations.x);
    if (xEqs.length < 2) return undefined;
    else {
      const [centerX, width] = solveSystem(xEqs[0], xEqs[1]);
      if (xEqs.length > 2) {
        // check the other equations
        for (const eq of xEqs.slice(2)) {
          if (!checkLinearEq(eq, [centerX, width])) {
            throw new Error(
              `System is not solvable. Equations: ${JSON.stringify(xEqs)}`
            );
          }
        }
      }
      return [centerX, width] satisfies [number, number];
    }
  });

  const centerYAndHeight = createMemo(() => {
    const yEqs = Object.values(equations.y);
    if (yEqs.length < 2) return undefined;
    else {
      const [centerY, height] = solveSystem(yEqs[0], yEqs[1]);
      if (yEqs.length > 2) {
        // check the other equations
        for (const eq of yEqs.slice(2)) {
          if (!checkLinearEq(eq, [centerY, height])) {
            throw new Error(
              `System is not solvable. Equations: ${JSON.stringify(yEqs)}`
            );
          }
        }
      }
      return [centerY, height] satisfies [number, number];
    }
  });

  return {
    bbox: {
      get left() {
        return untrack(() => {
          if ("left" in equations.x) {
            return equations.x.left![1];
          }
          const cw = centerXAndWidth();
          return cw ? computeLinearExpr(cw, dimVecs.x.left) : undefined;
        });
      },
      set left(left: number | undefined) {
        if (left === undefined) {
          setEquations(
            "x",
            produce((dims) => {
              delete dims.left;
            })
          );
        } else {
          setEquations("x", "left", [dimVecs.x.left, left]);
        }
      },
      get centerX() {
        return untrack(() => {
          if ("centerX" in equations.x) {
            return equations.x.centerX![1];
          }
          const cw = centerXAndWidth();
          return cw ? computeLinearExpr(cw, dimVecs.x.centerX) : undefined;
        });
      },
      set centerX(centerX: number | undefined) {
        if (centerX === undefined) {
          setEquations(
            "x",
            produce((dims) => {
              delete dims.centerX;
            })
          );
        } else {
          setEquations("x", "centerX", [dimVecs.x.centerX, centerX]);
        }
      },
      get right() {
        return untrack(() => {
          if ("right" in equations.x) {
            return equations.x.right![1];
          }
          const cw = centerXAndWidth();
          return cw ? computeLinearExpr(cw, dimVecs.x.right) : undefined;
        });
      },
      set right(right: number | undefined) {
        if (right === undefined) {
          setEquations(
            "x",
            produce((dims) => {
              delete dims.right;
            })
          );
        } else {
          setEquations("x", "right", [dimVecs.x.right, right]);
        }
      },
      get width() {
        return untrack(() => {
          if ("width" in equations.x) {
            return equations.x.width![1];
          }
          const cw = centerXAndWidth();
          return cw ? computeLinearExpr(cw, dimVecs.x.width) : undefined;
        });
      },
      set width(width: number | undefined) {
        if (width === undefined) {
          setEquations(
            "x",
            produce((dims) => {
              delete dims.width;
            })
          );
        } else {
          setEquations("x", "width", [dimVecs.x.width, width]);
        }
      },
      get top() {
        return untrack(() => {
          if ("top" in equations.y) {
            return equations.y.top![1];
          }
          const ch = centerYAndHeight();
          return ch ? computeLinearExpr(ch, dimVecs.y.top) : undefined;
        });
      },
      set top(top: number | undefined) {
        if (top === undefined) {
          setEquations(
            "y",
            produce((dims) => {
              delete dims.top;
            })
          );
        } else {
          setEquations("y", "top", [dimVecs.y.top, top]);
        }
      },
      get centerY() {
        return untrack(() => {
          if ("centerY" in equations.y) {
            return equations.y.centerY![1];
          }
          const ch = centerYAndHeight();
          return ch ? computeLinearExpr(ch, dimVecs.y.centerY) : undefined;
        });
      },
      set centerY(centerY: number | undefined) {
        if (centerY === undefined) {
          setEquations(
            "y",
            produce((dims) => {
              delete dims.centerY;
            })
          );
        } else {
          setEquations("y", "centerY", [dimVecs.y.centerY, centerY]);
        }
      },
      get bottom() {
        return untrack(() => {
          if ("bottom" in equations.y) {
            return equations.y.bottom![1];
          }
          const ch = centerYAndHeight();
          return ch ? computeLinearExpr(ch, dimVecs.y.bottom) : undefined;
        });
      },
      set bottom(bottom: number | undefined) {
        if (bottom === undefined) {
          setEquations(
            "y",
            produce((dims) => {
              delete dims.bottom;
            })
          );
        } else {
          setEquations("y", "bottom", [dimVecs.y.bottom, bottom]);
        }
      },
      get height() {
        return untrack(() => {
          if ("height" in equations.y) {
            return equations.y.height![1];
          }
          const ch = centerYAndHeight();
          return ch ? computeLinearExpr(ch, dimVecs.y.height) : undefined;
        });
      },
      set height(height: number | undefined) {
        if (height === undefined) {
          setEquations(
            "y",
            produce((dims) => {
              delete dims.height;
            })
          );
        } else {
          setEquations("y", "height", [dimVecs.y.height, height]);
        }
      },
    },
    owners: {
      get left() {
        return untrack(() => {
          if ("left" in owners.x) {
            return owners.x.left;
          } else if (Object.keys(equations.x).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set left(left: Id | undefined | Inferred) {
        if (left === undefined) {
          setOwners(
            "x",
            produce((dims) => {
              delete dims.left;
            })
          );
        } else {
          setOwners("x", "left", left);
        }
      },
      get centerX() {
        return untrack(() => {
          if ("centerX" in owners.x) {
            return owners.x.centerX;
          } else if (Object.keys(equations.x).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set centerX(centerX: Id | undefined | Inferred) {
        if (centerX === undefined) {
          setOwners(
            "x",
            produce((dims) => {
              delete dims.centerX;
            })
          );
        } else {
          setOwners("x", "centerX", centerX);
        }
      },
      get right() {
        return untrack(() => {
          if ("right" in owners.x) {
            return owners.x.right;
          } else if (Object.keys(equations.x).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set right(right: Id | undefined | Inferred) {
        if (right === undefined) {
          setOwners(
            "x",
            produce((dims) => {
              delete dims.right;
            })
          );
        } else {
          setOwners("x", "right", right);
        }
      },
      get width() {
        return untrack(() => {
          if ("width" in owners.x) {
            return owners.x.width;
          } else if (Object.keys(equations.x).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set width(width: Id | undefined | Inferred) {
        if (width === undefined) {
          setOwners(
            "x",
            produce((dims) => {
              delete dims.width;
            })
          );
        } else {
          setOwners("x", "width", width);
        }
      },
      get top() {
        return untrack(() => {
          if ("top" in owners.y) {
            return owners.y.top;
          } else if (Object.keys(equations.y).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set top(top: Id | undefined | Inferred) {
        if (top === undefined) {
          setOwners(
            "y",
            produce((dims) => {
              delete dims.top;
            })
          );
        } else {
          setOwners("y", "top", top);
        }
      },
      get centerY() {
        return untrack(() => {
          if ("centerY" in owners.y) {
            return owners.y.centerY;
          } else if (Object.keys(equations.y).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set centerY(centerY: Id | undefined | Inferred) {
        if (centerY === undefined) {
          setOwners(
            "y",
            produce((dims) => {
              delete dims.centerY;
            })
          );
        } else {
          setOwners("y", "centerY", centerY);
        }
      },
      get bottom() {
        return untrack(() => {
          if ("bottom" in owners.y) {
            return owners.y.bottom;
          } else if (Object.keys(equations.y).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set bottom(bottom: Id | undefined | Inferred) {
        if (bottom === undefined) {
          setOwners(
            "y",
            produce((dims) => {
              delete dims.bottom;
            })
          );
        } else {
          setOwners("y", "bottom", bottom);
        }
      },
      get height() {
        return untrack(() => {
          if ("height" in owners.y) {
            return owners.y.height;
          } else if (Object.keys(equations.y).length === 2) {
            return inferred;
          } else {
            return undefined;
          }
        });
      },
      set height(height: Id | undefined | Inferred) {
        if (height === undefined) {
          setOwners(
            "y",
            produce((dims) => {
              delete dims.height;
            })
          );
        } else {
          setOwners("y", "height", height);
        }
      },
    },
  };
};
