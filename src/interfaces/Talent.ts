export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Passport {
  passport_profile: PassportProfile;
}

export interface PassportProfile {
  display_name: string;
}

export interface Talent {
  passport: Passport;
}
