"use client";

import React from "react";
import InfoWrapper from "@/app/(auth)/fill-details/_components/info-wrapper";
import Modal from "@/app/(auth)/_components/modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { pingStar, updateGithubUserName } from "@/services/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import CustomButton from "@/components/CustomButton";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GithubProfileSchema } from "../_schemas/general.schema";
import AuthFormItem from "../_components/auth-form-item";
const schema = z.object({
  github: GithubProfileSchema,
});
const GithubActivityPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      github: "",
    },
  });
  function handleUpdateGithubProfile(values: z.infer<typeof schema> ) {
    return toast.promise(
      async () => {
        // const validationResult = githubLinkSchema.safeParse(githubProfile);
        // if (!validationResult.success) {
        //   throw new Error("Enter a valid Github Profile URL EG. https://github.com/UserName");
        // }
        await updateGithubUserName(values);
      },
      {
        loading: "Updating...",
        success: "Updated profile!",
        error: (err: ApiError) => err.message,
      }
    );
  }

  const handleButtonClick = async () => {
    try {
      return toast.promise(
        async () => {
          await pingStar();
          router.push("/dashboard");
        },
        {
          loading: "Loading...",
          success: "Welcome aboard!",
          error: (err: ApiError) => err.message,
        }
      );
    } catch (error) {
      console.error("Error pinging /auth/star:", error);
    }
  };

  return (
    <InfoWrapper
      emojiSrc={"/images/emoji_alert.svg"}
      wrapperClass={"justify-center"}
    >
      <div
        className={
          "w-full h-full flex flex-col justify-around items-center space-y-24"
        }
      >
        <Modal
          classname={
            "max-w-sm py-6 flex flex-col items-center justify-around gap-5"
          }
          branding={false}
        >
          <Image
            src={"/icons/alert.svg"}
            alt={"github-activity-alert"}
            height={142}
            width={142}
            className={"size-28"}
          />
          <p className={"font-inter text-center"}>
            Please star the below repository before continuing
          </p>
          <Link
            href="https://github.com/conductor-oss/conductor/"
            className="hover:underline text-blue-800"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub Link
          </Link>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateGithubProfile)}
              className={"w-full flex flex-col items-center gap-10"}
            >
              <div className="flex items-end gap-4">
                <FormField
                  control={form.control}
                  name={"github"}
                  render={({ field }) => (
                    <AuthFormItem
                      field={field}
                      labelText="Update Github Profile"
                      type={"text"}
                      required
                      autoFill
                    />
                  )}
                />

                <CustomButton
                  buttonProps={{ className: "flex-button" }}
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting? "Updating..." : "Update."}
                </CustomButton>
              </div>
            </form>
          </Form>
        </Modal>
        <Button
          variant={"primary"}
          size={"primary"}
          type={"button"}
          onClick={handleButtonClick}
        >
          <p className="mb-1">Continue</p>
        </Button>
      </div>
    </InfoWrapper>
  );
};
export default GithubActivityPage;
