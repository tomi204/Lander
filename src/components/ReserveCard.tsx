// components/ReserveCard.tsx
import Image from 'next/image';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
interface StayAttributes {
  title: string;
  location: string;
  description: string;
  main_image: string;
}

interface ReservationAttributes {
  id: string;
  attributes: {
    startDate: string;
    endDate: string;
    nights: number;
    totalPrice: number;
    status: string | null;
    tx_id: string | null;
    stay: {
      id: string;
      attributes: StayAttributes;
    };
  };
}

interface ReserveCardProps {
  reservation: ReservationAttributes;
}

const ReserveCard: FC<any> = ({ reservation }) => {

const {
  main_image,
  title,
  location,
  description,
  departure_date,
  entrance_date,
  amount,
} = reservation; 
  const router = useRouter();
  

  const joinRoom = async ( txId: string ) => {
    router.push( `/p2p/${txId}` );
  }
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Image
        src={main_image}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <p className="font-semibold text-lg">{reservation?.property.title}</p>
        <p className="text-sm text-gray-500">{reservation?.property?.location}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="font-semibold">
          {new Date(entrance_date).toLocaleDateString()} -{' '}
          {new Date(departure_date).toLocaleDateString()}
        </p>
        <p>Total: ${amount.toFixed(2)}</p>

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

export default ReserveCard;
