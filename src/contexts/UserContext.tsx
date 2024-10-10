'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import supabase from '@/utils/supabase/client'; // Make sure to import your Supabase client

interface User {
  id: string;
  name: string;
  email: string;
  bookings: string[];
  trips: string[];
  avatar_url: string;
  wallet_evm: string | null;
  wallet_sol: string | null;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select(
            'id, name, email ,bookings, trips , avatar_url, wallet_evm, wallet_sol'
          )
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
