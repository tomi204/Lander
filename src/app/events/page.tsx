'use client';
import UserCard from '@/components/UserCard';
import { getAllTalent, getTalentByWallet } from '@/services/talent';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EventCard, OurUsers } from '@/interfaces/Common';
import { TalentUser } from '@/interfaces/Talent';
import { EventsCards } from '@/components/Events/EventsCards';

function Events() {
  const [events, setEvents] = useState<[]>([]);

  const loadOurEvents = async () => {
    try {
      const data = await fetch('/api/events');
      const events = await data.json();
      console.log(events, 'users');
      setEvents(events);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  useEffect(() => {
    loadOurEvents();
  }, []);
  console.log(events);
  return (
    <section className=" w-11/12 m-auto mt-10 mb-10">
      <Tabs defaultValue="Current" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Current">Current</TabsTrigger>
          <TabsTrigger value="New">Future</TabsTrigger>
        </TabsList>
        <TabsContent value="Current">
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event, index) => (
              <EventsCards key={index} {...(event as EventCard)} />
            ))}
          </div>
          <div className="flex justify-center mb-4 text-white items-center"></div>
        </TabsContent>
        <TabsContent value="New">
          {/* {ourUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ourUsers.map((user, index) => (
                <UserCard key={index} passport={user} />
              ))} */}
          {/* </div>
          ) : (
            <div className="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )} */}
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default Events;
