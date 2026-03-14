import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getProperties, Property } from '../lib/api';
import { PropertyCard } from '../components/PropertyCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import { BreadcrumbStructuredData } from '../components/StructuredData';

export function AllProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinPrice = minPrice === '' || property.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === '' || property.price <= Number(maxPrice);
    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="py-12">
      <SEO 
        title="Browse All Properties"
        description="Explore our complete collection of vacation rentals and accommodations in Kenya. Find apartments, villas, and luxury suites in Nairobi and surrounding areas. Book your perfect stay today."
        url="/properties"
        keywords={[
          'browse properties',
          'all listings',
          'Kenya rentals',
          'available properties',
          'accommodation search',
        ]}
      />
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: '/' },
        { name: 'All Properties', url: '/properties' },
      ]} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">All Properties</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}