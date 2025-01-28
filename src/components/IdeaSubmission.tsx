import ProjectSubmissionTemplate from "./ProjectSubmissionTemplate";
import icon from "../../public/bulb.svg";
import React, { ReactNode, useEffect, useState } from "react";
import { Idea, RequestQuote } from "@carbon/icons-react";
import CustomButton from "./CustomButton";
import { useUserStore } from "@/store/user";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { useIdeaStore } from "@/store/idea";
import { useRouter } from "next/navigation";
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

export default function IdeaSubmission() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const userSet = useUserStore((state) => state.userIsSet);
  const checkIfIdeaAlreadyExists = useIdeaStore(
    (state) => state.checkSubmissionExists
  );
  const userFetch = useUserStore((state) => state.fetch);
  useEffect(() => {
    async function ideaCheck() {
      await checkIfIdeaAlreadyExists();
    }
    ideaCheck();
  }, [checkIfIdeaAlreadyExists]);
  const ideaExists = useIdeaStore((state) => state.submissionExists);

  let subtitle = <div>Submit Your Idea Before 2<sup>nd</sup> feb 10PM</div>;
  let title = "No Idea Submitted Yet";
  if (ideaExists) {
    title = "Idea Submitted";
    subtitle = <div>{`Submitted at < date > < time >`}</div>;
  }

  function getButtons({ create, view, edit }: IGetButtons): ReactNode[] {
    const buttons: ReactNode[] = [];
    if (view.visible) {
      buttons.push(
        <CustomButton
          disabled={!view.enabled}
          icon={<Idea />}
          onClick={() => {
            router.push("/idea/edit");
          }}
        >
          VIEW IDEA
        </CustomButton>
      );
    }
    if (edit.visible) {
      buttons.push(
        <CustomButton
          disabled={!edit.enabled}
          icon={<RequestQuote />}
          onClick={() => {
            router.push("/idea/edit");
          }}
        >
          EDIT IDEA
        </CustomButton>
      );
    }
    if (create.visible) {
      buttons.push(
        <CustomButton
          disabled={!create.enabled}
          icon={<Idea />}
          onClick={() => {
            router.push("/idea");
          }}
        >
          CREATE IDEA
        </CustomButton>
      );
    }
    return buttons;
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
      if (user.is_leader && ideaExists) {
        setCreateOptions((prev) => ({ ...prev, visible: false }));
        setViewOptions({ enabled: true, visible: true });
        setEditOptions({ enabled: true, visible: true });
      } else if (ideaExists) {
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
  }, [ideaExists, user.is_leader, userFetch, userSet]); // Dependency array with `userSet`

  return (
    <ProjectSubmissionTemplate
      header="Idea Submission"
      subtitle={subtitle} //TODO: Change to actual time and date function
      title={title}
      icon={icon}
      buttons={getButtons({
        create: createOptions,
        view: viewOptions,
        edit: editOptions,
      })}
    />
  );
}
