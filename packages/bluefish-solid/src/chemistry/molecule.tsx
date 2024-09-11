import { withBluefish } from "../withBluefish";
import Atom from "./atom";
import Bond from "./bond";
import Ref from "../ref";
import Group from "../group";
// @ts-expect-error untyped file
import SmilesDrawer from "smiles-drawer/app.js";
// @ts-expect-error untyped file
import SvgDrawer from "smiles-drawer/src/SvgDrawer";
// @ts-expect-error untyped file
import ThemeManager from "smiles-drawer/src/ThemeManager";
import { For } from "solid-js";
import Circle from "../circle";

// Code for chemical molecule; integrates with Smiles Drawer
export type MoleculeProps = { chemicalFormula: string; ariaLabel: string };

export const Molecule = withBluefish((props: MoleculeProps) => {
  const options = {};
  let bonds: any[] = [];
  let atoms: any[] = [];
  let rings: any[] = [];

  const chemicalDrawer = new SvgDrawer(options);

  SmilesDrawer.parse(props.chemicalFormula, function (tree: any) {
    let preprocessor = chemicalDrawer.preprocessor;
    preprocessor.initDraw(tree, "dark", false, []);

    chemicalDrawer.themeManager = new ThemeManager(
      chemicalDrawer.opts.themes,
      "dark"
    );
    if (chemicalDrawer.svgWrapper === null || chemicalDrawer.clear) {
      const fakeSvgWrapper = {
        maxX: -Number.MAX_VALUE,
        maxY: -Number.MAX_VALUE,
        minX: Number.MAX_VALUE,
        minY: Number.MAX_VALUE,
        opts: chemicalDrawer.opts,
        drawingWidth: 0,
        drawingHeight: 0,
      };
      chemicalDrawer.svgWrapper = fakeSvgWrapper;
    }

    preprocessor.processGraph();

    determineDimensions(chemicalDrawer.svgWrapper, preprocessor.graph.vertices);

    let [tempEdges, tempVertices, tempRings] =
      extractVerticeEdgeRingInformation(chemicalDrawer);

    bonds = bonds.concat(tempEdges);
    atoms = atoms.concat(tempVertices);
    rings = rings.concat(tempRings);
  });

  function extractVerticeEdgeRingInformation(drawer: any) {
    const graph = drawer.preprocessor.graph;
    const edges = graph.edges.map((edgeObject: any) => {
      return {
        ...edgeObject,
        id: `edge-${edgeObject.id}`,
        idNum: edgeObject.id,
        sourceId: `vertex-${edgeObject.sourceId}`,
        sourceNum: edgeObject.sourceId,
        destId: `vertex-${edgeObject.targetId}`,
        destNum: edgeObject.targetId,
        ref: `edge-${edgeObject.id}`,
        lcr: drawer.preprocessor.areVerticesInSameRing(
          drawer.preprocessor.graph.vertices[edgeObject.sourceId],
          drawer.preprocessor.graph.vertices[edgeObject.targetId]
        )
          ? drawer.preprocessor.getLargestOrAromaticCommonRing(
              drawer.preprocessor.graph.vertices[edgeObject.sourceId],
              drawer.preprocessor.graph.vertices[edgeObject.targetId]
            )
          : null,
      };
    });

    const vertices = graph.vertices.map((vObject: any) => {
      return {
        ...vObject,
        xLoc: vObject.position.x,
        yLoc: vObject.position.y,
        id: `vertex-${vObject.id}`,
        idNum: vObject.id,
        isTerminal: vObject.isTerminal(),
      };
    });

    const rings = drawer.preprocessor.rings.map((ringObject: any) => {
      return {
        ...ringObject,
        id: `ring-${ringObject.id}`,
        idNum: ringObject.id,
      };
    });

    // for every ring in ring object, add the center of the ring to the edge object
    rings.forEach((ringObject: any) => {
      let ringMembers = ringObject.members;
      let ringCenter = ringObject.center;

      ringMembers.forEach((member: any) => {
        edges.forEach((edge: any) => {
          if (edge.sourceNum === member) {
            edge.ringCenterX = ringCenter.x;
            edge.ringCenterY = ringCenter.y;
          }
        });
      });
    });

    return [edges, vertices, rings];
  }

  const atomNames = atoms.map((v) => v.id) as string[];
  const bondNames = bonds.map((e) => e.id) as string[];
  const ringsName = rings.map((r) => r.id) as string[];

  // Remap the vertices and edges to include the names
  atoms = atoms.map((v, index) => {
    return {
      ...v,
      name: atomNames[index],
    };
  });

  bonds = bonds.map((e, index) => {
    return {
      ...e,
      name: bondNames[index],
    };
  });

  /**
   * Determine drawing dimensiosn based on vertex positions.
   *
   * @param {Vertex[]} vertices An array of vertices containing the vertices associated with the current molecule.
   */
  function determineDimensions(svgWrapper: any, vertices: any) {
    for (const vertex of vertices) {
      if (!vertex.value.isDrawn) {
        continue;
      }

      let p = vertex.position;

      if (svgWrapper.maxX < p.x) svgWrapper.maxX = p.x;
      if (svgWrapper.maxY < p.y) svgWrapper.maxY = p.y;
      if (svgWrapper.minX > p.x) svgWrapper.minX = p.x;
      if (svgWrapper.minY > p.y) svgWrapper.minY = p.y;
    }

    // Add padding
    const padding = svgWrapper.opts.padding;
    svgWrapper.maxX += padding;
    svgWrapper.maxY += padding;
    svgWrapper.minX -= padding;
    svgWrapper.minY -= padding;

    svgWrapper.drawingWidth = svgWrapper.maxX - svgWrapper.minX;
    svgWrapper.drawingHeight = svgWrapper.maxY - svgWrapper.minY;
  }

  function findEdgesVerticesOfRing(ringElm: any, edges: any, vertices: any) {
    let ringEdges: any[] = [];
    let ringVertices: any[] = [];

    let usedEdges: any[] = [];

    // filter vertices so that only the ones in ringElm are included
    ringVertices = vertices.filter((v: any) => {
      return ringElm.includes(v.id);
    });

    // filter edges, if source and destination of edge in ringElm, then include
    ringEdges = edges.filter((e: any) => {
      return ringElm.includes(e.sourceId) && ringElm.includes(e.destId);
    });

    usedEdges = ringEdges.map((e: any) => {
      return e.id;
    });

    return [{ edges: ringEdges, vertices: ringVertices }, usedEdges];
  }

  return (
    <Group aria-label={props.ariaLabel}>
      <For each={atoms}>
        {(v, index) => (
          <Atom
            {...v}
            name={atomNames[index()]}
            cx={(v.xLoc + 10) * 1.2}
            cy={(v.yLoc + 10) * 1.2}
            r={10}
            fill="black"
            content={v.value.element}
            isTerminal={v.isTerminal}
            bondCount={v.value.bondCount}
            ariaHidden={true}
          />
        )}
      </For>

      <For each={bonds}>
        {(e, index) => (
          <Bond
            {...e}
            stroke="black"
            stroke-width={2}
            name={bondNames[index()]}
            bondType={e.bondType}
            ringCenterX={(e.ringCenterX + 10) * 1.2}
            ringCenterY={(e.ringCenterY + 10) * 1.2}
          >
            <Ref select={atomNames[e.sourceNum]} />
            <Ref select={atomNames[e.destNum]} />
          </Bond>
        )}
      </For>

      {/* Overdraw */}
      <For each={atoms}>
        {(v) => (
          <Atom
            {...v}
            name={v.name + "-overdraw"}
            cx={(v.xLoc + 10) * 1.2}
            cy={(v.yLoc + 10) * 1.2}
            r={10}
            fill="black"
            content={v.value.element}
            isTerminal={v.isTerminal}
            bondCount={v.value.bondCount}
            ariaHidden={true}
          />
        )}
      </For>
    </Group>
  );
});
