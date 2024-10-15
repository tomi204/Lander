'use client';
import { getTalentByWallet } from '@/services/talent';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileByIdPage() {
  const { id } = useParams();
  const [talent, setTalent] = useState<any | null>(null);
  useEffect(() => {
    const getTalent = async () => {
      const talent = await getTalentByWallet(id as string);
      setTalent(talent.passport);
    };
    getTalent();
  }, []);

  console.log(id);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
