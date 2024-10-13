'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Avatar, Identity } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import { Button } from './ui/button';

export default function UserCard({ passport }: any) {
  return (
    <Card className="flex flex-col justify-between h-full min-h-[350px]">
      <CardHeader className="flex flex-col items-center justify-center gap-4 pb-2">
        <Identity
          className="rounded-3xl justify-center"
          address={passport.main_wallet as `0x${string}`}
          chain={base}
          schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
        >
          <Avatar
            className="w-20 h-20"
            defaultComponent={
              <div className="h-8 w-8">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                    fill="green"
                    stroke="green"
                    stroke-width="1"
                  />
                </svg>
              </div>
            }
          />
        </Identity>
        <div className="flex flex-row justify-center gap-4 items-center">
          <h2 className="text-2xl font-bold text-center">
            {passport.passport_profile.display_name}{' '}
          </h2>
          <div className="flex items-center">
            <span className="font-semibold px-2 py-1 text-white bg-[#826aee] rounded-xl">
              {passport.score}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-grow">
        <p className="text-muted-foreground mb-4 text-center">
          {passport.passport_profile.bio}
        </p>
        {passport.passport_profile.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{passport.passport_profile.location}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-row justify-center">
        <Button
          className="bg-[#826aee] text-white rounded-xl"
          onClick={() =>
            window.open(
              `https://passport.talentprotocol.com/profile/${passport.passport_id}`
            )
          }
        >
          View in Talent
        </Button>
      </CardFooter>
    </Card>
  );
}
