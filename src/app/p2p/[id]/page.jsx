"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Video, Phone, LayoutGrid, CheckCircle, HourglassIcon, FileCheck, Rocket, X, Briefcase, Star, Airbnb, DollarSign, Calendar, Users, LogIn, LogOut, ChevronUp, ChevronDown } from "lucide-react"
import { pusherClient } from '@/lib/pusher'
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)


export default function Component({ params }) {
  const { txId } = params
  const [isOpen, setIsOpen] = useState(false)
  const [incomingMessages, setIncomingMessages] = useState([])

  const { data: txData, error } = useSWR(
    txId ? `/api/transaction/${txId}` : null,
    fetcher
  );

  if (error) return <div>Failed to load transaction</div>;
  if (!txData) return <div>Loading...</div>;


  
  // const serializedMessages = existingMessages.map((message) => ({
  //   text: message.text,
  //   id: message.id,
  // }))






  let input = ''

  // const sendMessage = async (text) => {
  //   await axios.post('/api/message', { text, txId})
  // }

  const sendMessage = async () => {
    try {
      // Perform your async operation here
      const msg = await axios.post('/api/message', { text, txId })
      const res = await msg.json();
      console.log('Message sent:', res);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Función para alternar el acordeón
  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }


  useEffect(() => {
    if (txId !== undefined) {
      pusherClient.subscribe(txId)

      pusherClient.bind('incoming-message', (text) => {
        setIncomingMessages((prev) => [...prev, text])
      })

      return () => {
        pusherClient.unsubscribe(txId)
      }
    }
  }, [txId])


  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-full max-w-xs border-r hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {/* Conversation list items */}
          {[
            { name: "Micha Shalev", role: "Apt. address - city", initials: "MS" },
            { name: "Brycen C. EC I...", role: "Apt. address - city", initials: "BC" },
            { name: "Leandro Conti", role: "Apt. address - city", initials: "LC" },
            { name: "Joel Kraus", role: "Apt. address - city", initials: "JK" },
            { name: "Jimmy Jun", role: "Apt. address - city", initials: "JJ" },
          ].map((item, i) => (
            <div key={i} className="flex items-center p-4 hover:bg-muted cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?text=${item.initials}`} />
                <AvatarFallback>{item.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`/placeholder.svg?text=JK`} />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Joel Kraus</h2>
              <p className="text-sm text-muted-foreground">Apt. address - city</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">

            {/* <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`/placeholder.svg?text=JK`} />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <div className="bg-primary text-primary-foreground rounded-lg p-2 max-w-[80%]">
                <p>Let's do Monday the 8th 1:40 EDT. let me know if that works.</p>
              </div> */}


            <div className="flex items-start">
              {/* {serializedMessages.map((message) => (
                  <div className="bg-primary text-primary-foreground rounded-lg p-2 max-w-[80%]">
                    <p key={message.id}>{message.text}</p>
                  </div>

                ))} */}

              <div className="flex items-start justify-end">
                <div className="bg-muted rounded-lg p-2 max-w-[80%]">
                  {incomingMessages.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </div>


            </div>

          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-4 border-t">
          <Input placeholder="Send a message..." onChange={({ target }) => (input = target.value)}
            className='border border-zinc-300'
            type='text' />
          <button onClick={() => sendMessage(input || '')}>send</button>
        </div>
      </div>

      {/* Right sidebar (hidden on mobile) */}
      <div className="w-64 border-l hidden lg:block bg-muted/40">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Joel Kraus</h3>
          <p className="text-sm text-muted-foreground">9:34 AM EDT (1 h behind)</p>
          {/* Información adicional */}
          <ul className="space-y-2 mt-4">
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" /> Identidad verificada
            </li>
            <li className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" /> 1 viaje
            </li>
            <li className="flex items-center">
              <Star className="h-5 w-5 mr-2" /> No hay evaluaciones todavía
            </li>
          </ul>
          {/* Phone Number Button */}
          <div className="p-4">
            <button variant="outline" className="w-full p-2 border rounded">
              <span>Phone Number</span>
            </button>
          </div>
        </div>
        {/* Reservation Details Accordion */}
        <div className="p-4">
          <div className="space-y-4 relative before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-[1px] before:bg-muted-foreground/20">
            <button onClick={toggleAccordion} className="w-full flex justify-between items-center p-2 border rounded">
              <span>Reservation Details</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {isOpen && (
              <ul className="mt-2 space-y-1">
                <li><strong>Huéspedes:</strong> 2 adultos</li>
                <li><strong>Check-in:</strong> Mañana</li>
                <li><strong>Check-out:</strong> lun, 26 ago. 2024</li>
                <li><strong>Fecha de la reserva:</strong> lun, 1 jul. 2024</li>
                <li><strong>Código de confirmación:</strong> HMZKSFSQT8</li>
              </ul>
            )}
          </div>
        </div>
        {/* Payment Details Accordion */}
        <div className="p-4">
          <div className="space-y-4 relative before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-[1px] before:bg-muted-foreground/20">
            <button onClick={toggleAccordion} className="w-full flex justify-between items-center p-2 border rounded">
              <span>Payment Details</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {isOpen && (
              <ul className="mt-2 space-y-1">
                <li><strong>El viajero pagó:</strong> $16,80 por 2 noches $33,60</li>
                <li><strong>Tarifa por servicio para huéspedes:</strong> $4,74</li>
                <li><strong>Total USDT:</strong> $38,34</li>
              </ul>
            )}
          </div>

        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold flex items-center">
              <span className="mr-2">Activity timeline</span>
              <ChevronUp className="h-4 w-4" />
            </h4>
          </div>
          <div className="space-y-4 relative before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-[1px] before:bg-muted-foreground/20">
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 mr-3 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Reserved for</p>
                <p className="text-xs text-muted-foreground">June 24</p>
              </div>
            </div>
            <div className="flex items-start">
              <HourglassIcon className="w-4 h-4 mr-3 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Contract offer</p>
                <p className="text-xs text-muted-foreground">Awaiting offer from client</p>
              </div>
            </div>
            <div className="flex items-start">
              <FileCheck className="w-4 h-4 mr-3 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Accept contract</p>
              </div>
            </div>
            <div className="flex items-start">
              <Rocket className="w-4 h-4 mr-3 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Contract starts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}