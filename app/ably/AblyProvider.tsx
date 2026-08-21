// src/app/AblyProvider.tsx
'use client';

import * as Ably from 'ably';
import { AblyProvider as AblyReactProvider } from 'ably/react';
import { ReactNode, useEffect, useState } from 'react';

export function AblyProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    const ably = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY!,
      clientId: 'my-first-client',
    });
    setClient(ably);
    return () => {
      ably.close();
    };
  }, []);

  if (!client) return null;
  return <AblyReactProvider client={client}>{children}</AblyReactProvider>;
}
