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
import { attendees, EventCard, OurUsers } from '@/interfaces/Common';
import { getTalentByWallet } from '@/services/talent';
import { TalentUser } from '@/interfaces/Talent';
import { useEffect, useState } from 'react';

export const EventsCards = (event: EventCard) => {
  const attendees = event.attendees?.map(
    (user: attendees) => user?.user_wallet
  );
  const [passport, setPassport] = useState<TalentUser[] | null>(null);
  const getPassport = async () => {
    const usersWithPassports = await Promise.all(
      (attendees ?? []).map(async (user: string) => {
        const passport = await getTalentByWallet(user);
        return { passport: passport.passport };
      })
    );
    const ourUsers = usersWithPassports.filter((user) => user.passport);
    setPassport(ourUsers.map((user) => user.passport));
  };
  useEffect(() => {
    getPassport();
  }, [event.attendees]);

  return (
    <Card
      key={event.name}
      className="bg-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg w-full hover:scale-105"
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
          {event.location && <span>{event.location}</span>}
          {event.city && !event.location && <span>{event.city}</span>}
        </div>
        <CardDescription className="mt-4">{event.description}</CardDescription>
        <div className="flex-row  items-center  w-11/12 m-auto flex justify-between">
          {passport && passport?.length > 0 && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              {event.attendees?.length} attendees
            </div>
          )}
          <div className="flex flex-wrap gap-2 r-0">
            {passport?.map((user) => (
              <>
                {user.passport_profile.image_url !== 'talent_protocol' && (
                  <Image
                    src={user.passport_profile.image_url ?? ''}
                    alt={user.passport_profile.name ?? ''}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
              </>
            ))}
          </div>
        </div>
        <CardFooter className="flex justify-around gap-3 mt-5 md:flex-row flex-col">
          <Button
            className="w-full"
            onClick={() => {
              window.open(`https://lu.ma/baselatam`, '_blank');
            }}
          >
            Get Tickets
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              window.open(`/events/${event.id}`);
            }}
          >
            Search friends
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
