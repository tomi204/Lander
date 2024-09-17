'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

interface P2PProps {
  params: {
    id: string;
  };
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function P2P() {
  const { id } = useParams();
  const { data: txData, error } = useSWR(
    id ? `/api/transaction/${id}` : null,
    fetcher
  );
  console.log(txData, 'txData');
  console.log(id, 'id');
  return (
    <div>
      <h1>P2P</h1>
    </div>
  );
}
