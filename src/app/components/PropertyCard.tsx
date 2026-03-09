import { Link } from 'react-router';
import { MapPin, Users, Bed, Bath } from 'lucide-react';
import { Property } from '../lib/api';
import { Card, CardContent } from './ui/card';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link to={`/properties/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url('${property.image}')` }}
        />
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{property.title}</h3>
            <span className="text-[#6B7C3C] font-semibold">${property.price}/night</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {property.guests}
            </div>
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {property.bedrooms}
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {property.bathrooms}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}