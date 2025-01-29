import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:h-[100vh] md:flex flex-col h-auto block ">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
