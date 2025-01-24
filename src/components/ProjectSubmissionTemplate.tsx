import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Project {
  header: string;
  icon: string | StaticImport;
  title: string;
  subtitle: string;
  buttons: React.ReactNode[];
}
//icon would be svg, handle accordingly later
export default function ProjectSubmissionTemplate({
  header,
  icon,
  title,
  subtitle,
  buttons,
}: Project) {
  return (
    <Card className="border-4 w-full border-black rounded-xl">
      <CardHeader className="w-full p-3 bg-black text-white">
        <CardTitle className="flex font-monomaniac  tracking-wider	 items-center justify-between">
          {header}
          <span className="inline-block ml-2 h-3 w-3 rounded-full bg-white"></span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`rounded-xl px-16 flex gap-5 flex-col bg-cc-plain items-center`}
      >
        <Image className=" mt-6" src={icon} alt={""} />
        <div className=" gap-1 flex flex-col items-center">
          <h2 className=" text-lg font-semibold">{title}</h2>
          <p className="text-gray-400   text-sm">{subtitle}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center md:gap-2">
          {buttons.map((btn, index) => (
            <div key={index}>{btn}</div>
          ))}{" "}
        </div>
      </CardContent>
    </Card>
  );
}
