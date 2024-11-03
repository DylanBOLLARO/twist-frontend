"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BADGES_LIST, typeOfContract, typeOfProperty } from "@/constants"
import { getHomeDetails } from "@/utils"
import {
    capitalizeFirstLetter,
    getBadgesFromHomeDetails,
    imageLoader,
} from "@/utils/utils"
import { format } from "date-fns"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icon } from "@/components/icon"
import { useConnectedUserContext } from "@/components/layout/context-provider"

export default function Page({ params }: { params: { idOrSlug: string } }) {
    const [homeDetails, setHomeDetails] = useState<any>(null)

    useEffect(() => {
        const homeDetailsAsync = async () => {
            try {
                const data = await getHomeDetails(params.idOrSlug)
                setHomeDetails(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        homeDetailsAsync()
    }, [params?.idOrSlug])

    const { listOfMyIdOrSlug } = useConnectedUserContext()

    return (
        <div className="flex flex-col gap-5 mb-20">
            <div className="flex flex-row gap-3 items-center justify-between">
                <h2 className="scroll-m-20 text-5xl tracking-tight first:mt-0 text-start py-5">
                    {capitalizeFirstLetter(
                        `${typeOfProperty[homeDetails?.typeOfProperty]} ${
                            typeOfContract[homeDetails?.typeOfContract]
                        } of ${homeDetails?.area} m²`
                    )}
                </h2>

                <div className="flex flex-row gap-3">
                    {listOfMyIdOrSlug?.includes(params?.idOrSlug) && (
                        <Button size={"lg"} asChild>
                            <Link
                                href={`/my-publications/${params?.idOrSlug}/edit`}
                            >
                                Edit
                            </Link>
                        </Button>
                    )}

                    {/* <Button size={"lg"}>Share</Button>
                    <Button size={"lg"} variant={"outline"}>
                        Save
                    </Button> */}
                </div>
            </div>
            <div className="sm:columns-3 rounded columns-1">
                {homeDetails?.images?.map((src: string) => (
                    <Link
                        key={`image_${src}`}
                        href={"#"}
                        shallow
                        className="after:content group relative block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight p-2 sm:p-0"
                    >
                        <Image
                            alt=""
                            className="brightness-90 rounded transition will-change-auto group-hover:brightness-110 aspect-video object-cover"
                            src={`${process.env.NEXT_PUBLIC_API}/uploads_pictures/${src}`}
                            width={720}
                            loader={imageLoader}
                            height={480}
                        />
                    </Link>
                ))}
            </div>

            <Separator className="bg-primary/50" />
            <div className="flex flex-wrap gap-3">
                {/* {Object.entries(
                    getBadgesFromHomeDetails(homeDetails, BADGES_LIST)
                )?.map(([keyOfObj, valueOfObj]: any) => {
                    if (!!valueOfObj) {
                        return (
                            <Badge
                                key={`badge_${keyOfObj}`}
                                className="flex gap-3 max-w-fit px-3 py-1 text-sm"
                            >
                                {BADGES_LIST_STRING.map(
                                    (item) => item.key
                                ).includes(keyOfObj) && (
                                    <Icon name="BedDouble" />
                                )}

                                {capitalizeFirstLetter(
                                    `${keyOfObj} ${
                                        BADGES_LIST_STRING.includes(keyOfObj)
                                            ? valueOfObj
                                            : ""
                                    }`
                                )}
                            </Badge>
                        )
                    }
                })} */}
            </div>
            {homeDetails?.user?.firstname && homeDetails?.user?.lastname && (
                <Card className="flex gap-3 p-3">
                    <div className="my-auto">
                        <Avatar>
                            <AvatarFallback>
                                {homeDetails?.user?.lastname[0].toUpperCase()}
                                {homeDetails?.user?.firstname[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex flex-col">
                        <p>
                            {`Host : ${capitalizeFirstLetter(
                                homeDetails?.user?.lastname
                            )} ${capitalizeFirstLetter(
                                homeDetails?.user?.firstname
                            )}`}
                        </p>
                        <p>{`Member since : ${format(
                            homeDetails?.user?.createdAt,
                            "dd.MM.yyyy"
                        )} `}</p>
                    </div>
                </Card>
            )}
            <p className="flex-1 leading-7 [&:not(:first-child)]:mt-6">
                {homeDetails?.description}
            </p>
        </div>
    )
}
