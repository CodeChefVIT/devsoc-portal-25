import BackButton from "@/components/backButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" relative mt-3 ">
      <div className=" absolute ml-5 mr-2 ">
          <BackButton></BackButton>
      </div>
      {children}
    </div>
  );
}
