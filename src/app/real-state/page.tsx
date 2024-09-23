'use client';
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
import { IRealState } from '@/data/types';
import RealStateCard from '@/components/RealStateCard';
import __realState from '@/data/jsons/__realState.json';
export default function RealState() {
  console.log(__realState);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ">
                  Invest Smartly in Real Estate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Discover investment opportunities in whole and fractional
                  properties with high returns.
                </p>
              </div>
              <div className="space-x-4">
                <Button className=" text-white bg-black hover:bg-black/80 ">
                  View Properties
                </Button>
                <Button
                  variant="outline"
                  className="text-white bg-black hover:bg-black/80 "
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Featured Properties
            </h2>
            <Tabs defaultValue="fractional" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fractional">Fractional</TabsTrigger>
                <TabsTrigger value="whole">Whole</TabsTrigger>
              </TabsList>
              <TabsContent value="fractional">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>Luxury Apartment {i}</CardTitle>
                        <CardDescription>Fractional Investment</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img
                          alt={`Apartment ${i}`}
                          className="w-full h-48 object-cover mb-4"
                          height="200"
                          src={`/placeholder.svg?height=200&width=300`}
                          style={{
                            aspectRatio: '300/200',
                            objectFit: 'cover',
                          }}
                          width="300"
                        />
                        <p className="text-sm">Estimated Annual Return: 8.5%</p>
                        <p className="text-sm">Minimum Investment: $10,000</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Invest Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="whole">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {__realState.map((item: any) => (
                    <div key={item.id}>
                      <RealStateCard data={{ ...item, id: item.id }} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
}
