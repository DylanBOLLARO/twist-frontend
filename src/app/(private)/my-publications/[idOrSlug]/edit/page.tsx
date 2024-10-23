"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    LIST_CHOICE_BOOLEAN,
    NUMBER_OF_PICTURES,
    nbBedroomsAndnbBathrooms,
    typeOfContract,
    typeOfProperty,
} from "@/constants/constants"
import { getHomeDetails } from "@/utils"
import { capitalizeFirstLetter } from "@/utils/utils"
import {
    createHomeDetailsFormSchema,
    createHomeDetailsFormValues,
} from "@/zod/home-details-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ButtonImportPicture } from "@/components/button-import-picture"
import { HomeDetailsCard } from "@/components/home-details-card"
import {
    useConnectedUserContext,
    useSearchContext,
} from "@/components/layout/context-provider"

export default function Page({ params }: { params: { idOrSlug: string } }) {
    const [homeDetails, setHomeDetails] = useState<any>(null)
    const { getHomeDetails: getHomeDetailsFromContext } = useSearchContext()

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const data = await getHomeDetails(params.idOrSlug)
                setHomeDetails(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchDataAsync()
    }, [params?.idOrSlug])

    const [selectedImages, setSelectedImages] = useState<any>([])

    useEffect(() => {
        setSelectedImages(
            homeDetails?.images.map((img: string) => `${img}`) || []
        )
    }, [homeDetails])

    const { connectedUser } = useConnectedUserContext()
    const router = useRouter()

    const removeImagesFromArrayList = (
        setSelectedImages: any,
        index: number
    ) => {
        setSelectedImages((prev: any) => [
            ...prev.filter((img: string) => img != selectedImages[index]),
        ])
    }

    const filteredData = (homeDetails: any) => {
        const hd = homeDetails
        if (hd && Object.keys(hd)?.includes("id")) {
            delete hd.id
        }
        if (hd && Object.keys(hd)?.includes("user")) {
            delete hd.user
        }

        return {
            ...hd,
            price: "" + hd?.price,
            area: "" + hd?.area,
        }
    }

    const form = useForm<createHomeDetailsFormValues>({
        values: filteredData(homeDetails),
        resolver: zodResolver(createHomeDetailsFormSchema),
        mode: "onChange",
    })

    async function onSubmit() {
        const uploadedImages: string[] = []

        // todo should use reduce
        await Promise.all(
            selectedImages.map(async (file: any, index: number) => {
                if (typeof file !== "string") {
                    const formData = new FormData()
                    formData.append("file", file)

                    let response: any = await axios({
                        method: "post",
                        url: `${
                            process.env.NEXT_PUBLIC_API +
                            "/upload-picture/uploadImage"
                        }`,
                        data: formData,
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                    const { data } = response
                    uploadedImages.push(data) // Add the uploaded image URL or ID
                } else {
                    uploadedImages.push(file) // If it's already a string (URL), keep it
                }
            })
        )
        form.setValue("images", uploadedImages)
        form.setValue("slug", form.getValues()?.title)
        form.setValue("userId", connectedUser.id)

        const at_nutrit =
            "at_nutrit" in localStorage
                ? localStorage.getItem("at_nutrit")
                : undefined

        let response: any = await axios({
            method: "patch",
            url: `${process.env.NEXT_PUBLIC_API}/home-details/${params.idOrSlug}`,
            data: form.getValues(),
            headers: {
                Authorization: `Bearer ${at_nutrit}`,
            },
        })

        if (response.status == 200) {
            router.push(`/home-details/${response?.data?.slug}`)
        }

        getHomeDetailsFromContext()
    }

    return (
        <div className="bg-card flex-1 flex-col w-full items-center rounded-lg p-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-8 items-center"
                >
                    <div className="text-2xl font-semibold text-center text-primary">
                        General
                    </div>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="resize-none h-32"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center space-x-20">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="w-fit">
                                    <FormLabel>{`Price`}</FormLabel>
                                    <FormControl>
                                        <div className="flex space-x-3">
                                            <Input {...field} />
                                            <div className="inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                €
                                            </div>
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem className="w-fit">
                                    <FormLabel>Area</FormLabel>
                                    <FormControl>
                                        <div className="flex space-x-3">
                                            <Input {...field} />
                                            <div className="inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                m²
                                            </div>
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem className="flex flex-col gap-3 items-center">
                                <div className="flex flex-wrap gap-5">
                                    {[...Array(NUMBER_OF_PICTURES).keys()].map(
                                        (_, index) => {
                                            return (
                                                <div
                                                    className="flex flex-col gap-3 group"
                                                    key={`picture_${index}`}
                                                >
                                                    <Card className="relative duration-75 rounded-xl overflow-hidden w-fit group-first:border-2 group-first:border-primary ">
                                                        <HomeDetailsCard
                                                            local
                                                            src={
                                                                selectedImages[
                                                                    index
                                                                ]
                                                            }
                                                            emptyImage={
                                                                !selectedImages[
                                                                    index
                                                                ]
                                                            }
                                                            EmptyImageComponent={
                                                                <ButtonImportPicture
                                                                    disable={
                                                                        index >
                                                                        selectedImages.length
                                                                    }
                                                                    selectedImages={
                                                                        selectedImages
                                                                    }
                                                                    setSelectedImages={
                                                                        setSelectedImages
                                                                    }
                                                                />
                                                            }
                                                            removeFromArray={() => {
                                                                removeImagesFromArrayList(
                                                                    setSelectedImages,
                                                                    index
                                                                )
                                                            }}
                                                        />
                                                    </Card>
                                                    {index == 0 && (
                                                        <small className="flex justify-center text-primary">
                                                            This image will be
                                                            the main image
                                                        </small>
                                                    )}
                                                </div>
                                            )
                                        }
                                    )}
                                </div>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="text-2xl font-semibold text-center text-primary">
                        Advance
                    </div>

                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="typeOfContract"
                            render={({ field }) => (
                                <FormItem className="flex flex-wrap items-center space-x-5">
                                    <FormLabel className="min-w-[100px]">
                                        Type of contract
                                    </FormLabel>
                                    <FormControl>
                                        <ToggleGroup
                                            type="single"
                                            className="gap-3"
                                            value={field?.value}
                                            onValueChange={field.onChange}
                                        >
                                            {Object.entries(typeOfContract).map(
                                                ([key, value]: any) => {
                                                    return (
                                                        <ToggleGroupItem
                                                            key={`toggle-group-item_${key}`}
                                                            size={"lg"}
                                                            value={key}
                                                            variant={"outline"}
                                                        >
                                                            {capitalizeFirstLetter(
                                                                value
                                                            )}
                                                        </ToggleGroupItem>
                                                    )
                                                }
                                            )}
                                        </ToggleGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="typeOfProperty"
                            render={({ field }) => (
                                <FormItem className="flex flex-wrap items-center space-x-5">
                                    <FormLabel className="min-w-[100px]">
                                        Type of property
                                    </FormLabel>
                                    <FormControl>
                                        <ToggleGroup
                                            type="single"
                                            value={field?.value}
                                            className="gap-3"
                                            onValueChange={field.onChange}
                                        >
                                            {Object.entries(typeOfProperty).map(
                                                ([key, value]: any) => {
                                                    return (
                                                        <ToggleGroupItem
                                                            key={`toggle-group-item_${key}`}
                                                            size={"lg"}
                                                            value={key}
                                                            variant={"outline"}
                                                        >
                                                            {capitalizeFirstLetter(
                                                                value
                                                            )}
                                                        </ToggleGroupItem>
                                                    )
                                                }
                                            )}
                                        </ToggleGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {["garage", "garden", "pool"].map((property: any) => {
                            return (
                                <FormField
                                    key={`form-field_${property}`}
                                    control={form.control}
                                    name={property}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-wrap items-center space-x-5">
                                            <FormLabel className="min-w-[100px]">
                                                {capitalizeFirstLetter(
                                                    property
                                                )}
                                            </FormLabel>
                                            <FormControl>
                                                <ToggleGroup
                                                    type="single"
                                                    className="gap-3"
                                                    value={
                                                        field.value
                                                            ? "yes"
                                                            : "no"
                                                    }
                                                    onValueChange={(e) => {
                                                        form.setValue(
                                                            property,
                                                            e === "yes"
                                                        )
                                                    }}
                                                >
                                                    {Object.entries(
                                                        LIST_CHOICE_BOOLEAN
                                                    ).map(
                                                        ([key, value]: any) => {
                                                            return (
                                                                <ToggleGroupItem
                                                                    key={`toggle-group-item_${key}`}
                                                                    className="px-5"
                                                                    size={"lg"}
                                                                    value={key}
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                >
                                                                    {capitalizeFirstLetter(
                                                                        key
                                                                    )}
                                                                </ToggleGroupItem>
                                                            )
                                                        }
                                                    )}
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        })}

                        {["bedrooms", "bathrooms"].map((property: any) => {
                            return (
                                <FormField
                                    key={`form-field_${property}`}
                                    control={form.control}
                                    name={property}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-wrap items-center space-x-5">
                                            <FormLabel className="min-w-[100px]">
                                                {capitalizeFirstLetter(
                                                    property
                                                )}
                                            </FormLabel>
                                            <FormControl>
                                                <ToggleGroup
                                                    className="gap-3"
                                                    type="single"
                                                    size={"lg"}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field?.value}
                                                >
                                                    {Object.entries(
                                                        nbBedroomsAndnbBathrooms
                                                    ).map(
                                                        ([key, value]: any) => {
                                                            return (
                                                                <ToggleGroupItem
                                                                    key={`toggle-group-item_${key}`}
                                                                    className="px-5"
                                                                    value={key}
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                >
                                                                    {capitalizeFirstLetter(
                                                                        value
                                                                    )}
                                                                </ToggleGroupItem>
                                                            )
                                                        }
                                                    )}
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        })}
                    </div>

                    <div className="text-2xl font-semibold text-center text-primary">
                        Localisation
                    </div>

                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-wrap gap-3">
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-fit"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-fit"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-fit"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button
                        size={"lg"}
                        className="font-bold"
                        onClick={() => {
                            form.setValue("images", [""])
                            onSubmit()
                        }}
                    >
                        Publish
                    </Button>
                </form>
            </Form>
        </div>
    )
}
