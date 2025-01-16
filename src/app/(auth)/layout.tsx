import Navbar from "@/app/(auth)/_components/navbar";
import {Toaster} from "react-hot-toast";

export default function AuthLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"w-full h-full min-h-screen bg-[url('/images/auth-bg.svg')]"}>
            <Navbar />
            <div className={"w-full h-full pt-16 min-h-screen flex items-center justify-center"}>
                {children}
            </div>
        </div>
    );
}
