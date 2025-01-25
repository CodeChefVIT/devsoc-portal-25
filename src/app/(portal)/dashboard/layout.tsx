import Image from 'next/image';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Image
        src="/images/mascot_french_pos.svg"
        alt="SVG Image"
        height={170}
        width={200}

        className="absolute -z-[1] bottom-0 right-0"
      />
        {children}
    </div>
  );
}
