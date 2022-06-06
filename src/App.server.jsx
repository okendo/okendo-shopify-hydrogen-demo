import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  Router,
  Route,
  FileRoutes,
  ShopifyProvider,
  PerformanceMetrics,
  PerformanceMetricsDebug,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import LoadingFallback from './components/LoadingFallback';
import ServerCartProvider from './components/ServerCartProvider.server';
import {OkendoProvider} from '@okendo/shopify-hydrogen';

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyProvider>
        <OkendoProvider
          subscriberId={import.meta.env.VITE_OKENDO_SUBSCRIBER_ID}
          apiDomain={import.meta.env.VITE_OKENDO_API_DOMAIN}
          cdnDomain={import.meta.env.VITE_OKENDO_CDN}
        >
          <ServerCartProvider>
            <DefaultSeo />
            <Router>
              <FileRoutes />
              <Route path="*" page={<NotFound />} />
            </Router>
          </ServerCartProvider>
          <PerformanceMetrics />
          {import.meta.env.DEV && <PerformanceMetricsDebug />}
        </OkendoProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
