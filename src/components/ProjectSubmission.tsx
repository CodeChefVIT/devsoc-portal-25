import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";
import icon from "../../public/bulb.svg";
import React, { ReactNode } from "react";
import { Idea, RequestQuote} from "@carbon/icons-react";
import CustomButton from "./CustomButton";
import { useUserStore } from "@/store/user";
// import { useIdeaStore } from "@/store/ideas";
interface Options {
  visible: boolean
  enabled: boolean
}
interface IGetButtons {
  create: Options;
  view: Options;
  edit: Options;
}
//If ideaSubmitted is false, set create as visible

export default function ProjectSubmission() {
  const user = useUserStore((state) => state.user);
  const userFetch = useUserStore((state) => state.fetch);
  if(user.id == "")
  {
    userFetch()
  }
  const createOptions: Options = {enabled: true, visible :false}
  const editOptions: Options = {enabled: false, visible :false}
  const viewOptions: Options = {enabled: false, visible :false}
  if(user.is_leader) // and edit options time is active
  {
    editOptions.enabled = true;
  }
  return (
    <div>
      <ProjectSubmissionTemplate
        header="Project Submission"
        subtitle="Submitted at <date> <time>" //TODO: Change to actual time and date function
        title="Project Submitted"
        icon={icon}
        buttons={getButtons({ create: createOptions ,view: viewOptions, edit: editOptions })}
      />
    </div>
  );
}

function getButtons({   create  , view, edit }: IGetButtons): ReactNode[] {
  const buttons: ReactNode[] = [];
  if (view.visible) {
    buttons.push(
      <CustomButton disabled={!view.enabled} icon={<Idea  />}>VIEW SUBMISSION</CustomButton>
    );
  }
  if (edit.visible) {
    buttons.push(<CustomButton disabled={!edit.enabled} icon={<RequestQuote/>}>EDIT SUBMISSION</CustomButton>);
  }
  if (create.visible) {
    buttons.push(<CustomButton disabled={!create.enabled} icon={<Idea />}>CREATE SUBMISSION</CustomButton>);
  }
  return buttons;
}
