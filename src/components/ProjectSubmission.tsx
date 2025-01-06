import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";

import React from "react";

//icon would be svg, handle accordingly later
export default function ProjectSubmission() {
  return (
    <div>
      <ProjectSubmissionTemplate header="Project Submission" subtitle="Submitted at <date> <time>"/>
    </div>
  );
}
