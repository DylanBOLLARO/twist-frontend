"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { typeOfContract, typeOfProperty } from "@/constants"
import { getHomeDetails } from "@/utils"
import { capitalizeFirstLetter, imageLoader } from "@/utils/utils"
import axios from "axios"
import { format } from "date-fns"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useConnectedUserContext } from "@/components/layout/context-provider"

export default function Page({ params }: { params: { idOrSlug: string } }) {
    const [fetchData, setFetchData] = useState<any>(null)
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const data = await getHomeDetails(params.idOrSlug)
                setFetchData(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchDataAsync()
    }, [params?.idOrSlug])

    const { listOfMyIdOrSlug } = useConnectedUserContext()

    const TAG_LIST = ["bedrooms", "bathrooms", "garage", "garden", "pool"]

    return (
        <div className="flex flex-col gap-5 mb-20">
            <div className="flex flex-row gap-3 items-center justify-between">
                <h2 className="scroll-m-20 text-5xl tracking-tight first:mt-0 text-start py-5">
                    {capitalizeFirstLetter(
                        `${typeOfProperty[fetchData?.typeOfProperty]} ${
                            typeOfContract[fetchData?.typeOfContract]
                        } of ${fetchData?.area} m²`
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
            <div className="columns-3 rounded">
                {fetchData?.images?.map((src: string) => (
                    <Link
                        key={`image_${src}`}
                        href={"#"}
                        shallow
                        className="after:content group relative block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                    >
                        <Image
                            alt=""
                            className="brightness-90 rounded transition will-change-auto group-hover:brightness-110 aspect-video object-cover"
                            src={`http://localhost:55000/uploads_pictures/${src}`}
                            width={720}
                            loader={imageLoader}
                            height={480}
                        />
                    </Link>
                ))}
            </div>

            <Separator className="bg-primary/50" />
            <div className="flex flex-wrap gap-3">
                {TAG_LIST?.map((item) => {
                    return (
                        <Badge
                            key={`badge_${item}`}
                            className="max-w-fit px-3 py-1 text-base"
                        >
                            {item}
                        </Badge>
                    )
                })}
            </div>
            {fetchData?.user?.firstname && fetchData?.user?.lastname && (
                <Card className="flex gap-3 p-3">
                    <div className="my-auto">
                        <Avatar>
                            <AvatarFallback>
                                {fetchData?.user?.lastname[0].toUpperCase()}
                                {fetchData?.user?.firstname[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex flex-col">
                        <p>
                            {`Host : ${capitalizeFirstLetter(
                                fetchData?.user?.lastname
                            )} ${capitalizeFirstLetter(
                                fetchData?.user?.firstname
                            )}`}
                        </p>
                        <p>{`Member since : ${format(
                            fetchData?.user?.createdAt,
                            "dd.MM.yyyy"
                        )} `}</p>
                    </div>
                </Card>
            )}
            <p className="flex-1 leading-7 [&:not(:first-child)]:mt-6">
                {fetchData?.description}
            </p>
        </div>
    )
}
