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
  title: "Internal Hack",
  description:
    "Internal Hack by CodeChef-VIT is a flagship hackathon event aimed at fostering innovation, collaboration, and problem-solving. Join us to compete, code, and create impactful solutions in an engaging environment.",
  icons: [{ rel: "icon", url: "cc-logo.svg" }],
  twitter: {
    card: "summary_large_image",
    title: "Internal Hack",
    description:
      "Internal Hack by CodeChef-VIT is a flagship hackathon event aimed at fostering innovation, collaboration, and problem-solving. Join us to compete, code, and create impactful solutions in an engaging environment.",
    images: [{ url: "/images/cc-logo.svg" }],
  },
  applicationName: "Internal Hack",
  keywords: [
    "Internal Hack official website",
    "Internal Hack CodeChef-VIT",
    "CodeChef VIT Internal Hack",
    "Internal Hack VIT events",
    "Internal Hack programming competition",
    "VIT CodeChef Internal Hack",
    "VIT programming challenges",
    "Internal Hack coding resources",
    "CodeChef-VIT Internal Hack workshops",
    "VIT tech innovation",
    "VIT Internal Hack resources",
    "VIT coding contests",
    "Internal Hack problem-solving",
    "Internal Hack coding mentorship",
    "VIT collaborative coding",
    "Internal Hack event updates",
    "VIT Internal Hack",
    "CodeChef-VIT Internal Hack rankings",
    "Internal Hack innovative solutions",
    "VIT Internal Hack collaboration",
    "CodeChef-VIT student Internal Hack",
    "Internal Hack student programming challenges",
    "Internal Hack workshops and events",
    "VIT programming innovation",
    "CodeChef-VIT Internal Hack details",
    "VIT Internal Hack participation",
    "Internal Hack flagship event",
    "CodeChef-VIT Internal Hack news",
    "Internal Hack online resources",
    "VIT tech-driven challenges",
    "Internal Hack hackathon guides",
    "VIT programming event solutions",
    "CodeChef-VIT Internal Hack creativity",
    "VIT programming club Internal Hack",
    "Internal Hack coding bootcamp",
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
        <link rel="icon" type="image/x-icon" href="/images/cc-logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  bg-no-repeat    antialiased bg-[url('/images/auth-bg1.svg')] bg-[length:1000px_1000px] bg-center`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}