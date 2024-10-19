'use client'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { imageLoader } from '@/lib/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { FilterBar } from '@/components/filter-bar'
import { typeOfContract, typeOfProperty } from '@/constants'
import { useSearchContext } from '@/components/layout/context-provider'

export default function Home() {
    const { homeDetails } = useSearchContext()
    const { results } = homeDetails

    return (
        <div className="flex flex-col gap-5">
            <FilterBar />
            <div className="grid grid-cols-4 gap-5">
                {results?.map((data: any) => {
                    return (
                        <Link
                            href={`/home-details/${data?.slug}`}
                            key={data?.slug}
                        >
                            <Card className="group overflow-hidden">
                                <Image
                                    loader={imageLoader}
                                    key={`image_${data?.slug}`}
                                    src={`${process.env.NEXT_PUBLIC_API}/uploads_pictures/${data.images.sort()[0]}`}
                                    alt={data.title}
                                    width={320}
                                    height={320}
                                    className={
                                        'object-cover aspect-video brightness-90 transition will-change-auto group-hover:brightness-110'
                                    }
                                />

                                <div className="flex flex-col group-hover:bg-muted">
                                    <div className="flex justify-evenly p-1">
                                        {[
                                            typeOfProperty[data.typeOfProperty],
                                            typeOfContract[data.typeOfContract],
                                        ].map((item: string) => {
                                            return <p key={item}>{item}</p>
                                        })}
                                    </div>
                                    <Separator />
                                    <div className="flex justify-evenly p-1">
                                        {[
                                            `${data.price} €`,
                                            `${data.area} m²`,
                                            format(
                                                data.createdAt,
                                                'dd MMM yyyy'
                                            ),
                                        ].map((item: string) => {
                                            return <p key={item}>{item}</p>
                                        })}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
