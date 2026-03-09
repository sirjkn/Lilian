import { Link } from 'react-router';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useEffect, useState } from 'react';
import { getProperties, Property } from '../lib/api';
import { PropertyCard } from '../components/PropertyCard';

export function Home() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProperties().then((data) => setProperties(data.slice(0, 3)));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMwMjgyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl mb-6">
              Find Your Perfect Stay with Skyway Suites
            </h1>
            <p className="text-xl mb-8">
              Discover unique properties and unforgettable experiences around the world
            </p>
            <div className="bg-white rounded-lg p-6 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Where are you going?"
                      className="border-0 p-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <Input
                      type="date"
                      className="border-0 p-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div>
                  <Link to="/properties">
                    <Button className="w-full h-full">
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Why Choose Skyway Suites?</h2>
            <p className="text-gray-600">Experience the best in vacation rentals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#E8E3DB] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#6B7C3C]" />
              </div>
              <h3 className="text-xl mb-2">Prime Locations</h3>
              <p className="text-gray-600">
                Properties in the most desirable destinations worldwide
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#E8E3DB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#6B7C3C]" />
              </div>
              <h3 className="text-xl mb-2">Verified Hosts</h3>
              <p className="text-gray-600">
                All our hosts are carefully vetted for your peace of mind
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#E8E3DB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-[#6B7C3C]" />
              </div>
              <h3 className="text-xl mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and secure booking process with instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl mb-2">Featured Properties</h2>
              <p className="text-gray-600">Handpicked stays for your next adventure</p>
            </div>
            <Link to="/properties">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6B7C3C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of happy travelers</p>
          <Link to="/create-account">
            <Button size="lg" variant="secondary">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}