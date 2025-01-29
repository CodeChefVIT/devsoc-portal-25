// import BackButton from "@/components/backButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:h-full md:flex md:flex-col justify-center">
      {/* <div className="mt-4 ml-3 mr-2 ">
          <BackButton></BackButton>
      </div> */}
      {children}
    </div>
  );
}
