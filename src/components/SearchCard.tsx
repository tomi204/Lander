import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Fixed interface
interface Property {
  id: string;
  main_image?: string;
  title?: string;
  location?: string;
  bedrooms?: number;
  beds?: number;
  features?: string[];
  price?: number;
}

interface SearchCardProps {
  property: Property;
}

const SearchCard: FC<SearchCardProps> = ({ property }) => {
  if (!property) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image container */}
          <div className="relative w-full md:w-1/3 h-48 md:h-auto">
            <Image
              src={property.main_image || '/placeholder.svg'}
              alt={property.title || 'Property'}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            {/* Heart button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-white/50 hover:bg-white/75"
              aria-label="Add to favorites"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Content container */}
          <div className="w-full md:w-2/3 p-4">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg font-semibold">
                {property.title || 'Beautiful Property'}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location || 'Unknown location'}</span>
              </div>
            </CardHeader>
            <div className="space-y-2">
              <p>{property.bedrooms || 1} bedroom(s)</p>
              <p>{property.beds || 1} bed(s)</p>
              {property.features && property.features.length > 0 && (
                <p className="text-sm">
                  Features: {property.features.join(', ')}
                </p>
              )}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end">
              <div>
                <div className="font-semibold text-lg">
                  ${property.price || '0'}
                </div>
                <div className="text-sm text-muted-foreground">
                  + deposit charges
                </div>
              </div>
              <div className="border border-primary rounded-md mt-2">
                <Link
                  href={`/stay/detail/${property.id}`}
                  className="sm:mt-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-2 w-full sm:w-auto"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
