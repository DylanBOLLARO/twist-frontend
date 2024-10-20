"use client"

import Image from "next/image"
import { imageLoader } from "@/utils/utils"
import { X } from "lucide-react"

export const HomeDetailsCard = (props: any) => {
    const { emptyImage, EmptyImageComponent, removeFromArray, src } = props

    if (emptyImage) {
        return (
            <div className="h-[180px] w-[320px] flex justify-center items-center">
                {EmptyImageComponent}
            </div>
        )
    }

    return (
        <div className="relative h-[180px] w-[320px] ">
            <X
                onClick={removeFromArray}
                className="absolute top-0 right-0 z-10 m-2 hover:scale-125 duration-100 hover:text-red-500"
            />
            <Image
                loader={imageLoader}
                key={`image_upload_${src}`}
                src={URL.createObjectURL(src)}
                alt="Prévisualisation"
                width={320}
                height={320}
                className={
                    "object-cover aspect-video brightness-90 transition will-change-auto group-hover:brightness-110 "
                }
            />
        </div>
    )
}
