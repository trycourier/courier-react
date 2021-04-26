## Contributing to `courier-react`

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

# Quick Start

We use `yarn` here at Courier, so please use yarn aswell so we don't have to have conflicting `package.lock` and `yarn.lock` files.

1. `git clone https://github.com/trycourier/courier-react.git`
2. `cd courier-react`
3. `yarn`
4. `yarn start`

After running step #4, we will start a storybook instance and this is where you will do most all of your development.

# Monorepo

This is a monorepo using [Lerna](https://www.lerna.com) and contains many packages that are installed separately while depending on each other. All packages are versioned together.

---

### Development

All commands in a monorepo are run in the `root` of the project. You should never have to navigate into any of the sub-packages to do any development.

### Commands

- `yarn`

  There is a postinstall task that will bootstrap the `lerna` project and `symlink` each package to eachother if they have dependencies to other packages in this repo.

- `yarn start`

  This will initiate a `storybook` instance inside `packages/storybook`. THis is where all development for these packages should be done.

- `yarn lerna:version`
  Bump the packages version, should be done before publishing.

- `yarn publish`

  This will publish the packages to `npm` and version them together. This should only be run via `github actions`.

- `yarn typecheck`

  Run typechecking on each package

- `yarn build`

  Run `babel` and transpile each package to a consumable js `dist` folder.

- `yarn clean`

  Cleans all `node_modules` from each package and deletes the root `node_modules`. Sometimes useful if packages have gotten out of date.

---
