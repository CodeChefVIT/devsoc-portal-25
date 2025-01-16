import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";
import icon from "../../public/bulb.svg";
import React, { ReactNode, useEffect } from "react";
import { Idea, RequestQuote } from "@carbon/icons-react";
import CustomButton from "./CustomButton";
import { useUserStore } from "@/store/user";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { useSubmissionStore } from "@/store/submission";
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
  const checkIfSubmissionAlreadyExists = useSubmissionStore(
    (state) => state.checkSubmissionExists
  );
  const userFetch = useUserStore((state) => state.fetch);
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

      // Call the async function
      fetchUser();
      async function setFlags() {
        if (user.is_leader && (await checkIfSubmissionAlreadyExists())) {
          viewOptions.enabled = true;
          viewOptions.visible = true;
          editOptions.enabled = true;
          editOptions.visible = true;
        } else if (await checkIfSubmissionAlreadyExists()) {
          viewOptions.enabled = true;
          viewOptions.visible = true;
          editOptions.enabled = false;
          editOptions.visible = true;
        } else if (user.is_leader) {
          createOptions.enabled = false;
          createOptions.visible = true;
        }
      }
      setFlags();
    }
  }, [userSet, userFetch, checkIfSubmissionAlreadyExists]); // Dependency array with `userSet`

  const createOptions: Options = { enabled: true, visible: true };
  const editOptions: Options = { enabled: false, visible: false };
  const viewOptions: Options = { enabled: false, visible: false };
  return (
    <div>
      <ProjectSubmissionTemplate
        header="Project Submission"
        subtitle="Submitted at <date> <time>" //TODO: Change to actual time and date function
        title="Project Submitted"
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
