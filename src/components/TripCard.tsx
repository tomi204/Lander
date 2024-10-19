// components/ReserveCard.tsx
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TripCard = ({ reservation }: any) => {
  const router = useRouter();

  const joinRoom = async (txId: string) => {
    router.push(`/p2p/${txId}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Image
        src={reservation?.property?.main_image}
        alt={reservation?.property?.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <p className="font-semibold text-lg">{reservation?.property.title}</p>
        <p className="text-sm text-gray-500">
          {reservation?.property?.location}
        </p>
        <p className="text-sm text-gray-500">
          {reservation?.property?.description}
        </p>
        <p className="font-semibold">
          {new Date(reservation?.tx?.entrance_date).toLocaleDateString()} -{' '}
          {new Date(reservation?.tx?.departure_date).toLocaleDateString()}
        </p>
        <p>Total: ${reservation?.tx?.amount?.toFixed(2)}</p>{' '}
        <button
          onClick={() => joinRoom(reservation?.tx?.id)}
          className=" w-full  px-8 py-2 rounded-xl relative bg-purple-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-purple-600"
        >
          <span className="relative z-20">Contact</span>
        </button>
      </div>
    </div>
  );
};

export default TripCard;
