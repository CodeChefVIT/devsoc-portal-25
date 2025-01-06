import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Project {
  header: string;
  icon: React.ReactNode;
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
      <CardContent>
        <div>{icon}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="flex">
          {buttons.map((btn, index) => (
            <div key={index}>{btn}</div>
          ))}{" "}
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
