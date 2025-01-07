
"use client";
import CustomButton from "@/components/CustomButton";
import ProjectSubmission from "@/components/ProjectSubmission";
import { useUserStore } from "@/store/user";
import Image from "next/image";
import { useEffect } from "react";
import { LiaLightbulb } from "react-icons/lia";

export default function Home() {
  //store showcase
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const newUser = {
      id: "123", // Generate a random UUID for user id
      name: "Abhinav", // Specific name
      team_id: "456", // Random UUID for team_id
      email: "abhinav@example.com", // Specific email
      is_vitian: true, // Specific boolean value
      reg_no: "23BCE05", // Specific registration number
      password: "strongpassword123", // Specific password
      phone_no: "9876543210", // Specific phone number
      role: "leader", // Specific role
      is_leader: true, // Specific boolean value
      college: "VIT", // Specific college name
      is_verified: true, // Specific boolean value
    };

    updateUser(newUser);
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

        <p>Submit showcase</p>
        <ProjectSubmission></ProjectSubmission>
      <p>Custom button showcase:</p>
      <CustomButton icon={<LiaLightbulb  />}>idea</CustomButton>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
        <div className="m-20">
        <p>User store showcase:</p>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <tbody>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 font-semibold">ID</td>
                <td className="border border-gray-300 p-2">{user.id}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Name
                </td>
                <td className="border border-gray-300 p-2">{user.name}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Email
                </td>
                <td className="border border-gray-300 p-2">{user.email}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Team ID
                </td>
                <td className="border border-gray-300 p-2">{user.team_id}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Is Vitian?
                </td>
                <td className="border border-gray-300 p-2">
                  {user.is_vitian ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Registration No
                </td>
                <td className="border border-gray-300 p-2">{user.reg_no}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Registration No
                </td>
                <td className="border border-gray-300 p-2">{user.reg_no}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Password
                </td>
                <td className="border border-gray-300 p-2">{user.password}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Phone No
                </td>
                <td className="border border-gray-300 p-2">{user.phone_no}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  Role
                </td>
                <td className="border border-gray-300 p-2">{user.role}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Is Leader?
                </td>
                <td className="border border-gray-300 p-2">
                  {user.is_leader ? "Yes" : "No"}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 font-semibold">
                  College
                </td>
                <td className="border border-gray-300 p-2">{user.college}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Is Verified?
                </td>
                <td className="border border-gray-300 p-2">
                  {user.is_verified ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </footer>
    </div>
  );
}
