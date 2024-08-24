"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useThemeMode } from "@/utils/useThemeMode";

const ClientCommons = () => {
  useThemeMode();

  const pathname = usePathname();
  //  CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body");
    if (!$body) return;
  }, [pathname]);

  return <></>;
};

export default ClientCommons;
