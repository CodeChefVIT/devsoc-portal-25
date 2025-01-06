import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>{header}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
      <Image src={icon} alt={""}/>
      <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="flex">
          {buttons.map((btn, index) => (
            <div key={index}>{btn}</div>
          ))}{" "}
        </div>
      </CardContent>

    </Card>
  );
}
