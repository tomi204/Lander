'use client';
import { FC, useEffect, useState } from 'react';
import ReserveCard from '@/components/ReserveCard';
import { fetchRenterByTxAndWallet } from '@/services/account';
import TripCard from '@/components/TripCard';
import { LoadingSpinner2 } from '@/components/AnyReactComponent/loadingSpinner';
import { useBlockchain } from '@/contexts/BlockchainContext';

const ReservationsPage: FC = () => {
  const [reservations, setReservations] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useBlockchain();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/getTrips`);
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
  }, []);

  if (loading) return <LoadingSpinner2 className="spinner-class" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Your Trips</h2>
      {reservations.length && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {reservations?.map((reservation: any) => (
            <TripCard key={reservation.property.id} reservation={reservation} />
          ))}
        </div>
      )}

      {reservations?.length === 0 && <p>No trips found</p>}
    </div>
  );
};

export default ReservationsPage;
