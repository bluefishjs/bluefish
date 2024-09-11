import Bluefish from "../../bluefish";
import { PythonTutor } from "../../python-tutor/python-tutor";
import { pythonProps } from "./pythonTutorProps";

export const PythonTutorTest = () => {
  return (
    <Bluefish debug={false}>
      <PythonTutor {...pythonProps} />
    </Bluefish>
  );
};
