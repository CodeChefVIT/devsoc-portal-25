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
import ViewIdea from "./viewIdeaDialog";

interface Options {
  visible: boolean;
  enabled: boolean;
}
interface IGetButtons {
  create: Options;
  view: Options;
  edit: Options;
}

/**
 * Component for submitting ideas
 */
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

  let subtitle = (
    <div>
      Submit Your Idea Before 29<sup>th</sup> Mar 7:30PM
    </div>
  );
  let title = "No Idea Submitted Yet";
  if (ideaExists) {
    title = "Idea Submitted";
    subtitle = <div>{`Team leaders can edit the idea`}</div>;
  }
  
  const [createOptions, setCreateOptions] = useState<Options>({
    enabled: true,
    visible: true,
  });
  const [editOptions, setEditOptions] = useState<Options>({
    enabled: true,
    visible: false,
  });
  const [viewOptions, setViewOptions] = useState<Options>({
    enabled: true,
    visible: false,
  });

  function getButtons({ create, view, edit }: IGetButtons): ReactNode[] {
    const buttons: ReactNode[] = [];
    if (view.visible) {
      buttons.push(<ViewIdea disabled={!view.enabled}></ViewIdea>);
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

  useEffect(() => {
    if (!userSet) {
      const fetchUser = async () => {
        try {
          await userFetch();
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

    const setFlags = () => {
      if (user.is_leader && ideaExists) {
        setCreateOptions({ enabled: false, visible: false });
        setViewOptions({ enabled: true, visible: true });
        setEditOptions({ enabled: true, visible: true });
      } else if (ideaExists) {
        setCreateOptions({ enabled: false, visible: false });
        setViewOptions({ enabled: true, visible: true });
        setEditOptions({ enabled: false, visible: true });
      } else if (user.is_leader) {
        setCreateOptions({ enabled: true, visible: true });
        setViewOptions({ enabled: false, visible: false });
        setEditOptions({ enabled: false, visible: false });
      } else {
        setCreateOptions({ enabled: true, visible: true });
        setViewOptions({ enabled: false, visible: false });
        setEditOptions({ enabled: false, visible: false });
      }
    };
    setFlags();
  }, [ideaExists, user.is_leader, userFetch, userSet]);

  return (
    <ProjectSubmissionTemplate
      header="Idea Submission"
      subtitle={subtitle}
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