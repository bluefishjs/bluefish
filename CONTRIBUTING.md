# TODO: This is not intended to be a complete contribution guide yet.

Our goal in this document is to just keep track of the things we have to explain.

This repo is a monorepo implemented using Nx.
We are using pnpm as our package manager.
New dependencies must always be added at the top level. There is a single global pnpm-lock.yaml.

`libs` contains the libraries
- `core` contains the core scenegraph code that is essential for the Bluefish library
- `components` contains the stdlib of components (perceptual groupings and domain-specific layouts)
- `bluefish` contains both `core` and `components`. It's the main package for getting started.
**TODO: default import should include both core and components.**
`apps` contains the website/documentation
- `components-e2e` cypress tests (not really doing anything right now)
- `docs` documentation will live here (not yet)
- `docs-e2e` documentation testing? probably will delete this

# Testing

Run storybook on the components project:
`nx storybook components`

Generate new storybook story templates in e.g. `components`:
`nx g @nx/react:stories --project=components --tsConfiguration=true`

# Building

Build e.g. `components`:
`nx build components`
