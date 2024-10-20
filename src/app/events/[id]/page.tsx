'use client';
import { useEffect, useState } from 'react';
import { attendees, EventCard } from '@/interfaces/Common';
import { useParams } from 'next/navigation';
import { TalentUser } from '@/interfaces/Talent';
import { getTalentByWallet } from '@/services/talent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import { LoadingSpinner } from '@/components/LoadingSpinner';
function Events() {
  const { id } = useParams();

  const [events, setEvents] = useState<EventCard[]>([]);
  const [attendees, setAttendees] = useState<[]>([]);
  const loadOurEvent = async () => {
    try {
      const data = await fetch(`/api/events/?id=${id}`);
      const events = await data.json();

      setEvents(events);
      const attendeesData = await fetch(`/api/getEventsWithAttendees`);
      const attendees = await attendeesData.json();

      setAttendees(attendees[0].attendees);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };
  const attendeesMap = attendees?.map((user: attendees) => user?.user_wallet);
  const [passport, setPassport] = useState<TalentUser[] | null>(null);
  const getPassport = async () => {
    const usersWithPassports = await Promise.all(
      (attendeesMap ?? []).map(async (user: string) => {
        const passport = await getTalentByWallet(user);
        return { passport: passport.passport };
      })
    );
    const ourUsers = usersWithPassports.filter((user) => user.passport);
    setPassport(ourUsers.map((user) => user.passport));
  };
  useEffect(() => {
    getPassport();
  }, [attendeesMap]);

  useEffect(() => {
    loadOurEvent();
  }, []);
  //// todo: refactor to use a component for the event card

  if (!events) return <LoadingSpinner />;
  return (
    <>
      {events.map((event) => (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <Image
              src={'/base-hackathon.jpg'}
              alt={event.name}
              width={500}
              height={400}
              className="w-full h-48 object-cover"
            />
            <CardTitle className="text-2xl font-bold">{event.name}</CardTitle>
            <CardDescription>
              {event.date && (
                <div className="flex items-center mt-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{event.date}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center mt-2">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{event.description}</p>
            {passport && passport.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <UsersIcon className="mr-2 h-5 w-5" />
                  Confirmed Attendees
                </h3>

                <div className="flex flex-wrap gap-2 cursor-pointer">
                  {passport?.map((attende, index) => (
                    <Avatar
                      key={index}
                      title={attende.passport_profile.display_name}
                      onClick={() => {
                        window.open(
                          `/profile/${attende.main_wallet}`,
                          '_blank'
                        );
                      }}
                    >
                      <AvatarImage src={attende.passport_profile.image_url} />
                      <AvatarFallback>
                        {attende?.passport_profile.display_name?.substring(
                          0,
                          2
                        )}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default Events;
