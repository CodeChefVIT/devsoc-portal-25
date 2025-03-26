import React from "react";
import JoinTeamDialog from "./dialogs/join_team";
import CreateTeamDialog from "./dialogs/create_team";
import UserIcon from "../../public/images/user-icon.svg";
import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";

export default function joinTeam() {
  return (
    <ProjectSubmissionTemplate
      header="Your Team"
      title="No team members yet?"
      subtitle="Start a new team or Join one"
      icon={UserIcon}
      buttons={[
        <JoinTeamDialog key="JOIN TEAM" />,
        <CreateTeamDialog key={"CREATE TEAM"} />,
      ]}
    ></ProjectSubmissionTemplate>
  );
}
