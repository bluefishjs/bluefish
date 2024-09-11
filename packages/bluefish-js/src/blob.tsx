import { JSX } from "solid-js/jsx-runtime";
import paper from "paper";
import withBluefish from "./withBluefish";
import Layout from "./layout";
import { BBox, Id, Transform } from "./scenegraph";
import { splitProps } from "solid-js";

export type BlobProps = {
  name: Id;
  path: InstanceType<typeof paper.Path>;
} & Omit<JSX.PathSVGAttributes<SVGPathElement>, "d">;

export const Blob = withBluefish(
  (props: BlobProps) => {
    const [_, pathOptions] = splitProps(props, ["name", "path"]);

    const blobPath = () => {
      const blobPath = props.path.clone();
      blobPath.closed = true;
      // apply smoothing twice to make the curves a bit less sharp
      blobPath.smooth({ type: "continuous" });
      blobPath.flatten(4);
      blobPath.smooth({ type: "continuous" });
      // blobPath.smooth({ type: "catmull-rom", factor: 0.5 });
      return blobPath;
    };

    const layout = () => {
      const bounds = blobPath().strokeBounds;
      return {
        bbox: {
          left: bounds.left,
          top: bounds.top,
          width: bounds.width,
          height: bounds.height,
        },
        transform: {
          translate: {},
        },
      };
    };

    const paint = (paintProps: { bbox: BBox; transform: Transform }) => {
      const path = () =>
        (blobPath().exportSVG() as SVGElement).getAttribute("d") ?? "";

      return (
        <g
          transform={`translate(${paintProps.transform.translate.x}, ${paintProps.transform.translate.y})`}
        >
          <path {...pathOptions} d={path()} />
        </g>
      );
    };

    return <Layout name={props.name} layout={layout} paint={paint}></Layout>;
  },
  { displayName: "Blob" }
);

// http://sketch.paperjs.org/#V/0.12.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
/* 
let boundingBoxes = [
    { x: 150, y: 150, width: 60, height: 40 },
    { x: 200, y: 200, width: 50, height: 50 },
    { x: 300, y: 150, width: 40, height: 60 }
];

function convexHull(points) {
    if(points.length < 3) return points; // A convex hull requires at least 3 points
    
    let basePoint = points[0];
    points.forEach(point => {
        if (point.y < basePoint.y || (point.y === basePoint.y && point.x < basePoint.x)) {
            basePoint = point;
        }
    });

    points.sort((a, b) => {
        let angleA = Math.atan2(a.y - basePoint.y, a.x - basePoint.x);
        let angleB = Math.atan2(b.y - basePoint.y, b.x - basePoint.x);
        return angleA - angleB;
    });

    let hull = [points[0], points[1]];
    for (let i = 2; i < points.length; i++) {
        let top = hull.pop();
        while (hull.length > 0 && ccw(hull[hull.length - 1], top, points[i]) <= 0) {
            top = hull.pop();
        }
        hull.push(top, points[i]);
    }

    return hull;
}

function convexHullOfBoxes(boxes) {
    let points = [];
    boxes.forEach(box => {
        points.push(new Point(box.x, box.y));
        points.push(new Point(box.x + box.width, box.y));
        points.push(new Point(box.x, box.y + box.height));
        points.push(new Point(box.x + box.width, box.y + box.height));
    });
    
    return convexHull(points);
}

function ccw(a, b, c) {
    return (c.y - a.y) * (b.x - a.x) - (b.y - a.y) * (c.x - a.x);
}


function generateBlob(boundingBoxes) {
    let hull = convexHullOfBoxes(boundingBoxes);
    let hullPath = new Path();
    hullPath.strokeColor = 'black'; // Visualizing the convex hull
    hull.forEach(point => hullPath.add(point));
    hullPath.closed = true;

    let padding = 10;
    let ellipsePoints = [];
    hull.forEach((point, index) => {
        let previousIndex = index === 0 ? hull.length - 1 : index - 1;
        let nextIndex = (index + 1) % hull.length;

        let previousPoint = hull[previousIndex];
        let nextPoint = hull[nextIndex];

        let angle1 = Math.atan2(point.y - previousPoint.y, point.x - previousPoint.x);
        let angle2 = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);

        let averageAngle = (angle1 + angle2) / 2;
        if (angle1 - angle2 > Math.PI || angle2 - angle1 > Math.PI) averageAngle += Math.PI;

        let eccentricity = Math.abs(Math.PI - Math.abs(angle1 - angle2));
        let ellipseRadius = 50; // You can modify as needed
        let majorAxis = ellipseRadius;
        let minorAxis = majorAxis * eccentricity;
        
        let ellipseCenter = new Point(
            point.x + (minorAxis - padding) * Math.cos(averageAngle + Math.PI / 2),
            point.y + (minorAxis - padding) * Math.sin(averageAngle + Math.PI / 2)
        );

        let ellipse = new Path.Ellipse({
            center: ellipseCenter,
            radius: [majorAxis, minorAxis],
            rotation: averageAngle * 180 / Math.PI,
            strokeColor: 'red' // Visualizing the ellipses
        });

        // Sample points from the boundary of the ellipse
        for (let t = 0; t < Math.PI * 2; t += Math.PI / 8) {
            let x = ellipseCenter.x + majorAxis * Math.cos(t) * Math.cos(averageAngle) - minorAxis * Math.sin(t) * Math.sin(averageAngle);
            let y = ellipseCenter.y + majorAxis * Math.cos(t) * Math.sin(averageAngle) + minorAxis * Math.sin(t) * Math.cos(averageAngle);
            
           // Calculate the direction vectors for the adjacent edges of the convex hull
        //   let dirVec1 = new Point(point.x - hull[previousIndex].x, point.y - hull[previousIndex].y);
        //   let dirVec2 = new Point(hull[nextIndex].x - point.x, hull[nextIndex].y - point.y);
            let dirVec1 = hull[previousIndex].subtract(point);
            let dirVec2 = hull[nextIndex].subtract(point);

           let p1 = new Point(ellipseCenter.x, ellipseCenter.y);
           let p2 = new Point(x, y);
           
           let debugCircle = new Path.Circle(new Point(x, y), 1); // Radius 1 for debugging
           debugCircle.fillColor = 'green'; // Green to visualize considered points
           
          // Check whether the sampled point is on the correct side of both adjacent edges
          if ((p2.subtract(p1).cross(dirVec1) * dirVec1.cross(p1.subtract(hull[previousIndex])) >= 0) &&
              (p2.subtract(p1).cross(dirVec2) * dirVec2.cross(p1.subtract(point)) >= 0)) {
           // Check whether the sampled point's perpendicular distance to both adjacent edges is positive
              ellipsePoints.push(new Point(x, y));
              debugCircle.fillColor = 'magenta';
          } else {
              debugCircle.fillColor = 'black';
          }
        }
    });

    // Compute and visualize the convex hull of the ellipses
    let ellipseHull = convexHull(ellipsePoints);
    let ellipseHullPath = new Path();
    ellipseHullPath.strokeColor = 'blue'; // Visualizing the convex hull of the ellipses
    ellipseHull.forEach(point => ellipseHullPath.add(point));
    ellipseHullPath.closed = true;
}

generateBlob(boundingBoxes);
*/
