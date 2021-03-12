# Courier React Components (CRC)

CRC is a monorepo using [Lerna](https://www.lerna.com) and contains many packages that are installed separately while depending on each other.

---

---

### Public Packages:

[react-provider](https://github.com/trycourier/courier-react/pacakges/react-provider)

This package exports a component called `CourierProvider` which creates a [context](https://reactjs.org/docs/context.html) object that is required for the following packages.

---

[react-toast](https://github.com/trycourier/courier-react/pacakges/react-toast)

`CourierToast` is a non modal, component used to display brief, optional-expiring windows of information to a user. This can be integrated with a `push` provider or can be triggered manually.

---

[react-inbox](https://github.com/trycourier/courier-react/pacakges/react-inbox)

`CourierInbox` is a component used to display a history of `read` and `unread` messages to a user.

---

---

### Development

All commands in a monorepo are run in the `root` of the project. You should never have to navigate into any of the sub-packages to do any development.

### Commands

- `yarn`

  There is a postinstall task that will bootstrap the `lerna` project and `symlink` each package to eachother if they have dependencies to other packages in this repo.

- `yarn start`

  This will initiate a `storybook` instance inside `packages/storybook`. THis is where all development for these packages should be done.

- `yarn publish`

  This will publish the packages to `npm` and version them together. This should only be run via `github actions`.

- `yarn typecheck`

  Run typechecking on each package

- `yarn build`

  Run `babel` and transpile each package to a consumable js `dist` folder.

- `yarn clean`

  Cleans all `node_modules` from each package and deletes the root `node_modules`. Sometimes useful if packages have gotten out of date.
