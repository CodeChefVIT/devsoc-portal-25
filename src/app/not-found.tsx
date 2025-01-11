import React from 'react'
import Modal from "@/app/(auth)/_components/modal";
import CustomLink from "@/app/(auth)/_components/custom-link";
import AuthLayout from "@/app/(auth)/layout";
import Image from "next/image";

const NotFound = () => {
    return (
        <AuthLayout>
            <div className={"w-full flex flex-col items-center justify-between gap-10 py-5"}>
                <Modal branding={false} classname={"py-8 px-20"}>
                    <div className={"flex flex-col justify-between items-center gap-5"}>
                        <div className={'font-yerk text-8xl font-bold'}>404</div>
                        <div className={"font-inter text-center"}>
                            <p>Shhh... this page dozed off while loading</p>
                            <p>Let’s not disturb its dreams - <CustomLink text={"Redirect to where?"} href={"/"} /></p>
                        </div>
                    </div>
                </Modal>
                <Image
                    src={"/images/404.png"}
                    alt={"404"}
                    className={"w-[35rem]"}
                    height={468}
                    width={828}
                />
            </div>
        </AuthLayout>
    )
}
export default NotFound
