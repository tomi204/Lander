'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { findBookById } from '../../../services/books';
import P2PDetails from '../../../components/P2P/index';

export default function P2P() {
  const { id } = useParams();
  const [stayData, setStayData] = useState({});

  async function findBook(id: string) {
    const txData = await findBookById(id);
    setStayData(txData);
    return txData;
  }
  console.log(stayData, 'stayData');

  useEffect(() => {
    findBook(id as string);
  }, [id]);

  return <P2PDetails data={stayData} />;
}
