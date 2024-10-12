'use client';
import Image from 'next/image';
import {
  Bell,
  Briefcase,
  Calendar,
  MapPin,
  Search,
  Star,
  User,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import placeholderLarge from '/src/images/placeholder-large-h.png';
import profilePicture from '/src/images/dex.jpg';
import tokyo from '/src/images/tokyo.jpg';
import nyc from '/src/images/nyc.jpg';
import london from '/src/images/london.jpg';
import techConf from '/src/images/devcon.png';
import hackaThon from '/src/images/base-hackathon.jpg';
import meetUp from '/src/images/local-meetup.jpg';
import { useEffect, useState } from 'react';
import { getTalentByWallet } from '@/services/talent';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { GithubIcon } from '@/icons';
import { Badge, Spinner } from '@chakra-ui/react';
import { TalentSocials } from '@/interfaces/account.interface';

export default function Component() {
  const { address } = useBlockchain();
  const [talent, setTalent] = useState<any>(null);
  const favoriteCities = [
    { name: 'New York', image: nyc, width: 300, height: 200 },
    { name: 'Tokyo', image: tokyo, width: 300, height: 200 },
    { name: 'London', image: london, width: 300, height: 200 },
  ];

  const upcomingEvents = [
    {
      name: 'DevCon 2024',
      image: techConf,
      width: 300,
      height: 200,
      date: '2024-11-12',
    },
    {
      name: 'Hackathon Next Month',
      image: hackaThon,
      width: 300,
      height: 200,
      date: '2023-10-01',
    },
    {
      name: 'Local Meetup',
      image: meetUp,
      width: 300,
      height: 200,
      date: '2023-08-30',
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

  if (!talent) return <Spinner />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-black">
      {/* Sidebar 
      <div className="w-full md:w-64 p-4 border-b md:border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-8">t</h1>
        <nav className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4">
          <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Search size={20} />
            <span className="hidden md:inline">Search</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-white">
            <User size={20} />
            <span className="hidden md:inline">Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Wallet size={20} />
            <span className="hidden md:inline">Wallet</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Bell size={20} />
            <span className="hidden md:inline">Notifications</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <Briefcase size={20} />
            <span className="hidden md:inline">Jobs</span>
          </a>
        </nav>
      </div>*/}

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Image
              src={profilePicture}
              alt="Profile picture"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">
                {talent?.passport_profile.display_name}
              </h2>
              {/* TODO: Add rating IN BACKEND
              
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= 4
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-400'
                    }
                  />
                ))}
                <span className="ml-2 text-sm text-neutral-500">(4.0)</span>
              </div> */}
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
          {talent?.passport_profile?.tags.map((tag: string) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div>
          <a href="#" className="text-blue-500 hover:underline">
            Builder Score {talent?.score}
          </a>
          <a href="#" className="text-blue-500 hover:underline pl-8">
            Identity Score {talent?.identity_score}
          </a>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Social Media</h3>
          <div className="flex space-x-4">
            {talent?.passport_socials.map((social: TalentSocials) => (
              <a
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
            <h3 className="text-xl font-semibold mb-4">Favorite Cities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCities.map((city) => (
                <Card
                  key={city.name}
                  className="bg-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={city.image}
                      alt={city.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="flex items-center text-lg font-semibold">
                      <MapPin size={18} className="mr-2 text-blue-400" />
                      {city.name}
                    </CardTitle>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.name}
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
                  <CardContent className="p-4">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
