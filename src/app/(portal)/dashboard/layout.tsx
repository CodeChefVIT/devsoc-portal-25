// layout.tsx

import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">

      <Image
        src="/images/mascot_french_pos.svg"
        alt="Mascot"
        height={170}
        width={200}
        className="hidden xl:block absolute -z-10 bottom-0 right-0 "
      />
      {children}
    </div>

  );
}
