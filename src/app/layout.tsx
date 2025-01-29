import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
// import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://portal.devsoc.codechefvit.com/"),
  title: "Devsoc'25",
  description:
    "Devsoc by CodeChef-VIT is a flagship hackathon event aimed at fostering innovation, collaboration, and problem-solving. Join us to compete, code, and create impactful solutions in an engaging environment.",
  icons: [{ rel: "icon", url: "/images/devsoc.png" }],
  openGraph: {
    title: "Devsoc'25",
    images: [{ url: "/devsoc_og.png" }],
    url: "http://portal.devsoc.codechefvit.com/",
    type: "website",
    description:
      "Devsoc by CodeChef-VIT is a flagship hackathon event aimed at fostering innovation, collaboration, and problem-solving. Join us to compete, code, and create impactful solutions in an engaging environment.",
    siteName: "Devsoc by CodeChef-VIT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devsoc'25'",
    description:
      "Devsoc by CodeChef-VIT is a flagship hackathon event aimed at fostering innovation, collaboration, and problem-solving. Join us to compete, code, and create impactful solutions in an engaging environment.",
    images: [{ url: "/og-img.png" }],
  },
  applicationName: "Devsoc'25",
  keywords: [
    "Devsoc official website",
    "Devsoc CodeChef-VIT",
    "CodeChef VIT hackathon",
    "Devsoc VIT events",
    "Devsoc programming competition",
    "VIT CodeChef hackathon",
    "VIT programming challenges",
    "Devsoc coding resources",
    "CodeChef-VIT Devsoc workshops",
    "VIT tech innovation",
    "VIT hackathon resources",
    "VIT coding contests",
    "VIT Devsoc problem-solving",
    "Devsoc coding mentorship",
    "VIT collaborative coding",
    "Devsoc event updates",
    "VIT competitive programming hackathon",
    "CodeChef-VIT Devsoc rankings",
    "Devsoc innovative solutions",
    "VIT hackathon collaboration",
    "CodeChef-VIT student hackathon",
    "Devsoc student programming challenges",
    "Devsoc workshops and events",
    "VIT programming innovation",
    "CodeChef-VIT event details",
    "VIT hackathon participation",
    "Devsoc flagship event",
    "CodeChef-VIT hackathon news",
    "Devsoc online resources",
    "VIT tech-driven challenges",
    "Devsoc hackathon guides",
    "VIT programming event solutions",
    "CodeChef-VIT Devsoc creativity",
    "VIT programming club hackathon",
    "Devsoc coding bootcamp",
  ],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/x-icon" href="/images/devsoc.png"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-cover bg-no-repeat    antialiased bg-[url('/images/auth-bg.svg')]`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
