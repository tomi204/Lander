'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderLarge from '/src/images/placeholder-large-h.png';
import { useEffect, useState } from 'react';
import { getTalentByWallet } from '@/services/talent';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { GithubIcon } from '@/icons';
import { Badge, Spinner } from '@chakra-ui/react';
import { useUser } from '@/contexts/UserContext';
import { Avatar } from '@coinbase/onchainkit/identity';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { base } from '@/constants/Chain';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EventsCards } from '@/components/Events/EventsCards';
import { TalentSocials, TalentUser } from '@/interfaces/Talent';
import { EventCard } from '@/interfaces/Common';
import TripCard from '@/components/TripCard';

export default function Profile() {
  const { address } = useBlockchain();
  const [talent, setTalent] = useState<TalentUser | null>(null);
  const [reservations, setReservations] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const favoriteCities: EventCard[] = [
    {
      name: 'Hackathon Next Month',
      description: 'Join us for a hackathon in Buenos Aires',
      image: '/images/nyc.jpg',
      city: 'Buenos Aires',
      date: '2024-11-12',
      link: 'https://www.google.com',
    },
    {
      name: 'Base Hackathon',
      image: '/images/tokyo.jpg',
      description: 'Join us for a hackathon in Tokyo',
      link: 'https://www.google.com',
      city: 'Tokyo',
      date: '2024-11-12',
    },
    {
      name: 'Base Meetup',
      image: '/images/london.jpg',
      description: 'Join us for a hackathon in London',
      link: 'https://www.google.com',
      city: 'London',
      date: '2024-11-12',
    },
  ];

  useEffect(() => {
    if (!address) return;

    const getTalent = async () => {
      const talent = await getTalentByWallet(address || '');
      setTalent(talent.passport);
    };
    getTalent();
  }, [address]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/getTrips`);
        const result = await response.json();

        if (response.ok) {
          setReservations(result);
          setError(null);
        } else {
          setError(result.error);
          setReservations([]);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (!address)
    return (
      <section className="flex justify-center items-center h-6/12">
        <ConnectButton
          accountStatus={'address'}
          showBalance={false}
          chainStatus={'none'}
        />
      </section>
    );

  if (!talent) return <LoadingSpinner />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-black">
      <div className="flex-1 p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar
              chain={base}
              className="w-44 h-44"
              address={address as `0x${string}`}
              sizes="100%"
              loadingComponent={<Spinner className="m-auto" />}
              defaultComponent={
                <Image
                  src={user?.avatar_url || placeholderLarge}
                  alt="Profile picture"
                  width={176}
                  height={176}
                  className="rounded-full"
                />
              }
            />

            <div>
              <h2 className="text-2xl font-bold">
                {talent?.passport_profile.display_name}
              </h2>

              <p className="text-neutral-500 mt-1">
                Talent Passport ID {talent?.passport_id}
              </p>
              <p className="text-neutral-500">
                {talent?.passport_profile?.bio}
              </p>
              <p className="text-neutral-500">
                {talent?.passport_profile?.location}
              </p>
            </div>
          </div>
          <Button
            className="ttnc-ButtonPrimary hover:bg-blue-700 hover:text-white w-full md:w-auto"
            onClick={() => {
              window.open(
                `https://passport.talentprotocol.com/profile/${talent?.passport_id}`,
                '_blank'
              );
            }}
          >
            Talent Passport
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          {talent?.passport_profile?.tags?.map((tag: string) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="flex flex-row">
          <p className="text-blue-500 ">Builder Score {talent?.score}</p>
          <p className="text-blue-500 pl-8">
            Identity Score {talent?.identity_score}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Social Media</h3>
          <div className="flex space-x-4">
            {talent?.passport_socials?.map((social: TalentSocials) => (
              <a
                key={social.source}
                href={social.profile_url}
                className="text-gray-400 hover:text-black transition-colors duration-200"
              >
                {social.source === 'github' ? <GithubIcon size={24} /> : null}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCities.map((event) => (
                <EventsCards key={event.name} {...event} />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-4">Your Trips</h3>
          {reservations.length && (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
              {reservations?.map((reservation: any) => (
                <TripCard
                  key={reservation.property.id}
                  reservation={reservation}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
