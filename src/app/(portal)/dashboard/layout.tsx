// layout.tsx

import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
    
      <Image
        src="/images/mascot_french_pos.svg"
        alt="Mascot"
        height={170}
        width={200}
        className="
          hidden
          3xl:block
          absolute -z-10 bottom-0 right-0
          mb-4 mr-4 
          sm:mb-6 sm:mr-6 
          md:mb-8 md:mr-8
        "
      />

     
      {children}
    </div>
  );
}
