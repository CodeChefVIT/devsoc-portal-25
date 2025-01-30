"use client";

import React, { useEffect } from "react";
import InfoFormField from "@/app/(auth)/fill-details/_components/info-form-field";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import Modal from "@/app/(auth)/_components/modal";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AuthFormDropdown from "@/app/(auth)/_components/auth-form-dropdown";
import { genders, hostels } from "@/app/(auth)/_schemas/constants";
import { useFormContext } from "react-hook-form";
import { UserDetailsFormType } from "@/app/(auth)/_schemas/forms.schema";
import { useFormStore } from "@/app/(auth)/fill-details/_components/info-form";
import { completeProfile } from "@/services/auth";
import { ApiError } from "next/dist/server/api-utils";
const removeTrailingSlash = (url: string) => {
  return url.replace(/\/+$/, "");
};
const PersonalDetails = () => {
  const router = useRouter();
  const form = useFormContext<UserDetailsFormType>();
  const { error } = useFormStore();

  const handleNext = () => {
    const {
      firstName,
      lastName,
      hostelBlock,
      roomNo,
      githubProfile,
      regNo,
      phoneNo,
      gender,
    } = form.getValues();
    const cleanedProfile = removeTrailingSlash(githubProfile);
    toast.promise(
      async () => {
        // Complete profile
        await completeProfile({
          first_name: firstName,
          last_name: lastName,
          reg_no: regNo,
          hostel_block: hostelBlock,
          room_no: roomNo,
          phone_no: phoneNo,
          github_profile: cleanedProfile,
          gender: genders[gender],
        });

        router.push("/github-activity");
      },
      {
        loading: "Submitting...",
        success: "Profile submitted successfully!",
        error: (err: ApiError) => err.message,
      }
    );

    return;
  };

  useEffect(() => {
    if (error) form.trigger();
  }, [error]);
  const [isDayScholar, setDayScholar] = React.useState(false);
  const handleHostelBlockChange = (value: string) => {
    if (value === "Day Scholar") {
      setDayScholar(true);
      form.setValue("roomNo", "000");
    } else {
      setDayScholar(false);
      form.setValue("roomNo", "");
    }
  };

  return (
    <div className={"my-0 flex justify-center overflow-scroll w-full"}>
      <Modal branding={false} classname={"py-8 flex gap-2"}>
        <div className="flex gap-4">
          <InfoFormField
            name={"firstName"}
            render={({ field }) => (
              <AuthFormItem
                field={field}
                labelText={"First Name"}
                type={"text"}
                required
              />
            )}
          />
          <InfoFormField
            name={"lastName"}
            render={({ field }) => (
              <AuthFormItem
                field={field}
                labelText={"Last Name"}
                type={"text"}
                required
              />
            )}
          />
        </div>
        <InfoFormField
          name={"githubProfile"}
          render={({ field }) => (
            <AuthFormItem
              field={field}
              labelText={"Github Profile"}
              type={"text"}
              required
            />
          )}
        />
        <InfoFormField
          name={"regNo"}
          render={({ field }) => (
            <AuthFormItem
              field={field}
              labelText={"Registration Number"}
              type={"text"}
              required
            />
          )}
        />
        <InfoFormField
          name={"phoneNo"}
          render={({ field }) => (
            <AuthFormItem
              field={field}
              labelText={"Phone Number"}
              type={"tel"}
              required
            />
          )}
        />
        <InfoFormField
          name={"gender"}
          render={({ field }) => (
            <AuthFormDropdown
              items={Object.keys(genders)}
              labelText={"Gender"}
              field={field}
              required
            />
          )}
        />
        <InfoFormField
          name={"hostelBlock"}
          render={({ field }) => (
            <AuthFormDropdown
              items={hostels}
              field={{
                ...field,
                onChange: (e) => {
                  field.onChange(e);
                  handleHostelBlockChange(e); // Handle change here
                },
              }}
              labelText={"Hostel Block"}
              required
            />
          )}
        />
        <InfoFormField
          name={"roomNo"}
          render={({ field }) => (
            <AuthFormItem
              field={field}
              tooltip="Valid room number examples: G20, 123, A-123"
              labelText={"Room Number"}
              disabled={isDayScholar}
              type={"number"}
              required
            />
          )}
        />
        <Button
          variant={"primary"}
          size={"primary"}
          type={"button"}
          className={"my-2"}
          onClick={handleNext}
        >
          <p className="mb-1">Next</p>
        </Button>
      </Modal>
    </div>
  );
};
export default PersonalDetails;
