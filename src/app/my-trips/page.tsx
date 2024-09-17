'use client';
import { FC, useEffect, useState } from 'react';
import ReserveCard from '@/components/ReserveCard';
import { useAccount } from 'wagmi';
import { fetchRenterByTxAndWallet } from '@/services/account';
import TripCard from '@/components/TripCard';

const ReservationsPage: FC = () => {
  const [reservations, setReservations] = useState<any>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/getTrips?wallet=${address}`);
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
  }, [reservations]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(reservations, 'reservationsaaa');

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Your Trips</h2>
      {/* {reservations.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {reservations?.map((reservation: any) => (
            <TripCard key={reservation.property.id} reservation={reservation} />
          ))}
        </div>
      )} */}

      {reservations?.length === 0 && <p>No trips found</p>}

      {typeof reservations === 'object' && (
        <TripCard key={reservations?.property?.id} reservation={reservations} />
      )}
    </div>
  );
};

export default ReservationsPage;
