import { PathName } from '@/routers/types';
import { LucideIcon } from 'lucide-react';

export interface CommonLayoutProps {
  children?: React.ReactNode;
}
export interface AvatarDropdownProps {
  show: boolean | undefined;
  className?: string;
}
export interface HeaderProps {
  className?: string;
}

export interface LangDropdownProps {
  panelClassName?: string;
}
export interface MainNavProps {
  className?: string;
}
export interface NotifyDropdownProps {
  className?: string;
}
export interface SearchDropdownProps {
  className?: string;
}

export interface ButtonSubmitProps {
  href?: PathName;
}
export interface ButtonSubmitListingProps {
  className?: string;
  onClick?: () => void;
  href?: PathName;
}

export interface NavItem {
  name: string;
  icon: LucideIcon;
  href: {
    pathname: string;
  };
  function?: () => void;
}

export interface OurUsers {
  chain: string;
  createdAt: string;
  id: string;
  main_wallet: string;
  userId: string;
}

export interface EventCard {
  id?: string;
  name: string;
  description: string;
  image: string;
  location?: string;
  city: string;
  date: string;
  link: string;
  attendees?: [];
}

export interface attendees {
  user_wallet: string;
}
