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

export interface TalentSocials {
  disconnected: boolean;
  follower_count: number;
  following_count: number;
  location: string;
  profile_bio: string;
  profile_display_name: string;
  profile_image_url: string;
  profile_name: string;
  profile_url: string;
  source: string;
}
