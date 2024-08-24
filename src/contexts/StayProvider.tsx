"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { StayPayloadRequest } from "@/interfaces/StayPayloadRequest"; // Importa la interfaz Stay desde donde la hayas definido

interface StayContextData {
  stayData: Partial<StayPayloadRequest>;
  setStayData: (data: Partial<StayPayloadRequest>) => void;
}

const StayContext = createContext<StayContextData | undefined>(undefined);

interface StayProviderProps {
  children: React.ReactNode;
}

export const StayProvider: React.FC<StayProviderProps> = ({ children }) => {
  const [stayData, setStayData] = useState<Partial<StayPayloadRequest>>(
    typeof localStorage !== undefined && localStorage?.getItem("stayData")
      ? JSON.parse(localStorage.getItem("stayData") as string)
      : {}
  );

  useEffect(() => {
    localStorage.setItem("stayData", JSON.stringify(stayData));
  }, [stayData]);

  return <StayContext.Provider value={{ stayData, setStayData }}>{children}</StayContext.Provider>;
};

export const useStay = (): StayContextData => {
  const context = useContext(StayContext);
  if (context === undefined) {
    throw new Error("useStay must be used within a StayProvider");
  }
  return context;
};
