// "use client"
// import React, {useEffect} from 'react'
// import Modal from "@/app/(auth)/_components/modal";
// import InfoFormField from "@/app/(auth)/fill-details/_components/info-form-field";
// import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
// import {Button} from "@/components/ui/button";
// import {useRouter} from "next/navigation";
// import AuthFormDropdown from "@/app/(auth)/_components/auth-form-dropdown";
// import {hostels} from "@/app/(auth)/_schemas/constants";
// import {useFormContext} from "react-hook-form";
// import {UserDetailsFormType} from "@/app/(auth)/_schemas/forms.schema";
// import {useFormStore} from "@/app/(auth)/fill-details/_components/info-form";

// const CollegeDetails = () => {
//     const router = useRouter();
//     const form = useFormContext<UserDetailsFormType>();
//     const { updateFormData, error } = useFormStore();

//     const handleNext = () => {
//         const { regNo, vitEmail, githubProfile, hostelBlock, roomNo } = form.getValues();
//         updateFormData({ regNo, vitEmail, githubProfile, hostelBlock, roomNo });
//         router.push("/fill-details/3");
//         return;
//     }

//     useEffect(() => {
//         if (error) form.trigger();
//     }, [error]);

//     return (
//         <div className={"flex justify-center w-full"}>
//             <Modal branding={false} classname={"px-12 py-8 flex gap-2"}>
                // <InfoFormField name={'regNo'} render={({ field })=>(
                //     <AuthFormItem field={field} labelText={"Registation Number"} type={"text"} required />
                // )} />
//                 <InfoFormField name={'vitEmail'} render={({ field })=>(
//                     <AuthFormItem field={field} labelText={"VIT Email Address"} type={"text"} required />
//                 )} />
                // <InfoFormField name={'roomNo'} render={({ field })=>(
                //     <AuthFormItem field={field} labelText={"Room Number"} type={"number"} required />
                // )} />

                // <InfoFormField name={'hostelBlock'} render={({ field })=>(
                //     <AuthFormDropdown items={hostels} labelText={"Hostel Block"} field={field} required />
                // )} />
//                 <Button variant={"primary"} size={"primary"} type={"button"} className={"my-2"} onClick={handleNext}>
//                     Next
//                 </Button>
//             </Modal>
//         </div>
//     )
// }
// export default CollegeDetails
