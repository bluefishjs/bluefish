// Integrates with SmilesDrawer: https://pubs.acs.org/doi/10.1021/acs.jcim.7b00425
// SmilesDrawer GitHub Repository: https://github.com/reymond-group/smilesDrawer
// SmilesDrawer Interactive Playground: https://smilesdrawer.surge.sh/

import type { Meta, StoryObj } from "storybook-solidjs";
import { Bluefish } from "../bluefish";
import { Molecule } from "../chemistry/molecule";

const meta: Meta = {
  title: "Example/Molecule",
};

export default meta;
type Story = StoryObj;

export const AspirinMolecule: Story = {
  args: {
    id: "aspirin",
    chemicalFormula: "CC(OC1=C(C(=O)O)C=CC=C1)=O",
    ariaLabel: "Aspirin Molecule",
  },
  render: (props) => (
    <Bluefish>
      <Molecule
        {...props}
        chemicalFormula={props.chemicalFormula}
        ariaLabel={props.ariaLabel}
      />
    </Bluefish>
  ),
};

export const NicotineMolecule: Story = {
  args: {
    id: "nicotine",
    chemicalFormula: "CN1CCCC1C2=CN=CC=C2",
    ariaLabel: "Nicotine Molecule",
  },
  render: (props) => (
    <Bluefish>
      <Molecule
        {...props}
        chemicalFormula={props.chemicalFormula}
        ariaLabel={props.ariaLabel}
      />
    </Bluefish>
  ),
};

export const SucroseMolecule: Story = {
  args: {
    id: "sucrose",
    chemicalFormula: "C(C1C(C(C(C(O1)OC2(C(C(C(O2)CO)O)O)CO)O)O)O)O",
    ariaLabel: "Sucrose Molecule",
  },
  render: (props) => (
    <Bluefish>
      <Molecule
        {...props}
        chemicalFormula={props.chemicalFormula}
        ariaLabel={props.ariaLabel}
      />
    </Bluefish>
  ),
};

export const PenicillinMolecule: Story = {
  args: {
    id: "Penicillin",
    chemicalFormula: "CC1(C(N2C(S1)C(C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C",
    ariaLabel: "Penicillin Molecule",
  },
  render: (props) => (
    <Bluefish>
      <Molecule
        {...props}
        chemicalFormula={props.chemicalFormula}
        ariaLabel={props.ariaLabel}
      />
    </Bluefish>
  ),
};

export const DiphenylEtherMolecule: Story = {
  args: {
    id: "diphenylether",
    chemicalFormula: "C1=CC=C(C=C1)OC2=CC=CC=C2",
    ariaLabel: "Diphenyl ether Molecule",
  },
  render: (props) => (
    <Bluefish>
      <Molecule
        {...props}
        chemicalFormula={props.chemicalFormula}
        ariaLabel={props.ariaLabel}
      />
    </Bluefish>
  ),
};
