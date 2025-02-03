import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:h-[100vh]  h-full md:flex flex-col block ">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
