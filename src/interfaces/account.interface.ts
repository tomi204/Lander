import { User } from '@/data/types';

export interface VirtualAccount {
  accountBalance: string;
  availableBalance: string;
  currency: string;
  frozen: boolean;
}

export interface AccountContainerProps {
  user: Partial<User>;
}

export interface AccountDataRequest {
  email: string;
  phoneNumber: string;
  about: string;
}
