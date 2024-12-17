'use client';

import { AlertProvider } from "@/context/alertContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider refetchInterval={0}>
      <AlertProvider>
        {children}
      </AlertProvider>
    </SessionProvider>
  );
}
