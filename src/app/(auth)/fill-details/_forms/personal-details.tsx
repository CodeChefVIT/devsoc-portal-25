"use client";

import React, { useEffect, useState } from "react";
import InfoFormField from "@/app/(auth)/fill-details/_components/info-form-field";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import Modal from "@/app/(auth)/_components/modal";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AuthFormDropdown from "@/app/(auth)/_components/auth-form-dropdown";
import { genders } from "@/app/(auth)/_schemas/constants";
import { useFormContext } from "react-hook-form";
import { UserDetailsFormType } from "@/app/(auth)/_schemas/forms.schema";
import { useFormStore } from "@/app/(auth)/fill-details/_components/info-form";
import { completeProfile } from "@/services/auth";
import { ApiError } from "next/dist/server/api-utils";

// Function to generate random values
const generateRandomValues = () => ({
  githubProfile: `https://github.com/user${Math.floor(Math.random() * 10000)}`,
  hostelBlock: `Block-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`, // A-Z
  roomNo: `${Math.floor(Math.random() * 900) + 100}`, // 100-999
});

const PersonalDetails = () => {
  const router = useRouter();
  const form = useFormContext<UserDetailsFormType>();
  const { error } = useFormStore();
  const { setError } = useFormStore();
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    const { firstName, lastName, regNo, phoneNo, gender } = form.getValues();
    const randomValues = generateRandomValues();
    setLoading(true);

    return toast.promise(
      async () => {
        // Complete profile
        const isPersonalDetailsFilled = await form.trigger([
          "firstName",
          "lastName",
          "regNo",
          "phoneNo",
          "gender",
        ]);
        if (!isPersonalDetailsFilled) {
          setError();
          throw new Error("Please fill all the details");
        }
        await completeProfile({
          first_name: firstName,
          last_name: lastName,
          reg_no: regNo,
          phone_no: phoneNo,
          github_profile: randomValues.githubProfile,
          hostel_block: randomValues.hostelBlock,
          room_no: randomValues.roomNo,
          gender: genders[gender],
        }).finally(() => setLoading(false));

        router.push("/dashboard");
      },
      {
        loading: "Submitting...",
        success: "Profile submitted successfully!",
        error: (err: ApiError) => err.message,
      }
    );
  };

  useEffect(() => {
    if (error) form.trigger();
  }, [error, form]);

  return (
    <div className={"my-0 flex justify-center overflow-y-auto w-full"}>
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
        <Button
          variant={"primary"}
          size={"primary"}
          type={"button"}
          className={"my-2"}
          disabled={loading}
          onClick={handleNext}
        >
          <p className="mb-1">
            {loading ? "Next" : "Next"}
          </p>
        </Button>
      </Modal>
    </div>
  );
};

export default PersonalDetails;