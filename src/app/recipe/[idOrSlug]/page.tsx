'use client'

import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Page({ params }: { params: { idOrSlug: string } }) {
    const [fetchData, setFetchData] = useState<any>({})

    async function getUser() {
        const url =
            process.env.NEXT_PUBLIC_API +
            `/recipe/${params.idOrSlug}?addRecipeInformation=true`
        try {
            const response = await axios.get(url ?? '')
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
                    <Image
                        src={fetchData?.image ?? ''}
                        alt={fetchData.title ?? ''}
                        width={160}
                        height={160}
                        className={
                            'object-cover transition-all hover:scale-105 aspect-square rounded'
                        }
                    />
                </CardContent>
                <p className="p-3">
                    {fetchData?.summary?.replace(/<[^>]*>/g, '')}
                </p>
            </Card>
        </div>
    )
}
