import Navbar from "@/app/(auth)/_components/navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"w-full h-full min-h-screen"}>
      <Navbar />
      <div
        className={
          "w-full min-h-[calc(100vh-100px)] flex items-center justify-center p-4"
        }
      >
        {children}
      </div>
    </div>
  );
}
