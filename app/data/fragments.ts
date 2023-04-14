export const MEDIA_FRAGMENT = `#graphql
  fragment Media on Media {
    __typename
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const OKENDO_PRODUCT_STAR_RATING_FRAGMENT = `#graphql
  fragment OkendoStarRatingSnippet on Product {
    okendoStarRatingSnippet: metafield(
      namespace: "okendo"
      key: "StarRatingSnippet"
    ) {
      value
    }
  }
`;

export const OKENDO_PRODUCT_REVIEWS_FRAGMENT = `#graphql
  fragment OkendoReviewsSnippet on Product {
    okendoReviewsSnippet: metafield(
      namespace: "okendo"
      key: "ReviewsWidgetSnippet"
    ) {
      value
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  ${OKENDO_PRODUCT_STAR_RATING_FRAGMENT}
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    ...OkendoStarRatingSnippet
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
`;
