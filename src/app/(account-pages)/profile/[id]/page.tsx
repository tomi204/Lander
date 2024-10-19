'use client';
import { getTalentByWallet } from '@/services/talent';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import Avatar from '@/shared/Avatar';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GithubIcon } from '@/icons';
import { Badge } from '@chakra-ui/react';
import { Avatar as AvatarCoinBaseComponent } from '@coinbase/onchainkit/identity';
import { base } from '@/constants/Chain';
import { TalentSocials, TalentUser } from '@/interfaces/Talent';
import { LoadingSpinner } from '@/components/LoadingSpinner';
export default function ProfileByIdPage() {
  const { id } = useParams();
  const [talent, setTalent] = useState<TalentUser | null>(null);
  useEffect(() => {
    const getTalent = async () => {
      const talent = await getTalentByWallet(id as string);
      setTalent(talent.passport);
    };
    getTalent();
  }, []);

  return (
    <>
      {talent ? (
        <div className="flex flex-col md:flex-row min-h-screen text-black">
          <div className="flex-1 p-4 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <AvatarCoinBaseComponent
                  chain={base}
                  className="w-44 h-44"
                  address={talent?.main_wallet as `0x${string}`}
                  sizes="100%"
                  loadingComponent={<Spinner className="m-auto" />}
                  defaultComponent={<Avatar sizeClass="w-44 h-44" />}
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
                    {social.source === 'github' ? (
                      <GithubIcon size={24} />
                    ) : null}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
