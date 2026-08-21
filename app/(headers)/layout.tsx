import Nav from "@/component/Nav";
import type { ReactNode } from 'react';
import { AblyProvider } from '../ably/AblyProvider';

export default function HeadersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Nav />

      <AblyProvider>
        <main className="flex-1 flex flex-col">{children}</main>
      </AblyProvider>
    </div>
  );
}



