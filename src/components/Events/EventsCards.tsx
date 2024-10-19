import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { EventCard } from '@/interfaces/Common';

export const EventsCards = (event: EventCard) => {
  console.log(event.image, event.name, event.city, event.date);
  return (
    <Card
      key={event.name}
      onClick={() => {
        window.open(`/events/${event.id}`, '_blank');
      }}
      className="bg-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <CardHeader className="p-0">
        <Image
          src={'/base-hackathon.jpg'}
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
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPinIcon className="mr-2 h-4 w-4" />
          <span>{event.city}</span>
        </div>
        <CardDescription className="mt-4">{event.description}</CardDescription>
        <CardFooter className="flex justify-around gap-3 mt-5">
          <Button
            className="w-full"
            onClick={() => {
              window.open(event.link, '_blank');
            }}
          >
            Get Tickets
          </Button>
          <Button className="w-full">Search friends</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
