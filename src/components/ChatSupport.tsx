import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SendIcon,
  InfoIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CalendarIcon,
  HomeIcon,
  CreditCardIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export default function Component() {
  const [messages, setMessages] = React.useState([
    { id: 1, sender: 'support', content: 'Hello! How can I assist you today?' },
    {
      id: 2,
      sender: 'client',
      content: 'Hi, I have a question about my recent booking.',
    },
    {
      id: 3,
      sender: 'support',
      content:
        'I can see your booking details. What specific information do you need?',
    },
  ]);

  const [newMessage, setNewMessage] = React.useState('');
  const [showDetails, setShowDetails] = React.useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'client', content: newMessage },
      ]);
      setNewMessage('');
    }
  };

  const scrollAreaRef = React.useRef<HTMLDivElement>(null); // Specify the type here

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const tripDetails = {
    bookingId: 'CR12345',
    property: 'Luxury Condo #42',
    checkIn: new Date('2023-07-15'),
    checkOut: new Date('2023-07-22'),
    guests: 2,
    nights: 7,
    basePrice: 2.1,
    cleaningFee: 0.2,
    serviceFee: 0.15,
    taxes: 0.05,
    totalAmount: 2.5,
    transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
    status: 'Confirmed',
  };

  return (
    <div className="flex flex-col lg:flex-row h-[600px] max-w-5xl mx-auto p-4">
      <Card className="flex-1 flex flex-col mb-4 lg:mb-0 lg:mr-4">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Chat Support</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-[400px] px-4" ref={scrollAreaRef}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-4 ${
                  message.sender === 'client' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'support' && (
                  <Avatar className="mr-2">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Support"
                    />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'client'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
                {message.sender === 'client' && (
                  <Avatar className="ml-2">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Client"
                    />
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="rounded-full">
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <div className="relative">
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:absolute lg:top-0 lg:right-0 lg:w-[350px]"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <InfoIcon className="mr-2 h-5 w-5" />
                    Trip & Transaction Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold flex items-center">
                        <HomeIcon className="mr-2 h-4 w-4" /> Property
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tripDetails.property}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" /> Dates
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {format(tripDetails.checkIn, 'MMM d, yyyy')} -{' '}
                        {format(tripDetails.checkOut, 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tripDetails.nights} nights, {tripDetails.guests} guests
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold flex items-center">
                        <CreditCardIcon className="mr-2 h-4 w-4" /> Price
                        Breakdown
                      </h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Base price:</span>
                          <span>{tripDetails.basePrice} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cleaning fee:</span>
                          <span>{tripDetails.cleaningFee} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service fee:</span>
                          <span>{tripDetails.serviceFee} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes:</span>
                          <span>{tripDetails.taxes} ETH</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>{tripDetails.totalAmount} ETH</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">Booking ID</h3>
                      <p className="text-sm text-muted-foreground">
                        #{tripDetails.bookingId}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Transaction Hash</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {tripDetails.transactionHash}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Status</h3>
                      <p className="text-sm font-medium text-green-600">
                        {tripDetails.status}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-lg"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
