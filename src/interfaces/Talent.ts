export interface TalentUser {
  activity_score: number;
  calculating_score: boolean;
  created_at: string;
  human_checkmark: boolean;
  identity_score: number;
  last_calculated_at: string;
  main_wallet: string;
  main_wallet_changed_at: string;
  passport_id: number;
  passport_profile: {
    bio: string;
    display_name: string | null;
    image_url: string | null;
    location: string | null;
    name: string | null;
    tags: string[] | null;
  };
  score: number;
  skills_score: number;
  socials_calculated_at: string;
  verified: boolean;
  verified_wallets: string[];
}

export interface Talent {
  passports: TalentUser[];
  pagination: {
    last_page: number;
  };
}

export interface TalentPassport {
  passport: TalentUser;
}
