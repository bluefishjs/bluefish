import Bluefish from "../../bluefish";
import { InsertionSort } from "../../example-gallery/insertion-sort";
import { sortProps } from "./insertionSortProps";

export const InsertionSortTest = () => {
  return (
    <Bluefish debug={false}>
      <InsertionSort unsortedArray={sortProps} />
    </Bluefish>
  );
};
