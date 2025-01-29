"use client";
import React, { useState } from "react";
import Modal from "@/app/(auth)/_components/modal";
import Toggle from "@/app/(auth)/_components/toggle";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import InfoFormField from "@/app/(auth)/fill-details/_components/info-form-field";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { UserDetailsFormType } from "@/app/(auth)/_schemas/forms.schema";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/app/(auth)/fill-details/_components/info-form";
import { completeProfile, createTeam, joinTeam } from "@/services/auth";
import { genders } from "@/app/(auth)/_schemas/constants";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";

const CreateOrJoinTeam = () => {
  const [checked, setChecked] = useState(true);

  const form = useFormContext<UserDetailsFormType>();

  const router = useRouter();

  const { updateFormData, clearFormData, setError, formData } = useFormStore();

  const onSkip = async () => {
    toast.promise(
      async () => {
        // Complete profile
        await completeProfile({
          first_name: formData.firstName,
          last_name: formData.lastName,
          reg_no: formData.regNo,
          hostel_block: formData.hostelBlock,
          room_no: formData.roomNo,
          phone_no: formData.phoneNo,
          github_profile: formData.githubProfile,
          gender: genders[formData.gender],
        });

        clearFormData();
        router.push("/github-activity");
      },
      {
        loading: "Submitting...",
        success: "Profile submitted successfully!",
        error: (err: ApiError) => err.message,
      }
    );
    router.push("/github-activity");
  };

  const onSubmit = async () => {
    //TODO: Toasts

    const values = form.getValues();
    console.log(values);
    updateFormData({
      joinTeam: values.joinTeam,
      createTeam: values.createTeam,
    });
    console.log(formData);

    const isPersonalDetailsFilled = await form.trigger([
      "firstName",
      "githubProfile",
      "lastName",
      "gender",
      "phoneNo",
    ]);
    if (!isPersonalDetailsFilled) {
      setError();
      return router.push("/fill-details/1");
    }

    const isJoinTeamFilled = checked ? true : await form.trigger("joinTeam");
    const isCreateTeamFilled = checked
      ? await form.trigger("createTeam")
      : true;
    if (!(isCreateTeamFilled || isJoinTeamFilled)) return;
    console.log(checked, formData.createTeam, formData.joinTeam);

    toast.promise(
      async () => {
        // Complete profile
        const res = await completeProfile({
          first_name: formData.firstName,
          last_name: formData.lastName,
          reg_no: formData.regNo,
          hostel_block: formData.hostelBlock,
          room_no: formData.roomNo,
          phone_no: formData.phoneNo,
          github_profile: formData.githubProfile,
          gender: genders[formData.gender],
        });

        let teamRes;
        if (checked && formData.createTeam) {
          console.log(formData.createTeam);
          teamRes = await createTeam({
            name: formData.createTeam,
          });
        } else if (!checked && formData.joinTeam) {
          console.log(formData.joinTeam);
          teamRes = await joinTeam({
            code: formData.joinTeam,
          });
        }

        console.log(res, teamRes);
        clearFormData(); // Clear form after successful submission
        router.push("/github-activity");
      },
      {
        loading: "Submitting...",
        success: "Profile submitted successfully!",
        error: (err: ApiError) => err.message,
      }
    );
  };

  return (
    <div
      className={
        "h-full w-full flex flex-col items-center justify-around space-y-24"
      }
    >
      <Modal branding={false} classname={"px-12 py-8 flex gap-2"}>
        <div className={"font-inter text-sm flex flex-col items-center gap-2"}>
          <p>Create a new Team?</p>
          <Toggle
            checked={checked}
            setChecked={setChecked}
            text={checked ? "Yes" : "No"}
          />
          {checked ? (
            <p>Team Leader Makes The New Team</p>
          ) : (
            <p>Join An Existing Team</p>
          )}
        </div>
        <InfoFormField
          name={checked ? "createTeam" : "joinTeam"}
          render={({ field }) => (
            <AuthFormItem
              field={field}
              labelText={checked ? "Team Name" : "Team Code"}
              type={"text"}
              required
            />
          )}
        />
      </Modal>
      <div className={"w-full flex flex-col items-center gap-2 max-w-sm"}>
        <div className={"w-full flex justify-around"}>
          <Button
            variant={"primary"}
            size={"primary"}
            type={"button"}
            onClick={onSkip}
          >
            Skip
          </Button>
          <Button
            variant={"primary"}
            size={"primary"}
            type={"submit"}
            onClick={onSubmit}
          >
            Continue
          </Button>
        </div>
        <p className={"text-xs font-inter"}>
          You can join / create a team later!
        </p>
      </div>
    </div>
  );
};
export default CreateOrJoinTeam;
