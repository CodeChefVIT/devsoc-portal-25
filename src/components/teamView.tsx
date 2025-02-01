import React, { useEffect } from "react";
import { IoMdCopy } from "react-icons/io";
import { LuCrown } from "react-icons/lu";

import RemoveFromTeamDialog from "./dialogs/remove_from_team";
import { useTeamStore } from "@/store/team";
import { useUserStore } from "@/store/user";
import { leaveTeam } from "@/services/team";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import CustomButton from "./CustomButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card"; // Import ShadCN components
import EditTeamDialog from "./dialogs/edit_team";
import { useSubmissionStore } from "@/store/submission";
import { useIdeaStore } from "@/store/idea";

const TeamView = () => {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetch);
  const team = useTeamStore((state) => state.team);
  const teamFetch = useTeamStore((state) => state.fetch);
  const setIdeaExists = useIdeaStore((state) => state.setSubmissionExists);
  const setSubmissionExists = useSubmissionStore(
    (state) => state.setSubmissionExists
  );
  const teamSet = useTeamStore((state) => state.teamIsSet);
  const userSet = useUserStore((state) => state.userIsSet);
  const [load, setLoad] = React.useState(false);
  useEffect(() => {
    if (!teamSet) {
      teamFetch();
    }
    if (userSet) {
      fetchUser();
    }
  }, [teamFetch, fetchUser, teamSet, userSet]);

  const copyToClipboard = () => {
    return toast.promise(navigator.clipboard.writeText(team.code), {
      loading: "Copying code...",
      success: "Copied team code!",
      error: (err: ApiError) => err.message,
    });
  };

  const leave = () => {
    setLoad(true);
    return toast
      .promise(
        async () => {
          await leaveTeam(user.email);
          await teamFetch();
          await fetchUser();
          setIdeaExists(false);
          setSubmissionExists(false);
        },
        {
          loading: "Leaving team...",
          success: "Left team successfully",
          error: (err: ApiError) => err.message,
        }
      )
      .finally(() => setLoad(false));
  };

  return (
    <Card className="border-4 flex flex-col w-full  border-black rounded-lg">
      {/* Card Header */}
      <CardHeader className="w-full p-3 bg-black text-white">
        <CardTitle className="flex font-monomaniac tracking-wider items-center justify-between">
          Your team: {team.team_name}
          {user.is_leader && <EditTeamDialog />}
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="px-16 flex-grow flex gap-5 flex-col bg-cc-plain items-center">
        {/* Team Member List */}
        <div className="w-full flex flex-col mt-6 gap-3">
          {/* Comment out if needed. Fixes the double rendering issue for now */}

          {team.members.map(
            (member, index) => (
              console.log(member),
              (
                <div
                  key={index}
                  className="flex  justify-between items-center bg-white border border-black rounded-lg p-2"
                >
                  {member.is_leader ? (
                    <div className="flex flex-1 justify-between items-center">
                      <span>{member.first_name + " " + member.last_name}</span>
                      <span className="text-yellow-500">
                        <LuCrown />
                      </span>
                    </div>
                  ) : (
                    <div className=" w-full  flex justify-between border-none outline-none bg-transparent">
                      {`${member.first_name}  ${member.last_name}`}
                      {user.is_leader && (
                        <RemoveFromTeamDialog email={member.email} />
                      )}
                    </div>
                  )}
                </div>
              )
            )
          )}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="w-full mt-auto flex justify-center gap-8 p-4 bg-cc-plain leading-loose items-center">
        <CustomButton disabled={load} onClick={leave}>
          {load ? "Leaving..." : "Leave Team"}
        </CustomButton>
        <CustomButton icon={<IoMdCopy />} onClick={copyToClipboard}>
          {team.code}
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default TeamView;
