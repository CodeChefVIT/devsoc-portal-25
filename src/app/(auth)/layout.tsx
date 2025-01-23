import Navbar from "@/app/(auth)/_components/navbar";

export default function AuthLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"w-full  h-screen  "}>
            <Navbar />
            <div className={"w-full h-full  flex items-center justify-center"}>
                {children}
            </div>
        </div>
    );
}
