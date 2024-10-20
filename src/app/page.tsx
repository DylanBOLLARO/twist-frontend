"use client"

import { ListCardHomeDetails } from "@/components/card-home-details"
import { FilterBar } from "@/components/filter-bar"
import { useSearchContext } from "@/components/layout/context-provider"
import { NoDataAvailable } from "@/components/no-data-available"

export default function Home() {
    const { homeDetails } = useSearchContext()
    const { results }: { results: Array<any> } = homeDetails

    return (
        <div className="flex flex-col gap-5">
            <FilterBar />

            {!!results?.length ? (
                <ListCardHomeDetails listOfHomeDetails={results} />
            ) : (
                <NoDataAvailable />
            )}
        </div>
    )
}
