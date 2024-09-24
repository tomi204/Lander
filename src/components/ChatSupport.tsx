import React from 'react';
import { Bell, Send, Home, Calendar, CreditCard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
  const bookingDetails = {
    propertyName: 'Luxury Beachfront Villa',
    location: 'Bali, Indonesia',
    checkIn: '2023-09-20',
    checkOut: '2023-09-27',
    guests: 4,
    totalCost: '2.5 USDC',
    status: 'Confirmed',
  };

  const transactionInfo = {
    id: 'TX123456',
    date: '2023-08-15',
    amount: '2.5 USDC',
    status: 'Completed',
  };

  const chatMessages = [
    {
      id: 1,
      sender: 'agent',
      message:
        'Hello! How can I assist you with your upcoming stay at Luxury Beachfront Villa?',
    },
    {
      id: 2,
      sender: 'user',
      message:
        "Hi, I was wondering if it's possible to arrange an early check-in?",
    },
    {
      id: 3,
      sender: 'agent',
      message:
        "Of course! I'd be happy to check that for you. May I have your booking reference number, please?",
    },
    { id: 4, sender: 'user', message: "Sure, it's BK123456." },
    {
      id: 5,
      sender: 'agent',
      message:
        'Thank you. Let me check with the property about early check-in options.',
    },
    {
      id: 6,
      sender: 'agent',
      message:
        "Good news! I've confirmed with the property that you can check in 2 hours early at no additional cost. Will that work for you?",
    },
    {
      id: 7,
      sender: 'user',
      message: "That's perfect! Thank you so much for arranging this.",
    },
    {
      id: 8,
      sender: 'agent',
      message:
        "You're welcome! Is there anything else I can help you with regarding your stay?",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CryptoStay Support</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Support */}
        <main className="flex-1 p-6 overflow-auto">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Chat Support</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}
                      >
                        <p className="font-medium">
                          {msg.sender === 'user' ? 'You' : 'Support Agent'}
                        </p>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator className="my-4" />
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Booking Details and Transaction Info Sidebar */}
        <aside className="w-80 bg-white p-6 overflow-auto border-l border-gray-200 hidden lg:block">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    {bookingDetails.propertyName}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {bookingDetails.location}
                </p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {bookingDetails.checkIn} to {bookingDetails.checkOut}
                  </span>
                </div>
                <p>Guests: {bookingDetails.guests}</p>
                <p>Total Cost: {bookingDetails.totalCost}</p>
                <p>
                  Status:{' '}
                  <span className="text-green-500">
                    {bookingDetails.status}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Transaction ID: {transactionInfo.id}
                  </span>
                </div>
                <p>Date: {transactionInfo.date}</p>
                <p>Amount: {transactionInfo.amount}</p>
                <p>
                  Status:{' '}
                  <span className="text-green-500">
                    {transactionInfo.status}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
