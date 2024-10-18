'use client'

import { useForm } from 'react-hook-form'

import { capitalizeFirstLetter } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Card } from '@/components/ui/card'

import {
    LIST_CHOICE_BOOLEAN,
    nbBedroomsAndnbBathrooms,
    NUMBER_OF_PICTURES,
    typeOfontract,
    typeOfProperty,
} from '@/constants'

import { HomeDetailsCard } from '@/components/home-details-card'
import { ButtonImportPicture } from '@/components/button-import-picture'

import {
    createHomeDetailsFormSchema,
    createHomeDetailsFormValues,
} from '@/zod/home-details-schema'
import axios from 'axios'
import { useConnectedUserContext } from '@/components/layout/providers'
import { useRouter } from 'next/navigation'

export default function SettingsProfilePage() {
    const [selectedImages, setSelectedImages] = useState<any>([])
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

    const form = useForm<createHomeDetailsFormValues>({
        resolver: zodResolver(createHomeDetailsFormSchema),
        mode: 'onChange',
    })

    async function onSubmit() {
        let images: any = []
        console.log('v')

        await Promise.all(
            selectedImages.map(async (file: any) => {
                const formData = new FormData()
                formData.append('file', file)

                let response: any = await axios({
                    method: 'post',
                    url: `${process.env.NEXT_PUBLIC_API + '/upload-picture/uploadImage'}`,
                    data: formData,
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
                const { data } = response
                images.push(data)
            })
        )
        form.setValue('images', images.reverse())
        form.setValue('slug', form.getValues()?.title)
        form.setValue('userId', connectedUser.id)

        let response: any = await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API + '/home-details'}`,
            data: form.getValues(),
        })
        if (response.status == 201) {
            router.push('/')
        }
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
                                        className="resize-none h-20"
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
                                                <div className="flex flex-col gap-3 group">
                                                    <Card className="relative duration-75 rounded-xl overflow-hidden w-fit group-first:border-2 group-first:border-primary ">
                                                        <HomeDetailsCard
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
                            name="typeOfontract"
                            render={({ field }) => (
                                <FormItem className="flex flex-wrap items-center space-x-5">
                                    <FormLabel className="min-w-[100px]">
                                        Type of contract
                                    </FormLabel>
                                    <FormControl>
                                        <ToggleGroup
                                            type="single"
                                            className="gap-3"
                                            onValueChange={field.onChange}
                                        >
                                            {Object.entries(typeOfontract).map(
                                                ([key, value]: any) => {
                                                    return (
                                                        <ToggleGroupItem
                                                            size={'lg'}
                                                            value={key}
                                                            variant={'outline'}
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
                                            className="gap-3"
                                            onValueChange={field.onChange}
                                        >
                                            {Object.entries(typeOfProperty).map(
                                                ([key, value]: any) => {
                                                    return (
                                                        <ToggleGroupItem
                                                            size={'lg'}
                                                            value={key}
                                                            variant={'outline'}
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

                        {['garage', 'garden', 'pool'].map((property: any) => {
                            return (
                                <FormField
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
                                                    onValueChange={(e) => {
                                                        form.setValue(
                                                            property,
                                                            e === 'yes'
                                                        )
                                                    }}
                                                >
                                                    {Object.entries(
                                                        LIST_CHOICE_BOOLEAN
                                                    ).map(
                                                        ([key, value]: any) => {
                                                            return (
                                                                <ToggleGroupItem
                                                                    className="px-5"
                                                                    size={'lg'}
                                                                    value={key}
                                                                    variant={
                                                                        'outline'
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

                        {['bedrooms', 'bathrooms'].map((property: any) => {
                            return (
                                <FormField
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
                                                    size={'lg'}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    {Object.entries(
                                                        nbBedroomsAndnbBathrooms
                                                    ).map(
                                                        ([key, value]: any) => {
                                                            return (
                                                                <ToggleGroupItem
                                                                    className="px-5"
                                                                    value={key}
                                                                    variant={
                                                                        'outline'
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
                        size={'lg'}
                        type="submit"
                        onClick={async (e) => {
                            await form.setValue('images', [''])
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
