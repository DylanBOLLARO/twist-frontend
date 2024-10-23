"use client"

import Image from "next/image"
import Link from "next/link"
import { typeOfContract, typeOfProperty } from "@/constants/constants"
import { capitalizeFirstLetter, imageLoader } from "@/utils/utils"
import currency from "currency.js"
import { format } from "date-fns"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const CardHomeDetails = ({ homeDetails }: any) => {
    return (
        <Link
            href={`/home-details/${homeDetails?.slug}`}
            key={homeDetails?.slug}
        >
            <Card className="group overflow-hidden">
                <Image
                    loader={imageLoader}
                    key={`image_${homeDetails?.slug}`}
                    src={`${process.env.NEXT_PUBLIC_API}/uploads_pictures/${homeDetails?.images?.[0]}`}
                    alt={homeDetails?.title}
                    width={320}
                    height={320}
                    className={
                        "object-cover aspect-video brightness-90 transition will-change-auto group-hover:brightness-110"
                    }
                />

                <div className="flex flex-col group-hover:bg-muted">
                    <p className="flex gap-2 py-1 px-3 text-sm">
                        {capitalizeFirstLetter(
                            `${typeOfProperty[homeDetails?.typeOfProperty]} ${
                                typeOfContract[homeDetails?.typeOfContract]
                            } of ${homeDetails?.area} m²`
                        )}
                    </p>
                    <Separator />
                    <div className="flex justify-evenly  py-1 px-3 text-sm">
                        <p className="flex gap-2 text-sm flex-1">
                            {capitalizeFirstLetter(
                                `${currency(homeDetails?.price, {
                                    separator: " ",
                                    precision: 0,
                                }).format()} ${
                                    homeDetails?.typeOfContract ==
                                    "SHORT_TERM_RENTAL"
                                        ? "per night"
                                        : ""
                                }${
                                    homeDetails?.typeOfContract ==
                                    "LONG_TERM_RENTAL"
                                        ? "per month"
                                        : ""
                                }`
                            )}
                        </p>
                        <p>{format(homeDetails?.createdAt, "dd MMM yyyy")}</p>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
