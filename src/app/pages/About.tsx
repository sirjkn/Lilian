import { Building2, Target, Heart, Award } from 'lucide-react';

export function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6">About Skyway Suites</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make every stay unforgettable by connecting travelers
            with unique properties and exceptional experiences around the world.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Skyway Suites began with a simple idea: everyone deserves
                a home away from home. We started by listing a handful of properties and
                have grown to serve thousands of travelers worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform connects property owners with travelers seeking authentic,
                comfortable, and memorable stays. We believe in the power of hospitality
                to bring people together and create lasting memories.
              </p>
              <p className="text-gray-600">
                Today, we're proud to offer a diverse portfolio of properties ranging from
                cozy apartments to luxurious villas, each carefully selected to ensure the
                highest quality standards.
              </p>
            </div>
            <div
              className="h-96 rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1612431199429-3e358e12506b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwc3Vuc2V0JTIwb2NlYW58ZW58MXx8fHwxNzczMDcxMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
              }}
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8E3DB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#6B7C3C]" />
              </div>
              <h3 className="text-xl mb-2">Excellence</h3>
              <p className="text-gray-600">
                We're committed to providing the highest quality properties and service
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8E3DB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#6B7C3C]" />
              </div>
              <h3 className="text-xl mb-2">Hospitality</h3>
              <p className="text-gray-600">
                Warmth and care are at the heart of everything we do
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8E3DB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-[#6B7C3C]" />
              </div>
              <h3 className="text-xl mb-2">Trust</h3>
              <p className="text-gray-600">
                Building trust through transparency and reliability
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8E3DB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#6B7C3C]" />
              </div>
              <h3 className="text-xl mb-2">Quality</h3>
              <p className="text-gray-600">
                Every property is vetted to meet our high standards
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-lg p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2 text-[#6B7C3C]">10K+</div>
              <div className="text-gray-600">Properties</div>
            </div>
            <div>
              <div className="text-4xl mb-2 text-[#6B7C3C]">50K+</div>
              <div className="text-gray-600">Happy Guests</div>
            </div>
            <div>
              <div className="text-4xl mb-2 text-[#6B7C3C]">100+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-4xl mb-2 text-[#6B7C3C]">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}