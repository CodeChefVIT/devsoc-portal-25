import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:h-[100vh] h-full md:flex flex-col block ">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
