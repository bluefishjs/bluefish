# Contributing to Bluefish

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Setup

1. Fork and clone the repo
2. Run `pnpm install` to install dependencies. (Ensure you have `pnpm` first)
3. Create a branch for your PR with `git checkout -b your-branch-name`
4. To keep the `main` branch of your fork pointing to this repo, run

```
git remote add upstream https://github.com/bluefishjs/rockfish.git
git fetch upstream
git branch --set-upstream-to=upstream/main main
```

5. If you want to experiment with changes locally, you can duplicate `App.template.tsx` and rename
   it to `App.tsx`. This file is ignored by git, so you can make changes to it without affecting the
   repo.
6. If you are adding a bug fix or feature, add a test or example, respectively, to `stories/` and verify that it works with `pnpm storybook`.

## Running

The code can be run with `pnpm start`. This should open a web browser that serves `App.tsx`, typically on `localhost:3000/public/index.html`.
You can use `App.tsx` as a scratchpad for experiments.

To check examples, run `pnpm storybook`. This will launch storybook, typically on `localhost:6006`.
Changes to examples must be verified by a contributer before a PR can be accepted.

## Design Principles and Goals

Minor bug fixes and features may be accepted readily. For major changes to be accepted into Bluefish, they should adhere to Bluefish's design principles.

### End-User Goals

- **Local Reasoning:** Users should be able to understand a Bluefish program by reasoning locally about individual components rather than globally across the entire program.
- **Gradual Specification:** It should be possible to make small changes to a Bluefish program and get meaningful outputs at each step.

### System Interface Goals

- **Simple Core:** The core of the system should have simple interface. This includes the layout engine and declarative references. Individual components may have complex sets of parameters.
- **Extensibile:** As much as possible no component should be ``privileged'' by the core system. New APIs should be accessible to both standard library and user-defined elements.

### System Design Principles

- **Composition:** To achieve simplicity, aim to design simple pieces that compose in complex ways.
- **Abstraction:** To achieve extensibility, aim to design pieces that can be abstracted into functions without changing their behavior.

## Acknowledgements

This contributing doc is based on [Vega-Lite's](https://github.com/vega/vega-lite/blob/main/CONTRIBUTING.md) and [Excalidraw's](https://docs.excalidraw.com/docs/introduction/contributing).
