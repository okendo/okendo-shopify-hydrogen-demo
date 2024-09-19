import {RemixServer} from '@remix-run/react';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import type {EntryContext} from '@shopify/remix-oxygen';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    defaultSrc: [
      "'self'",
      "localhost:*",
      "https://cdn.shopify.com",
      "https://www.google.com",
      "https://www.gstatic.com",
      "https://d3hw6dc1ow8pp2.cloudfront.net",
      "https://d3g5hqndtiniji.cloudfront.net",
      "https://dov7r31oq5dkj.cloudfront.net",
      "https://cdn-static.okendo.io",
      "https://s0gpgg13u6.execute-api.ap-southeast-2.amazonaws.com",
      "https://surveys.okendo.io",
      "https://api.okendo.io",
      "data:",
    ],
    imgSrc: [
      "'self'",
      "https://cdn.shopify.com",
      "data:",
      "https://d3hw6dc1ow8pp2.cloudfront.net",
      "https://d3g5hqndtiniji.cloudfront.net",
      "https://dov7r31oq5dkj.cloudfront.net",
      "https://cdn-static.okendo.io",
      "https://s0gpgg13u6.execute-api.ap-southeast-2.amazonaws.com",
      "https://surveys.okendo.io",
      "https://d2aa2m271lw3pq.cloudfront.net",
    ],
    mediaSrc: [
      "'self'",
      "https://d3hw6dc1ow8pp2.cloudfront.net",
      "https://d3g5hqndtiniji.cloudfront.net",
      "https://dov7r31oq5dkj.cloudfront.net",
      "https://cdn-static.okendo.io",
      "https://s0gpgg13u6.execute-api.ap-southeast-2.amazonaws.com",
      "https://d2aa2m271lw3pq.cloudfront.net",
    ],
    styleSrcElem: [
      "'self'",
      "'unsafe-inline'",
      "https://cdn.shopify.com",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://d3hw6dc1ow8pp2.cloudfront.net",
      "https://cdn-static.okendo.io",
      "https://surveys.okendo.io",
      "https://s0gpgg13u6.execute-api.ap-southeast-2.amazonaws.com",
    ],
    scriptSrc: [
      "'self'",
      "https://cdn.shopify.com",
      "https://d3hw6dc1ow8pp2.cloudfront.net",
      "https://dov7r31oq5dkj.cloudfront.net",
      "https://cdn-static.okendo.io",
      "https://surveys.okendo.io",
      "https://api.okendo.io",
      "https://www.google.com",
      "https://www.gstatic.com",
      "https://s0gpgg13u6.execute-api.ap-southeast-2.amazonaws.com",
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "https://d3hw6dc1ow8pp2.cloudfront.net",
      "https://d3hw6dc1ow8pp2.cloudfront.net",
      "https://dov7r31oq5dkj.cloudfront.net",
      "https://cdn.shopify.com",
      "https://cdn-static.okendo.io",
      "https://surveys.okendo.io",
      "https://s0gpgg13u6.execute-api.ap-southeast-2.amazonaws.com",
    ],
    connectSrc: [
      "'self'",
      "https://monorail-edge.shopifysvc.com",
      "localhost:*",
      "ws://localhost:*",
      "ws://127.0.0.1:*",
      "https://api.okendo.io",
      "https://cdn-static.okendo.io",
      "https://s0gpgg13u6.execute-api.ap-southeast-2.amazonaws.com",
      "https://surveys.okendo.io",
      "https://5i27ysv3j8.execute-api.us-west-2.amazonaws.com",
      "https://api.raygun.com",
      "https://www.google.com",
      "https://www.gstatic.com",
    ],
    frameSrc: [
      "https://www.google.com",
      "https://www.gstatic.com"
    ]
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
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
