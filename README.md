# Quickstart Dev Guide

After cloning this repository, please follow these steps to get started on development with Bluefish.

1. Run the following command to globally install Turbo:

   ```sh
   npm install turbo --global
   ```

   _For more information on how to do this, please reference the [Turbo docs](https://turbo.build/repo/docs/getting-started/installation#global-installation)_

2. Run `pnpm install`.
3. Navigate to `packages/bluefish-solid/public` and duplicate the `App.template.tsx` file. Rename the copy to `App.tsx`.
4. Navigate to `packages/bluefish-js/public` and duplicate the `App.template.ts` file. Rename the copy to `App.ts`.
5. From the root of this repository, run `turbo build`.
6. Once the packages have been built, you can run `turbo dev`, and it will render in your browser whatever is in the `App.ts(x)` files.
   - If you just want to run one of the two packages, run `pnpm dev` from either the `bluefish-js` or `bluefish-solid` folders.
