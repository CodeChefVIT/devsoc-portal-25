import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";
import icon from "../../public/bulb.svg";
import React, { ReactNode } from "react";
import { Idea, RequestQuote} from "@carbon/icons-react";
import CustomButton from "./CustomButton";
interface Options {
  visible: boolean
  enabled: boolean
}
interface IGetButtons {
  view: Options;
  edit: Options;
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
        buttons={getButtons({ view: {enabled: true, visible: true}, edit: {enabled: false, visible: true} })}
      />
    </div>
  );
}

function getButtons({ view, edit }: IGetButtons): ReactNode[] {
  const buttons: ReactNode[] = [];
  if (view.visible) {
    buttons.push(
      <CustomButton disabled={!view.enabled} icon={<Idea  />}>VIEW SUBMISSION</CustomButton>
    );
  }
  if (edit.visible) {
    buttons.push(<CustomButton disabled={!edit.enabled} icon={<RequestQuote/>}>EDIT SUBMISSION</CustomButton>);
  }
  return buttons;
}
