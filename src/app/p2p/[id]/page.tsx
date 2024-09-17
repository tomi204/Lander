'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';
import { findBookById } from '../../../services/books';
interface P2PProps {
  params: {
    id: string;
  };
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function P2P() {
  const { id } = useParams();

  const txData = findBookById(id as string);

  console.log(txData, 'txData');
  console.log(id, 'id');
  return (
    <div>
      <h1>P2P</h1>
    </div>
  );
}
