<p align="center">
	<img height="300" src="./images/logo-path.svg">
</p>

# Another Electron React Boilerplate with Typescript Support

A boilerplate to develop an electron application with react in a simple manner

## Introduction

This project integrates a React application in an Electron container
with build and package support written in Typescript.\
A minimal set of dependencies allows easy updatability and maintenance.\
It is set up and written as simple as possible
so everyone can understand and configure the boilerplate code for their needs.

## Getting Started

First, create a new repository from the github web interface
or clone the project and manually integrate the changes into your own project.

After you initialized the project install the development dependencies with:

```
npm ci
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Compiles the main process script and starts the react-scripts development server.\
After the first compilation it opens an electron window with the rendered content.\

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
Additionally, it builds the main electron process scripts next to the webpage build.

The build is minified and the filenames include the hashes.

### `npm run package`

Builds the app described the the `npm run build` step and creates packages for different operating systems.

If you want to package for only one operating system, call:

```
npm run package:linux  # for linux operating systems
npm run package:win    # for windows operating systems
npm run package:mac    # for macOS operating systems
```

Look at the `build` property in the `package.json` if you want to configure the package process.\
The scripts calls the [electron-builder](https://www.electron.build/) which reads this property from the `package.json`.

To configure electron-builder, take a look at their [documentation](https://www.electron.build/configuration/configuration).

### `npm run style`

Styles and formats all project files with the defined style.

It uses [Prettier](https://prettier.io/), an opportunistic code formatter,
which can configured via the `.prettierrc.js` file.

Please also take a look at the `.editorconfig` which defines the default formatting in your editor.\
For more information, take a look at their [landing page](https://editorconfig.org/).

## Project structure

```yaml
root:
  - .github    # github related files like workflows, issue templates, configurations, ...
  - build      # the build output of react-script builder and the main process script
  - images     # images and branding for the project
  - main       # here are the source code for the main process scripts
    with:
      - electron.ts  # main process script file - here you can configure the behaviour of electron
  - public     # template files which will be copied to the build folder on the build step
  - release    # here are the executables of the package step placed
  - resources  # resource files like icons, logos, configuration files for the electron-builder
  - src        # the development root the React app
    with:
      - assets      # non source files like multimedia, binary blobs, compiled parts, ...
      - components  # React components
      - hooks       # React hooks
      - lib         # generic libraries like converters, connectors or utility functions
      - model       # global Typescript definitions used in the project (you can also access these types in the main process scripts)
      - index.tsx   # the root of the React app
  - .editorconfig        # style and format definitions for your IDE or code editor
  - .prettieringore      # defines which files prettier does not change (like a .gitignore for git repos)
  - .prettierrc.js       # style and format definitions for prettier
  - package.json         # main project information source - here are all project related things defined (like name, dependencies, build, ...)
  - package-lock.json    # detailed information about the installed dependencies and their relation to each other
  - tsconfig.json        # the Typescript configuration file for the React app and their builder
  - tsconfig.main.json   # the Typescript configuration file for the build of main process scripts of electron
```

## Learn More

If you have any questions, please first take a look at the [FAQ](https://github.com/fliegwerk/electron-react-boilerplate/wiki/FAQ).

To learn React, check out the [React documentation](https://reactjs.org/).
