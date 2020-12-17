# v0.1.0

- initial release of the project
- Typescript Support for the main process scripts and the React app
- developing in an electron container with hot-reloading (from react-scripts)
- style linting and formatting of the project source code
- building of main process scripts with Typescript and React application with react-scripts
- packaging of the build files in an electron app for Linux, Windows and macOS with electron-builder
- predefined continuous integration workflows for application linting, building and testing
- automatic building and packaging on git tags
- automatic dependency updates via dependabot

# v0.2.0

## Features:

- reworked build process: (#22)

  - Restructured project directories
    - Electron specific sources are now in `electron`
    - the main process scripts are in `electron/main`
    - the preload scripts reside in `electron/preload`
  - new build and package scripts
    - the Electron main script will now be packaged with webpack
    - the preload script will also be packages with webpack
  - secured electron main process and their APIs
    - deactivated `nodeIntregration` and enabled `contextIsolation` to lock down renderer processes
    - communication can only happen trough IPC with an additional layer of security with a custom implementation in the built `preload.js` script which will be loaded on every browser window start and injects the custom API into the global window context
    - communication can only happen over registered channels
  - extensive type support both on main process and renderer side
  - automatic devtools loading on development build
  - example implementations: (#7)
    - menu builder and IPC manager on main process side
    - ipc register and send on the renderer side in React
  - unit tests for the custom IPC event hook
  - global typed mocks for Jest integration tests
  - auto update feature (#6)
  - updated README.md (#9)

  The [wiki](https://github.com/fliegwerk/electron-react-boilerplate/wiki) also contains more information about the build process and different scripts used in the project now.

## Updates

### Dependency Updates

- Bump typescript from 4.1.2 to 4.1.3 (#20)
- Bump eslint-plugin-prettier from 3.2.0 to 3.3.0 (#18)
- Bump @types/node from 14.14.11 to 14.14.14 (#25)
- Bump @types/jest from 26.0.17 to 26.0.19 (#16)
- Bump @testing-library/user-event from 12.5.0 to 12.6.0 (#21)
- Bump ts-loader from 8.0.11 to 8.0.12 (#28)
- Bump electron from 11.0.4 to 11.1.0 (#27)

### GitHub Actions Updates

- Bump actions/setup-node from v2.1.2 to v2.1.4 (#26)
