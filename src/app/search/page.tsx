'use client';
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import SearchCard from '@/components/SearchCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function BookingPage() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [results, setResults] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  //const guest = searchParams.get('guest');

  //const guestToNumber = (guest: string | null): number => {
  //  return guest ? parseInt(guest) : 0; // Returns 0 if guest is null
  //};

  useEffect(() => {
    const fetchProperties = async () => {
      if (location) {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .ilike('location', `%${location}%`);

        if (error) {
          console.error('Error fetching properties:', error);
        } else {
          setResults(data || []);
        }
      }
    };

    fetchProperties();
  }, [location]);

  const FilterContent = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Filter by:</h2>

      {/* Price range filter */}
      <div>
        <h3 className="font-medium mb-2">Your budget (per night)</h3>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Popular filters */}
      <div>
        <h3 className="font-medium mb-2">Popular filters</h3>
        <div className="space-y-2">
          {['cancellation', 'excellent', 'apartments'].map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox id={filter} />
              <label htmlFor={filter}>
                {filter === 'cancellation' && 'Free cancellation'}
                {filter === 'excellent' && 'Excellent: 9 or more'}
                {filter === 'apartments' && 'Entire homes and apartments'}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Room and bathroom count */}
      <div>
        <h3 className="font-medium mb-2">Bedrooms and bathrooms</h3>
        {['Bedrooms', 'Bathrooms'].map((item) => (
          <div key={item} className="flex items-center justify-between mb-2">
            <span>{item}</span>
            <Input type="number" className="w-16" min={0} />
          </div>
        ))}
      </div>

      {/* Property type filter */}
      <div>
        <h3 className="font-medium mb-2">Brands</h3>
        <div className="space-y-2">
          {['YourRentals', 'NH Hotels', 'Dazzler by Wyndham'].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar with filters (hidden on mobile) */}
      <div className="hidden md:block w-full md:w-1/4 p-4 border-r">
        <FilterContent />
      </div>

      {/* Main content area */}
      <div className="w-full md:w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold">
            {results?.length} accommodations found
          </h1>

          {/* Mobile filter button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <FilterContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Search results */}
        <div className="space-y-4 w-full max-w-7xl mx-auto p-4">
          {results?.map((item) => {
            return <SearchCard key={item.id} property={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
