import React from "react";
import JoinTeamDialog from "./dialogs/join_team";
import CreateTeamDialog from "./dialogs/create_team";
import iconContainer from "../../public/images/iconContainer.png";
import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";

export default function joinTeam() {
  return (
      <ProjectSubmissionTemplate
        header="Your Devsoc Team"
        title="No team members yet?"
        subtitle="Start a new team or Join one"
        icon={iconContainer}
        buttons={[<JoinTeamDialog key="join team" />, <CreateTeamDialog key={"Create team"} />]}
      ></ProjectSubmissionTemplate>
  );
}