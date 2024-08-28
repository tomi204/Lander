// components/ReserveCard.tsx
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TripCard = ({ reservation }: any) => {
  const router = useRouter();
  console.log(reservation.id, reservation.attributes.tx_id, 'reservation');

  const joinRoom = async (txId: string) => {
    router.push(`/p2p/${txId}`);
  };
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Image
        src={reservation.main_image}
        alt={reservation.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <p className="font-semibold text-lg">{reservation.title}</p>
        <p className="text-sm text-gray-500">{reservation.location}</p>
        <p className="text-sm text-gray-500">{reservation.description}</p>
        <p className="font-semibold">
          {new Date(reservation.startDate).toLocaleDateString()} -{' '}
          {new Date(reservation.endDate).toLocaleDateString()}
        </p>
        <p>Total: ${reservation.totalPrice.toFixed(2)}</p>

        <button
          onClick={() => joinRoom(reservation?.id)}
          className=" w-full  px-8 py-2 rounded-full relative bg-purple-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-purple-600"
        >
          <span className="relative z-20">Contact</span>
        </button>
      </div>
    </div>
  );
};

export default TripCard;
