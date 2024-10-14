'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  User,
  Compass,
  Calendar,
  Map,
  Home,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, href: { pathname: '/' } },
    { name: 'Profile', icon: User, href: { pathname: '/profile' } },
    { name: 'Trips', icon: Map, href: { pathname: '/my-trips' } },
    { name: 'Bookings', icon: Calendar, href: { pathname: '/my-bookings' } },
    { name: 'Explore', icon: Compass, href: { pathname: '/explore' } },
    { name: 'Invest', icon: TrendingUp, href: { pathname: '/real-state' } },
  ];

  return (
    <div className="hidden sm:block ">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 left-4 z-50 rounded-full"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[70vh] bg-white">
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            className="flex justify-center items-center bg-violet-600 rounded-xl p-2 text-white"
            onClick={() => setIsOpen(false)}
          >
            <ConnectButton accountStatus={'avatar'} showBalance={false} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
