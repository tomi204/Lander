import React, { FC } from 'react';
import { IRealState, Stay } from '@/data/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Button from '@/shared/Button';
import { Router } from 'next/router';
import Link from 'next/link';
export interface RealStateCardProps {
  className?: string;
  data: IRealState;
  size?: 'default' | 'small';
}

const RealStateCard: FC<RealStateCardProps> = ({
  size = 'default',
  className = '',
  data,
}) => {
  const {
    main_image,
    description,

    address,
    title,
    bedrooms,
    price,
    id,
    profitability,
    location,
  } = data;

  console.log(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          alt={`Apartment ${id}`}
          className="w-full h-48 object-cover mb-4"
          height="200"
          src={main_image}
          style={{
            aspectRatio: '200/200',
            objectFit: 'cover',
          }}
          width="300"
        />
        <p className="text-sm">Estimated Annual Return: {profitability} %</p>
        <p className="text-sm">Minimum Investment: $ {price}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/real-state/${id}`} className="m-auto">
          <Button className="w-full shadow-2xl p-4">Invest Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RealStateCard;
