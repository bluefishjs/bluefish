import Bluefish from "../../bluefish";
import { OhmParser } from "../../example-gallery/ohm-parser";
import { expression } from "./ohmProps";

export const OhmParserTest = () => {
  return (
    <Bluefish debug={false}>
      <OhmParser expression={expression}  />
    </Bluefish>
  );
};
