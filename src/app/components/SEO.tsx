import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock';
}

export function SEO({
  title,
  description,
  url = 'https://www.skywaysuites.co.ke',
  image = 'https://www.skywaysuites.co.ke/og-image.jpg',
  type = 'website',
  keywords = [],
  author = 'Skyway Suites',
  publishedTime,
  modifiedTime,
  price,
  currency = 'KES',
  availability = 'InStock',
}: SEOProps) {
  const fullTitle = title.includes('Skyway Suites') ? title : `${title} | Skyway Suites`;
  const siteUrl = 'https://www.skywaysuites.co.ke';
  const canonicalUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  // Default keywords for all pages
  const defaultKeywords = [
    'Skyway Suites',
    'Kenya property rental',
    'Nairobi accommodation',
    'vacation rentals Kenya',
    'short term rental',
    'luxury suites Kenya',
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Skyway Suites" />
      <meta property="og:locale" content="en_KE" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Product specific (for property listings) */}
      {type === 'product' && price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content={currency} />
          <meta property="product:availability" content={availability} />
        </>
      )}

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
}
