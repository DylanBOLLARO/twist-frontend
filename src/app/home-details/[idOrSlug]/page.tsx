'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { capitalizeFirstLetter, imageLoader } from '@/lib/utils'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'

export default function Page({ params }: { params: { idOrSlug: string } }) {
    const [fetchData, setFetchData] = useState<any>({})
    const [date, setDate] = useState<Date | undefined>(new Date())

    async function getUser() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API + `/home-details/${params.idOrSlug}`
            )
            setFetchData(response?.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const TAG_LIST = ['bedrooms', 'bathrooms', 'garage', 'garden', 'pool']

    return (
        <div className="flex flex-col gap-5 mb-20">
            <div className="flex flex-row gap-3 items-center justify-between">
                <h2 className="scroll-m-20 text-5xl font-semibold tracking-tight first:mt-0 text-start py-5">
                    {fetchData?.title}
                </h2>

                <div className="flex flex-row gap-3">
                    <Button size={'lg'}>Share</Button>
                    <Button size={'lg'} variant={'outline'}>
                        Save
                    </Button>
                </div>
            </div>
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4 rounded-3xl overflow-hidden">
                {fetchData?.images?.map((src: string) => (
                    <Link
                        key={`image_${src}`}
                        href={'#'}
                        shallow
                        className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                    >
                        <Image
                            alt=""
                            className="brightness-90 transition will-change-auto group-hover:brightness-110"
                            src={src}
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
                            {`Host : ${capitalizeFirstLetter(fetchData?.user?.lastname)} ${capitalizeFirstLetter(fetchData?.user?.firstname)}`}
                        </p>
                        <p>{`Member since : ${format(fetchData?.user?.createdAt, 'dd.MM.yyyy')} `}</p>
                    </div>
                </Card>
            )}
            <p className="flex-1 leading-7 [&:not(:first-child)]:mt-6">
                {fetchData?.description}
            </p>

            <div className="flex gap-3">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border shadow bg-card"
                />
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>
                            Deploy your new project in one-click.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Name of your project"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Framework</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="next">
                                                Next.js
                                            </SelectItem>
                                            <SelectItem value="sveltekit">
                                                SvelteKit
                                            </SelectItem>
                                            <SelectItem value="astro">
                                                Astro
                                            </SelectItem>
                                            <SelectItem value="nuxt">
                                                Nuxt.js
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
