import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";
import icon from "../../public/bulb.svg";
import React, { ReactNode, useEffect, useState } from "react";
import { Idea, RequestQuote } from "@carbon/icons-react";
import CustomButton from "./CustomButton";
import { useUserStore } from "@/store/user";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { useIdeaStore } from "@/store/submission";
import Link from "next/link";
// import { useIdeaStore } from "@/store/ideas";
interface Options {
  visible: boolean;
  enabled: boolean;
}
interface IGetButtons {
  create: Options;
  view: Options;
  edit: Options;
}
//If ideaSubmitted is false, set create as visible

export default function ProjectSubmission() {
  const user = useUserStore((state) => state.user);
  const userSet = useUserStore((state) => state.userIsSet);
  const checkIfSubmissionAlreadyExists = useIdeaStore(
    (state) => state.checkSubmissionExists
  );

  const userFetch = useUserStore((state) => state.fetch);
  useEffect(() => {
    async function submissionCheck() {
      await checkIfSubmissionAlreadyExists();
    }
    submissionCheck();
  }, [checkIfSubmissionAlreadyExists]);
  const submissionExists = useIdeaStore(
    (state) => state.submissionExists
  );
  let subtitle = "Submit Your Project Before < date > < time >";
  let title = "No Project Submitted Yet";
  if (submissionExists) {
    title = "Project Submitted";
    subtitle = "Submitted at < date > < time >";
  }
  const [createOptions, setCreateOptions] = useState<Options>({
    enabled: true,
    visible: true,
  });
  const [editOptions, setEditOptions] = useState<Options>({
    enabled: false,
    visible: false,
  });
  const [viewOptions, setViewOptions] = useState<Options>({
    enabled: false,
    visible: false,
  });
  useEffect(() => {
    // Only run if userSet is false
    if (!userSet) {
      const fetchUser = async () => {
        try {
          await userFetch(); // Assuming this is an async function
        } catch (e) {
          if (e instanceof ApiError) {
            toast.error(e.message);
          } else {
            toast.error("An unexpected error occurred");
          }
        }
      };
      fetchUser();
    }

    // Call the async function
    const setFlags = () => {
      if (user.is_leader && submissionExists) {
        setCreateOptions((prev) => ({ ...prev, visible: false }));
        setViewOptions({ enabled: true, visible: true });
        setEditOptions({ enabled: true, visible: true });
      } else if (submissionExists) {
        setCreateOptions((prev) => ({ ...prev, visible: false }));
        setViewOptions({ enabled: true, visible: true });
        setEditOptions({ enabled: false, visible: true });
      } else if (user.is_leader) {
        setCreateOptions({ enabled: true, visible: true });
      } else {
        setCreateOptions({ enabled: false, visible: true });
      }
    };
    setFlags();
  }, [submissionExists, user.is_leader, userFetch, userSet]); // Dependency array with `userSet`

  return (
    <div>
      <ProjectSubmissionTemplate
        header="Project Submission"
        subtitle={subtitle} //TODO: Change to actual time and date function
        title={title}
        icon={icon}
        buttons={getButtons({
          create: createOptions,
          view: viewOptions,
          edit: editOptions,
        })}
      />
    </div>
  );
}

function getButtons({ create, view, edit }: IGetButtons): ReactNode[] {
  const buttons: ReactNode[] = [];
  if (view.visible) {
    buttons.push(
      <Link href={"submission/edit"}>
        <CustomButton disabled={!view.enabled} icon={<Idea />}>
          VIEW SUBMISSION
        </CustomButton>
      </Link>
    );
  }
  if (edit.visible) {
    buttons.push(
      <Link href="/submission/edit">
        <CustomButton disabled={!edit.enabled} icon={<RequestQuote />}>
          EDIT SUBMISSION
        </CustomButton>
      </Link>
    );
  }
  if (create.visible) {
    buttons.push(
      <Link href="/submission">
        <CustomButton disabled={!create.enabled} icon={<Idea />}>
          CREATE SUBMISSION
        </CustomButton>
      </Link>
    );
  }
  return buttons;
}
