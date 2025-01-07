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
    <Card className="border-4 border-black">
      <CardHeader className="w-full p-3 bg-black text-white">
        <CardTitle className="flex justify-between">
          {header}
          <span className="inline-block ml-2 h-3 w-3 rounded-full bg-white"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-5 flex-col items-center">
        <Image className="mb-6 mt-4" src={icon} alt={""} />
        <div className=" gap-1 flex flex-col items-center">
          <h2 className="font-medium text-lg">{title}</h2>
          <p className="text-gray-400   text-sm">{subtitle}</p>
        </div>
        <div className="flex gap-8">
          {buttons.map((btn, index) => (
            <div key={index}>{btn}</div>
          ))}{" "}
        </div>
      </CardContent>
    </Card>
  );
}
