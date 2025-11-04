import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import type {EntryContext} from 'react-router';
import {ServerRouter} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    defaultSrc: [
      'https://www.google.com',
      'https://www.gstatic.com',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://d3g5hqndtiniji.cloudfront.net',
      'https://dov7r31oq5dkj.cloudfront.net',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
      'https://api.okendo.io',
      'data:',
    ],
    styleSrc: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
    ],
    connectSrc: [
      'https://api.okendo.io',
      'https://cdn-static.okendo.io',
      'https://surveys.okendo.io',
      'https://api.raygun.com',
      'https://www.google.com',
      'https://www.gstatic.com',
    ],
    frameSrc: ['https://www.google.com', 'https://www.gstatic.com'],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
