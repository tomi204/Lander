'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

import { findBookById } from '../../../services/books';
import P2PDetails from '../../../components/P2P';

export default function P2P() {
  const { id } = useParams();
  const [stayData, setStayData] = useState({});

  async function findBook(id) {
    const txData = await findBookById(id);
    setStayData(txData);
    return txData;
  }

  useEffect(() => {
    findBook(id);
  }, [id]);

  return <P2PDetails data={stayData} />;
}
