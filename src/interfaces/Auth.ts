import { User } from "@/data/types";

export interface AuthTokenChallenge {
  token: string;
}

export interface LoginResponse {
  jwt: string;
  user?: User;
}
