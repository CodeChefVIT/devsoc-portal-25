import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Project {
  header: string;
  icon: string | StaticImport;
  title: string;
  subtitle: ReactNode;
  buttons: ReactNode[];
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
    <Card className="border-4 w-full border-black rounded-lg">
      <CardHeader className="w-full p-3 bg-black text-white">
        <CardTitle className="flex font-monomaniac  tracking-wider items-center justify-between">
          <p className="mb-1">{header}</p>
          <span className="inline-block ml-2 h-3 w-3 rounded-full bg-white"></span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`rounded-xl flex flex-col bg-cc-plain items-center gap-4 p-4`}
      >
        <Image src={icon} alt={""} />
        <div className=" gap-1 flex flex-col items-center">
          <h2 className=" text-lg font-semibold">{title}</h2>
          <div className="text-gray-400   text-sm">{subtitle}</div>
        </div>
        <div className="flex flex-col gap-4">
          {buttons.map((btn, index) => (
            <div key={index} className=" flex-1">
              {btn}
            </div>
          ))}{" "}
        </div>
      </CardContent>
    </Card>
  );
}
