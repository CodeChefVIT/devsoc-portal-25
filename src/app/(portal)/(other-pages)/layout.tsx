import BackButton from "@/components/backButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" relative  ">
      <div className="mt-4 absolute ml-5 mr-2 ">
          <BackButton></BackButton>
      </div>
      {children}
    </div>
  );
}
