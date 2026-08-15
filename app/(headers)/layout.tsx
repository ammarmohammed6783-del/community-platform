import Nav from "@/component/Nav";

export default function HeadersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}



