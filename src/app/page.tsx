'use client'

import { Card } from '@/components/ui/card'
import { imageLoader } from '@/lib/utils'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
    const [fetchData, setFetchData] = useState([])

    async function getUser() {
        const url = process.env.NEXT_PUBLIC_API + '/home-details'
        try {
            const response = await axios.get(url ?? '')
            setFetchData(response?.data?.results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="py-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {fetchData?.map((data: any) => {
                return (
                    <Link href={`/home-details/${data?.slug}`} key={data?.slug}>
                        <Card className="max-w-52 min-h-full hover:scale-105 duration-75 p-0">
                            <div className="p-3 flex flex-col items-center">
                                <Image
                                    loader={imageLoader}
                                    key={`image_${data?.slug}`}
                                    src={data.images[0]}
                                    alt={data.title}
                                    width={160}
                                    height={160}
                                    className={
                                        'object-cover aspect-square rounded'
                                    }
                                />
                                <p className="px-3">{data.title}</p>
                            </div>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
