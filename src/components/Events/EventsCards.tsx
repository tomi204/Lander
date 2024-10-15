import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
export interface EventCard {
  name: string;
  image: string;
  city: string;
  date: string;
  link: string;
}

export const EventsCards = (event: EventCard) => {
  console.log(event.image, event.name, event.city, event.date);
  return (
    <Card
      key={event.name}
      onClick={() => {
        window.open(event.link, '_blank');
      }}
      className="bg-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <CardHeader className="p-0">
        <Image
          src={event.image}
          alt={event.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-3 gap-2 flex-col">
        <CardTitle className="text-lg font-semibold mb-2">
          {event.name}
        </CardTitle>
        <p className="text-sm text-gray-400 flex items-center">
          <Calendar size={14} className="mr-2" />
          {new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="ftext-sm text-gray-600 flex items-center font-semibold ">
          <MapPin size={18} className="mr-1 text-blue-400" />
          {event.city}
        </p>
      </CardContent>
    </Card>
  );
};
