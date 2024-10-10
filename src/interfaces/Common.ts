import { PathName } from '@/routers/types';

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
