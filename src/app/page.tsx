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
        <div className="grid grid-cols-4 gap-5">
            {fetchData?.map((data: any) => {
                return (
                    <Link href={`/home-details/${data?.slug}`} key={data?.slug}>
                        <Card className="group hover:scale-105 duration-75 rounded-xl overflow-hidden">
                            <Image
                                loader={imageLoader}
                                key={`image_${data?.slug}`}
                                src={data.images[0]}
                                alt={data.title}
                                width={320}
                                height={320}
                                className={
                                    'object-cover aspect-video brightness-90 transition will-change-auto group-hover:brightness-110'
                                }
                            />
                            <p className="py-1 px-3">{data.title}</p>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
