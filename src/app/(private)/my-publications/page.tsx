"use client"

import { noDataAvailable } from "@/constants"

import { ListCardHomeDetails } from "@/components/card-home-details"
import { useConnectedUserContext } from "@/components/layout/context-provider"
import { NoDataAvailable } from "@/components/no-data-available"

export default function Page() {
    const { connectedUser } = useConnectedUserContext()
    const { homeDetails }: { homeDetails: Array<any> } = connectedUser
        ? connectedUser
        : {}

    return (
        <div className="flex flex-col gap-5">
            {!!homeDetails?.length ? (
                <ListCardHomeDetails listOfHomeDetails={homeDetails} />
            ) : (
                <NoDataAvailable text={noDataAvailable.youHaveNoPublications} />
            )}
        </div>
    )
}
