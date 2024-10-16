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
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching with filters:', { priceRange });
  };

  const FilterContent = () => (
    <ScrollArea className="h-[calc(100vh-2rem)] pr-4">
    <div className="space-y-6 bg-white overflow-hidden">
      <h2 className="text-lg font-semibold">Filter by:</h2>

      {/* Google Maps iframe */}
      <div className="mb-4 w-full h-[250px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.45340566235!2d-58.515699825304004!3d-34.61565476740269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1729008251246!5m2!1ses-419!2sar" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      {/* Price range filter */}
      {/*<div>
        <h3 className="font-medium mb-2">Your budget (per night)</h3>
        <Slider
          min={0}
          max={5000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="bg-gray-100"
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>*/}

      <div>
          <h3 className="font-medium mb-2">Your budget (per night)</h3>
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <label htmlFor="priceFrom" className="text-sm">From</label>
              <Input
                id="priceFrom"
                type="number"
                value={priceRange[0]} // Accessing the first element of the array
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} // Updating the first element
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="priceTo" className="text-sm">To</label>
              <Input
                id="priceTo"
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

      {/* Type filters */}
      <div>
        <h3 className="font-medium mb-2">Type</h3>
        <div className="space-y-2">
          {['apartment', 'house', 'cabin', 'office'].map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox id={filter} />
              <label htmlFor={filter}>
                {filter === 'apartment' && 'Apartment'}
                {filter === 'house' && 'House'}
                {filter === 'cabin' && 'Cabin'}
                {filter === 'office' && 'Office'}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Room and bathroom count */}
      <div>
        <h3 className="font-medium mb-2">Bedrooms and bathrooms</h3>
        {['Bedrooms', 'Bathrooms', 'Beds'].map((item) => (
          <div key={item} className="flex items-center justify-between mb-2">
            <span>{item}</span>
            <select className="w-16" defaultValue={1}>
              {[1, 2, 3, 4, 5].map((num) => ( 
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Popular filters */}
      <div>
        <h3 className="font-medium mb-2">Popular Places</h3>
        <div className="space-y-2">
          {['recoleta', 'palermo', 'tigre'].map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox id={filter} />
              <label htmlFor={filter}>
                {filter === 'recoleta' && 'Recoleta'}
                {filter === 'palermo' && 'Palermo'}
                {filter === 'tigre' && 'Tigre'}
              </label>
            </div>
          ))}
        </div>
      </div>
      <Button 
        onClick={handleSearch} 
        className="w-full border border-gray-300 hover:bg-black hover:border-gray-400 hover:text-white transition duration-200"
      >
        Search
      </Button>
    </div>
    </ScrollArea>
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
            <SheetContent className="bg-white">
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
