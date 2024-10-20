"use client"

import { useState } from "react"
import axios from "axios"

export default function Page({ params }: { params: { idOrSlug: string } }) {
    async function getHomeDetails() {
        try {
            const response: any = await axios({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_API}/home-details/${params.idOrSlug}`,
            })

            setFetchData(response?.data)
        } catch (error) {
            console.error(error)
        }
    }

    const [fetchData, setFetchData] = useState<any>(getHomeDetails())

    return <div>{JSON.stringify(fetchData)}</div>
}
