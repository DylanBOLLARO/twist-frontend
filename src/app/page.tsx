'use client'

import { Card } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
    const [fetchData, setFetchData] = useState([])

    async function getUser() {
        const url = process.env.NEXT_PUBLIC_API + '/recipe/complexSearch'
        try {
            const response = await axios.get(url ?? '')
            setFetchData(response.data.results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center">
            <div className="py-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {fetchData?.map((data: any) => {
                    return (
                        <Link href={`/recipe/${data?.slug}`} key={data?.slug}>
                            <Card className="max-w-52 min-h-full hover:scale-105 duration-75 p-0">
                                <div className="p-3 flex flex-col items-center">
                                    <Image
                                        key={`image_${data?.slug}`}
                                        src={data.image}
                                        alt={data.title}
                                        width={160}
                                        height={160}
                                        priority
                                        className={
                                            'object-cover  aspect-square rounded'
                                        }
                                    />
                                    <p className="px-3">{data.title}</p>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
