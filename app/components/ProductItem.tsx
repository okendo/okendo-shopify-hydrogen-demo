import {OkendoStarRating} from '@okendo/shopify-hydrogen';
import {Image, Money} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {
  CollectionItemFragment,
  ProductItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <Image
          alt={image.altText || product.title}
          aspectRatio="1/1"
          data={image}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4>{product.title}</h4>
      <OkendoStarRating
        className="mb-2"
        productId={product.id}
        okendoStarRatingSnippet={product.okendoStarRatingSnippet}
      />
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}
