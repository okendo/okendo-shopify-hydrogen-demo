> **Note**
> This demo store is built on Hydrogen v2, based on Remix. If you are using a store built with the now deprecated Hydrogen 1, please see [here](https://github.com/okendo/okendo-shopify-hydrogen-demo/tree/hydrogen-1-archive).

> Note: there have been multiple versions of Shopify's Hydrogen demo store. If you project is based on an old version of it, consult the history of this repository.

# Demo store for Okendo's Hydrogen components

Please read the [documentation of the `@okendo/shopify-hydrogen` library](https://www.npmjs.com/package/@okendo/shopify-hydrogen).

This demo store is simply the template created by the command `npm create @shopify/hydrogen@latest` [provided by Shopify](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started), to which the Okendo components have been added. Have a look at the commit history to see exactly what changes have been made.

## Requirements

- Your store must be running Okendo Widget Plus – our newer widget offering. Upgrading is free.
- Node.js version `18.0.0` or higher.

## Start the demo store locally

- Create the file `.shopify/project.json` with the following values from your Hydrogen store:

```json
{
  "shop": "<shop-name>.myshopify.com",
  "shopName": "<shop-name>",
  "email": "<your-email>",
  "storefront": {
    "id": "gid://shopify/HydrogenStorefront/<store-id>",
    "title": "<store-title>"
  }
}
```

- Replace the two instances of `<your-okendo-subscriber-id>` in `app/root.tsx` with your Okendo subscriber ID.

Your Okendo User ID identifies your Okendo account. You can get this information from the Okendo section in the integration settings of the Okendo app.

- Run:

```bash
npm ci
npm run dev
```
