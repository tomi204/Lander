"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { authenticate, getChallenge } from "@/services/auth";
import Cookies from "js-cookie";
import { getUserData } from "@/services/users";
import { useRouter } from "next/navigation";
import { wagmiConfig } from "@/constants/wagmi-config";
import { signMessage, getAccount } from "@wagmi/core";
import { disconnect } from "@wagmi/core";

interface AuthContextType {
  isAuth: boolean;
  isAuthenticating: boolean;
  error: any;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { address, isConnected, isConnecting } = useAccount();

  const auth = useCallback(async () => {
    try {
      const jwtToken = Cookies.get("jwt");
      if (jwtToken) {
        setIsAuthenticating(true);

        const res = await getUserData();
        const { username } = res.data;

        if (username !== address) {
          await logOut();
        }

        setIsAuth(true);
        return;
      }
      const { token } = await getChallenge(address);

      const { connector } = getAccount(wagmiConfig);

      const signature = await signMessage(wagmiConfig, {
        message: "Your authentication token : " + token,
        connector,
      });
      const { jwt } = await authenticate({
        signature,
        address,
      });

      Cookies.set("jwt", jwt);
      setIsAuth(true);
    } catch (error) {
      setError(error);
      await logOut();
    } finally {
      setIsAuthenticating(false);
    }
  }, [authenticate, getChallenge, signMessage, address]);

  const logOut = async () => {
    try {
      await disconnect(wagmiConfig);
      Cookies.remove("jwt");
      setIsAuth(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (!isConnected || !address || isConnecting) {
      return;
    }

    auth();
  }, [isConnected, address]);

  useEffect(() => {
    const jwt = Cookies.get("jwt");

    if (jwt && address) {
      auth();
      return;
    }

    logOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isAuthenticating,
        error,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
