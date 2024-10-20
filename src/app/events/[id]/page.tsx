'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/interfaces/Common';
import { EventsCards } from '@/components/Events/EventsCards';
import { useParams } from 'next/navigation';

function Events() {
  const { id } = useParams();

  const [events, setEvents] = useState<[]>([]);
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
  console.log(attendees, 'attendees dadatatat');

  useEffect(() => {
    loadOurEvent();
  }, []);

  return (
    <section className=" w-11/12 m-auto mt-10 mb-10">
      {attendees.map((attendee: any) => (
        <div key={attendee.id}>{attendee.user.name}</div>
      ))}
    </section>
  );
}

export default Events;
