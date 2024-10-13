'use client'

import { Card, CardContent } from '@/components/ui/card'
import { imageLoader } from '@/lib/utils'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Page({ params }: { params: { idOrSlug: string } }) {
    const [fetchData, setFetchData] = useState<any>({})

    async function getUser() {
        const url =
            process.env.NEXT_PUBLIC_API + `/home-details/${params.idOrSlug}`
        try {
            const response = await axios.get(url ?? '')
            console.log(response)
            setFetchData(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="p-3">
            <Card className="p-3">
                <h2 className="text-center text-2xl">{fetchData.title}</h2>
                <CardContent>
                    {fetchData?.images?.map((img: string) => (
                        <Image
                            loader={imageLoader}
                            src={img}
                            alt={img}
                            width={160}
                            height={160}
                            className={'object-cover aspect-square rounded'}
                        />
                    ))}
                </CardContent>
                <p className="p-3">{fetchData?.description}</p>
            </Card>
        </div>
    )
}
