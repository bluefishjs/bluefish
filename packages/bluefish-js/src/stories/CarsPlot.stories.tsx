import { scaleLinear } from "d3-scale";
import { nonNullData } from "../../examples/datasets/cars";
import { Bluefish, withBluefish } from "..";
import { Dot } from "../plot/dot";
import { Plot } from "../plot/plot";
import { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta = {
  title: "Example/Plot/Cars",
};

export default meta;
type Story = StoryObj;

export const Cars: Story = {
  render: () => {
    return (
      <Bluefish width={1000} height={500}>
        <Plot
          data={nonNullData}
          x={(dims: any) =>
            scaleLinear(
              [0, Math.max(...nonNullData.map((d) => +d.Horsepower))!],
              [0, 1000],
            )
          }
          y={(dims: any) =>
            scaleLinear(
              [0, Math.max(...nonNullData.map((d) => +d.Miles_per_Gallon))!],
              [500, 0],
            )
          }
          color={() => () => "cornflowerblue"}
        >
          <Dot x="Horsepower" y="Miles_per_Gallon" color="Miles_per_Gallon" />
        </Plot>
      </Bluefish>
    );
  },
};
