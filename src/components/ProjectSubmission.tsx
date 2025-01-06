import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";
import icon from "../../public/bulb.svg";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
interface GetButtonsProps {
  view: boolean;
  edit: boolean;
}
//icon would be svg, handle accordingly later
export default function ProjectSubmission() {
  return (
    <div>
      <ProjectSubmissionTemplate
        header="Project Submission"
        subtitle="Submitted at <date> <time>" //TODO: Change to actual time and date function
        title="Project Submitted"
        icon={icon}
        buttons={getButtons({ view: true, edit: true })}
      />
    </div>
  );
}

function getButtons({ view, edit }: GetButtonsProps): ReactNode[] {
  const buttons: ReactNode[] = [];
  if (view) {
    buttons.push(<Button>View Button</Button>);
  }
  if (edit) {
    buttons.push(<Button>Edit Button</Button>);
  }
  return buttons;
}
