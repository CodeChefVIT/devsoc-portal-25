import { useUserStore } from "@/store/user";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(), // UUID type
  Name: z.string().min(1), // TEXT, non-nullable
  team_id: z.string().uuid(), // UUID type, non-nullable
  email: z.string().email(), // Email, TEXT, non-nullable
  is_vitian: z.boolean(), // BOOLEAN, non-nullable
  reg_no: z.string().min(1), // TEXT, non-nullable
  password: z.string().min(1), // TEXT, non-nullable
  phone_no: z.string().min(1), // TEXT, non-nullable
  role: z.string().min(1), // TEXT, non-nullable
  is_leader: z.boolean(), // BOOLEAN, non-nullable
  college: z.string().min(1), // TEXT, non-nullable
  is_verified: z.boolean(), // BOOLEAN, non-nullable
});
export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  //   const onSubmit = (data) => props.updateAction(data)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const user = useUserStore((state) => state.user);
  const userFetch = useUserStore((state) => state.fetch);
  if (user.id == "") {
    userFetch();
  }
  return (
    <div className="flex flex-col items-center">
      <h1>Settings and profile</h1>
    </div>
  );
}
