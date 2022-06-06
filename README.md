
# Okendo Reviews - Hydrogen Demo App
This demo app is based on the default Shopify Hydrogen app. Learn how to create the default Hydrogen app [here](https://shopify.dev/custom-storefronts/hydrogen/getting-started/create).

Incorporated in to the app is the Okendo Hydrogen Component Library.

## Okendo Hydrogen Component Library
For an overview of the component library and technical documentation, please see [here](https://www.npmjs.com/package/@okendo/shopify-hydrogen)

## Environment Variables

You will need to create a `.env` file with the following entries:

    VITE_SHOPIFY_STORE_DOMAIN=<your myshopify.com domain e.g. iheartokendo.myshopify.com>

    VITE_SHOPIFY_STOREFRONT_TOKEN=<your shopify storefront token - https://shopify.dev/custom-storefronts/hydrogen/getting-started/create>

    VITE_OKENDO_SUBSCRIBER_ID=<YOUR OKENDO SUBSCRIBER ID>

# Only use the entries below if you wish to override production Okendo API/CDN values

    VITE_OKENDO_API_DOMAIN=<YOUR OKENDO API DOMAIN - If not supplied defaults to api.okendo.io>

    VITE_OKENDO_CDN=<YOUR OKENDO CDN DOMAIN - If not supplied defaults to cdn.okendo.io>


**Requirements:**



- Node.js version 16.5.0 or higher

- Yarn



```bash

yarn

yarn dev

```



Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!



## Previewing a production build



To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `yarn preview`:



```bash

yarn build

yarn preview

```



## Building for production



```bash

yarn build

```



Then, you can run a local `server.js` using the production build with:



```bash

yarn serve

```



## Running tests



This project contains basic end-to-end (E2E) tests in the `/tests/e2e` folder powered by [Vitest](https://vitest.dev).



You can run tests in development, and they will automatically reload when you make changes to the component you provide to `hydrogen.watchForUpdates()`:



```bash

yarn test

```



To run tests in a continuous-integration (CI) environment like GitHub Actions:



```bash

yarn test:ci

```
