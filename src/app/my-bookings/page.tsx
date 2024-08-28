"use client";
import { FC, useEffect, useState } from 'react';
import ReserveCard from '@/components/ReserveCard';
import { useAccount } from 'wagmi';
interface StayAttributes {
  title: string;
  location: string;
  description: string;
  image: string;
}

interface ReservationAttributes {
  id: string;
  attributes: {
    startDate: string;
    endDate: string;
    nights: number;
    totalPrice: number;
    status: string | null;
    stay: {
      id: string;
      attributes: StayAttributes;
    };
  };
}

const ReservationsPage: FC = () => {
  const [reservations, setReservations] = useState<ReservationAttributes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  

  
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch( `/api/transaction?wallet=${address}` );
        const result = await response.json();

        if (response.ok) {
          setReservations(result.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <ReserveCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default ReservationsPage;
