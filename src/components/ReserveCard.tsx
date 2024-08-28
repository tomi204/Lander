// components/ReserveCard.tsx
import Image from 'next/image';
import { FC } from 'react';

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

interface ReserveCardProps {
  reservation: ReservationAttributes;
}

const ReserveCard: FC<ReserveCardProps> = ({ reservation }) => {
  const { startDate, endDate, nights, totalPrice, stay } = reservation.attributes;
  const { title, location, description, image } = stay.attributes;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="font-semibold">
          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </p>
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
          P2P
        </button>
      </div>
    </div>
  );
};

export default ReserveCard;
