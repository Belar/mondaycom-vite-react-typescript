# Monday.com + Vite (React, TypeScript, SWC)

This template is a Vite-based remake of monday.com's official [Quickstart React](https://github.com/mondaycom/welcome-apps/tree/master/apps/quickstart-react) application template.

Past the "Installation and usage" section, you can find instruction on how to update any Vite template to work as a monday.com application development setup.

## Installation and usage

1. Clone the repository

2. Install dependencies
    ```
    npm ci
    ```

3. Configure monday.com's CLI
    ```
    npx @mondaycom/apps-cli init
    ```
    or 
    ```
    mapps init
    ```
    if `@mondaycom/apps-cli` is installed globally.

    You will be asked about your monday.com's [api access token](https://developer.monday.com/api-reference/docs/authentication#accessing-api-tokens), which is necessary for mapps to be able to create a tunnel to your app through monday.com's ngrok.  

4. Start the application
    ```
    npm run start
    ```
    Vite will run the application in dev mode and mapps will tunnel it under a unique url that you can use in [the Developer preview](https://developer.monday.com/apps/docs/quickstart-view#set-up-your-development-environment), it will look something like `https://qwerty12345.apps-tunnel.monday.app`.

## Remake from scratch

This template is React based, if you would like to use a different [Vite template](https://vitejs.dev/guide/) (e.g. for Svelte, Preact, Solid), here are steps on how to update a newly scaffolded project.

0. If you would rather take a quick look at the code, with "by feature" updates, all the steps from below are in commit range `db4e09b^..2f212e6`.

1. [Scaffold a Vite project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

2. Add monday.com's packages
    ```
    npm i -S @mondaycom/apps-sdk monday-sdk-js monday-ui-react-core
    ```
    ```
    npm i -D @mondaycom/apps-cli concurrently cross-port-killer
    ```

3. Update npm scripts
    ```
    “start": "npm run stop && concurrently \"npm run dev\" \"npm run expose\"",
    “expose": "mapps tunnel:create -p 8301",
    “stop": "kill-port 8301 && kill-port 4049 && kill-port 4040"
    ```

4. Update Vite config
    ```
    server: {
      port: 8301,
      strictPort: true,
    },
    define: {
      global: "window",
    },
    ```

    `monday-ui-react-core` depends on `global-cache`, which needs access to the 'global' variable. Vite doesn't shim one, like Webpack does, hence it has to be added explicitly.

5. See "Installation and usage", skip to the step 3.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
