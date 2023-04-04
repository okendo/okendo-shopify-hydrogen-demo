### ⚠️ Shopify [has deprecated Hydrogen v1](https://hydrogen.shopify.dev/updates) ⚠️ — We are in the process of adapting Okendo's widget for Hydrogen v2.

# Okendo Reviews - Hydrogen Demo App
This demo app is based on the default Shopify Hydrogen app. Learn how to create the default Hydrogen app [here](https://shopify.dev/custom-storefronts/hydrogen/getting-started/create).

Incorporated in to the app is the Okendo Hydrogen Component Library.

## Okendo Hydrogen Component Library
For an overview of the component library and technical documentation, please see [here](https://www.npmjs.com/package/@okendo/shopify-hydrogen)

## Environment Variables

You will need to create a `.env` file with the following entries:

    VITE_SHOPIFY_STORE_DOMAIN=<your myshopify.com domain e.g. iheartokendo.myshopify.com>

    VITE_SHOPIFY_STOREFRONT_TOKEN=<your shopify storefront token - follow the steps at https://github.com/okendo/okendo-shopify-hydrogen-demo/wiki/Configure-Shopify-Storefront-API>

    VITE_OKENDO_SUBSCRIBER_ID=<YOUR OKENDO SUBSCRIBER ID>

# Hydrogen Demo Store

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/stackblitz/templates/demo-store)

## Getting started

**Requirements:**

- Node.js version 16.5.0 or higher
- Yarn

To create a new Hydrogen app, run:

```bash
npm init @shopify/hydrogen
```

## Running the dev server

Then `cd` into the new directory and run:

```bash
npm install
npm run dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
npm run build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `npm run preview`:

```bash
npm run build
npm run preview
```
