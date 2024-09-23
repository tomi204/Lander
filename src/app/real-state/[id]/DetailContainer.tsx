'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  DollarSign,
  PieChart,
  Calendar,
} from 'lucide-react';
import { IRealState } from '@/data/types';
import Image from 'next/image';
import { MintUSDC } from '@/utils/blockchain';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

export default function RealStateDetailContainer({
  property,
}: {
  property: IRealState;
}) {
  const [investmentAmount, setInvestmentAmount] = useState(0.4);
  const { address } = useAccount();
  //   const property = {
  //     name: 'Luxury Apartment 1',
  //     type: 'Fractional Investment',
  //     price: 500000,
  //     minInvestment: 10000,
  //     maxInvestment: 100000,
  //     annualReturn: 8.5,
  //     location: 'Downtown, City',
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     area: 1200,
  //     yearBuilt: 2020,
  //     description:
  //       'This luxurious apartment offers stunning views of the city skyline and top-notch amenities. Perfect for those looking to invest in high-end real estate with strong rental potential.',
  //     features: [
  //       '24/7 Concierge',
  //       'Fitness Center',
  //       'Rooftop Pool',
  //       'Smart Home Technology',
  //       'Secure Parking',
  //     ],
  //     financials: {
  //       rentalIncome: 3000,
  //       propertyTax: 500,
  //       insurance: 150,
  //       maintenance: 200,
  //     },
  //   };

  const comparisonProperties = [
    {
      name: 'City View Condo',
      price: 450000,
      annualReturn: 7.8,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
    },
    {
      name: 'Riverside Apartment',
      price: 520000,
      annualReturn: 8.2,
      bedrooms: 2,
      bathrooms: 2,
      area: 1250,
    },
    {
      name: 'Downtown Loft',
      price: 480000,
      annualReturn: 8.0,
      bedrooms: 1,
      bathrooms: 1,
      area: 1000,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={property.main_image}
            alt={property.title}
            className="w-full h-[400px] object-cover rounded-lg mb-4"
          />
          <div className="grid grid-cols-4 gap-2">
            {/* {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`/placeholder.svg?height=100&width=150`}
                alt={`${property.title} view ${i}`}
                className="w-full h-[100px] object-cover rounded-lg"
              />
            ))} */}
            <img
              src={property.main_image}
              alt={`${property.title} view 1`}
              className="w-full h-[100px] object-cover rounded-lg"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{property.location}</p>
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <Bed className="mr-2 h-5 w-5" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 h-5 w-5" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="mr-2 h-5 w-5" />
              <span>{property.area} sqft</span>
            </div>
          </div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Investment Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Property Value</p>
                  <p className="text-xl font-bold">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Minimum Investment</p>
                  <p className="text-xl font-bold">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Return</p>
                  <p className="text-xl font-bold">{property.profitability}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Investment Type</p>
                  <p className="text-xl font-bold">{property.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p>{property.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Features</h2>
            <ul className="list-disc list-inside">
              {property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Tabs defaultValue="financials" className="mt-8">
        <TabsList>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>
                Monthly breakdown of income and expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Rental Income</TableCell>
                    <TableCell className="text-right">
                      ${property.financials.rentalIncome}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Property Tax</TableCell>
                    <TableCell className="text-right">
                      -${property.financials.propertyTax}
                    </TableCell>
                  </TableRow>
                  <TableCell>Insurance</TableCell>

                  <TableRow className="font-bold">
                    <TableCell>Net Monthly Income</TableCell>
                    <TableCell className="text-right">
                      $
                      {property.financials.rentalIncome -
                        property.financials.propertyTax}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Property location and nearby amenities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Important documents related to this property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>Property Deed</li>
                <li>Financial Statements</li>
                <li>Inspection Report</li>
                <li>Rental Agreement Template</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Investment Calculator</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <label
                htmlFor="investment-amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Investment Amount: ${investmentAmount.toLocaleString()}
              </label>
              <Slider
                id="investment-amount"
                min={property.price}
                max={property.price * property.amount}
                step={1000}
                value={[investmentAmount]}
                onValueChange={(value) => setInvestmentAmount(value[0])}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Ownership Percentage</p>
                <p className="text-xl font-bold">
                  {((investmentAmount / property.price) * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Annual Return</p>
                <p className="text-xl font-bold">
                  $
                  {(
                    (investmentAmount * property.profitability) /
                    100
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Invest Now</Button>
          </CardFooter>
        </Card>
      </div> */}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Compare with Similar Properties
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Annual Return</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Bathrooms</TableHead>
                <TableHead>Area (sqft)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="font-bold">
                <TableCell>{property.title}</TableCell>
                <TableCell>${property.price.toLocaleString()}</TableCell>
                <TableCell>{property.profitability}%</TableCell>
                <TableCell>{property.bedrooms}</TableCell>
                <TableCell>{property.bathrooms}</TableCell>
                <TableCell>{property.area}</TableCell>
              </TableRow>
              {comparisonProperties.map((prop, index) => (
                <TableRow key={index}>
                  <TableCell>{prop.name}</TableCell>
                  <TableCell>${prop.price.toLocaleString()}</TableCell>
                  <TableCell>{prop.annualReturn}%</TableCell>
                  <TableCell>{prop.bedrooms}</TableCell>
                  <TableCell>{prop.bathrooms}</TableCell>
                  <TableCell>{prop.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() => MintUSDC({ address: address as Address })}
      >
        Invest Now
      </Button>
    </div>
  );
}
