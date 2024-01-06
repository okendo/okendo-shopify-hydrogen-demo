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
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    defaultSrc: [
      "'self'",
      'localhost:*',
      'https://cdn.shopify.com',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
      'https://d3g5hqndtiniji.cloudfront.net',
      'data:',
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'localhost:*',
      'https://d3hw6dc1ow8pp2.cloudfront.net',
    ],
    connectSrc: [
      "'self'",
      'https://monorail-edge.shopifysvc.com',
      'localhost:*',
      'ws://localhost:*',
      'ws://127.0.0.1:*',
      'https://api.okendo.io',
    ],
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
