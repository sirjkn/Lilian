import { Helmet } from 'react-helmet-async';

interface PropertyStructuredDataProps {
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms?: number;
    bathrooms?: number;
    guests?: number;
    amenities?: string[];
    photos?: string[];
    rating?: number;
    reviewCount?: number;
  };
}

export function PropertyStructuredData({ property }: PropertyStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.title,
    description: property.description,
    image: property.photos || [],
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
      url: `https://www.skywaysuites.co.ke/properties/${property.id}`,
    },
    aggregateRating: property.rating && property.reviewCount ? {
      '@type': 'AggregateRating',
      ratingValue: property.rating,
      reviewCount: property.reviewCount,
    } : undefined,
    brand: {
      '@type': 'Brand',
      name: 'Skyway Suites',
    },
  };

  // Accommodation listing schema
  const accommodationData = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: property.title,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressCountry: 'KE',
    },
    numberOfRooms: property.bedrooms,
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: property.guests,
    },
    amenityFeature: property.amenities?.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
    })),
    image: property.photos || [],
    priceRange: `KES ${property.price}`,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(accommodationData)}
      </script>
    </Helmet>
  );
}

export function OrganizationStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Skyway Suites',
    url: 'https://www.skywaysuites.co.ke',
    logo: 'https://www.skywaysuites.co.ke/logo.png',
    description: 'Premium vacation rentals and accommodation services in Kenya',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@skywaysuites.co.ke',
    },
    sameAs: [
      'https://www.facebook.com/skywaysuites',
      'https://www.instagram.com/skywaysuites',
      'https://twitter.com/skywaysuites',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.skywaysuites.co.ke${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
}
